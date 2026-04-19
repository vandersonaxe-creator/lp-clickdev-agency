"use client"

import * as React from "react"
import Link from "next/link"
import { LayoutGrid, List, Plus } from "lucide-react"

import { WoCalendarView } from "@/components/work-orders/wo-calendar-view"
import { WoDataTable } from "@/components/work-orders/wo-data-table"
import { WoFiltersBar } from "@/components/work-orders/wo-filters"
import { WoKpiCards } from "@/components/work-orders/wo-kpi-cards"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  applyWorkOrderFilters,
  defaultWoFilters,
  WORK_ORDERS_MOCK,
  type WoKpiFilterKey,
} from "@/lib/mock-data/work-orders"

export function WoPageContent() {
  const [view, setView] = React.useState<"list" | "calendar">("list")
  const [filters, setFilters] = React.useState(() => defaultWoFilters())
  const [kpiKey, setKpiKey] = React.useState<WoKpiFilterKey | null>(null)
  const [boot, setBoot] = React.useState(true)

  React.useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const reference = React.useMemo(() => new Date(), [])

  const rows = React.useMemo(
    () => applyWorkOrderFilters(WORK_ORDERS_MOCK, filters, kpiKey, reference),
    [filters, kpiKey, reference]
  )

  const emptyAction = (
    <Button asChild className="gap-2">
      <Link href="/work-orders/new">
        <Plus className="size-4" />
        Nova OS
      </Link>
    </Button>
  )

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="font-sans text-2xl font-extrabold tracking-tight text-foreground">
            Ordens de Serviço
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe e gerencie a execução das atividades de manutenção
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => {
              if (v === "list" || v === "calendar") setView(v)
              else if (!v) setView("list")
            }}
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            <ToggleGroupItem value="list" aria-label="Lista" className="gap-1.5 px-3">
              <List className="size-4" />
              Lista
            </ToggleGroupItem>
            <ToggleGroupItem
              value="calendar"
              aria-label="Calendário"
              className="gap-1.5 px-3"
            >
              <LayoutGrid className="size-4" />
              Calendário
            </ToggleGroupItem>
          </ToggleGroup>
          <Button asChild className="gap-2">
            <Link href="/work-orders/new">
              <Plus className="size-4" />
              Nova OS
            </Link>
          </Button>
        </div>
      </div>

      <WoKpiCards
        active={kpiKey}
        onSelect={setKpiKey}
        loading={boot}
      />

      <WoFiltersBar
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(defaultWoFilters())}
      />

      {view === "list" ? (
        <WoDataTable
          data={rows}
          loading={boot}
          emptyAction={emptyAction}
        />
      ) : (
        <div className="rounded-xl border border-border bg-card/30 p-4">
          <WoCalendarView workOrders={rows} reference={reference} />
        </div>
      )}
    </div>
  )
}
