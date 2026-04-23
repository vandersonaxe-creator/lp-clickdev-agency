import { GoogleGenerativeAI } from "@google/generative-ai"

type GerarDiagnosticoInput = {
  gargalo: string
  nome: string
  uf: string | null
}

export type GerarDiagnosticoResult =
  | { ok: true; markdown: string; tokensUsed: number | null; tempoMs: number }
  | { ok: false; error: string; tempoMs: number }

function buildPrompt({ gargalo, nome, uf }: GerarDiagnosticoInput) {
  return `Você é um consultor sênior em automação e IA para PMEs brasileiras, trabalhando na Click Dev (nexupro.com.br / clickdev.com.br).

Um lead descreveu o seguinte gargalo operacional:

"${gargalo}"

Contexto do lead:
- Nome: ${nome}
- UF: ${uf ?? "não informado"}

Gere um pré-diagnóstico em português do Brasil, em markdown, com EXATAMENTE estas seções:

## 🔍 O que eu entendi do seu caso
(2-3 frases resumindo o problema com empatia e clareza técnica)

## 🎯 3 caminhos possíveis com IA e automação
1. **[Nome curto da solução]** — descrição em 1 frase + esforço estimado (baixo / médio / alto) + impacto esperado.
2. [idem]
3. [idem]

## ⚡ Por onde eu começaria
(1 parágrafo curto indicando o caminho de maior ROI considerando uma SMB brasileira)

## 📞 Próximo passo
(1 frase convidando para reunião de 30min para aprofundar)

REGRAS:
- Seja concreto. Cite ferramentas reais quando fizer sentido (n8n, Supabase, APIs de WhatsApp, Google Sheets, etc).
- NÃO invente números específicos de ROI ("reduz 47%"). Use faixas honestas ("redução significativa", "ganho de horas semanais").
- NÃO use jargão corporativo vazio ("sinergia", "disruptivo", "alavancar", "escalar").
- Tom: técnico, direto, respeitoso. Você fala de igual pra igual com um dono de empresa.
- Máximo 350 palavras no total.`
}

export async function gerarDiagnostico(
  input: GerarDiagnosticoInput,
  opts?: { timeoutMs?: number }
): Promise<GerarDiagnosticoResult> {
  const started = performance.now()
  const timeoutMs = opts?.timeoutMs ?? 25_000

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return { ok: false, error: "missing_gemini_api_key", tempoMs: Math.round(performance.now() - started) }
  }

  const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash"

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 700,
    },
  })

  const prompt = buildPrompt(input)

  try {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs)
      ),
    ])

    const text = result.response.text()
    const tempoMs = Math.round(performance.now() - started)

    const usageAny = (result.response as any).usageMetadata
    const tokensUsed =
      typeof usageAny?.totalTokenCount === "number"
        ? usageAny.totalTokenCount
        : typeof usageAny?.totalTokens === "number"
          ? usageAny.totalTokens
          : null

    return { ok: true, markdown: text, tokensUsed, tempoMs }
  } catch (e) {
    const tempoMs = Math.round(performance.now() - started)
    const msg = e instanceof Error ? e.message : "unknown_error"
    return { ok: false, error: msg === "timeout" ? "gemini_timeout" : "gemini_error", tempoMs }
  }
}

