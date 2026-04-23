import OpenAI from "openai"

import type { DiagnosticoEstruturado } from "@/types/diagnostico"

type GerarDiagnosticoInput = {
  gargalo: string
  nome: string
  uf: string | null
}

type GerarDiagnosticoOk = {
  diagnostico: DiagnosticoEstruturado
  tokens: number
  tempoMs: number
}

type GerarDiagnosticoErr = {
  error: string
}

export async function gerarDiagnostico(
  input: GerarDiagnosticoInput
): Promise<GerarDiagnosticoOk | GerarDiagnosticoErr> {
  const started = performance.now()

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { error: "missing_openai_api_key" }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini"

  const openai = new OpenAI({
    apiKey,
    timeout: 25_000,
  })

  const SYSTEM_PROMPT = `Você é um consultor sênior em transformação digital na Click Dev, consultoria brasileira que ajuda empresas de médio porte a substituir processos manuais por operações digitais mais eficientes.

Seu interlocutor é um GESTOR ou DONO de empresa — inteligente, experiente no negócio dele, mas SEM background técnico. Ele não sabe (nem precisa saber) o que é API, webhook, n8n, Supabase ou Google Apps Script.

REGRAS OBRIGATÓRIAS — violar qualquer uma invalida a resposta:

1. NUNCA cite nomes de ferramentas técnicas no output. Proibido: n8n, Supabase, Gemini, OpenAI, Google Apps Script, API, webhook, SDK, Next.js, Cursor, qualquer nome de biblioteca ou plataforma de desenvolvimento. Se precisar referir-se à tecnologia, use termos gerais como "sistema integrado", "plataforma conectada", "automação", "ferramenta digital".

2. FALE DE RESULTADO, não de meio. Errado: "Criar scripts em Google Apps Script para gerar relatórios". Certo: "Relatórios gerenciais gerados automaticamente toda segunda-feira, sem ninguém precisar montar planilha".

3. USE FAIXAS CONCRETAS de impacto, sempre nos 3 eixos:
   - Tempo (horas/semana devolvidas, dias economizados por mês)
   - Econômico (faixa de % de redução de custo OU faixa de receita recuperada)
   - Organizacional (o que muda no cotidiano da equipe)
   Use faixas honestas ("entre 8 e 15 horas por semana"), nunca números específicos inventados ("economiza 47%").

4. TOM DE NEGÓCIO. Você fala de igual pra igual com um dono de empresa. Não é humilde demais, não é condescendente, não é vendedor agressivo. É um par que entende do negócio dele.

5. NADA DE JARGÃO CORPORATIVO VAZIO. Proibido: "sinergia", "disruptivo", "alavancar", "escalar", "engajamento", "robusto", "solução de ponta", "ecossistema", "holístico".

6. RESUMO DA SITUAÇÃO deve mostrar que você ENTENDEU o problema real, não apenas repetiu. Demonstre empatia e clareza. Evite abrir com "Você está enfrentando um desafio" — comece direto no diagnóstico do problema.

7. Os 3 CAMINHOS devem ser progressivos em esforço: um de ganho rápido (baixo esforço), um de impacto médio, um mais estrutural. Diversifique os esforços — não coloque os três como "médio".

8. O NOME (título) de cada caminho deve ser uma solução que o gestor entenderia em 3 segundos. Exemplos bons: "Painel único de controle", "Relatórios gerenciais automáticos", "Central de avisos no WhatsApp". Exemplos ruins: "Integração de APIs", "Automação via n8n", "Pipeline de dados".

9. PROXIMO_PASSO deve ser uma frase convidativa pra reunião de 30min, personalizada com o nome do lead, sem soar genérica.

Formato de saída: JSON estrito seguindo o schema fornecido. Não inclua markdown, nem texto fora do JSON.`

  const diagnosticoSchema = {
    type: "object",
    properties: {
      resumo_situacao: { type: "string" },
      caminhos: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            titulo: { type: "string" },
            descricao: { type: "string" },
            esforco: { type: "string", enum: ["baixo", "medio", "alto"] },
            prazo_estimado: { type: "string" },
            impacto_tempo: { type: "string" },
            impacto_economico: { type: "string" },
            impacto_organizacional: { type: "string" },
          },
          required: [
            "titulo",
            "descricao",
            "esforco",
            "prazo_estimado",
            "impacto_tempo",
            "impacto_economico",
            "impacto_organizacional",
          ],
          additionalProperties: false,
        },
      },
      recomendacao_inicial: {
        type: "object",
        properties: {
          caminho_sugerido: { type: "string" },
          justificativa: { type: "string" },
        },
        required: ["caminho_sugerido", "justificativa"],
        additionalProperties: false,
      },
      proximo_passo: { type: "string" },
    },
    required: ["resumo_situacao", "caminhos", "recomendacao_inicial", "proximo_passo"],
    additionalProperties: false,
  } as const

  const { gargalo, nome, uf } = input
  const userPrompt = `Lead: ${nome} (UF: ${uf ?? "não informado"})

Gargalo descrito:
"${gargalo}"

Gere o pré-diagnóstico estruturado seguindo o schema e todas as regras do system prompt.`

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "diagnostico",
          strict: true,
          schema: diagnosticoSchema,
        },
      },
      temperature: 0.7,
      max_tokens: 1500,
    })

    const content = response.choices[0]?.message?.content
    if (!content) return { error: "empty_ai_response" }

    const diagnostico = JSON.parse(content) as DiagnosticoEstruturado
    const tokens =
      typeof (response as any)?.usage?.total_tokens === "number"
        ? (response as any).usage.total_tokens
        : 0
    const tempoMs = Math.round(performance.now() - started)

    return { diagnostico, tokens, tempoMs }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown_error"
    if (msg.toLowerCase().includes("timeout")) return { error: "openai_timeout" }
    return { error: "openai_error" }
  }
}

