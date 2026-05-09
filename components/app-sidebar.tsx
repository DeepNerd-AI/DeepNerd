"use client"

import * as React from "react"
import Image from "next/image"
import {
  Activity,
  TerminalSquare,
  Bot,
  GitBranch,
  Wrench,
  Key,
  BarChart,
  FileText,
  History,
  Bell,
  Settings,
  Terminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: Activity,
    },
    {
      title: "IDE",
      url: "/dashboard/ide",
      icon: TerminalSquare,
    },
    {
      title: "Agents",
      url: "/dashboard/agents",
      icon: Bot,
    },
    {
      title: "Automation",
      url: "/dashboard/automation",
      icon: GitBranch,
    },
    {
      title: "Tools",
      url: "/dashboard/tools",
      icon: Wrench,
    },
    {
      title: "APIs",
      url: "/dashboard/apis",
      icon: Key,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
    },
  ],
  navSecondary: [
    {
      title: "Docs",
      url: "/docs",
      icon: FileText,
    },
    {
      title: "Changelog",
      url: "/changelog",
      icon: History,
    },
  ],
  utilities: [
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

type SidebarUser = {
  name: string
  email: string
  avatar: string
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: SidebarUser }) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="border-r border-zinc-800 bg-[#050505]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-zinc-900"
            >
              <a href="/" className="flex items-center gap-2">
                <Image src="/favicon.svg" alt="DeepNerd Logo" width={20} height={20} className="invert" />
                <span className="text-base font-bold tracking-widest uppercase font-mono text-white">DeepNerd</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="mt-4 px-2">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">Resources</div>
          <NavSecondary items={data.navSecondary} />
        </div>
        <div className="mt-4 px-2 mb-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">System</div>
          <NavSecondary items={data.utilities} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
