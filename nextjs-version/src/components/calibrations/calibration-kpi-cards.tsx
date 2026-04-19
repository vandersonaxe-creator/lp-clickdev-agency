"use client"

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Gauge,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { CALIBRATION_KPI } from "@/lib/mock-data/calibrations"

const pctValid = Math.round(
  (CALIBRATION_KPI.valid / CALIBRATION_KPI.total) * 100
)

export function CalibrationKpiCards({
  variant = "kanban",
  loading,
}: {
  variant?: "kanban" | "plan"
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[88px] animate-pulse rounded-[12px] border border-border bg-card"
          />
        ))}
      </div>
    )
  }

  if (variant === "plan") {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <PlanKpi
          label="Total"
          value={String(CALIBRATION_KPI.total)}
          sub="instrumentos"
          tone="neutral"
        />
        <PlanKpi
          label="Válidos"
          value={String(CALIBRATION_KPI.valid)}
          sub=""
          tone="green"
          showBar
        />
        <PlanKpi
          label="Vencendo (30d)"
          value={String(CALIBRATION_KPI.expiring30)}
          sub=""
          tone="amber"
        />
        <PlanKpi
          label="Vencidos"
          value={String(CALIBRATION_KPI.expired)}
          sub=""
          tone="red"
          pulse
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="flex gap-3 rounded-[12px] border border-border bg-card p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15">
          <Gauge className="size-5 text-sky-500" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Total de Instrumentos
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-foreground">
            {CALIBRATION_KPI.total}
          </p>
          <p className="text-[11px] text-muted-foreground">
            cadastrados no sistema
          </p>
        </div>
      </div>

      <div className="flex gap-3 rounded-[12px] border border-border bg-card p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
          <CheckCircle className="size-5 text-emerald-500" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Válidos
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-foreground">
            {CALIBRATION_KPI.valid}
          </p>
          <p className="text-[11px] text-muted-foreground">
            calibrações em dia
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${pctValid}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            {pctValid}% ({CALIBRATION_KPI.valid}/{CALIBRATION_KPI.total})
          </p>
        </div>
      </div>

      <div className="relative flex gap-3 rounded-[12px] border border-border border-l-4 border-l-amber-500 bg-card p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
          <Clock className="size-5 text-amber-500" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Vencendo em 30 dias
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-foreground">
            {CALIBRATION_KPI.expiring30}
          </p>
          <p className="text-[11px] text-muted-foreground">
            requerem agendamento
          </p>
        </div>
      </div>

      <div className="relative flex gap-3 rounded-[12px] border border-border border-l-4 border-l-red-500 bg-card p-3">
        <span
          className="absolute right-3 top-3 size-2 rounded-full bg-red-500 animate-pcm-pulse"
          aria-hidden
        />
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
          <AlertTriangle className="size-5 text-red-500" aria-hidden />
        </div>
        <div className="min-w-0 pr-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Vencidos
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-foreground">
            {CALIBRATION_KPI.expired}
          </p>
          <p className="text-[11px] text-muted-foreground">
            ação imediata necessária
          </p>
        </div>
      </div>
    </div>
  )
}

function PlanKpi({
  label,
  value,
  sub,
  tone,
  showBar,
  pulse,
}: {
  label: string
  value: string
  sub: string
  tone: "neutral" | "green" | "amber" | "red"
  showBar?: boolean
  pulse?: boolean
}) {
  const pct = Math.round(
    (CALIBRATION_KPI.valid / CALIBRATION_KPI.total) * 100
  )
  return (
    <div
      className={cn(
        "relative rounded-[12px] border border-border bg-card p-3",
        tone === "red" && "border-l-4 border-l-red-500"
      )}
    >
      {pulse ? (
        <span
          className="absolute right-3 top-3 size-2 rounded-full bg-red-500 animate-pcm-pulse"
          aria-hidden
        />
      ) : null}
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-extrabold tabular-nums",
          tone === "green" && "text-emerald-600 dark:text-emerald-400",
          tone === "amber" && "text-amber-600 dark:text-amber-400",
          tone === "red" && "text-red-600 dark:text-red-400"
        )}
      >
        {value}
      </p>
      {sub ? (
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      ) : null}
      {showBar ? (
        <>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">{pct}%</p>
        </>
      ) : null}
    </div>
  )
}
