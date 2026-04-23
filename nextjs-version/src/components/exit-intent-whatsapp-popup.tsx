"use client"

import * as React from "react"
import { BarChart3, CalendarClock, Sparkles } from "lucide-react"
import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const SEEN_KEY = "click_pcm_exit_intent_seen"

type ExitIntentWhatsAppPopupProps = {
  mobileDelayMs?: number
}

export function ExitIntentWhatsAppPopup({
  mobileDelayMs = 30_000,
}: ExitIntentWhatsAppPopupProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)

  const markSeenAndOpen = React.useCallback(() => {
    try {
      localStorage.setItem(SEEN_KEY, "1")
    } catch {
      // ignore
    }
    setOpen(true)
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    try {
      if (localStorage.getItem(SEEN_KEY) === "1") return
    } catch {
      // ignore
    }

    if (isMobile) {
      const t = window.setTimeout(markSeenAndOpen, mobileDelayMs)
      return () => window.clearTimeout(t)
    }

    const onMouseLeave = (e: MouseEvent) => {
      // "Exit intent": mouse indo para fora pelo topo.
      if (e.clientY <= 0) {
        markSeenAndOpen()
      }
    }

    document.addEventListener("mouseleave", onMouseLeave)
    return () => document.removeEventListener("mouseleave", onMouseLeave)
  }, [isMobile, mobileDelayMs, markSeenAndOpen])

  const content = (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,oklch(0.62_0.22_290/0.22),transparent_60%),radial-gradient(ellipse_70%_60%_at_80%_10%,oklch(0.78_0.15_290/0.14),transparent_55%),linear-gradient(to_bottom,var(--card),var(--background))] p-4 sm:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="flex items-start gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300"
            aria-hidden
          >
            <BarChart3 className="size-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-extrabold leading-tight text-foreground">
              Antes de sair: diagnóstico em 30–40 minutos
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A gente identifica onde sua operação trava hoje e define o que
              digitalizar primeiro — com prioridade clara e próximo passo já
              agendado.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400/80" />
            Sem compromisso
          </span>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400/80" />
            Direto ao ponto
          </span>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400/80" />
            Próximo passo definido
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          asChild
          className="btn-primary-silver h-10 w-full"
          onClick={() => setOpen(false)}
        >
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
            Fazer diagnóstico
          </Link>
        </Button>
        <Button
          variant="outline"
          className="h-10 w-full"
          onClick={() => setOpen(false)}
        >
          Agora não
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Ao clicar em “Fazer diagnóstico”, você vai para um fluxo rápido e já sai
        com um próximo passo agendado.
      </p>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Antes de você sair</DrawerTitle>
            <DrawerDescription>
              Diagnóstico rápido + agendamento do próximo passo.
            </DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Antes de você sair</DialogTitle>
          <DialogDescription>
            Diagnóstico rápido + agendamento do próximo passo.
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

