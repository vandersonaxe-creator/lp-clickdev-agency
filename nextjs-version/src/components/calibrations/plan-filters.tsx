"use client"

import { Search, X } from "lucide-react"

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
import type {
  InstrumentCategory,
  PlanFiltersState,
} from "@/lib/mock-data/calibrations"
import { planFiltersActive } from "@/lib/mock-data/calibrations"

export function PlanFiltersBar({
  value,
  onChange,
  onClear,
}: {
  value: PlanFiltersState
  onChange: (next: PlanFiltersState) => void
  onClear: () => void
}) {
  const active = planFiltersActive(value)

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card/50 p-4">
      <div className="min-w-[200px] max-w-sm flex-1 space-y-1.5">
        <Label className="sr-only">Busca</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por tag ou nome..."
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            className="h-10 pl-9"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Status
        </Label>
        <Select
          value={value.status}
          onValueChange={(v) =>
            onChange({ ...value, status: v as PlanFiltersState["status"] })
          }
        >
          <SelectTrigger className="h-10 w-[180px] cursor-pointer">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="valid">Válido</SelectItem>
            <SelectItem value="expiring">Vencendo</SelectItem>
            <SelectItem value="expired">Vencido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Categoria
        </Label>
        <Select
          value={value.category}
          onValueChange={(v) =>
            onChange({
              ...value,
              category: v as PlanFiltersState["category"],
            })
          }
        >
          <SelectTrigger className="h-10 w-[180px] cursor-pointer">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {(
              [
                "Dimensional",
                "Pressão",
                "Torque",
                "Elétrica",
              ] as InstrumentCategory[]
            ).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Empresa Calibradora
        </Label>
        <Select
          value={value.provider}
          onValueChange={(v) =>
            onChange({
              ...value,
              provider: v as PlanFiltersState["provider"],
            })
          }
        >
          <SelectTrigger className="h-10 min-w-[200px] cursor-pointer lg:w-[220px]">
            <SelectValue placeholder="Empresa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Calibra RJ">Calibra RJ</SelectItem>
            <SelectItem value="Metrolog">Metrolog</SelectItem>
            <SelectItem value="Torkcal">Torkcal</SelectItem>
            <SelectItem value="Presscal">Presscal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {active ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 shrink-0"
          onClick={onClear}
          aria-label="Limpar filtros"
        >
          <X className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}
