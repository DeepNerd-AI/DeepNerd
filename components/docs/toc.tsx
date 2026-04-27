"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

function generateId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function RightSidebar({ markdown }: { markdown: string }) {
  const [activeId, setActiveId] = useState<string>("")
  const [headings, setHeadings] = useState<{ id: string; title: string; level: number }[]>([])

  useEffect(() => {
    const matches = Array.from(markdown.matchAll(/^(##|###)\s+(.*)$/gm))
    const extracted = matches.map(match => ({
      level: match[1].length,
      title: match[2].trim(),
      id: generateId(match[2].trim())
    }))
    setHeadings(extracted)
  }, [markdown])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 1.0 }
    )

    setTimeout(() => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="space-y-4">
      <p className="font-semibold tracking-tight text-foreground">On this page</p>
      <ul className="m-0 flex flex-col gap-2 list-none">
            {headings.map((heading, i) => {
              const isActive = activeId === heading.id
              return (
                <li key={i} className={cn("mt-0 pt-0", heading.level === 3 ? "pl-4" : "")}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "inline-block no-underline transition-colors hover:text-foreground",
                      isActive ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {heading.title}
                  </a>
                </li>
              )
            })}
          </ul>
          
          <div className="mt-8 border-t border-border pt-4 pb-12">
            <p className="font-semibold tracking-tight text-foreground mb-2">Helpful links</p>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Edit this page</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Report an issue</a></li>
            </ul>
          </div>
    </div>
  )
}
