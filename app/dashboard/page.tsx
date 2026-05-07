"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import Link from "next/link";
import { Activity, AlertTriangle, Bot, CheckCircle2, Clock3, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DashboardSummary = {
  greetingName: string;
  status: "operational" | "degraded";
  metrics: {
    activeAgents: number;
    executionsToday: number;
    apiRequests24h: number;
    errors24h: number;
    tokenUsageToday: number;
    runSuccessRate: number;
    unreadNotifications: number;
  };
  recentRuns: Array<{
    id: string;
    status: "queued" | "running" | "success" | "failed" | "cancelled";
    created_at: string;
    error_message: string | null;
  }>;
  generatedAt: string;
  pollingMs: number;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/dashboard/summary", { cache: "no-store" });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Failed to load dashboard.");
      setData(payload);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!data?.pollingMs) return;
    const timer = setInterval(() => {
      void load();
    }, data.pollingMs);
    return () => clearInterval(timer);
  }, [data?.pollingMs]);

  const statusBadge = useMemo(() => {
    if (!data) return null;
    if (data.status === "operational") {
      return (
        <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5 text-[10px] font-mono uppercase tracking-widest">
          <span className="size-1.5 bg-green-400 rounded-full animate-pulse mr-1.5 inline-block" />
          Operational
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 bg-yellow-500/5 text-[10px] font-mono uppercase tracking-widest">
        <span className="size-1.5 bg-yellow-400 rounded-full mr-1.5 inline-block" />
        Degraded
      </Badge>
    );
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="h-24 rounded-xl bg-zinc-900/60 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-zinc-900/60 animate-pulse" />
          ))}
        </div>
        <div className="h-80 rounded-xl bg-zinc-900/60 animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="bg-[#0a0a0a] border-zinc-800 max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-white text-sm uppercase font-mono tracking-widest">Dashboard unavailable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-400">
            <p>{error ?? "Unable to load dashboard metrics."}</p>
            <Button onClick={() => void load(true)} className="bg-white text-black hover:bg-zinc-200">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            {getGreeting()}, {data.greetingName}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">Live infrastructure telemetry (refresh every 15s)</p>
        </div>
        <div className="flex items-center gap-2">
          {statusBadge}
          <Button variant="outline" size="sm" onClick={() => void load(true)} className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
            <RefreshCw className={`size-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-yellow-600/30 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-300">
          Partial refresh issue: {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Active Agents" value={formatNumber(data.metrics.activeAgents)} icon={Bot} />
        <MetricCard label="Executions Today" value={formatNumber(data.metrics.executionsToday)} icon={CheckCircle2} />
        <MetricCard label="API Requests (24h)" value={formatNumber(data.metrics.apiRequests24h)} icon={Activity} />
        <MetricCard label="Tokens Today" value={formatNumber(data.metrics.tokenUsageToday)} icon={Zap} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="bg-[#0a0a0a] border-zinc-800/80 lg:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Recent Runs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.recentRuns.length === 0 ? (
              <div className="rounded-md border border-zinc-800 p-4 text-sm text-zinc-500">
                No runs yet. Start one from{" "}
                <Link href="/dashboard/automation" className="text-white underline underline-offset-2">
                  Automation
                </Link>
                .
              </div>
            ) : (
              data.recentRuns.map((run) => (
                <div key={run.id} className="flex items-center justify-between rounded-md border border-zinc-800 bg-[#111] p-3">
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{run.id}</p>
                    <p className="text-[11px] text-zinc-500">{new Date(run.created_at).toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-300 uppercase text-[10px]">
                    {run.status}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-zinc-800/80 lg:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-white">Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <HealthRow label="Run Success Rate" value={`${data.metrics.runSuccessRate}%`} icon={CheckCircle2} />
            <HealthRow label="Errors (24h)" value={formatNumber(data.metrics.errors24h)} icon={AlertTriangle} />
            <HealthRow label="Unread Notifications" value={formatNumber(data.metrics.unreadNotifications)} icon={Clock3} />
            <div className="pt-2">
              <Link href="/dashboard/notifications" className="text-xs text-white underline underline-offset-2">
                Open notifications
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="bg-[#0a0a0a] border-zinc-800/80">
      <CardContent className="p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{label}</span>
          <Icon className="size-3.5 text-zinc-700" />
        </div>
        <div className="text-xl font-light text-white tabular-nums leading-none">{value}</div>
      </CardContent>
    </Card>
  );
}

function HealthRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-[#111] p-2.5">
      <div className="flex items-center gap-2 text-zinc-300 text-xs">
        <Icon className="size-3.5 text-zinc-500" />
        {label}
      </div>
      <span className="font-mono text-xs text-white">{value}</span>
    </div>
  );
}
