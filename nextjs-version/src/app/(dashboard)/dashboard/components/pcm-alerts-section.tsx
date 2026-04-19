"use client"

import { Check, Wrench, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const PREVENTIVAS = [
  { tag: "CMP-001", asset: "Compressor Schulz", plano: "Prev. Trimestral", atraso: "12d atraso" },
  { tag: "BST-001", asset: "Booster Flutrol 20K", plano: "Prev. Trimestral", atraso: "8d atraso" },
  { tag: "TMF-001", asset: "Termoformadora MTF", plano: "Prev. Bimestral", atraso: "3d atraso" },
]

const CALIB_VENC = [
  { tag: "MIC-001", name: "Micrômetro 0-25mm", lab: "Metrolog", status: "67d vencido", dot: "red" as const },
  { tag: "TQM-002", name: "Torquímetro 10-50 N.m", lab: "Torkcal", status: "93d vencido", dot: "red" as const },
  { tag: "TDP-001", name: "Transdutor Pressão", lab: "Presscal", status: "48d vencido", dot: "red" as const },
  { tag: "TMP-002", name: "Termômetro Contato", lab: "Calibra RJ", status: "149d vencido", dot: "red" as const },
  { tag: "PAQ-003", name: "Paquímetro Analógico", lab: "Calibra RJ", status: "Vence em 12d", dot: "amber" as const },
  { tag: "MAN-002", name: "Manômetro 0-1000 bar", lab: "Presscal", status: "Vence em 21d", dot: "amber" as const },
]

const ATIVIDADE = [
  {
    kind: "completed" as const,
    title: "Preventiva Gerador GEP208",
    wo: "WO-2026-000034",
    when: "2h atrás",
    who: "Vanderson",
  },
  {
    kind: "started" as const,
    title: "Corretiva Extrusora PP-01",
    wo: "WO-2026-000033",
    when: "4h atrás",
    who: "Técnico 2",
  },
  {
    kind: "created" as const,
    title: "Inspeção Prensa Hidraumak",
    wo: "WO-2026-000032",
    when: "6h atrás",
    who: "QR Code",
  },
  {
    kind: "completed" as const,
    title: "Prev. Compressor Chicago",
    wo: "WO-2026-000031",
    when: "1 dia atrás",
    who: "Vanderson",
  },
  {
    kind: "completed" as const,
    title: "Calibração PAQ-001",
    wo: "WO-2026-000030",
    when: "2 dias atrás",
    who: "Calibra RJ",
  },
]

function TimelineIcon({ kind }: { kind: "completed" | "started" | "created" }) {
  if (kind === "completed") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <Check className="size-4" aria-hidden />
      </span>
    )
  }
  if (kind === "started") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
        <Wrench className="size-4" aria-hidden />
      </span>
    )
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
      <Zap className="size-4" aria-hidden />
    </span>
  )
}

export function PcmAlertsSection() {
  return (
    <section className="px-4 pb-2 lg:px-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Preventivas atrasadas */}
        <div className="rounded-[14px] border border-border bg-card p-4 shadow-none">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[14px] font-bold text-foreground">Preventivas Atrasadas</h2>
            <Badge variant="destructive" className="font-mono text-[11px]">
              3 atrasadas
            </Badge>
          </div>
          <ul className="space-y-3">
            {PREVENTIVAS.map((row, i) => (
              <li
                key={row.tag}
                className="animate-slide-up-pcm rounded-lg border border-border/60 bg-muted/20 p-3"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 gap-2">
                    <span className="mt-1.5 size-2 shrink-0 animate-pcm-pulse rounded-full bg-red-500" />
                    <div className="min-w-0">
                      <p className="font-mono text-[12px] font-semibold text-foreground">{row.tag}</p>
                      <p className="truncate text-[13px] text-foreground">{row.asset}</p>
                      <p className="text-[12px] text-muted-foreground">{row.plano}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0 border-red-500/40 bg-red-500/10 font-mono text-[11px] text-red-600 dark:text-red-400">
                    {row.atraso}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Calibrações */}
        <div className="rounded-[14px] border border-border bg-card p-4 shadow-none">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[14px] font-bold text-foreground">Calibrações</h2>
            <Badge
              variant="outline"
              className="border-amber-500/40 bg-amber-500/10 font-mono text-[11px] text-amber-700 dark:text-amber-400"
            >
              4 vencidas
            </Badge>
          </div>
          <ul className="max-h-[280px] space-y-2 overflow-y-auto pr-1">
            {CALIB_VENC.map((row, i) => (
              <li
                key={row.tag}
                className="animate-slide-up-pcm rounded-lg border border-border/60 bg-muted/15 px-3 py-2"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      row.dot === "red" && "animate-pcm-pulse bg-red-500",
                      row.dot === "amber" && "bg-amber-500"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-[12px] font-semibold text-foreground">{row.tag}</span>
                      <span
                        className={cn(
                          "text-[11px] font-medium",
                          row.dot === "red" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"
                        )}
                      >
                        {row.status}
                      </span>
                    </div>
                    <p className="truncate text-[13px] text-foreground">{row.name}</p>
                    <p className="text-[12px] text-muted-foreground">{row.lab}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Atividade recente */}
        <div className="rounded-[14px] border border-border bg-card p-4 shadow-none">
          <h2 className="mb-4 text-[14px] font-bold text-foreground">Atividade Recente</h2>
          <div className="ml-2 border-l border-border pl-6">
            <ul className="space-y-6">
              {ATIVIDADE.map((row, i) => (
                <li
                  key={row.wo}
                  className="animate-slide-up-pcm relative"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute -left-[41px] top-0">
                    <TimelineIcon kind={row.kind} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[13px] font-semibold leading-snug text-foreground">{row.title}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                      <span className="font-mono font-semibold text-[#2563EB]">{row.wo}</span>
                      <span className="mx-1.5 text-border">·</span>
                      <span>{row.when}</span>
                      <span className="mx-1.5 text-border">·</span>
                      <span>{row.who}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
