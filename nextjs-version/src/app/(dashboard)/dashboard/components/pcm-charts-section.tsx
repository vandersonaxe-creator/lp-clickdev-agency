"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const OS_MONTH = [
  { month: "Nov", prev: 8, corr: 3, insp: 1 },
  { month: "Dez", prev: 10, corr: 5, insp: 2 },
  { month: "Jan", prev: 12, corr: 4, insp: 3 },
  { month: "Fev", prev: 9, corr: 6, insp: 1 },
  { month: "Mar", prev: 11, corr: 3, insp: 2 },
  { month: "Abr", prev: 14, corr: 2, insp: 4 },
] as const

const COL_PREV = "#2563EB"
const COL_CORR = "#FCA5A5"
const COL_INSP = "#BBF7D0"

const PIE_PARTS = [
  { name: "Preventiva", value: 64, fill: "#2563EB" },
  { name: "Corretiva", value: 22, fill: "#EF4444" },
  { name: "Inspeção", value: 10, fill: "#22C55E" },
  { name: "Calibração", value: 4, fill: "#EAB308" },
]

const COSTS = [
  { tag: "GER-001", name: "Gerador Caterpillar", amount: 4200, os: 12 },
  { tag: "CMP-001", name: "Compressor Schulz", amount: 2800, os: 8 },
  { tag: "TMF-001", name: "Termoformadora MTF", amount: 1900, os: 6 },
  { tag: "BST-001", name: "Booster Flutrol 20K", amount: 1600, os: 5 },
]

const MTTR_ROWS = [
  { label: "Preventiva", hours: 1.8, widthPct: 45 },
  { label: "Corretiva", hours: 3.6, widthPct: 90 },
  { label: "Inspeção", hours: 0.8, widthPct: 20 },
]

function fmtMoney(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
}

function barColor(h: number) {
  if (h < 2) return "bg-[#2563EB]"
  if (h <= 4) return "bg-amber-500"
  return "bg-red-500"
}

function OsTooltip({
  active,
  label,
  payload,
}: {
  active?: boolean
  label?: string
  payload?: { name?: string; value?: number; color?: string }[]
}) {
  if (!active || !payload?.length) return null
  const prev = payload.find((p) => p.name === "Preventiva")?.value ?? 0
  const corr = payload.find((p) => p.name === "Corretiva")?.value ?? 0
  const insp = payload.find((p) => p.name === "Inspeção")?.value ?? 0
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
      <p className="mb-1.5 font-semibold text-foreground">{label}</p>
      <div className="space-y-0.5 text-muted-foreground">
        <div className="flex justify-between gap-6">
          <span>Preventiva</span>
          <span className="font-mono text-foreground">{prev}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span>Corretiva</span>
          <span className="font-mono text-foreground">{corr}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span>Inspeção</span>
          <span className="font-mono text-foreground">{insp}</span>
        </div>
      </div>
    </div>
  )
}

function TotalLabels(props: {
  x?: string | number
  y?: string | number
  width?: string | number
  index?: number
}) {
  const { x, y, width, index } = props
  if (x == null || y == null || width == null || index == null) return null
  const row = OS_MONTH[index]
  const total = row.prev + row.corr + row.insp
  const nx = Number(x) + Number(width) / 2
  const ny = Number(y) - 6
  return (
    <text
      x={nx}
      y={ny}
      textAnchor="middle"
      className="fill-foreground text-[11px] font-semibold tabular-nums"
    >
      {total}
    </text>
  )
}

const GAUGE_R = 54
const GAUGE_C = 2 * Math.PI * GAUGE_R
const CONF_PCT = 82

