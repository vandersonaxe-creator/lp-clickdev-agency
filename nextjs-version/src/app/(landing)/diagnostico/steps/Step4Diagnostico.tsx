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

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm md:p-6">
        <p className="text-base leading-relaxed text-slate-700 md:text-lg">
          {diagnostico.resumo_situacao}
        </p>
      </section>

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
              <div className="flex flex-col gap-3">
                <div className="space-y-2">
                  <SeloPapel papel={caminho.papel} />
                  <h4 className="text-lg font-semibold text-slate-900">
                    {caminho.titulo}
                  </h4>
                </div>

                <p className="text-base leading-relaxed text-slate-700">
                  {caminho.descricao}
                </p>

                <div className="mt-1 border-t border-slate-100 pt-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        🕐 Tempo
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {caminho.impacto_tempo}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        💰 Econômico
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {caminho.impacto_economico}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        👥 Organizacional
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {caminho.impacto_organizacional}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 md:p-6">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-lg" aria-hidden>
            🎯
          </span>
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Por onde recomendamos começar
            </p>
            <p className="text-xl font-semibold text-blue-900">
              {diagnostico.recomendacao_inicial.caminho_sugerido}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              {diagnostico.recomendacao_inicial.justificativa}
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm italic text-slate-600">{diagnostico.proximo_passo}</p>

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
        {!calUrl && (
          <p className="mx-auto mt-2 w-full max-w-4xl text-xs text-slate-500">
            Defina <code>NEXT_PUBLIC_CAL_URL</code> para habilitar o botão de agendamento.
          </p>
        )}
      </div>
    </div>
  )
}

