"use client"

import * as React from "react"
import { BarChart3, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const WHATSAPP_HREF =
  "https://wa.me/5521979197180?text=Olá!%20Vi%20a%20demo%20do%20Click%20PCM%20e%20quero%20entender%20como%20aplicar%20na%20minha%20operação."

export function SidebarNotification() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <Card className="mb-3 rounded-xl border border-border bg-card py-0 shadow-sm">
      <CardContent className="relative p-4">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-muted"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Fechar</span>
        </Button>

        <div className="pr-6">
          <div className="mb-3 flex items-start gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10"
              aria-hidden
            >
              <BarChart3 className="size-5 text-primary" />
            </div>
            <div className="min-w-0 space-y-1.5">
              <h3 className="text-[14px] font-bold leading-tight text-foreground">
                Sua operação ainda roda no Excel?
              </h3>
              <p className="text-[12px] leading-[1.5] text-muted-foreground">
                Enquanto você navega nesta demo, suas preventivas podem estar
                atrasando e calibrações vencendo sem ninguém saber.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-[13px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#20BA5C]"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Vamos conversar?
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
