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
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">
          Gerando seu pré-diagnóstico
        </h2>
        <p className="text-sm text-muted-foreground">
          Isso costuma levar alguns segundos.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/30 p-4">
        <div className="flex items-center gap-3">
          <div
            className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary"
            aria-hidden
          />
          <p className="text-sm font-medium text-foreground/80">{MESSAGES[idx]}</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Se passar de 30s, você pode tentar novamente — ou seguir no WhatsApp.
      </p>
    </div>
  )
}

