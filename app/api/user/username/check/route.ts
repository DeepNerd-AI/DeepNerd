import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { buildUsernameSuggestions, isReservedUsername, isValidUsername, normalizeUsername } from "@/lib/username";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rawUsername = searchParams.get("username") ?? "";
  const username = normalizeUsername(rawUsername);

  if (!isValidUsername(username)) {
    return NextResponse.json(
      {
        available: false,
        reason: "Username must be 3-24 characters and can contain lowercase letters, numbers, and underscores only.",
      },
      { status: 400 },
    );
  }

  if (isReservedUsername(username)) {
    return NextResponse.json(
      {
        available: false,
        reason: "This username is reserved.",
        suggestions: buildUsernameSuggestions(username),
      },
      { status: 200 },
    );
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .maybeSingle();

  const available = !existing;
  return NextResponse.json({
    available,
    suggestions: available ? [] : buildUsernameSuggestions(username),
  });
}
