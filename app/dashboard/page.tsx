"use client"

import { TrendingUp, TrendingDown, Activity, Bot, GitBranch, Zap, AlertTriangle, CheckCircle2, Clock, ArrowRight, Terminal, ArrowUpRight, Sparkles } from "lucide-react"
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

// --- Chart Data ---
const apiUsageData = [
  { day: "Mon", requests: 58200, errors: 420 },
  { day: "Tue", requests: 64100, errors: 380 },
  { day: "Wed", requests: 72400, errors: 510 },
  { day: "Thu", requests: 61800, errors: 290 },
  { day: "Fri", requests: 69300, errors: 440 },
  { day: "Sat", requests: 42100, errors: 180 },
  { day: "Sun", requests: 44500, errors: 210 },
]

const tokenUsageData = [
  { month: "Jan", claude: 2400, gpt: 1800, deepnerd: 800 },
  { month: "Feb", claude: 3100, gpt: 2200, deepnerd: 900 },
  { month: "Mar", claude: 2800, gpt: 1900, deepnerd: 1100 },
  { month: "Apr", claude: 3400, gpt: 2500, deepnerd: 1300 },
  { month: "May", claude: 3900, gpt: 2800, deepnerd: 1600 },
  { month: "Jun", claude: 4200, gpt: 3100, deepnerd: 1800 },
]

const executionData = [
  { hour: "00", success: 42, failed: 2 },
  { hour: "04", success: 18, failed: 1 },
  { hour: "08", success: 86, failed: 4 },
  { hour: "12", success: 124, failed: 6 },
  { hour: "16", success: 108, failed: 3 },
  { hour: "20", success: 76, failed: 5 },
]

const apiUsageConfig = {
  requests: { label: "Requests", color: "#ffffff" },
  errors: { label: "Errors", color: "#555555" },
} satisfies ChartConfig

const tokenConfig = {
  claude: { label: "Claude 4", color: "#ffffff" },
  gpt: { label: "GPT-4.5", color: "#888888" },
  deepnerd: { label: "DeepNerd v1", color: "#444444" },
} satisfies ChartConfig

