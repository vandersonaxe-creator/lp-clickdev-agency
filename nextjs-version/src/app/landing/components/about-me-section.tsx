"use client"

import Image from "next/image"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { marketingSectionTitle } from "@/lib/marketing-typography"
import { SectionReveal } from "./section-reveal"

const profileImages = [
  {
    src: "/landing/vanderson-profile.png",
    alt: "Vanderson Machado com equipamentos de segurança em campo.",
  },
  {
    src: "/landing/vanderson-1.png",
    alt: "Vanderson Machado em ambiente industrial.",
  },
  {
    src: "/landing/vanderson-2.png",
    alt: "Vanderson Machado em parque eólico, com capacete e EPI.",
  },
] as const

export function AboutMeSection() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const progress = count ? (current * 100) / count : 0

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section id="quem-sou-eu" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              Quem sou eu
            </Badge>
            <h2 className={cn(marketingSectionTitle, "text-balance")}>
              Vanderson Machado: Da Turbina Eólica à Digitalização Industrial.
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <SectionReveal className="min-w-0">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted relative w-full overflow-hidden">
                    <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
                      <CarouselContent>
                        {profileImages.map((img) => (
                          <CarouselItem key={img.src} className="p-0">
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover object-[center_20%]"
                                sizes="(max-width: 1024px) 100vw, 420px"
                                priority={img.src === "/landing/vanderson-profile.png"}
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <CarouselPrevious className="top-[calc(100%+0.75rem)] left-0 translate-y-0" />
                      <CarouselNext className="top-[calc(100%+0.75rem)] left-2 translate-x-full translate-y-0" />
                    </Carousel>

                    <div className="flex items-center justify-end px-4 pb-4 pt-14">
                      <Progress className="h-1.5 w-24" value={progress} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal className="min-w-0 space-y-5" delay={0.12}>
              <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                Minha jornada começou há mais de uma década no coração da indústria, no chão de fábrica e no topo
                de turbinas eólicas. Como montador de estruturas metálicas e, posteriormente, técnico especialista
                multi-fabricante (Siemens Gamesa, Vestas, Suzlon), vivenciei de perto os desafios operacionais:
                ordens de serviço perdidas, calibrações vencidas e a fragmentação de informações cruciais. Essa
                experiência me levou a assumir a responsabilidade técnica completa de manutenção e qualidade na
                Serena Energia, onde coordenei equipes e planejei a manutenção de parques eólicos inteiros no
                Brasil e na Costa Rica.
              </p>

              <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                Em 2023, fundei a Click Dev com a missão de transformar essas dores em soluções digitais eficazes.
                Minha paixão é aplicar tecnologia moderna para criar sistemas sob medida que resolvem problemas
                reais, otimizam processos e impulsionam a produtividade de pequenas e médias indústrias. Na Click
                Dev, não entregamos apenas software; entregamos a expertise de quem entende o seu negócio,
                construindo o futuro da sua operação com inteligência e inovação. Nossa experiência garante que
                cada solução seja prática, eficiente e alinhada às necessidades reais do ambiente industrial, com
                foco em resultados e retorno sobre o investimento.
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

