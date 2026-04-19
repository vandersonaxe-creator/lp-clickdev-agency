import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { PlanFrequency } from "@/lib/mock-data/plans"

const styles: Record<PlanFrequency, string> = {
  Mensal: "border-blue-500/40 bg-blue-500/12 text-blue-700 dark:text-blue-300",
  Bimestral: "border-cyan-500/40 bg-cyan-500/12 text-cyan-800 dark:text-cyan-300",
  Trimestral: "border-emerald-500/40 bg-emerald-500/12 text-emerald-800 dark:text-emerald-300",
  Quadrimestral: "border-violet-500/40 bg-violet-500/12 text-violet-800 dark:text-violet-300",
  Semestral: "border-amber-500/40 bg-amber-500/12 text-amber-900 dark:text-amber-300",
  Anual: "border-slate-500/40 bg-slate-500/12 text-slate-800 dark:text-slate-300",
}

export function FrequencyBadge({
  frequency,
  className,
}: {
  frequency: PlanFrequency
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", styles[frequency], className)}
    >
      {frequency}
    </Badge>
  )
}
