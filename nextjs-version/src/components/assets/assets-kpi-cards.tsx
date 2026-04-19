"use client"

import { Activity, Gauge, Package, Wrench } from "lucide-react"

import { cn } from "@/lib/utils"

type Kpi = {
  title: string
  value: string
  subtitle?: string
  icon: typeof Package
  iconClass: string
  iconWrap: string
  badge?: { dot: "green" | "red"; label: string }
  valueClass?: string
  delay: number
}

const items: Kpi[] = [
  {
    title: "Total de Ativos",
    value: "54",
    subtitle: "cadastrados no sistema",
    icon: Package,
    iconClass: "text-blue-600 dark:text-blue-400",
    iconWrap: "bg-blue-500/15",
    delay: 0,
  },
  {
    title: "Equipamentos",
    value: "34",
    icon: Wrench,
    iconClass: "text-blue-600 dark:text-blue-400",
    iconWrap: "bg-blue-500/15",
    badge: { dot: "green", label: "32 operando" },
    delay: 60,
  },
  {
    title: "Instrumentos",
    value: "20",
    icon: Gauge,
    iconClass: "text-amber-600 dark:text-amber-400",
    iconWrap: "bg-amber-500/15",
    badge: { dot: "red", label: "4 calibrações vencidas" },
    delay: 120,
  },
  {
    title: "Disponibilidade",
    value: "94.1%",
    subtitle: "ativos operacionais",
    icon: Activity,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    iconWrap: "bg-emerald-500/15",
    valueClass: "text-emerald-600 dark:text-emerald-400",
    delay: 180,
  },
]

export function AssetsKpiCards({ loading }: { loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[14px] border border-border bg-card p-4"
          >
            <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
            <div className="mt-3 h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-32 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((k) => (
        <div
          key={k.title}
          className="animate-slide-up-pcm rounded-[14px] border border-border bg-card p-4 shadow-none transition-shadow hover:shadow-md"
          style={{ animationDelay: `${k.delay}ms` }}
        >
          <div className="flex items-start justify-between gap-2">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl",
                k.iconWrap
              )}
            >
              <k.icon className={cn("size-4", k.iconClass)} aria-hidden />
            </div>
            {k.badge ? (
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    k.badge.dot === "green" ? "bg-emerald-500" : "bg-red-500"
                  )}
                />
                {k.badge.label}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {k.title}
          </p>
          <p
            className={cn(
              "mt-1 text-2xl font-extrabold tabular-nums tracking-tight text-foreground",
              k.valueClass
            )}
          >
            {k.value}
          </p>
          {k.subtitle ? (
            <p className="mt-1 text-[12px] text-muted-foreground">{k.subtitle}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}
