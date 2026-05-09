import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { buildUsernameSuggestions, isReservedUsername, isValidUsername, normalizeUsername } from "@/lib/username";

const onboardingSchema = z.object({
  fullName: z.string().min(1).max(100),
  username: z.string().min(3).max(24),
  bio: z.string().max(400).optional().default(""),
  role: z.string().max(100).optional().default(""),
  organization: z.string().max(100).optional().default(""),
  useCase: z.string().max(60).optional().default(""),
  source: z.string().max(60).optional().default(""),
  feedback: z.string().max(500).optional().default(""),
  acceptedTerms: z.literal(true),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = onboardingSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const username = normalizeUsername(payload.username);
  if (!isValidUsername(username)) return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
  if (isReservedUsername(username)) {
    return NextResponse.json({ error: "Username is reserved", suggestions: buildUsernameSuggestions(username) }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Username already exists", suggestions: buildUsernameSuggestions(username) }, { status: 409 });
  }

  const fallbackAvatar =
    (user.user_metadata?.avatar_url as string | undefined) ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.fullName)}&background=111111&color=ffffff`;

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      username,
      display_name: payload.fullName,
      bio: payload.bio,
      role: payload.role,
      organization: payload.organization,
      primary_use_case: payload.useCase,
      avatar_url: fallbackAvatar,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
      referral_source: payload.source,
      onboarding_feedback: payload.feedback,
    },
    { onConflict: "id" },
  );
  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

  const { error: settingsError } = await supabase.from("user_settings").upsert(
    {
      user_id: user.id,
      notifications_email: true,
      notifications_in_app: true,
      theme: "dark",
      ai_default_model: "claude-4",
      ai_temperature: 0.2,
    },
    { onConflict: "user_id" },
  );
  if (settingsError) return NextResponse.json({ error: settingsError.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
