"use client"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import type { WorkOrder, WoType } from "@/lib/mock-data/work-orders"

const TYPE_STYLES: Record<WoType, string> = {
  preventive: "border-sky-500/40 bg-sky-500/15 text-sky-900 dark:text-sky-100",
  corrective: "border-red-500/40 bg-red-500/15 text-red-900 dark:text-red-100",
  inspection:
    "border-emerald-500/40 bg-emerald-500/15 text-emerald-900 dark:text-emerald-100",
  calibration:
    "border-amber-500/40 bg-amber-500/15 text-amber-900 dark:text-amber-100",
}

const TYPE_LABEL: Record<WoType, string> = {
  preventive: "Preventiva",
  corrective: "Corretiva",
  inspection: "Inspeção",
  calibration: "Calibração",
}

const STATUS_LABEL: Record<WorkOrder["status"], string> = {
  planned: "Planejada",
  open: "Aberta",
  in_progress: "Em andamento",
  completed: "Concluída",
  cancelled: "Cancelada",
}

export function WoCalendarChip({ wo }: { wo: WorkOrder }) {
  const router = useRouter()
  const tip = `${wo.wo_number} — ${wo.title} — ${TYPE_LABEL[wo.type]} — ${STATUS_LABEL[wo.status]}`

  return (
    <button
      type="button"
      title={tip}
      onClick={(e) => {
        e.stopPropagation()
        router.push(`/work-orders/${encodeURIComponent(wo.id)}`)
      }}
      className={cn(
        "flex h-[22px] w-full max-w-full items-center rounded border px-1 text-left text-[10px] font-bold leading-none transition-opacity hover:opacity-90",
        TYPE_STYLES[wo.type]
      )}
    >
      <span className="block truncate">{wo.tag}</span>
    </button>
  )
}
