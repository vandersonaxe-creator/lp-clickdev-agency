"use client"

import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

type MouseSpotlightProps = {
  /** Tamanho do halo em px. */
  size?: number
  /** Intensidade (0..1). */
  opacity?: number
  /** Cor do centro — aceita qualquer string CSS, default violet. */
  color?: string
  /** z-index do spotlight. */
  zIndex?: number
  /**
   * Se true, usa `mix-blend-mode: screen` no dark — fica mais elegante
   * sobre imagens escuras.
   */
  blend?: boolean
  className?: string
}

/**
 * Camada `pointer-events-none` absolutamente posicionada que emite um halo
 * radial seguindo o cursor relativo a si mesma. Escuta `pointermove` na
 * window, portanto não bloqueia cliques do conteúdo abaixo.
 *
 * Uso: posicione o pai como `relative` e coloque o spotlight dentro com
 * `className="absolute inset-0"`.
 */
export function MouseSpotlight({
  size = 520,
  opacity = 0.22,
  color = "oklch(0.62 0.2 290)",
  zIndex = 0,
  blend = true,
  className,
}: MouseSpotlightProps) {
  const reduced = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(-size)
  const y = useMotionValue(-size)

  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 })

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${springX}px ${springY}px, ${color}, transparent 60%)`

  React.useEffect(() => {
    if (reduced) return
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const el = ref.current
    if (!el) return

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const rect = el.getBoundingClientRect()
      const localX = e.clientX - rect.left
      const localY = e.clientY - rect.top
      const padding = size * 0.4

      if (
        localX < -padding ||
        localY < -padding ||
        localX > rect.width + padding ||
        localY > rect.height + padding
      ) {
        x.set(-size)
        y.set(-size)
        return
      }

      x.set(localX)
      y.set(localY)
    }

    const handleLeave = () => {
      x.set(-size)
      y.set(-size)
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    window.addEventListener("pointerleave", handleLeave)
    return () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerleave", handleLeave)
    }
  }, [reduced, size, x, y])

  if (reduced) return null

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none transition-opacity duration-500",
        blend && "dark:mix-blend-screen",
        className
      )}
      style={{
        background,
        opacity,
        zIndex,
      }}
    />
  )
}
