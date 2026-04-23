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
            "h-2 w-2 rounded-full border border-border bg-background transition-colors",
            i <= activeIndex ? "border-primary bg-primary" : "opacity-80"
          )}
          aria-hidden
        />
      ))}
      <span className="sr-only">{`Etapa ${activeIndex + 1} de ${total}`}</span>
    </div>
  )
}

