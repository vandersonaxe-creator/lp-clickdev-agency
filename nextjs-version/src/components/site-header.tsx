"use client"

import { ExternalLink } from "lucide-react"

import { HeaderUserMenu } from "@/components/header-user-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeTogglePill } from "@/components/shared/theme-toggle-pill"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const headerUser = {
  name: "Click Dev",
  email: "contato@clickdev.com.br",
  avatar: "",
}

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-3 lg:gap-2 lg:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>

        <div className="min-w-0 flex-1" aria-hidden />

        <div className="flex shrink-0 items-center gap-3">
          <Button
            asChild
            size="sm"
            className="h-8 btn-primary-silver px-4 text-[13px] font-semibold"
          >
            <Link href="/diagnostico">Diagnóstico</Link>
          </Button>
          <a
            href="https://www.clickdev.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Site
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
          </a>
          <ThemeTogglePill />
          <HeaderUserMenu user={headerUser} />
        </div>
      </div>
    </header>
  )
}
