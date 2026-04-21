"use client"

import { motion } from "motion/react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  marketingSectionPadding,
  marketingSectionLead,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { fadeUp, inViewDefault, stagger } from "../motion-presets"
import { Eyebrow } from "./eyebrow"

const painItems = [
  "Manutenção vive em planilha compartilhada que ninguém atualiza.",
  "Ordem de serviço some no WhatsApp — sem evidência, sem fechamento.",
  "Calibração vence antes de alguém lembrar.",
  "Cada auditoria vira corrida contra o tempo.",
  "Quem sabe como a operação funciona está na cabeça de uma pessoa.",
  "Decisão é no feeling — não em dado.",
] as const

const gainItems = [
  "Painel único com o que está atrasado, o que vai vencer e o que precisa de ação.",
  "OS no celular do técnico: checklist, foto, assinatura e fechamento padrão.",
  "Alerta automático de calibração antes do vencimento.",
  "Histórico, relatórios e certificados prontos — sem retrabalho manual.",
  "Processo documentado no sistema — não na memória de um técnico.",
  "Rastreabilidade de execução e decisão com base em dado real.",
] as const

export function PainSection() {
  return (
    <section
      id="dores"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.55_0.22_290/0.08),transparent_70%)]"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow align="center">Onde a operação trava hoje</Eyebrow>
          <h2
            className={cn(
              marketingSectionTitle,
              "mt-5 text-center text-balance"
            )}
          >
            Se a operação ainda depende da memória de alguém, ela está
            travando silenciosamente.
          </h2>
          <p
            className={cn(
              marketingSectionLead,
              "mt-4 text-center text-balance"
            )}
          >
            Não é falta de competência do seu time. É falta de sistema real —
            feito para a realidade de quem está na linha de frente.
          </p>
        </div>

        <motion.div
          variants={stagger}
          {...inViewDefault}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-8 transition-colors hover:border-border"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,oklch(0.6_0.18_15/0.08),transparent_70%)]"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground">
                  <X className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Hoje
                </h3>
              </div>

              <ul className="mt-6 space-y-4">
                {painItems.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-1 w-4 shrink-0 rounded-full bg-border"
                    />
                    <span className="text-foreground/75">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-card/60 p-6 sm:p-8 transition-all hover:border-violet-400/50 hover:shadow-[0_20px_50px_-30px_oklch(0.55_0.22_290/0.4)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,oklch(0.6_0.22_290/0.15),transparent_70%)]"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-700 dark:text-violet-300">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-base font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
                  Depois da Click Dev
                </h3>
              </div>

              <ul className="mt-6 space-y-4">
                {gainItems.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-sm leading-relaxed sm:text-base"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-violet-400"
                      aria-hidden
                    />
                    <span className="text-foreground/95">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
