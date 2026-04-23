"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export function ProgressDots({
  total,
  activeIndex,
}: {
  total: number
  activeIndex: number
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-2 rounded-full border border-slate-300 bg-white transition-colors dark:border-slate-300 dark:bg-white",
            i <= activeIndex ? "border-blue-600 bg-blue-600" : "opacity-80"
          )}
          aria-hidden
        />
      ))}
      <span className="sr-only">{`Etapa ${activeIndex + 1} de ${total}`}</span>
    </div>
  )
}

