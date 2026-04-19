import { cn } from "@/lib/utils"
import type { CalibrationState } from "@/lib/mock-data/assets"

const label: Record<CalibrationState, string> = {
  valid: "VÁLIDA",
  expiring: "VENCENDO",
  expired: "VENCIDA",
}

const styles: Record<CalibrationState, string> = {
  valid:
    "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  expiring:
    "border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-400",
  expired: "border-red-500/40 bg-red-500/15 text-red-700 dark:text-red-400",
}

export function CalibrationBadge({
  state,
  className,
}: {
  state: CalibrationState
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide",
        styles[state],
        className
      )}
    >
      {label[state]}
    </span>
  )
}
