"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, MapPin } from "lucide-react"

import { CriticalityBadge } from "@/components/assets/criticality-badge"
import { GridCell, type GridCellActivatePayload } from "@/components/planning/grid-cell"
import { GridLegend } from "@/components/planning/grid-legend"
import { cn } from "@/lib/utils"
import type { PlanningAssetRow } from "@/lib/mock-data/planning"
import { PLANNING_MONTH_LABELS_SHORT } from "@/lib/mock-data/planning"

export function AnnualGrid({
  groups,
  year,
  onCellActivate,
  loading,
}: {
  groups: { title: string; rows: PlanningAssetRow[] }[]
  year: number
  onCellActivate: (
    payload: GridCellActivatePayload & { asset: PlanningAssetRow }
  ) => void
  loading?: boolean
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollLeft > 2)
    onScroll()
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  const now = new Date()
  const highlightMonth =
    now.getFullYear() === year ? now.getMonth() : -1

  const isGroupOpen = (title: string) => expanded[title] !== false

  const toggleGroup = (title: string) => {
    setExpanded((s) => ({ ...s, [title]: !(s[title] !== false) }))
  }

  if (loading) {
    return (
      <div className="overflow-hidden rounded-[14px] border border-border bg-card">
        <div className="border-b border-border bg-muted/30 p-3">
          <div className="h-4 w-full max-w-md animate-pulse rounded bg-muted" />
        </div>
        <div ref={scrollRef} className="overflow-x-auto">
          <table className="w-max min-w-full border-collapse text-sm">
            <tbody>
              {Array.from({ length: 8 }).map((_, r) => (
                <tr key={r}>
                  <td className="sticky left-0 z-10 w-[260px] bg-card p-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </td>
                  <td className="sticky left-[260px] z-10 w-[50px] bg-card p-2">
                    <div className="mx-auto size-4 animate-pulse rounded-full bg-muted" />
                  </td>
                  {Array.from({ length: 12 }).map((__, c) => (
                    <td key={c} className="p-0.5">
                      <div className="size-[38px] min-w-[44px] animate-pulse rounded-lg bg-muted" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GridLegend />
      </div>
    )
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-[14px] border border-dashed border-border bg-card/40 px-6 py-16 text-center text-sm text-muted-foreground">
        Nenhum ativo encontrado com os filtros selecionados.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-card">
      <div
        ref={scrollRef}
        className="overflow-x-auto [scrollbar-gutter:stable]"
      >
        <table className="w-max min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-20 shadow-sm">
            <tr>
              <th
                scope="col"
                className={cn(
                  "sticky left-0 z-30 min-w-[260px] max-w-[260px] border-b border-border bg-muted/50 px-3 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wide text-muted-foreground",
                  scrolled && "shadow-[4px_0_8px_rgba(0,0,0,0.15)]"
                )}
              >
                Ativo / Plano
              </th>
              <th
                scope="col"
                className={cn(
                  "sticky left-[260px] z-30 w-[50px] min-w-[50px] border-b border-border bg-muted/50 px-1 py-2.5 text-center text-[12px] font-semibold uppercase tracking-wide text-muted-foreground",
                  scrolled && "shadow-[4px_0_8px_rgba(0,0,0,0.15)]"
                )}
              >
                Crit.
              </th>
              {PLANNING_MONTH_LABELS_SHORT.map((m, i) => {
                const current = i === highlightMonth
                return (
                  <th
                    key={m}
                    scope="col"
                    className={cn(
                      "min-w-[44px] border-b border-border bg-muted/50 px-0 py-2.5 text-center text-[12px] font-semibold uppercase tracking-wide text-muted-foreground",
                      current &&
                        "border-b-2 border-primary bg-primary/10 font-bold text-primary"
                    )}
                  >
                    {m}
                  </th>
                )
              })}
            </tr>
          </thead>
          {groups.map((g) => {
            const open = isGroupOpen(g.title)
            return (
              <tbody key={g.title}>
                <tr className="bg-muted/30">
                  <td
                    colSpan={14}
                    className="border-b border-border px-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => toggleGroup(g.title)}
                      className="flex w-full items-center gap-2 text-left text-[12px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
                  </td>
                </tr>
                {open
                  ? g.rows.map((row) => (
                      <tr
                        key={row.tag}
                        className="border-b border-border/60 hover:bg-muted/20"
                      >
                        <td
                          className={cn(
                            "sticky left-0 z-10 min-w-[260px] max-w-[260px] bg-card px-3 py-2 align-middle",
                            scrolled &&
                              "shadow-[4px_0_8px_rgba(0,0,0,0.15)]"
                          )}
                        >
                          <div className="font-mono text-[13px] font-bold leading-tight">
                            {row.tag}
                          </div>
                          <div
                            className="max-w-[200px] truncate text-[12px] text-muted-foreground"
                            title={row.name}
                          >
                            {row.name}
                          </div>
                        </td>
                        <td
                          className={cn(
                            "sticky left-[260px] z-10 w-[50px] min-w-[50px] bg-card px-1 align-middle",
                            scrolled &&
                              "shadow-[4px_0_8px_rgba(0,0,0,0.15)]"
                          )}
                        >
                          <div className="flex justify-center">
                            <CriticalityBadge value={row.criticality} />
                          </div>
                        </td>
                        {row.months.map((cell, mi) => (
                          <GridCell
                            key={`${row.tag}-${mi}`}
                            cell={cell}
                            monthIndex={mi}
                            isCurrentMonthColumn={mi === highlightMonth}
                            onActivate={(p) =>
                              onCellActivate({ ...p, asset: row })
                            }
                          />
                        ))}
                      </tr>
                    ))
                  : null}
              </tbody>
            )
          })}
        </table>
      </div>
      <GridLegend />
    </div>
  )
}
