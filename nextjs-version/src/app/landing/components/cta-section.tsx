"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { marketingCtaTitle, marketingSectionLead } from '@/lib/marketing-typography'
import { CLICKDEV_WHATSAPP_HREF } from '../landing-copy'

export function CTASection() {
  return (
    <section className='py-16 lg:py-24 bg-muted/80'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='text-center'>
            <div className='space-y-8'>
              {/* Badge and Stats */}
              <div className='flex flex-col items-center gap-4'>
                <Badge variant='outline' className='flex items-center gap-2'>
                  <MessageCircle className='size-3' />
                  Conversa rápida no WhatsApp
                </Badge>

                <div className='text-muted-foreground text-sm'>
                  Diagnóstico gratuito e orientação inicial para sua indústria.
                </div>
              </div>

              {/* Main Content */}
              <div className='space-y-6'>
                <h1 className={cn(marketingCtaTitle, 'text-balance')}>
                  Pronto para Levar sua Indústria ao Próximo Nível?
                </h1>

                <p className={cn(marketingSectionLead, 'mx-auto max-w-2xl text-balance')}>
                  Não deixe que a falta de controle e processos manuais limitem o crescimento da sua empresa. Fale
                  com um especialista da Click Dev e descubra como a digitalização pode transformar sua operação.
                  Invista em tecnologia que gera resultados reais e mensuráveis.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col justify-center gap-4 sm:flex-row sm:gap-6'>
                <Button size='lg' className='cursor-pointer px-8 py-6 text-lg font-medium' asChild>
                  <a href={CLICKDEV_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    Agendar Conversa Gratuita
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full bg-green-600 dark:bg-green-400 me-1' />
                  <span>Diagnóstico sem custo</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full bg-blue-600 dark:bg-blue-400 me-1' />
                  <span>Foco em operação e manutenção</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='size-2 rounded-full bg-purple-600 dark:bg-purple-400 me-1' />
                  <span>Suporte contínuo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
