"use client"

import {
  BarChart3,
  Bell,
  ClipboardList,
  Database,
  MonitorSmartphone,
  Ruler,
  Settings,
  Workflow,
  Wrench,
} from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { marketingCardTitle, marketingSectionTitle } from "@/lib/marketing-typography"

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

const extraSolutions = [
  {
    icon: Workflow,
    title: "Automação de Processos com IA",
    description:
      "Automatize rotinas repetitivas com fluxos inteligentes — relatórios gerados automaticamente, aprovações digitais e notificações em tempo real via WhatsApp ou e-mail.",
    gradient: "module" as const,
  },
  {
    icon: Database,
    title: "Migração de Planilhas para Sistema",
    description:
      "Transforme seus controles em Excel em um banco de dados real. Com histórico, permissões por usuário e acesso de qualquer dispositivo — sem depender do arquivo de uma pessoa.",
    gradient: "addon" as const,
  },
  {
    icon: MonitorSmartphone,
    title: "Sistemas Web sob Medida",
    description:
      "Qualquer processo que hoje vive em papel, planilha ou na cabeça de alguém pode virar um sistema. Do controle de RH ao almoxarifado — construído para o seu processo, não o contrário.",
    gradient: "module" as const,
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
    <section id="solucoes" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="mb-4">
            Soluções
          </Badge>
          <h2 className={marketingSectionTitle}>
            Soluções Inteligentes para a Gestão da sua Indústria.
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
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
            {extraSolutions.map((module) => (
              <motion.div key={module.title} variants={cardItem} className="h-full">
                <MagicCard
                  className="h-full rounded-xl border border-border/60 shadow-xs"
                  {...(module.gradient === "module"
                    ? {
                        gradientFrom: "#f97316",
                        gradientTo: "#6366f1",
                        gradientColor: "#f97316",
                        gradientOpacity: 0.35,
                      }
                    : {
                        gradientFrom: "#0ea5e9",
                        gradientTo: "#ea580c",
                        gradientColor: "#0ea5e9",
                        gradientOpacity: 0.3,
                      })}
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
