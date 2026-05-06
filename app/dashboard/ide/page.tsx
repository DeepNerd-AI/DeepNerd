"use client"

import { Terminal, Play, Square, Plus, Cpu, Clock, GitBranch, FolderTree, Maximize2, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// --- Chart Data ---
const sessionActivity = [
  { hour: "06:00", keystrokes: 120, completions: 14 },
  { hour: "08:00", keystrokes: 340, completions: 42 },
  { hour: "10:00", keystrokes: 480, completions: 68 },
  { hour: "12:00", keystrokes: 280, completions: 35 },
  { hour: "14:00", keystrokes: 520, completions: 72 },
  { hour: "16:00", keystrokes: 410, completions: 58 },
  { hour: "18:00", keystrokes: 190, completions: 22 },
]

const memoryUsage = [
  { time: "0m", heap: 28, rss: 42 },
  { time: "5m", heap: 31, rss: 44 },
  { time: "10m", heap: 35, rss: 46 },
  { time: "15m", heap: 33, rss: 45 },
  { time: "20m", heap: 38, rss: 48 },
  { time: "25m", heap: 36, rss: 47 },
  { time: "30m", heap: 42, rss: 52 },
]

const activityConfig = {
  keystrokes: { label: "Keystrokes", color: "#ffffff" },
  completions: { label: "AI Completions", color: "#888888" },
} satisfies ChartConfig

const memoryConfig = {
  heap: { label: "Heap", color: "#ffffff" },
  rss: { label: "RSS", color: "#555555" },
} satisfies ChartConfig

export default function IDEPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Vault IDE</h1>
          <p className="text-sm text-zinc-500 mt-1">AI-native development environment — Rust-native, zero Electron</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-mono uppercase tracking-widest">
            <Plus className="size-4 mr-2" /> New Session
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-widest">
            <Play className="size-4 mr-2" /> Launch IDE
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Active Sessions", value: "3", icon: Terminal, accent: "text-green-500" },
          { label: "Avg Latency", value: "4.2ms", icon: Clock, accent: "text-white" },
          { label: "Memory Usage", value: "42MB", icon: Cpu, accent: "text-white" },
          { label: "Open Projects", value: "5", icon: FolderTree, accent: "text-white" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-zinc-500 font-mono uppercase text-[10px] tracking-widest">{stat.label}</CardDescription>
              <stat.icon className="size-4 text-zinc-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-light tabular-nums ${stat.accent}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activity Chart */}
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Session Activity</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Keystrokes and AI completions today</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={activityConfig} className="h-[220px] w-full">
              <BarChart data={sessionActivity} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="keystrokes" fill="var(--color-keystrokes)" radius={[2, 2, 0, 0]} opacity={0.3} />
                <Bar dataKey="completions" fill="var(--color-completions)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white font-medium">Peak: 72 completions at 14:00</span>
              <TrendingUp className="size-4 text-green-500" />
            </div>
          </CardFooter>
        </Card>

        {/* Memory Chart */}
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Memory Profile</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Heap and RSS memory over session</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={memoryConfig} className="h-[220px] w-full">
              <AreaChart data={memoryUsage} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <defs>
                  <linearGradient id="fillHeap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area dataKey="rss" type="natural" fill="var(--color-rss)" fillOpacity={0.1} stroke="var(--color-rss)" strokeDasharray="4 4" />
                <Area dataKey="heap" type="natural" fill="url(#fillHeap)" fillOpacity={1} stroke="var(--color-heap)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              No memory leaks detected — heap stable at 42MB
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Active Sessions */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Active Sessions</CardTitle>
            <CardDescription className="text-zinc-500 text-xs mt-1">Running IDE instances and dev environments</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "deepnerd-core", branch: "feat/agent-runtime", files: 847, agents: 2, status: "running", runtime: "2h 14m", cpu: 34, memory: 61 },
            { name: "vault-editor", branch: "main", files: 234, agents: 0, status: "running", runtime: "45m", cpu: 12, memory: 28 },
            { name: "sdk-typescript", branch: "fix/websocket-sync", files: 156, agents: 1, status: "idle", runtime: "12m", cpu: 4, memory: 18 },
          ].map((session) => (
            <div key={session.name} className="p-4 bg-[#111] border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`size-2 rounded-full ${session.status === "running" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
                  <div className="text-sm text-white font-mono flex items-center gap-2">
                    {session.name}
                    <Badge className="bg-zinc-800 text-zinc-500 text-[10px] border-none">
                      <GitBranch className="size-3 mr-1" />{session.branch}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-600 font-mono tabular-nums">{session.runtime}</span>
                  <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white size-8">
                    <Maximize2 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-red-400 size-8">
                    <Square className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                <span>{session.files} files indexed</span>
                <Separator orientation="vertical" className="h-3 bg-zinc-800" />
                <span>{session.agents} agents attached</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-600 font-mono uppercase tracking-widest">CPU</span>
                    <span className="text-zinc-500 tabular-nums">{session.cpu}%</span>
                  </div>
                  <Progress value={session.cpu} className="h-1 bg-zinc-800 [&>div]:bg-white/60" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-600 font-mono uppercase tracking-widest">Memory</span>
                    <span className="text-zinc-500 tabular-nums">{session.memory}%</span>
                  </div>
                  <Progress value={session.memory} className="h-1 bg-zinc-800 [&>div]:bg-white/60" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Multi-Agent Coding",
            description: "Delegate tasks to autonomous agents that operate directly within your codebase with full context awareness.",
            tag: "AI-NATIVE",
          },
          {
            title: "Execution-Aware Debugging",
            description: "Debug with runtime state context. Agents understand execution flow, not just syntax trees.",
            tag: "ADVANCED",
          },
          {
            title: "Cloud Dev Environments",
            description: "Sandboxed, containerized development environments with full isolation and instant provisioning.",
            tag: "INFRASTRUCTURE",
          },
        ].map((feature) => (
          <Card key={feature.title} className="bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700 transition-colors group">
            <CardHeader>
              <Badge className="bg-zinc-800 text-zinc-500 text-[10px] border-none w-fit mb-2 group-hover:bg-zinc-700 group-hover:text-zinc-300 transition-colors">{feature.tag}</Badge>
              <CardTitle className="text-white text-base">{feature.title}</CardTitle>
              <CardDescription className="text-zinc-500 text-xs">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
