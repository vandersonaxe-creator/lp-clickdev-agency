import { cn } from "@/lib/utils"
import type { WoStatus } from "@/lib/mock-data/work-orders"

const labels: Record<WoStatus, string> = {
  planned: "PLANEJADA",
  open: "ABERTA",
  in_progress: "EM ANDAMENTO",
  completed: "CONCLUÍDA",
  cancelled: "CANCELADA",
}

const dotClass: Record<WoStatus, string> = {
  planned: "bg-zinc-400",
  open: "bg-sky-500",
  in_progress: "bg-amber-500 animate-pcm-pulse",
  completed: "bg-emerald-500",
  cancelled: "bg-red-500",
}

export function WoStatusBadge({
  status,
  className,
}: {
  status: WoStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-bold tracking-wide",
        className
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotClass[status])}
        aria-hidden
      />
      <span className={cn(status === "cancelled" && "line-through")}>
        {labels[status]}
      </span>
    </span>
  )
}
