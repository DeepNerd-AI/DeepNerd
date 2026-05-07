"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntelligence } from "@/hooks/use-intelligence";

export default function ToolsPage() {
  const { data, loading } = useIntelligence();
  if (loading || !data) return <div className="p-6 text-zinc-400">Loading tool telemetry...</div>;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tools</h1>
        <p className="text-sm text-zinc-500 mt-1">Execution telemetry mapped by API and workflow behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Avg AI Latency" value={`${data.metrics.avgAiLatencyMs}ms`} />
        <Stat label="API Errors (30d)" value={Intl.NumberFormat().format(data.metrics.apiErrors30d)} />
        <Stat label="Token Usage (30d)" value={Intl.NumberFormat().format(data.metrics.tokenTotal30d)} />
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-sm font-mono uppercase text-white">Provider Utilization</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {data.series.providerBreakdown.length === 0 ? (
            <p className="text-sm text-zinc-500">No provider usage recorded yet.</p>
          ) : (
            data.series.providerBreakdown.map((item) => (
              <div key={item.provider} className="flex justify-between border-b border-zinc-800 py-2 text-xs">
                <span className="text-zinc-300">{item.provider}</span>
                <span className="text-white font-mono">{Intl.NumberFormat().format(item.tokens)} tokens</span>
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
