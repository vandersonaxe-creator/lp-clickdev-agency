"use client"

import { Plus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  marketingSectionPadding,
  marketingSectionTitle,
} from "@/lib/marketing-typography"
import { fadeUp, inViewDefault, stagger } from "../motion-presets"
import { Eyebrow } from "./eyebrow"

type FaqItem = {
  value: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    value: "item-1",
    question: "Quanto custa um projeto sob medida?",
    answer:
      "Depende do escopo real. Depois do diagnóstico conseguimos fechar um orçamento por blocos entregáveis — você paga pelo que entra em produção, sem pacote fechado inflado.",
  },
  {
    value: "item-2",
    question: "Em quanto tempo começo a ver o sistema funcionando?",
    answer:
      "O protótipo navegável costuma sair nas primeiras semanas. Implantação é em ondas, com módulos entrando em uso antes do sistema estar 100% fechado — reduz risco e retrabalho.",
  },
  {
    value: "item-3",
    question: "Preciso parar a operação para implantar?",
    answer:
      "Não. A transição é feita em paralelo com a rotina atual — planilha e sistema rodam juntos até o time ganhar confiança. Nada entra em produção sem validação do gestor e do técnico.",
  },
  {
    value: "item-4",
    question: "Como fica segurança e LGPD?",
    answer:
      "Controle de acesso por papel, logs de ações e responsáveis, dados em infraestrutura dedicada e escopo de LGPD discutido no diagnóstico conforme o risco do seu cenário.",
  },
]

export function FaqSection() {
  return (
    <section
      id="faq"
      className={cn("relative overflow-hidden", marketingSectionPadding)}
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow align="center">Perguntas frequentes</Eyebrow>
          <h2
            className={cn(marketingSectionTitle, "mt-5 text-balance")}
          >
            O que a maioria pergunta antes de contratar.
          </h2>
        </div>

        <motion.div
          variants={stagger}
          {...inViewDefault}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item) => (
              <motion.div key={item.value} variants={fadeUp}>
                <AccordionItem
                  value={item.value}
                  className={cn(
                    "group/item relative overflow-hidden rounded-xl border border-border/70 bg-card/40",
                    "transition-all duration-300",
                    "hover:border-border hover:bg-card/55",
                    "data-[state=open]:border-violet-500/40 data-[state=open]:bg-card/60 data-[state=open]:shadow-[0_10px_40px_-20px_oklch(0.55_0.22_290/0.35)]"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-violet-400 via-violet-500 to-violet-600",
                      "transition-transform duration-400 ease-out",
                      "group-data-[state=open]/item:scale-y-100"
                    )}
                  />
                  <AccordionTrigger
                    className={cn(
                      "group w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left",
                      "hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0",
                      "data-[state=open]:pb-3",
                      "[&>svg:last-child]:hidden"
                    )}
                  >
                    <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        "border border-border/70 bg-background/40 text-muted-foreground",
                        "transition-colors group-hover:border-violet-500/40 group-hover:text-violet-700 dark:group-hover:text-violet-300",
                        "group-data-[state=open]:border-violet-500/40 group-data-[state=open]:text-violet-700 dark:group-data-[state=open]:text-violet-300"
                      )}
                    >
                      <Plus className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
