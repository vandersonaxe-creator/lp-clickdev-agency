"use client"

import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import {
  marketingHeading,
  marketingWordmark,
} from "@/lib/marketing-typography"
import {
  CLICKDEV_EMAIL,
  CLICKDEV_EMAIL_HREF,
  CLICKDEV_INSTAGRAM_HREF,
  CLICKDEV_LINKEDIN_HREF,
  CLICKDEV_WHATSAPP_HREF,
} from "../landing-copy"

const footerNavLinks = [
  { name: "Evidência", href: "#evidencia" },
  { name: "Produto", href: "#produto" },
  { name: "Processo", href: "#processo" },
  { name: "Autoridade", href: "#autoridade" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
] as const

const contactChannels = [
  { display: CLICKDEV_EMAIL, href: CLICKDEV_EMAIL_HREF, icon: Mail },
  { display: "WhatsApp", href: CLICKDEV_WHATSAPP_HREF, icon: MessageCircle },
  { display: "LinkedIn", href: CLICKDEV_LINKEDIN_HREF, icon: Linkedin },
  { display: "Instagram", href: CLICKDEV_INSTAGRAM_HREF, icon: Instagram },
] as const

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="rodape"
      className="relative border-t border-border/70 bg-background/80"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid w-full min-w-0 grid-cols-1 gap-10 text-center lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-12 lg:text-left">
          <div className="min-w-0 flex flex-col items-center lg:items-start">
            <a
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Click Dev — página inicial"
            >
              <Logo
                size={26}
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Sistemas web sob medida para indústrias que precisam sair da
              planilha. PCM, manutenção, metrologia e controle operacional no
              mesmo painel — feitos para a realidade de quem está na linha de
              frente.
            </p>
          </div>

          <div className="min-w-0">
            <h4
              className={cn(marketingHeading.h16, "mb-4 text-foreground")}
            >
              Navegação
            </h4>
            <ul className="space-y-3 text-sm">
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

          <div className="min-w-0">
            <h4
              className={cn(marketingHeading.h16, "mb-4 text-foreground")}
            >
              Contato
            </h4>
            <ul className="flex flex-col items-center gap-3 lg:items-start">
              {contactChannels.map((ch) => {
                const isMail = ch.href.startsWith("mailto:")
                return (
                  <li key={ch.display} className="min-w-0">
                    <a
                      href={ch.href}
                      {...(isMail
                        ? {}
                        : {
                            target: "_blank" as const,
                            rel: "noopener noreferrer",
                          })}
                      className="group inline-flex max-w-full items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ch.icon
                        className="h-4 w-4 shrink-0 opacity-80 transition-colors group-hover:text-violet-300"
                        aria-hidden
                      />
                      <span className="min-w-0 break-words text-left font-medium">
                        {ch.display}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border/70" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:text-left sm:text-sm">
          <p>
            © {year} Click Dev · Sistemas sob medida para operação industrial.
          </p>
          <p className="text-muted-foreground/80">
            Projetado e desenvolvido com padrão sênior.
          </p>
        </div>
      </div>
    </footer>
  )
}
