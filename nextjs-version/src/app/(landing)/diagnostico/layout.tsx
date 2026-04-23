"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider forcedTheme="light" defaultTheme="light" storageKey="diagnostico-theme">
      <div className="min-h-screen bg-background text-foreground">{children}</div>
    </ThemeProvider>
  )
}

