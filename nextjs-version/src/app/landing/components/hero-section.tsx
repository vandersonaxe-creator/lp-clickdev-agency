"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, LineChart, Play } from "lucide-react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"

import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { HyperspaceBackground } from "@/components/ui/hyperspace-background"
import { cn } from "@/lib/utils"
import { marketingHeroLead } from "@/lib/marketing-typography"
import { landingMedia } from "@/lib/landing-media"
import { CLICKDEV_WHATSAPP_HREF, DASHBOARD_TOUR_ROUTE } from "../landing-copy"
import { EASE, fadeUp, stagger } from "../motion-presets"
import { Eyebrow } from "./eyebrow"

const proofBullets = [
  "10+ anos em operação industrial",
  "PCM, metrologia e manutenção",
  "Sob medida — sem pacote genérico",
] as const

export function HeroSection() {
  const reduced = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"])
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.98])
  const chip1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"])
  const chip2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden bg-background pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={reduced ? undefined : { y: bgY }}
      >
        <HyperspaceBackground
          starTrailOpacity={0.38}
          starSpeed={0.9}
          starSize={0.4}
          starColor="#ffffff"
          className="[mask-image:linear-gradient(to_bottom,black_45%,black_78%,transparent_100%)]"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/70 via-background/35 to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.22_290/0.18),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="text-left"
            style={reduced ? undefined : { y: textY }}
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>Sistemas sob medida · PCM · Metrologia</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
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
              variants={fadeUp}
              className={cn(
                marketingHeroLead,
                "mt-6 max-w-xl text-balance"
              )}
            >
              Construo sistemas web sob medida para indústrias que ainda rodam
              em planilha, papel e memória. Manutenção, metrologia, ativos e
              PCM no mesmo painel — com rastreabilidade de verdade.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/diagnostico"
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
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="btn-secondary-silver relative h-12 cursor-pointer overflow-visible text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
                asChild
              >
                <Link
                  href={DASHBOARD_TOUR_ROUTE}
                  className="relative inline-flex items-center justify-center"
                >
                  <span className="relative z-10 inline-flex items-center">
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                    Ver demo
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
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
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-[820px] lg:max-w-none lg:-mr-10 xl:-mr-20 2xl:-mr-32"
            style={
              reduced ? undefined : { y: mockupY, scale: mockupScale }
            }
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-32 rounded-[4rem] bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,oklch(0.9_0.12_290/0.32),oklch(0.62_0.24_290/0.22)_42%,transparent_72%)] blur-[80px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-12 rounded-[3rem] bg-[radial-gradient(ellipse_60%_55%_at_50%_55%,oklch(0.65_0.22_290/0.4),transparent_70%)] blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-14 left-1/2 h-24 w-[75%] -translate-x-1/2 rounded-[100%] bg-[oklch(0.82_0.12_290/0.35)] blur-3xl dark:bg-[oklch(0.85_0.15_290/0.3)]"
            />

            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-background",
                "shadow-[0_50px_100px_-20px_rgba(0,0,0,0.45),0_30px_60px_-15px_oklch(0.62_0.22_290/0.55),0_0_60px_-10px_oklch(0.75_0.18_290/0.35),0_0_0_1px_rgba(255,255,255,0.05)_inset]",
                "dark:shadow-[0_60px_140px_-20px_rgba(0,0,0,0.85),0_40px_80px_-15px_oklch(0.62_0.22_290/0.6),0_0_80px_-10px_oklch(0.8_0.15_290/0.4),0_0_0_1px_rgba(255,255,255,0.07)_inset]"
              )}
            >
              <BorderBeam
                size={300}
                duration={20}
                delay={3}
                borderWidth={1.5}
                colorFrom="#a78bfa"
                colorTo="#6366f1"
              />

              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              <Image
                src={landingMedia.heroDark}
                alt="Click Dev — Ordens de Serviço com prioridades, responsáveis e status"
                width={1600}
                height={1000}
                className="relative block w-full"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              style={reduced ? undefined : { y: chip1Y }}
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
              style={reduced ? undefined : { y: chip2Y }}
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
