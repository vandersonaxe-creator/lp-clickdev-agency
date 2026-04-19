"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import type { PlanFrequency, PreventivePlan } from "@/lib/mock-data/plans"

export type PlansFilterState = {
  search: string
  status: "all" | "active" | "inactive" | "overdue" | "due_soon"
  frequency: "all" | PlanFrequency
  criticality: Set<Criticality>
}

function defaultCrit() {
  return new Set<Criticality>(["A", "B", "C"])
}

export function defaultPlansFilters(): PlansFilterState {
  return {
    search: "",
    status: "all",
    frequency: "all",
    criticality: defaultCrit(),
  }
}

export function plansFiltersActive(f: PlansFilterState): boolean {
  if (f.search.trim() !== "") return true
  if (f.status !== "all") return true
  if (f.frequency !== "all") return true
  if (f.criticality.size !== 3) return true
  return false
}

export function applyPlanFilters(
  rows: PreventivePlan[],
  f: PlansFilterState
): PreventivePlan[] {
  let out = rows
  const q = f.search.trim().toLowerCase()
  if (q) {
    out = out.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.asset.toLowerCase().includes(q)
    )
  }
  if (f.status === "active") {
    out = out.filter((p) => p.status !== "inactive")
  } else if (f.status === "inactive") {
    out = out.filter((p) => p.status === "inactive")
  } else if (f.status === "overdue") {
    out = out.filter((p) => p.status === "overdue")
  } else if (f.status === "due_soon") {
    out = out.filter((p) => p.status === "due_soon")
  }
  if (f.frequency !== "all") {
    out = out.filter((p) => p.frequency === f.frequency)
  }
  if (f.criticality.size === 0) return []
  if (f.criticality.size < 3) {
    out = out.filter((p) => f.criticality.has(p.criticality))
  }
  return out
}

export function PlansFiltersBar({
  value,
  onChange,
  onClear,
}: {
  value: PlansFilterState
  onChange: (next: PlansFilterState) => void
  onClear: () => void
}) {
  const active = plansFiltersActive(value)

  const toggleCrit = (c: Criticality) => {
    const next = new Set(value.criticality)
    if (next.has(c)) next.delete(c)
    else next.add(c)
    onChange({ ...value, criticality: next })
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="min-w-0 flex-1 space-y-1.5 lg:max-w-md">
          <Label className="sr-only">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do plano ou ativo..."
              value={value.search}
              onChange={(e) => onChange({ ...value, search: e.target.value })}
              className="h-10 pl-9"
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Status
            </Label>
            <Select
              value={value.status}
              onValueChange={(v) =>
                onChange({
                  ...value,
                  status: v as PlansFilterState["status"],
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
                <SelectItem value="active" className="cursor-pointer">
                  Ativos
                </SelectItem>
                <SelectItem value="inactive" className="cursor-pointer">
                  Inativos
                </SelectItem>
                <SelectItem value="overdue" className="cursor-pointer">
                  Em Atraso
                </SelectItem>
                <SelectItem value="due_soon" className="cursor-pointer">
                  A Vencer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Frequência
            </Label>
            <Select
              value={value.frequency}
              onValueChange={(v) =>
                onChange({
                  ...value,
                  frequency: v as PlansFilterState["frequency"],
                })
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[180px] cursor-pointer lg:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                  Todas
                </SelectItem>
                <SelectItem value="Mensal" className="cursor-pointer">
                  Mensal
                </SelectItem>
                <SelectItem value="Bimestral" className="cursor-pointer">
                  Bimestral
                </SelectItem>
                <SelectItem value="Trimestral" className="cursor-pointer">
                  Trimestral
                </SelectItem>
                <SelectItem value="Quadrimestral" className="cursor-pointer">
                  Quadrimestral
                </SelectItem>
                <SelectItem value="Semestral" className="cursor-pointer">
                  Semestral
                </SelectItem>
                <SelectItem value="Anual" className="cursor-pointer">
                  Anual
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
              const on = value.criticality.has(c)
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
          <Button type="button" variant="ghost" onClick={onClear}>
            Limpar filtros
          </Button>
        ) : null}
      </div>
    </div>
  )
}
