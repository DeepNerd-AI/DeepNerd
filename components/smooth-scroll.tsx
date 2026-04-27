"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null)
  const pathname = usePathname()
  const isDocsRoute = pathname?.startsWith("/docs")

  useEffect(() => {
    if (isDocsRoute) {
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current)
        tickerCallbackRef.current = null
      }

      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }

      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped")
      document.body.classList.remove("lenis", "lenis-smooth", "lenis-stopped")
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    tickerCallbackRef.current = tickerCallback
    gsap.ticker.add(tickerCallback)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current)
        tickerCallbackRef.current = null
      }
    }
  }, [isDocsRoute])

  return <>{children}</>
}
