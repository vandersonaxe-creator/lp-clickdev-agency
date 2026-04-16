"use client"

import {
  BarChart3,
  Bell,
  ClipboardList,
  Ruler,
  Settings,
  Wrench
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { marketingCardTitle, marketingSectionLead, marketingSectionTitle } from '@/lib/marketing-typography'

const modules = [
  {
    icon: Wrench,
    title: 'PCM (Planejamento e Controle da Manutenção)',
    description:
      'Gerencie preventivas, corretivas e preditivas de forma eficiente, prolongando a vida útil dos seus ativos e minimizando paradas não planejadas.'
  },
  {
    icon: Settings,
    title: 'Gestão de Ativos',
    description:
      'Tenha um cadastro completo e organizado de todos os seus equipamentos, com histórico de manutenção, criticidade e localização.'
  },
  {
    icon: Ruler,
    title: 'Controle Metrológico',
    description:
      'Monitore calibrações, certificados e alertas de vencimento de instrumentos de medição, garantindo conformidade e qualidade.'
  },
  {
    icon: BarChart3,
    title: 'Dashboards de Produção',
    description:
      'Visualize em tempo real os KPIs mais importantes da sua operação, identifique gargalos e tome decisões baseadas em dados concretos.'
  }
]

const addOns = [
  {
    icon: ClipboardList,
    title: 'Ordens de Serviço Digitais',
    description:
      'Agilize a abertura, execução e fechamento de OS, eliminando o papel e centralizando as informações.'
  },
  {
    icon: Bell,
    title: 'Alertas Inteligentes',
    description:
      'Receba notificações automáticas por e-mail sobre preventivas próximas, calibrações a vencer e OS pendentes.'
  }
] as const

export function FeaturesSection() {
  return (
    <section id="solucoes" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Soluções</Badge>
          <h2 className={cn(marketingSectionTitle, "mb-4")}>
            Soluções Inteligentes para a Gestão da sua Indústria.
          </h2>
          <p className={marketingSectionLead}>
            Oferecemos um portfólio de sistemas e dashboards desenvolvidos para otimizar os processos críticos da
            sua Pequena ou Média Empresa Industrial. Nossas soluções são construídas sob medida, garantindo que
            cada funcionalidade atenda às suas necessidades específicas.
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-10">
          <p className={cn(marketingSectionLead, "text-center max-w-3xl mx-auto")}>
            Com a Click Dev, você garante rastreabilidade total, conformidade com normas e a transição suave de
            planilhas para um sistema robusto e integrado.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.title} className="shadow-xs">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
                    <module.icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <h3 className={marketingCardTitle}>{module.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                </CardContent>
              </Card>
            ))}
            {addOns.map((module) => (
              <Card key={module.title} className="shadow-xs">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
                    <module.icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <h3 className={marketingCardTitle}>{module.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
