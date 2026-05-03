"use client"

import { useState } from "react"
import Link from "next/link"

export function TopNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 md:px-8 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between text-xs tracking-widest font-mono">
          <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-[0.2em]">
            <div className="size-4 border border-white"></div>
            DEEPNERD
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-muted-foreground uppercase">
            <Link href="#use" className="hover:text-white transition-colors">Use</Link>
            <Link href="#agents" className="hover:text-white transition-colors">Agents</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="border border-white/30 px-6 py-2 text-white hover:bg-white hover:text-black transition-colors uppercase"
            >
              Login
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden border border-border px-3 py-1.5 uppercase hover:text-white"
          >
            {isMobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {isMobileOpen && (
          <div className="border-t border-border py-4 md:hidden font-mono text-xs uppercase flex flex-col gap-4">
            <Link href="#use" className="text-muted-foreground hover:text-white block">Use</Link>
            <Link href="#agents" className="text-muted-foreground hover:text-white block">Agents</Link>
            <Link href="/docs" className="text-muted-foreground hover:text-white block">Docs</Link>
            <Link href="#about" className="text-muted-foreground hover:text-white block">About</Link>
            <Link href="/login" className="border border-white/30 px-6 py-2 text-white text-center hover:bg-white hover:text-black transition-colors block mt-4">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}