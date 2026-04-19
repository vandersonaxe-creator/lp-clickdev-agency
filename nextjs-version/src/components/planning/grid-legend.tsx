"use client"

import { AlertTriangle, Calendar, Check, Clock, Wrench } from "lucide-react"

import { cn } from "@/lib/utils"

const items: {
  Icon: typeof Check
  label: string
  className: string
  dashed?: boolean
}[] = [
  { Icon: Check, label: "Concluída", className: "text-emerald-400" },
  { Icon: Wrench, label: "Em Andamento", className: "text-amber-400" },
  { Icon: Calendar, label: "Planejada", className: "text-sky-400" },
  { Icon: AlertTriangle, label: "Atrasada", className: "text-red-400" },
  {
    Icon: Clock,
    label: "Não Gerada",
    className: "text-muted-foreground opacity-50",
    dashed: true,
  },
]

export function GridLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border bg-muted/30 px-4 py-2",
        className
      )}
    >
      {items.map(({ Icon, label, className: ic, dashed }) => (
        <div key={label} className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-[10px] shrink-0 items-center justify-center",
              dashed && "rounded border border-dashed border-muted-foreground/40"
            )}
            aria-hidden
          >
            <Icon className={cn("size-[10px]", ic)} strokeWidth={2.5} />
          </span>
          <span className="text-[12px] text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}
