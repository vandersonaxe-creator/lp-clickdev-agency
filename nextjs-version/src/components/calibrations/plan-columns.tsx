"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react"
import { toast } from "sonner"

import { CategoryBadge } from "@/components/calibrations/category-badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { CalibrationInstrument } from "@/lib/mock-data/calibrations"

function fmt(d: string) {
  return format(parseISO(d), "dd/MM/yyyy", { locale: ptBR })
}

function SortHeader({
  label,
  sorted,
  onToggle,
}: {
  label: string
  sorted: false | "asc" | "desc"
  onToggle: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="-ml-2 h-8 gap-1 px-2 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
      onClick={onToggle}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUp className="size-3.5 opacity-80" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3.5 opacity-80" />
      ) : (
        <ArrowUpDown className="size-3.5 opacity-40" />
      )}
    </Button>
  )
}

export function planRowClassName(row: CalibrationInstrument): string {
  if (row.kanbanStatus === "expired") return "bg-destructive/5"
  if (row.kanbanStatus === "expiring") return "bg-amber-500/5"
  return ""
}

function StatusBadge({ row }: { row: CalibrationInstrument }) {
  const s = row.kanbanStatus
  if (s === "expired") {
    return (
      <span className="inline-flex rounded-md border border-red-500/40 bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700 dark:text-red-300">
        VENCIDA
      </span>
    )
  }
  if (s === "expiring") {
    return (
      <span className="inline-flex rounded-md border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200">
        VENCENDO
      </span>
    )
  }
  return (
    <span className="inline-flex rounded-md border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
      VÁLIDA
    </span>
  )
}

function PlanRowActions({ row }: { row: CalibrationInstrument }) {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            router.push(`/assets/${encodeURIComponent(row.tag)}`)
          }
        >
          Ver ficha do instrumento
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            toast.message("Registrar calibração", {
              description: `${row.tag} — em desenvolvimento.`,
            })
          }
        >
          Registrar calibração
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            toast.message("Upload certificado", {
              description: `${row.tag} — em desenvolvimento.`,
            })
          }
        >
          Upload certificado
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            toast.message("Histórico", {
              description: `${row.tag} — em desenvolvimento.`,
            })
          }
        >
          Histórico
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function createPlanColumns(): ColumnDef<CalibrationInstrument>[] {
  return [
    {
      accessorKey: "tag",
      header: ({ column }) => (
        <SortHeader
          label="Tag"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => (
        <Link
          href={`/assets/${encodeURIComponent(row.original.tag)}`}
          className="font-mono text-[13px] font-bold text-primary underline-offset-4 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {row.original.tag}
        </Link>
      ),
    },
    {
      id: "instrument",
      accessorFn: (r) => r.name,
      header: ({ column }) => (
        <SortHeader
          label="Instrumento"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-semibold">{row.original.name}</p>
          <p className="text-[12px] text-muted-foreground">
            {row.original.manufacturer} · {row.original.model}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <SortHeader
          label="Categoria"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
      accessorKey: "measurementRange",
      header: "Faixa de Medição",
      cell: ({ row }) => (
        <span className="font-mono text-[13px] text-muted-foreground">
          {row.original.measurementRange}
        </span>
      ),
    },
    {
      accessorKey: "resolution",
      header: "Resolução",
      cell: ({ row }) => (
        <span className="font-mono text-[13px] text-muted-foreground">
          {row.original.resolution}
        </span>
      ),
    },
    {
      accessorKey: "frequencyDays",
      header: "Frequência",
      cell: ({ row }) => (
        <span className="text-[13px]">{row.original.frequencyDays} dias</span>
      ),
    },
    {
      id: "lastCal",
      accessorFn: (r) => r.lastCal,
      header: ({ column }) => (
        <SortHeader
          label="Última Calibração"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => (
        <div>
          <p className="text-[13px]">{fmt(row.original.lastCal)}</p>
          <p className="text-[11px] text-muted-foreground">
            {row.original.provider}
          </p>
        </div>
      ),
    },
    {
      id: "nextCal",
      accessorFn: (r) => r.nextCal,
      header: ({ column }) => (
        <SortHeader
          label="Próxima Calibração"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const r = row.original
        return (
          <div className="space-y-1">
            <p
              className={cn(
                "text-[13px]",
                r.kanbanStatus === "expired" &&
                  "font-semibold text-red-600 dark:text-red-400",
                r.kanbanStatus === "expiring" &&
                  "font-semibold text-amber-600 dark:text-amber-400"
              )}
            >
              {fmt(r.nextCal)}
            </p>
            {r.kanbanStatus === "expired" && r.daysOverdue != null ? (
              <span className="inline-flex w-fit rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
                VENCIDA há {r.daysOverdue}d
              </span>
            ) : null}
            {r.kanbanStatus === "expiring" && r.daysUntil != null ? (
              <span className="inline-flex w-fit rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                em {r.daysUntil}d
              </span>
            ) : null}
          </div>
        )
      },
    },
    {
      accessorKey: "certificateNumber",
      header: "Nº Certificado",
      cell: ({ row }) => (
        <span className="font-mono text-[12px] text-muted-foreground">
          {row.original.certificateNumber ?? "—"}
        </span>
      ),
    },
    {
      id: "status",
      accessorFn: (r) => r.kanbanStatus,
      header: "Status",
      cell: ({ row }) => <StatusBadge row={row.original} />,
    },
    {
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => <PlanRowActions row={row.original} />,
    },
  ]
}
