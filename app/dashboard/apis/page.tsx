"use client"

import { Copy, Plus, Key, Shield, RefreshCw, Trash2, TrendingUp, Lock } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// --- Chart Data ---
const apiTrafficData = [
  { hour: "00:00", requests: 12400, latency: 84 },
  { hour: "02:00", requests: 8200, latency: 72 },
  { hour: "04:00", requests: 5800, latency: 68 },
  { hour: "06:00", requests: 9400, latency: 76 },
  { hour: "08:00", requests: 28600, latency: 112 },
  { hour: "10:00", requests: 42100, latency: 138 },
  { hour: "12:00", requests: 38400, latency: 142 },
  { hour: "14:00", requests: 44800, latency: 148 },
  { hour: "16:00", requests: 36200, latency: 128 },
  { hour: "18:00", requests: 24800, latency: 98 },
  { hour: "20:00", requests: 18200, latency: 88 },
  { hour: "22:00", requests: 14600, latency: 82 },
]

const keyUsageData = [
  { day: "Mon", production: 84200, staging: 12400, local: 3200 },
  { day: "Tue", production: 92100, staging: 14800, local: 2800 },
  { day: "Wed", production: 98400, staging: 16200, local: 3600 },
  { day: "Thu", production: 86800, staging: 11200, local: 2400 },
  { day: "Fri", production: 96300, staging: 15600, local: 4200 },
  { day: "Sat", production: 42100, staging: 4800, local: 1200 },
  { day: "Sun", production: 38500, staging: 3200, local: 800 },
]

const trafficConfig = {
  requests: { label: "Requests", color: "#ffffff" },
} satisfies ChartConfig

const keyUsageConfig = {
  production: { label: "Production", color: "#ffffff" },
  staging: { label: "Staging", color: "#888888" },
  local: { label: "Local", color: "#444444" },
} satisfies ChartConfig

export default function ApiManagementPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">API Keys & Tokens</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your API keys, scopes, and permissions for DeepNerd Vault and Autonomous Agents.</p>
        </div>
        <Button className="bg-white text-black hover:bg-zinc-200 uppercase tracking-widest font-mono text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Generate New Key
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-zinc-500 font-mono uppercase text-[10px] tracking-widest">Active Keys</CardDescription>
            <Key className="size-4 text-zinc-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-white">4</div>
            <p className="text-xs text-zinc-500 font-mono mt-1">1 scoped to IDE, 3 for Agents</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-zinc-500 font-mono uppercase text-[10px] tracking-widest">Requests (30d)</CardDescription>
            <TrendingUp className="size-4 text-zinc-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-white">12.4M</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="size-3 text-green-500" />
              <span className="text-xs text-green-500">↑ 14% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-zinc-500 font-mono uppercase text-[10px] tracking-widest">Rate Limit</CardDescription>
            <Shield className="size-4 text-zinc-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-green-500">Healthy</div>
            <p className="text-xs text-zinc-500 font-mono mt-1">45/500 req/sec (9%)</p>
            <Progress value={9} className="h-1 bg-zinc-800 [&>div]:bg-green-500/60 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Traffic Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">API Traffic (Today)</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Requests per hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trafficConfig} className="h-[220px] w-full">
              <AreaChart data={apiTrafficData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <defs>
                  <linearGradient id="fillTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area dataKey="requests" type="natural" fill="url(#fillTraffic)" stroke="#ffffff" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-zinc-500">Peak: 44.8K req/hr at 14:00</div>
          </CardFooter>
        </Card>

        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Usage by Key</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Daily request volume per API key — last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={keyUsageConfig} className="h-[220px] w-full">
              <BarChart data={keyUsageData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="local" stackId="a" fill="var(--color-local)" />
                <Bar dataKey="staging" stackId="a" fill="var(--color-staging)" />
                <Bar dataKey="production" stackId="a" fill="var(--color-production)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-zinc-500">Production key handles 87% of all traffic</div>
          </CardFooter>
        </Card>
      </div>

      {/* API Keys */}
      <div className="space-y-4">
        {/* Production Key */}
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-zinc-400" />
              <CardTitle className="font-mono uppercase text-sm text-white tracking-widest">Production Agent Key</CardTitle>
            </div>
            <Badge className="bg-green-500/10 text-green-500 text-[10px] border-none">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 space-y-4">
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-2 block">Secret Key</label>
                  <div className="flex gap-2">
                    <Input readOnly value="dn_prod_••••••••••••••••••••••••••••••••" className="font-mono text-zinc-300 bg-[#111] border-zinc-800" />
                    <Button variant="outline" className="border-zinc-800 bg-[#111] hover:bg-zinc-800 w-10 p-0 text-zinc-400">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-6 pt-2">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-1">Created</div>
                    <div className="text-sm text-zinc-300 font-mono">Oct 12, 2025</div>
                  </div>
                  <Separator orientation="vertical" className="h-10 bg-zinc-800" />
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-1">Last Used</div>
                    <div className="text-sm text-zinc-300 font-mono">2 minutes ago</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 md:border-l border-zinc-800 md:pl-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-2 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Scopes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-zinc-800 text-zinc-300 text-[10px] border-none">agent:write</Badge>
                    <Badge className="bg-zinc-800 text-zinc-300 text-[10px] border-none">models:read</Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex-1">
                    <RefreshCw className="w-3 h-3 mr-2" /> Roll
                  </Button>
                  <Button variant="outline" className="border-red-900/50 text-red-500 hover:bg-red-900/20 hover:text-red-400 w-10 p-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inactive Key */}
        <Card className="bg-[#0a0a0a] border-zinc-800 opacity-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-zinc-400" />
              <CardTitle className="font-mono uppercase text-sm text-zinc-300 tracking-widest">Vault IDE Local Key</CardTitle>
            </div>
            <Badge variant="outline" className="border-zinc-700 text-zinc-500 text-[10px]">Inactive</Badge>
          </CardHeader>
          <CardContent>
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-mono mb-2 block">Secret Key</label>
            <Input readOnly value="dn_local_••••••••••••••••••••••••••••••••" className="font-mono text-zinc-500 bg-[#111] border-zinc-800 opacity-50" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
