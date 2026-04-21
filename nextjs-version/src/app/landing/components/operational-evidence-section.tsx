"use client"

import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  Filter,
  Gauge,
  LayoutGrid,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"

import { DemoAnimatedBorder } from "@/components/demo-animated-border"
import { Image3D } from "@/components/image-3d"
import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  marketingSectionLead,
  marketingSectionPadding,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { landingMedia } from "@/lib/landing-media"
import { CLICKDEV_WHATSAPP_HREF, DEMO_ROUTE } from "../landing-copy"
import { Eyebrow } from "./eyebrow"

const mainFeatures = [
  {
    icon: LayoutGrid,
    title: "Quadro por status",
    description:
      "Vencidos, vencendo e válidos no mesmo painel — prioridade visual imediata.",
  },
  {
    icon: AlertTriangle,
    title: "Ação antes da NC",
    description:
      "O que exige calendário ou retrabalho aparece primeiro, não no fim do mês.",
  },
  {
    icon: Gauge,
    title: "Leitura de gestor",
    description:
      "Resumo para decisão: menos tempo caçando dado, mais tempo corrigindo rota.",
  },
  {
    icon: ShieldCheck,
    title: "Pronto para auditoria",
    description:
      "Instrumentos classificados por criticidade e prazo — linguagem de quem vive ISO.",
  },
] as const

const secondaryFeatures = [
  {
    icon: Filter,
    title: "Filtros operacionais",
    description:
      "TAG, status, categoria e empresa calibradora — achou o instrumento em segundos.",
  },
  {
    icon: ClipboardList,
    title: "Linha do tempo técnica",
    description:
      "Última calibração, próxima data e atraso explícito — rastreio ponta a ponta.",
  },
  {
    icon: Calendar,
    title: "Planejamento de campo",
    description:
      "Base para PCM: o que vence em 7 ou 30 dias deixa de ser surpresa.",
  },
  {
    icon: FileSpreadsheet,
    title: "Export e decisão",
    description:
      "Base para relatório e auditoria — do planejamento à evidência em PDF.",
  },
] as const

/**
 * Header + dois blocos 50/50 com Image3D, grid de benefícios e CTAs.
 * Conteúdo Click Dev — prints de metrologia (Painel / Plano).
 */
export function OperationalEvidenceSection() {
  return (
    <section
      id="evidencia"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[8%] h-[420px] bg-[radial-gradient(ellipse_55%_45%_at_50%_35%,oklch(0.55_0.22_290/0.1),transparent_65%)]"
      />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Eyebrow align="center">Evidência operacional</Eyebrow>
          <h2
            className={cn(marketingSectionTitle, "mt-5 text-balance")}
          >
            Metrologia e PCM com a mesma seriedade do chão de fábrica
          </h2>
          <p className={cn(marketingSectionLead, "mt-4 text-balance")}>
            Do painel de urgência ao plano detalhado: instrumentos, prazos e
            calibradoras no mesmo sistema — sem planilha paralela e sem
            surpresa em auditoria.
          </p>
        </div>

        {/* First Feature Section */}
        <div className="mb-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <Image3D
            lightSrc={landingMedia.metrologyPainelLight}
            darkSrc={landingMedia.metrologyPainelDark}
            alt="Painel Metrológico — instrumentos por status"
            direction="left"
          />
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Urgência visível antes do vencimento estourar
              </h3>
              <p className="text-pretty text-base text-muted-foreground">
                O painel metrológico organiza instrumentos por criticidade e
                prazo. O gestor enxerga o que já passou do limite, o que vence
                em breve e o que está em conformidade — numa única leitura.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {mainFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-violet-500/25 hover:bg-violet-500/[0.06]"
                >
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <feature.icon
                      className="size-5 text-violet-400/90"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 pt-2 pe-4 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                className="btn-secondary-silver relative cursor-pointer overflow-visible"
                asChild
              >
                <a
                  href={DEMO_ROUTE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center"
                >
                  <DemoAnimatedBorder />
                  <span className="relative z-10 inline-flex items-center">
                    Abrir painel no sistema
                    <ArrowRight className="ms-2 size-4" aria-hidden="true" />
                  </span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer" asChild>
                <a
                  href={CLICKDEV_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar com a Click Dev
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Second Feature Section - Flipped Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="order-2 space-y-6 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Plano metrológico com rastreabilidade de verdade
              </h3>
              <p className="text-pretty text-base text-muted-foreground">
                Tabela densa com TAG, faixa, frequência e datas — o mesmo nível
                de controle que a operação exige quando a auditoria pede
                evidência, não print de slide.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {secondaryFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-violet-500/25 hover:bg-violet-500/[0.06]"
                >
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <feature.icon
                      className="size-5 text-violet-400/90"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 pt-2 pe-4 sm:flex-row">
              <a
                href={CLICKDEV_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "btn-primary-silver group relative inline-flex h-12 min-h-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl",
                  "px-7 text-base font-semibold",
                  "transition-transform duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.99]"
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
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  Agendar diagnóstico
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="relative cursor-pointer overflow-visible"
                asChild
              >
                <a
                  href={DEMO_ROUTE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center"
                >
                  <DemoAnimatedBorder />
                  <span className="relative z-10">Ver plano no dashboard</span>
                </a>
              </Button>
            </div>
          </div>

          <Image3D
            lightSrc={landingMedia.metrologyPlanoLight}
            darkSrc={landingMedia.metrologyPlanoDark}
            alt="Plano Metrológico — tabela com instrumentos e calibrações"
            direction="right"
            className="order-1 lg:order-2"
          />
        </div>
      </div>
    </section>
  )
}
