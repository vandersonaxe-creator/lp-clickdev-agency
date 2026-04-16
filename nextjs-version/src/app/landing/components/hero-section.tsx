"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Star } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DotPattern } from "@/components/dot-pattern"
import { BorderBeam } from "@/components/ui/border-beam"
import { RetroGrid } from "@/components/ui/retro-grid"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { cn } from "@/lib/utils"
import { marketingHeroLead, marketingHeroTitle } from "@/lib/marketing-typography"
import { CLICKDEV_WHATSAPP_HREF, DEMO_ROUTE } from "../landing-copy"

const heroStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 min-h-[420px]">
        <RetroGrid
          angle={65}
          cellSize={56}
          opacity={0.22}
          className="h-full w-full border-0 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
          lightLineColor="oklch(0.65 0 0 / 0.35)"
          darkLineColor="oklch(0.85 0 0 / 0.2)"
        />
      </div>

      <div className="absolute inset-0 z-[1]">
        <DotPattern className="opacity-50" size="md" fadeStyle="ellipse" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.div className="mb-6 flex justify-center sm:mb-8" variants={heroItem}>
            <Badge variant="outline" className="px-4 py-2 border-foreground">
              <Star className="mr-2 h-3 w-3 fill-current" />
              Digitalização industrial sob medida para PMEs
              <ArrowRight className="ml-2 h-3 w-3" />
            </Badge>
          </motion.div>

          <motion.h1
            className={cn(marketingHeroTitle, "mb-5 text-balance sm:mb-6")}
            variants={heroItem}
          >
            Transforme sua Indústria com Dados em Tempo Real:
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              Otimize Produção e Manutenção.
            </span>
          </motion.h1>

          <motion.div variants={heroItem}>
            <p
              className={cn(
                marketingHeroLead,
                "mx-auto mb-8 max-w-2xl text-balance sm:mb-10 hidden md:block"
              )}
            >
              Dashboards e sistemas sob medida para Pequenas e Médias Empresas. Elimine planilhas confusas,
              reduza custos operacionais e tenha o controle total da sua produção e manutenção com soluções
              inteligentes e intuitivas. Resultados comprovados: redução de até 30% em paradas não planejadas e
              aumento de 15% na eficiência operacional.
            </p>
            <p className={cn(marketingHeroLead, "mx-auto mb-8 max-w-2xl text-balance sm:mb-10 md:hidden")}>
              Sistemas e dashboards sob medida para PMEs. Menos paradas, mais controle e dados em tempo real na
              produção e na manutenção.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            variants={heroItem}
          >
            <ShimmerButton
              href={CLICKDEV_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-12 px-8 text-base font-semibold"
              background="#ea580c"
              shimmerColor="#fff7ed"
              borderRadius="0.75rem"
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                Agendar Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </span>
            </ShimmerButton>
            <Button size="lg" className="text-base cursor-pointer" variant="outline" asChild>
              <Link href={DEMO_ROUTE}>
                <Play className="mr-2 h-4 w-4" />
                Ver Demonstração do PCM Forge
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-6xl sm:mt-20"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: 0.35 }}
        >
          <div className="group relative">
            <div className="absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80" />

            <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
              <BorderBeam size={280} duration={14} delay={4} borderWidth={2} colorFrom="#f97316" colorTo="#7c3aed" />

              <Image
                src="/dashboard-light.png"
                alt="Pré-visualização do painel — modo claro"
                width={1200}
                height={800}
                className="block w-full rounded-xl object-cover dark:hidden"
                priority
              />

              <Image
                src="/dashboard-dark.png"
                alt="Pré-visualização do painel — modo escuro"
                width={1200}
                height={800}
                className="hidden w-full rounded-xl object-cover dark:block"
                priority
              />

              <div className="absolute bottom-0 left-0 h-32 w-full rounded-b-xl bg-gradient-to-b from-background/0 via-background/70 to-background md:h-40 lg:h-48" />

              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="h-16 w-16 cursor-pointer rounded-full p-0 transition-transform hover:scale-105"
                  asChild
                >
                  <Link href={DEMO_ROUTE} aria-label="Abrir demonstração do PCM Forge">
                    <Play className="h-6 w-6 fill-current" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
