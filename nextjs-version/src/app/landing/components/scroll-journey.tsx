"use client"

import * as React from "react"
import { motion, useScroll, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

type Stop = {
  id: string
  label: string
}

const stops: Stop[] = [
  { id: "hero", label: "Início" },
  { id: "dores", label: "Onde trava" },
  { id: "produto", label: "Produto" },
  { id: "processo", label: "Processo" },
  { id: "autoridade", label: "Autoridade" },
  { id: "depoimentos", label: "Resultados" },
  { id: "contato", label: "Diagnóstico" },
]

/**
 * Linha vertical fixa (lg+) conectando as seções da narrativa.
 * Dots acendem quando a seção entra no viewport.
 * Tooltip discreta no hover.
 */
export function ScrollJourney() {
  const [activeId, setActiveId] = React.useState<string>(stops[0].id)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const elements = stops
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      aria-label="Navegação por seções"
      className={cn(
        "pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2",
        "xl:flex xl:flex-col xl:items-center xl:gap-4"
      )}
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/70" />
        <motion.div
          className="absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-violet-400 via-violet-500 to-violet-600"
          style={{ scaleY, height: "100%" }}
        />

        {stops.map((stop) => (
          <button
            key={stop.id}
            type="button"
            onClick={() => handleClick(stop.id)}
            aria-label={`Ir para ${stop.label}`}
            className={cn(
              "group pointer-events-auto relative -my-1 flex items-center p-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:rounded-full"
            )}
          >
            <span
              className={cn(
                "relative inline-flex h-[9px] w-[9px] items-center justify-center rounded-full",
                "border border-border/70 bg-background transition-all duration-300",
                activeId === stop.id &&
                  "border-violet-400 bg-violet-400 shadow-[0_0_14px_oklch(0.62_0.2_290/0.85)] scale-125",
                "group-hover:border-violet-400 group-hover:bg-violet-400/80"
              )}
            />
            <span
              className={cn(
                "absolute left-7 whitespace-nowrap rounded-md border border-border/70 bg-background/90 px-2.5 py-1",
                "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm",
                "opacity-0 -translate-x-1 transition-all duration-200 pointer-events-none",
                "group-hover:opacity-100 group-hover:translate-x-0",
                activeId === stop.id && "text-foreground"
              )}
            >
              {stop.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
