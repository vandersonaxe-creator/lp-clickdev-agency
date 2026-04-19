"use client"

import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { AssetsColumnHeader } from "@/components/assets/assets-column-header"
import { FrequencyBadge } from "@/components/plans/frequency-badge"
import { PlanStatusDot } from "@/components/plans/plan-status-dot"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  formatDurationMinutes,
  parsePlanDate,
  PLANS_REFERENCE_DATE,
  type PreventivePlan,
} from "@/lib/mock-data/plans"
import { cn } from "@/lib/utils"

function initials(name: string) {
  const p = name.trim().split(/\s+/)
  if (p.length >= 2)
    return `${p[0]![0] ?? ""}${p[p.length - 1]![0] ?? ""}`.toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function formatDatePt(iso: string | null) {
  if (!iso) return "—"
  const d = parsePlanDate(iso)
  if (!d) return iso
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

export function createPlansColumns(): ColumnDef<PreventivePlan>[] {
  return [
    {
      id: "statusDot",
      header: () => <span className="sr-only">Status</span>,
      cell: ({ row }) => (
        <div className="flex w-8 justify-center">
          <PlanStatusDot status={row.original.status} />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <AssetsColumnHeader column={column} title="Nome do Plano" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold text-foreground">{row.original.name}</span>
      ),
    },
    {
      id: "asset",
      header: "Ativo",
      cell: ({ row }) => (
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href={`/assets/${encodeURIComponent(row.original.tag)}`}
            className="font-mono text-[13px] font-bold text-[#2563EB] hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.tag}
          </Link>
          <span className="truncate text-sm text-muted-foreground">
            {row.original.asset}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "frequency",
      header: "Frequência",
      cell: ({ row }) => <FrequencyBadge frequency={row.original.frequency} />,
    },
    {
      id: "next",
      header: "Próxima Execução",
      cell: ({ row }) => {
        const p = row.original
        const next = parsePlanDate(p.next)
        const ref = PLANS_REFERENCE_DATE
        if (!next) {
          return <span className="text-muted-foreground">—</span>
        }
        const txt = formatDatePt(p.next)
        if (p.status === "overdue") {
          const d = Math.max(0, daysBetween(next, ref))
          return (
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              {txt}{" "}
              <span className="font-normal">(há {d} dias)</span>
            </span>
          )
        }
        if (p.status === "due_soon") {
          return (
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {txt}
            </span>
          )
        }
        return <span className="text-sm">{txt}</span>
      },
    },
    {
      id: "last",
      header: "Última Execução",
      cell: ({ row }) => {
        const last = row.original.last
        if (!last)
          return <span className="text-sm text-muted-foreground">Nunca</span>
        return (
          <span className="text-sm text-muted-foreground">
            {formatDatePt(last)}
          </span>
        )
      },
    },
    {
      id: "duration",
      header: "Tempo Estimado",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDurationMinutes(row.original.duration)}
        </span>
      ),
    },
    {
      id: "assignee",
      header: "Responsável",
      cell: ({ row }) => {
        const a = row.original.assignee
        if (!a)
          return <span className="text-sm text-muted-foreground">—</span>
        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback className="text-[10px] font-semibold">
                {initials(a)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{a}</span>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => {
        const p = row.original
        const inactive = p.status === "inactive"
        return (
          <div className="text-right" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 cursor-pointer"
                  aria-label="Ações"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link href={`/plans/${encodeURIComponent(p.id)}`}>
                    Ver detalhes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/plans/${encodeURIComponent(p.id)}/edit`}>
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() =>
                    toast.success("OS criada (demonstração)", {
                      description: `Plano ${p.tag}: ordem de serviço enfileirada.`,
                    })
                  }
                >
                  Gerar OS agora
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer",
                    inactive
                      ? "text-emerald-600 focus:text-emerald-600"
                      : "text-destructive focus:text-destructive"
                  )}
                  onSelect={() =>
                    toast.message(
                      inactive ? "Plano ativado (mock)" : "Plano desativado (mock)"
                    )
                  }
                >
                  {inactive ? "Ativar" : "Desativar"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}

export function planRowClassName(plan: PreventivePlan) {
  if (plan.status === "overdue") return "bg-destructive/5 hover:bg-destructive/10"
  return ""
}
