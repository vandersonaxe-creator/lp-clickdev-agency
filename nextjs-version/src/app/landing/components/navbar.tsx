"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Menu, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { Logo } from "@/components/logo"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { marketingWordmark } from "@/lib/marketing-typography"
import { CLICKDEV_WHATSAPP_HREF, DEMO_ROUTE } from "../landing-copy"

const navLinks = [
  { label: "Evidência", href: "#evidencia" },
  { label: "Produto", href: "#produto" },
  { label: "Processo", href: "#processo" },
  { label: "Autoridade", href: "#autoridade" },
  { label: "FAQ", href: "#faq" },
] as const

function smoothScrollTo(targetId: string) {
  if (!targetId.startsWith("#")) return
  const element = document.querySelector(targetId)
  element?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function PrimaryCtaLink({
  className,
  onClick,
  label = "Falar no WhatsApp",
}: {
  className?: string
  onClick?: () => void
  label?: string
}) {
  return (
    <a
      href={CLICKDEV_WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "btn-primary-silver group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-xl",
        "px-5 py-2.5 text-sm font-semibold tracking-[0.02em]",
        "transition-[transform,box-shadow,filter] duration-200 ease-out",
        "hover:-translate-y-px active:translate-y-0 active:scale-[0.99]",
        className
      )}
    >
      <BorderBeam
        size={84}
        duration={14}
        colorFrom="#f8fafc"
        colorTo="#cbd5e1"
        borderWidth={2}
      />
      <span className="relative z-10 flex items-center gap-2">
        <MessageCircle className="size-4 shrink-0" aria-hidden />
        {label}
        <ArrowRight
          className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </a>
  )
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
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo
              size={24}
              className="shrink-0 opacity-95 [filter:grayscale(1)_contrast(1.05)_brightness(1.2)] drop-shadow-[0_0_10px_rgba(248,250,252,0.12)]"
              priority
            />
            <span
              className={cn(
                marketingWordmark,
                "text-[15px] text-[#B8B8B8] drop-shadow-[0_0_10px_rgba(248,250,252,0.10)]"
              )}
            >
              <span className="font-extrabold">Click</span>{" "}
              <span className="font-semibold opacity-90">Dev</span>
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((item) => (
              <NavAnchor
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </NavAnchor>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="relative overflow-visible text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
            >
              <a
                href={DEMO_ROUTE}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center"
              >
                <span className="relative z-10">Ver demo</span>
              </a>
            </Button>
            <PrimaryCtaLink />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader className="border-b border-border/70 pb-4 text-left">
                  <SheetTitle
                    className={cn(
                      marketingWordmark,
                      "text-[#B8B8B8] drop-shadow-[0_0_10px_rgba(248,250,252,0.10)]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Logo
                        size={22}
                        className="shrink-0 opacity-95 [filter:grayscale(1)_contrast(1.05)_brightness(1.2)] drop-shadow-[0_0_10px_rgba(248,250,252,0.12)]"
                      />
                      <span>
                        <span className="font-extrabold">Click</span>{" "}
                        <span className="font-semibold opacity-90">Dev</span>
                      </span>
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 pt-6">
                  {navLinks.map((item) => (
                    <NavAnchor
                      key={item.href}
                      href={item.href}
                      className="py-3 text-base font-medium text-foreground/90 transition-colors hover:text-violet-300"
                      onNavigate={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavAnchor>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="btn-secondary-silver relative w-full overflow-visible focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
                    onClick={() => setMobileOpen(false)}
                  >
                    <a
                      href={DEMO_ROUTE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center justify-center"
                    >
                      <span className="relative z-10">Ver demo</span>
                    </a>
                  </Button>
                  <PrimaryCtaLink
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
