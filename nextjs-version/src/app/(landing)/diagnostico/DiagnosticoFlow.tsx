"use client"

import * as React from "react"

import { StepTransition } from "./components/StepTransition"
import { ProgressDots } from "./components/ProgressDots"
import { Step1Gargalo } from "./steps/Step1Gargalo"
import { Step2Identificacao } from "./steps/Step2Identificacao"
import { Step3Gerando } from "./steps/Step3Gerando"
import { Step4Diagnostico } from "./steps/Step4Diagnostico"
import type { DiagnosticoEstruturado, DiagnosticoLeadData, DiagnosticoUtmData } from "@/types/diagnostico"
import { getUtmFromLocation, getReferrerSafe } from "@/lib/tracking"
import { track } from "@/lib/tracking"
import { getWhatsAppHref } from "@/lib/validators"

type FlowState =
  | { step: "gargalo"; data: Partial<DiagnosticoLeadData> }
  | { step: "identificacao"; data: Partial<DiagnosticoLeadData> }
  | { step: "gerando"; data: DiagnosticoLeadData }
  | {
      step: "diagnostico"
      data: DiagnosticoLeadData
      diagnostico: DiagnosticoEstruturado
      leadId: string
      tokensUsed: number | null
      tempoMs: number | null
    }
  | {
      step: "erro"
      data: Partial<DiagnosticoLeadData>
      leadId: string | null
      message: string
    }

type Action =
  | { type: "SUBMIT_GARGALO"; gargalo: string }
  | { type: "SUBMIT_IDENTIFICACAO"; payload: Pick<DiagnosticoLeadData, "nome" | "whatsapp" | "email"> }
  | { type: "GERAR_START" }
  | {
      type: "GERAR_SUCCESS"
      diagnostico: DiagnosticoEstruturado
      leadId: string
      tokensUsed: number | null
      tempoMs: number | null
    }
  | { type: "GERAR_ERROR"; message: string; leadId?: string | null }
  | { type: "RESET" }

function reducer(state: FlowState, action: Action): FlowState {
  switch (action.type) {
    case "SUBMIT_GARGALO":
      return {
        step: "identificacao",
        data: { ...state.data, gargalo: action.gargalo },
      }
    case "SUBMIT_IDENTIFICACAO":
      return {
        step: "gerando",
        data: {
          nome: action.payload.nome,
          whatsapp: action.payload.whatsapp,
          email: action.payload.email,
          gargalo: (state.data.gargalo ?? "") as string,
        },
      }
    case "GERAR_START":
      if (state.step !== "gerando") return state
      return state
    case "GERAR_SUCCESS":
      if (state.step !== "gerando") return state
      return {
        step: "diagnostico",
        data: state.data,
        diagnostico: action.diagnostico,
        leadId: action.leadId,
        tokensUsed: action.tokensUsed,
        tempoMs: action.tempoMs,
      }
    case "GERAR_ERROR":
      return {
        step: "erro",
        data: state.data,
        leadId: action.leadId ?? null,
        message: action.message,
      }
    case "RESET":
      return { step: "gargalo", data: {} }
    default:
      return state
  }
}

