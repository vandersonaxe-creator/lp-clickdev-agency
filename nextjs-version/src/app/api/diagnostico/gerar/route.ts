import { NextResponse } from "next/server"
import { z } from "zod"

import type { DiagnosticoGerarRequest } from "@/types/diagnostico"
import { sanitizePlainText, normalizeWhatsappBR } from "@/lib/validators"
import { inferUFfromWhatsappE164 } from "@/lib/ddd-to-uf"
import { gerarDiagnostico } from "@/lib/gemini"
import { supabaseServiceRole } from "@/lib/supabase/server"

const UtmSchema = z
  .object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
  })
  .optional()

const BodySchema = z.object({
  nome: z.string().min(2).max(80).transform((v) => v.trim()),
  whatsapp: z.string().min(8).max(40),
  email: z.string().email().max(254).transform((v) => v.trim().toLowerCase()),
  gargalo: z.string().min(20).max(300),
  utm: UtmSchema,
  referrer: z.string().max(2000).optional(),
})

export async function POST(req: Request) {
  let parsed: DiagnosticoGerarRequest | null = null

  try {
    const json = (await req.json()) as unknown
    const body = BodySchema.parse(json)

    const gargalo = sanitizePlainText(body.gargalo)
    const whatsappE164 = normalizeWhatsappBR(body.whatsapp)
    const { ddd, uf } = inferUFfromWhatsappE164(whatsappE164)

    parsed = {
      nome: body.nome,
      whatsapp: whatsappE164,
      email: body.email,
      gargalo,
      utm: body.utm,
      referrer: body.referrer,
    }

    const userAgent = req.headers.get("user-agent")
    const ipAddress =
      (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || null

    const supabase = supabaseServiceRole()

    // 1) Cria lead primeiro (vira MQL mesmo se Gemini falhar).
    const { data: leadRow, error: leadErr } = await supabase
      .from("diagnostico_leads")
      .insert({
        nome: body.nome,
        whatsapp: whatsappE164,
        email: body.email,
        gargalo_descricao: gargalo,
        utm_source: body.utm?.utm_source ?? null,
        utm_medium: body.utm?.utm_medium ?? null,
        utm_campaign: body.utm?.utm_campaign ?? null,
        utm_content: body.utm?.utm_content ?? null,
        utm_term: body.utm?.utm_term ?? null,
        referrer: body.referrer ?? null,
        user_agent: userAgent,
        ip_address: ipAddress,
        ddd,
        uf_inferida: uf,
      })
      .select("id")
      .single()

    if (leadErr || !leadRow?.id) {
      return NextResponse.json(
        { ok: false, error: "db_insert_failed" },
        { status: 500 }
      )
    }

    const leadId = leadRow.id as string

    // 2) Gera diagnóstico com Gemini (server-side).
    const gem = await gerarDiagnostico(
      { gargalo, nome: body.nome, uf },
      { timeoutMs: 25_000 }
    )

    if (!gem.ok) {
      // Fire-and-forget n8n (com falha do Gemini também).
      const webhook = process.env.N8N_WEBHOOK_DIAGNOSTICO
      if (webhook) {
        void fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            leadId,
            ...parsed,
            ddd,
            uf_inferida: uf,
            diagnostico: null,
            diagnostico_error: gem.error,
          }),
        }).catch(() => {})
      }

      return NextResponse.json(
        { ok: false, error: gem.error, leadId },
        { status: 200 }
      )
    }

    // 3) Atualiza lead com diagnóstico + métricas.
    await supabase
      .from("diagnostico_leads")
      .update({
        diagnostico_gerado: gem.markdown,
        diagnostico_tokens_used: gem.tokensUsed,
        diagnostico_tempo_ms: gem.tempoMs,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId)

    // 4) Dispara webhook n8n (não bloqueante).
    const webhook = process.env.N8N_WEBHOOK_DIAGNOSTICO
    if (webhook) {
      void fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          leadId,
          ...parsed,
          ddd,
          uf_inferida: uf,
          diagnostico: gem.markdown,
          tokensUsed: gem.tokensUsed,
          tempoMs: gem.tempoMs,
        }),
      }).catch(() => {})
    }

    return NextResponse.json(
      {
        ok: true,
        leadId,
        diagnostico: gem.markdown,
        tokensUsed: gem.tokensUsed,
        tempoMs: gem.tempoMs,
      },
      { status: 200 }
    )
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
    }
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}

