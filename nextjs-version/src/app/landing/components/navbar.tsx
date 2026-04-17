"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { LayoutDashboard, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { Logo } from "@/components/logo"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { marketingWordmark } from "@/lib/marketing-typography"

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
] as const

function smoothScrollTo(targetId: string) {
  if (!targetId.startsWith("#")) return
  const element = document.querySelector(targetId)
  element?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function DashboardCtaLink({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href="/dashboard"
      onClick={onClick}
      className={cn(
        "btn-primary-silver group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-xl",
        "px-6 py-2.5 text-sm font-semibold tracking-[0.14em]",
        "transition-[transform,box-shadow,filter] duration-200 ease-out",
        "hover:-translate-y-px",
        "active:translate-y-0 active:scale-[0.99] active:brightness-[0.98]",
        className
      )}
    >
      <BorderBeam
        size={88}
        duration={14}
        colorFrom="#f8fafc"
        colorTo="#cbd5e1"
        borderWidth={2}
      />
      <span className="relative z-10 flex items-center gap-2">
        <LayoutDashboard
          className="size-4 shrink-0 opacity-95 transition-transform duration-200 group-hover:rotate-[-8deg]"
          aria-hidden
        />
        VER DASHBOARD
      </span>
    </Link>
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo
              size={26}
              className="shrink-0 opacity-95 [filter:grayscale(1)_contrast(1.05)_brightness(1.2)] drop-shadow-[0_0_10px_rgba(248,250,252,0.12)]"
              priority
            />
            <span className={cn(marketingWordmark, "text-[#B8B8B8] drop-shadow-[0_0_10px_rgba(248,250,252,0.10)]")}>
              <span className="font-extrabold">Click</span>{" "}
              <span className="font-semibold opacity-90">Dev</span>
            </span>
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
            <DashboardCtaLink />
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
                  <SheetTitle className={cn(marketingWordmark, "text-[#B8B8B8] drop-shadow-[0_0_10px_rgba(248,250,252,0.10)]")}>
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
                  <DashboardCtaLink
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
