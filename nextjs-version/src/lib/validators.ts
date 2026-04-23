const WHATSAPP_BR_REGEX =
  /^(\+?55)?\s?\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/

export function validateWhatsappBR(input: string): boolean {
  return WHATSAPP_BR_REGEX.test(input.trim())
}

export function normalizeWhatsappBR(input: string): string {
  const digits = input.replace(/\D/g, "")
  const normalized = digits.startsWith("55") ? digits : `55${digits}`
  return `+${normalized}`
}

export function validateEmail(input: string): boolean {
  // Usa uma validação prática (evita regex RFC gigante).
  const v = input.trim()
  if (v.length < 5 || v.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function validateNome(input: string): boolean {
  const v = input.trim()
  return v.length >= 2 && v.length <= 80
}

export function sanitizePlainText(input: string): string {
  // Remove HTML básico e normaliza whitespace.
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

export function getWhatsAppHref(
  fallbackE164: string | null,
  message: string
): string {
  const n = (fallbackE164 ?? "").replace(/\D/g, "")
  const base = n.length >= 10 ? `https://wa.me/${n}` : "https://wa.me/"
  const text = encodeURIComponent(message)
  return `${base}?text=${text}`
}

