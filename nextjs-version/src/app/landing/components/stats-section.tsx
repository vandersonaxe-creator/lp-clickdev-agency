"use client"

import { CalendarClock, ClipboardList, Factory, ShieldCheck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { DotPattern } from "@/components/dot-pattern"
import { cn } from "@/lib/utils"
import { marketingStatValue } from "@/lib/marketing-typography"

const stats = [
  {
    icon: CalendarClock,
    value: "10+",
    label: "Anos em campo",
    description: "Manutenção, eólica e chão de fábrica",
  },
  {
    icon: Factory,
    value: "100%",
    label: "Sob medida",
    description: "Sem pacote genérico — do seu jeito",
  },
  {
    icon: ClipboardList,
    value: "0 papel",
    label: "Ordens de serviço",
    description: "Tudo digital, rastreável e organizado",
  },
  {
    icon: ShieldCheck,
    value: "LGPD",
    label: "Conformidade",
    description: "Segurança de dados desde o primeiro dia",
  },
] as const

export function StatsSection() {
  return (
    <section id="resultados" className="relative py-10 sm:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/20" />
      <DotPattern className="opacity-75" size="md" fadeStyle="circle" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 bg-background/60 py-0 text-center backdrop-blur-sm"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="mb-3 flex justify-center sm:mb-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                </div>
                <div className="space-y-1">
                  <p
                    className={cn(
                      marketingStatValue,
                      "min-h-[2.75rem] text-balance text-foreground tabular-nums leading-tight"
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground sm:text-base">{stat.label}</p>
                  <p className="text-xs leading-snug text-muted-foreground sm:text-sm">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
