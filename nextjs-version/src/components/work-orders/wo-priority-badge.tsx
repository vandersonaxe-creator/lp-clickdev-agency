import { cn } from "@/lib/utils"
import type { WoPriority } from "@/lib/mock-data/work-orders"

const labels: Record<WoPriority, string> = {
  low: "BAIXA",
  medium: "MÉDIA",
  high: "ALTA",
  critical: "CRÍTICA",
}

const styles: Record<WoPriority, string> = {
  low: "border-zinc-400/50 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  medium: "border-sky-500/40 bg-sky-500/15 text-sky-800 dark:text-sky-300",
  high: "border-orange-500/50 bg-orange-500/15 text-orange-800 dark:text-orange-300",
  critical:
    "border-red-500/60 bg-red-500/15 text-red-800 dark:text-red-300 animate-pulse",
}

export function WoPriorityBadge({
  priority,
  className,
}: {
  priority: WoPriority
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded border px-2 py-0.5 text-[10px] font-bold tracking-wide",
        styles[priority],
        className
      )}
    >
      {labels[priority]}
    </span>
  )
}
