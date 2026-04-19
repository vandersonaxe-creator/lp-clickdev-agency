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
  UserX,
} from "lucide-react"
import { toast } from "sonner"

import { WoPriorityBadge } from "@/components/work-orders/wo-priority-badge"
import { WoStatusBadge } from "@/components/work-orders/wo-status-badge"
import { WoTypeBadge } from "@/components/work-orders/wo-type-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  isWorkOrderOverdue,
  overdueDays,
  type WorkOrder,
} from "@/lib/mock-data/work-orders"

function initials(name: string): string {
  const p = name.trim().split(/\s+/)
  if (p.length >= 2) return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function SortButton({
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

export function woRowClassName(wo: WorkOrder): string {
  if (wo.status === "cancelled") return ""
  if (isWorkOrderOverdue(wo)) return "bg-destructive/5"
  if (wo.status === "in_progress") return "bg-amber-500/5"
  return ""
}

function WoRowActions({ wo }: { wo: WorkOrder }) {
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
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            router.push(`/work-orders/${encodeURIComponent(wo.id)}`)
          }
        >
          Ver detalhes
        </DropdownMenuItem>
        {wo.status === "open" ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              toast.message("Iniciar atendimento", {
                description: `${wo.wo_number} — em desenvolvimento.`,
              })
            }
          >
            Iniciar atendimento
          </DropdownMenuItem>
        ) : null}
        {wo.status === "in_progress" ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              toast.message("Finalizar OS", {
                description: `${wo.wo_number} — em desenvolvimento.`,
              })
            }
          >
            Finalizar OS
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            router.push(`/work-orders/${encodeURIComponent(wo.id)}/report`)
          }
        >
          Imprimir relatório
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={() =>
            toast.message("Cancelar OS", {
              description: `${wo.wo_number} — ação destrutiva (mock).`,
            })
          }
        >
          Cancelar OS
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function createWoColumns(): ColumnDef<WorkOrder>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Selecionar todas"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Selecionar linha"
          onClick={(e) => e.stopPropagation()}
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: "wo_number",
      header: ({ column }) => (
        <SortButton
          label="Nº OS"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => (
        <Link
          href={`/work-orders/${encodeURIComponent(row.original.id)}`}
          className="font-mono text-sm font-bold text-primary underline-offset-4 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {row.original.wo_number}
        </Link>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <SortButton
          label="Título"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => (
        <span
          className={cn(
            "block max-w-[280px] truncate font-semibold text-foreground",
            row.original.status === "cancelled" && "line-through opacity-70"
          )}
          title={row.original.title}
        >
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <SortButton
          label="Tipo"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => <WoTypeBadge type={row.original.type} />,
    },
    {
      accessorKey: "tag",
      header: ({ column }) => (
        <SortButton
          label="Ativo"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => (
        <Link
          href={`/assets/${encodeURIComponent(row.original.tag)}`}
          className="font-mono text-sm font-bold text-foreground underline-offset-4 hover:text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {row.original.tag}
        </Link>
      ),
    },
    {
      id: "assignee",
      accessorFn: (r) => r.assignee ?? "",
      header: ({ column }) => (
        <SortButton
          label="Responsável"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const a = row.original.assignee
        if (!a) {
          return (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <UserX className="size-4 shrink-0" aria-hidden />
              Não atribuído
            </span>
          )
        }
        return (
          <span className="inline-flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-[10px] font-semibold">
                {initials(a)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{a}</span>
          </span>
        )
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <SortButton
          label="Prioridade"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => <WoPriorityBadge priority={row.original.priority} />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <SortButton
          label="Status"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => <WoStatusBadge status={row.original.status} />,
    },
    {
      id: "scheduled",
      accessorFn: (r) => r.scheduled,
      header: ({ column }) => (
        <SortButton
          label="Data Programada"
          sorted={column.getIsSorted()}
          onToggle={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const wo = row.original
        const overdue = isWorkOrderOverdue(wo)
        const days = overdueDays(wo)
        return (
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "text-sm tabular-nums",
                overdue && "font-semibold text-red-600 dark:text-red-400"
              )}
            >
              {format(parseISO(wo.scheduled), "dd/MM/yyyy", { locale: ptBR })}
            </span>
            {overdue ? (
              <span className="w-fit rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
                (há {days} {days === 1 ? "dia" : "dias"})
              </span>
            ) : null}
          </div>
        )
      },
    },
    {
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => <WoRowActions wo={row.original} />,
    },
  ]
}
