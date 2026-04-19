"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon, ChevronDown, Search, X } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { WoFiltersState, WoStatus } from "@/lib/mock-data/work-orders"
import { woFiltersActive } from "@/lib/mock-data/work-orders"

const STATUS_OPTS: { value: WoStatus; label: string; dot: string }[] = [
  { value: "planned", label: "Planejada", dot: "bg-zinc-400" },
  { value: "open", label: "Aberta", dot: "bg-sky-500" },
  { value: "in_progress", label: "Em Andamento", dot: "bg-amber-500" },
  { value: "completed", label: "Concluída", dot: "bg-emerald-500" },
  { value: "cancelled", label: "Cancelada", dot: "bg-red-500" },
]

function statusLabel(f: WoFiltersState): string {
  if (f.status.size === 5) return "Todos os status"
  if (f.status.size === 0) return "Nenhum"
  if (f.status.size === 1) {
    const v = [...f.status][0]!
    return STATUS_OPTS.find((o) => o.value === v)?.label ?? "Status"
  }
  return `${f.status.size} status`
}

export function WoFiltersBar({
  value,
  onChange,
  onClear,
}: {
  value: WoFiltersState
  onChange: (next: WoFiltersState) => void
  onClear: () => void
}) {
  const active = woFiltersActive(value)

  const toggleStatus = (s: WoStatus) => {
    const next = new Set(value.status)
    if (next.has(s)) next.delete(s)
    else next.add(s)
    onChange({ ...value, status: next })
  }

  const range: DateRange | undefined =
    value.dateFrom || value.dateTo
      ? { from: value.dateFrom ?? undefined, to: value.dateTo ?? undefined }
      : undefined

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card/50 p-4 md:gap-3">
      <div className="w-full min-w-[200px] max-w-[280px] flex-1 space-y-1.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nº da OS, título ou ativo..."
            value={value.search}
            onChange={(e) =>
              onChange({ ...value, search: e.target.value })
            }
            className="h-10 pl-9"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Status
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-10 w-[200px] justify-between font-normal"
            >
              <span className="truncate">{statusLabel(value)}</span>
              <ChevronDown className="size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3" align="start">
            <div className="space-y-2">
              {STATUS_OPTS.map((o) => (
                <label
                  key={o.value}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={value.status.has(o.value)}
                    onCheckedChange={() => toggleStatus(o.value)}
                  />
                  <span
                    className={cn("size-2 shrink-0 rounded-full", o.dot)}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      o.value === "cancelled" && "line-through opacity-80"
                    )}
                  >
                    {o.label}
                  </span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Tipo
        </Label>
        <Select
          value={value.type}
          onValueChange={(v) =>
            onChange({ ...value, type: v as WoFiltersState["type"] })
          }
        >
          <SelectTrigger className="h-10 w-[180px] cursor-pointer">
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="preventive" className="cursor-pointer">
              🔧 Preventiva
            </SelectItem>
            <SelectItem value="corrective" className="cursor-pointer">
              ⚡ Corretiva
            </SelectItem>
            <SelectItem value="inspection" className="cursor-pointer">
              🔍 Inspeção
            </SelectItem>
            <SelectItem value="calibration" className="cursor-pointer">
              📐 Calibração
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Prioridade
        </Label>
        <Select
          value={value.priority}
          onValueChange={(v) =>
            onChange({ ...value, priority: v as WoFiltersState["priority"] })
          }
        >
          <SelectTrigger className="h-10 w-[160px] cursor-pointer">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="low" className="cursor-pointer text-zinc-600">
              Baixa
            </SelectItem>
            <SelectItem value="medium" className="cursor-pointer text-sky-600">
              Média
            </SelectItem>
            <SelectItem value="high" className="cursor-pointer text-orange-600">
              Alta
            </SelectItem>
            <SelectItem value="critical" className="cursor-pointer text-red-600">
              Crítica
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Responsável
        </Label>
        <Select
          value={value.assignee}
          onValueChange={(v) =>
            onChange({
              ...value,
              assignee: v as WoFiltersState["assignee"],
            })
          }
        >
          <SelectTrigger className="h-10 w-[160px] cursor-pointer">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Vanderson">Vanderson</SelectItem>
            <SelectItem value="Técnico 2">Técnico 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Período
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-10 w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 size-4 opacity-60" />
              {value.dateFrom && value.dateTo ? (
                <>
                  {format(value.dateFrom, "dd/MM/yyyy", { locale: ptBR })} —{" "}
                  {format(value.dateTo, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : value.dateFrom ? (
                format(value.dateFrom, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span className="text-muted-foreground">
                  Data início — Data fim
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={(r) => {
                onChange({
                  ...value,
                  dateFrom: r?.from ?? null,
                  dateTo: r?.to ?? null,
                })
              }}
              defaultMonth={value.dateFrom ?? undefined}
            />
          </PopoverContent>
        </Popover>
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
