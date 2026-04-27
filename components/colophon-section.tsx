"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-12 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Information</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">ABOUT US</h2>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Products */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Products</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/docs/products/vault-ide"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Vault IDE
              </Link>
            </li>
            <li>
              <Link
                href="/docs/products/deepagents"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                DeepAgents
              </Link>
            </li>
            <li>
              <Link
                href="/docs/products/deepapi"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                DeepAPI
              </Link>
            </li>
          </ul>
        </div>

        {/* Stack */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Stack</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Next.js
              </a>
            </li>
            <li>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Tailwind CSS
              </a>
            </li>
            <li>
              <a
                href="https://vercel.com/docs"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Vercel
              </a>
            </li>
          </ul>
        </div>

        {/* Tech */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Technology</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/docs"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                LLMs
              </Link>
            </li>
            <li>
              <Link
                href="/docs/guides"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Reasoning Models
              </Link>
            </li>
            <li>
              <Link
                href="/docs/examples"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Graph Networks
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/docs"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/docs/api-reference"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                API Reference
              </Link>
            </li>
            <li>
              <Link
                href="/docs/guides"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Guides
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hello@deepnerd.ai"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Year */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-mono text-xs text-foreground/80 transition-colors duration-200 hover:text-white hover:underline"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2025 DeepNerd. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Engineering AI for developers. Every day.</p>
      </div>
    </section>
  )
}
