"use client"

import { motion } from "motion/react"
import { Quote } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BorderBeam } from "@/components/ui/border-beam"
import { cn } from "@/lib/utils"
import {
  marketingSectionPadding,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { Eyebrow } from "./eyebrow"

const EASE = [0.22, 1, 0.36, 1] as const

type Testimonial = {
  name: string
  role: string
  image: string
  quote: string
  initials: string
}

const featured: Testimonial = {
  name: "Luiz Paulo C. Cardoso",
  role: "Gerente de Manutenção Industrial",
  image: "/images/testimonials/luiz-paulo.png",
  quote:
    "Saímos das planilhas e passamos a enxergar preventivas, corretivas e status de ativos no mesmo painel. Reduzimos paradas não planejadas e a equipe passou a cobrar execução com prioridade e rastreabilidade. É o tipo de ferramenta que quem está no chão de fábrica sente a diferença.",
  initials: "LP",
}

const support: Testimonial[] = [
  {
    name: "Anne Braga",
    role: "Gerente de Qualidade Industrial",
    image: "/images/testimonials/anne-braga.png",
    quote:
      "Alertas automáticos de calibração e histórico digital acabaram com a correria antes das auditorias. Tudo fica rastreável em um clique — ganhamos tempo, reduzimos não-conformidades e passamos mais credibilidade.",
    initials: "AB",
  },
  {
    name: "Wilton Cardoso",
    role: "Gerente de Operações",
    image: "/landing/wiltontestemunha.svg",
    quote:
      "Digitalização precisa falar a língua de quem está na operação. Com a Click Dev organizamos informação, reduzimos retrabalho e ganhamos clareza para decidir com dado — sem perder o ritmo do chão de fábrica.",
    initials: "WC",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.22_290/0.08),transparent_70%)]"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow align="center">O que muda na operação</Eyebrow>
          <h2
            className={cn(marketingSectionTitle, "mt-5 text-balance")}
          >
            Gestores industriais que saíram da planilha e não voltaram.
          </h2>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-8 sm:p-10 lg:p-14">
            <BorderBeam
              size={300}
              duration={18}
              delay={2}
              borderWidth={1.5}
              colorFrom="#a78bfa"
              colorTo="#6366f1"
            />

            <Quote
              className="absolute right-8 top-8 h-16 w-16 text-violet-500/15 sm:h-20 sm:w-20"
              aria-hidden
            />

            <blockquote className="relative">
              <p className="text-pretty text-xl font-medium leading-[1.4] tracking-[-0.01em] text-foreground sm:text-2xl lg:text-[28px] lg:leading-[1.35]">
                “{featured.quote}”
              </p>
            </blockquote>

            <footer className="relative mt-10 flex items-center gap-4">
              <Avatar className="size-14 border border-border/70">
                <AvatarImage
                  src={featured.image}
                  alt={featured.name}
                  loading="lazy"
                />
                <AvatarFallback>{featured.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-semibold text-foreground">
                  {featured.name}
                </p>
                <p className="text-sm text-muted-foreground">{featured.role}</p>
              </div>
            </footer>
          </div>
        </motion.article>

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {support.map((t, index) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: 0.08 + index * 0.06,
              }}
              className="flex flex-col rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-7"
            >
              <blockquote className="flex-1">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty sm:text-base">
                  “{t.quote}”
                </p>
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <Avatar className="size-10 border border-border/70">
                  <AvatarImage src={t.image} alt={t.name} loading="lazy" />
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
