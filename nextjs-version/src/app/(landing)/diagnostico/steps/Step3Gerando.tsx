"use client"

import * as React from "react"

const MESSAGES = [
  "Analisando seu caso...",
  "Pensando nas melhores soluções...",
  "Estruturando o diagnóstico...",
] as const

export function Step3Gerando() {
  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length)
    }, 3000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden />
        Diagnóstico gratuito
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-900">
          Gerando seu pré-diagnóstico
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-600">
          Isso costuma levar alguns segundos.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="relative grid h-9 w-9 place-items-center" aria-hidden>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 animate-spin" />
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-600" />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-700">
            {MESSAGES[idx]}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500">
        Se passar de 30s, você pode tentar novamente — ou seguir no WhatsApp.
      </p>
    </div>
  )
}

