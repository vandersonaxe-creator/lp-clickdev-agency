"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

const STORAGE_KEY = "clickdev_demo_tour_seen"

function getStepTarget(stepIndex: number) {
  // stepIndex é 0-indexed (activeIndex do driver.js)
  if (stepIndex === 3) {
    return (
      document.querySelector('[data-slot="sidebar-container"]') ??
      document.querySelector('[data-sidebar="trigger"]')
    )
  }

  const map: Record<number, string> = {
    0: '[data-tour="kpis"]',
    1: '[data-tour="maintenance"]',
    2: '[data-tour="metrology"]',
  }

  return document.querySelector(map[stepIndex])
}

function scrollTargetIntoView(stepIndex: number) {
  const el = getStepTarget(stepIndex)
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

      const hasDesktopSidebar = !!document.querySelector(
        '[data-slot="sidebar-container"]'
      )
      const sidebarSelector = hasDesktopSidebar
        ? '[data-slot="sidebar-container"]'
        : '[data-sidebar="trigger"]'

      const steps = [
        {
          element: '[data-tour="kpis"]',
          popover: {
            title: "Visão rápida da operação",
            description:
              "Aqui você enxerga em segundos os principais indicadores da sua operação: ativos, ordens de serviço, atrasos, calibrações vencidas e desempenho geral.",
          },
        },
        {
          element: '[data-tour="maintenance"]',
          popover: {
            title: "Controle da manutenção",
            description:
              "Nesta área, você acompanha ordens de serviço, preventivas atrasadas e prioridades da manutenção, reduzindo perda de controle e retrabalho.",
          },
        },
        {
          element: '[data-tour="metrology"]',
          popover: {
            title: "Metrologia e conformidade",
            description:
              "Aqui o sistema ajuda a controlar calibrações, vencimentos e rastreabilidade metrológica, evitando não conformidades e correria antes de auditorias.",
          },
        },
        {
          element: sidebarSelector,
          popover: {
            title: "Sistema completo e integrado",
            description:
              "Pelo menu, você acessa os módulos da operação, como ativos, planos, ordens de serviço, metrologia, alertas e usuários. Agora você pode explorar o dashboard livremente.",
          },
        },
      ]

      const driverObj = mod.driver({
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
        steps,
        onPopoverRender: (popover) => {
          // driver.js 1.x doesn't support closeBtnText. We rewrite the close button label.
          if (popover?.closeButton) {
            popover.closeButton.innerHTML = "Pular demo"
            popover.closeButton.setAttribute("aria-label", "Pular demo")
            popover.closeButton.classList.add("clickdev-driver-close")
          }
        },
        onHighlightStarted: (_element, _step, { state }) => {
          scrollTargetIntoView(state.activeIndex ?? 0)
        },
        onDestroyed: () => {
          window.localStorage.setItem(STORAGE_KEY, "true")
          router.replace("/dashboard")
        },
      })

      scrollTargetIntoView(0)
      driverObj.drive()
    })()

    return () => {
      destroyed = true
    }
  }, [router, searchParams])

  return null
}

