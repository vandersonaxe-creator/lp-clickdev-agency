"use client"

import * as React from "react"

import { normalizeWhatsappBR, validateEmail, validateNome, validateWhatsappBR } from "@/lib/validators"

function stripBrazilCountryCode(input: string) {
  const digits = input.replace(/\D/g, "")
  if (digits.startsWith("55")) {
    const without = digits.slice(2)
    // Preserve formatting intent: rebuild from digits (light) by returning raw digits.
    return without
  }
  return digits.length ? digits : input
}

export function Step2Identificacao({
  defaultNome,
  defaultWhatsapp,
  defaultEmail,
  onBack,
  onSubmit,
}: {
  defaultNome: string
  defaultWhatsapp: string
  defaultEmail: string
  onBack: () => void
  onSubmit: (payload: { nome: string; whatsapp: string; email: string }) => void | Promise<void>
}) {
  const [nome, setNome] = React.useState(defaultNome)
  const [whatsapp, setWhatsapp] = React.useState(stripBrazilCountryCode(defaultWhatsapp))
  const [email, setEmail] = React.useState(defaultEmail)
  const [touched, setTouched] = React.useState(false)

  const nomeTrim = nome.trim()
  const whatsappTrim = whatsapp.trim()
  const emailTrim = email.trim()

  const nomeOk = validateNome(nomeTrim)
  const whatsappOk = validateWhatsappBR(`+55 ${whatsappTrim}`)
  const emailOk = validateEmail(emailTrim)

  const canSubmit = nomeOk && whatsappOk && emailOk

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        setTouched(true)
        if (!canSubmit) return
        await onSubmit({
          nome: nomeTrim,
          whatsapp: normalizeWhatsappBR(whatsappTrim),
          email: emailTrim,
        })
      }}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden />
        Diagnóstico gratuito
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-900">
          Pra mandar seu diagnóstico, só preciso de:
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-600">
          Sem spam. Você pode seguir no WhatsApp ou agendar quando quiser.
        </p>
      </div>

      <div className="grid gap-3">
        <div className="space-y-1">
          <label htmlFor="nome" className="text-sm font-medium text-slate-700 dark:text-slate-700">
            Nome
          </label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-slate-200 dark:bg-white dark:text-slate-900"
          />
          {touched && !nomeOk && (
            <p className="text-sm text-red-600">Digite seu nome (2–80 caracteres).</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="whatsapp" className="text-sm font-medium text-slate-700 dark:text-slate-700">
            WhatsApp
          </label>
          <div className="flex h-11 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/15 dark:border-slate-200 dark:bg-white">
            <div className="flex items-center gap-2 border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700">
              <span className="text-base leading-none" aria-hidden>
                🇧🇷
              </span>
              <span className="font-mono text-sm">+55</span>
            </div>
            <input
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => {
                const v = e.target.value
                const digits = v.replace(/\D/g, "")
                // If user pastes "+55...", keep input as BR local part.
                if (digits.startsWith("55")) {
                  setWhatsapp(digits.slice(2))
                  return
                }
                setWhatsapp(v)
              }}
              inputMode="tel"
              placeholder="(21) 9XXXX-XXXX"
              className="h-11 w-full bg-transparent px-3 text-base text-slate-900 outline-none dark:text-slate-900"
            />
          </div>
          {touched && !whatsappOk && (
            <p className="text-sm text-red-600">
              Informe um WhatsApp válido no padrão BR.
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-700">
            E-mail
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            placeholder="seu@email.com"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-slate-200 dark:bg-white dark:text-slate-900"
          />
          {touched && !emailOk && (
            <p className="text-sm text-red-600">Informe um e-mail válido.</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-base font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-200 dark:bg-white dark:text-slate-900"
        >
          Voltar
        </button>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Gerar diagnóstico
        </button>
      </div>
    </form>
  )
}

