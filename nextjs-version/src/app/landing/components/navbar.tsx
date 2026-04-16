"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

const WHATSAPP_HREF =
  "https://wa.me/5521979197180?text=Ol%C3%A1%20Vanderson%2C%20quero%20agendar%20meu%20Diagn%C3%B3stico%20Gratuito"

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Método", href: "#metodo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
] as const

function smoothScrollTo(targetId: string) {
  if (!targetId.startsWith("#")) return
  const element = document.querySelector(targetId)
  element?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function NavAnchor({
  href,
  children,
  className,
  onNavigate,
}: {
  href: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        onNavigate?.()
        smoothScrollTo(href)
      }}
    >
      {children}
    </a>
  )
}

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/landing"
            className="flex items-center gap-2 shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="text-2xl font-bold text-orange-600">Click Dev</span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-foreground">
            {navLinks.map((item) => (
              <NavAnchor
                key={item.href}
                href={item.href}
                className="hover:text-orange-600 transition-colors"
              >
                {item.label}
              </NavAnchor>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <span className="hidden lg:inline px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full whitespace-nowrap">
              Disponível para novos projetos
            </span>
            <ModeToggle variant="ghost" />
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors text-sm"
            >
              Diagnóstico Gratuito
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ModeToggle variant="ghost" />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="text-orange-600 font-bold text-xl">
                    Click Dev
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 pt-6">
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full w-fit">
                    Disponível para novos projetos
                  </span>
                  <div className="flex flex-col gap-1">
                    {navLinks.map((item) => (
                      <NavAnchor
                        key={item.href}
                        href={item.href}
                        className="py-3 text-base font-medium hover:text-orange-600 transition-colors"
                        onNavigate={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </NavAnchor>
                    ))}
                  </div>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold text-center transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Diagnóstico Gratuito
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
