"use client"

import { CheckCircle } from "lucide-react"

import { InstrumentCard } from "@/components/calibrations/instrument-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type {
  CalibrationInstrument,
  CalibrationKanbanStatus,
} from "@/lib/mock-data/calibrations"

const headerConfig: Record<
  CalibrationKanbanStatus,
  {
    title: string
    dot: string
    bar: string
    bg: string
  }
> = {
  expired: {
    title: "VENCIDAS",
    dot: "bg-red-500",
    bar: "border-b-2 border-destructive",
    bg: "bg-destructive/10",
  },
  expiring: {
    title: "VENCENDO EM 30 DIAS",
    dot: "bg-amber-500",
    bar: "border-b-2 border-amber-500",
    bg: "bg-amber-500/10",
  },
  valid: {
    title: "VÁLIDAS",
    dot: "bg-emerald-500",
    bar: "border-b-2 border-emerald-500",
    bg: "bg-emerald-500/10",
  },
}

const emptyCopy: Record<
  CalibrationKanbanStatus,
  { title: string; iconClass: string; box: string }
> = {
  expired: {
    title: "Nenhum instrumento vencido",
    iconClass: "text-emerald-500/50",
    box: "border border-dashed border-emerald-500/20 bg-emerald-500/5",
  },
  expiring: {
    title: "Nenhum instrumento neste período",
    iconClass: "text-amber-500/50",
    box: "border border-dashed border-amber-500/20 bg-amber-500/5",
  },
  valid: {
    title: "Nenhum instrumento válido listado",
    iconClass: "text-emerald-500/50",
    box: "border border-dashed border-emerald-500/20 bg-emerald-500/5",
  },
}

export function KanbanColumn({
  status,
  items,
  loading,
}: {
  status: CalibrationKanbanStatus
  items: CalibrationInstrument[]
  loading?: boolean
}) {
  const h = headerConfig[status]
  const count = items.length

  return (
    <div className="flex min-h-0 min-w-[300px] flex-1 flex-col rounded-xl border border-border bg-card/30">
      <div
        className={cn(
          "flex shrink-0 items-center gap-2 rounded-t-xl px-3 py-2.5",
          h.bg,
          h.bar
        )}
      >
        <span
          className={cn("size-2.5 shrink-0 rounded-full", h.dot)}
          aria-hidden
        />
        <span className="text-[12px] font-bold uppercase tracking-wide text-foreground">
          {h.title}
        </span>
        <Badge variant="secondary" className="ml-auto tabular-nums">
          {count}
        </Badge>
      </div>

      <div
        className={cn(
          "kanban-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3",
          "max-h-[calc(100vh-380px)]"
        )}
      >
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-[10px] border border-border bg-muted/40"
            />
          ))
        ) : count === 0 ? (
          <div
            className={cn(
              "flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg p-6 text-center",
              emptyCopy[status].box
            )}
          >
            <CheckCircle
              className={cn("size-12", emptyCopy[status].iconClass)}
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="text-sm text-muted-foreground">
              {emptyCopy[status].title}
            </p>
          </div>
        ) : (
          items.map((inst, idx) => (
            <InstrumentCard
              key={inst.tag}
              instrument={inst}
              status={status}
              styleDelayMs={idx * 60}
            />
          ))
        )}
      </div>
    </div>
  )
}
