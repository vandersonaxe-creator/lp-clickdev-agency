"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronRight, Folder, MapPin } from "lucide-react"

import { CalibrationBadge } from "@/components/assets/calibration-badge"
import { CriticalityBadge } from "@/components/assets/criticality-badge"
import { cn } from "@/lib/utils"
import {
  assetById,
  type IndustrialAsset,
  type TreeNode,
} from "@/lib/mock-data/assets"

function TypeGlyph({ type }: { type: IndustrialAsset["type"] }) {
  return (
    <span className="text-base leading-none" aria-hidden>
      {type === "equipment" ? "⚙" : "📐"}
    </span>
  )
}

function StatusDot({ status }: { status: IndustrialAsset["status"] }) {
  if (status === "active") return <span className="text-emerald-500">●</span>
  if (status === "inactive") return <span className="text-zinc-400">●</span>
  return <span className="text-amber-500">●</span>
}

function AssetLeaf({ id }: { id: string }) {
  const router = useRouter()
  const a = assetById(id)
  if (!a) return null

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex cursor-pointer flex-wrap items-center gap-x-2 gap-y-1 rounded-md py-1.5 text-sm transition-colors hover:bg-muted/60"
      style={{ paddingLeft: 12 }}
      onClick={() => router.push(`/assets/${encodeURIComponent(a.id)}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          router.push(`/assets/${encodeURIComponent(a.id)}`)
        }
      }}
    >
      <TypeGlyph type={a.type} />
      <span className="font-mono text-[13px] font-bold">{a.tag}</span>
      <span className="text-muted-foreground">·</span>
      <span className="max-w-[220px] truncate">{a.name}</span>
      <span className="text-muted-foreground">·</span>
      <CriticalityBadge value={a.criticality} />
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <StatusDot status={a.status} />
        {a.status === "active"
          ? "Ativo"
          : a.status === "inactive"
            ? "Inativo"
            : "Manutenção"}
      </span>
      {a.type === "instrument" && a.calibration ? (
        <>
          <span className="text-muted-foreground">·</span>
          <CalibrationBadge state={a.calibration} />
        </>
      ) : null}
    </div>
  )
}

function nodeKey(n: TreeNode): string {
  if (n.kind === "asset") return `asset-${n.assetId}`
  return `${n.kind}-${n.id}`
}

function TreeSection({
  node,
  depth,
}: {
  node: TreeNode
  depth: number
}) {
  const [open, setOpen] = React.useState(true)

  if (node.kind === "asset") {
    return (
      <div
        className="border-l border-dotted border-border/80"
        style={{ marginLeft: depth * 24 }}
      >
        <AssetLeaf id={node.assetId} />
      </div>
    )
  }

  const Icon = node.kind === "location" ? MapPin : Folder

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 24 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full max-w-full items-center gap-2 rounded-md py-1.5 text-left text-sm font-medium transition-colors hover:bg-muted/50"
      >
        <span className="shrink-0 text-muted-foreground">
          {open ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </span>
        <Icon className="size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 truncate">{node.label}</span>
        <span className="shrink-0 text-xs font-normal text-muted-foreground">
          ({node.count} ativos)
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-1 border-l border-dotted border-border/80 pb-1 pl-3 pt-1">
            {node.children.map((ch) => (
              <TreeSection key={nodeKey(ch)} node={ch} depth={depth + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AssetsTreeView({ root }: { root: TreeNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <TreeSection node={root} depth={0} />
    </div>
  )
}
