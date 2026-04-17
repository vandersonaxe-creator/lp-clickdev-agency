"use client"

import * as React from "react"
import { AnimatePresence, motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_WORDS = [
  "controle",
  "produção",
  "eficiência",
  "economia",
] as const

export type RotatingWordsProps = {
  words?: string[]
  /** Interval between word changes in ms. Default: 2800 */
  intervalMs?: number
  /** Amount (px) the word travels vertically. Default: 18 */
  y?: number
  /** Motion transition for word enter/exit. */
  transition?: Transition
  /** Extra class for the outer wrapper */
  className?: string
  /** Extra class for the word itself */
  wordClassName?: string
  /** Extra class for the underline element */
  underlineClassName?: string
}

export function RotatingWords({
  words,
  intervalMs = 2800,
  y = 18,
  transition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  className,
  wordClassName,
  underlineClassName,
}: RotatingWordsProps) {
  const list = (words?.length ? words : Array.from(DEFAULT_WORDS)) as string[]
  const safeList = React.useMemo(
    () => list.filter((w) => (w ?? "").trim().length > 0),
    [list]
  )

  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (safeList.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeList.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [safeList.length, intervalMs])

  const current = safeList[Math.min(index, safeList.length - 1)] ?? ""

  return (
    <span
      className={cn(
        "relative inline-flex align-baseline",
        "overflow-hidden",
        className
      )}
      aria-live="polite"
    >
      <span className="relative inline-block pb-[10px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className={cn(
              "inline-block whitespace-nowrap font-semibold text-white",
              wordClassName
            )}
            initial={{ opacity: 0, y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -y }}
            transition={transition}
          >
            {current}
          </motion.span>
        </AnimatePresence>

        <motion.svg
          key={`${current}-underline`}
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-0 w-full",
            "bottom-[4px]",
            "h-[10px] origin-left",
            "drop-shadow-[0_0_10px_rgba(248,250,252,0.10)]",
            underlineClassName
          )}
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          initial={{ scaleX: 0, opacity: 0.35 }}
          animate={{ scaleX: 1, opacity: 0.95 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <defs>
            <linearGradient id="rotatingWordsUnderline" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D7D7D7" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#A8A8A8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F1F1F1" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M0 8 C 12 5, 24 11, 36 8 S 60 5, 72 8 S 88 11, 100 8"
            fill="none"
            stroke="url(#rotatingWordsUnderline)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        </motion.svg>
      </span>
    </span>
  )
}

export default RotatingWords
