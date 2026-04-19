"use client"

import * as React from "react"
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { PlanningMonthCell } from "@/lib/mock-data/planning"

export type GridCellActivatePayload = {
  cell: NonNullable<PlanningMonthCell>
  monthIndex: number
}

export type GridCellProps = {
  cell: PlanningMonthCell
  monthIndex: number
  isCurrentMonthColumn: boolean
  onActivate: (payload: GridCellActivatePayload) => void
}

function cellKey(c: PlanningMonthCell): string {
  if (!c) return "null"
  return `${c.status}|${c.workOrderId ?? ""}|${c.tooltip}`
}

export const GridCell = React.memo(function GridCell({
  cell,
  monthIndex,
  isCurrentMonthColumn,
  onActivate,
}: GridCellProps) {
  if (!cell) {
    return (
      <td
        className={cn(
          "h-[38px] w-[44px] min-w-[44px] border-b border-border/60 p-0 align-middle",
          isCurrentMonthColumn && "border-b-2 border-b-primary bg-primary/5"
        )}
      />
    )
  }

  const { status } = cell

  const inner = (() => {
    switch (status) {
      case "completed":
        return <Check className="size-4 text-emerald-400" strokeWidth={2.5} aria-hidden />
      case "in_progress":
        return (
          <Wrench
            className="size-4 animate-pulse text-amber-400"
            strokeWidth={2}
            aria-hidden
          />
        )
      case "planned":
        return <Calendar className="size-4 text-sky-400" strokeWidth={2} aria-hidden />
      case "overdue":
        return (
          <AlertTriangle
            className="size-4 animate-pulse text-red-400"
            strokeWidth={2}
            aria-hidden
          />
        )
      case "not_generated":
        return (
          <Clock className="size-[14px] text-muted-foreground opacity-40" strokeWidth={2} aria-hidden />
        )
      default:
        return null
    }
  })()

  const bg = {
    completed: "bg-emerald-500/15",
    in_progress: "bg-amber-500/15",
    planned: "bg-sky-500/15",
    overdue: "bg-red-500/15",
    not_generated: "border border-dashed border-muted-foreground/30 bg-transparent",
  }[status]

  const handleClick = () => {
    if (!cell) return
    if (status === "not_generated") {
      onActivate({ cell, monthIndex })
      return
    }
    if (cell.workOrderId) onActivate({ cell, monthIndex })
  }

  return (
    <td
      className={cn(
        "h-[38px] w-[44px] min-w-[44px] border-b border-border/60 p-0.5 align-middle",
        isCurrentMonthColumn && "border-b-2 border-b-primary bg-primary/5"
      )}
    >
      <button
        type="button"
        data-planning-tip={cell.tooltip}
        onClick={handleClick}
        className={cn(
          "planning-cell-tip relative flex h-[38px] w-[44px] min-h-[38px] min-w-[44px] max-w-[44px] items-center justify-center rounded-lg transition-transform duration-150",
          bg,
          (cell.workOrderId || status === "not_generated") &&
            "cursor-pointer hover:z-10 hover:scale-110 hover:shadow-md"
        )}
        aria-label={cell.tooltip}
      >
        {inner}
      </button>
    </td>
  )
}, areGridCellPropsEqual)

function areGridCellPropsEqual(prev: GridCellProps, next: GridCellProps) {
  return (
    prev.monthIndex === next.monthIndex &&
    prev.isCurrentMonthColumn === next.isCurrentMonthColumn &&
    prev.onActivate === next.onActivate &&
    cellKey(prev.cell) === cellKey(next.cell)
  )
}
