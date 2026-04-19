"use client"

import * as React from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

import { WoCalendarDay } from "@/components/work-orders/wo-calendar-day"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { WorkOrder } from "@/lib/mock-data/work-orders"

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

function buildDayMap(wos: WorkOrder[]): Map<string, WorkOrder[]> {
  const m = new Map<string, WorkOrder[]>()
  for (const w of wos) {
    const k = w.scheduled.slice(0, 10)
    if (!m.has(k)) m.set(k, [])
    m.get(k)!.push(w)
  }
  for (const arr of m.values()) {
    arr.sort((a, b) => a.wo_number.localeCompare(b.wo_number))
  }
  return m
}

export function WoCalendarView({
  workOrders,
  reference = new Date(),
}: {
  workOrders: WorkOrder[]
  reference?: Date
}) {
  const [cursor, setCursor] = React.useState(() =>
    startOfMonth(reference)
  )
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [pendingDay, setPendingDay] = React.useState<Date | null>(null)

  const dayMap = React.useMemo(
    () => buildDayMap(workOrders),
    [workOrders]
  )

  const gridDays = React.useMemo(() => {
    const ms = startOfMonth(cursor)
    const me = endOfMonth(cursor)
    const gs = startOfWeek(ms, { weekStartsOn: 1 })
    const ge = endOfWeek(me, { weekStartsOn: 1 })
    return eachDayOfInterval({ start: gs, end: ge })
  }, [cursor])

  const title = format(cursor, "MMMM yyyy", { locale: ptBR })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => setCursor((d) => addMonths(d, -1))}
            aria-label="Mês anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <h2 className="min-w-[160px] text-center text-lg font-semibold capitalize">
            {title}
          </h2>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => setCursor((d) => addMonths(d, 1))}
            aria-label="Próximo mês"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setCursor(startOfMonth(reference))}
        >
          Hoje
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-border bg-border">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="bg-muted/50 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {d}
          </div>
        ))}
        {gridDays.map((day) => {
          const key = format(day, "yyyy-MM-dd")
          const orders = dayMap.get(key) ?? []
          return (
            <WoCalendarDay
              key={key}
              day={day}
              monthCursor={cursor}
              today={reference}
              orders={orders}
              onEmptyClick={(d) => {
                setPendingDay(d)
                setDialogOpen(true)
              }}
            />
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Nova ordem de serviço?</DialogTitle>
            {pendingDay ? (
              <DialogDescription>
                Criar OS para {format(pendingDay, "dd/MM/yyyy", { locale: ptBR })}{" "}
                (placeholder).
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
                toast.message("Nova OS", {
                  description: pendingDay
                    ? `Data ${format(pendingDay, "dd/MM/yyyy")} — em desenvolvimento.`
                    : undefined,
                })
              }}
            >
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
