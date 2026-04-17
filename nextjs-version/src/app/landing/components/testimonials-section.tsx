"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { cn } from '@/lib/utils'
import { marketingSectionLead, marketingSectionTitle } from '@/lib/marketing-typography'
import { SectionReveal } from './section-reveal'

type Testimonial = {
  name: string
  role: string
  image: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Cliente (placeholder)',
    role: 'Gestor de Manutenção — Indústria',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-1',
    quote:
      '“[Case real aqui] Depois da implantação, reduzimos paradas não planejadas e ganhamos rastreabilidade nas ordens de serviço.”',
  },
  {
    name: 'Cliente (placeholder)',
    role: 'Diretor Operacional — PME Industrial',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=male-1',
    quote: '“[Case real aqui] Saímos de planilhas para dashboards em tempo real e melhoramos a tomada de decisão.”',
  },
  {
    name: 'Cliente (placeholder)',
    role: 'Qualidade / Metrologia — Indústria',
    image: 'https://notion-avatars.netlify.app/api/avatar?preset=female-2',
    quote:
      '“[Case real aqui] Passamos a controlar calibrações e vencimentos com alertas automáticos, evitando não conformidades em auditorias.”',
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Resultados comprovados</Badge>
          <h2 className={cn(marketingSectionTitle, "mb-4")}>
            O que nossos clientes dizem
          </h2>
          <p className={marketingSectionLead}>
            Substitua estes placeholders por cases reais do setor industrial (com números e contexto quando possível).
          </p>
        </div>

        {/* Testimonials Masonry Grid */}
        <div className="columns-1 gap-4 md:columns-2 md:gap-6 lg:columns-3 lg:gap-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                'relative mb-6 break-inside-avoid overflow-hidden shadow-none lg:mb-4',
                index === 0 && 'ring-1 ring-primary/20'
              )}
            >
              {index === 0 ? (
                <BorderBeam size={220} duration={10} delay={2} borderWidth={2} colorFrom="#f97316" colorTo="#a855f7" />
              ) : null}
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="bg-muted size-12 shrink-0">
                    <AvatarImage
                      alt={testimonial.name}
                      src={testimonial.image}
                      loading="lazy"
                      width="120"
                      height="120"
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <a href="#" onClick={e => e.preventDefault()} className="cursor-pointer">
                      <h3 className="font-medium hover:text-primary transition-colors">{testimonial.name}</h3>
                    </a>
                    <span className="text-muted-foreground block text-sm tracking-wide">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                <blockquote className="mt-4">
                  <p className="text-sm leading-relaxed text-balance">{testimonial.quote}</p>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
        </SectionReveal>
      </div>
    </section>
  )
}
