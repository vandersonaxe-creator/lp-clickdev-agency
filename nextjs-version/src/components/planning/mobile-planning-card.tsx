"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, MapPin } from "lucide-react"

import { CriticalityBadge } from "@/components/assets/criticality-badge"
import { cn } from "@/lib/utils"
import type { PlanningAssetRow, PlanningMonthCell } from "@/lib/mock-data/planning"
import { PLANNING_MOBILE_LETTERS } from "@/lib/mock-data/planning"

const LETTERS = PLANNING_MOBILE_LETTERS

function cellClasses(cell: PlanningMonthCell): string {
  if (!cell) return "bg-transparent"
  switch (cell.status) {
    case "completed":
      return "bg-emerald-500/80"
    case "in_progress":
      return "bg-amber-500/80 animate-pulse"
    case "planned":
      return "bg-sky-500/80"
    case "overdue":
      return "bg-red-500/80 animate-pulse"
    case "not_generated":
      return "border border-dashed border-muted-foreground/40 bg-transparent"
    default:
      return "bg-transparent"
  }
}

export function MobilePlanningCard({
  asset,
  highlightMonth,
  onMonthTap,
}: {
  asset: PlanningAssetRow
  highlightMonth: number
  onMonthTap: (args: {
    asset: PlanningAssetRow
    monthIndex: number
    cell: PlanningMonthCell
  }) => void
}) {
  return (
    <div className="rounded-[14px] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3">
        <div className="min-w-0">
          <p className="font-mono text-[13px] font-bold leading-tight">{asset.tag}</p>
          <p className="mt-0.5 line-clamp-2 text-[12px] text-muted-foreground">
            {asset.name}
          </p>
        </div>
        <CriticalityBadge value={asset.criticality} className="size-6 text-xs" />
      </div>
      <div className="pt-3">
        <div className="mb-1 flex justify-between gap-0.5 px-0.5">
          {LETTERS.map((L, i) => (
            <span
              key={`${asset.tag}-L-${i}`}
              className={cn(
                "w-6 text-center text-[8px] font-medium uppercase text-muted-foreground",
                i === highlightMonth && "font-bold text-primary"
              )}
            >
              {L}
            </span>
          ))}
        </div>
        <div className="flex justify-between gap-0.5">
          {asset.months.map((cell, mi) => (
            <button
              key={`${asset.tag}-m-${mi}`}
              type="button"
              data-planning-tip={cell?.tooltip ?? ""}
              title={cell?.tooltip ?? undefined}
              disabled={!cell}
              onClick={() => {
                if (!cell) return
                onMonthTap({ asset, monthIndex: mi, cell })
              }}
              className={cn(
                "size-6 min-h-[24px] min-w-[24px] max-w-[24px] rounded-sm transition-transform active:scale-95",
                cellClasses(cell),
                cell && "cursor-pointer hover:ring-2 hover:ring-primary/30"
              )}
              aria-label={
                cell
                  ? `${PLANNING_MOBILE_LETTERS[mi]}: ${cell.tooltip}`
                  : `${PLANNING_MOBILE_LETTERS[mi]}: vazio`
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function MobilePlanningGroups({
  groups,
  year,
  onMonthTap,
}: {
  groups: { title: string; rows: PlanningAssetRow[] }[]
  year: number
  onMonthTap: (args: {
    asset: PlanningAssetRow
    monthIndex: number
    cell: NonNullable<PlanningMonthCell>
  }) => void
}) {
  const now = new Date()
  const highlightMonth =
    now.getFullYear() === year ? now.getMonth() : -1
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  const isOpen = (title: string) => expanded[title] !== false

  if (groups.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-border bg-card/40 px-4 py-12 text-center text-sm text-muted-foreground">
        Nenhum ativo encontrado com os filtros selecionados.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.map((g) => {
        const open = isOpen(g.title)
        return (
          <div key={g.title} className="overflow-hidden rounded-[14px] border border-border bg-card/40">
            <button
              type="button"
              onClick={() =>
                setExpanded((s) => ({ ...s, [g.title]: !(s[g.title] !== false) }))
              }
              className="flex w-full items-center gap-2 border-b border-border bg-muted/30 px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {open ? (
                <ChevronDown className="size-4 shrink-0" aria-hidden />
              ) : (
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              )}
              <MapPin className="size-4 shrink-0 opacity-80" aria-hidden />
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden>📍</span>
                <span>
                {g.title} ({g.rows.length}{" "}
                {g.rows.length === 1 ? "ativo" : "ativos"})
                </span>
              </span>
            </button>
            {open ? (
              <div className="flex flex-col gap-3 p-3">
                {g.rows.map((row) => (
                  <MobilePlanningCard
                    key={row.tag}
                    asset={row}
                    highlightMonth={highlightMonth}
                    onMonthTap={({ asset, monthIndex, cell }) => {
                      if (!cell) return
                      onMonthTap({ asset, monthIndex, cell })
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
