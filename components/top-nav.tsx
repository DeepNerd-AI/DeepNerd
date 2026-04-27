"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const productItems = [
  { label: "Vault IDE", href: "#work" },
  { label: "DeepAgents", href: "#work" },
  { label: "DeepAPI", href: "#work" },
]

export function TopNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeMobileMenu = () => setIsMobileOpen(false)

  const openProductsMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setIsProductsOpen(true)
  }

  const closeProductsMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setIsProductsOpen(false)
    }, 180)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <div className="mx-auto max-w-7xl rounded-xl border border-gray-800 bg-black/60 backdrop-blur">
        <div className="relative flex h-14 items-center px-3 md:px-5">
          <a href="#hero" className="flex items-center">
            <Image src="/favicon.svg" alt="DeepNerd" width={32} height={32} className="size-8" priority />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <div className="relative" onMouseEnter={openProductsMenu} onMouseLeave={closeProductsMenu}>
              <a href="#work" className="text-sm text-gray-200 transition-colors duration-200 hover:text-white">
                Products
              </a>
              <div
                onMouseEnter={openProductsMenu}
                onMouseLeave={closeProductsMenu}
                className={`absolute left-1/2 top-full z-50 mt-3 w-44 -translate-x-1/2 rounded-xl border border-gray-800 bg-black/95 p-2 transition-all duration-200 ${isProductsOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
              >
                <ul className="flex flex-col gap-1">
                  {productItems.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="block rounded-md px-3 py-2 text-sm text-gray-200 transition-colors duration-150 hover:bg-gray-900 hover:text-white">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href="#signals" className="text-sm text-gray-200 transition-colors duration-200 hover:text-white">
              Releases
            </a>
            <a href="/docs" className="text-sm text-gray-200 transition-colors duration-200 hover:text-white">
              Docs
            </a>
            <a href="#colophon" className="text-sm text-gray-200 transition-colors duration-200 hover:text-white">
              About
            </a>
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <a
              href="#"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 transition-colors duration-200 hover:border-gray-300 hover:text-white"
            >
              Login
            </a>
            <a
              href="#"
              className="rounded-lg border border-white bg-white px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-gray-200"
            >
              Sign Up
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="ml-auto rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors duration-200 hover:border-gray-300 hover:text-white md:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {isMobileOpen ? (
          <div id="mobile-nav-menu" className="border-t border-gray-800 px-4 pb-4 pt-3 md:hidden">
            <nav className="flex flex-col gap-2">
              <span className="px-2 text-sm text-gray-400">Products</span>
              {productItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-md px-2 py-2 text-sm text-gray-200 transition-colors duration-150 hover:bg-gray-900 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#signals"
                onClick={closeMobileMenu}
                className="rounded-md px-2 py-2 text-sm text-gray-200 transition-colors duration-150 hover:bg-gray-900 hover:text-white"
              >
                Releases
              </a>
              <a
                href="/docs"
                onClick={closeMobileMenu}
                className="rounded-md px-2 py-2 text-sm text-gray-200 transition-colors duration-150 hover:bg-gray-900 hover:text-white"
              >
                Docs
              </a>
              <a
                href="#colophon"
                onClick={closeMobileMenu}
                className="rounded-md px-2 py-2 text-sm text-gray-200 transition-colors duration-150 hover:bg-gray-900 hover:text-white"
              >
                About
              </a>
            </nav>

            <div className="mt-3 flex gap-2">
              <a
                href="#"
                onClick={closeMobileMenu}
                className="flex-1 rounded-lg border border-gray-700 px-3 py-2 text-center text-sm text-gray-200 transition-colors duration-200 hover:border-gray-300 hover:text-white"
              >
                Login
              </a>
              <a
                href="#"
                onClick={closeMobileMenu}
                className="flex-1 rounded-lg border border-white bg-white px-3 py-2 text-center text-sm text-black transition-colors duration-200 hover:bg-gray-200"
              >
                Sign Up
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}