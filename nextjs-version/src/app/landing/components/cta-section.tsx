"use client"

import { ArrowRight, MessageCircle, Play } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/dot-pattern"
import { cn } from "@/lib/utils"
import {
  marketingCtaTitle,
  marketingSectionLead,
  marketingSectionPadding,
} from "@/lib/marketing-typography"
import {
  CLICKDEV_EMAIL,
  CLICKDEV_EMAIL_HREF,
  CLICKDEV_WHATSAPP_HREF,
  DEMO_ROUTE,
} from "../landing-copy"
import { EASE } from "../motion-presets"
import { Eyebrow } from "./eyebrow"
import { MouseSpotlight } from "./mouse-spotlight"

export function CTASection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contato"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={cn(
            "relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/70",
            "bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.55_0.22_290/0.2),transparent_60%),linear-gradient(to_bottom,var(--card),var(--background))]",
            "px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24"
          )}
        >
          <BorderBeam
            size={380}
            duration={26}
            delay={0}
            borderWidth={1.2}
            colorFrom="#a78bfa"
            colorTo="#6366f1"
          />

          {!reduced && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_10%,oklch(0.6_0.2_290/0.28),transparent_60%)]"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          )}

          <DotPattern className="opacity-25" size="md" fadeStyle="ellipse" />

          <MouseSpotlight
            size={720}
            opacity={0.16}
            zIndex={0}
            className="absolute inset-0"
          />

          <div className="relative">
            <Eyebrow align="center">Diagnóstico gratuito</Eyebrow>

            <h2
              className={cn(
                marketingCtaTitle,
                "mx-auto mt-6 max-w-3xl text-balance"
              )}
            >
              Antes de qualquer proposta,{" "}
              <span className="text-muted-foreground">
                vamos olhar seu processo.
              </span>
            </h2>

            <p
              className={cn(
                marketingSectionLead,
                "mx-auto mt-6 max-w-2xl text-balance"
              )}
            >
              30–40 minutos de conversa no WhatsApp para entender onde a
              operação trava hoje e o que faz sentido digitalizar primeiro.
              Sem compromisso e sem discurso de venda.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CLICKDEV_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "btn-primary-silver group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl",
                  "px-7 text-base font-semibold",
                  "transition-transform duration-300 hover:-translate-y-0.5"
                )}
              >
                <BorderBeam
                  size={90}
                  duration={14}
                  colorFrom="#f8fafc"
                  colorTo="#cbd5e1"
                  borderWidth={2}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[opacity,transform] duration-700 group-hover:translate-x-full group-hover:opacity-100"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Falar no WhatsApp
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </a>

              <Button
                size="lg"
                variant="outline"
                className="btn-secondary-silver relative h-12 cursor-pointer overflow-visible text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
                asChild
              >
                <a
                  href={DEMO_ROUTE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center"
                >
                  <span className="relative z-10 inline-flex items-center">
                    <Play className="mr-2 h-4 w-4" aria-hidden />
                    Explorar dashboard
                  </span>
                </a>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Prefere e-mail?{" "}
              <a
                href={CLICKDEV_EMAIL_HREF}
                className="font-medium text-foreground underline-offset-4 transition-colors hover:text-violet-700 dark:hover:text-violet-300 hover:underline"
              >
                {CLICKDEV_EMAIL}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
