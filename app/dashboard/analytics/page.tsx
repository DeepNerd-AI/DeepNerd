"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useIntelligence } from "@/hooks/use-intelligence";

const requestsConfig = { value: { label: "Requests", color: "#ffffff" } } satisfies ChartConfig;
const tokenConfig = { value: { label: "Tokens", color: "#888888" } } satisfies ChartConfig;
const providerConfig = { tokens: { label: "Tokens", color: "#ffffff" } } satisfies ChartConfig;

export default function AnalyticsPage() {
  const { data, loading, error } = useIntelligence();

  if (loading || !data) {
    return <div className="p-6 text-zinc-400">Loading analytics...</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Analytics</h1>
        <p className="text-xs text-zinc-500 mt-1 font-mono">Live AI, API, and workflow telemetry</p>
      </div>
      {error && <div className="text-xs text-yellow-400 border border-yellow-500/30 bg-yellow-500/5 p-2 rounded">{error}</div>}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Estimated Cost (30d)" value={`$${data.metrics.estimatedCostUsd30d.toFixed(2)}`} />
        <Stat label="Token Usage (30d)" value={Intl.NumberFormat().format(data.metrics.tokenTotal30d)} />
        <Stat label="Avg AI Latency" value={`${data.metrics.avgAiLatencyMs}ms`} />
        <Stat label="Run Success Rate" value={`${data.metrics.runSuccessRate}%`} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader><CardTitle className="text-xs font-mono uppercase text-white">API Requests (7d)</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={requestsConfig} className="h-[220px] w-full">
              <AreaChart data={data.series.requests7d}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area dataKey="value" type="monotone" stroke="#fff" fill="#fff" fillOpacity={0.15} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-zinc-800">
          <CardHeader><CardTitle className="text-xs font-mono uppercase text-white">Token Usage (7d)</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={tokenConfig} className="h-[220px] w-full">
              <AreaChart data={data.series.tokens7d}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area dataKey="value" type="monotone" stroke="#888888" fill="#888888" fillOpacity={0.2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-xs font-mono uppercase text-white">Provider Breakdown (30d)</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={providerConfig} className="h-[240px] w-full">
            <BarChart data={data.series.providerBreakdown}>
              <CartesianGrid vertical={false} stroke="#222" />
              <XAxis dataKey="provider" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="tokens" fill="#fff" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
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
        <div className="text-xl text-white mt-1">{value}</div>
      </CardContent>
    </Card>
  );
}
