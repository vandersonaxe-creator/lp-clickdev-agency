"use client"

import * as React from "react"
import Link from "next/link"
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type KpiTrend = {
  direction: "up" | "down"
  label: string
  /** good = verde (ex.: MTTR caiu), bad = vermelho */
  sentiment: "good" | "bad"
}

export type KpiCardProps = {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  suffix?: string
  sub: string
  trend?: KpiTrend
  severity?: "default" | "alert-red" | "alert-amber"
  href?: string
  delay?: number
  className?: string
  iconClassName?: string
  iconWrapClassName?: string
  valueClassName?: string
  subClassName?: string
}

export function KpiCard({
  icon: Icon,
  label,
  value,
  suffix,
  sub,
  trend,
  severity = "default",
  href,
  delay = 0,
  className,
  iconClassName,
  iconWrapClassName,
  valueClassName,
  subClassName,
}: KpiCardProps) {
  const inner = (
    <>
      {severity !== "default" && (
        <span
          className={cn(
            "absolute right-4 top-4 size-2 rounded-full animate-pcm-pulse",
            severity === "alert-red" && "bg-red-500",
            severity === "alert-amber" && "bg-amber-500"
          )}
          aria-hidden
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            iconWrapClassName
          )}
        >
          <Icon className={cn("size-5", iconClassName)} aria-hidden />
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              trend.sentiment === "good" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}
            title={trend.label || undefined}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="size-4 shrink-0" aria-hidden />
            ) : (
              <TrendingDown className="size-4 shrink-0" aria-hidden />
            )}
            {trend.label ? <span>{trend.label}</span> : null}
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[12px] font-semibold tracking-[0.02em] text-muted-foreground">{label}</p>
        <p
          className={cn(
            "text-[28px] font-extrabold leading-none tracking-tight text-foreground tabular-nums",
            valueClassName
          )}
        >
          {value}
          {suffix != null && suffix !== "" ? (
            <span className="text-[0.85em] font-extrabold">{suffix}</span>
          ) : null}
        </p>
        <p
          className={cn(
            "text-[12px] font-normal leading-snug text-muted-foreground",
            subClassName
          )}
        >
          {sub}
        </p>
      </div>
    </>
  )

  const cardClass = cn(
    "group relative overflow-hidden rounded-[14px] border border-border bg-card p-[18px_20px] text-card-foreground shadow-none transition-[transform,box-shadow] duration-200",
    "hover:-translate-y-px hover:shadow-md",
    "animate-slide-up-pcm",
    severity === "alert-red" && "border-l-4 border-l-red-500 bg-red-50/80 dark:bg-red-950/25",
    severity === "alert-amber" && "border-l-4 border-l-amber-500 bg-amber-50/80 dark:bg-amber-950/25",
    className
  )

  const style = { animationDelay: `${delay}ms` } as React.CSSProperties

  if (href) {
    return (
      <Link href={href} className={cn(cardClass, "block cursor-pointer")} style={style}>
        {inner}
      </Link>
    )
  }

  return (
    <div className={cardClass} style={style}>
      {inner}
    </div>
  )
}
