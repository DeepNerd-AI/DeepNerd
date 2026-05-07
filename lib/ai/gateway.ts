type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

type ProviderConfig = {
  provider: string;
  baseUrl: string;
  apiKeyEnv: string;
  modelMap?: Record<string, string>;
};

const PROVIDERS: Record<string, ProviderConfig> = {
  openai: { provider: "openai", baseUrl: "https://api.openai.com/v1", apiKeyEnv: "OPENAI_API_KEY" },
  anthropic: { provider: "anthropic", baseUrl: "https://api.anthropic.com/v1", apiKeyEnv: "ANTHROPIC_API_KEY" },
  openrouter: { provider: "openrouter", baseUrl: "https://openrouter.ai/api/v1", apiKeyEnv: "OPENROUTER_API_KEY" },
  groq: { provider: "groq", baseUrl: "https://api.groq.com/openai/v1", apiKeyEnv: "GROQ_API_KEY" },
  together: { provider: "together", baseUrl: "https://api.together.xyz/v1", apiKeyEnv: "TOGETHER_API_KEY" },
  deepseek: { provider: "deepseek", baseUrl: "https://api.deepseek.com/v1", apiKeyEnv: "DEEPSEEK_API_KEY" },
  mistral: { provider: "mistral", baseUrl: "https://api.mistral.ai/v1", apiKeyEnv: "MISTRAL_API_KEY" },
  cohere: { provider: "cohere", baseUrl: "https://api.cohere.ai/compatibility/v1", apiKeyEnv: "COHERE_API_KEY" },
  fireworks: { provider: "fireworks", baseUrl: "https://api.fireworks.ai/inference/v1", apiKeyEnv: "FIREWORKS_API_KEY" },
  huggingface: { provider: "huggingface", baseUrl: "https://router.huggingface.co/v1", apiKeyEnv: "HUGGINGFACE_API_KEY" },
  azure_openai: { provider: "azure_openai", baseUrl: process.env.AZURE_OPENAI_BASE_URL || "", apiKeyEnv: "AZURE_OPENAI_API_KEY" },
  ollama: { provider: "ollama", baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1", apiKeyEnv: "OLLAMA_API_KEY" },
  gemini: { provider: "gemini", baseUrl: process.env.GEMINI_OPENAI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai", apiKeyEnv: "GEMINI_API_KEY" },
};

export type GatewayRequest = {
  providerPriority: string[];
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
};

export async function executeWithFallback(payload: GatewayRequest) {
  const attempts: Array<{ provider: string; error: string }> = [];
  const providers = payload.providerPriority.length ? payload.providerPriority : ["openai", "anthropic", "openrouter"];

  for (const name of providers) {
    const cfg = PROVIDERS[name];
    if (!cfg) continue;
    const key = process.env[cfg.apiKeyEnv];
    if (!key && name !== "ollama") continue;

    try {
      const started = Date.now();
      const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: key ? `Bearer ${key}` : "",
        },
        body: JSON.stringify({
          model: cfg.modelMap?.[payload.model] ?? payload.model,
          messages: payload.messages,
          temperature: payload.temperature ?? 0.2,
          max_tokens: payload.maxTokens ?? 1024,
          stream: Boolean(payload.stream),
        }),
      });

      if (!res.ok) {
        attempts.push({ provider: name, error: `HTTP ${res.status}` });
        continue;
      }

      if (payload.stream) {
        return {
          ok: true as const,
          provider: name,
          latencyMs: Date.now() - started,
          response: res,
          attempts,
        };
      }

      const json = await res.json();
      return {
        ok: true as const,
        provider: name,
        latencyMs: Date.now() - started,
        data: json,
        attempts,
      };
    } catch (error) {
      attempts.push({ provider: name, error: error instanceof Error ? error.message : "Unknown error" });
    }
  }

  return { ok: false as const, attempts };
}
