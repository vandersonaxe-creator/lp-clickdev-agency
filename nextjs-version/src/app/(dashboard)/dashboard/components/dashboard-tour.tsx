"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

const STORAGE_KEY = "clickdev_demo_tour_seen"

function getStepTarget(step: number) {
  if (step === 4) {
    return (
      document.querySelector('[data-slot="sidebar-container"]') ??
      document.querySelector('[data-sidebar="trigger"]')
    )
  }

  const map: Record<number, string> = {
    1: '[data-tour="kpis"]',
    2: '[data-tour="maintenance"]',
    3: '[data-tour="metrology"]',
  }

  return document.querySelector(map[step])
}

function scrollTargetIntoView(step: number) {
  const el = getStepTarget(step)
  if (!el) return
  try {
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
  } catch {
    // no-op (older browsers / weird elements)
  }
}

export function DashboardTour() {
  const router = useRouter()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const tour = searchParams.get("tour")
    if (tour !== "1") return

    const force = searchParams.get("force") === "1"
    if (!force) {
      const seen = window.localStorage.getItem(STORAGE_KEY) === "true"
      if (seen) return
    }

    let destroyed = false

    ;(async () => {
      const mod = await import("driver.js")
      if (destroyed) return

      const driver = mod.driver({
        animate: true,
        overlayOpacity: 0.7,
        stageRadius: 14,
        stagePadding: 10,
        popoverClass: "clickdev-driver-popover",
        allowClose: true,
        showProgress: true,
        progressText: "Passo {{current}} de {{total}}",
        nextBtnText: "Próximo",
        prevBtnText: "Voltar",
        doneBtnText: "Explorar dashboard",
        closeBtnText: "Pular demo",
        onHighlightStarted: ({ config }) => {
          scrollTargetIntoView(Number(config?.step))
        },
        onDestroyed: () => {
          window.localStorage.setItem(STORAGE_KEY, "true")
          router.replace("/dashboard")
        },
      })

      driver.setSteps([
        {
          element: '[data-tour="kpis"]',
          popover: {
            title: "Visão rápida da operação",
            description:
              "Aqui você enxerga em segundos os principais indicadores da sua operação: ativos, ordens de serviço, atrasos, calibrações vencidas e desempenho geral.",
          },
          step: 1,
        },
        {
          element: '[data-tour="maintenance"]',
          popover: {
            title: "Controle da manutenção",
            description:
              "Nesta área, você acompanha ordens de serviço, preventivas atrasadas e prioridades da manutenção, reduzindo perda de controle e retrabalho.",
          },
          step: 2,
        },
        {
          element: '[data-tour="metrology"]',
          popover: {
            title: "Metrologia e conformidade",
            description:
              "Aqui o sistema ajuda a controlar calibrações, vencimentos e rastreabilidade metrológica, evitando não conformidades e correria antes de auditorias.",
          },
          step: 3,
        },
        {
          element: '[data-slot="sidebar-container"]',
          popover: {
            title: "Sistema completo e integrado",
            description:
              "Pelo menu, você acessa os módulos da operação, como ativos, planos, ordens de serviço, metrologia, alertas e usuários. Agora você pode explorar o dashboard livremente.",
          },
          step: 4,
        },
      ])

      // Fallback para mobile (sidebar em Sheet)
      if (!document.querySelector('[data-slot="sidebar-container"]')) {
        driver.getConfig().steps?.splice(3, 1, {
          element: '[data-sidebar="trigger"]',
          popover: {
            title: "Sistema completo e integrado",
            description:
              "Pelo menu, você acessa os módulos da operação, como ativos, planos, ordens de serviço, metrologia, alertas e usuários. Agora você pode explorar o dashboard livremente.",
          },
          step: 4,
        } as any)
      }

      scrollTargetIntoView(1)
      driver.drive()
    })()

    return () => {
      destroyed = true
    }
  }, [router, searchParams])

  return null
}

