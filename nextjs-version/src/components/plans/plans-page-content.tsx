"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarX2, Play, Plus } from "lucide-react"
import { toast } from "sonner"

import { createPlansColumns } from "@/components/plans/plans-columns"
import { PlansDataTable } from "@/components/plans/plans-data-table"
import {
  applyPlanFilters,
  defaultPlansFilters,
  PlansFiltersBar,
  type PlansFilterState,
} from "@/components/plans/plans-filters"
import { PlansKpiCards } from "@/components/plans/plans-kpi-cards"
import { UpcomingExecutions } from "@/components/plans/upcoming-executions"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PLANS_MOCK } from "@/lib/mock-data/plans"

export function PlansPageContent() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [filters, setFilters] = React.useState<PlansFilterState>(() =>
    defaultPlansFilters()
  )

  React.useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = React.useMemo(
    () => applyPlanFilters(PLANS_MOCK, filters),
    [filters]
  )

  const columns = React.useMemo(() => createPlansColumns(), [])
  const empty = !loading && filtered.length === 0

  return (
    <TooltipProvider delayDuration={200}>
    <div className="flex flex-col gap-6 px-4 pb-8 lg:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
            Planos Preventivos
          </h1>
          <p className="text-[14px] text-muted-foreground">
            Gerencie e acompanhe o cronograma de manutenção preventiva
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() =>
                  toast.success("Geração de OS executada — 3 novas OS criadas")
                }
              >
                <Play className="mr-2 size-4" />
                Executar Geração
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              Gera OS automaticamente para planos que atingiram a data programada
            </TooltipContent>
          </Tooltip>
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/plans/new")}
          >
            <Plus className="mr-2 size-4" />
            Novo Plano
          </Button>
        </div>
      </div>

      <PlansKpiCards loading={loading} />

      {!loading ? (
        <PlansFiltersBar
          value={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultPlansFilters())}
        />
      ) : null}

      {loading ? (
        <PlansDataTable columns={columns} data={[]} loading />
      ) : empty ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/20 py-16">
          <CalendarX2 className="size-12 text-muted-foreground" strokeWidth={1.25} />
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              Nenhum plano encontrado
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Ajuste os filtros ou crie um novo plano preventivo
            </p>
          </div>
          <Button asChild>
            <Link href="/plans/new">
              <Plus className="mr-2 size-4" />
              Novo Plano
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <PlansDataTable columns={columns} data={filtered} />
          <UpcomingExecutions plans={PLANS_MOCK} />
        </>
      )}
    </div>
    </TooltipProvider>
  )
}
