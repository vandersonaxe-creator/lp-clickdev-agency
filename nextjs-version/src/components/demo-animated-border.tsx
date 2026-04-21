"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Borda com traço em movimento ao longo do perímetro do botão (outline).
 * Usar em CTAs de demonstração; o pai deve ter `relative` e `rounded-*` compatível.
 */
export function DemoAnimatedBorder({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-px rounded-[inherit] border-2 border-transparent [mask-clip:padding-box,border-box]",
        "[mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect]",
        className
      )}
    >
      <motion.div
        className="via-primary to-primary absolute aspect-square bg-gradient-to-r from-transparent"
        animate={{ offsetDistance: ["0%", "100%"] }}
        style={
          {
            width: 20,
            offsetPath: "rect(0 auto auto 0 round 20px)",
          } as React.CSSProperties
        }
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "linear",
        }}
      />
    </div>
  )
}
