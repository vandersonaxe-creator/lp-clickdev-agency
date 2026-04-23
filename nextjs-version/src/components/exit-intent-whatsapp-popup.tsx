"use client"

import * as React from "react"
import { BarChart3, MessageCircle } from "lucide-react"

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

const WHATSAPP_HREF =
  "https://wa.me/5521979197180?text=Olá!%20Vi%20a%20demo%20do%20Click%20PCM%20e%20quero%20entender%20como%20aplicar%20na%20minha%20operação."

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
      <div className="flex items-start gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10"
          aria-hidden
        >
          <BarChart3 className="size-5 text-primary" />
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-bold leading-tight text-foreground">
            Sua operação ainda roda no Excel?
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Enquanto você navega nesta demo, suas preventivas podem estar
            atrasando e calibrações vencendo sem ninguém saber.
          </p>
        </div>
      </div>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#20BA5C]"
        onClick={() => setOpen(false)}
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
        Vamos conversar?
      </a>

      <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
        Agora não
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader className="px-0">
            <DrawerTitle>Antes de você sair</DrawerTitle>
            <DrawerDescription>
              Tire dúvidas e veja como aplicar na sua operação.
            </DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Antes de você sair</DialogTitle>
          <DialogDescription>
            Tire dúvidas e veja como aplicar na sua operação.
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

