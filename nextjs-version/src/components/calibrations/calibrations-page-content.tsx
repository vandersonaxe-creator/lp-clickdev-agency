"use client"

import * as React from "react"
import Link from "next/link"
import { Download, Plus } from "lucide-react"
import { toast } from "sonner"

import { CalibrationKpiCards } from "@/components/calibrations/calibration-kpi-cards"
import { InstrumentCard } from "@/components/calibrations/instrument-card"
import { KanbanColumn } from "@/components/calibrations/kanban-column"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  CALIBRATION_KPI,
  instrumentsByKanbanStatus,
} from "@/lib/mock-data/calibrations"

export function CalibrationsPageContent() {
  const [boot, setBoot] = React.useState(true)

  React.useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const expired = instrumentsByKanbanStatus("expired")
  const expiring = instrumentsByKanbanStatus("expiring")
  const valid = instrumentsByKanbanStatus("valid")

  const exportToast = () =>
    toast.message("Exportar", { description: "Em desenvolvimento." })

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-foreground">
            Painel Metrológico
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie calibrações e certificados dos instrumentos de medição
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="gap-2">
            <Link href="/calibrations/new">
              <Plus className="size-4" />
              Nova Calibração
            </Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="gap-2"
            onClick={exportToast}
          >
            <Download className="size-4" />
            Exportar
          </Button>
        </div>
      </div>

      <CalibrationKpiCards loading={boot} variant="kanban" />

      {/* Desktop Kanban */}
      <div className="hidden gap-4 md:flex">
        <KanbanColumn
          status="expired"
          items={expired}
          loading={boot}
        />
        <KanbanColumn
          status="expiring"
          items={expiring}
          loading={boot}
        />
        <KanbanColumn status="valid" items={valid} loading={boot} />
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden">
        <Tabs defaultValue="expired" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-transparent p-0">
            <TabsTrigger
              value="expired"
              className={cn(
                "rounded-none border-b-2 border-transparent py-3 text-xs data-[state=active]:border-destructive data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              )}
            >
              Vencidas
              <Badge variant="destructive" className="ml-1 tabular-nums">
                {CALIBRATION_KPI.expired}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="expiring"
              className="rounded-none border-b-2 border-transparent py-3 text-xs data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Vencendo
              <Badge className="ml-1 border-amber-500/30 bg-amber-500/15 text-amber-800 dark:text-amber-200">
                {CALIBRATION_KPI.expiring30}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="valid"
              className="rounded-none border-b-2 border-transparent py-3 text-xs data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Válidas
              <Badge className="ml-1 border-emerald-500/30 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200">
                {CALIBRATION_KPI.valid}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="expired" className="mt-4 space-y-3">
            {boot
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-[10px] border bg-muted/40"
                  />
                ))
              : expired.map((inst, idx) => (
                  <InstrumentCard
                    key={inst.tag}
                    instrument={inst}
                    status="expired"
                    styleDelayMs={idx * 60}
                  />
                ))}
          </TabsContent>
          <TabsContent value="expiring" className="mt-4 space-y-3">
            {boot
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-[10px] border bg-muted/40"
                  />
                ))
              : expiring.map((inst, idx) => (
                  <InstrumentCard
                    key={inst.tag}
                    instrument={inst}
                    status="expiring"
                    styleDelayMs={idx * 60}
                  />
                ))}
          </TabsContent>
          <TabsContent value="valid" className="mt-4 space-y-3">
            {boot
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-[10px] border bg-muted/40"
                  />
                ))
              : valid.map((inst, idx) => (
                  <InstrumentCard
                    key={inst.tag}
                    instrument={inst}
                    status="valid"
                    styleDelayMs={idx * 60}
                  />
                ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
