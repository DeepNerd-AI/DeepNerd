"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

import { docsTree } from "@/lib/docs"

function SidebarItem({ node, level = 0 }: { node: any; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(node.defaultOpen !== false)

  if (node.type === "page") {
    const isActive = pathname === node.url
    return (
      <Link
        href={node.url}
        className={cn(
          "flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-zinc-800 font-medium text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
        )}
      >
        {node.name}
      </Link>
    )
  }

  if (node.type === "folder") {
    return (
      <div className="flex flex-col gap-0.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5 text-sm font-semibold hover:bg-zinc-800/50 transition-colors"
        >
          {node.name}
          {node.collapsible && (
            isOpen ? (
              <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-white" />
            ) : (
              <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:text-white" />
            )
          )}
        </button>
        {(!node.collapsible || isOpen) && (
          <div className="flex flex-col gap-1 pr-2 pt-1 pb-2">
            <div className="ml-2 border-l border-zinc-800 pl-2 flex flex-col gap-1">
              {node.children.map((child: any, i: number) => (
                <SidebarItem key={i} node={child} level={level + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

export function LeftSidebar() {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-zinc-800 bg-black">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="w-full flex flex-col gap-2">
          {docsTree.children.map((node: any, i: number) => (
            <SidebarItem key={i} node={node} />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
