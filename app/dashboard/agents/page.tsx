"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntelligence } from "@/hooks/use-intelligence";
import { AgentTerminal } from "@/components/ui/agent-terminal";
import { Button } from "@/components/ui/button";
import { Settings, Play } from "lucide-react";

export default function AgentsPage() {
  const { data, loading } = useIntelligence();
  if (loading || !data) return <div className="p-6 text-zinc-400">Loading agents...</div>;

  const running = data.entities.recentRuns.filter((r) => r.status === "running").length;
  const failed = data.entities.recentRuns.filter((r) => r.status === "failed").length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Agent Operations</h1>
        <p className="text-sm text-zinc-500 mt-1">Runtime state, execution health, and direct agent communication.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Deployed Nodes" value={String(data.metrics.agents)} />
        <Stat label="Active Execution" value={String(running)} />
        <Stat label="Fault State" value={String(failed)} />
        <Stat label="Reliability" value={`${data.metrics.runSuccessRate}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#0a0a0a] border-white/10 h-full">
            <CardHeader className="border-b border-white/5 bg-white/[0.02]">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex justify-between items-center">
                <span>Node Registry</span>
                <Badge variant="outline" className="border-white/10 text-zinc-500 text-[10px]">LIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {data.entities.agents.length === 0 ? (
                <p className="text-sm font-mono text-zinc-600 p-4 text-center border border-dashed border-white/10">No active nodes.</p>
              ) : (
                data.entities.agents.map((agent, i) => (
                  <div key={agent.id} className={`p-4 rounded border ${i === 0 ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/10 bg-black'} flex flex-col gap-3 group hover:border-white/20 transition-colors cursor-pointer`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-mono text-white flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
                          {agent.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mt-1">ID: {agent.id.substring(0,8)}</p>
                      </div>
                      <Badge variant="outline" className={`${i === 0 ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-white/10 text-zinc-500 bg-transparent'} text-[10px] font-mono`}>
                        {i === 0 ? 'ACTIVE' : 'IDLE'}
                      </Badge>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="w-full h-7 text-[10px] font-mono border-white/10 hover:bg-white/10">
                        <Play className="w-3 h-3 mr-1" /> Connect
                      </Button>
                      <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-[10px] font-mono border-white/10 hover:bg-white/10">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
           <AgentTerminal agentId={data.entities.agents[0]?.id || "UNKNOWN_NODE"} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-black border-white/10 shadow-lg">
      <CardContent className="p-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-16 h-16 bg-white/5 rounded-bl-full -mr-8 -mt-8" />
        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest relative z-10">{label}</div>
        <div className="text-2xl text-white font-mono mt-2 relative z-10">{value}</div>
      </CardContent>
    </Card>
  );
}
