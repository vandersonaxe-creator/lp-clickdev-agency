"use client"

import * as React from "react"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Target,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { PlanningKpiSnapshot } from "@/lib/mock-data/planning"

export function PlanningKpiBar({
  kpis,
  loading,
  className,
}: {
  kpis: PlanningKpiSnapshot
  loading?: boolean
  className?: string
}) {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-[14px] border border-border bg-card p-4"
          >
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="mt-3 h-8 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  const conformLow = kpis.compliancePct < 90

  return (
    <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>
      <CompactKpi
        label="Programadas"
        value={`${kpis.scheduled} OS`}
        icon={Calendar}
        iconClassName="text-sky-500"
        iconWrapClassName="bg-sky-500/15"
      />
      <CompactKpi
        label="Executadas"
        value={`${kpis.completed} OS`}
        icon={CheckCircle}
        iconClassName="text-emerald-500"
        iconWrapClassName="bg-emerald-500/15"
      />
      <CompactKpi
        label="Atrasadas"
        value={`${kpis.overdue} OS`}
        icon={AlertTriangle}
        iconClassName="text-red-500"
        iconWrapClassName="bg-red-500/15"
        alert
      />
      <CompactKpi
        label="Conformidade"
        value={`${kpis.compliancePct}%`}
        icon={Target}
        iconClassName="text-amber-500"
        iconWrapClassName="bg-amber-500/15"
        valueClassName={
          conformLow ? "text-amber-600 dark:text-amber-400" : undefined
        }
      />
    </div>
  )
}

function CompactKpi({
  label,
  value,
  icon: Icon,
  iconClassName,
  iconWrapClassName,
  valueClassName,
  alert,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  iconClassName: string
  iconWrapClassName: string
  valueClassName?: string
  alert?: boolean
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[14px] border border-border bg-card p-4 shadow-none",
        alert && "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20"
      )}
    >
      {alert ? (
        <span
          className="absolute right-3 top-3 size-2 rounded-full bg-red-500 animate-pcm-pulse"
          aria-hidden
        />
      ) : null}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl",
            iconWrapClassName
          )}
        >
          <Icon className={cn("size-[18px]", iconClassName)} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p
            className={cn(
              "text-xl font-extrabold leading-none tracking-tight tabular-nums text-foreground",
              valueClassName
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}
