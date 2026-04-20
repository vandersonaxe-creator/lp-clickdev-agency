"use client"

import Image from "next/image"
import * as React from "react"
import { motion } from "motion/react"
import { Factory, GitBranch, Wrench } from "lucide-react"

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
import { NumberTicker } from "@/components/ui/number-ticker"
import { cn } from "@/lib/utils"
import {
  marketingSectionPadding,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { Eyebrow } from "./eyebrow"

const EASE = [0.22, 1, 0.36, 1] as const

const profileImages = [
  {
    src: "/landing/vanderson-profile.png",
    alt: "Vanderson Machado em operação industrial com EPI.",
  },
  {
    src: "/landing/vanderson-1.png",
    alt: "Vanderson Machado em ambiente industrial.",
  },
  {
    src: "/landing/vanderson-2.png",
    alt: "Vanderson Machado em parque eólico.",
  },
] as const

const credentials = [
  {
    icon: Factory,
    title: "Operação antes de código",
    description:
      "Mais de 10 anos em chão de fábrica e parques eólicos — Siemens Gamesa, Vestas, Suzlon.",
  },
  {
    icon: Wrench,
    title: "Responsabilidade técnica real",
    description:
      "Coordenação de manutenção e qualidade industrial com execução em campo, não só em apresentação.",
  },
  {
    icon: GitBranch,
    title: "Transição sem ruptura",
    description:
      "Saída gradual das planilhas para um sistema próprio, sem travar o ritmo da operação.",
  },
] as const

const stats = [
  { value: 10, suffix: "+", label: "Anos em operação industrial" },
  { value: 54, suffix: "", label: "Ativos monitorados em campo" },
  { value: 3, suffix: "", label: "Fabricantes de turbina trabalhados" },
] as const

export function FounderSection() {
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
    <section
      id="autoridade"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[20%] h-[380px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,oklch(0.55_0.22_290/0.08),transparent_70%)]"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,oklch(0.6_0.2_290/0.18),transparent_60%)] blur-2xl"
            />
            <Card className="relative overflow-hidden border-border/70 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="bg-muted relative w-full overflow-hidden">
                  <Carousel
                    className="w-full"
                    setApi={setApi}
                    opts={{ loop: true }}
                  >
                    <CarouselContent>
                      {profileImages.map((img) => (
                        <CarouselItem key={img.src} className="p-0">
                          <div className="relative aspect-[4/5] w-full overflow-hidden text-foreground">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="z-0 object-cover object-[center_20%]"
                              sizes="(max-width: 1024px) 100vw, 480px"
                              priority={
                                img.src === "/landing/vanderson-profile.png"
                              }
                            />
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0"
                            />
                            <img
                              src="/assinatura_vanderson.svg"
                              alt="Assinatura Vanderson Machado"
                              className="pointer-events-none absolute bottom-8 left-1/2 z-10 w-48 max-w-[75%] -translate-x-1/2 opacity-90"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="top-[calc(100%+0.75rem)] left-0 translate-y-0" />
                    <CarouselNext className="top-[calc(100%+0.75rem)] left-2 translate-x-full translate-y-0" />
                  </Carousel>

                  <div className="flex items-center justify-end px-4 pt-14 pb-4">
                    <Progress className="h-1.5 w-24" value={progress} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="min-w-0"
          >
            <Eyebrow>Fundador · Click Dev</Eyebrow>
            <h2
              className={cn(marketingSectionTitle, "mt-5 text-balance")}
            >
              Engenheiro de operação antes de ser dev.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>
                Vanderson Machado. Técnico de eletrotécnica, especialista
                multi-fabricante em O&amp;M eólico (Siemens Gamesa, Vestas,
                Suzlon) e responsável técnico de manutenção e qualidade em
                parques industriais no Brasil.
              </p>
              <p>
                A Click Dev nasceu da mesma dor que o seu time vive todo dia:
                OS perdida, calibração vencendo, informação espalhada. Hoje
                traduzo essa experiência em sistema — código que entende
                manutenção, metrologia e execução em campo, não só interface
                bonita.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {credentials.map((c) => (
                <li
                  key={c.title}
                  className="rounded-xl border border-border/70 bg-card/50 p-4"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-300">
                    <c.icon className="h-4 w-4" aria-hidden />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-border/70 bg-card/40 p-5 sm:gap-6 sm:p-6">
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <p className="text-[28px] font-bold tracking-[-0.02em] text-foreground tabular-nums sm:text-[32px]">
                    <NumberTicker
                      value={s.value}
                      className="text-foreground dark:text-foreground"
                    />
                    {s.suffix}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
