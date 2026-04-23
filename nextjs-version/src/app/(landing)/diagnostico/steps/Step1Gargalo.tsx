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
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">
          Qual é o principal gargalo que mais atrasa sua operação hoje?
        </h2>
        <p className="text-sm text-muted-foreground">
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
          className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-base text-foreground shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {trimmed.length < MIN
              ? "Conta um pouco mais pra eu poder te ajudar de verdade"
              : "Perfeito — já dá pra trabalhar com isso."}
          </p>
          <p className="text-xs tabular-nums text-muted-foreground">{`${value.length}/${MAX}`}</p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </form>
  )
}

