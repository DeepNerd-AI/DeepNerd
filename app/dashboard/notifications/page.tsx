"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntelligence } from "@/hooks/use-intelligence";

export default function NotificationsPage() {
  const { data, loading } = useIntelligence();
  const notifications = data?.entities.notifications ?? [];

  const stats = useMemo(() => {
    return {
      unread: notifications.filter((n) => !n.is_read).length,
      errors: notifications.filter((n) => n.type === "error").length,
      warnings: notifications.filter((n) => n.type === "warning").length,
      total: notifications.length,
    };
  }, [notifications]);

  if (loading || !data) return <div className="p-6 text-zinc-400">Loading notifications...</div>;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-sm text-zinc-500 mt-1">Live event feed from platform telemetry.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Unread" value={String(stats.unread)} />
        <Stat label="Errors" value={String(stats.errors)} />
        <Stat label="Warnings" value={String(stats.warnings)} />
        <Stat label="Total" value={String(stats.total)} />
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader><CardTitle className="text-sm font-mono uppercase text-white">Event Feed</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {notifications.length === 0 ? (
            <p className="text-sm text-zinc-500">No notifications available.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="flex items-start justify-between gap-3 border border-zinc-800 bg-[#111] p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white">{n.title}</p>
                    {!n.is_read ? <Badge className="bg-white text-black text-[10px] border-none">new</Badge> : null}
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{n.body}</p>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono shrink-0">{new Date(n.created_at).toLocaleString()}</span>
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
