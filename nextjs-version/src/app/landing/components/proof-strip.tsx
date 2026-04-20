"use client"

import { Factory, Gauge, ShieldCheck, Wind, Wrench } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const credentials = [
  { icon: Wind, label: "Multi-fabricante eólico — Siemens · Vestas · Suzlon" },
  { icon: Wrench, label: "Planejamento e execução de PCM industrial" },
  { icon: Gauge, label: "Controle metrológico e calibrações rastreáveis" },
  { icon: Factory, label: "Dashboards em operação no chão de fábrica" },
  { icon: ShieldCheck, label: "Acessos e LGPD desde o dia um" },
] as const

export function ProofStrip() {
  return (
    <section
      aria-label="Credenciais operacionais"
      className="relative border-y border-border/70 bg-background/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent,oklch(0.55_0.22_290/0.04)_50%,transparent)]"
      />
      <div className="container relative mx-auto px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex flex-wrap items-center justify-center",
            "gap-x-8 gap-y-3 text-xs font-medium text-muted-foreground sm:text-sm"
          )}
        >
          {credentials.map((item, index) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2">
                <item.icon
                  className="h-4 w-4 shrink-0 text-violet-400/90"
                  aria-hidden
                />
                <span className="text-foreground/85">{item.label}</span>
              </span>
              {index < credentials.length - 1 && (
                <span
                  aria-hidden
                  className="hidden h-3 w-px bg-border lg:inline-block"
                />
              )}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
