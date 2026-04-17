"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ClipboardList, Wrench, LifeBuoy } from "lucide-react"
import { cn } from "@/lib/utils"
import { marketingCardTitle, marketingSectionLead, marketingSectionTitle } from "@/lib/marketing-typography"
import { SectionReveal } from "./section-reveal"

const steps = [
  {
    icon: ClipboardList,
    title: "Diagnóstico Gratuito",
    description:
      "Entendemos seus desafios, processos atuais e objetivos. Identificamos oportunidades de otimização e desenhamos a solução ideal.",
  },
  {
    icon: CheckCircle2,
    title: "Prototipagem e Validação",
    description:
      "Desenvolvemos um protótipo funcional para você visualizar e validar o sistema antes da implementação completa.",
  },
  {
    icon: Wrench,
    title: "Implementação Personalizada",
    description:
      "Construímos e integramos a solução sob medida na sua operação, com acompanhamento próximo e treinamento da sua equipe.",
  },
  {
    icon: LifeBuoy,
    title: "Suporte Contínuo e Evolução",
    description:
      "Oferecemos suporte para garantir o funcionamento perfeito e evoluímos o sistema conforme suas necessidades crescem.",
  },
] as const

export function MethodSection() {
  return (
    <section id="metodo" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="mb-4">
            Método Click Dev
          </Badge>
          <h2 className={cn(marketingSectionTitle, "mb-4")}>
            Nosso Método: Digitalização Industrial Simples e Eficaz.
          </h2>
          <p className={marketingSectionLead}>
            Acreditamos que a transformação digital deve ser acessível e descomplicada. Nosso método é focado em
            resultados e na adaptação perfeita à sua realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.title} className="shadow-xs">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
                  <step.icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
                <h3 className={marketingCardTitle}>{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        </SectionReveal>
      </div>
    </section>
  )
}

