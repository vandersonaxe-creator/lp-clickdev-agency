import { cn } from "@/lib/utils"
import type { Criticality } from "@/lib/mock-data/assets"

const styles: Record<Criticality, string> = {
  A: "bg-red-600 text-white",
  B: "bg-amber-500 text-white",
  C: "bg-emerald-600 text-white",
}

export function CriticalityBadge({
  value,
  className,
}: {
  value: Criticality
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none",
        styles[value],
        className
      )}
      title={`Criticidade ${value}`}
    >
      {value}
    </span>
  )
}
