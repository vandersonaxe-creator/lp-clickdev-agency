"use client"

import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

type FaqItem = {
  value: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    value: 'item-1',
    question: 'Como funciona a implementação na minha indústria?',
    answer:
      'Começamos com um diagnóstico gratuito para entender seus processos e objetivos. Depois, criamos um protótipo para validação e seguimos para a implementação sob medida com treinamento e suporte contínuo.',
  },
  {
    value: 'item-2',
    question: 'Vocês conseguem migrar minhas planilhas para o sistema?',
    answer:
      'Sim. Estruturamos seus dados e processos para uma transição suave de planilhas para um sistema robusto e integrado, mantendo rastreabilidade e histórico.',
  },
  {
    value: 'item-3',
    question: 'Como a Click Dev garante a segurança dos dados e a LGPD?',
    answer:
      'Nossas soluções são desenvolvidas com foco em segurança de dados, controle de acesso e boas práticas de proteção da informação. Apoiamos a conformidade com a LGPD de acordo com a necessidade do seu cenário.',
  },
  {
    value: 'item-4',
    question: 'Quanto tempo leva para colocar a solução em produção?',
    answer:
      'Depende do escopo. Por isso usamos prototipagem e validação: você enxerga o sistema funcionando cedo e a evolução segue por etapas, reduzindo risco e retrabalho.',
  },
  {
    value: 'item-5',
    question: 'Qual é o retorno sobre investimento (ROI)?',
    answer:
      'O ROI varia, mas normalmente vem de reduzir paradas não planejadas, melhorar rastreabilidade, evitar não conformidades e aumentar eficiência com dados em tempo real. Podemos estimar ganhos no diagnóstico.',
  },
  {
    value: 'item-6',
    question: 'Vocês dão suporte após a entrega?',
    answer:
      'Sim. Oferecemos suporte contínuo e evoluímos o sistema conforme suas necessidades crescem, mantendo sua operação atualizada e otimizada.',
  },
]

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Perguntas frequentes</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Desvendando a Digitalização Industrial
          </h2>
          <p className="text-lg text-muted-foreground">
            Dúvidas comuns sobre sistemas industriais, implementação, suporte, segurança de dados (LGPD) e retorno
            sobre investimento.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className='bg-transparent'>
            <div className='p-0'>
              <Accordion type='single' collapsible className='space-y-5'>
                {faqItems.map(item => (
                  <AccordionItem key={item.value} value={item.value} className='rounded-md !border bg-transparent'>
                    <AccordionTrigger className='cursor-pointer items-center gap-4 rounded-none bg-transparent py-2 ps-3 pe-4 hover:no-underline data-[state=open]:border-b'>
                      <div className='flex items-center gap-4'>
                        <div className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full'>
                          <CircleHelp className='size-5' />
                        </div>
                        <span className='text-start font-semibold'>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-4 bg-transparent'>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ainda ficou com alguma dúvida? Chame no WhatsApp.
            </p>
            <Button className='cursor-pointer' asChild>
              <a href="#contact">
                Ver outras formas de contato
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqSection }
