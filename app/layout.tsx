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

const siteUrl = "https://deepnerd.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DeepNerd | Infrastructure for AI Agents",
    template: "%s — DeepNerd",
  },
  description:
    "DeepNerd builds the infrastructure AI agents actually need — not prettier dashboards. Machine-readable. Agent-operable. Autonomous by design. Rust-native IDE, autonomous agents, automation pipelines, and execution primitives.",
  keywords: [
    "AI agents",
    "developer tools",
    "Rust IDE",
    "AI infrastructure",
    "autonomous agents",
    "code automation",
    "AI-native IDE",
    "developer platform",
    "LLM tools",
    "agent-operable",
    "DeepNerd",
    "machine-readable",
    "automation pipeline",
    "code editor",
    "AI development",
  ],
  authors: [{ name: "DeepNerd", url: siteUrl }],
  creator: "DeepNerd",
  publisher: "DeepNerd",
  generator: "Next.js",
  applicationName: "DeepNerd",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DeepNerd",
    title: "DeepNerd | Infrastructure for AI Agents",
    description:
      "DeepNerd builds the infrastructure AI agents actually need — Rust-native IDE, autonomous agents, automation pipelines, and execution primitives.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DeepNerd — Infrastructure for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepNerd | Infrastructure for AI Agents",
    description:
      "Rust-native IDE. Autonomous agents. Automation pipelines. Execution primitives. Built for machines, loved by developers.",
    creator: "@deepnerdai",
    site: "@deepnerdai",
    images: [`${siteUrl}/og-image.png`],
  },
  category: "technology",
  classification: "Developer Tools / AI Infrastructure",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "apple-mobile-web-app-title": "DeepNerd",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
}

// JSON-LD structured data for the entire site
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "DeepNerd",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      description:
        "DeepNerd builds the infrastructure AI agents actually need — Rust-native IDE, autonomous agents, automation pipelines, and execution primitives.",
      sameAs: [
        "https://github.com/DeepNerd-AI",
        "https://x.com/deepnerdai",
        "https://www.youtube.com/@deepnerdai",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@deepnerd.tech",
        contactType: "customer support",
        url: `${siteUrl}/contact`,
      },
      foundingDate: "2024",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "DeepNerd",
      publisher: { "@id": `${siteUrl}/#organization` },
      description:
        "Infrastructure for AI Agents — Rust-native IDE, autonomous agents, automation pipelines, and execution primitives.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/docs?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "DeepNerd Vault IDE",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      description:
        "A Rust-native code editor with sub-10ms response time, 42MB memory footprint, and native AI agent integration. Zero Electron.",
      url: `${siteUrl}/ide`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      author: { "@id": `${siteUrl}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" type="application/rss+xml" title="DeepNerd Blog" href={`${siteUrl}/writing`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="google-site-verification" content="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
