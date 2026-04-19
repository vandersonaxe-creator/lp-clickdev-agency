"use client"

import * as React from "react"
import { FileDown } from "lucide-react"
import { toast } from "sonner"

import { CalibrationKpiCards } from "@/components/calibrations/calibration-kpi-cards"
import { PlanDataTable } from "@/components/calibrations/plan-data-table"
import { PlanFiltersBar } from "@/components/calibrations/plan-filters"
import { Button } from "@/components/ui/button"
import {
  CALIBRATION_INSTRUMENTS,
  applyPlanFilters,
  defaultPlanFilters,
  sortPlanByNextCalibration,
} from "@/lib/mock-data/calibrations"

export function PlansPageContent() {
  const [filters, setFilters] = React.useState(() => defaultPlanFilters())
  const [boot, setBoot] = React.useState(true)

  React.useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const rows = React.useMemo(() => {
    const f = applyPlanFilters(CALIBRATION_INSTRUMENTS, filters)
    return sortPlanByNextCalibration(f)
  }, [filters])

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-foreground">
            Plano Metrológico
          </h1>
          <p className="text-sm text-muted-foreground">
            Planejamento e controle de calibração de todos os instrumentos
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() =>
            toast.message("Exportar PDF", { description: "Em desenvolvimento." })
          }
        >
          <FileDown className="size-4" />
          Exportar PDF
        </Button>
      </div>

      <CalibrationKpiCards variant="plan" loading={boot} />

      <PlanFiltersBar
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(defaultPlanFilters())}
      />

      <PlanDataTable data={rows} loading={boot} />
    </div>
  )
}
