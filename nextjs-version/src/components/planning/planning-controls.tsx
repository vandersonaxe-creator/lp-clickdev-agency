"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Criticality } from "@/lib/mock-data/assets"
import type { PlanningFilters, PlanningAreaFilter } from "@/lib/mock-data/planning"
import { planningFiltersActive } from "@/lib/mock-data/planning"

const YEARS = [2025, 2026, 2027] as const

export function PlanningControls({
  year,
  onYearChange,
  filters,
  onFiltersChange,
  onClearFilters,
}: {
  year: number
  onYearChange: (y: number) => void
  filters: PlanningFilters
  onFiltersChange: (f: PlanningFilters) => void
  onClearFilters: () => void
}) {
  const active = planningFiltersActive(filters)

  const toggleCrit = (c: Criticality) => {
    const next = new Set(filters.criticality)
    if (next.has(c)) next.delete(c)
    else next.add(c)
    onFiltersChange({ ...filters, criticality: next })
  }

  const shiftYear = (dir: -1 | 1) => {
    const idx = YEARS.indexOf(year as (typeof YEARS)[number])
    const nextIdx = Math.min(YEARS.length - 1, Math.max(0, idx + dir))
    if (nextIdx !== idx) onYearChange(YEARS[nextIdx]!)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:flex-wrap xl:items-end xl:justify-between">
        <div className="space-y-2">
          <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Ano
          </Label>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0"
              onClick={() => shiftYear(-1)}
              aria-label="Ano anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex flex-wrap gap-2">
              {YEARS.map((y) => (
                <Button
                  key={y}
                  type="button"
                  variant={y === year ? "default" : "secondary"}
                  className={cn(
                    "min-w-[72px]",
                    y === year && "pointer-events-none shadow-sm"
                  )}
                  onClick={() => onYearChange(y)}
                >
                  {y}
                </Button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0"
              onClick={() => shiftYear(1)}
              aria-label="Próximo ano"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap xl:gap-4">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Área / Localização
            </Label>
            <Select
              value={filters.area}
              onValueChange={(v) =>
                onFiltersChange({ ...filters, area: v as PlanningAreaFilter })
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[200px] cursor-pointer lg:w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                  Todas as Áreas
                </SelectItem>
                <SelectItem value="galpao-1" className="cursor-pointer">
                  Galpão 1
                </SelectItem>
                <SelectItem value="galpao-2" className="cursor-pointer">
                  Galpão 2
                </SelectItem>
                <SelectItem value="galpao-3" className="cursor-pointer">
                  Galpão 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Técnico
            </Label>
            <Select
              value={filters.technician}
              onValueChange={(v) =>
                onFiltersChange({
                  ...filters,
                  technician: v as PlanningFilters["technician"],
                })
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[180px] cursor-pointer lg:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                  Todos
                </SelectItem>
                <SelectItem value="Vanderson" className="cursor-pointer">
                  Vanderson
                </SelectItem>
                <SelectItem value="Técnico 2" className="cursor-pointer">
                  Técnico 2
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Criticidade
          </Label>
          <div className="flex flex-wrap gap-2">
            {(["A", "B", "C"] as const).map((c) => {
              const on = filters.criticality.has(c)
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCrit(c)}
                  className={cn(
                    "h-9 min-w-[40px] rounded-lg border px-3 text-sm font-bold transition-colors",
                    c === "A" &&
                      (on
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-red-600/40 bg-red-600/10 text-red-600 opacity-60"),
                    c === "B" &&
                      (on
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-amber-500/40 bg-amber-500/10 text-amber-700 opacity-60 dark:text-amber-400"),
                    c === "C" &&
                      (on
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-emerald-600/40 bg-emerald-600/10 text-emerald-700 opacity-60 dark:text-emerald-400")
                  )}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>
        {active ? (
          <Button type="button" variant="ghost" onClick={onClearFilters}>
            Limpar filtros
          </Button>
        ) : null}
      </div>
    </div>
  )
}
