"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, LineChart, Play } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { HyperspaceBackground } from "@/components/ui/hyperspace-background"
import { cn } from "@/lib/utils"
import { marketingHeroLead } from "@/lib/marketing-typography"
import { landingMedia } from "@/lib/landing-media"
import { CLICKDEV_WHATSAPP_HREF, DEMO_ROUTE } from "../landing-copy"
import { Eyebrow } from "./eyebrow"

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

const proofBullets = [
  "10+ anos em operação industrial",
  "PCM, metrologia e manutenção",
  "Sob medida — sem pacote genérico",
] as const

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HyperspaceBackground
          starTrailOpacity={0.42}
          starSpeed={0.9}
          starSize={0.4}
          starColor="#ffffff"
          className="[mask-image:linear-gradient(to_bottom,black_45%,black_78%,transparent_100%)]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/85 via-background/55 to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.22_290/0.18),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="text-left">
            <motion.div variants={item}>
              <Eyebrow>Sistemas sob medida · PCM · Metrologia</Eyebrow>
            </motion.div>

            <motion.h1
              variants={item}
              className={cn(
                "mt-6 text-balance font-bold tracking-[-0.035em]",
                "text-[36px] leading-[1.05] sm:text-[52px] lg:text-[64px] lg:leading-[1.02]"
              )}
            >
              Sua operação não precisa de{" "}
              <span className="relative inline-block text-foreground">
                mais planilha.
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-violet-500/0 via-violet-400 to-violet-500/0"
                />
              </span>{" "}
              <span className="text-muted-foreground">
                Precisa de sistema.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className={cn(
                marketingHeroLead,
                "mt-6 max-w-xl text-balance"
              )}
            >
              Construo sistemas web sob medida para indústrias que ainda rodam em
              planilha, papel e memória. Manutenção, metrologia, ativos e PCM no
              mesmo painel — com rastreabilidade de verdade.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={CLICKDEV_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "btn-primary-silver group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl",
                  "px-7 text-base font-semibold"
                )}
              >
                <BorderBeam
                  size={90}
                  duration={14}
                  colorFrom="#f8fafc"
                  colorTo="#cbd5e1"
                  borderWidth={2}
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Diagnosticar meu processo
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="btn-secondary-silver h-12 cursor-pointer text-base"
                asChild
              >
                <Link href={DEMO_ROUTE}>
                  <Play className="mr-2 h-4 w-4" aria-hidden />
                  Ver demo real
                </Link>
              </Button>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              {proofBullets.map((text) => (
                <li key={text} className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-violet-400"
                    aria-hidden
                  />
                  <span className="text-foreground/85">{text}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            variants={item}
            className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,oklch(0.6_0.2_290/0.25),transparent_65%)] blur-2xl"
            />

            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <BorderBeam
                size={260}
                duration={16}
                delay={3}
                borderWidth={1.5}
                colorFrom="#a78bfa"
                colorTo="#6366f1"
              />

              <Image
                src={landingMedia.heroLight}
                alt="Dashboard Click Dev — painel de manutenção e metrologia"
                width={1400}
                height={900}
                className="block w-full object-cover dark:hidden"
                priority
              />
              <Image
                src={landingMedia.heroDark}
                alt="Dashboard Click Dev — painel de manutenção e metrologia"
                width={1400}
                height={900}
                className="hidden w-full object-cover dark:block"
                priority
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background/95"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              className={cn(
                "absolute -left-4 bottom-6 hidden sm:flex",
                "items-center gap-3 rounded-xl border border-border/70 bg-background/80 px-4 py-3",
                "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md"
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <LineChart className="h-4 w-4" aria-hidden />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Paradas não programadas
                </p>
                <p className="text-sm font-semibold text-foreground">
                  −38% após migração
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
              className={cn(
                "absolute -right-3 top-6 hidden md:flex",
                "items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5",
                "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-foreground">
                54 ativos monitorados em tempo real
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
