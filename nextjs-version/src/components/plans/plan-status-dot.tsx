import { cn } from "@/lib/utils"
import type { PlanStatus } from "@/lib/mock-data/plans"

export function PlanStatusDot({
  status,
  className,
}: {
  status: PlanStatus
  className?: string
}) {
  if (status === "inactive") {
    return (
      <span
        className={cn("inline-block h-2 w-2 rounded-full bg-zinc-400", className)}
        title="Inativo"
      />
    )
  }
  if (status === "on_track") {
    return (
      <span
        className={cn("inline-block h-2 w-2 rounded-full bg-emerald-500", className)}
        title="No prazo"
      />
    )
  }
  if (status === "overdue") {
    return (
      <span
        className={cn(
          "inline-block h-2 w-2 animate-pcm-pulse rounded-full bg-red-500",
          className
        )}
        title="Atrasado"
      />
    )
  }
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 animate-pcm-pulse rounded-full bg-amber-500",
        className
      )}
      title="A vencer"
    />
  )
}
