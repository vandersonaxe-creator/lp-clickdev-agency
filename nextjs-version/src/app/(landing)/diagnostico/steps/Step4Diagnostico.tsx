"use client"

import { Calendar } from "lucide-react"

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
  const primeiroNome = firstName(nome)

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
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2">
          {calUrl ? (
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clickdev-diag-cta-pulse group relative inline-flex min-h-14 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] px-6 text-base font-extrabold text-white transition-[transform,box-shadow,filter,background-position] duration-200 hover:brightness-110 active:scale-[0.99] sm:min-h-[3.5rem] motion-reduce:shadow-none"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-full group-hover:opacity-100"
                aria-hidden
              />
              <Calendar className="mr-2 h-5 w-5 shrink-0 opacity-95" aria-hidden />
              Agendar (30 min · gratuito)
            </a>
          ) : (
            <div
              className="inline-flex min-h-14 w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-6 text-center text-sm font-semibold text-slate-500"
              role="status"
            >
              Defina <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CAL_URL</code> para habilitar o agendamento
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

