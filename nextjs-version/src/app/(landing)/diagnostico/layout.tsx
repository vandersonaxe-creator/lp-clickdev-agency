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
      <div
        className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-50 dark:text-slate-900"
        style={{ colorScheme: "light" }}
      >
        {children}
      </div>
    </ThemeProvider>
  )
}

