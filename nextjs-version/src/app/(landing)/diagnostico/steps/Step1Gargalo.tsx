"use client"

import * as React from "react"

const MIN = 20
const MAX = 300

export function Step1Gargalo({
  defaultValue,
  onSubmit,
}: {
  defaultValue: string
  onSubmit: (gargalo: string) => void
}) {
  const [value, setValue] = React.useState(defaultValue)
  const trimmed = value.trim()
  const valid = trimmed.length >= MIN && trimmed.length <= MAX

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (!valid) return
        onSubmit(trimmed)
      }}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden />
        Diagnóstico gratuito
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-900">
          Qual é o principal gargalo que mais atrasa sua operação hoje?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-600">
          Pode explicar do seu jeito — quanto mais contexto, melhor fica o diagnóstico.
        </p>
      </div>

      <div className="space-y-2">
        <label className="sr-only" htmlFor="gargalo">
          Gargalo operacional
        </label>
        <textarea
          id="gargalo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ex: Perdemos 3 horas por dia controlando estoque em planilhas que vivem quebrando..."
          minLength={MIN}
          maxLength={MAX}
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-slate-200 dark:bg-white dark:text-slate-900"
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            {trimmed.length < MIN
              ? "Conta um pouco mais pra eu poder te ajudar de verdade"
              : "Perfeito — já dá pra trabalhar com isso."}
          </p>
          <p className="text-xs tabular-nums text-slate-500 dark:text-slate-500">{`${value.length}/${MAX}`}</p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </form>
  )
}

