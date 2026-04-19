"use client"

import { useRouter } from "next/navigation"

import { CriticalityBadge } from "@/components/assets/criticality-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  parsePlanDate,
  PLANS_REFERENCE_DATE,
  type PreventivePlan,
} from "@/lib/mock-data/plans"

/** Próximas execuções a partir da data de referência (lista simples). */
export function UpcomingExecutions({ plans }: { plans: PreventivePlan[] }) {
  const router = useRouter()
  const ref = PLANS_REFERENCE_DATE
  const refDay = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate())

  const upcoming = plans
    .filter((p) => p.next && p.status !== "inactive")
    .map((p) => ({ plan: p, d: parsePlanDate(p.next!)! }))
    .filter(({ d }) => d >= refDay)
    .sort((a, b) => a.d.getTime() - b.d.getTime())
    .slice(0, 7)

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold">
          Próximas Execuções — Abril 2026
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma execução futura no período.
          </p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map(({ plan, d }) => {
              const line = d.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })
              return (
                <li key={plan.id}>
                  <button
                    type="button"
                    className="flex w-full flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60"
                    onClick={() => router.push(`/plans/${encodeURIComponent(plan.id)}`)}
                  >
                    <span className="font-mono font-bold tabular-nums text-foreground">
                      {line}
                    </span>
                    <span className="text-muted-foreground">—</span>
                    <span className="font-mono font-semibold">{plan.tag}</span>
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">
                      {plan.asset}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({plan.frequency})
                    </span>
                    <CriticalityBadge value={plan.criticality} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
