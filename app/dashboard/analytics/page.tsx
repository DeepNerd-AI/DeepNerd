"use client"

import { TrendingUp, TrendingDown, DollarSign, Zap, Clock, CheckCircle2 } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

// --- Data ---
const costData = [
  { month: "Jan", claude: 98, gpt: 52, deepnerd: 18 },
  { month: "Feb", claude: 112, gpt: 61, deepnerd: 21 },
  { month: "Mar", claude: 105, gpt: 58, deepnerd: 24 },
  { month: "Apr", claude: 128, gpt: 68, deepnerd: 26 },
  { month: "May", claude: 135, gpt: 72, deepnerd: 25 },
  { month: "Jun", claude: 142, gpt: 78, deepnerd: 27 },
]

const latencyData = [
  { hour: "00:00", p50: 82, p95: 240, p99: 480 },
  { hour: "04:00", p50: 76, p95: 210, p99: 420 },
  { hour: "08:00", p50: 118, p95: 340, p99: 680 },
  { hour: "12:00", p50: 142, p95: 420, p99: 840 },
  { hour: "16:00", p50: 128, p95: 380, p99: 720 },
  { hour: "20:00", p50: 96, p95: 280, p99: 560 },
]

const successRateData = [
  { week: "W1", agents: 97.8, workflows: 96.2, tools: 99.1 },
  { week: "W2", agents: 98.4, workflows: 95.8, tools: 99.3 },
  { week: "W3", agents: 96.9, workflows: 97.1, tools: 98.8 },
  { week: "W4", agents: 98.2, workflows: 96.4, tools: 99.4 },
]

const tokenBreakdownData = [
  { month: "Jan", input: 1200, output: 3200 },
  { month: "Feb", input: 1400, output: 3800 },
  { month: "Mar", input: 1300, output: 3500 },
  { month: "Apr", input: 1600, output: 4100 },
  { month: "May", input: 1800, output: 4600 },
  { month: "Jun", input: 1900, output: 5200 },
]

const costConfig = {
  claude: { label: "Claude 4", color: "#ffffff" },
  gpt: { label: "GPT-4.5", color: "#888888" },
  deepnerd: { label: "DeepNerd v1", color: "#444444" },
} satisfies ChartConfig

const latencyConfig = {
  p50: { label: "P50", color: "#ffffff" },
  p95: { label: "P95", color: "#888888" },
  p99: { label: "P99", color: "#444444" },
} satisfies ChartConfig

const successConfig = {
  agents: { label: "Agents", color: "#ffffff" },
  workflows: { label: "Workflows", color: "#888888" },
  tools: { label: "Tools", color: "#cccccc" },
} satisfies ChartConfig

