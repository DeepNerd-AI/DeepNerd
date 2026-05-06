"use client"

import { Wrench, Plus, Shield, Lock, Terminal as TerminalIcon, Globe, Database, Github, HardDrive, Container, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

// --- Chart Data ---
const invocationData = [
  { day: "Mon", filesystem: 280, terminal: 180, browser: 92, github: 160, db: 75 },
  { day: "Tue", filesystem: 310, terminal: 195, browser: 88, github: 142, db: 82 },
  { day: "Wed", filesystem: 340, terminal: 220, browser: 110, github: 178, db: 68 },
  { day: "Thu", filesystem: 290, terminal: 175, browser: 86, github: 152, db: 90 },
  { day: "Fri", filesystem: 360, terminal: 240, browser: 105, github: 188, db: 72 },
  { day: "Sat", filesystem: 140, terminal: 80, browser: 42, github: 65, db: 38 },
  { day: "Sun", filesystem: 120, terminal: 70, browser: 38, github: 55, db: 30 },
]

const invocationConfig = {
  filesystem: { label: "Filesystem", color: "#ffffff" },
  terminal: { label: "Terminal", color: "#aaaaaa" },
  browser: { label: "Browser", color: "#888888" },
  github: { label: "GitHub", color: "#666666" },
  db: { label: "Database", color: "#444444" },
} satisfies ChartConfig

export default function ToolsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Tools</h1>
          <p className="text-sm text-zinc-500 mt-1">Agent integration ecosystem — secure sandboxing, permissions, and execution isolation</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest">
            <Plus className="size-4 mr-2" /> Custom Tool
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-widest">
            Browse Registry
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Installed", value: "14", icon: Wrench },
          { label: "Invocations (24h)", value: "4,891", icon: CheckCircle2 },
          { label: "Security Issues", value: "0", icon: Shield, accent: "text-green-500" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-zinc-500 font-mono uppercase text-[10px] tracking-widest">{stat.label}</CardDescription>
              <stat.icon className="size-4 text-zinc-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-light tabular-nums ${stat.accent || "text-white"}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invocation Chart */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Tool Invocations by Type</CardTitle>
          <CardDescription className="text-zinc-500 text-xs">Daily invocation volume per tool — last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={invocationConfig} className="h-[280px] w-full">
            <AreaChart data={invocationData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#222" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area dataKey="db" type="natural" fill="var(--color-db)" fillOpacity={0.2} stroke="var(--color-db)" stackId="a" />
              <Area dataKey="github" type="natural" fill="var(--color-github)" fillOpacity={0.2} stroke="var(--color-github)" stackId="a" />
              <Area dataKey="browser" type="natural" fill="var(--color-browser)" fillOpacity={0.2} stroke="var(--color-browser)" stackId="a" />
              <Area dataKey="terminal" type="natural" fill="var(--color-terminal)" fillOpacity={0.2} stroke="var(--color-terminal)" stackId="a" />
              <Area dataKey="filesystem" type="natural" fill="var(--color-filesystem)" fillOpacity={0.3} stroke="var(--color-filesystem)" stackId="a" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white font-medium">Filesystem is the most used tool (1,840 calls)</span>
            <TrendingUp className="size-4 text-green-500" />
          </div>
        </CardFooter>
      </Card>

      {/* Tool Grid */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Installed Tools</CardTitle>
          <CardDescription className="text-zinc-500 text-xs mt-1">Tools available for agent use — each runs in isolated sandboxes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Filesystem", icon: HardDrive, desc: "Read, write, and manage files within project scope", status: "active", perms: ["read", "write"], invocations: 1240, health: 100 },
              { name: "Terminal", icon: TerminalIcon, desc: "Execute shell commands in sandboxed environments", status: "active", perms: ["execute"], invocations: 890, health: 100 },
              { name: "Browser", icon: Globe, desc: "Navigate, scrape, and interact with web pages", status: "active", perms: ["read", "navigate"], invocations: 456, health: 98 },
              { name: "GitHub", icon: Github, desc: "Create PRs, manage issues, review code", status: "active", perms: ["read", "write", "admin"], invocations: 780, health: 100 },
              { name: "Database", icon: Database, desc: "Query and manage database connections", status: "active", perms: ["read", "write"], invocations: 345, health: 100 },
              { name: "Docker", icon: Container, desc: "Build, run, and manage containers", status: "restricted", perms: ["read", "execute"], invocations: 120, health: 96 },
            ].map((tool) => (
              <div key={tool.name} className="p-4 bg-[#111] border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-2 bg-[#0a0a0a] border border-zinc-800">
                    <tool.icon className="size-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-mono">{tool.name}</span>
                      <Badge className={`text-[10px] border-none ${
                        tool.status === "active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                      }`}>{tool.status}</Badge>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{tool.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {tool.perms.map((p) => (
                    <Badge key={p} className="bg-zinc-800/50 text-zinc-500 text-[10px] border-none flex items-center gap-1">
                      <Lock className="size-2.5" />{p}
                    </Badge>
                  ))}
                  <span className="text-[10px] text-zinc-600 font-mono ml-auto">{tool.invocations.toLocaleString()} calls</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-600 font-mono uppercase tracking-widest">Health</span>
                    <span className="text-green-500 tabular-nums">{tool.health}%</span>
                  </div>
                  <Progress value={tool.health} className="h-1 bg-zinc-800 [&>div]:bg-green-500/50" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-red-500/5 border-red-500/20">
        <CardContent className="flex items-start gap-3 p-4">
          <AlertTriangle className="size-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-red-400 font-mono uppercase tracking-widest">Security Notice</div>
            <p className="text-xs text-zinc-400 mt-1">
              All tools execute in isolated sandboxed environments with strict permission boundaries. 
              One RCE vulnerability can be catastrophic. Every tool invocation is logged, rate-limited, 
              and passes through the permission layer before execution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
