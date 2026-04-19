import { DM_Sans, JetBrains_Mono } from "next/font/google"

/** PCM / dashboard UI — primary sans (KPIs, titles, body). */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800"],
})

/** Tags, WO numbers, technical data. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["500", "600", "700"],
})
