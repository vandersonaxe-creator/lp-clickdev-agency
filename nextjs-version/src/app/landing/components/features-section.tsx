"use client"

import {
  BarChart3,
  Bell,
  ClipboardList,
  Ruler,
  Settings,
  Wrench,
} from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { cn } from "@/lib/utils"
import { marketingCardTitle, marketingSectionLead, marketingSectionTitle } from "@/lib/marketing-typography"

const modules = [
  {
    icon: Wrench,
    title: "PCM (Planejamento e Controle da Manutenção)",
    description:
      "Gerencie preventivas, corretivas e preditivas de forma eficiente, prolongando a vida útil dos seus ativos e minimizando paradas não planejadas.",
  },
  {
    icon: Settings,
    title: "Gestão de Ativos",
    description:
      "Tenha um cadastro completo e organizado de todos os seus equipamentos, com histórico de manutenção, criticidade e localização.",
  },
  {
    icon: Ruler,
    title: "Controle Metrológico",
    description:
      "Monitore calibrações, certificados e alertas de vencimento de instrumentos de medição, garantindo conformidade e qualidade.",
  },
  {
    icon: BarChart3,
    title: "Dashboards de Produção",
    description:
      "Visualize em tempo real os KPIs mais importantes da sua operação, identifique gargalos e tome decisões baseadas em dados concretos.",
  },
]

const addOns = [
  {
    icon: ClipboardList,
    title: "Ordens de Serviço Digitais",
    description:
      "Agilize a abertura, execução e fechamento de OS, eliminando o papel e centralizando as informações.",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description:
      "Receba notificações automáticas por e-mail sobre preventivas próximas, calibrações a vencer e OS pendentes.",
  },
] as const

const cardStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function FeaturesSection() {
  return (
    <section id="solucoes" className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4">
            Soluções
          </Badge>
          <h2 className={cn(marketingSectionTitle, "mb-4")}>
            Soluções Inteligentes para a Gestão da sua Indústria.
          </h2>
          <p className={marketingSectionLead}>
            Oferecemos um portfólio de sistemas e dashboards desenvolvidos para otimizar os processos críticos da
            sua Pequena ou Média Empresa Industrial. Nossas soluções são construídas sob medida, garantindo que
            cada funcionalidade atenda às suas necessidades específicas.
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
          <p className={cn(marketingSectionLead, "text-center max-w-3xl mx-auto")}>
            Com a Click Dev, você garante rastreabilidade total, conformidade com normas e a transição suave de
            planilhas para um sistema robusto e integrado.
          </p>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={cardStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {modules.map((module) => (
              <motion.div key={module.title} variants={cardItem} className="h-full">
                <MagicCard
                  className="h-full rounded-xl border border-border/60 shadow-xs"
                  gradientFrom="#f97316"
                  gradientTo="#6366f1"
                  gradientColor="#f97316"
                  gradientOpacity={0.35}
                >
                  <div className="p-6">
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
                      <module.icon className="h-6 w-6 text-primary" aria-hidden />
                    </div>
                    <h3 className={marketingCardTitle}>{module.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
            {addOns.map((module) => (
              <motion.div key={module.title} variants={cardItem} className="h-full">
                <MagicCard
                  className="h-full rounded-xl border border-border/60 shadow-xs"
                  gradientFrom="#0ea5e9"
                  gradientTo="#ea580c"
                  gradientColor="#0ea5e9"
                  gradientOpacity={0.3}
                >
                  <div className="p-6">
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
                      <module.icon className="h-6 w-6 text-primary" aria-hidden />
                    </div>
                    <h3 className={marketingCardTitle}>{module.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
