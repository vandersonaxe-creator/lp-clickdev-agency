"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { marketingSectionLead, marketingSectionTitle } from '@/lib/marketing-typography'
import { SectionReveal } from './section-reveal'

type Testimonial = {
  name: string
  role: string
  image: string
  quote: string
  approved?: boolean
}

const testimonials: Testimonial[] = [
  {
    name: "Wilton Cardoso",
    role: "Gerente de Operações",
    image: "/landing/wiltontestemunha.svg",
    quote:
      "A digitalização precisa falar a língua de quem está na operação. Com a Click Dev, conseguimos organizar informações, reduzir retrabalho e ganhar clareza para decidir com dados – sem perder o ritmo do chão de fábrica.",
    approved: true,
  },
  {
    name: "Anne Braga",
    role: "Gerente de Qualidade Industrial",
    image: "/images/testimonials/anne-braga.png",
    quote:
      "A Click Dev mudou completamente nossa rotina de qualidade. Os alertas automáticos de calibração e o histórico digital acabaram com a correria antes das auditorias. Tudo fica rastreável em um clique — ganhamos tempo, reduzimos não-conformidades e ainda passamos mais credibilidade para os clientes.",
    approved: true,
  },
  {
    name: "Luiz Paulo C. Cardoso",
    role: "Gerente de Manutenção Industrial",
    image: "/images/testimonials/luiz-paulo.png",
    quote:
      "Saímos das planilhas e ganhamos um painel único que mostra preventivas, corretivas e o status de todos os ativos em tempo real. Conseguimos reduzir paradas não planejadas e a equipe agora cobra execução com prioridade e rastreabilidade. É o tipo de ferramenta que quem está no chão de fábrica realmente sente a diferença.",
    approved: true,
  },
]

export function TestimonialsSection() {
  const visibleTestimonials = testimonials.filter((t) => t.approved !== false)

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
            Prova social para quem precisa de menos improviso e mais controle na operação.
          </p>
        </div>

        {/* Testimonials Masonry Grid */}
        <div className="columns-1 gap-4 md:columns-2 md:gap-6 lg:columns-3 lg:gap-4">
          {visibleTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn('relative mb-6 break-inside-avoid overflow-hidden shadow-none lg:mb-4')}
            >
              <CardContent className="p-6">
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
                    <h3 className="font-medium text-foreground">{testimonial.name}</h3>
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
