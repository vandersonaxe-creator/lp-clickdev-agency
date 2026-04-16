"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DotPattern } from '@/components/dot-pattern'
import { cn } from '@/lib/utils'
import { marketingHeroLead, marketingHeroTitle } from '@/lib/marketing-typography'
import { CLICKDEV_WHATSAPP_HREF, DEMO_ROUTE } from '../landing-copy'

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-16 sm:pt-20 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay using reusable component */}
        <DotPattern className="opacity-100" size="md" fadeStyle="ellipse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="outline" className="px-4 py-2 border-foreground">
              <Star className="w-3 h-3 mr-2 fill-current" />
              Digitalização industrial sob medida para PMEs
              <ArrowRight className="w-3 h-3 ml-2" />
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className={cn(marketingHeroTitle, "mb-6 text-balance")}>
            Transforme sua Indústria com Dados em Tempo Real:
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}Otimize Produção e Manutenção.
            </span>
          </h1>

          {/* Subheading */}
          <p className={cn(marketingHeroLead, "mx-auto mb-10 max-w-2xl text-balance")}>
            Dashboards e sistemas sob medida para Pequenas e Médias Empresas. Elimine planilhas confusas,
            reduza custos operacionais e tenha o controle total da sua produção e manutenção com soluções
            inteligentes e intuitivas. Resultados comprovados: redução de até 30% em paradas não planejadas
            e aumento de 15% na eficiência operacional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base cursor-pointer" asChild>
              <a href={CLICKDEV_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                Agendar Diagnóstico Gratuito
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-base cursor-pointer" asChild>
              <Link href={DEMO_ROUTE}>
                <Play className="mr-2 h-4 w-4" />
                Ver Demonstração do PCM Forge
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="relative group">
            {/* Top background glow effect - positioned above the image */}
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>

            <div className="relative rounded-xl border bg-card shadow-2xl">
              {/* Light mode dashboard image */}
              <Image
                src="/dashboard-light.png"
                alt="Pré-visualização do painel — modo claro"
                width={1200}
                height={800}
                className="w-full rounded-xl object-cover block dark:hidden"
                priority
              />

              {/* Dark mode dashboard image */}
              <Image
                src="/dashboard-dark.png"
                alt="Pré-visualização do painel — modo escuro"
                width={1200}
                height={800}
                className="w-full rounded-xl object-cover hidden dark:block"
                priority
              />

              {/* Bottom fade effect - gradient overlay that fades the image to background */}
              <div className="absolute bottom-0 left-0 w-full h-32 md:h-40 lg:h-48 bg-gradient-to-b from-background/0 via-background/70 to-background rounded-b-xl"></div>

              {/* Overlay play button for demo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-16 w-16 p-0 cursor-pointer hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href={DEMO_ROUTE} aria-label="Abrir demonstração do PCM Forge">
                    <Play className="h-6 w-6 fill-current" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}