"use client"

import type { DiagnosticoUtmData } from "@/types/diagnostico"

export type TrackPayload = Record<string, string | number | boolean | null | undefined>

function safeSessionStorageGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSessionStorageSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

const UTM_KEY = "clickdev:utm"

export function getUtmFromLocation(): DiagnosticoUtmData {
  if (typeof window === "undefined") return {}

  const existing = safeSessionStorageGet(UTM_KEY)
  if (existing) {
    try {
      return JSON.parse(existing) as DiagnosticoUtmData
    } catch {
      // ignore and overwrite below
    }
  }

  const url = new URL(window.location.href)
  const utm: DiagnosticoUtmData = {
    utm_source: url.searchParams.get("utm_source") ?? undefined,
    utm_medium: url.searchParams.get("utm_medium") ?? undefined,
    utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
    utm_content: url.searchParams.get("utm_content") ?? undefined,
    utm_term: url.searchParams.get("utm_term") ?? undefined,
  }

  // Só persiste se tiver pelo menos um campo.
  if (Object.values(utm).some(Boolean)) {
    safeSessionStorageSet(UTM_KEY, JSON.stringify(utm))
  }

  return utm
}

export function getReferrerSafe(): string | null {
  if (typeof document === "undefined") return null
  const r = document.referrer?.trim()
  return r?.length ? r : null
}

export function track(event: string, payload: TrackPayload = {}): void {
  if (typeof window === "undefined") return

  const p: TrackPayload = { ...payload, event }

  // GTM dataLayer
  try {
    ;(window as any).dataLayer?.push(p)
  } catch {
    // ignore
  }

  // Facebook Pixel
  try {
    const fbq = (window as any).fbq
    if (typeof fbq === "function") {
      fbq("trackCustom", event, payload)
    }
  } catch {
    // ignore
  }

  // GA4 gtag
  try {
    const gtag = (window as any).gtag
    if (typeof gtag === "function") {
      gtag("event", event, payload)
    }
  } catch {
    // ignore
  }
}

