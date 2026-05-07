"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntelligence } from "@/hooks/use-intelligence";

export default function AutomationPage() {
  const { data, loading } = useIntelligence();
  if (loading || !data) return <div className="p-6 text-zinc-400">Loading workflows...</div>;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Automation</h1>
        <p className="text-sm text-zinc-500 mt-1">Live workflow operations, run states, and execution volume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Workflows" value={String(data.metrics.workflows)} />
        <Stat label="Runs (30d)" value={Intl.NumberFormat().format(data.metrics.runsTotal30d)} />
        <Stat label="Success (30d)" value={Intl.NumberFormat().format(data.metrics.runsSuccess30d)} />
        <Stat label="Failed (30d)" value={Intl.NumberFormat().format(data.metrics.runsFailed30d)} />
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-sm font-mono uppercase text-white">Workflow Registry</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.entities.workflows.length === 0 ? (
            <p className="text-sm text-zinc-500">No workflows configured yet.</p>
          ) : (
            data.entities.workflows.map((wf) => (
              <div key={wf.id} className="p-3 rounded-md border border-zinc-800 bg-[#111] flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{wf.name}</p>
                  <p className="text-[11px] text-zinc-500">Updated {new Date(wf.updated_at).toLocaleString()}</p>
                </div>
                <Badge variant="outline" className="border-zinc-700 text-zinc-300 text-[10px]">
                  {wf.is_active ? "active" : "paused"}
                </Badge>
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
