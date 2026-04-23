"use client"

import * as React from "react"

import { getWhatsAppHref } from "@/lib/validators"
import type { DiagnosticoEstruturado } from "@/types/diagnostico"
import { SeloPapel } from "../components/SeloPapel"

function firstName(fullName: string) {
  const p = fullName.trim().split(/\s+/).filter(Boolean)
  return p[0] ?? fullName
}

export function Step4Diagnostico({
  diagnostico,
  nome,
}: {
  diagnostico: DiagnosticoEstruturado
  nome: string
}) {
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL
  const fallbackNumber = process.env.NEXT_PUBLIC_WHATSAPP_FALLBACK
  const primeiroNome = firstName(nome)

  const waHref = React.useMemo(() => {
    const headline = diagnostico.resumo_situacao.slice(0, 160)
    const msg = `Olá! Eu sou ${nome}. Recebi meu pré-diagnóstico e quero aprofundar.\n\nResumo: ${headline}`
    return getWhatsAppHref(fallbackNumber ?? null, msg)
  }, [diagnostico.resumo_situacao, nome, fallbackNumber])

  return (
    <div className="space-y-6 pb-28 md:space-y-8">
      <header className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Olá, {primeiroNome}. Aqui está o que identificamos:
        </h2>
      </header>

      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">
          3 caminhos possíveis
        </h3>
        <div className="space-y-4">
          {diagnostico.caminhos.map((caminho) => (
            <article
              key={caminho.titulo}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:p-6"
            >
              <div className="space-y-2">
                <SeloPapel papel={caminho.papel} />
                <h4 className="text-lg font-semibold text-slate-900">
                  {caminho.titulo}
                </h4>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <p className="text-base font-medium text-slate-800 md:text-lg">
          {diagnostico.proximo_passo}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
        <p className="text-base font-medium text-slate-900">
          Quer transformar isso em um plano claro de execução?
        </p>
        <p className="mt-2 text-base leading-relaxed text-slate-700">
          Em 30 minutos, eu te ajudo a escolher o melhor ponto de partida, estimar impacto e
          definir o que faz sentido priorizar — sem conversa fiada.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/85 px-4 py-3 backdrop-blur shadow-[0_-4px_16px_rgba(0,0,0,0.04)] sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 sm:flex-row">
          <a
            href={calUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Agendar reunião de 30min (gratuita)
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Continuar no WhatsApp
          </a>
        </div>
        <p className="mx-auto mt-2 w-full max-w-4xl text-xs text-slate-500">
          📱 Enviamos uma mensagem no seu WhatsApp com o resumo. Se preferir, também mandamos por email.
        </p>
        {!calUrl && (
          <p className="mx-auto mt-2 w-full max-w-4xl text-xs text-slate-500">
            Defina <code>NEXT_PUBLIC_CAL_URL</code> para habilitar o botão de agendamento.
          </p>
        )}
      </div>
    </div>
  )
}