export function PcmChartsSection() {
  const [gaugeLen, setGaugeLen] = React.useState(0)

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      setGaugeLen((CONF_PCT / 100) * GAUGE_C)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const maxCost = Math.max(...COSTS.map((c) => c.amount))

  return (
    <section className="px-4 lg:px-6">
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_320px]">
        {/* Col 1 — OS por mês */}
        <div className="min-w-0 rounded-[14px] border border-border bg-card p-4 shadow-none">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[14px] font-bold text-foreground">OS por Mês</h2>
            <p className="text-[12px] text-muted-foreground">Últimos 6 meses</p>
          </div>
          <div className="h-[280px] min-h-[280px] w-full min-w-0 px-0 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...OS_MONTH]}
                margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                barCategoryGap="18%"
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, className: "fill-muted-foreground" }}
                />
                <YAxis tickLine={false} axisLine={false} width={32} tick={{ fontSize: 11 }} />
                <Tooltip content={<OsTooltip />} cursor={{ className: "fill-muted/15" }} />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: 12 }}
                  formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                />
                <Bar
                  dataKey="prev"
                  stackId="a"
                  name="Preventiva"
                  fill={COL_PREV}
                  radius={[0, 0, 0, 0]}
                  animationDuration={800}
                />
                <Bar
                  dataKey="corr"
                  stackId="a"
                  name="Corretiva"
                  fill={COL_CORR}
                  radius={[0, 0, 0, 0]}
                  animationDuration={800}
                />
                <Bar
                  dataKey="insp"
                  stackId="a"
                  name="Inspeção"
                  fill={COL_INSP}
                  radius={[4, 4, 0, 0]}
                  animationDuration={800}
                >
                  <LabelList content={<TotalLabels />} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Col 2 — Donut + custos */}
        <div className="min-w-0 rounded-[14px] border border-border bg-card p-4 shadow-none">
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative mx-auto h-[220px] min-h-[220px] w-full min-w-0 flex-1 lg:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_PARTS}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={78}
                    paddingAngle={1}
                    dataKey="value"
                    nameKey="name"
                    stroke="var(--card)"
                    strokeWidth={2}
                    isAnimationActive
                    animationDuration={600}
                  >
                    {PIE_PARTS.map((e, i) => (
                      <Cell key={e.name} fill={e.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-2">
                <div className="text-center">
                  <p className="text-[28px] font-extrabold tabular-nums text-foreground">100</p>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    total OS
                  </p>
                </div>
              </div>
            </div>
            <ul className="flex w-full shrink-0 flex-col gap-2 lg:max-w-[44%]">
              {PIE_PARTS.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full" style={{ background: p.fill }} />
                    <span className="truncate text-muted-foreground">{p.name}</span>
                  </span>
                  <span className="shrink-0 font-mono font-semibold tabular-nums text-foreground">
                    {p.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-4 bg-border/60" />

          <div>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.06em] text-muted-foreground">
              Maiores custos (acumulado)
            </p>
            <ul className="space-y-3">
              {COSTS.map((row) => {
                const pct = (row.amount / maxCost) * 100
                return (
                  <li key={row.tag} className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-[12px]">
                      <span className="font-mono font-semibold text-foreground">{row.tag}</span>
                      <span className="min-w-0 flex-1 truncate text-muted-foreground">{row.name}</span>
                      <span className="shrink-0 font-mono text-foreground">{fmtMoney(row.amount)}</span>
                      <span className="shrink-0 text-muted-foreground">{row.os} OS</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] pcm-bar-grow-h"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Col 3 — Gauge + MTTR */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-[14px] border border-border bg-card p-4 shadow-none">
            <div className="flex flex-col items-center">
              <div className="relative size-[140px]">
                <svg viewBox="0 0 140 140" className="size-[140px]">
                  <circle
                    cx="70"
                    cy="70"
                    r={GAUGE_R - 8}
                    className="fill-amber-500/10"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={GAUGE_R}
                    fill="none"
                    className="stroke-muted/25"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={GAUGE_R}
                    fill="none"
                    stroke="#EAB308"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${gaugeLen} ${GAUGE_C}`}
                    strokeDashoffset={0}
                    transform="rotate(-90 70 70)"
                    style={{ transition: "stroke-dasharray 1s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                  <span className="text-[28px] font-extrabold tabular-nums text-foreground">82%</span>
                  <span className="text-[10px] font-medium text-muted-foreground">conformidade</span>
                </div>
              </div>
              <p className="mt-2 text-center text-[12px] font-semibold text-foreground">Meta: 90%</p>
              <p className="text-center text-[12px] text-muted-foreground">
                Planos preventivos executados no prazo
              </p>
            </div>
          </div>

          <div className="rounded-[14px] border border-border bg-card p-4 shadow-none">
            <h3 className="mb-4 text-[14px] font-bold text-foreground">MTTR por Tipo</h3>
            <ul className="space-y-4">
              {MTTR_ROWS.map((row) => (
                <li key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-mono font-semibold tabular-nums text-foreground">
                      {row.hours}h
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
                    <div
                      className={cn("h-full rounded-full pcm-bar-grow-h", barColor(row.hours))}
                      style={{ width: `${row.widthPct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
