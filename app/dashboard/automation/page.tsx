"use client"

import { GitBranch, Plus, Play, Pause, CheckCircle2, XCircle, Clock, Webhook, Timer, GitCommit, Mail, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
const workflowRunsData = [
  { day: "Mon", cicd: 24, review: 8, scan: 1, sync: 42 },
  { day: "Tue", cicd: 28, review: 12, scan: 1, sync: 45 },
  { day: "Wed", cicd: 32, review: 10, scan: 1, sync: 48 },
  { day: "Thu", cicd: 22, review: 6, scan: 1, sync: 40 },
  { day: "Fri", cicd: 35, review: 14, scan: 1, sync: 50 },
  { day: "Sat", cicd: 8, review: 2, scan: 1, sync: 38 },
  { day: "Sun", cicd: 5, review: 1, scan: 1, sync: 35 },
]

const durationData = [
  { pipeline: "CI/CD", p50: 34, p95: 82 },
  { pipeline: "Review", p50: 68, p95: 142 },
  { pipeline: "Security", p50: 72, p95: 180 },
  { pipeline: "Sync", p50: 12, p95: 28 },
  { pipeline: "Onboard", p50: 45, p95: 98 },
  { pipeline: "Incident", p50: 120, p95: 340 },
]

const workflowConfig = {
  cicd: { label: "CI/CD", color: "#ffffff" },
  review: { label: "Review", color: "#888888" },
  scan: { label: "Scan", color: "#555555" },
  sync: { label: "Sync", color: "#aaaaaa" },
} satisfies ChartConfig

const durationConfig = {
  p50: { label: "P50 (s)", color: "#ffffff" },
  p95: { label: "P95 (s)", color: "#555555" },
} satisfies ChartConfig

export default function AutomationPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Automation</h1>
          <p className="text-sm text-zinc-500 mt-1">Workflow infrastructure — DAG execution, event triggers, retries, branching logic</p>
        </div>
        <Button className="bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-widest">
          <Plus className="size-4 mr-2" /> Create Workflow
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Active Workflows", value: "8", icon: GitBranch },
          { label: "Runs Today", value: "142", icon: Play },
          { label: "Success Rate", value: "96.4%", icon: CheckCircle2, accent: "text-green-500" },
          { label: "Avg Duration", value: "1m 34s", icon: Clock },
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Workflow Runs by Type</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Daily run volume per pipeline — last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={workflowConfig} className="h-[240px] w-full">
              <BarChart data={workflowRunsData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="sync" stackId="a" fill="var(--color-sync)" />
                <Bar dataKey="cicd" stackId="a" fill="var(--color-cicd)" />
                <Bar dataKey="review" stackId="a" fill="var(--color-review)" />
                <Bar dataKey="scan" stackId="a" fill="var(--color-scan)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white font-medium">Sync pipelines are the most active</span>
              <TrendingUp className="size-4 text-green-500" />
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Pipeline Duration</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">P50 and P95 execution time per pipeline (seconds)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={durationConfig} className="h-[240px] w-full">
              <BarChart data={durationData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="pipeline" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="p50" fill="var(--color-p50)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="p95" fill="var(--color-p95)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-zinc-500">
              Incident response has the highest P95 at 340s
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Workflows */}
      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Workflows</CardTitle>
          <CardDescription className="text-zinc-500 text-xs mt-1">Automation pipelines with DAG execution and event-driven triggers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "ci-cd-deploy", trigger: "git push", steps: 6, lastRun: "2m ago", status: "success", runs: 847, successRate: 98.4 },
            { name: "pr-review-pipeline", trigger: "webhook", steps: 4, lastRun: "8m ago", status: "running", runs: 234, successRate: 96.2 },
            { name: "nightly-security-scan", trigger: "cron (0 2 * * *)", steps: 8, lastRun: "6h ago", status: "success", runs: 180, successRate: 99.1 },
            { name: "onboarding-sequence", trigger: "database change", steps: 5, lastRun: "1h ago", status: "success", runs: 56, successRate: 94.6 },
            { name: "incident-response", trigger: "alert", steps: 7, lastRun: "3d ago", status: "idle", runs: 12, successRate: 91.7 },
            { name: "data-sync-pipeline", trigger: "cron (*/15 * * * *)", steps: 3, lastRun: "12m ago", status: "failed", runs: 2400, successRate: 97.8 },
          ].map((wf) => (
            <div key={wf.name} className="p-4 bg-[#111] border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`size-2 rounded-full shrink-0 ${
                    wf.status === "running" ? "bg-green-500 animate-pulse" :
                    wf.status === "failed" ? "bg-red-500" :
                    wf.status === "success" ? "bg-green-500" : "bg-zinc-600"
                  }`} />
                  <span className="text-sm text-white font-mono">{wf.name}</span>
                  <Badge className={`text-[10px] border-none ${
                    wf.status === "running" ? "bg-green-500/10 text-green-500" :
                    wf.status === "failed" ? "bg-red-500/10 text-red-400" :
                    wf.status === "success" ? "bg-green-500/10 text-green-500" :
                    "bg-zinc-800 text-zinc-500"
                  }`}>{wf.status}</Badge>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-zinc-600 font-mono tabular-nums">{wf.lastRun}</span>
                  <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white size-8">
                    <Play className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-zinc-600 mb-3">
                <span className="flex items-center gap-1"><Webhook className="size-3" />{wf.trigger}</span>
                <span>{wf.steps} steps</span>
                <span>{wf.runs.toLocaleString()} total runs</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-600 font-mono uppercase tracking-widest">Success Rate</span>
                  <span className="text-zinc-400 tabular-nums">{wf.successRate}%</span>
                </div>
                <Progress value={wf.successRate} className="h-1 bg-zinc-800 [&>div]:bg-white/60" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trigger Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "Webhook", icon: Webhook, count: 3 },
          { name: "Cron", icon: Timer, count: 4 },
          { name: "Git Push", icon: GitCommit, count: 1 },
          { name: "Email", icon: Mail, count: 0 },
        ].map((trigger) => (
          <Card key={trigger.name} className="bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
            <CardContent className="flex items-center gap-3 p-4">
              <trigger.icon className="size-4 text-zinc-500 group-hover:text-white transition-colors" />
              <div>
                <div className="text-sm text-white">{trigger.name}</div>
                <div className="text-[10px] text-zinc-600 font-mono">{trigger.count} active</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
