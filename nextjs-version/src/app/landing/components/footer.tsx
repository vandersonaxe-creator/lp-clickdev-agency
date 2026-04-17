"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Logo } from "@/components/logo"
import { Heart, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { marketingHeading, marketingSectionLead, marketingWordmark } from "@/lib/marketing-typography"
import {
  CLICKDEV_EMAIL,
  CLICKDEV_EMAIL_HREF,
  CLICKDEV_INSTAGRAM_HREF,
  CLICKDEV_LINKEDIN_HREF,
  CLICKDEV_WHATSAPP_HREF,
} from "../landing-copy"

const newsletterSchema = z.object({
  email: z.string().email({
    message: "Informe um e-mail válido.",
  }),
})

const footerNavLinks = [
  { name: "Sobre", href: "#sobre" },
  { name: "Soluções", href: "#solucoes" },
  { name: "Método", href: "#metodo" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
  { name: "Demonstração", href: "/demo" },
] as const

const contactChannels = [
  { display: CLICKDEV_EMAIL, href: CLICKDEV_EMAIL_HREF, icon: Mail },
  { display: "WhatsApp", href: CLICKDEV_WHATSAPP_HREF, icon: MessageCircle },
  { display: "LinkedIn", href: CLICKDEV_LINKEDIN_HREF, icon: Linkedin },
  { display: "Instagram", href: CLICKDEV_INSTAGRAM_HREF, icon: Instagram },
] as const

export function LandingFooter() {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof newsletterSchema>) {
    console.log(values)
    form.reset()
  }

  return (
    <footer id="rodape" className="border-t border-border/80 bg-muted/50 dark:bg-zinc-950/90">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        {/* Newsletter */}
        <div className="mb-10 sm:mb-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className={cn(marketingHeading.h24, "mb-4")}>Receba novidades</h3>
            <p className={cn(marketingSectionLead, "mb-6")}>
              Conteúdos sobre digitalização industrial, manutenção, produção e boas práticas de gestão.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex-1">
                      <FormControl>
                        <Input type="email" placeholder="Seu e-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="cursor-pointer shrink-0">
                  Inscrever
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* 3 colunas: logo | nav | contato */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {/* Coluna 1 — marca */}
          <div className="min-w-0 max-lg:text-center">
            <div className="mb-4 flex items-center max-lg:justify-center">
              <a href="/" className="flex min-w-0 cursor-pointer items-center gap-3">
                <Logo
                  size={28}
                  className="shrink-0 opacity-95 [filter:grayscale(1)_contrast(1.05)_brightness(1.2)] drop-shadow-[0_0_10px_rgba(248,250,252,0.12)]"
                />
                <span
                  className={cn(
                    marketingWordmark,
                    "text-[#B8B8B8] drop-shadow-[0_0_10px_rgba(248,250,252,0.10)]"
                  )}
                >
                  <span className="font-extrabold">Click</span>{" "}
                  <span className="font-semibold opacity-90">Dev</span>
                </span>
              </a>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              Dashboards e sistemas sob medida para pequenas e médias indústrias. Produção, manutenção, ativos e
              metrologia com dados em tempo real.
            </p>
          </div>

          {/* Coluna 2 — navegação */}
          <div className="min-w-0 max-lg:text-center">
            <h4 className={cn(marketingHeading.h16, "mb-4")}>Navegação</h4>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — contato */}
          <div className="min-w-0 max-lg:text-center lg:text-left">
            <h4 className={cn(marketingHeading.h16, "mb-4")}>Contato</h4>
            <ul className="flex flex-col gap-3 lg:items-start">
              {contactChannels.map((ch) => {
                const isMail = ch.href.startsWith("mailto:")
                return (
                  <li key={ch.display} className="min-w-0 w-full lg:w-full">
                    <a
                      href={ch.href}
                      {...(isMail
                        ? {}
                        : { target: "_blank" as const, rel: "noopener noreferrer" })}
                      className="inline-flex max-w-full items-center gap-3 text-muted-foreground transition-colors hover:text-foreground max-lg:mx-auto max-lg:justify-center lg:justify-start"
                    >
                      <ch.icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                      <span className="min-w-0 break-words text-left text-sm font-medium sm:text-base">
                        {ch.display}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-2 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-current text-red-500" />
              <span>by</span>
              <a
                href="/"
                className="cursor-pointer font-semibold text-foreground transition-colors hover:text-primary"
              >
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
