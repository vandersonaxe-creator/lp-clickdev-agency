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
import type { AssetStatus, AssetType, Criticality } from "@/lib/mock-data/assets"

export type AssetsFilterState = {
  search: string
  type: "all" | AssetType
  status: "all" | AssetStatus
  location: string
  criticality: Set<Criticality>
}

const defaultCriticality = (): Set<Criticality> =>
  new Set<Criticality>(["A", "B", "C"])

export function defaultAssetsFilters(): AssetsFilterState {
  return {
    search: "",
    type: "all",
    status: "all",
    location: "all",
    criticality: defaultCriticality(),
  }
}

export function filtersAreActive(f: AssetsFilterState): boolean {
  if (f.search.trim() !== "") return true
  if (f.type !== "all") return true
  if (f.status !== "all") return true
  if (f.location !== "all") return true
  if (f.criticality.size !== 3) return true
  return false
}

const LOCATION_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "Galpão 1", label: "Galpão 1" },
  { value: "Galpão 2", label: "Galpão 2" },
  { value: "Galpão 3", label: "Galpão 3" },
  { value: "Lab. Metrologia", label: "Lab. Metrologia" },
  { value: "Planta Forge", label: "Planta Forge" },
]

export function AssetsFilters({
  value,
  onChange,
  onClear,
}: {
  value: AssetsFilterState
  onChange: (next: AssetsFilterState) => void
  onClear: () => void
}) {
  const active = filtersAreActive(value)

  const toggleCrit = (c: Criticality) => {
    const next = new Set(value.criticality)
    if (next.has(c)) next.delete(c)
    else next.add(c)
    onChange({ ...value, criticality: next })
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="min-w-0 flex-1 space-y-1.5 lg:max-w-[min(100%,420px)] lg:flex-[2]">
          <Label className="sr-only">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por tag, nome ou fabricante..."
              value={value.search}
              onChange={(e) =>
                onChange({ ...value, search: e.target.value })
              }
              className="h-10 w-full min-w-0 pl-9 lg:max-w-[300px] lg:grow"
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto lg:grid-cols-none lg:flex lg:flex-wrap lg:items-end lg:gap-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Tipo
            </Label>
            <Select
              value={value.type}
              onValueChange={(v) =>
                onChange({
                  ...value,
                  type: v as AssetsFilterState["type"],
                })
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[160px] cursor-pointer lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                  Todos
                </SelectItem>
                <SelectItem value="equipment" className="cursor-pointer">
                  Equipamentos
                </SelectItem>
                <SelectItem value="instrument" className="cursor-pointer">
                  Instrumentos
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Status
            </Label>
            <Select
              value={value.status}
              onValueChange={(v) =>
                onChange({
                  ...value,
                  status: v as AssetsFilterState["status"],
                })
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[160px] cursor-pointer lg:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                  Todos
                </SelectItem>
                <SelectItem value="active" className="cursor-pointer">
                  Ativo
                </SelectItem>
                <SelectItem value="inactive" className="cursor-pointer">
                  Inativo
                </SelectItem>
                <SelectItem value="maintenance" className="cursor-pointer">
                  Em Manutenção
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Localização
            </Label>
            <Select
              value={value.location}
              onValueChange={(loc) =>
                onChange({
                  ...value,
                  location: loc,
                })
              }
            >
              <SelectTrigger className="h-10 w-full min-w-[180px] cursor-pointer lg:w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_OPTIONS.map((loc) => (
                  <SelectItem
                    key={loc.value}
                    value={loc.value}
                    className="cursor-pointer"
                  >
                    {loc.label}
                  </SelectItem>
                ))}
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
          <Button
            type="button"
            variant="ghost"
            className="w-full shrink-0 sm:w-auto"
            onClick={onClear}
          >
            Limpar filtros
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export function applyAssetFilters<T extends { tag: string; name: string; manufacturer: string; type: AssetType; status: AssetStatus; location: string; criticality: Criticality }>(
  rows: T[],
  f: AssetsFilterState
): T[] {
  let out = rows
  const q = f.search.trim().toLowerCase()
  if (q) {
    out = out.filter(
      (a) =>
        a.tag.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.manufacturer.toLowerCase().includes(q)
    )
  }
  if (f.type !== "all") {
    out = out.filter((a) => a.type === f.type)
  }
  if (f.status !== "all") {
    out = out.filter((a) => a.status === f.status)
  }
  if (f.location !== "all") {
    out = out.filter((a) => a.location === f.location)
  }
  if (f.criticality.size === 0) {
    return []
  }
  if (f.criticality.size < 3) {
    out = out.filter((a) => f.criticality.has(a.criticality))
  }
  return out
}