const executionConfig = {
  success: { label: "Success", color: "#ffffff" },
  failed: { label: "Failed", color: "#555555" },
} satisfies ChartConfig

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  const greeting = getGreeting()

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      {/* Greeting Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">{greeting}, Developer</h1>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">Here&apos;s your infrastructure at a glance</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-green-500/30 text-green-500 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-green-500/5">
            <span className="size-1.5 bg-green-500 rounded-full animate-pulse mr-1.5 inline-block" />
            Operational
          </Badge>
        </div>
      </div>

      {/* Compact Metric Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Active Agents", value: "7", change: "+2", up: true, icon: Bot },
          { label: "Executions", value: "2,847", change: "98.2%", up: true, icon: CheckCircle2 },
          { label: "API Requests", value: "412K", change: "-3%", up: false, icon: Activity },
          { label: "Token Usage", value: "1.8M", change: "$24.60", up: false, icon: Zap },
        ].map((m) => (
          <Card key={m.label} className="bg-[#0a0a0a] border-zinc-800/80">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{m.label}</span>
                <m.icon className="size-3.5 text-zinc-700" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-light text-white tabular-nums leading-none">{m.value}</span>
                <span className={`text-[10px] ${m.up ? "text-green-500" : "text-zinc-500"} font-mono`}>{m.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        {/* API Usage Chart */}
        <Card className="bg-[#0a0a0a] border-zinc-800/80 lg:col-span-4">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">API Volume</CardTitle>
              <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px]">7d</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <ChartContainer config={apiUsageConfig} className="h-[200px] w-full">
              <AreaChart data={apiUsageData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#1a1a1a" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <defs>
                  <linearGradient id="fillReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area dataKey="requests" type="monotone" fill="url(#fillReq)" fillOpacity={1} stroke="#ffffff" strokeWidth={1.5} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="px-4 pb-3 pt-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400">Peak 72.4K Wed</span>
              <Separator orientation="vertical" className="h-3 bg-zinc-800" />
              <span className="text-zinc-500">Err 0.52%</span>
            </div>
          </CardFooter>
        </Card>

        {/* Token Usage */}
        <Card className="bg-[#0a0a0a] border-zinc-800/80 lg:col-span-3">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Token Usage</CardTitle>
              <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px]">6mo</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <ChartContainer config={tokenConfig} className="h-[200px] w-full">
              <BarChart data={tokenUsageData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#1a1a1a" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="deepnerd" stackId="a" fill="var(--color-deepnerd)" />
                <Bar dataKey="gpt" stackId="a" fill="var(--color-gpt)" />
                <Bar dataKey="claude" stackId="a" fill="var(--color-claude)" radius={[1, 1, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="px-4 pb-3 pt-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400">9.1M total Jun</span>
              <Separator orientation="vertical" className="h-3 bg-zinc-800" />
              <span className="text-zinc-500">~$247/mo</span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Activity + Sidebar Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Live Activity — wider */}
        <div className="lg:col-span-8 space-y-4">
          <Tabs defaultValue="agents" className="w-full">
            <Card className="bg-[#0a0a0a] border-zinc-800/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3.5 px-4">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Live Activity</CardTitle>
                <TabsList className="bg-[#111] border border-zinc-800 h-7">
                  <TabsTrigger value="agents" className="text-[10px] h-5 px-2.5 data-[state=active]:bg-white data-[state=active]:text-black">Agents</TabsTrigger>
                  <TabsTrigger value="executions" className="text-[10px] h-5 px-2.5 data-[state=active]:bg-white data-[state=active]:text-black">Runs</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <TabsContent value="agents" className="mt-0 space-y-1.5">
                  {[
                    { name: "code-reviewer-v2", task: "PR #847 — auth middleware", model: "claude-4", time: "4m 12s" },
                    { name: "deploy-agent", task: "staging → production", model: "gpt-4.5", time: "1m 38s" },
                    { name: "test-generator", task: "coverage /api/agents", model: "claude-4", time: "2m 55s" },
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between p-2.5 bg-[#111] border border-zinc-800/60 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                        <div>
                          <div className="text-xs text-white font-mono">{agent.name}</div>
                          <div className="text-[10px] text-zinc-600 mt-0.5">{agent.task}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <Badge className="bg-zinc-800/50 text-zinc-500 text-[9px] border-none h-4 px-1.5">{agent.model}</Badge>
                        <span className="text-[10px] text-zinc-600 font-mono tabular-nums">{agent.time}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="executions" className="mt-0 space-y-0.5">
                  {[
                    { id: "exec-2847", pipeline: "CI/CD Deploy", status: "success", time: "2m ago", duration: "34s" },
                    { id: "exec-2846", pipeline: "Code Review", status: "success", time: "8m ago", duration: "1m 12s" },
                    { id: "exec-2845", pipeline: "Security Scan", status: "failed", time: "12m ago", duration: "2m 45s" },
                    { id: "exec-2844", pipeline: "Test Suite", status: "success", time: "18m ago", duration: "4m 02s" },
                  ].map((exec) => (
                    <div key={exec.id} className="flex items-center justify-between py-2 px-2.5 hover:bg-[#111] transition-colors">
                      <div className="flex items-center gap-2.5">
                        {exec.status === "success" ? <CheckCircle2 className="size-3.5 text-green-500/70" /> : <AlertTriangle className="size-3.5 text-red-500/70" />}
                        <div>
                          <div className="text-xs text-white">{exec.pipeline}</div>
                          <div className="text-[10px] text-zinc-700 font-mono">{exec.id}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-zinc-500 font-mono tabular-nums">{exec.duration}</span>
                        <span className="text-[10px] text-zinc-700">{exec.time}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          {/* Execution Chart */}
          <Card className="bg-[#0a0a0a] border-zinc-800/80">
            <CardHeader className="pb-2 pt-3.5 px-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Execution Timeline</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ChartContainer config={executionConfig} className="h-[140px] w-full">
                <BarChart data={executionData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#1a1a1a" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} className="text-[10px]" />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="success" fill="var(--color-success)" radius={[1, 1, 0, 0]} />
                  <Bar dataKey="failed" fill="var(--color-failed)" radius={[1, 1, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Actions */}
          <Card className="bg-[#0a0a0a] border-zinc-800/80">
            <CardHeader className="pb-2 pt-3.5 px-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-1.5">
              {[
                { label: "Launch IDE", icon: Terminal, href: "/dashboard/ide" },
                { label: "Deploy Agent", icon: Bot, href: "/dashboard/agents" },
                { label: "Run Pipeline", icon: GitBranch, href: "/dashboard/automation" },
                { label: "Generate Key", icon: Zap, href: "/dashboard/apis" },
              ].map((a) => (
                <Link key={a.label} href={a.href} className="flex items-center gap-2.5 p-2.5 bg-[#111] border border-zinc-800/60 hover:border-zinc-600 hover:bg-[#151515] transition-all group">
                  <a.icon className="size-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex-1">{a.label}</span>
                  <ArrowUpRight className="size-3 text-zinc-800 group-hover:text-zinc-500 transition-colors" />
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-[#0a0a0a] border-zinc-800/80">
            <CardHeader className="pb-2 pt-3.5 px-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Alerts</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-2">
              <div className="p-2.5 bg-red-500/5 border border-red-500/15">
                <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-1">
                  <AlertTriangle className="size-2.5" /> Critical
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Security scan failed on exec-2845. Rate limit approaching.</p>
                <span className="text-[9px] text-zinc-700 mt-1 block font-mono">12m ago</span>
              </div>
              <div className="p-2.5 bg-yellow-500/5 border border-yellow-500/15">
                <div className="flex items-center gap-1.5 text-yellow-500 text-[10px] font-mono uppercase tracking-widest mb-1">
                  <Clock className="size-2.5" /> Warning
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Token usage at 72% of monthly quota.</p>
                <span className="text-[9px] text-zinc-700 mt-1 block font-mono">1h ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="bg-[#0a0a0a] border-zinc-800/80">
            <CardHeader className="pb-2 pt-3.5 px-4">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Resources</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-3">
              {[
                { label: "CPU", value: 34 },
                { label: "Memory", value: 61 },
                { label: "Storage", value: 28 },
                { label: "Network", value: 45 },
              ].map((r) => (
                <div key={r.label} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-600 font-mono uppercase tracking-widest">{r.label}</span>
                    <span className="text-zinc-500 font-mono tabular-nums">{r.value}%</span>
                  </div>
                  <Progress value={r.value} className="h-1 bg-zinc-800/50 [&>div]:bg-white/40" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
