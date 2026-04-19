"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "@/hooks/use-theme"
import { useCircularTransition } from "@/hooks/use-circular-transition"
import { cn } from "@/lib/utils"

import "@/components/theme-customizer/circular-transition.css"

/**
 * Toggle de tema em formato “pill” com glow.
 * Usa o ThemeProvider do app (`@/hooks/use-theme`) e a transição circular existente.
 */
export function ThemeTogglePill() {
  const { theme } = useTheme()
  const { toggleTheme } = useCircularTransition()

  const [isResolvedDark, setIsResolvedDark] = React.useState(false)

  React.useEffect(() => {
    const update = () => {
      if (theme === "dark") {
        setIsResolvedDark(true)
      } else if (theme === "light") {
        setIsResolvedDark(false)
      } else {
        setIsResolvedDark(
          typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
      }
    }

    update()

    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null
    mq?.addEventListener("change", update)
    return () => mq?.removeEventListener("change", update)
  }, [theme])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(e)
  }

  const tooltipLabel = isResolvedDark ? "Modo claro" : "Modo escuro"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleClick}
          aria-label={tooltipLabel}
          className={cn(
            "relative h-9 w-[72px] shrink-0 cursor-pointer rounded-[18px] border p-0 transition-all duration-300 ease-out",
            "hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
            isResolvedDark
              ? "border-sky-400/30 bg-gradient-to-br from-slate-800 to-slate-700 theme-pill-glow-dark hover:shadow-[0_0_18px_rgba(56,189,248,0.28)]"
              : "border-amber-400/30 bg-gradient-to-br from-sky-100 to-blue-50 theme-pill-glow-light hover:shadow-[0_0_18px_rgba(251,191,36,0.22)]"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-1 left-1 z-[1] h-7 w-7 rounded-full border transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isResolvedDark
                ? "translate-x-[36px] border-sky-400/50 bg-slate-900 shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                : "translate-x-0 border-amber-400/50 bg-white shadow-[0_0_8px_rgba(251,191,36,0.25)]"
            )}
          />
          <span className="relative z-[5] flex h-full w-full items-center justify-between px-1.5">
            <Sun
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isResolvedDark
                  ? "scale-90 text-muted-foreground opacity-40"
                  : "scale-110 text-amber-400 opacity-100"
              )}
            />
            <Moon
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isResolvedDark
                  ? "scale-110 text-sky-400 opacity-100"
                  : "scale-90 text-muted-foreground opacity-40"
              )}
            />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltipLabel}</TooltipContent>
    </Tooltip>
  )
}