async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input.trim().toLowerCase())
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export function DiagnosticoFlow() {
  const [state, dispatch] = React.useReducer(reducer, { step: "gargalo", data: {} })
  const [utm, setUtm] = React.useState<DiagnosticoUtmData | null>(null)
  const [referrer, setReferrer] = React.useState<string | null>(null)
  const fallbackNumber = process.env.NEXT_PUBLIC_WHATSAPP_FALLBACK ?? null

  React.useEffect(() => {
    const u = getUtmFromLocation()
    setUtm(u)
    setReferrer(getReferrerSafe())
    track("diagnostico_iniciado", { ...u, referrer: getReferrerSafe() })
  }, [])

  const totalInteractiveSteps = 3
  const activeStepIndex =
    state.step === "gargalo"
      ? 0
      : state.step === "identificacao"
        ? 1
        : 2

  const handleSubmitGargalo = (gargalo: string) => {
    track("diagnostico_step_1", {
      ...(utm ?? {}),
      gargalo_length: gargalo.length,
    })
    dispatch({ type: "SUBMIT_GARGALO", gargalo })
  }

  const handleSubmitIdentificacao = async (payload: Pick<DiagnosticoLeadData, "nome" | "whatsapp" | "email">) => {
    // MQL conversion (sem PII em texto puro)
    const emailHash = await sha256Hex(payload.email)
    const phoneHash = await sha256Hex(payload.whatsapp)

    track("diagnostico_step_2", { ...(utm ?? {}) })
    track("mql_conversion", { ...(utm ?? {}), email_hash: emailHash, phone_hash: phoneHash })

    dispatch({ type: "SUBMIT_IDENTIFICACAO", payload })
  }

  React.useEffect(() => {
    if (state.step !== "gerando") return

    const run = async () => {
      dispatch({ type: "GERAR_START" })

      const startedAt = performance.now()
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 30_000)

      try {
        const body = {
          ...state.data,
          utm: utm ?? undefined,
          referrer: referrer ?? undefined,
        }

        const res = await fetch("/api/diagnostico/gerar", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        })

        const json = await res.json()
        const tempoMs = Math.round(performance.now() - startedAt)

        if (!res.ok || json?.error) {
          track("diagnostico_gerado_erro", {
            ...(utm ?? {}),
            erro_tipo: json?.error ?? `http_${res.status}`,
          })
          dispatch({
            type: "GERAR_ERROR",
            message:
              "Não consegui gerar seu diagnóstico agora. Tente novamente em instantes ou fale conosco no WhatsApp.",
            leadId: json?.leadId ?? null,
          })
          return
        }

        track("diagnostico_gerado", {
          ...(utm ?? {}),
          tempo_ms: tempoMs,
          tokens_usados: json?.tokensUsed ?? null,
        })

        dispatch({
          type: "GERAR_SUCCESS",
          diagnostico: json.diagnostico as DiagnosticoEstruturado,
          leadId: json.leadId as string,
          tokensUsed: (json.tokensUsed ?? null) as number | null,
          tempoMs: (json.tempoMs ?? tempoMs) as number | null,
        })
      } catch (e) {
        track("diagnostico_gerado_erro", {
          ...(utm ?? {}),
          erro_tipo: e instanceof DOMException ? "timeout" : "fetch_error",
        })
        dispatch({
          type: "GERAR_ERROR",
          message:
            "Seu diagnóstico está demorando mais do que o esperado. Tente novamente ou continue no WhatsApp.",
        })
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void run()
  }, [state, utm, referrer])

  return (
    <div className="space-y-5">
      <ProgressDots total={totalInteractiveSteps} activeIndex={activeStepIndex} />

      <StepTransition>
        {state.step === "gargalo" ? (
          <Step1Gargalo
            defaultValue={state.data.gargalo ?? ""}
            onSubmit={handleSubmitGargalo}
          />
        ) : state.step === "identificacao" ? (
          <Step2Identificacao
            defaultNome={state.data.nome ?? ""}
            defaultWhatsapp={state.data.whatsapp ?? ""}
            defaultEmail={state.data.email ?? ""}
            onBack={() => dispatch({ type: "RESET" })}
            onSubmit={handleSubmitIdentificacao}
          />
        ) : state.step === "gerando" ? (
          <Step3Gerando />
        ) : state.step === "diagnostico" ? (
          <Step4Diagnostico diagnostico={state.diagnostico} nome={state.data.nome} />
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-700">{state.message}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => dispatch({ type: "RESET" })}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Tentar novamente
              </button>
              <a
                href={getWhatsAppHref(
                  fallbackNumber,
                  "Olá! Tive um problema ao gerar meu diagnóstico e quero continuar por aqui."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Continuar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </StepTransition>
    </div>
  )
}

