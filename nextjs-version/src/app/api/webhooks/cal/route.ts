import crypto from "node:crypto"
import { NextResponse } from "next/server"

import { supabaseServiceRole } from "@/lib/supabase/server"

type CalWebhookBody = {
  triggerEvent?: string
  createdAt?: string
  payload?: Record<string, unknown>
} & Record<string, unknown>

function timingSafeEqualHex(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8")
  const bBuf = Buffer.from(b, "utf8")
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

export async function POST(req: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: "missing_secret" }, { status: 500 })
  }

  const signature = req.headers.get("x-cal-signature-256")
  if (!signature) {
    return NextResponse.json({ ok: false, error: "missing_signature" }, { status: 401 })
  }

  const raw = await req.text()

  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex")
  if (!timingSafeEqualHex(signature, expected)) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 })
  }

  let body: CalWebhookBody
  try {
    body = JSON.parse(raw) as CalWebhookBody
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const triggerEvent = String(body.triggerEvent ?? "UNKNOWN")
  const payload = (body.payload ?? {}) as Record<string, unknown>

  // Booking UID and times (Cal.com docs: payload.uid, payload.startTime, payload.endTime)
  const calUidRaw = payload.uid
  const calUid = typeof calUidRaw === "string" ? calUidRaw : null
  if (!calUid) {
    return NextResponse.json({ ok: false, error: "missing_uid" }, { status: 400 })
  }

  const bookingIdVal = payload.bookingId
  const calBookingId =
    typeof bookingIdVal === "number"
      ? Math.trunc(bookingIdVal)
      : typeof bookingIdVal === "string" && bookingIdVal.trim()
        ? Number(bookingIdVal)
        : null

  const startTime = typeof payload.startTime === "string" ? payload.startTime : null
  const endTime = typeof payload.endTime === "string" ? payload.endTime : null
  const status = typeof payload.status === "string" ? payload.status : null

  const attendees = Array.isArray(payload.attendees) ? payload.attendees : []
  const firstAttendee = (attendees[0] ?? null) as Record<string, unknown> | null
  const attendeeEmail = typeof firstAttendee?.email === "string" ? firstAttendee.email : null
  const attendeeName =
    typeof firstAttendee?.name === "string"
      ? firstAttendee.name
      : typeof firstAttendee?.firstName === "string"
        ? `${firstAttendee.firstName}${typeof firstAttendee?.lastName === "string" ? ` ${firstAttendee.lastName}` : ""}`.trim()
        : null

  const supabase = supabaseServiceRole()

  // Best-effort: link booking to the latest lead with same email.
  let leadId: string | null = null
  if (attendeeEmail) {
    const { data: leadRow } = await supabase
      .from("diagnostico_leads")
      .select("id")
      .eq("email", attendeeEmail.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    leadId = (leadRow?.id as string | undefined) ?? null
  }

  // Idempotent upsert by Cal UID.
  const { error: upsertErr } = await supabase
    .from("diagnostico_agendamentos")
    .upsert(
      {
        lead_id: leadId,
        cal_uid: calUid,
        cal_booking_id: Number.isFinite(calBookingId as number) ? (calBookingId as number) : null,
        trigger_event: triggerEvent,
        status,
        start_time: startTime,
        end_time: endTime,
        attendee_email: attendeeEmail,
        attendee_name: attendeeName,
        raw_payload: body,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "cal_uid" }
    )

  if (upsertErr) {
    return NextResponse.json(
      {
        ok: false,
        error: "db_upsert_failed",
        detail: { message: upsertErr.message, code: (upsertErr as any).code ?? null },
      },
      { status: 500 }
    )
  }

  // Convenience: flag the lead as scheduled when we can link it.
  if (leadId && triggerEvent === "BOOKING_CREATED") {
    await supabase
      .from("diagnostico_leads")
      .update({
        agendou_reuniao: true,
        reuniao_agendada_at: startTime,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}

