"use client"

import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

type SectionRevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  delay?: number
}

/** Fade-in-up when the block enters the viewport (Magic UI / plano mobile-first). */
export function SectionReveal({
  children,
  className,
  delay = 0,
  ...props
}: SectionRevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
