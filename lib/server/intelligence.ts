import { createClient } from "@/utils/supabase/server";

type CacheValue = {
  expiresAt: number;
  data: unknown;
};

let intelligenceCache = new Map<string, CacheValue>();

function dayKey(dateIso: string) {
  return dateIso.slice(0, 10);
}

function aggregateByDay<T extends { created_at: string }>(
  rows: T[],
  getValue: (row: T) => number,
  days: number,
) {
  const now = new Date();
  const map = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    map.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of rows) {
    const key = dayKey(row.created_at);
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + getValue(row));
  }
  return Array.from(map.entries()).map(([day, value]) => ({ day, value }));
}

export async function getIntelligenceDashboard(userId: string) {
  const cacheKey = `intel:${userId}`;
  const cached = intelligenceCache.get(cacheKey);
  const nowMs = Date.now();
  if (cached && cached.expiresAt > nowMs) return cached.data;

  const supabase = await createClient();
  const start30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const start7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [agentsRes, workflowsRes, runsRes, usageRes, logsRes, keysRes, notificationsRes] = await Promise.all([
    supabase.from("agents").select("id,name,created_at,updated_at").eq("user_id", userId),
    supabase.from("workflows").select("id,name,is_active,created_at,updated_at").eq("user_id", userId),
    supabase.from("automation_runs").select("id,status,created_at,workflow_id,error_message").eq("user_id", userId).gte("created_at", start30d),
    supabase
      .from("ai_usage_events")
      .select("provider,model,input_tokens,output_tokens,total_tokens,latency_ms,created_at")
      .eq("user_id", userId)
      .gte("created_at", start30d),
    supabase
      .from("api_logs")
      .select("status_code,response_ms,created_at,path,method")
      .eq("user_id", userId)
      .gte("created_at", start30d),
    supabase.from("api_keys").select("id,name,key_prefix,scopes,last_used_at,revoked_at,created_at").eq("user_id", userId),
    supabase.from("notifications").select("id,type,title,body,is_read,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(100),
  ]);

  const runs = runsRes.data ?? [];
  const usage = usageRes.data ?? [];
  const logs = logsRes.data ?? [];
  const notifications = notificationsRes.data ?? [];

  const tokenTotal = usage.reduce((sum, row) => sum + (row.total_tokens ?? 0), 0);
  const inputTokens = usage.reduce((sum, row) => sum + (row.input_tokens ?? 0), 0);
  const outputTokens = usage.reduce((sum, row) => sum + (row.output_tokens ?? 0), 0);
  const avgLatency =
    usage.length > 0 ? Math.round(usage.reduce((sum, row) => sum + (row.latency_ms ?? 0), 0) / usage.length) : 0;
  const errorLogs = logs.filter((row) => (row.status_code ?? 0) >= 400).length;
  const successRuns = runs.filter((row) => row.status === "success").length;
  const failedRuns = runs.filter((row) => row.status === "failed").length;

  const providerUsageMap = new Map<string, number>();
  for (const row of usage) {
    const key = row.provider || "unknown";
    providerUsageMap.set(key, (providerUsageMap.get(key) ?? 0) + (row.total_tokens ?? 0));
  }

  const costEstimationUsd =
    usage.reduce((sum, row) => {
      const provider = row.provider?.toLowerCase() ?? "";
      const ratePer1K = provider.includes("openai") ? 0.01 : provider.includes("anthropic") ? 0.012 : 0.008;
      return sum + ((row.total_tokens ?? 0) / 1000) * ratePer1K;
    }, 0) || 0;

  const data = {
    generatedAt: new Date().toISOString(),
    pollingMs: 15000,
    metrics: {
      agents: agentsRes.data?.length ?? 0,
      workflows: workflowsRes.data?.length ?? 0,
      runsTotal30d: runs.length,
      runsSuccess30d: successRuns,
      runsFailed30d: failedRuns,
      tokenTotal30d: tokenTotal,
      apiRequests30d: logs.length,
      apiErrors30d: errorLogs,
      avgAiLatencyMs: avgLatency,
      unreadNotifications: notifications.filter((n) => !n.is_read).length,
      activeApiKeys: (keysRes.data ?? []).filter((k) => !k.revoked_at).length,
      estimatedCostUsd30d: Number(costEstimationUsd.toFixed(2)),
      runSuccessRate: runs.length ? Number(((successRuns / runs.length) * 100).toFixed(2)) : 100,
    },
    series: {
      runs7d: aggregateByDay(
        runs.filter((r) => r.created_at >= start7d),
        () => 1,
        7,
      ),
      requests7d: aggregateByDay(
        logs.filter((r) => r.created_at >= start7d),
        () => 1,
        7,
      ),
      tokens7d: aggregateByDay(
        usage.filter((r) => r.created_at >= start7d),
        (r) => r.total_tokens ?? 0,
        7,
      ),
      inputOutput30d: [
        { label: "input", value: inputTokens },
        { label: "output", value: outputTokens },
      ],
      providerBreakdown: Array.from(providerUsageMap.entries())
        .map(([provider, tokens]) => ({ provider, tokens }))
        .sort((a, b) => b.tokens - a.tokens),
    },
    entities: {
      agents: agentsRes.data ?? [],
      workflows: workflowsRes.data ?? [],
      recentRuns: runs.slice().sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 20),
      apiKeys: keysRes.data ?? [],
      notifications,
      topErrorPaths: Array.from(
        logs
          .filter((row) => (row.status_code ?? 0) >= 400)
          .reduce((map, row) => {
            const key = `${row.method} ${row.path}`;
            map.set(key, (map.get(key) ?? 0) + 1);
            return map;
          }, new Map<string, number>())
          .entries(),
      )
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    },
  };

  intelligenceCache.set(cacheKey, {
    expiresAt: nowMs + 10_000,
    data,
  });

  if (intelligenceCache.size > 200) {
    intelligenceCache = new Map(Array.from(intelligenceCache.entries()).slice(-100));
  }

  return data;
}
