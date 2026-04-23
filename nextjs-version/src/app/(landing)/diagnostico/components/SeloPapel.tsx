"use client"

import type { PapelEstrategico } from "@/types/diagnostico"

const PAPEL_CONFIG: Record<
  PapelEstrategico,
  { label: string; dot: string; text: string }
> = {
  primeiro_passo: {
    label: "PRIMEIRO PASSO",
    dot: "bg-blue-400",
    text: "text-blue-700",
  },
  base_estrutural: {
    label: "BASE ESTRUTURAL",
    dot: "bg-blue-600",
    text: "text-blue-800",
  },
  salto_estrategico: {
    label: "SALTO ESTRATÉGICO",
    dot: "bg-blue-900",
    text: "text-blue-900",
  },
}

export function SeloPapel({ papel }: { papel: PapelEstrategico }) {
  const cfg = PAPEL_CONFIG[papel]
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} aria-hidden />
      <span className={`text-xs font-semibold tracking-wider ${cfg.text}`}>
        {cfg.label}
      </span>
    </div>
  )
}

