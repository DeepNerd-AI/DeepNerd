import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  const [agentsRes, runsRes, logsRes, tokenRes, recentRunsRes, notificationsRes, profileRes] = await Promise.all([
    supabase.from("agents").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("automation_runs").select("*", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", startOfDay),
    supabase.from("api_logs").select("status_code", { count: "exact" }).eq("user_id", user.id).gte("created_at", last24h),
    supabase.from("ai_usage_events").select("total_tokens").eq("user_id", user.id).gte("created_at", startOfDay),
    supabase
      .from("automation_runs")
      .select("id,status,created_at,error_message")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase.from("notifications").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false),
    supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle(),
  ]);

  const logs = logsRes.data ?? [];
  const requests24h = logsRes.count ?? 0;
  const errors24h = logs.filter((row) => (row.status_code ?? 0) >= 400).length;
  const tokenToday = (tokenRes.data ?? []).reduce((sum, row) => sum + (row.total_tokens ?? 0), 0);
  const runItems = recentRunsRes.data ?? [];
  const successfulRuns = runItems.filter((run) => run.status === "success").length;
  const runSuccessRate = runItems.length > 0 ? Math.round((successfulRuns / runItems.length) * 100) : 100;

  const hasSchemaError = [
    agentsRes.error,
    runsRes.error,
    logsRes.error,
    tokenRes.error,
    recentRunsRes.error,
    notificationsRes.error,
  ].some(Boolean);

  return NextResponse.json(
    {
      greetingName: profileRes.data?.display_name ?? user.email?.split("@")[0] ?? "Developer",
      status: hasSchemaError ? "degraded" : "operational",
      metrics: {
        activeAgents: agentsRes.count ?? 0,
        executionsToday: runsRes.count ?? 0,
        apiRequests24h: requests24h,
        errors24h,
        tokenUsageToday: tokenToday,
        runSuccessRate,
        unreadNotifications: notificationsRes.count ?? 0,
      },
      recentRuns: runItems,
      generatedAt: now.toISOString(),
      pollingMs: 15000,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
