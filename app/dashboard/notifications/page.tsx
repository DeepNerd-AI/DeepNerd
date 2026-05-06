"use client"

import { Bell, CheckCircle2, AlertTriangle, XCircle, Clock, Bot, GitBranch, Key, Shield, Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: "error", title: "Security scan failed", desc: "exec-2845: CVE-2025-3421 detected in dependency tree", time: "12 minutes ago", read: false, icon: XCircle, category: "errors" },
    { id: 2, type: "warning", title: "Rate limit approaching", desc: "Production API key at 85% of rate limit (425/500 req/s)", time: "34 minutes ago", read: false, icon: AlertTriangle, category: "warnings" },
    { id: 3, type: "success", title: "Deploy agent completed", desc: "staging → production rollout successful. All health checks passed.", time: "1 hour ago", read: false, icon: CheckCircle2, category: "deploys" },
    { id: 4, type: "info", title: "Agent approval required", desc: "refactor-bot requesting elevated permissions for /api/auth module", time: "2 hours ago", read: true, icon: Shield, category: "agents" },
    { id: 5, type: "success", title: "Workflow completed", desc: "ci-cd-deploy finished in 34s — 847th successful run", time: "3 hours ago", read: true, icon: GitBranch, category: "deploys" },
    { id: 6, type: "info", title: "New API key generated", desc: "dn_staging_*** created with agent:read, models:read scopes", time: "5 hours ago", read: true, icon: Key, category: "agents" },
    { id: 7, type: "success", title: "Agent deployed", desc: "test-generator-v3 deployed with claude-4 model binding", time: "8 hours ago", read: true, icon: Bot, category: "agents" },
    { id: 8, type: "warning", title: "Token quota warning", desc: "Monthly token usage at 72% (13.2M / 18.4M allocated)", time: "1 day ago", read: true, icon: Clock, category: "warnings" },
  ]

  const renderNotifications = (items: typeof notifications) => (
    <div className="divide-y divide-zinc-800/50">
      {items.map((n) => (
        <div
          key={n.id}
          className={`flex items-start gap-4 p-4 ${!n.read ? "bg-[#111]" : ""} hover:bg-[#151515] transition-colors`}
        >
          <div className={`mt-0.5 shrink-0 ${
            n.type === "error" ? "text-red-400" :
            n.type === "warning" ? "text-yellow-500" :
            n.type === "success" ? "text-green-500" :
            "text-zinc-500"
          }`}>
            <n.icon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${!n.read ? "text-white font-medium" : "text-zinc-400"}`}>{n.title}</span>
              {!n.read && <span className="size-2 bg-white rounded-full shrink-0" />}
            </div>
            <p className="text-xs text-zinc-500 mt-1">{n.desc}</p>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono shrink-0">{n.time}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Notifications</h1>
          <p className="text-sm text-zinc-500 mt-1">Real-time infrastructure events, alerts, and approvals</p>
        </div>
        <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest">
          <Check className="size-4 mr-2" /> Mark All Read
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Unread", value: "3", accent: "text-white" },
          { label: "Errors", value: "1", accent: "text-red-400" },
          { label: "Warnings", value: "2", accent: "text-yellow-500" },
          { label: "Total (7d)", value: "24", accent: "text-zinc-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-[#0a0a0a] border-zinc-800">
            <CardContent className="p-4">
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{s.label}</div>
              <div className={`text-2xl font-light tabular-nums mt-1 ${s.accent}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Notifications */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[#111] border border-zinc-800">
          <TabsTrigger value="all" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">All</TabsTrigger>
          <TabsTrigger value="errors" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Errors</TabsTrigger>
          <TabsTrigger value="warnings" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Warnings</TabsTrigger>
          <TabsTrigger value="agents" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Agents</TabsTrigger>
          <TabsTrigger value="deploys" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Deploys</TabsTrigger>
        </TabsList>

        <Card className="bg-[#0a0a0a] border-zinc-800 mt-4">
          <CardContent className="p-0">
            <TabsContent value="all" className="mt-0">
              {renderNotifications(notifications)}
            </TabsContent>
            <TabsContent value="errors" className="mt-0">
              {renderNotifications(notifications.filter(n => n.category === "errors"))}
            </TabsContent>
            <TabsContent value="warnings" className="mt-0">
              {renderNotifications(notifications.filter(n => n.category === "warnings"))}
            </TabsContent>
            <TabsContent value="agents" className="mt-0">
              {renderNotifications(notifications.filter(n => n.category === "agents"))}
            </TabsContent>
            <TabsContent value="deploys" className="mt-0">
              {renderNotifications(notifications.filter(n => n.category === "deploys"))}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
