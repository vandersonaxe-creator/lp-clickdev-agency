import type { Metadata } from "next"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarConfigProvider } from "@/contexts/sidebar-context"
import { dmSans, jetbrainsMono } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Click Dev — Digitalização Industrial Sob Medida",
  description:
    "Sistemas e dashboards sob medida para pequenas e médias indústrias. PCM, gestão de ativos, controle metrológico e produção com dados em tempo real. Diagnóstico gratuito.",
  icons: {
    icon: [
      { url: "/favicon-v2.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark-v2.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-v2.png",
  },
  openGraph: {
    title: "Click Dev — Digitalização Industrial Sob Medida",
    description:
      "Menos paradas, mais controle. Dashboards e sistemas industriais personalizados para PMEs.",
    url: "https://www.clickdev.com.br",
    siteName: "Click Dev",
    images: [
      {
        url: "https://www.clickdev.com.br/dashboard-light.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Click Dev — Digitalização Industrial",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Click Dev — Digitalização Industrial Sob Medida",
    description: "Menos paradas, mais controle. Dashboards e sistemas industriais para PMEs.",
    images: ["https://www.clickdev.com.br/dashboard-light.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className={`${dmSans.className} font-sans`}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="nextjs-ui-theme"
        >
          <SidebarConfigProvider>{children}</SidebarConfigProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
