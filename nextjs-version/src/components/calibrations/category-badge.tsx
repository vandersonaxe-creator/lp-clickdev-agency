import { cn } from "@/lib/utils"
import type { InstrumentCategory } from "@/lib/mock-data/calibrations"

const styles: Record<InstrumentCategory, string> = {
  Dimensional: "border-sky-500/40 bg-sky-500/15 text-sky-800 dark:text-sky-200",
  Pressão: "border-red-500/40 bg-red-500/15 text-red-800 dark:text-red-200",
  Torque: "border-amber-500/40 bg-amber-500/15 text-amber-900 dark:text-amber-200",
  Elétrica: "border-cyan-500/40 bg-cyan-500/15 text-cyan-900 dark:text-cyan-200",
}

export function CategoryBadge({
  category,
  className,
}: {
  category: InstrumentCategory
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold",
        styles[category],
        className
      )}
    >
      {category}
    </span>
  )
}
