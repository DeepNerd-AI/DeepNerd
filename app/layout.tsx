import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "DeepNerd | Infrastructure for AI Agents",
  description:
    "DeepNerd builds the infrastructure AI agents actually need — not prettier dashboards. Machine-readable. Agent-operable. Autonomous by design.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
      >
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
