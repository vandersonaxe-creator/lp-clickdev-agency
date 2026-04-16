"use client"

import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function AboutMeSection() {
  return (
    <section id="quem-sou-eu" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              Quem sou eu
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vanderson Machado: Da Turbina Eólica à Digitalização Industrial.
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/landing/vanderson-profile.png"
                    alt="Vanderson Machado no Complexo Eólico Calangos, com capacete e equipamentos de segurança."
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-5">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

