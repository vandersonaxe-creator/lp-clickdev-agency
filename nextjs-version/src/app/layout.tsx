import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Shadcn Dashboard",
  description: "A dashboard built with Next.js and shadcn/ui",
  icons: {
    icon: [
      { url: "/favicon-v2.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark-v2.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-v2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" storageKey="nextjs-ui-theme">
          <SidebarConfigProvider>
            {children}
          </SidebarConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
