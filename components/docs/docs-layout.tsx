import * as React from "react"
import { LeftSidebar } from "./left-sidebar"
import { DocsNav } from "./docs-nav"

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <DocsNav />
      <div className="container flex-1 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 max-w-screen-2xl">
        <LeftSidebar />
        {children}
      </div>
    </div>
  )
}
