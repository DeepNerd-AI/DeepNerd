"use client";

import { useCallback, useEffect, useState } from "react";

export type IntelligencePayload = {
  generatedAt: string;
  pollingMs: number;
  metrics: {
    agents: number;
    workflows: number;
    runsTotal30d: number;
    runsSuccess30d: number;
    runsFailed30d: number;
    tokenTotal30d: number;
    apiRequests30d: number;
    apiErrors30d: number;
    avgAiLatencyMs: number;
    unreadNotifications: number;
    activeApiKeys: number;
    estimatedCostUsd30d: number;
    runSuccessRate: number;
  };
  series: {
    runs7d: Array<{ day: string; value: number }>;
    requests7d: Array<{ day: string; value: number }>;
    tokens7d: Array<{ day: string; value: number }>;
    inputOutput30d: Array<{ label: string; value: number }>;
    providerBreakdown: Array<{ provider: string; tokens: number }>;
  };
  entities: {
    agents: Array<{ id: string; name: string; created_at: string; updated_at: string }>;
    workflows: Array<{ id: string; name: string; is_active: boolean; created_at: string; updated_at: string }>;
    recentRuns: Array<{ id: string; status: string; created_at: string; workflow_id: string | null; error_message: string | null }>;
    apiKeys: Array<{ id: string; name: string; key_prefix: string; scopes: string[]; last_used_at: string | null; revoked_at: string | null; created_at: string }>;
    notifications: Array<{ id: string; type: string; title: string; body: string; is_read: boolean; created_at: string }>;
    topErrorPaths: Array<{ path: string; count: number }>;
  };
};

export function useIntelligence() {
  const [data, setData] = useState<IntelligencePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/intelligence", { cache: "no-store" });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Failed to fetch intelligence.");
      setData(payload);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch intelligence.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!data?.pollingMs) return;
    const timer = setInterval(() => {
      void refresh();
    }, data.pollingMs);
    return () => clearInterval(timer);
  }, [data?.pollingMs, refresh]);

  return { data, loading, error, refresh };
}
