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

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { IndustrialAsset } from "@/lib/mock-data/assets"
import { TOTAL_ASSETS_IN_SYSTEM } from "@/lib/mock-data/assets"

interface AssetsDataTableProps {
  columns: ColumnDef<IndustrialAsset>[]
  data: IndustrialAsset[]
  loading?: boolean
  /** Total exibido no rodapé de paginação (ex.: 54 no cadastro ou filtrado) */
  totalLabelCount?: number
}

export function AssetsDataTable({
  columns,
  data,
  loading,
  totalLabelCount,
}: AssetsDataTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})

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
    initialState: {
      pagination: { pageSize: 25, pageIndex: 0 },
    },
  })

  const totalForFooter = totalLabelCount ?? TOTAL_ASSETS_IN_SYSTEM
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
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="animate-fade-in-table space-y-0">
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
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer border-border/50 transition-colors duration-150 hover:bg-muted/50"
                  onClick={(e) => {
                    const t = e.target as HTMLElement
                    if (t.closest("button,a,[role=checkbox]")) return
                    router.push(`/assets/${encodeURIComponent(row.original.id)}`)
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
                  className="h-32 text-center text-muted-foreground"
                >
                  Sem linhas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {table.getFilteredSelectedRowModel().rows.length}
          </span>{" "}
          de{" "}
          <span className="font-medium text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          ativo(s) selecionado(s)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium text-foreground">
              {start}-{end}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground">{totalForFooter}</span>{" "}
            ativos
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
