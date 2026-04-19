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
import { ChevronLeft, ChevronRight, ClipboardX } from "lucide-react"
import { createWoColumns, woRowClassName } from "@/components/work-orders/wo-columns"
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
import type { WorkOrder } from "@/lib/mock-data/work-orders"
import { TOTAL_WORK_ORDERS_IN_SYSTEM } from "@/lib/mock-data/work-orders"

interface WoDataTableProps {
  data: WorkOrder[]
  loading?: boolean
  emptyAction?: React.ReactNode
}

export function WoDataTable({ data, loading, emptyAction }: WoDataTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo(() => createWoColumns(), [])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    initialState: { pagination: { pageSize: 15, pageIndex: 0 } },
  })

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const filtered = table.getFilteredRowModel().rows.length
  const start = filtered === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, filtered)
  const selected = table.getFilteredSelectedRowModel().rows.length

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
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
        <ClipboardX className="size-12 text-muted-foreground" strokeWidth={1.25} />
        <p className="mt-4 text-lg font-semibold text-foreground">
          Nenhuma OS encontrada
        </p>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Ajuste os filtros ou crie uma nova ordem de serviço.
        </p>
        {emptyAction ? <div className="mt-6">{emptyAction}</div> : null}
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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "cursor-pointer border-border/50 transition-colors duration-150 hover:bg-muted/50",
                  woRowClassName(row.original)
                )}
                onClick={(e) => {
                  const t = e.target as HTMLElement
                  if (t.closest("button,a,[role=checkbox],[role=menuitem]"))
                    return
                  router.push(
                    `/work-orders/${encodeURIComponent(row.original.id)}`
                  )
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{selected}</span> OS
          selecionada(s)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium text-foreground">
              {start}-{end}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground">{filtered}</span> OS
            <span className="text-muted-foreground">
              {" "}
              · {TOTAL_WORK_ORDERS_IN_SYSTEM} no cadastro
            </span>
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
              <span className="sr-only">Anterior</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight className="size-4" />
              <span className="sr-only">Próxima</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
