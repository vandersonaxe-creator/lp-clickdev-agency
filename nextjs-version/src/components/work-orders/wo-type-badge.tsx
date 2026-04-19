import { Gauge, Search, Wrench, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import type { WoType } from "@/lib/mock-data/work-orders"

const config: Record<
  WoType,
  { label: string; emoji: string; className: string; Icon: typeof Wrench }
> = {
  preventive: {
    label: "Preventiva",
    emoji: "🔧",
    className: "border-sky-500/40 bg-sky-500/15 text-sky-700 dark:text-sky-300",
    Icon: Wrench,
  },
  corrective: {
    label: "Corretiva",
    emoji: "⚡",
    className: "border-red-500/40 bg-red-500/15 text-red-700 dark:text-red-300",
    Icon: Zap,
  },
  inspection: {
    label: "Inspeção",
    emoji: "🔍",
    className: "border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
    Icon: Search,
  },
  calibration: {
    label: "Calibração",
    emoji: "📐",
    className: "border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300",
    Icon: Gauge,
  },
}

export function WoTypeBadge({
  type,
  className,
}: {
  type: WoType
  className?: string
}) {
  const c = config[type]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold",
        c.className,
        className
      )}
    >
      <span aria-hidden className="select-none text-[10px]">
        {c.emoji}
      </span>
      <c.Icon className="size-3 shrink-0 opacity-90" aria-hidden />
      {c.label}
    </span>
  )
}
