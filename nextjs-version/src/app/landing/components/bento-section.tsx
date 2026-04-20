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

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { cn } from "@/lib/utils"
import { marketingSectionLead, marketingSectionTitle } from "@/lib/marketing-typography"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function ScreenshotCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <MagicCard
      className="relative h-full overflow-hidden rounded-2xl border border-border/60 shadow-xs"
      gradientFrom="#f97316"
      gradientTo="#a855f7"
      gradientColor="#f97316"
      gradientOpacity={0.32}
    >
      <BorderBeam size={260} duration={14} delay={2} borderWidth={2} colorFrom="#f97316" colorTo="#a855f7" />
      <div className="relative flex h-full flex-col">
        <div className="p-6 sm:p-7">
          <h3 className="text-lg font-semibold tracking-tight text-balance">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{description}</p>
          <div className="mt-4">
            <Button asChild size="sm" className="cursor-pointer">
              <Link href={href}>Ver no demo</Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-auto overflow-hidden border-t border-border/50 bg-muted/30">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-[80%] -translate-x-1/2 rounded-full bg-primary/35 blur-3xl" />
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/dashboard-light.png"
              alt="Pré-visualização do sistema — modo claro"
              fill
              className="object-cover dark:hidden"
              sizes="(max-width: 1024px) 100vw, 700px"
              priority={false}
            />
            <Image
              src="/dashboard-dark.png"
              alt="Pré-visualização do sistema — modo escuro"
              fill
              className="hidden object-cover dark:block"
              sizes="(max-width: 1024px) 100vw, 700px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </MagicCard>
  )
}

function MiniCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  title: string
  description: string
}) {
  return (
    <MagicCard
      className="h-full rounded-2xl border border-border/60 shadow-xs"
      gradientFrom="#0ea5e9"
      gradientTo="#22c55e"
      gradientColor="#0ea5e9"
      gradientOpacity={0.2}
    >
      <div className="p-6 sm:p-7">
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" aria-hidden />
        </div>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{description}</p>
      </div>
    </MagicCard>
  )
}

export function BentoSection({ className }: { className?: string }) {
  return (
    <section id="bento" className={cn("py-12 sm:py-16 lg:py-20", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <Badge variant="outline" className="mb-4">
            Em 30 dias
          </Badge>
          <h2 className={cn(marketingSectionTitle, "text-balance")}>
            Controle para o gestor. Execução simples para o técnico.
          </h2>
          <p className={cn(marketingSectionLead, "mt-3 text-balance")}>
            O básico bem feito — com rastreabilidade, alertas e relatórios prontos para decisão.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-12"
        >
          <motion.div variants={item} className="md:col-span-7">
            <ScreenshotCard
              title="Visão do gestor (sem improviso)"
              description="Atrasos, vencimentos e prioridades em uma tela. O que está atrasado, o que vai vencer e onde sua equipe precisa atuar hoje."
              href="/dashboard"
            />
          </motion.div>

          <motion.div variants={item} className="md:col-span-5">
            <MagicCard
              className="h-full rounded-2xl border border-border/60 shadow-xs"
              gradientFrom="#6366f1"
              gradientTo="#f97316"
              gradientColor="#6366f1"
              gradientOpacity={0.25}
            >
              <div className="flex h-full flex-col p-6 sm:p-7">
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3">
                  <ClipboardCheck className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-balance">OS no celular do técnico</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
                  Checklist com foto, assinatura, observação e fechamento padronizado. Adeus “fiz e esqueci”.
                </p>
                <div className="mt-5">
                  <Button asChild variant="outline" className="w-full cursor-pointer">
                    <Link href="/work-orders">Ver Ordens de Serviço</Link>
                  </Button>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <FileDown className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                    <span>Relatório PDF automático com evidências</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BellRing className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                    <span>Alertas antes do vencimento (preventivas e calibrações)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <QrCode className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                    <span>QR Code para acessar certificados e histórico</span>
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>

          <motion.div variants={item} className="md:col-span-4">
            <MiniCard
              icon={BellRing}
              title="Alertas inteligentes"
              description="Nada vence “no susto”. Notificações e visão do que vai vencer antes do problema estourar."
            />
          </motion.div>
          <motion.div variants={item} className="md:col-span-4">
            <MiniCard
              icon={FileDown}
              title="PDF automático"
              description="Relatórios padronizados e compartilháveis. O gestor recebe pronto — sem retrabalho manual."
            />
          </motion.div>
          <motion.div variants={item} className="md:col-span-4">
            <MiniCard
              icon={UserCog}
              title="Permissões e histórico"
              description="Cada pessoa vê o que precisa. Auditoria e rastreabilidade para manter padrão de execução."
            />
          </motion.div>

          <motion.div variants={item} className="md:col-span-6">
            <MiniCard
              icon={QrCode}
              title="Certificados por QR Code"
              description="Instrumento na mão, histórico na tela. Certificados em PDF acessíveis em segundos."
            />
          </motion.div>
          <motion.div variants={item} className="md:col-span-6">
            <MiniCard
              icon={ShieldCheck}
              title="Confiabilidade e conformidade"
              description="Dados organizados, responsabilidades claras e tudo documentado — do técnico ao gestor."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

