import type { Metadata } from "next"

import { DiagnosticoFlow } from "./DiagnosticoFlow"

export const metadata: Metadata = {
  title: "Diagnóstico Inteligente | Click Dev",
  description:
    "Descreva seu gargalo operacional e receba um pré-diagnóstico com caminhos de automação e IA — antes mesmo de agendar uma conversa.",
  robots: {
    index: true,
    follow: true,
  },
}

export default async function DiagnosticoPage() {
  return (
    <main className="relative isolate mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12),transparent_60%)] blur-2xl" />
        <div className="absolute -top-10 right-[-10rem] h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)] blur-2xl" />
      </div>

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-200 dark:bg-white/80 dark:text-slate-600">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden />
          Diagnóstico gratuito
        </div>
        <div className="space-y-2">
          <h1 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
            Entenda por onde começar:
          </h1>
          <p className="text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-600">
            Responda duas perguntas rápidas. Em seguida, você recebe um pré-diagnóstico
            estruturado (sem compromisso).
          </p>
        </div>
      </header>

      <section className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-200 dark:bg-white/80 sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"
        />
        <DiagnosticoFlow />
      </section>
    </main>
  )
}

