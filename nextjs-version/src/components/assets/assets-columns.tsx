"use client"

import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MapPin, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalibrationBadge } from "@/components/assets/calibration-badge"
import { CriticalityBadge } from "@/components/assets/criticality-badge"
import { AssetsColumnHeader } from "@/components/assets/assets-column-header"
import type { IndustrialAsset } from "@/lib/mock-data/assets"
import { cn } from "@/lib/utils"

function TypeBadge({ type }: { type: IndustrialAsset["type"] }) {
  if (type === "equipment") {
    return (
      <Badge
        variant="outline"
        className="border-blue-500/35 bg-blue-500/10 font-medium text-blue-700 dark:text-blue-300"
      >
        Equipamento
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="border-amber-500/35 bg-amber-500/10 font-medium text-amber-800 dark:text-amber-300"
    >
      Instrumento
    </Badge>
  )
}

function StatusCell({ status }: { status: IndustrialAsset["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm">
        <span className="size-2 rounded-full bg-emerald-500" />
        Ativo
      </span>
    )
  }
  if (status === "inactive") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className="size-2 rounded-full bg-zinc-400" />
        Inativo
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className="size-2 rounded-full bg-amber-500" />
      Em Manutenção
    </span>
  )
}

export function createAssetsColumns(
  onQr: (asset: IndustrialAsset) => void
): ColumnDef<IndustrialAsset>[] {
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
          aria-label="Selecionar todos"
          className="translate-y-0.5 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Selecionar linha"
          className="translate-y-0.5 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "tag",
      header: ({ column }) => (
        <AssetsColumnHeader column={column} title="Tag" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-[14px] font-bold tabular-nums text-foreground">
          {row.getValue("tag")}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <AssetsColumnHeader column={column} title="Nome" />
      ),
      cell: ({ row }) => {
        const inactive = row.original.status === "inactive"
        return (
          <div
            className={cn(
              "max-w-[240px] truncate text-sm font-medium",
              inactive && "text-muted-foreground line-through"
            )}
          >
            {row.getValue("name")}
          </div>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <TypeBadge type={row.original.type} />,
    },
    {
      accessorKey: "manufacturer",
      header: "Fabricante",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("manufacturer")}
        </span>
      ),
    },
    {
      accessorKey: "location",
      header: "Localização",
      cell: ({ row }) => (
        <span className="inline-flex max-w-[200px] items-center gap-1 truncate text-sm">
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          {row.getValue("location")}
        </span>
      ),
    },
    {
      accessorKey: "criticality",
      header: "Criticidade",
      cell: ({ row }) => (
        <CriticalityBadge value={row.original.criticality} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusCell status={row.original.status} />,
    },
    {
      id: "calibration",
      header: "Calibração",
      cell: ({ row }) => {
        const a = row.original
        if (a.type === "equipment") {
          return <span className="text-sm text-muted-foreground">—</span>
        }
        if (!a.calibration) return "—"
        return <CalibrationBadge state={a.calibration} />
      },
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => {
        const a = row.original
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
                  <Link href={`/assets/${encodeURIComponent(a.id)}`}>
                    Ver detalhes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/assets/${encodeURIComponent(a.id)}/edit`}>
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => onQr(a)}
                >
                  Gerar QR Code
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/work-orders/new?asset_id=${encodeURIComponent(a.id)}`}
                  >
                    Criar OS
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  Desativar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}
