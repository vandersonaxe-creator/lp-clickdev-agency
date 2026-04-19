"use client"

import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FolderOpen,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { WO_KPI, type WoKpiFilterKey } from "@/lib/mock-data/work-orders"

const items: {
  key: WoKpiFilterKey
  label: string
  value: number
  sub: string
  icon: typeof Calendar
  iconClass: string
  wrapClass: string
  leftAccent?: "amber" | "red"
}[] = [
  {
    key: "planned",
    label: "Planejadas",
    value: WO_KPI.planned,
    sub: "aguardando início",
    icon: Calendar,
    iconClass: "text-muted-foreground",
    wrapClass: "bg-muted/60",
  },
  {
    key: "open",
    label: "Abertas",
    value: WO_KPI.open,
    sub: "prontas para execução",
    icon: FolderOpen,
    iconClass: "text-sky-500",
    wrapClass: "bg-sky-500/15",
  },
  {
    key: "in_progress",
    label: "Em Andamento",
    value: WO_KPI.in_progress,
    sub: "em execução agora",
    icon: Wrench,
    iconClass: "text-amber-500 animate-pulse",
    wrapClass: "bg-amber-500/15",
    leftAccent: "amber",
  },
  {
    key: "overdue",
    label: "Atrasadas",
    value: WO_KPI.overdue,
    sub: "prazo excedido",
    icon: AlertTriangle,
    iconClass: "text-red-500",
    wrapClass: "bg-red-500/15",
    leftAccent: "red",
  },
  {
    key: "completed_month",
    label: "Concluídas (mês)",
    value: WO_KPI.completed_month,
    sub: "em abril/2026",
    icon: CheckCircle,
    iconClass: "text-emerald-500",
    wrapClass: "bg-emerald-500/15",
  },
]

export function WoKpiCards({
  active,
  onSelect,
  loading,
}: {
  active: WoKpiFilterKey | null
  onSelect: (key: WoKpiFilterKey | null) => void
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-[70px] animate-pulse rounded-[12px] border border-border bg-card"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {items.map((it) => {
        const isOn = active === it.key
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onSelect(isOn ? null : it.key)}
            className={cn(
              "relative flex h-[70px] w-full items-center gap-3 rounded-[12px] border px-3 py-2 text-left transition-colors",
              "hover:bg-muted/40",
              isOn
                ? "border-primary border-l-4 border-l-primary bg-primary/10 shadow-sm"
                : cn(
                    "border-border bg-card",
                    it.leftAccent === "amber" && "border-l-4 border-l-amber-500",
                    it.leftAccent === "red" &&
                      it.value > 0 &&
                      "border-l-4 border-l-red-500"
                  )
            )}
          >
            {it.leftAccent === "red" && it.value > 0 ? (
              <span
                className="absolute right-3 top-3 size-2 rounded-full bg-red-500 animate-pcm-pulse"
                aria-hidden
              />
            ) : null}
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg",
                it.wrapClass
              )}
            >
              <it.icon className={cn("size-[18px]", it.iconClass)} aria-hidden />
            </div>
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {it.label}
              </p>
              <p className="text-xl font-extrabold leading-tight tabular-nums text-foreground">
                {it.value}
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                {it.sub}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
