"use client"

import * as React from "react"
import { Settings } from "lucide-react"
import { toast } from "sonner"

import { AnnualGrid } from "@/components/planning/annual-grid"
import { MobilePlanningGroups } from "@/components/planning/mobile-planning-card"
import { PlanningControls } from "@/components/planning/planning-controls"
import { PlanningKpiBar } from "@/components/planning/planning-kpi-bar"
import type { GridCellActivatePayload } from "@/components/planning/grid-cell"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { PlanningAssetRow } from "@/lib/mock-data/planning"
import {
  TOTAL_ASSETS_WITH_PREVENTIVE_PLANS,
  applyPlanningFilters,
  defaultPlanningFilters,
  getPlanningAssetsForYear,
  getPlanningKpis,
  groupPlanningRows,
  PLANNING_MONTH_LABELS_SHORT,
} from "@/lib/mock-data/planning"

export function PlanningPageContent() {
  const [year, setYear] = React.useState(2026)
  const [filters, setFilters] = React.useState(() => defaultPlanningFilters())
  const [boot, setBoot] = React.useState(true)
  const [yearBusy, setYearBusy] = React.useState(false)

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [pendingOs, setPendingOs] = React.useState<{
    tag: string
    name: string
    month: string
  } | null>(null)

  React.useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const requestYear = React.useCallback((y: number) => {
    if (y === year || yearBusy) return
    setYearBusy(true)
    window.setTimeout(() => {
      setYear(y)
      setYearBusy(false)
    }, 500)
  }, [year, yearBusy])

  const loading = boot || yearBusy

  const rows = React.useMemo(
    () => applyPlanningFilters(getPlanningAssetsForYear(year), filters),
    [year, filters]
  )
  const groups = React.useMemo(() => groupPlanningRows(rows), [rows])
  const kpis = React.useMemo(() => getPlanningKpis(year), [year])

  const handleCellActivate = React.useCallback(
    (
      payload: GridCellActivatePayload & {
        asset: PlanningAssetRow
      }
    ) => {
      const { cell, asset, monthIndex } = payload
      if (cell.status === "not_generated") {
        setPendingOs({
          tag: asset.tag,
          name: asset.name,
          month: PLANNING_MONTH_LABELS_SHORT[monthIndex]!,
        })
        setDialogOpen(true)
        return
      }
      if (cell.workOrderId) {
        toast.info(`Abrir OS ${cell.workOrderId}`, {
          description: "Visualização da ordem de serviço (mock).",
        })
      }
    },
    []
  )

  const handleMobileMonth = React.useCallback(
    (args: {
      asset: PlanningAssetRow
      monthIndex: number
      cell: NonNullable<PlanningAssetRow["months"][number]>
    }) => {
      const { asset, monthIndex, cell } = args
      handleCellActivate({
        cell,
        monthIndex,
        asset,
      })
    },
    [handleCellActivate]
  )

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-foreground">
            Planejamento Anual
          </h1>
          <p className="text-sm text-muted-foreground">
            Ano {year} — {TOTAL_ASSETS_WITH_PREVENTIVE_PLANS} ativos com planos
            preventivos
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="shrink-0 gap-2"
          onClick={() =>
            toast.message("Em desenvolvimento", {
              description: "Configurações do ciclo de manutenção.",
            })
          }
        >
          <Settings className="size-4" aria-hidden />
          Configurações do Ciclo
        </Button>
      </div>

      <PlanningControls
        year={year}
        onYearChange={requestYear}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters(defaultPlanningFilters())}
      />

      <PlanningKpiBar kpis={kpis} loading={loading} />

      <div className="hidden md:block">
        <AnnualGrid
          groups={groups}
          year={year}
          loading={loading}
          onCellActivate={handleCellActivate}
        />
      </div>

      <div className="md:hidden">
        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-[14px] border border-border bg-card p-4"
              >
                <div className="h-5 w-32 rounded bg-muted" />
                <div className="mt-4 flex justify-between gap-1">
                  {Array.from({ length: 12 }).map((__, j) => (
                    <div key={j} className="size-6 rounded-sm bg-muted" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <MobilePlanningGroups
            groups={groups}
            year={year}
            onMonthTap={handleMobileMonth}
          />
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Criar ordem de serviço?</DialogTitle>
            {pendingOs ? (
              <DialogDescription>
                {`Criar OS para ${pendingOs.tag} — ${pendingOs.name} em ${pendingOs.month} de ${year}?`}
              </DialogDescription>
            ) : null}
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={() => {
                setDialogOpen(false)
                toast.success("OS registrada (mock)", {
                  description: pendingOs
                    ? `${pendingOs.tag} · ${pendingOs.month}/${year}`
                    : undefined,
                })
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
