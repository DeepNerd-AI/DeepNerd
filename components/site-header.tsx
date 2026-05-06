"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const routeNames: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/apis": "API Keys",
  "/dashboard/analytics": "Analytics",
  "/dashboard/agents": "Agents",
  "/dashboard/automation": "Automation",
  "/dashboard/tools": "Tools",
  "/dashboard/ide": "IDE",
  "/dashboard/notifications": "Notifications",
  "/dashboard/settings": "Settings",
}

export function SiteHeader() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const pageTitle = routeNames[pathname] || segments[segments.length - 1] || "Dashboard"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-zinc-800 bg-[#050505] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-zinc-800"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest">
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segments.length > 1 && (
              <>
                <BreadcrumbSeparator className="text-zinc-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white text-xs font-mono uppercase tracking-widest">
                    {pageTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800 size-8">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800 size-8 relative" asChild>
            <Link href="/dashboard/notifications">
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-2 bg-white rounded-full" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
