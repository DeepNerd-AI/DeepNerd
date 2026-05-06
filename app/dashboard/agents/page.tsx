"use client"

import { Bot, Plus, Play, Pause, RotateCcw, Shield, Brain, Wrench, Zap, CheckCircle2, XCircle, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
const agentRunsData = [
  { day: "Mon", success: 42, failed: 3 },
  { day: "Tue", success: 38, failed: 2 },
  { day: "Wed", success: 56, failed: 4 },
  { day: "Thu", success: 48, failed: 1 },
  { day: "Fri", success: 62, failed: 5 },
  { day: "Sat", success: 22, failed: 0 },
  { day: "Sun", success: 18, failed: 1 },
]

const agentTokenData = [
  { agent: "code-reviewer", tokens: 4200 },
  { agent: "deploy-agent", tokens: 2800 },
  { agent: "test-generator", tokens: 3600 },
  { agent: "security-scan", tokens: 1800 },
  { agent: "docs-writer", tokens: 1200 },
  { agent: "refactor-bot", tokens: 900 },
]

const runsConfig = {
  success: { label: "Success", color: "#ffffff" },
  failed: { label: "Failed", color: "#555555" },
} satisfies ChartConfig

const tokenConfig = {
  tokens: { label: "Tokens (K)", color: "#ffffff" },
} satisfies ChartConfig

export default function AgentsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Agents</h1>
          <p className="text-sm text-zinc-500 mt-1">Autonomous workers with planning, execution, state persistence, and tool access</p>
        </div>
        <Button className="bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-widest">
          <Plus className="size-4 mr-2" /> Deploy Agent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Deployed", value: "12", icon: Bot },
          { label: "Running", value: "7", icon: Play, accent: "text-green-500" },
          { label: "Completed (24h)", value: "89", icon: CheckCircle2 },
          { label: "Failed (24h)", value: "3", icon: XCircle, accent: "text-red-400" },
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Agent Runs Chart */}
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Agent Runs This Week</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Daily success vs failure breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={runsConfig} className="h-[220px] w-full">
              <BarChart data={agentRunsData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="success" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white font-medium">286 runs, 94.4% success</span>
              <TrendingUp className="size-4 text-green-500" />
            </div>
          </CardFooter>
        </Card>

        {/* Token Usage per Agent */}
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Token Usage by Agent</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Tokens consumed per agent (thousands)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tokenConfig} className="h-[220px] w-full">
              <BarChart data={agentTokenData} layout="vertical" margin={{ left: 10, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#222" />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="tokens" fill="var(--color-tokens)" radius={[0, 2, 2, 0]} barSize={16} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-zinc-500">
              code-reviewer-v2 is the heaviest token consumer
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Agents List */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Agent Registry</CardTitle>
          <CardDescription className="text-zinc-500 text-xs mt-1">All deployed agent configurations and their current state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "code-reviewer-v2", goal: "Review pull requests for code quality, security, and performance", model: "claude-4", tools: 4, status: "running", memory: "persistent", runs: 234, health: 98 },
            { name: "deploy-agent", goal: "Manage staging and production deployments with rollback", model: "gpt-4.5", tools: 6, status: "running", memory: "session", runs: 89, health: 96 },
            { name: "test-generator", goal: "Generate comprehensive test suites for untested code paths", model: "claude-4", tools: 3, status: "running", memory: "persistent", runs: 156, health: 99 },
            { name: "security-scanner", goal: "Scan repositories for vulnerabilities and outdated dependencies", model: "claude-4", tools: 5, status: "idle", memory: "persistent", runs: 67, health: 100 },
            { name: "docs-writer", goal: "Automatically generate and update API documentation", model: "gpt-4.5", tools: 2, status: "idle", memory: "session", runs: 45, health: 97 },
            { name: "refactor-bot", goal: "Identify and execute safe refactoring opportunities", model: "claude-4", tools: 4, status: "error", memory: "persistent", runs: 23, health: 64 },
          ].map((agent) => (
            <div key={agent.name} className="p-4 bg-[#111] border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`size-2 rounded-full shrink-0 ${
                    agent.status === "running" ? "bg-green-500 animate-pulse" : 
                    agent.status === "error" ? "bg-red-500" : "bg-zinc-600"
                  }`} />
                  <div className="text-sm text-white font-mono flex items-center gap-2 flex-wrap">
                    {agent.name}
                    <Badge className={`text-[10px] border-none ${
                      agent.status === "running" ? "bg-green-500/10 text-green-500" :
                      agent.status === "error" ? "bg-red-500/10 text-red-400" :
                      "bg-zinc-800 text-zinc-500"
                    }`}>{agent.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {agent.status === "running" ? (
                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-yellow-500 size-8">
                      <Pause className="size-4" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-green-500 size-8">
                      <Play className="size-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white size-8">
                    <RotateCcw className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mb-3">{agent.goal}</p>
              <div className="flex items-center gap-3 text-[10px] text-zinc-600 mb-3">
                <span className="flex items-center gap-1"><Brain className="size-3" />{agent.model}</span>
                <Separator orientation="vertical" className="h-3 bg-zinc-800" />
                <span className="flex items-center gap-1"><Wrench className="size-3" />{agent.tools} tools</span>
                <Separator orientation="vertical" className="h-3 bg-zinc-800" />
                <span className="flex items-center gap-1"><Shield className="size-3" />{agent.memory}</span>
                <Separator orientation="vertical" className="h-3 bg-zinc-800" />
                <span className="flex items-center gap-1"><Zap className="size-3" />{agent.runs} runs</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-600 font-mono uppercase tracking-widest">Health</span>
                  <span className={`tabular-nums ${agent.health >= 90 ? "text-green-500" : agent.health >= 70 ? "text-yellow-500" : "text-red-400"}`}>{agent.health}%</span>
                </div>
                <Progress value={agent.health} className={`h-1 bg-zinc-800 ${agent.health >= 90 ? "[&>div]:bg-green-500/60" : agent.health >= 70 ? "[&>div]:bg-yellow-500/60" : "[&>div]:bg-red-500/60"}`} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Agent Architecture Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Agent Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-xs font-mono text-zinc-500">
              {["Identity & Goals", "Memory (persistent / session)", "Tool bindings & permissions", "Model provider selection", "Execution runtime & retries", "State persistence & checkpoints", "Safety & permission layer"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-zinc-800/50 last:border-0">
                  <CheckCircle2 className="size-3 text-green-500/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Runtime Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-xs font-mono text-zinc-500">
              {["Orchestration engine", "Task queue (Redis)", "Tool execution layer", "Memory service (Vector DB)", "State manager", "Retry system", "WebSocket events"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-zinc-800/50 last:border-0">
                  <CheckCircle2 className="size-3 text-green-500/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
