"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle, Play } from "lucide-react"
import { motion } from "motion/react"

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
import { Eyebrow } from "./eyebrow"

const EASE = [0.22, 1, 0.36, 1] as const

export function CTASection() {
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
            size={340}
            duration={18}
            delay={1}
            borderWidth={1.5}
            colorFrom="#a78bfa"
            colorTo="#6366f1"
          />

          <DotPattern className="opacity-30" size="md" fadeStyle="ellipse" />

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
                className="btn-secondary-silver h-12 cursor-pointer text-base"
                asChild
              >
                <Link href={DEMO_ROUTE}>
                  <Play className="mr-2 h-4 w-4" aria-hidden />
                  Explorar dashboard
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Prefere e-mail?{" "}
              <a
                href={CLICKDEV_EMAIL_HREF}
                className="font-medium text-foreground underline-offset-4 transition-colors hover:text-violet-300 hover:underline"
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
