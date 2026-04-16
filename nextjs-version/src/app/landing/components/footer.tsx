"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Logo } from '@/components/logo'
import { Linkedin, MessageCircle, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { marketingHeading, marketingSectionLead, marketingWordmark } from '@/lib/marketing-typography'
import { CLICKDEV_WHATSAPP_HREF } from '../landing-copy'

const newsletterSchema = z.object({
  email: z.string().email({
    message: "Informe um e-mail válido.",
  }),
})

const footerLinks = {
  clickdev: [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Método', href: '#metodo' },
    { name: 'FAQ', href: '#faq' },
  ],
  contato: [
    { name: 'WhatsApp', href: CLICKDEV_WHATSAPP_HREF },
    { name: 'Contato', href: '#contact' },
    { name: 'Demonstração', href: '/demo' },
  ],
}

const socialLinks = [
  { name: 'WhatsApp', href: CLICKDEV_WHATSAPP_HREF, icon: MessageCircle },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

export function LandingFooter() {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof newsletterSchema>) {
    // Here you would typically send the email to your newsletter service
    console.log(values)
    // Show success message and reset form
    form.reset()
  }

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className={cn(marketingHeading.h24, "mb-4")}>Receba novidades</h3>
            <p className={cn(marketingSectionLead, "mb-6")}>
              Conteúdos sobre digitalização industrial, manutenção, produção e boas práticas de gestão.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 max-w-md mx-auto sm:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Seu e-mail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="cursor-pointer">Inscrever</Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid gap-8 grid-cols-4 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-4 lg:col-span-2 max-w-2xl">
            <div className="flex items-center space-x-2 mb-4 max-lg:justify-center">
              <a href="/" className="flex items-center space-x-2 cursor-pointer">
                <Logo size={32} />
                <span className={marketingWordmark}>Click Dev</span>
              </a>
            </div>
            <p className="text-muted-foreground mb-6 max-lg:text-center max-lg:flex max-lg:justify-center">
              Dashboards e sistemas sob medida para pequenas e médias indústrias. Produção, manutenção, ativos e metrologia com dados em tempo real.
            </p>
            <div className="flex space-x-4 max-lg:justify-center">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className='max-md:col-span-2 lg:col-span-1'>
            <h4 className={cn(marketingHeading.h16, "mb-4")}>Click Dev</h4>
            <ul className="space-y-3">
              {footerLinks.clickdev.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='max-md:col-span-2 lg:col-span-1'>
            <h4 className={cn(marketingHeading.h16, "mb-4")}>Contato</h4>
            <ul className="space-y-3">
              {footerLinks.contato.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by</span>
              <a href="/" className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                Click Dev
              </a>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>© {new Date().getFullYear()} Digitalização industrial</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
