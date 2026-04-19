"use client"

import * as React from "react"
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CategoryRow = {
  id: string
  icon: string
  name: string
  tipo: "Equipamento" | "Instrumento"
  count: number
}

const CATEGORIES: CategoryRow[] = [
  { id: "1", icon: "⚙️", name: "Usinagem e Corte", tipo: "Equipamento", count: 6 },
  { id: "2", icon: "🔥", name: "Soldagem e Extrusão", tipo: "Equipamento", count: 7 },
  { id: "3", icon: "💨", name: "Compressores e Pneumática", tipo: "Equipamento", count: 4 },
  { id: "4", icon: "🔵", name: "Bombas e Teste Hidrostático", tipo: "Equipamento", count: 5 },
  { id: "5", icon: "🔧", name: "Equipamentos Diversos", tipo: "Equipamento", count: 10 },
  { id: "6", icon: "⚡", name: "Geração de Energia", tipo: "Equipamento", count: 1 },
  { id: "7", icon: "📏", name: "Medição Dimensional", tipo: "Instrumento", count: 7 },
  { id: "8", icon: "🔴", name: "Medição de Pressão", tipo: "Instrumento", count: 4 },
]

type LocNode = {
  id: string
  name: string
  count: number
  children?: LocNode[]
}

const LOCATIONS_TREE: LocNode = {
  id: "root",
  name: "Planta Forge",
  count: 54,
  children: [
    { id: "g1", name: "Galpão 1 — Produção", count: 38 },
    { id: "g2", name: "Galpão 2", count: 2 },
    { id: "g3", name: "Galpão 3", count: 6 },
    { id: "lab", name: "Lab. Metrologia", count: 8 },
  ],
}

function ativosLabel(n: number) {
  return n === 1 ? "1 ativo" : `${n} ativos`
}

function LocationRow({
  node,
  hasChevron,
  open,
  onToggle,
}: {
  node: LocNode
  hasChevron: boolean
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex min-h-10 flex-wrap items-center gap-2 py-1.5">
      <div className="flex w-5 shrink-0 justify-center">
        {hasChevron ? (
          <button
            type="button"
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground"
            aria-expanded={open}
          >
            {open ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        ) : (
          <span className="inline-block w-4" />
        )}
      </div>
      <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
      <span className="font-medium text-foreground">{node.name}</span>
      <span className="text-sm text-muted-foreground">
        ({ativosLabel(node.count)})
      </span>
      <div className="ml-auto flex flex-wrap items-center gap-1">
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          <Pencil className="size-3.5" />
          Editar
        </Button>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          <Plus className="size-3.5" />
          Sub-local
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs text-destructive hover:text-destructive"
        >
          <Trash2 className="size-3.5" />
          Excluir
        </Button>
      </div>
    </div>
  )
}

function LocationTreeNode({ node }: { node: LocNode }) {
  const [open, setOpen] = React.useState(true)
  const hasChildren = Boolean(node.children?.length)

  return (
    <div className="select-none">
      <LocationRow
        node={node}
        hasChevron={hasChildren}
        open={open}
        onToggle={() => setOpen((o) => !o)}
      />
      {hasChildren && open && (
        <div className="relative ml-6 border-l border-dashed border-border pl-6 pt-0.5">
          <div className="space-y-0.5">
            {node.children!.map((child) => (
              <LocationTreeNode key={child.id} node={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function CategoriesLocationsContent() {
  const [deleteTarget, setDeleteTarget] = React.useState<CategoryRow | null>(
    null
  )

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 lg:px-6">
      <Tabs defaultValue="categorias" className="w-full gap-6">
        <TabsList className="h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="categorias" className="px-4">
            Categorias de Ativos
          </TabsTrigger>
          <TabsTrigger value="locais" className="px-4">
            Localizações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categorias" className="mt-0 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
                Categorias de Ativos
              </h1>
              <p className="text-[14px] text-muted-foreground">
                Organize seus equipamentos e instrumentos por tipo e função
              </p>
            </div>
            <Button type="button" className="shrink-0">
              <Plus className="size-4" />
              Nova Categoria
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ícone</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Qtd. Ativos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CATEGORIES.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-lg">{row.icon}</TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          row.tipo === "Equipamento"
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                            : "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200"
                        }
                      >
                        {row.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {ativosLabel(row.count)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                          <Pencil className="size-3.5" />
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(row)}
                        >
                          <Trash2 className="size-3.5" />
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="locais" className="mt-0 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
                Localizações
              </h1>
              <p className="text-[14px] text-muted-foreground">
                Estrutura hierárquica dos locais onde os ativos estão instalados
              </p>
            </div>
            <Button type="button" className="shrink-0">
              <Plus className="size-4" />
              Nova Localização
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <LocationTreeNode node={LOCATIONS_TREE} />
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir categoria?</DialogTitle>
            <DialogDescription>
              {deleteTarget && (
                <>
                  Tem certeza? {deleteTarget.count} ativos estão vinculados a
                  &quot;{deleteTarget.name}&quot;. Esta ação não pode ser desfeita na
                  demonstração.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setDeleteTarget(null)}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
