"use client"

import * as React from "react"
import {
  BellRing,
  Building2,
  CalendarClock,
  CalendarRange,
  ClipboardList,
  FileCheck,
  FolderTree,
  Gauge,
  LayoutDashboard,
  LayoutPanelLeft,
  Shield,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { NavPcmGroup } from "@/components/nav-pcm"
import { marketingWordmark } from "@/lib/marketing-typography"
import { cn } from "@/lib/utils"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const user = {
  name: "Click Dev",
  email: "contato@clickdev.com.br",
  avatar: "",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[slot=sidebar-menu-button]:pr-1"
            >
              <Link
                href="/dashboard"
                className="flex min-w-0 items-center gap-2 overflow-hidden"
              >
                <Logo
                  size={26}
                  className="shrink-0 opacity-95 [filter:grayscale(1)_contrast(1.05)_brightness(1.2)] drop-shadow-[0_0_10px_rgba(248,250,252,0.12)]"
                />
                <span
                  className={cn(
                    marketingWordmark,
                    "truncate text-sidebar-foreground/90 dark:text-[#B8B8B8]"
                  )}
                >
                  <span className="font-extrabold">Click</span>{" "}
                  <span className="font-semibold opacity-90">Dev</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPcmGroup
          label="Dashboards"
          items={[
            { title: "Indicadores Operacionais", url: "/dashboard", icon: LayoutDashboard },
            { title: "Visão Executiva", url: "/dashboard-2", icon: LayoutPanelLeft },
          ]}
        />
        <NavPcmGroup
          className="mt-4"
          label="Operação"
          items={[
            { title: "Ativos", url: "/assets", icon: Wrench },
            { title: "Planos", url: "/plans", icon: CalendarClock },
            { title: "Planejamento", url: "/planning", icon: CalendarRange },
            { title: "Ordem de Serviço", url: "/work-orders", icon: ClipboardList },
          ]}
        />
        <NavPcmGroup
          className="mt-4"
          label="Metrologia"
          items={[
            { title: "Metrologia", url: "/calibrations", icon: Gauge },
            { title: "Plano Metrológico", url: "/calibrations/plans", icon: FileCheck },
          ]}
        />
        <NavPcmGroup
          className="mt-4"
          label="Administração"
          items={[
            { title: "Categorias e Locais", url: "/settings/categories", icon: FolderTree },
            { title: "Regras de Alerta", url: "/settings/alerts", icon: BellRing },
            { title: "Usuários e Permissões", url: "/settings/users", icon: Shield },
            { title: "Empresa", url: "/settings", icon: Building2 },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
