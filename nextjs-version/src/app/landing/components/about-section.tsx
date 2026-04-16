"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CardDecorator } from '@/components/ui/card-decorator'
import { ShieldCheck, Factory, GitBranch, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { marketingCardTitle, marketingSectionLead, marketingSectionTitle } from '@/lib/marketing-typography'
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
    <section id="sobre" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Sobre a Click Dev
          </Badge>
          <h2 className={cn(marketingSectionTitle, "mb-6 text-balance")}>
            Click Dev: Inovação Industrial Nascida da Experiência no Chão de Fábrica.
          </h2>
          <p className={cn(marketingSectionLead, "mb-8 text-balance")}>
            Na Click Dev, entendemos os desafios da sua indústria porque vivemos eles. Com mais de uma década de
            experiência prática no chão de fábrica e na manutenção de turbinas eólicas, nosso fundador, Vanderson
            Machado, transformou a vivência em soluções. De OS perdidas a calibrações vencidas, cada problema
            enfrentado inspirou a criação de sistemas que realmente funcionam. Não vendemos software pronto;
            construímos a inteligência que sua operação precisa para prosperar. Nossas soluções são desenvolvidas
            com foco em segurança de dados e conformidade com a LGPD, garantindo a proteção das suas informações.
          </p>
        </div>

        {/* Modern Values Grid with Enhanced Design */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4 mb-12">
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
