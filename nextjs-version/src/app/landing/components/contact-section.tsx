"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Mail, MessageCircle, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { marketingCardTitle, marketingSectionLead, marketingSectionTitle } from '@/lib/marketing-typography'
import { CLICKDEV_WHATSAPP_HREF } from '../landing-copy'
import { SectionReveal } from './section-reveal'

const contactFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  lastName: z.string().min(2, {
    message: "Sobrenome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Informe um e-mail válido.",
  }),
  subject: z.string().min(5, {
    message: "Assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "Mensagem deve ter pelo menos 10 caracteres.",
  }),
})

export function ContactSection() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // Here you would typically send the form data to your backend
    console.log(values)
    // You could also show a success message or redirect
    form.reset()
  }

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Contato</Badge>
          <h2 className={cn(marketingSectionTitle, "mb-4")}>
            Vamos conversar sobre sua operação?
          </h2>
          <p className={marketingSectionLead}>
            Escolha a melhor forma de falar com a Click Dev. Para diagnóstico gratuito, o caminho mais rápido é o WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Options */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className={cn(marketingCardTitle, "flex items-center gap-2")}>
                  <MessageCircle className="h-5 w-5 text-primary" />
                  WhatsApp (recomendado)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Fale direto com a Click Dev e agende seu diagnóstico gratuito.
                </p>
                <Button variant="outline" size="sm" className="btn-tertiary-silver cursor-pointer" asChild>
                  <a href={CLICKDEV_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    Abrir WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className={cn(marketingCardTitle, "flex items-center gap-2")}>
                  <Mail className="h-5 w-5 text-primary" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Envie uma mensagem com o contexto do seu desafio e o melhor horário para retorno.
                </p>
                <Button variant="outline" size="sm" className="btn-tertiary-silver cursor-pointer" asChild>
                  <a href="mailto:contato@clickdev.com.br">
                    Enviar e-mail
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className={cn(marketingCardTitle, "flex items-center gap-2")}>
                  <Linkedin className="h-5 w-5 text-primary" />
                  LinkedIn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Conecte para acompanhar conteúdos e novidades sobre digitalização industrial.
                </p>
                <Button variant="outline" size="sm" className="btn-tertiary-silver cursor-pointer" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Abrir LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle className={cn(marketingCardTitle, "flex items-center gap-2")}>
                  <Mail className="h-5 w-5" />
                  Enviar mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu sobrenome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="voce@empresa.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input placeholder="Diagnóstico, PCM, metrologia, dashboards..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Conte rapidamente seu cenário (manutenção, produção, ativos, planilhas, dores atuais)..."
                              rows={10}
                              className="min-h-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="btn-tertiary-silver w-full cursor-pointer">
                      Enviar mensagem
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        </SectionReveal>
      </div>
    </section>
  )
}
