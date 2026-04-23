"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { getWhatsAppHref } from "@/lib/validators"

function firstLine(markdown: string): string {
  const lines = markdown.split("\n").map((l) => l.trim())
  return lines.find((l) => l.length > 0) ?? ""
}

export function Step4Diagnostico({
  diagnostico,
  nome,
}: {
  diagnostico: string
  nome: string
}) {
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL
  const fallbackNumber = process.env.NEXT_PUBLIC_WHATSAPP_FALLBACK

  const waHref = React.useMemo(() => {
    const headline = firstLine(diagnostico).slice(0, 140)
    const msg = `Olá! Eu sou ${nome}. Recebi meu pré-diagnóstico e quero aprofundar.\n\nResumo: ${headline}`
    return getWhatsAppHref(fallbackNumber ?? null, msg)
  }, [diagnostico, nome, fallbackNumber])

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">Seu pré-diagnóstico</h2>
        <p className="text-sm text-muted-foreground">
          Abaixo vai uma análise inicial — objetiva — pra você já sair com caminhos claros.
        </p>
      </div>

      <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2 prose-p:leading-relaxed prose-a:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{diagnostico}</ReactMarkdown>
      </article>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <a
          href={calUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          Agendar reunião de 30min (gratuita)
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-input bg-background px-6 text-base font-semibold text-foreground shadow-sm transition hover:bg-muted/50"
        >
          Continuar no WhatsApp
        </a>
      </div>

      {!calUrl && (
        <p className="text-xs text-muted-foreground">
          Defina <code>NEXT_PUBLIC_CAL_URL</code> para habilitar o botão de agendamento.
        </p>
      )}
    </div>
  )
}

