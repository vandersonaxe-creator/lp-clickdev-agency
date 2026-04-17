"use client"

import { CalendarClock, TrendingDown, TrendingUp, Factory } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { DotPattern } from "@/components/dot-pattern"
import { NumberTicker } from "@/components/ui/number-ticker"
import { cn } from "@/lib/utils"
import { marketingStatValue } from "@/lib/marketing-typography"

const stats = [
  {
    icon: TrendingDown,
    value: 30,
    suffix: "%",
    label: "Paradas não planejadas",
    description: "Meta de redução após diagnóstico e digitalização do PCM.",
  },
  {
    icon: TrendingUp,
    value: 15,
    suffix: "%",
    label: "Eficiência operacional",
    description: "Ganho típico com dados em tempo real e menos retrabalho.",
  },
  {
    icon: CalendarClock,
    value: 10,
    suffix: "+",
    label: "Anos em campo",
    description: "Manutenção, eólica e chão de fábrica antes do software.",
  },
  {
    icon: Factory,
    value: 100,
    suffix: "%",
    label: "Sob medida",
    description: "Soluções alinhadas ao seu processo — sem pacote genérico.",
  },
] as const

function StatFigure({
  value,
  suffix,
  className,
}: {
  value: number
  suffix: string
  className?: string
}) {
  return (
    <span
      className={cn(
        marketingStatValue,
        "inline-flex items-baseline justify-center gap-0.5 text-foreground tabular-nums",
        className
      )}
    >
      <NumberTicker value={value} className="text-foreground dark:text-foreground" />
      <span>{suffix}</span>
    </span>
  )
}

export function StatsSection() {
  return (
    <section id="resultados" className="relative py-10 sm:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/20" />
      <DotPattern className="opacity-75" size="md" fadeStyle="circle" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 bg-background/60 py-0 text-center backdrop-blur-sm"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="mb-3 flex justify-center sm:mb-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className={cn("flex min-h-[2.5rem] items-center justify-center")}>
                    <StatFigure value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{stat.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug sm:text-sm">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
