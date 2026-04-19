"use client"

import * as React from "react"
import {
  AlertTriangle,
  CalendarClock,
  Clock,
  FileText,
  Gauge,
  Pencil,
  Plus,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Rule = {
  id: string
  name: string
  condition: string
  channels: ("E-mail" | "WhatsApp" | "Sistema")[]
  active: boolean
  lastRun: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
}

const INITIAL_RULES: Rule[] = [
  {
    id: "1",
    name: "Preventiva próxima do vencimento",
    condition:
      "Quando uma preventiva estiver a 7 dias da data programada",
    channels: ["E-mail", "Sistema"],
    active: true,
    lastRun: "15/04/2026 às 07:00",
    icon: CalendarClock,
    iconColor: "text-blue-500",
  },
  {
    id: "2",
    name: "Preventiva atrasada",
    condition: "Quando uma preventiva ultrapassar a data programada",
    channels: ["E-mail", "WhatsApp", "Sistema"],
    active: true,
    lastRun: "15/04/2026 às 07:00",
    icon: AlertTriangle,
    iconColor: "text-red-500",
  },
  {
    id: "3",
    name: "Calibração vencendo",
    condition:
      "Quando um instrumento estiver a 30 dias do vencimento",
    channels: ["E-mail", "Sistema"],
    active: true,
    lastRun: "15/04/2026 às 07:00",
    icon: Gauge,
    iconColor: "text-amber-500",
  },
  {
    id: "4",
    name: "Calibração vencida",
    condition: "Quando a calibração de um instrumento expirar",
    channels: ["E-mail", "WhatsApp", "Sistema"],
    active: true,
    lastRun: "15/04/2026 às 07:00",
    icon: Gauge,
    iconColor: "text-red-600",
  },
  {
    id: "5",
    name: "OS sem execução há 48h",
    condition: "Quando uma OS aberta não for iniciada em 48 horas",
    channels: ["E-mail"],
    active: true,
    lastRun: "15/04/2026 às 07:00",
    icon: Clock,
    iconColor: "text-amber-600",
  },
  {
    id: "6",
    name: "Relatório semanal automático",
    condition: "Enviar resumo semanal todo domingo às 20:00",
    channels: ["E-mail"],
    active: false,
    lastRun: "—",
    icon: FileText,
    iconColor: "text-muted-foreground",
  },
]

function channelBadgeClass(ch: string) {
  if (ch === "E-mail") return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
  if (ch === "WhatsApp")
    return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  return "bg-violet-500/10 text-violet-700 dark:text-violet-300"
}

export function AlertRulesContent() {
  const [rules, setRules] = React.useState(INITIAL_RULES)

  const toggleRule = (id: string, checked: boolean) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: checked } : r))
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
            Regras de Alerta
          </h1>
          <p className="text-[14px] text-muted-foreground">
            Configure notificações automáticas para manter a operação sob
            controle
          </p>
        </div>
        <Button type="button" className="shrink-0">
          <Plus className="size-4" />
          Nova Regra
        </Button>
      </div>

      <div className="grid gap-4">
        {rules.map((rule) => {
          const Icon = rule.icon
          return (
            <div
              key={rule.id}
              className={cn(
                "rounded-xl border border-border p-4 transition-all duration-200",
                "hover:-translate-y-px hover:shadow-sm",
                !rule.active && "bg-muted/30 opacity-60"
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <Switch
                    checked={rule.active}
                    onCheckedChange={(c) => toggleRule(rule.id, c)}
                    className="mt-1 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[15px] font-semibold leading-snug text-foreground">
                        {rule.name}
                      </h2>
                      <Badge
                        variant="secondary"
                        className={
                          rule.active
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {rule.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <Icon
                        className={cn("mt-0.5 size-5 shrink-0", rule.iconColor)}
                      />
                      <span>{rule.condition}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Canal:
                      </span>
                      {rule.channels.map((ch) => (
                        <Badge
                          key={ch}
                          variant="outline"
                          className={cn(
                            "text-xs font-normal",
                            channelBadgeClass(ch)
                          )}
                        >
                          {ch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Última execução: {rule.lastRun}
                </p>
                <Button variant="ghost" size="sm" className="h-8 gap-1 self-start sm:self-auto">
                  <Pencil className="size-3.5" />
                  Editar
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
