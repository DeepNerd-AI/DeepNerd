import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getIntelligenceDashboard } from "@/lib/server/intelligence";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await getIntelligenceDashboard(user.id);
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}
