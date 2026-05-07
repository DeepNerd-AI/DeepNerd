import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { buildUsernameSuggestions, isReservedUsername, isValidUsername, normalizeUsername } from "@/lib/username";

const profileUpdateSchema = z.object({
  username: z.string().optional(),
  display_name: z.string().max(80).optional(),
  bio: z.string().max(400).optional(),
  avatar_url: z.string().url().nullable().optional(),
  notifications_email: z.boolean().optional(),
  notifications_in_app: z.boolean().optional(),
  theme: z.enum(["dark", "light", "system"]).optional(),
  ai_default_model: z.string().max(64).optional(),
  ai_temperature: z.number().min(0).max(2).optional(),
});

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  const { data: settings } = await supabase.from("user_settings").select("*").eq("user_id", user.id).maybeSingle();

  return NextResponse.json({
    profile: profile ?? null,
    settings: settings ?? null,
    user: {
      id: user.id,
      email: user.email,
      avatar_url: user.user_metadata?.avatar_url ?? null,
      full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
    },
  });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = profileUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const profilePatch: Record<string, unknown> = {};
  const settingsPatch: Record<string, unknown> = {};

  if (payload.username !== undefined) {
    const username = normalizeUsername(payload.username);
    if (!isValidUsername(username)) {
      return NextResponse.json({ error: "Invalid username format." }, { status: 400 });
    }
    if (isReservedUsername(username)) {
      return NextResponse.json(
        { error: "Username is reserved.", suggestions: buildUsernameSuggestions(username) },
        { status: 400 },
      );
    }
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .neq("id", user.id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: "Username already exists.", suggestions: buildUsernameSuggestions(username) },
        { status: 409 },
      );
    }
    profilePatch.username = username;
  }

  if (payload.display_name !== undefined) profilePatch.display_name = payload.display_name;
  if (payload.bio !== undefined) profilePatch.bio = payload.bio;
  if (payload.avatar_url !== undefined) profilePatch.avatar_url = payload.avatar_url;

  if (payload.notifications_email !== undefined) settingsPatch.notifications_email = payload.notifications_email;
  if (payload.notifications_in_app !== undefined) settingsPatch.notifications_in_app = payload.notifications_in_app;
  if (payload.theme !== undefined) settingsPatch.theme = payload.theme;
  if (payload.ai_default_model !== undefined) settingsPatch.ai_default_model = payload.ai_default_model;
  if (payload.ai_temperature !== undefined) settingsPatch.ai_temperature = payload.ai_temperature;

  if (Object.keys(profilePatch).length > 0) {
    const { error } = await supabase.from("profiles").update(profilePatch).eq("id", user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (Object.keys(settingsPatch).length > 0) {
    const { error } = await supabase.from("user_settings").upsert({ user_id: user.id, ...settingsPatch }, { onConflict: "user_id" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return GET();
}
