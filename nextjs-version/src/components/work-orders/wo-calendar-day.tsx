"use client"

import { format, isSameDay, isSameMonth } from "date-fns"

import { WoCalendarChip } from "@/components/work-orders/wo-calendar-chip"
import { cn } from "@/lib/utils"
import type { WorkOrder } from "@/lib/mock-data/work-orders"
import { isWorkOrderOverdue } from "@/lib/mock-data/work-orders"

export function WoCalendarDay({
  day,
  monthCursor,
  today,
  orders,
  onEmptyClick,
}: {
  day: Date
  monthCursor: Date
  today: Date
  orders: WorkOrder[]
  onEmptyClick: (d: Date) => void
}) {
  const inMonth = isSameMonth(day, monthCursor)
  const isToday = isSameDay(day, today)
  const hasOverdue = orders.some((w) => isWorkOrderOverdue(w, today))
  const visible = orders.slice(0, 3)
  const rest = Math.max(0, orders.length - 3)
  const empty = orders.length === 0 && inMonth

  return (
    <div
      role={empty ? "button" : undefined}
      tabIndex={empty ? 0 : undefined}
      onClick={
        empty
          ? () => {
              onEmptyClick(day)
            }
          : undefined
      }
      onKeyDown={
        empty
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onEmptyClick(day)
              }
            }
          : undefined
      }
      className={cn(
        "flex min-h-[120px] flex-col gap-0.5 border border-border/60 p-1.5",
        !inMonth && "bg-muted/20 opacity-50",
        isToday && "border-primary bg-primary/5 ring-1 ring-primary/30",
        hasOverdue && "border-red-500/40 bg-red-500/5",
        empty && "cursor-pointer hover:bg-muted/30"
      )}
    >
      <div className="flex justify-between gap-1">
        <span
          className={cn(
            "text-[14px] tabular-nums text-muted-foreground",
            isToday && "font-bold text-primary"
          )}
        >
          {format(day, "d")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        {visible.map((wo) => (
          <WoCalendarChip key={wo.id} wo={wo} />
        ))}
        {rest > 0 ? (
          <span className="text-[9px] font-semibold text-muted-foreground">
            +{rest} mais
          </span>
        ) : null}
      </div>
    </div>
  )
}
