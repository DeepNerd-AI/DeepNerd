"use client"

import { User, Shield, Key, CreditCard, Users, Globe, Lock, Database, Server, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your profile, workspace, security, and integrations</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#111] border border-zinc-800 w-full justify-start">
          <TabsTrigger value="profile" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Profile</TabsTrigger>
          <TabsTrigger value="security" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Security</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs data-[state=active]:bg-white data-[state=active]:text-black">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="size-4 text-zinc-500" />
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Display Name</Label>
                  <Input id="name" defaultValue="Developer" className="bg-[#111] border-zinc-800 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Email</Label>
                  <Input id="email" defaultValue="dev@deepnerd.tech" className="bg-[#111] border-zinc-800 text-white" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspace" className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Workspace</Label>
                <Input id="workspace" defaultValue="deepnerd-core" className="bg-[#111] border-zinc-800 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="bg-[#111] border-zinc-800 text-white">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-zinc-800 text-white">
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                    <SelectItem value="cet">CET (Central European Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-zinc-800" />
              <div className="flex justify-end">
                <Button className="bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-widest">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-zinc-500" />
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-zinc-800/50">
              <div className="flex items-center justify-between py-4 first:pt-0">
                <div>
                  <div className="text-sm text-white">Two-Factor Authentication</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Add an extra layer of security to your account</div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm text-white">Session Timeout</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Auto-logout after inactivity</div>
                </div>
                <Select defaultValue="30m">
                  <SelectTrigger className="bg-[#111] border-zinc-800 text-white w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-zinc-800 text-white">
                    <SelectItem value="15m">15 minutes</SelectItem>
                    <SelectItem value="30m">30 minutes</SelectItem>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm text-white">Active Sessions</div>
                  <div className="text-xs text-zinc-500 mt-0.5">3 active sessions across 2 devices</div>
                </div>
                <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white text-xs">Manage</Button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm text-white">Audit Log</div>
                  <div className="text-xs text-zinc-500 mt-0.5">View all security events and account activity</div>
                </div>
                <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white text-xs">View Log</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card className="bg-[#0a0a0a] border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Preferences</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Configure your workspace behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-zinc-800/50">
              <div className="flex items-center justify-between py-4 first:pt-0">
                <div>
                  <div className="text-sm text-white">Email Notifications</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Receive email alerts for critical events</div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-white" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm text-white">Agent Auto-Approve</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Skip manual approval for low-risk agent actions</div>
                </div>
                <Switch className="data-[state=checked]:bg-white" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm text-white">Default Model</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Primary model for agent deployments</div>
                </div>
                <Select defaultValue="claude-4">
                  <SelectTrigger className="bg-[#111] border-zinc-800 text-white w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-zinc-800 text-white">
                    <SelectItem value="claude-4">Claude 4</SelectItem>
                    <SelectItem value="gpt-4.5">GPT-4.5</SelectItem>
                    <SelectItem value="deepnerd-v1">DeepNerd v1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="text-sm text-white">Telemetry</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Send anonymous usage data to improve DeepNerd</div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-white" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Settings Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "API Keys", desc: "Manage API keys, scopes, and permissions", icon: Key, href: "/dashboard/apis" },
          { title: "Team", desc: "Invite members and manage roles", icon: Users, href: "/dashboard/settings" },
          { title: "Billing", desc: "Usage, invoices, and plan management", icon: CreditCard, href: "/dashboard/settings" },
          { title: "Integrations", desc: "Connected services and OAuth apps", icon: Globe, href: "/dashboard/settings" },
          { title: "Models", desc: "Configure model providers and keys", icon: Database, href: "/dashboard/settings" },
          { title: "Environments", desc: "Manage deployment environments and secrets", icon: Server, href: "/dashboard/settings" },
        ].map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer group">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-2 bg-[#111] border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  <item.icon className="size-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">{item.title}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{item.desc}</div>
                </div>
                <ChevronRight className="size-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Danger Zone */}
      <Card className="bg-[#0a0a0a] border-red-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-red-400" />
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-red-400">Danger Zone</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white">Delete Workspace</div>
              <div className="text-xs text-zinc-500 mt-0.5">Permanently delete this workspace and all associated data</div>
            </div>
            <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs">
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
