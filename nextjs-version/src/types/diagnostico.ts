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

export type Esforco = "baixo" | "medio" | "alto"
export type ImpactoNivel = "pequeno" | "moderado" | "alto" | "transformador"

export interface CaminhoSolucao {
  titulo: string
  descricao: string
  esforco: Esforco
  prazo_estimado: string
  impacto_tempo: string
  impacto_economico: string
  impacto_organizacional: string
}

export interface DiagnosticoEstruturado {
  resumo_situacao: string
  caminhos: [CaminhoSolucao, CaminhoSolucao, CaminhoSolucao]
  recomendacao_inicial: {
    caminho_sugerido: string
    justificativa: string
  }
  proximo_passo: string
}

export type DiagnosticoGerarResponse =
  | {
      ok: true
      leadId: string
      diagnostico: DiagnosticoEstruturado
      tokensUsed: number
      tempoMs: number
    }
  | {
      ok: false
      leadId?: string
      error: string
    }

