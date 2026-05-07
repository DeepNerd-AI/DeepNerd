"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntelligence } from "@/hooks/use-intelligence";

export default function AgentsPage() {
  const { data, loading } = useIntelligence();
  if (loading || !data) return <div className="p-6 text-zinc-400">Loading agents...</div>;

  const running = data.entities.recentRuns.filter((r) => r.status === "running").length;
  const failed = data.entities.recentRuns.filter((r) => r.status === "failed").length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Agents</h1>
        <p className="text-sm text-zinc-500 mt-1">Runtime state and execution health from live system telemetry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Registered Agents" value={String(data.metrics.agents)} />
        <Stat label="Running" value={String(running)} />
        <Stat label="Failed (recent)" value={String(failed)} />
        <Stat label="Success Rate (30d)" value={`${data.metrics.runSuccessRate}%`} />
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-sm font-mono uppercase text-white">Agent Registry</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.entities.agents.length === 0 ? (
            <p className="text-sm text-zinc-500">No agents deployed yet.</p>
          ) : (
            data.entities.agents.map((agent) => (
              <div key={agent.id} className="p-3 rounded-md border border-zinc-800 bg-[#111] flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{agent.name}</p>
                  <p className="text-[11px] text-zinc-500">Updated {new Date(agent.updated_at).toLocaleString()}</p>
                </div>
                <Badge variant="outline" className="border-zinc-700 text-zinc-300 text-[10px]">active</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-[#0a0a0a] border-zinc-800">
      <CardContent className="p-3.5">
        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{label}</div>
        <div className="text-2xl text-white mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}
