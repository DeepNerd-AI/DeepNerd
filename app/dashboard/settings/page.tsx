"use client";

import { useEffect, useState } from "react";
import { Loader2, Key, Shield, HardDrive, Cpu, Settings, Activity, Zap, Bell, CreditCard, Lock, Users, LockKeyhole, Search, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    // Mock loading state for realism
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  async function saveChanges() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "Configuration Updated", description: "Your settings have been synced to the orchestrator." });
    }, 600);
  }

    // API Keys State
    const [apiKeys, setApiKeys] = useState([
      { id: '1', name: 'Production Agent Key', keySnippet: 'dn_live_xxxxxxxxxxxxx', date: '2d ago' }
    ]);
    const [newKey, setNewKey] = useState<string | null>(null);

    const generateApiKey = () => {
      const generated = "dn_live_" + Math.random().toString(36).substr(2, 24) + Math.random().toString(36).substr(2, 24);
      setNewKey(generated);
      setApiKeys([{ id: Date.now().toString(), name: 'New Generated Key', keySnippet: 'dn_live_xxxxxxxxxxxxx', date: 'Just now' }, ...apiKeys]);
      toast({ title: "API Key Generated", description: "Make sure to copy it now. You won't be able to see it again." });
    };

    if (loading) {
      return (
        <div className="flex h-[60vh] flex-col items-center justify-center text-zinc-400 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-white/10 rounded-full"></div>
            <div className="w-12 h-12 border-2 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">Syncing node state...</div>
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 max-w-[1200px] mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Platform Settings</h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Manage your environment variables, agent permissions, and underlying infrastructure configurations.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row gap-8">
          <TabsList className="flex flex-col h-auto w-full md:w-64 bg-transparent border-r border-white/10 p-0 rounded-none items-start gap-1">
            <div className="px-3 py-2 text-xs font-mono text-zinc-500 mb-2 w-full uppercase tracking-widest">Environment</div>
            <TabButton value="general" icon={Settings} label="General" active={activeTab === "general"} />
            <TabButton value="api-keys" icon={Key} label="API Keys" active={activeTab === "api-keys"} />
            <TabButton value="providers" icon={Cpu} label="Model Providers" active={activeTab === "providers"} />
            <TabButton value="mcp" icon={Zap} label="MCP Integrations" active={activeTab === "mcp"} />
            
            <div className="px-3 py-2 text-xs font-mono text-zinc-500 mt-6 mb-2 w-full uppercase tracking-widest">Agents</div>
            <TabButton value="agent-settings" icon={Activity} label="Agent Settings" active={activeTab === "agent-settings"} />
            <TabButton value="memory" icon={HardDrive} label="Memory Controls" active={activeTab === "memory"} />
            <TabButton value="permissions" icon={Shield} label="Tool Permissions" active={activeTab === "permissions"} />
            <TabButton value="limits" icon={Search} label="Agent Limits" active={activeTab === "limits"} />

            <div className="px-3 py-2 text-xs font-mono text-zinc-500 mt-6 mb-2 w-full uppercase tracking-widest">Workspace</div>
            <TabButton value="notifications" icon={Bell} label="Notifications" active={activeTab === "notifications"} />
            <TabButton value="security" icon={Lock} label="Security" active={activeTab === "security"} />
            <TabButton value="privacy" icon={LockKeyhole} label="Data Privacy" active={activeTab === "privacy"} />
          </TabsList>

          <div className="flex-1 min-w-0 pb-20">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* General Settings */}
              <TabsContent value="general" className="m-0 space-y-6">
                <SectionHeader title="General Preferences" description="Manage your global workspace settings and appearance." />
                <div className="grid gap-6">
                  <SettingsCard title="Profile Configuration">
                    <div className="grid gap-4 max-w-xl">
                      <Field label="Workspace Name" defaultValue="DeepNerd Alpha" />
                      <Field label="Admin Contact" defaultValue="admin@deepnerd.tech" />
                      <div className="space-y-2">
                        <Label className="text-xs text-zinc-400 uppercase font-mono">Theme System</Label>
                        <Select defaultValue="dark">
                          <SelectTrigger className="bg-black border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/10 text-white">
                            <SelectItem value="dark">Cinematic Dark</SelectItem>
                            <SelectItem value="light">High Contrast Light</SelectItem>
                            <SelectItem value="system">Follow System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SettingsCard>
                </div>
              </TabsContent>

              {/* API Keys Settings */}
              <TabsContent value="api-keys" className="m-0 space-y-6">
                <SectionHeader title="API Keys" description="Manage access tokens for programmatic access to the DeepNerd ecosystem." />
                
                {newKey && (
                  <div className="p-4 mb-4 border border-green-500/50 bg-green-500/10 rounded-lg space-y-2 animate-in fade-in slide-in-from-top-4">
                    <div className="text-sm font-medium text-green-400">New API Key Generated</div>
                    <div className="text-xs text-green-500/80 mb-2">Please copy this key now. You will not be able to see it again.</div>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 bg-black border border-green-500/30 p-2 text-green-400 font-mono text-xs rounded break-all select-all">
                        {newKey}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        navigator.clipboard.writeText(newKey);
                        toast({ title: "Copied!", description: "API key copied to clipboard" });
                      }} className="border-green-500/30 text-green-400 hover:bg-green-500/20 bg-transparent shrink-0">
                        Copy
                      </Button>
                    </div>
                  </div>
                )}

                <SettingsCard title="Active Keys">
                  <div className="space-y-4">
                    {apiKeys.map((key) => (
                      <div key={key.id} className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
                        <div>
                          <div className="text-sm font-medium text-white">{key.name}</div>
                          <div className="text-xs text-zinc-500 font-mono mt-1">{key.keySnippet} • Created {key.date}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-white/10 bg-transparent hover:bg-white/5">Edit</Button>
                          <Button variant="outline" size="sm" onClick={() => setApiKeys(apiKeys.filter(k => k.id !== key.id))} className="border-red-900/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 bg-transparent">Revoke</Button>
                        </div>
                      </div>
                    ))}
                    <Button onClick={generateApiKey} className="w-full bg-white text-black hover:bg-zinc-200 mt-4">Generate New API Key</Button>
                  </div>
                </SettingsCard>
              </TabsContent>

            {/* Model Providers */}
            <TabsContent value="providers" className="m-0 space-y-6">
              <SectionHeader title="Model Providers" description="Configure your LLM endpoints and routing logic." />
              <SettingsCard title="Primary Providers">
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-white">Anthropic API</Label>
                        <p className="text-xs text-zinc-500">Claude 3.5 Sonnet is recommended for core agent tasks.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Input type="password" value="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx" className="bg-black border-white/10 font-mono text-xs" readOnly />
                  </div>
                  <div className="h-px bg-white/5 w-full" />
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm text-white">OpenAI API</Label>
                        <p className="text-xs text-zinc-500">GPT-4o fallback and specialized parsing tasks.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Input type="password" placeholder="sk-proj-..." className="bg-black border-white/10 font-mono text-xs" />
                  </div>
                </div>
              </SettingsCard>
            </TabsContent>

            {/* MCP Integrations */}
            <TabsContent value="mcp" className="m-0 space-y-6">
              <SectionHeader title="MCP Integrations" description="Manage Model Context Protocol servers connected to your agents." />
              <SettingsCard title="Configured Servers">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white flex items-center gap-2">
                          shadcn_builder <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 font-mono">ONLINE</span>
                        </div>
                        <div className="text-xs text-zinc-500">Provides UI generation primitives.</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/10">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-black">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Database className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white flex items-center gap-2">
                          postgres_connector <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-zinc-400 font-mono">IDLE</span>
                        </div>
                        <div className="text-xs text-zinc-500">Direct DB access for analytics agents.</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/10">Configure</Button>
                  </div>
                  <Button variant="outline" className="w-full border-dashed border-white/20 hover:bg-white/5 hover:border-white/40">
                    + Add MCP Server
                  </Button>
                </div>
              </SettingsCard>
            </TabsContent>

            {/* Tool Permissions */}
            <TabsContent value="permissions" className="m-0 space-y-6">
              <SectionHeader title="Tool Permissions" description="Control what actions autonomous agents are allowed to perform." />
              <SettingsCard title="Execution Boundaries">
                <div className="space-y-6">
                  <ToggleRow label="Allow File System Write (Local)" description="Agents can modify local files without human confirmation." checked={false} />
                  <div className="h-px bg-white/5 w-full" />
                  <ToggleRow label="Allow Shell Execution" description="Agents can run terminal commands. Highly dangerous." checked={false} />
                  <div className="h-px bg-white/5 w-full" />
                  <ToggleRow label="Allow External Network Requests" description="Agents can fetch data from external APIs." checked={true} />
                  <div className="h-px bg-white/5 w-full" />
                  <ToggleRow label="Require Human-in-the-loop for Deletions" description="Block any destructive operations until manually approved." checked={true} />
                </div>
              </SettingsCard>
            </TabsContent>
            
            {/* Memory Controls */}
            <TabsContent value="memory" className="m-0 space-y-6">
              <SectionHeader title="Memory Controls" description="Configure long-term agent memory and vector storage." />
              <SettingsCard title="Vector Database">
                <div className="grid gap-4 max-w-xl">
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 uppercase font-mono">Storage Provider</Label>
                    <Select defaultValue="pinecone">
                      <SelectTrigger className="bg-black border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10 text-white">
                        <SelectItem value="pinecone">Pinecone (Serverless)</SelectItem>
                        <SelectItem value="pgvector">Supabase pgvector</SelectItem>
                        <SelectItem value="local">Local ChromaDB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="border-red-900/30 text-red-400 hover:bg-red-950/30 mt-4 max-w-xs">
                    Wipe Agent Memory Cache
                  </Button>
                </div>
              </SettingsCard>
            </TabsContent>

            {/* Placeholder for other tabs to prevent blank screens */}
            {["agent-settings", "limits", "notifications", "security", "privacy"].includes(activeTab) && (
              <TabsContent value={activeTab} className="m-0">
                <SectionHeader title={activeTab.replace('-', ' ').toUpperCase()} description="Configuration module loading..." />
                <div className="h-64 border border-white/5 border-dashed rounded-xl flex items-center justify-center text-zinc-500 font-mono text-sm">
                  // {activeTab}_module_ui not yet compiled
                </div>
              </TabsContent>
            )}

            <div className="mt-8 flex justify-end">
               <Button className="bg-white text-black hover:bg-zinc-200 px-8" onClick={saveChanges} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Synchronize State
              </Button>
            </div>
          </motion.div>
        </div>
      </Tabs>
    </div>
  );
}

function TabButton({ value, icon: Icon, label, active }: { value: string; icon: any; label: string; active: boolean }) {
  return (
    <TabsTrigger 
      value={value} 
      className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-white/10 data-[state=active]:text-white text-zinc-400 hover:bg-white/5 hover:text-zinc-200 shadow-none border-none`}
    >
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-zinc-500'}`} />
      {label}
    </TabsTrigger>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="bg-black/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
      <CardHeader className="border-b border-white/5 bg-white/[0.02] px-6 py-4">
        <CardTitle className="text-white text-xs uppercase tracking-widest font-mono flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-zinc-400 uppercase tracking-widest font-mono">{label}</Label>
      <Input defaultValue={defaultValue} className="bg-black border-white/10 text-white focus-visible:ring-1 focus-visible:ring-white/30" />
    </div>
  );
}

function ToggleRow({ label, description, checked }: { label: string; description?: string; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        {description && <div className="text-xs text-zinc-500 mt-1">{description}</div>}
      </div>
      <Switch defaultChecked={checked} />
    </div>
  );
}
