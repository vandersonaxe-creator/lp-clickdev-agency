"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"

import { createPlanColumns, planRowClassName } from "@/components/calibrations/plan-columns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { CalibrationInstrument } from "@/lib/mock-data/calibrations"
import { CALIBRATION_KPI } from "@/lib/mock-data/calibrations"

interface PlanDataTableProps {
  data: CalibrationInstrument[]
  loading?: boolean
}

export function PlanDataTable({ data, loading }: PlanDataTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "nextCal", desc: false },
  ])

  const columns = React.useMemo(() => createPlanColumns(), [])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.tag,
    initialState: { pagination: { pageSize: 20, pageIndex: 0 } },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const filtered = table.getFilteredRowModel().rows.length
  const start = filtered === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, filtered)

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 border-b border-border/50 px-4 py-4 last:border-0"
          >
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="animate-fade-in-table space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="border-border/50 hover:bg-transparent"
              >
                {hg.headers.map((header, hi) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "bg-muted/60 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground dark:bg-zinc-800/50",
                      hi === 0 &&
                        "sticky left-0 z-30 min-w-[100px] max-md:bg-card max-md:shadow-[4px_0_8px_rgba(0,0,0,0.12)] md:static md:min-w-0 md:shadow-none"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "cursor-pointer border-border/50 transition-colors hover:bg-muted/50",
                    planRowClassName(row.original)
                  )}
                  onClick={(e) => {
                    const t = e.target as HTMLElement
                    if (t.closest("button,a,[role=menuitem]")) return
                    router.push(
                      `/assets/${encodeURIComponent(row.original.tag)}`
                    )
                  }}
                >
                  {row.getVisibleCells().map((cell, ci) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "align-middle",
                        ci === 0 &&
                          "sticky left-0 z-20 min-w-[100px] max-md:bg-card max-md:shadow-[4px_0_8px_rgba(0,0,0,0.12)] md:static md:min-w-0 md:shadow-none"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        Mostrando{" "}
        <span className="font-medium text-foreground">
          {start}-{end}
        </span>{" "}
        de{" "}
        <span className="font-medium text-foreground">{filtered}</span>{" "}
        instrumentos · {CALIBRATION_KPI.total} no cadastro
      </p>
    </div>
  )
}