const tokenBreakdownConfig = {
  input: { label: "Input Tokens", color: "#888888" },
  output: { label: "Output Tokens", color: "#ffffff" },
} satisfies ChartConfig

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">Analytics</h1>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">Latency, failures, cost, token usage, bottlenecks</p>
        </div>
        <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px] font-mono">Last 30 days</Badge>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total Cost", value: "$247.80", change: "+12%", up: true, icon: DollarSign },
          { label: "Token Usage", value: "18.4M", change: "+8%", up: true, icon: Zap },
          { label: "Avg Latency", value: "107ms", change: "-14%", up: false, icon: Clock },
          { label: "Success Rate", value: "98.2%", change: "+0.4%", up: true, icon: CheckCircle2 },
        ].map((m) => (
          <Card key={m.label} className="bg-[#0a0a0a] border-zinc-800/80">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{m.label}</span>
                <m.icon className="size-3.5 text-zinc-700" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-light text-white tabular-nums leading-none">{m.value}</span>
                <span className={`text-[10px] ${m.up ? "text-green-500" : "text-green-500"} font-mono`}>{m.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost & Token Charts */}
      <Tabs defaultValue="cost" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-[#111] border border-zinc-800">
            <TabsTrigger value="cost" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Cost</TabsTrigger>
            <TabsTrigger value="tokens" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Tokens</TabsTrigger>
            <TabsTrigger value="latency" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Latency</TabsTrigger>
            <TabsTrigger value="success" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Success Rate</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="cost">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Cost Breakdown by Model</CardTitle>
              <CardDescription className="text-zinc-500 text-xs">Monthly spend across all model providers (USD)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={costConfig} className="h-[260px] w-full">
                <AreaChart data={costData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#222" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <defs>
                    <linearGradient id="fillClaude" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillGpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#888888" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="deepnerd" type="natural" fill="var(--color-deepnerd)" fillOpacity={0.2} stroke="var(--color-deepnerd)" stackId="a" />
                  <Area dataKey="gpt" type="natural" fill="url(#fillGpt)" fillOpacity={1} stroke="var(--color-gpt)" stackId="a" />
                  <Area dataKey="claude" type="natural" fill="url(#fillClaude)" fillOpacity={1} stroke="var(--color-claude)" stackId="a" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium text-white">
                    June total: $247.80 <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-zinc-500">
                    Claude 4 accounts for 57% of total spend
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tokens">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Token Consumption</CardTitle>
              <CardDescription className="text-zinc-500 text-xs">Input vs output tokens by month (thousands)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={tokenBreakdownConfig} className="h-[260px] w-full">
                <BarChart data={tokenBreakdownData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#222" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="input" fill="var(--color-input)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="output" fill="var(--color-output)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium text-white">
                    Output-to-input ratio: 2.74x
                  </div>
                  <div className="flex items-center gap-2 leading-none text-zinc-500">
                    7.1M total tokens consumed in June
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="latency">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Latency Distribution</CardTitle>
              <CardDescription className="text-zinc-500 text-xs">P50, P95, P99 latencies by time of day (ms)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={latencyConfig} className="h-[260px] w-full">
                <LineChart data={latencyData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#222" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line dataKey="p50" type="natural" stroke="var(--color-p50)" strokeWidth={2} dot={false} />
                  <Line dataKey="p95" type="natural" stroke="var(--color-p95)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                  <Line dataKey="p99" type="natural" stroke="var(--color-p99)" strokeWidth={2} dot={false} strokeDasharray="2 2" />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium text-white">
                    Peak P99: 840ms at 12:00 <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-zinc-500">
                    P50 avg: 107ms — well within SLA
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="success">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Success Rate Trends</CardTitle>
              <CardDescription className="text-zinc-500 text-xs">Weekly success rate by system (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={successConfig} className="h-[260px] w-full">
                <LineChart data={successRateData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#222" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis domain={[94, 100]} tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line dataKey="agents" type="natural" stroke="var(--color-agents)" strokeWidth={2} dot={{ fill: "#ffffff", r: 3 }} />
                  <Line dataKey="workflows" type="natural" stroke="var(--color-workflows)" strokeWidth={2} dot={{ fill: "#888888", r: 3 }} />
                  <Line dataKey="tools" type="natural" stroke="var(--color-tools)" strokeWidth={2} dot={{ fill: "#cccccc", r: 3 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium text-white">
                    All systems above 96% SLA target
                  </div>
                  <div className="flex items-center gap-2 leading-none text-zinc-500">
                    Tools leading at 99.4% success rate
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Execution Performance Table */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Execution Performance</CardTitle>
          <CardDescription className="text-zinc-500 text-xs">Detailed breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Agent Runs", total: 2847, success: 2795, failed: 52, rate: 98.2 },
              { label: "Workflow Runs", total: 1420, success: 1368, failed: 52, rate: 96.4 },
              { label: "Tool Invocations", total: 14200, success: 14112, failed: 88, rate: 99.4 },
              { label: "API Requests", total: 412000, success: 411200, failed: 800, rate: 99.8 },
            ].map((row) => (
              <div key={row.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{row.label}</span>
                  <div className="flex items-center gap-4 font-mono tabular-nums">
                    <span className="text-zinc-500">{row.total.toLocaleString()}</span>
                    <span className="text-green-500">{row.success.toLocaleString()} ✓</span>
                    <span className="text-red-400">{row.failed} ✗</span>
                    <span className="text-white w-12 text-right">{row.rate}%</span>
                  </div>
                </div>
                <Progress value={row.rate} className="h-1 bg-zinc-800 [&>div]:bg-white" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Bottlenecks */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Workflow Bottlenecks</CardTitle>
          <CardDescription className="text-zinc-500 text-xs">Steps consuming the most execution time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { workflow: "ci-cd-deploy", step: "Build Docker Image", avgTime: "45s", pct: 42 },
              { workflow: "pr-review-pipeline", step: "AI Code Review", avgTime: "38s", pct: 68 },
              { workflow: "nightly-security-scan", step: "Dependency Audit", avgTime: "1m 12s", pct: 55 },
              { workflow: "data-sync-pipeline", step: "Transform & Load", avgTime: "28s", pct: 78 },
            ].map((b) => (
              <div key={`${b.workflow}-${b.step}`} className="flex items-center gap-4 p-3 bg-[#111] border border-zinc-800">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-mono">{b.step}</div>
                  <div className="text-[10px] text-zinc-600 mt-0.5">{b.workflow}</div>
                </div>
                <div className="w-32">
                  <Progress value={b.pct} className={`h-1.5 bg-zinc-800 ${b.pct > 60 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-white/60"}`} />
                </div>
                <span className="text-xs text-zinc-500 font-mono tabular-nums w-10 text-right">{b.pct}%</span>
                <span className="text-xs text-zinc-500 font-mono tabular-nums w-16 text-right">{b.avgTime}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
