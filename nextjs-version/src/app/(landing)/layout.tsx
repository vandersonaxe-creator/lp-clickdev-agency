"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark" storageKey="landing-theme">
      {children}
    </ThemeProvider>
  )
}

