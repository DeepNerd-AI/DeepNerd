"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntelligence } from "@/hooks/use-intelligence";

export default function ApiManagementPage() {
  const { data, loading } = useIntelligence();
  if (loading || !data) return <div className="p-6 text-zinc-400">Loading API platform...</div>;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">API Keys & Platform</h1>
        <p className="text-sm text-zinc-500 mt-1">Live key inventory, request volume, and API reliability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Active Keys" value={String(data.metrics.activeApiKeys)} />
        <Stat label="Requests (30d)" value={Intl.NumberFormat().format(data.metrics.apiRequests30d)} />
        <Stat label="Errors (30d)" value={Intl.NumberFormat().format(data.metrics.apiErrors30d)} />
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Key Registry</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.entities.apiKeys.length === 0 ? (
            <div className="text-sm text-zinc-500">No API keys generated yet.</div>
          ) : (
            data.entities.apiKeys.map((key) => (
              <div key={key.id} className="border border-zinc-800 bg-[#111] p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white">{key.name}</div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-300 text-[10px]">
                    {key.revoked_at ? "revoked" : "active"}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 mt-1 font-mono">{key.key_prefix}••••••••</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {key.scopes?.map((scope) => (
                    <Badge key={scope} className="bg-zinc-800 text-zinc-300 border-none text-[10px]">{scope}</Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-white">Top Error Endpoints</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {data.entities.topErrorPaths.length === 0 ? (
            <p className="text-sm text-zinc-500">No error-heavy endpoints in the selected period.</p>
          ) : (
            data.entities.topErrorPaths.map((row) => (
              <div key={row.path} className="flex justify-between text-xs border-b border-zinc-800 py-2 last:border-0">
                <span className="text-zinc-300 font-mono">{row.path}</span>
                <span className="text-red-400">{row.count}</span>
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
