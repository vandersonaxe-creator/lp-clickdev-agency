"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

function matchesHref(pathname: string, href: string) {
  if (pathname === href) return true
  return pathname.startsWith(`${href}/`)
}

/**
 * Entre vários itens cujo href casa com a rota, só o mais específico (prefixo mais longo) fica ativo.
 * Ex.: em /calibrations/plans só "Plano Metrológico", não "Metrologia".
 */
export function resolveActiveHref(pathname: string, items: { url: string }[]) {
  const matches = items.filter((i) => matchesHref(pathname, i.url))
  if (matches.length === 0) return null
  return matches.reduce((a, b) => (a.url.length >= b.url.length ? a : b)).url
}

export function isPcmNavActive(pathname: string, href: string, items: { url: string }[]) {
  return resolveActiveHref(pathname, items) === href
}

export function NavPcmGroup({
  label,
  items,
  className,
}: {
  label: string
  items: { title: string; url: string; icon: LucideIcon }[]
  className?: string
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className={className}>
      <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const active = isPcmNavActive(pathname, item.url, items)
          const Icon = item.icon
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={active}
                tooltip={item.title}
                className={cn(
                  "cursor-pointer",
                  active &&
                    "border-l-[3px] border-l-white bg-blue-600 text-white shadow-none hover:bg-blue-600/90 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white [&>svg]:text-white"
                )}
              >
                <Link href={item.url}>
                  <Icon className="shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
