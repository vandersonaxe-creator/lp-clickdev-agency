"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import {
  BellRing,
  ClipboardCheck,
  FileDown,
  QrCode,
  ShieldCheck,
  UserCog,
} from "lucide-react"

import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/ui/magic-card"
import { DotPattern } from "@/components/dot-pattern"
import { cn } from "@/lib/utils"
import { landingMedia } from "@/lib/landing-media"
import {
  marketingSectionLead,
  marketingSectionPadding,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { fadeUp, stagger } from "../motion-presets"
import { Eyebrow } from "./eyebrow"

/** Paleta violet unificada — uma cor só em toda a bento. */
const VIOLET = {
  from: "#a78bfa",
  to: "#6366f1",
  mid: "#8b5cf6",
} as const

/**
 * Hover premium: borda responde, sombra violet aprofunda,
 * micro translate-y. Timing consistente em todos os cards.
 */
const bentoHover =
  "transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-30px_oklch(0.55_0.22_290/0.35)]"

const cardFrame =
  "group relative h-full overflow-hidden rounded-2xl border border-border/70 hover:border-violet-500/40"

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow align="center">Produto real, não promessa</Eyebrow>
      <h2
        className={cn(marketingSectionTitle, "mt-5 text-balance")}
      >
        Controle para o gestor. Execução simples para o técnico.
      </h2>
      <p className={cn(marketingSectionLead, "mt-4 text-balance")}>
        O básico bem feito — com rastreabilidade, alertas e relatórios prontos
        para decisão.
      </p>
    </div>
  )
}

export function BentoSection({ className }: { className?: string }) {
  return (
    <section
      id="produto"
      className={cn(
        "relative overflow-hidden",
        marketingSectionPadding,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(0.55_0.22_290/0.1),transparent_55%)]"
      />
      <DotPattern className="opacity-25" size="md" fadeStyle="circle" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:mt-14 md:grid-cols-12 md:gap-6"
        >
          <motion.div
            variants={fadeUp}
            className={cn("md:col-span-8", bentoHover)}
          >
            <MagicCard
              className={cardFrame}
              gradientFrom={VIOLET.from}
              gradientTo={VIOLET.to}
              gradientColor={VIOLET.mid}
              gradientOpacity={0.22}
            >
              <BorderBeam
                size={260}
                duration={16}
                delay={2}
                borderWidth={1.5}
                colorFrom={VIOLET.from}
                colorTo={VIOLET.to}
              />
              <div className="relative flex h-full flex-col">
                <div className="p-6 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">
                    Visão do gestor
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                    Atrasos, vencimentos e prioridades em uma tela só.
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
                    O que está atrasado, o que vai vencer e onde sua equipe
                    precisa atuar hoje. Sem abrir planilha, sem cobrar técnico
                    por status.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="btn-tertiary-silver mt-5 cursor-pointer"
                  >
                    <Link href="/dashboard">Explorar dashboard</Link>
                  </Button>
                </div>

                <div className="relative mt-auto overflow-hidden border-t border-border/60 bg-muted/20">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl"
                  />
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={landingMedia.bentoGestorLight}
                      alt="Painel do gestor — modo claro"
                      fill
                      className="object-cover object-top dark:hidden"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                    <Image
                      src={landingMedia.bentoGestorDark}
                      alt="Painel do gestor — modo escuro"
                      fill
                      className="hidden object-cover object-top dark:block"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={cn("md:col-span-4", bentoHover)}
          >
            <MagicCard
              className={cardFrame}
              gradientFrom={VIOLET.from}
              gradientTo={VIOLET.to}
              gradientColor={VIOLET.mid}
              gradientOpacity={0.2}
            >
              <div className="flex h-full flex-col p-6 sm:p-8">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
                  <ClipboardCheck className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">
                  Execução do técnico
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-balance">
                  OS no celular, com evidência e fechamento padrão.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Checklist, foto, assinatura e observação. Acaba o “fiz e
                  esqueci”.
                </p>

                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <FileDown
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400/90"
                      aria-hidden
                    />
                    <span>Relatório PDF automático com evidências</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BellRing
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400/90"
                      aria-hidden
                    />
                    <span>Alerta antes do vencimento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <QrCode
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400/90"
                      aria-hidden
                    />
                    <span>QR Code para histórico e certificado</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="btn-tertiary-silver w-full cursor-pointer"
                  >
                    <Link href="/work-orders">Ver Ordens de Serviço</Link>
                  </Button>
                </div>
              </div>
            </MagicCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={cn("md:col-span-5", bentoHover)}
          >
            <MagicCard
              className={cardFrame}
              gradientFrom={VIOLET.from}
              gradientTo={VIOLET.to}
              gradientColor={VIOLET.mid}
              gradientOpacity={0.18}
            >
              <div className="p-6 sm:p-8">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
                  <BellRing className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-balance">
                  Alertas antes do problema estourar
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Calibração a vencer, preventiva atrasada, OS parada sem fechamento.
                  O sistema avisa antes — por e-mail, push ou WhatsApp.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "a vencer em 7d", value: "12" },
                    { label: "a vencer em 30d", value: "37" },
                    { label: "em dia", value: "94%" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg border border-border/60 bg-background/40 p-3"
                    >
                      <p className="text-lg font-semibold tabular-nums text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MagicCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={cn("md:col-span-7", bentoHover)}
          >
            <MagicCard
              className={cardFrame}
              gradientFrom={VIOLET.from}
              gradientTo={VIOLET.to}
              gradientColor={VIOLET.mid}
              gradientOpacity={0.18}
            >
              <div className="grid h-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
                    <QrCode className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-balance">
                    Evidências, certificados e histórico por QR
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    Instrumento na mão, histórico na tela. Certificado em PDF,
                    última calibração, responsável e próxima data — em segundos.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-3">
                  <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
                    <UserCog
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400/90"
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Permissões por papel
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cada pessoa vê o que precisa — e nada além disso.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-violet-400/90"
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        LGPD e auditoria
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Log de ações, responsabilidade clara, conformidade real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
