import type { DiagnosticoEstruturado } from "@/types/diagnostico"

interface EnviarDiagnosticoN8nParams {
  leadId: string
  nome: string
  whatsapp: string
  email: string
  diagnostico: DiagnosticoEstruturado
}

export async function dispararDiagnosticoN8n(params: EnviarDiagnosticoN8nParams) {
  const url = process.env.N8N_WEBHOOK_DIAGNOSTICO
  const secret = process.env.N8N_WEBHOOK_SECRET

  if (!url || !secret) {
    console.error("[n8n] Env vars faltando")
    return { ok: false }
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": secret,
      },
      body: JSON.stringify({
        lead_id: params.leadId,
        nome: params.nome,
        whatsapp: params.whatsapp,
        email: params.email,
        diagnostico: params.diagnostico,
      }),
    })
    return { ok: res.ok }
  } catch (err) {
    console.error("[n8n] Falha:", err)
    return { ok: false }
  }
}

