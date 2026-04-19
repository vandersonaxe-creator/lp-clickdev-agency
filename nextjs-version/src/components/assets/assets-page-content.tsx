"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FolderTree, LayoutGrid, Package, Plus } from "lucide-react"

import { AssetsDataTable } from "@/components/assets/assets-data-table"
import {
  applyAssetFilters,
  AssetsFilters,
  defaultAssetsFilters,
  filtersAreActive,
  type AssetsFilterState,
} from "@/components/assets/assets-filters"
import { createAssetsColumns } from "@/components/assets/assets-columns"
import { AssetsKpiCards } from "@/components/assets/assets-kpi-cards"
import { AssetsTreeView } from "@/components/assets/assets-tree-view"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ASSETS_MOCK,
  ASSETS_TREE_MOCK,
  TOTAL_ASSETS_IN_SYSTEM,
  type IndustrialAsset,
} from "@/lib/mock-data/assets"

type ViewMode = "table" | "tree"

export function AssetsPageContent() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [view, setView] = React.useState<ViewMode>("table")
  const [filters, setFilters] = React.useState<AssetsFilterState>(() =>
    defaultAssetsFilters()
  )
  const [qrOpen, setQrOpen] = React.useState(false)
  const [qrAsset, setQrAsset] = React.useState<IndustrialAsset | null>(null)

  React.useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = React.useMemo(
    () => applyAssetFilters(ASSETS_MOCK, filters),
    [filters]
  )

  const hasActive = filtersAreActive(filters)
  const totalPagination = hasActive ? filtered.length : TOTAL_ASSETS_IN_SYSTEM

  const columns = React.useMemo(
    () =>
      createAssetsColumns((a) => {
        setQrAsset(a)
        setQrOpen(true)
      }),
    []
  )

  const showEmpty = !loading && filtered.length === 0

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 lg:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
            Ativos
          </h1>
          <p className="text-[14px] text-muted-foreground">
            Gerencie equipamentos e instrumentos de medição industrial
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="bg-muted/60 inline-flex rounded-lg border border-border p-0.5">
            <Button
              type="button"
              variant={view === "table" ? "default" : "ghost"}
              size="sm"
              className="cursor-pointer rounded-md px-4"
              onClick={() => setView("table")}
            >
              <LayoutGrid className="mr-1.5 size-4" />
              Tabela
            </Button>
            <Button
              type="button"
              variant={view === "tree" ? "default" : "ghost"}
              size="sm"
              className="cursor-pointer rounded-md px-4"
              onClick={() => setView("tree")}
            >
              <FolderTree className="mr-1.5 size-4" />
              Árvore
            </Button>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/assets/new")}
          >
            <Plus className="mr-2 size-4" />
            Novo Ativo
          </Button>
        </div>
      </div>

      <AssetsKpiCards loading={loading} />

      {!loading ? (
        <AssetsFilters
          value={filters}
          onChange={setFilters}
          onClear={() => setFilters(defaultAssetsFilters())}
        />
      ) : null}

      {loading ? (
        <AssetsDataTable
          columns={columns}
          data={[]}
          loading
        />
      ) : showEmpty ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/20 py-16">
          <Package className="size-12 text-muted-foreground" strokeWidth={1.25} />
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              Nenhum ativo encontrado
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Tente ajustar os filtros ou cadastre um novo ativo
            </p>
          </div>
          <Button asChild>
            <Link href="/assets/new">
              <Plus className="mr-2 size-4" />
              Novo Ativo
            </Link>
          </Button>
        </div>
      ) : view === "table" ? (
        <AssetsDataTable
          columns={columns}
          data={filtered}
          totalLabelCount={totalPagination}
        />
      ) : (
        <AssetsTreeView root={ASSETS_TREE_MOCK} />
      )}

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              {qrAsset
                ? `Geração de QR para ${qrAsset.tag} — ${qrAsset.name} (placeholder).`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
            Preview do QR será exibido aqui
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
