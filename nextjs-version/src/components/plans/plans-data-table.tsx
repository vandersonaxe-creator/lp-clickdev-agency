"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { planRowClassName } from "@/components/plans/plans-columns"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { PreventivePlan } from "@/lib/mock-data/plans"

interface PlansDataTableProps {
  columns: ColumnDef<PreventivePlan>[]
  data: PreventivePlan[]
  loading?: boolean
}

export function PlansDataTable({ columns, data, loading }: PlansDataTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const filtered = table.getFilteredRowModel().rows.length
  const start = filtered === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, filtered)

  if (loading) {
    return (
      <div className="space-y-3 rounded-xl border border-border">
        <div className="border-b border-border bg-muted/50 px-4 py-3 dark:bg-zinc-800/50">
          <div className="h-4 w-full max-w-md animate-pulse rounded bg-muted" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 border-b border-border/50 px-4 py-4 last:border-0"
          >
            <div className="h-4 w-4 animate-pulse rounded bg-muted" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="animate-fade-in-table space-y-4">
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="border-border/50 hover:bg-transparent"
              >
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-muted/60 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground dark:bg-zinc-800/50"
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
                    "cursor-pointer border-border/50 transition-colors duration-150 hover:bg-muted/50",
                    planRowClassName(row.original)
                  )}
                  onClick={(e) => {
                    const t = e.target as HTMLElement
                    if (t.closest("button,a,[role=menuitem]")) return
                    router.push(`/plans/${encodeURIComponent(row.original.id)}`)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="align-middle">
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
                  Sem dados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-muted-foreground">
        <p>
          Mostrando{" "}
          <span className="font-medium text-foreground">
            {start}-{end}
          </span>{" "}
          de{" "}
          <span className="font-medium text-foreground">{filtered}</span> planos
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
