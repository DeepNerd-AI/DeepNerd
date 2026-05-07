import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { executeWithFallback } from "@/lib/ai/gateway";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  model: z.string().min(1),
  messages: z.array(z.object({ role: z.enum(["system", "user", "assistant"]), content: z.string() })).min(1),
  providerPriority: z.array(z.string()).default(["openai", "anthropic", "openrouter"]),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().positive().max(16384).optional(),
  stream: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });

  const minuteAgo = new Date(Date.now() - 60_000).toISOString();
  const { count: recentCount } = await supabase
    .from("api_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("path", "/api/v1/chat")
    .gte("created_at", minuteAgo);

  if ((recentCount ?? 0) > 120) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again in a moment." }, { status: 429 });
  }

  const payload = parsed.data;
  const result = await executeWithFallback(payload);
  if (!result.ok) {
    await supabase.from("api_logs").insert({
      user_id: user.id,
      method: "POST",
      path: "/api/v1/chat",
      status_code: 503,
      response_ms: 0,
      metadata: { attempts: result.attempts },
    });
    return NextResponse.json({ error: "All providers failed", attempts: result.attempts }, { status: 503 });
  }

  if (payload.stream && "response" in result) {
    await supabase.from("api_logs").insert({
      user_id: user.id,
      method: "POST",
      path: "/api/v1/chat",
      status_code: 200,
      response_ms: result.latencyMs,
      metadata: { provider: result.provider, stream: true, attempts: result.attempts },
    });
    return new Response(result.response.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  const jsonData = "data" in result ? result.data : null;
  const usage = jsonData?.usage;
  await supabase.from("api_logs").insert({
    user_id: user.id,
    method: "POST",
    path: "/api/v1/chat",
    status_code: 200,
    response_ms: result.latencyMs,
    metadata: { provider: result.provider, attempts: result.attempts, model: payload.model },
  });

  await supabase.from("ai_usage_events").insert({
    user_id: user.id,
    provider: result.provider,
    model: payload.model,
    input_tokens: usage?.prompt_tokens ?? 0,
    output_tokens: usage?.completion_tokens ?? 0,
    latency_ms: result.latencyMs,
    request_id: jsonData?.id ?? null,
    metadata: { attempts: result.attempts },
  });

  return NextResponse.json({
    provider: result.provider,
    latencyMs: result.latencyMs,
    attempts: result.attempts,
    data: jsonData,
  });
}
