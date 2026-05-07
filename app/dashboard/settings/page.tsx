"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SettingsState = {
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  notifications_email: boolean;
  notifications_in_app: boolean;
  theme: "dark" | "light" | "system";
  ai_default_model: string;
  ai_temperature: number;
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<SettingsState>({
    username: "",
    display_name: "",
    bio: "",
    avatar_url: "",
    notifications_email: true,
    notifications_in_app: true,
    theme: "dark",
    ai_default_model: "claude-4",
    ai_temperature: 0.2,
  });

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/user/profile");
      const payload = await res.json();
      if (!res.ok) {
        toast({ title: "Load failed", description: payload.error ?? "Could not load profile", variant: "destructive" });
        setLoading(false);
        return;
      }
      setState((p) => ({
        ...p,
        username: payload.profile?.username ?? "",
        display_name: payload.profile?.display_name ?? payload.user?.full_name ?? "",
        bio: payload.profile?.bio ?? "",
        avatar_url: payload.profile?.avatar_url ?? payload.user?.avatar_url ?? "",
        notifications_email: payload.settings?.notifications_email ?? true,
        notifications_in_app: payload.settings?.notifications_in_app ?? true,
        theme: payload.settings?.theme ?? "dark",
        ai_default_model: payload.settings?.ai_default_model ?? "claude-4",
        ai_temperature: payload.settings?.ai_temperature ?? 0.2,
      }));
      setLoading(false);
    })();
  }, [toast]);

  async function saveChanges() {
    setSaving(true);
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    const payload = await res.json();
    setSaving(false);
    if (!res.ok) {
      toast({ title: "Save failed", description: payload.error ?? "Unexpected error", variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Settings updated successfully." });
  }

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center text-zinc-400">
        <Loader2 className="size-5 animate-spin mr-2" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your account, notifications, and AI preferences.</p>
      </div>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-sm uppercase tracking-widest font-mono">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Username" value={state.username} onChange={(value) => setState((p) => ({ ...p, username: value }))} />
          <Field label="Display Name" value={state.display_name} onChange={(value) => setState((p) => ({ ...p, display_name: value }))} />
          <Field label="Avatar URL" value={state.avatar_url} onChange={(value) => setState((p) => ({ ...p, avatar_url: value }))} />
          <div className="space-y-2">
            <Label className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Bio</Label>
            <textarea
              className="w-full bg-[#111] border border-zinc-800 text-white p-3 rounded-md min-h-24"
              value={state.bio}
              onChange={(e) => setState((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0a0a0a] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-sm uppercase tracking-widest font-mono">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleRow label="Email Notifications" checked={state.notifications_email} onCheckedChange={(v) => setState((p) => ({ ...p, notifications_email: v }))} />
          <ToggleRow label="In-App Notifications" checked={state.notifications_in_app} onCheckedChange={(v) => setState((p) => ({ ...p, notifications_in_app: v }))} />
          <div className="space-y-2">
            <Label className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Theme</Label>
            <Select value={state.theme} onValueChange={(value: "dark" | "light" | "system") => setState((p) => ({ ...p, theme: value }))}>
              <SelectTrigger className="bg-[#111] border-zinc-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-zinc-800 text-white">
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="Default AI Model" value={state.ai_default_model} onChange={(value) => setState((p) => ({ ...p, ai_default_model: value }))} />
          <Field
            label="AI Temperature (0-2)"
            value={String(state.ai_temperature)}
            onChange={(value) => setState((p) => ({ ...p, ai_temperature: Number(value) || 0 }))}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-white text-black hover:bg-zinc-200" onClick={saveChanges} disabled={saving}>
          {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-zinc-500 uppercase tracking-widest font-mono">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-[#111] border-zinc-800 text-white" />
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
