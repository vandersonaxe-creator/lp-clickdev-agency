"use client"

import {
  AlertTriangle,
  ClipboardList,
  Clock,
  Gauge,
  Settings,
  Target,
} from "lucide-react"

import { KpiCard } from "@/components/dashboard/kpi-card"
import { cn } from "@/lib/utils"

function mttrTone(hours: number) {
  if (hours <= 2) return "text-emerald-600 dark:text-emerald-400"
  if (hours <= 4) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function conformityTone(pct: number) {
  if (pct >= 90) return "text-emerald-600 dark:text-emerald-400"
  if (pct >= 70) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

export function PcmKpiSection() {
  const mttr = 2.4
  const conf = 82

  return (
    <section className="px-4 lg:px-6" data-tour="kpis">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-[14px] font-bold leading-tight tracking-[0.02em] text-foreground">
          PCM Industrial
        </h1>
        <p className="text-[12px] font-normal text-muted-foreground">
          Forge Indústria · KPIs e indicadores (demonstração)
        </p>
      </div>

      <div
        className={cn(
          "grid gap-4",
          "grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
        )}
      >
        <KpiCard
          icon={Settings}
          label="Ativos Operacionais"
          value={54}
          sub="34 equip · 20 instr"
          href="/assets"
          delay={0}
          iconClassName="text-[#2563EB]"
          iconWrapClassName="bg-blue-100 dark:bg-blue-950/40"
        />

        <KpiCard
          icon={ClipboardList}
          label="OS Abertas"
          value={7}
          sub="3 preventivas · 4 corretivas"
          href="/work-orders"
          delay={60}
          trend={{ direction: "up", label: "", sentiment: "good" }}
          iconClassName="text-[#2563EB]"
          iconWrapClassName="bg-blue-100 dark:bg-blue-950/40"
        />

        <KpiCard
          icon={AlertTriangle}
          label="Preventivas Atrasadas"
          value={3}
          sub="requerem atenção imediata"
          href="/planning"
          delay={120}
          severity="alert-red"
          iconClassName="text-red-500"
          iconWrapClassName="bg-red-100 dark:bg-red-950/40"
          valueClassName="text-red-600 dark:text-red-400 font-extrabold"
          subClassName="text-red-600 dark:text-red-400"
        />

        <KpiCard
          icon={Gauge}
          label="Calibrações Vencidas"
          value={4}
          sub="2 vencem em 7 dias"
          href="/calibrations"
          delay={180}
          severity="alert-amber"
          iconClassName="text-amber-500"
          iconWrapClassName="bg-amber-100 dark:bg-amber-950/40"
          valueClassName="text-amber-600 dark:text-amber-400 font-extrabold"
        />

        <KpiCard
          icon={Target}
          label="Conformidade"
          value={conf}
          suffix="%"
          sub="meta: 90%"
          delay={240}
          trend={{ direction: "up", label: "+3% vs mês ant.", sentiment: "good" }}
          iconClassName={conformityTone(conf)}
          iconWrapClassName="bg-amber-100/80 dark:bg-amber-950/30"
          valueClassName={conformityTone(conf)}
        />

        <KpiCard
          icon={Clock}
          label="MTTR Médio"
          value="2.4"
          suffix="h"
          sub="média últimos 30 dias"
          delay={300}
          trend={{ direction: "down", label: "vs mês ant.", sentiment: "good" }}
          iconClassName={mttrTone(mttr)}
          iconWrapClassName="bg-muted/60"
          valueClassName={cn("font-extrabold", mttrTone(mttr))}
        />
      </div>
    </section>
  )
}
