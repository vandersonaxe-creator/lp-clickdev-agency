export type DiagnosticoUtmData = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

export type DiagnosticoLeadData = {
  nome: string
  whatsapp: string
  email: string
  gargalo: string
}

export type DiagnosticoGerarRequest = DiagnosticoLeadData & {
  utm?: DiagnosticoUtmData
  referrer?: string
}

export type DiagnosticoGerarResponse =
  | {
      ok: true
      leadId: string
      diagnostico: string
      tokensUsed: number | null
      tempoMs: number | null
    }
  | {
      ok: false
      leadId?: string
      error: string
    }

