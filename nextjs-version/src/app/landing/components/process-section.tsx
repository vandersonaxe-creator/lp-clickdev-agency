"use client"

import { motion } from "motion/react"
import {
  Compass,
  Map as MapIcon,
  Hammer,
  Rocket,
  TrendingUp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  marketingSectionLead,
  marketingSectionPadding,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { Eyebrow } from "./eyebrow"

const EASE = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Diagnóstico",
    description:
      "Conversa consultiva no WhatsApp para mapear processo, gargalos e o que hoje trava a operação.",
  },
  {
    n: "02",
    icon: MapIcon,
    title: "Mapeamento",
    description:
      "Entendimento técnico do fluxo real — ativos, papéis, dados e o que precisa virar sistema.",
  },
  {
    n: "03",
    icon: Hammer,
    title: "Escopo e protótipo",
    description:
      "Escopo fechado em blocos entregáveis e protótipo navegável antes de qualquer linha em produção.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Implantação gradual",
    description:
      "Módulos colocados em uso em ondas, com treinamento e suporte — sem parar a operação.",
  },
  {
    n: "05",
    icon: TrendingUp,
    title: "Evolução contínua",
    description:
      "Sistema cresce com a operação: novas rotinas, relatórios e integrações conforme a necessidade real.",
  },
] as const

export function ProcessSection() {
  return (
    <section
      id="processo"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.22_290/0.08),transparent_70%)]"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow align="center">Como o projeto acontece</Eyebrow>
          <h2
            className={cn(marketingSectionTitle, "mt-5 text-balance")}
          >
            Projeto sob medida, entregue em etapas previsíveis.
          </h2>
          <p className={cn(marketingSectionLead, "mt-4 text-balance")}>
            Sem pacote pronto, sem promessa vaga. Cada etapa tem entregável
            claro e leitura concreta do que muda na rotina.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[42px] hidden h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent lg:block"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map((step, index) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
                className="group relative"
              >
                <div className="relative flex flex-col items-start">
                  <div className="relative z-10 flex h-[84px] w-[84px] items-center justify-center rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm transition-colors group-hover:border-violet-500/40">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,oklch(0.6_0.2_290/0.15),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    <step.icon
                      className="relative h-7 w-7 text-foreground/80 transition-colors group-hover:text-violet-300"
                      aria-hidden
                    />
                  </div>

                  <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-400/90">
                    {step.n}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
