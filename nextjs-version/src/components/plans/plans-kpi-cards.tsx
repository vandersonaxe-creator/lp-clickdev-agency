"use client"

import {
  AlertTriangle,
  CalendarCheck,
  Clock,
  PauseCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"

const items = [
  {
    title: "Planos Ativos",
    value: "30",
    subtitle: "com cronograma definido",
    icon: CalendarCheck,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    wrap: "bg-emerald-500/15",
    delay: 0,
    alert: false as const,
  },
  {
    title: "Em Atraso",
    value: "3",
    subtitle: "requerem atenção",
    icon: AlertTriangle,
    iconClass: "text-red-600 dark:text-red-400",
    wrap: "bg-red-500/15",
    delay: 60,
    alert: true as const,
  },
  {
    title: "A Vencer (7 dias)",
    value: "5",
    subtitle: "próximas execuções",
    icon: Clock,
    iconClass: "text-amber-600 dark:text-amber-400",
    wrap: "bg-amber-500/15",
    delay: 120,
    alert: false as const,
  },
  {
    title: "Inativos",
    value: "4",
    subtitle: "equipamentos desativados",
    icon: PauseCircle,
    iconClass: "text-zinc-500 dark:text-zinc-400",
    wrap: "bg-muted",
    delay: 180,
    alert: false as const,
  },
]

export function PlansKpiCards({ loading }: { loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[14px] border border-border bg-card p-4"
          >
            <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
            <div className="mt-3 h-3 w-28 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-8 w-12 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-36 animate-pulse rounded bg-muted" />
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
          className={cn(
            "animate-slide-up-pcm relative rounded-[14px] border border-border bg-card p-4 shadow-none transition-shadow hover:shadow-md",
            k.alert && "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20"
          )}
          style={{ animationDelay: `${k.delay}ms` }}
        >
          {k.alert ? (
            <span
              className="absolute right-4 top-4 size-2 animate-pcm-pulse rounded-full bg-red-500"
              aria-hidden
            />
          ) : null}
          <div className="flex items-start justify-between gap-2">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl",
                k.wrap
              )}
            >
              <k.icon className={cn("size-4", k.iconClass)} aria-hidden />
            </div>
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {k.title}
          </p>
          <p
            className={cn(
              "mt-1 text-2xl font-extrabold tabular-nums tracking-tight",
              k.alert && "text-red-600 dark:text-red-400"
            )}
          >
            {k.value}
          </p>
          <p
            className={cn(
              "mt-1 text-[12px] text-muted-foreground",
              k.alert && "text-red-600 dark:text-red-400"
            )}
          >
            {k.subtitle}
          </p>
        </div>
      ))}
    </div>
  )
}
