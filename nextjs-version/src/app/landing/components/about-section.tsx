"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CardDecorator } from '@/components/ui/card-decorator'
import { ShieldCheck, Factory, GitBranch, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { marketingCardTitle, marketingSectionTitle } from '@/lib/marketing-typography'
import { SectionReveal } from './section-reveal'

const values = [
  {
    icon: Factory,
    title: 'Vivência no chão de fábrica',
    description: 'A gente entende a rotina industrial porque viveu os desafios de manutenção e operação na prática.'
  },
  {
    icon: LineChart,
    title: 'Decisão orientada por dados',
    description: 'Dashboards e indicadores em tempo real para reduzir gargalos e aumentar eficiência operacional.'
  },
  {
    icon: GitBranch,
    title: 'Sob medida, sem ruptura',
    description: 'Transição suave de planilhas para um sistema robusto, integrado ao seu processo e ao seu time.'
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e LGPD',
    description: 'Soluções com foco em segurança de dados e conformidade com a LGPD para proteger suas informações.'
  }
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="mb-4">
            Sobre a Click Dev
          </Badge>
          <h2 className={cn(marketingSectionTitle, "text-balance")}>
            Click Dev: Inovação Industrial Nascida da Experiência no Chão de Fábrica.
          </h2>
        </div>

        {/* Modern Values Grid with Enhanced Design */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4 mb-8">
          {values.map((value, index) => (
            <Card key={index} className='group shadow-xs py-2'>
              <CardContent className='p-8'>
                <div className='flex flex-col items-center text-center'>
                  <CardDecorator>
                    <value.icon className='h-6 w-6' aria-hidden />
                  </CardDecorator>
                  <h3 className={cn(marketingCardTitle, 'mt-6 text-balance')}>{value.title}</h3>
                  <p className='text-muted-foreground mt-3 text-sm'>{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </SectionReveal>
      </div>
    </section>
  )
}
