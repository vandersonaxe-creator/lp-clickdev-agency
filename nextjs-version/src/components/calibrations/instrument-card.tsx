"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  Building2,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

import { CriticalityBadge } from "@/components/assets/criticality-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type {
  CalibrationInstrument,
  CalibrationKanbanStatus,
} from "@/lib/mock-data/calibrations"

function fmt(d: string) {
  return format(parseISO(d), "dd/MM/yyyy", { locale: ptBR })
}

export function InstrumentCard({
  instrument,
  status,
  styleDelayMs = 0,
}: {
  instrument: CalibrationInstrument
  status: CalibrationKanbanStatus
  styleDelayMs?: number
}) {
  const router = useRouter()

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/assets/${encodeURIComponent(instrument.tag)}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          router.push(`/assets/${encodeURIComponent(instrument.tag)}`)
        }
      }}
      className={cn(
        "animate-slide-up-pcm flex w-full cursor-pointer flex-col gap-2 rounded-[10px] border bg-card p-3 text-left transition-[transform,box-shadow] duration-150",
        "hover:-translate-y-px hover:shadow-md",
        status === "expired" &&
          "border-l-[3px] border-l-red-600 bg-destructive/5",
        status === "expiring" &&
          "border-l-[3px] border-l-amber-500 bg-amber-500/5",
        status === "valid" && "border-border"
      )}
      style={{ animationDelay: `${styleDelayMs}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[13px] font-bold leading-tight">
          {instrument.tag}
        </span>
        <CriticalityBadge value={instrument.criticality} />
      </div>
      <p className="text-[13px] font-semibold leading-snug text-foreground">
        {instrument.name}
      </p>
      <p className="text-[12px] text-muted-foreground">
        {instrument.manufacturer} · {instrument.model}
      </p>

      {status === "expired" ? (
        <div className="space-y-0.5 border-t border-border/50 pt-2">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-red-600 dark:text-red-400">
            <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
            Vencido há {instrument.daysOverdue} dias
          </p>
          <p className="text-[11px] text-muted-foreground">
            Venceu em: {fmt(instrument.nextCal)}
          </p>
        </div>
      ) : null}

      {status === "expiring" ? (
        <div className="space-y-0.5 border-t border-border/50 pt-2">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-amber-600 dark:text-amber-400">
            <Clock className="size-3.5 shrink-0" aria-hidden />
            Vence em {instrument.daysUntil} dias
          </p>
          <p className="text-[11px] text-muted-foreground">
            Vence em: {fmt(instrument.nextCal)}
          </p>
        </div>
      ) : null}

      {status === "valid" ? (
        <div className="space-y-0.5 border-t border-border/50 pt-2">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="size-3.5 shrink-0" aria-hidden />
            Válida até {fmt(instrument.nextCal)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Calibrado em: {fmt(instrument.lastCal)}
          </p>
        </div>
      ) : null}

      <div
        className="flex items-center justify-between gap-2 border-t border-border/50 pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex min-w-0 items-center gap-1 text-[11px] text-muted-foreground">
          <Building2 className="size-3 shrink-0" aria-hidden />
          <span className="truncate">{instrument.provider}</span>
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-[11px]"
          asChild
        >
          <Link href={`/assets/${encodeURIComponent(instrument.tag)}`}>
            Ver
            <ExternalLink className="size-3" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  )
}
