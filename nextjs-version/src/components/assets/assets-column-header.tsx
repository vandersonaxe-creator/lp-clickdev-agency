"use client"

import type { HTMLAttributes } from "react"
import type { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AssetsColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  column: Column<TData, TValue>
  title: string
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 cursor-pointer px-2 hover:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 size-4 shrink-0" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 size-4 shrink-0" />
        ) : (
          <ChevronsUpDown className="ml-1 size-4 shrink-0 opacity-60" />
        )}
      </Button>
    </div>
  )
}
