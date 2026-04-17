"use client"

import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { HyperspaceBackground } from "@/components/ui/hyperspace-background"
import { RotatingWords } from "@/components/ui/rotating-words"
import { cn } from "@/lib/utils"
import { marketingHeroLead, marketingHeroTitle } from "@/lib/marketing-typography"
import { CLICKDEV_WHATSAPP_HREF } from "../landing-copy"

const DASHBOARD_DEMO_URL = "https://www.clickdev.com.br/dashboard"

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
      className="relative overflow-hidden bg-background pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 min-h-[100%]">
        <HyperspaceBackground
          starTrailOpacity={0.52}
          starSpeed={1.01}
          starSize={0.45}
          starColor="#ffffff"
          className="[mask-image:linear-gradient(to_bottom,black_55%,black_85%,transparent_100%)]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/88 via-background/55 to-background/95 dark:from-background/75 dark:via-background/45 dark:to-background/95"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.div className="mb-6 flex justify-center sm:mb-8" variants={heroItem} />

          <motion.h1
            className={cn(
              marketingHeroTitle,
              "mb-5 text-balance sm:mb-6",
              "text-[34px] leading-tight sm:text-[56px] sm:leading-[1.1] lg:text-[72px] lg:leading-[1.1]"
            )}
            variants={heroItem}
          >
            Digitalização Industrial Sob Medida:
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              Menos paradas, mais{" "}
              <RotatingWords
                words={[
                  "controle",
                  "produção",
                  "eficiência",
                  "economia",
                ]}
                underline={false}
                className="mx-1"
                wordClassName="font-bold text-white"
              />
              .
            </span>
          </motion.h1>

          <motion.div variants={heroItem}>
            <p className={cn(marketingHeroLead, "mx-auto mb-8 max-w-2xl text-balance sm:mb-10")}>
              Sistemas e dashboards sob medida para PMEs. Menos paradas, mais controle e dados em tempo real na
              produção e na manutenção.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            variants={heroItem}
          >
            <a
              href={CLICKDEV_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "btn-primary-silver group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl",
                "px-8 text-base font-semibold"
              )}
            >
              <BorderBeam
                size={88}
                duration={14}
                colorFrom="#f8fafc"
                colorTo="#cbd5e1"
                borderWidth={2}
              />
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                Agendar Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </span>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary-silver text-base cursor-pointer"
              asChild
            >
              <a href={DASHBOARD_DEMO_URL} target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 h-4 w-4" />
                Ver Demonstração
              </a>
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
                className="block w-full rounded-xl object-contain md:object-cover max-h-[320px] sm:max-h-[420px] md:max-h-none dark:hidden"
                priority
              />

              <Image
                src="/dashboard-dark.png"
                alt="Pré-visualização do painel — modo escuro"
                width={1200}
                height={800}
                className="hidden w-full rounded-xl object-contain md:object-cover max-h-[320px] sm:max-h-[420px] md:max-h-none dark:block"
                priority
              />

              <div className="absolute bottom-0 left-0 h-32 w-full rounded-b-xl bg-gradient-to-b from-background/0 via-background/70 to-background md:h-40 lg:h-48" />

              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="h-16 w-16 cursor-pointer rounded-full p-0 transition-transform hover:scale-105"
                  asChild
                >
                  <a
                    href={DASHBOARD_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir dashboard demonstrativo"
                  >
                    <Play className="h-6 w-6 fill-current" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
