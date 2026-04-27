import type * as PageTree from "fumadocs-core/page-tree"

export type DocsEntry = {
  slug: string[]
  title: string
  description: string
  markdown: string
  category: string
  lastUpdated: string
}

type PageDef = {
  title: string
  slug: string[]
  description: string
  category: string
}

const PAGE_DEFS: PageDef[] = [
  { title: "DeepNerd Documentation", slug: [], description: "Platform docs for Vault IDE, Agents, DeepNerd API, and developer workflows.", category: "Getting Started" },

  { title: "What is DeepNerd?", slug: ["getting-started", "what-is-deepnerd"], description: "Understand DeepNerd as an AI developer platform.", category: "Getting Started" },
  { title: "Why DeepNerd?", slug: ["getting-started", "why-deepnerd"], description: "Why teams adopt DeepNerd for AI-native development.", category: "Getting Started" },
  { title: "Platform Overview", slug: ["getting-started", "platform-overview"], description: "High-level view of products and workflows.", category: "Getting Started" },
  { title: "Quickstart", slug: ["getting-started", "quickstart"], description: "Get running quickly in a local project.", category: "Getting Started" },
  { title: "Your First AI Request", slug: ["getting-started", "first-ai-request"], description: "Send your first request to DeepNerd API.", category: "Getting Started" },
  { title: "Setting up API Keys", slug: ["getting-started", "api-keys"], description: "Generate and manage API keys securely.", category: "Getting Started" },
  { title: "Using DeepNerd with your project", slug: ["getting-started", "use-with-project"], description: "Integrate DeepNerd with an existing app.", category: "Getting Started" },

  { title: "How DeepNerd Works", slug: ["core-concepts", "how-deepnerd-works"], description: "Core architecture and interaction model.", category: "Core Concepts" },
  { title: "Models & Intelligence Layer", slug: ["core-concepts", "models-and-intelligence-layer"], description: "Model routing, selection, and behavior.", category: "Core Concepts" },
  { title: "Agents vs IDE vs API", slug: ["core-concepts", "agents-vs-ide-vs-api"], description: "When to use each DeepNerd product layer.", category: "Core Concepts" },
  { title: "AI Workflows", slug: ["core-concepts", "ai-workflows"], description: "Designing practical developer AI flows.", category: "Core Concepts" },
  { title: "Prompting Basics for Developers", slug: ["core-concepts", "prompting-basics"], description: "Prompt design patterns for coding tasks.", category: "Core Concepts" },
  { title: "Streaming & Responses", slug: ["core-concepts", "streaming-and-responses"], description: "Response modes, streaming, and structured output.", category: "Core Concepts" },
  { title: "Token Usage & Limits", slug: ["core-concepts", "token-usage-and-limits"], description: "Token accounting, limits, and optimization.", category: "Core Concepts" },

  { title: "What is Vault IDE?", slug: ["products", "vault-ide", "what-is-vault-ide"], description: "Overview of Vault IDE and its role.", category: "Vault IDE" },
  { title: "Key Features", slug: ["products", "vault-ide", "key-features"], description: "Feature breakdown of Vault IDE.", category: "Vault IDE" },
  { title: "AI in the Editor", slug: ["products", "vault-ide", "ai-in-editor"], description: "In-editor AI workflows for coding.", category: "Vault IDE" },
  { title: "Code Generation", slug: ["products", "vault-ide", "code-generation"], description: "Generate components, functions, and tests.", category: "Vault IDE" },
  { title: "Debugging with AI", slug: ["products", "vault-ide", "debugging-with-ai"], description: "AI-assisted debugging and root-cause analysis.", category: "Vault IDE" },
  { title: "AI Autocomplete & Refactor", slug: ["products", "vault-ide", "autocomplete-and-refactor"], description: "Autocomplete and safe refactor flows.", category: "Vault IDE" },
  { title: "Working with Projects", slug: ["products", "vault-ide", "working-with-projects"], description: "Project indexing and context handling.", category: "Vault IDE" },
  { title: "Future: Extensions System", slug: ["products", "vault-ide", "extensions-system"], description: "Planned extension architecture for Vault IDE.", category: "Vault IDE" },

  { title: "What are DeepNerd Agents?", slug: ["products", "deepagents", "what-are-agents"], description: "Agent capabilities and mental model.", category: "AI Agents" },
  { title: "Creating Your First Agent", slug: ["products", "deepagents", "first-agent"], description: "Create and run your first coding agent.", category: "AI Agents" },
  { title: "Agent Workflows", slug: ["products", "deepagents", "agent-workflows"], description: "Workflow composition for agent tasks.", category: "AI Agents" },
  { title: "Task Automation", slug: ["products", "deepagents", "task-automation"], description: "Automating repetitive development tasks.", category: "AI Agents" },
  { title: "Multi-step Reasoning", slug: ["products", "deepagents", "multi-step-reasoning"], description: "Reasoning chains for complex tasks.", category: "AI Agents" },
  { title: "File System Access", slug: ["products", "deepagents", "file-system-access"], description: "Read/write boundaries and safety controls.", category: "AI Agents" },
  { title: "Memory & Context Handling", slug: ["products", "deepagents", "memory-and-context"], description: "How agent memory and context windows work.", category: "AI Agents" },

  { title: "DeepNerd API Overview", slug: ["products", "deepapi", "overview"], description: "API capabilities and integration model.", category: "DeepNerd API" },
  { title: "Authentication", slug: ["products", "deepapi", "authentication"], description: "Authenticate requests to DeepNerd API.", category: "DeepNerd API" },
  { title: "Making Your First Request", slug: ["products", "deepapi", "first-request"], description: "Send your first API call.", category: "DeepNerd API" },
  { title: "Streaming Responses", slug: ["products", "deepapi", "streaming-responses"], description: "Enable and consume streaming responses.", category: "DeepNerd API" },
  { title: "Rate Limits", slug: ["products", "deepapi", "rate-limits"], description: "Rate limit behavior and mitigation.", category: "DeepNerd API" },
  { title: "Error Handling", slug: ["products", "deepapi", "error-handling"], description: "Error payloads and retry strategy.", category: "DeepNerd API" },

  { title: "Authentication (Reference)", slug: ["api-reference", "authentication"], description: "Reference auth requirements.", category: "API Reference" },
  { title: "Base URL", slug: ["api-reference", "base-url"], description: "Base URL and environment variants.", category: "API Reference" },
  { title: "Request Format", slug: ["api-reference", "request-format"], description: "Headers and payload structure.", category: "API Reference" },
  { title: "/chat", slug: ["api-reference", "endpoints", "chat"], description: "Chat completions endpoint reference.", category: "API Endpoints" },
  { title: "/agents", slug: ["api-reference", "endpoints", "agents"], description: "Run agent workflows endpoint reference.", category: "API Endpoints" },
  { title: "/code", slug: ["api-reference", "endpoints", "code"], description: "Code generation and refactor endpoint.", category: "API Endpoints" },
  { title: "/models", slug: ["api-reference", "endpoints", "models"], description: "Available models and capabilities endpoint.", category: "API Endpoints" },

  { title: "JavaScript SDK", slug: ["sdks-and-integrations", "javascript-sdk"], description: "Use DeepNerd SDK in JS/TS apps.", category: "SDKs & Integrations" },
  { title: "Python SDK", slug: ["sdks-and-integrations", "python-sdk"], description: "Use DeepNerd SDK in Python apps.", category: "SDKs & Integrations" },
  { title: "REST API Usage", slug: ["sdks-and-integrations", "rest-api-usage"], description: "Direct REST integration patterns.", category: "SDKs & Integrations" },
  { title: "CLI (future)", slug: ["sdks-and-integrations", "cli-future"], description: "Planned DeepNerd CLI tooling.", category: "SDKs & Integrations" },
  { title: "GitHub Integration", slug: ["sdks-and-integrations", "github-integration"], description: "Integrate with GitHub workflows.", category: "SDKs & Integrations" },
  { title: "IDE Integrations", slug: ["sdks-and-integrations", "ide-integrations"], description: "Connect DeepNerd with IDE environments.", category: "SDKs & Integrations" },
  { title: "Vercel / Deployment integrations (future)", slug: ["sdks-and-integrations", "vercel-deployment-future"], description: "Planned deployment integrations.", category: "SDKs & Integrations" },

  { title: "Build a Chat App", slug: ["guides", "build-chat-app"], description: "Guide to building a chat application.", category: "Guides" },
  { title: "Build a Coding Agent", slug: ["guides", "build-coding-agent"], description: "Guide to building an autonomous coding agent.", category: "Guides" },
  { title: "Use AI in Your IDE Workflow", slug: ["guides", "ai-ide-workflow"], description: "Add AI to everyday IDE workflows.", category: "Guides" },
  { title: "Automate Dev Tasks", slug: ["guides", "automate-dev-tasks"], description: "Automate repetitive development tasks.", category: "Guides" },
  { title: "Build an AI Code Assistant", slug: ["guides", "build-ai-code-assistant"], description: "Build a production code assistant.", category: "Guides" },
  { title: "Debugging AI Output", slug: ["guides", "debugging-ai-output"], description: "Debug and validate model outputs.", category: "Guides" },
  { title: "Scaling AI Features", slug: ["guides", "scaling-ai-features"], description: "Scale AI workloads in production.", category: "Guides" },

  { title: "DeepNerd System Architecture", slug: ["architecture", "system-architecture"], description: "Core architecture and major components.", category: "Architecture" },
  { title: "Request Lifecycle", slug: ["architecture", "request-lifecycle"], description: "Lifecycle from request to response.", category: "Architecture" },
  { title: "Agent Execution Flow", slug: ["architecture", "agent-execution-flow"], description: "Step-by-step agent execution internals.", category: "Architecture" },
  { title: "Model Routing System", slug: ["architecture", "model-routing-system"], description: "How model selection and routing works.", category: "Architecture" },
  { title: "IDE + Agent Interaction", slug: ["architecture", "ide-agent-interaction"], description: "Data and control flow across products.", category: "Architecture" },
  { title: "Scaling & Performance", slug: ["architecture", "scaling-and-performance"], description: "Throughput and latency optimization.", category: "Architecture" },
  { title: "Caching Strategy", slug: ["architecture", "caching-strategy"], description: "Caching layers and invalidation.", category: "Architecture" },

  { title: "API Key Management", slug: ["security", "api-key-management"], description: "Generate, rotate, and scope API keys.", category: "Security" },
  { title: "Secure Agent Execution", slug: ["security", "secure-agent-execution"], description: "Sandboxing and permission boundaries.", category: "Security" },
  { title: "Data Privacy", slug: ["security", "data-privacy"], description: "Data handling and privacy guarantees.", category: "Security" },
  { title: "Rate Limiting", slug: ["security", "rate-limiting"], description: "Rate control and abuse prevention.", category: "Security" },
  { title: "Best Practices", slug: ["security", "best-practices"], description: "Security best practices for teams.", category: "Security" },

  { title: "Environment Setup", slug: ["configuration", "environment-setup"], description: "Runtime and env configuration.", category: "Configuration" },
  { title: "Model Selection", slug: ["configuration", "model-selection"], description: "Select the right model for each workload.", category: "Configuration" },
  { title: "Agent Configuration", slug: ["configuration", "agent-configuration"], description: "Tune agent behavior and constraints.", category: "Configuration" },
  { title: "Prompt Templates", slug: ["configuration", "prompt-templates"], description: "Reusable prompt templates and patterns.", category: "Configuration" },
  { title: "Runtime Settings", slug: ["configuration", "runtime-settings"], description: "Timeouts, retries, and runtime options.", category: "Configuration" },

  { title: "Basic Chat Example", slug: ["examples", "basic-chat-example"], description: "Simple chat integration example.", category: "Examples" },
  { title: "Code Generation Example", slug: ["examples", "code-generation-example"], description: "Code generation workflow example.", category: "Examples" },
  { title: "Agent Automation Example", slug: ["examples", "agent-automation-example"], description: "Agent-based task automation example.", category: "Examples" },
  { title: "IDE Workflow Example", slug: ["examples", "ide-workflow-example"], description: "Vault IDE workflow example.", category: "Examples" },
  { title: "API Integration Example", slug: ["examples", "api-integration-example"], description: "Backend API integration example.", category: "Examples" },

  { title: "Common Errors", slug: ["troubleshooting", "common-errors"], description: "Common platform and integration errors.", category: "Troubleshooting" },
  { title: "Debugging API Issues", slug: ["troubleshooting", "debugging-api-issues"], description: "Troubleshoot request and response failures.", category: "Troubleshooting" },
  { title: "Agent Failures", slug: ["troubleshooting", "agent-failures"], description: "Diagnose and recover agent failures.", category: "Troubleshooting" },
  { title: "Model Limitations", slug: ["troubleshooting", "model-limitations"], description: "Known model constraints and tradeoffs.", category: "Troubleshooting" },
  { title: "Fixing Rate Limits", slug: ["troubleshooting", "fixing-rate-limits"], description: "Mitigate and prevent rate-limit failures.", category: "Troubleshooting" },

  { title: "Changelog", slug: ["releases", "changelog"], description: "Platform release notes and updates.", category: "Releases" },
  { title: "Version Updates", slug: ["releases", "version-updates"], description: "Version policy and release cadence.", category: "Releases" },
  { title: "Breaking Changes", slug: ["releases", "breaking-changes"], description: "Breaking changes and migration impact.", category: "Releases" },
  { title: "Migration Guides", slug: ["releases", "migration-guides"], description: "Upgrade guides between major versions.", category: "Releases" },

  { title: "Glossary", slug: ["resources", "glossary"], description: "Key DeepNerd terms and definitions.", category: "Resources" },
  { title: "FAQs", slug: ["resources", "faqs"], description: "Frequently asked questions.", category: "Resources" },
  { title: "Community", slug: ["resources", "community"], description: "Community resources and channels.", category: "Resources" },
  { title: "Support", slug: ["resources", "support"], description: "Get help and support.", category: "Resources" },
]

function endpointMarkdown(endpoint: "/chat" | "/agents" | "/code" | "/models") {
  const intent =
    endpoint === "/chat"
      ? "chat completions with structured responses"
      : endpoint === "/agents"
        ? "agent workflow execution and orchestration"
        : endpoint === "/code"
          ? "code generation, transformation, and refactoring"
          : "model discovery and capability introspection"

  return `# ${endpoint}

Comprehensive reference for the **${endpoint}** endpoint in DeepNerd API.

## Description

Use ${endpoint} for **${intent}**. This endpoint is designed for production usage with explicit auth, request validation, consistent error payloads, and observable metadata.

## Authentication

All requests require a bearer token.

| Header | Value |
| --- | --- |
| Authorization | \`Bearer $DEEPNERD_API_KEY\` |
| Content-Type | \`application/json\` |

## Example request

\`\`\`ts
const response = await fetch("https://api.deepnerd.ai/v1${endpoint}", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.DEEPNERD_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    input: "Explain and improve this function",
    model: "deepnerd-fast",
    stream: false,
    metadata: {
      source: "docs-example",
      environment: "production",
    },
  }),
})

if (!response.ok) {
  throw new Error("Request failed with " + response.status)
}

const data = await response.json()
console.log(data)
\`\`\`

## Example response

\`\`\`json
{
  "id": "req_123",
  "status": "ok",
  "created": 1714137600,
  "model": "deepnerd-fast",
  "data": {
    "output": "Detailed result payload"
  },
  "usage": {
    "input_tokens": 314,
    "output_tokens": 522,
    "total_tokens": 836
  },
  "request_id": "rqt_abc123"
}
\`\`\`

## Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| input | string \| object | yes | Primary instruction or structured payload |
| model | string | no | Model override. Defaults to account-level routing policy |
| stream | boolean | no | Enable streaming responses |
| metadata | object | no | Custom request metadata for observability |

## Error Responses

| Status | Error Code | Meaning | Recovery |
| --- | --- | --- | --- |
| 400 | invalid_request | Request payload failed validation | Validate required fields and JSON shape |
| 401 | unauthorized | Missing/invalid API key | Rotate or correct key configuration |
| 429 | rate_limited | Throughput exceeded | Retry with backoff and queue requests |
| 500 | internal_error | Unexpected platform failure | Retry with idempotency key |

## Production Notes

1. Add retries with exponential backoff for 429/5xx responses.
2. Capture \`request_id\` in logs for support investigations.
3. Use strict schema validation before sending payloads.
4. Track token usage per feature to control cost.

## FAQ

### Can I stream responses from this endpoint?
Yes. Set \`stream: true\` and consume the response as a streamed body in your runtime.

### How do I choose a model?
Use \`deepnerd-fast\` for latency-sensitive interactions and route complex reasoning to higher-capability models.

### What is the best way to debug failed requests?
Log request payload hash, status code, error code, and \`request_id\` for deterministic troubleshooting.
`
}

function sectionFocus(category: string) {
  const focus: Record<string, string> = {
    "Getting Started": "initial platform onboarding and developer setup",
    "Core Concepts": "mental models, architecture boundaries, and workflow strategy",
    "Vault IDE": "editor-native AI productivity and coding workflows",
    "AI Agents": "task orchestration, automation, and multi-step execution",
    "DeepNerd API": "service integration, runtime behavior, and reliability",
    "API Reference": "contract-level API usage and protocol details",
    "API Endpoints": "endpoint-specific request/response guarantees",
    "SDKs & Integrations": "framework-level integration and deployment patterns",
    Guides: "practical implementation blueprints",
    Architecture: "system decomposition, dataflow, and scaling",
    Security: "key management, isolation, and safe execution",
    Configuration: "runtime tuning and environment controls",
    Examples: "copy-ready implementation patterns",
    Troubleshooting: "failure diagnosis and mitigation",
    Releases: "upgrade planning and compatibility",
    Resources: "reference support materials and definitions",
  }

  return focus[category] ?? "platform implementation guidance"
}

function defaultMarkdown(page: PageDef) {
  if (page.title === "DeepNerd Documentation") {
    return `# DeepNerd Documentation

DeepNerd is an AI developer platform built around **Vault IDE**, **AI Agents**, and **DeepNerd API**. This documentation is designed for production teams shipping real developer workflows.

## Platform Overview

- Vault IDE: AI-native IDE for coding workflows
- Agents: Claude Code-like autonomous coding agents
- DeepNerd API: LLM + infrastructure layer
- Developer tools for automation and delivery

## Why teams choose DeepNerd

- Unified platform across IDE, automation, and APIs
- Reliable interfaces with observable request lifecycle
- Strong support for secure, production-grade deployments

## What you will learn

1. How to set up projects and credentials correctly
2. How to design AI workflows with predictable outputs
3. How to integrate DeepNerd API endpoints safely at scale
4. How to debug, monitor, and optimize cost/performance

## Quickstart

\`\`\`ts
const response = await fetch("https://api.deepnerd.ai/v1/chat", {
  method: "POST",
  headers: {
    "Authorization": "Bearer $DEEPNERD_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "Hello from DeepNerd"
  })
})
const result = await response.json()
console.log(result)
\`\`\`

## Recommended reading order

1. Getting Started
2. Core Concepts
3. Products
4. API Reference
5. Guides and Troubleshooting

## FAQ

### Is DeepNerd only an API?
No. DeepNerd is a full platform with IDE, agent orchestration, and API infrastructure.

### Can I use only one product (for example API only)?
Yes. Products are independently adoptable and work best when combined.

### Is this documentation suitable for production teams?
Yes. Content emphasizes operational safety, observability, and migration readiness.

> [!NOTE]
> Use the left sidebar to explore product, API, and workflow documentation.
`
  }

  if (page.slug.join("/") === "api-reference/endpoints/chat") return endpointMarkdown("/chat")
  if (page.slug.join("/") === "api-reference/endpoints/agents") return endpointMarkdown("/agents")
  if (page.slug.join("/") === "api-reference/endpoints/code") return endpointMarkdown("/code")
  if (page.slug.join("/") === "api-reference/endpoints/models") return endpointMarkdown("/models")

  const focus = sectionFocus(page.category)
  const pagePath = page.slug.length === 0 ? "/docs" : `/docs/${page.slug.join("/")}`

  return `# ${page.title}

${page.description}

## Context

This page focuses on **${focus}**. Use it as an implementation guide for production systems, not just a conceptual overview.

## Practical Guidance

1. Define clear input/output contracts before integrating this feature.
2. Add typed payload validation and explicit error handling.
3. Instrument latency, throughput, and token usage for this path.
4. Introduce guardrails (timeouts, retries, limits) before shipping.

## Architecture Considerations

- Keep responsibilities separated between UI, agent orchestration, and API calls.
- Use deterministic prompts and explicit context boundaries.
- Prefer server-side execution for privileged operations.
- Track every request with request IDs for observability.

## Implementation Checklist

| Item | Status Target | Notes |
| --- | --- | --- |
| Request validation | Required | Validate body and required fields |
| Error mapping | Required | Convert platform errors to app-safe messages |
| Rate-limit strategy | Required | Add retry + jitter + queueing |
| Telemetry | Required | Log request_id, model, usage, latency |
| Security review | Required | Validate token handling and data boundaries |

## Code Example

\`\`\`ts
type DeepNerdRequest = {
  prompt: string
  model?: string
  stream?: boolean
}

async function runDeepNerd(input: DeepNerdRequest) {
  const response = await fetch("https://api.deepnerd.ai/v1/chat", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.DEEPNERD_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error("DeepNerd request failed (" + response.status + "): " + err)
  }

  return response.json()
}
\`\`\`

## Operational Best Practices

- Use circuit breakers for repeated 5xx response bursts.
- Set conservative defaults for model/timeouts in production.
- Maintain a fallback path when AI responses are unavailable.
- Document behavior contracts for downstream consumers.

## Troubleshooting

### Symptom: inconsistent output quality
Refine prompt structure, reduce ambiguous context, and separate generation from validation.

### Symptom: timeout or latency spikes
Enable streaming, reduce payload size, and route to lower-latency models where acceptable.

### Symptom: rate-limit failures
Batch low-priority jobs, queue requests, and apply exponential backoff.

## FAQ

### Is this page production-ready guidance or conceptual notes?
This page is written as production guidance and should be used for implementation planning.

### Should this be implemented in client or server code?
Use server-side integrations for keys, sensitive context, and high-confidence control.

### Where do I go next?
Continue to [API Reference](/docs/api-reference/authentication) for contracts and [Troubleshooting](/docs/troubleshooting/common-errors) for operational issues.

## Related Links

- Current page: ${pagePath}
- Platform root: /docs
- Support: /docs/resources/support
`
}

export const docsEntries: DocsEntry[] = PAGE_DEFS.map((page) => ({
  slug: page.slug,
  title: page.title,
  description: page.description,
  category: page.category,
  markdown: defaultMarkdown(page),
  lastUpdated: "April 26, 2026",
}))

export const docsTree: PageTree.Root = {
  name: "DeepNerd Docs",
  children: [
    { type: "page", name: "DeepNerd Documentation", url: "/docs" },
    {
      type: "folder",
      name: "Getting Started",
      defaultOpen: true,
      collapsible: true,
      children: [
        { type: "page", name: "What is DeepNerd?", url: "/docs/getting-started/what-is-deepnerd" },
        { type: "page", name: "Why DeepNerd?", url: "/docs/getting-started/why-deepnerd" },
        { type: "page", name: "Platform Overview", url: "/docs/getting-started/platform-overview" },
        { type: "page", name: "Quickstart", url: "/docs/getting-started/quickstart" },
        { type: "page", name: "Your First AI Request", url: "/docs/getting-started/first-ai-request" },
        { type: "page", name: "Setting up API Keys", url: "/docs/getting-started/api-keys" },
        { type: "page", name: "Using DeepNerd with your project", url: "/docs/getting-started/use-with-project" },
      ],
    },
    {
      type: "folder",
      name: "Core Concepts",
      collapsible: true,
      children: [
        { type: "page", name: "How DeepNerd Works", url: "/docs/core-concepts/how-deepnerd-works" },
        { type: "page", name: "Models & Intelligence Layer", url: "/docs/core-concepts/models-and-intelligence-layer" },
        { type: "page", name: "Agents vs IDE vs API", url: "/docs/core-concepts/agents-vs-ide-vs-api" },
        { type: "page", name: "AI Workflows", url: "/docs/core-concepts/ai-workflows" },
        { type: "page", name: "Prompting Basics for Developers", url: "/docs/core-concepts/prompting-basics" },
        { type: "page", name: "Streaming & Responses", url: "/docs/core-concepts/streaming-and-responses" },
        { type: "page", name: "Token Usage & Limits", url: "/docs/core-concepts/token-usage-and-limits" },
      ],
    },
    {
      type: "folder",
      name: "Products",
      collapsible: true,
      defaultOpen: true,
      children: [
        {
          type: "folder",
          name: "Vault IDE",
          collapsible: true,
          children: [
            { type: "page", name: "What is Vault IDE?", url: "/docs/products/vault-ide/what-is-vault-ide" },
            { type: "page", name: "Key Features", url: "/docs/products/vault-ide/key-features" },
            { type: "page", name: "AI in the Editor", url: "/docs/products/vault-ide/ai-in-editor" },
            { type: "page", name: "Code Generation", url: "/docs/products/vault-ide/code-generation" },
            { type: "page", name: "Debugging with AI", url: "/docs/products/vault-ide/debugging-with-ai" },
            { type: "page", name: "AI Autocomplete & Refactor", url: "/docs/products/vault-ide/autocomplete-and-refactor" },
            { type: "page", name: "Working with Projects", url: "/docs/products/vault-ide/working-with-projects" },
            { type: "page", name: "Future: Extensions System", url: "/docs/products/vault-ide/extensions-system" },
          ],
        },
        {
          type: "folder",
          name: "AI Agents",
          collapsible: true,
          children: [
            { type: "page", name: "What are DeepNerd Agents?", url: "/docs/products/deepagents/what-are-agents" },
            { type: "page", name: "Creating Your First Agent", url: "/docs/products/deepagents/first-agent" },
            { type: "page", name: "Agent Workflows", url: "/docs/products/deepagents/agent-workflows" },
            { type: "page", name: "Task Automation", url: "/docs/products/deepagents/task-automation" },
            { type: "page", name: "Multi-step Reasoning", url: "/docs/products/deepagents/multi-step-reasoning" },
            { type: "page", name: "File System Access", url: "/docs/products/deepagents/file-system-access" },
            { type: "page", name: "Memory & Context Handling", url: "/docs/products/deepagents/memory-and-context" },
          ],
        },
        {
          type: "folder",
          name: "DeepNerd API",
          collapsible: true,
          children: [
            { type: "page", name: "Overview", url: "/docs/products/deepapi/overview" },
            { type: "page", name: "Authentication", url: "/docs/products/deepapi/authentication" },
            { type: "page", name: "Making Your First Request", url: "/docs/products/deepapi/first-request" },
            { type: "page", name: "Streaming Responses", url: "/docs/products/deepapi/streaming-responses" },
            { type: "page", name: "Rate Limits", url: "/docs/products/deepapi/rate-limits" },
            { type: "page", name: "Error Handling", url: "/docs/products/deepapi/error-handling" },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "API Reference",
      collapsible: true,
      children: [
        { type: "page", name: "Authentication", url: "/docs/api-reference/authentication" },
        { type: "page", name: "Base URL", url: "/docs/api-reference/base-url" },
        { type: "page", name: "Request Format", url: "/docs/api-reference/request-format" },
        {
          type: "folder",
          name: "Endpoints",
          collapsible: true,
          children: [
            { type: "page", name: "/chat", url: "/docs/api-reference/endpoints/chat" },
            { type: "page", name: "/agents", url: "/docs/api-reference/endpoints/agents" },
            { type: "page", name: "/code", url: "/docs/api-reference/endpoints/code" },
            { type: "page", name: "/models", url: "/docs/api-reference/endpoints/models" },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "SDKs & Integrations",
      collapsible: true,
      children: [
        { type: "page", name: "JavaScript SDK", url: "/docs/sdks-and-integrations/javascript-sdk" },
        { type: "page", name: "Python SDK", url: "/docs/sdks-and-integrations/python-sdk" },
        { type: "page", name: "REST API Usage", url: "/docs/sdks-and-integrations/rest-api-usage" },
        { type: "page", name: "CLI (future)", url: "/docs/sdks-and-integrations/cli-future" },
        { type: "page", name: "GitHub Integration", url: "/docs/sdks-and-integrations/github-integration" },
        { type: "page", name: "IDE Integrations", url: "/docs/sdks-and-integrations/ide-integrations" },
        { type: "page", name: "Vercel / Deployment integrations (future)", url: "/docs/sdks-and-integrations/vercel-deployment-future" },
      ],
    },
    {
      type: "folder",
      name: "Guides",
      collapsible: true,
      children: [
        { type: "page", name: "Build a Chat App", url: "/docs/guides/build-chat-app" },
        { type: "page", name: "Build a Coding Agent", url: "/docs/guides/build-coding-agent" },
        { type: "page", name: "Use AI in Your IDE Workflow", url: "/docs/guides/ai-ide-workflow" },
        { type: "page", name: "Automate Dev Tasks", url: "/docs/guides/automate-dev-tasks" },
        { type: "page", name: "Build an AI Code Assistant", url: "/docs/guides/build-ai-code-assistant" },
        { type: "page", name: "Debugging AI Output", url: "/docs/guides/debugging-ai-output" },
        { type: "page", name: "Scaling AI Features", url: "/docs/guides/scaling-ai-features" },
      ],
    },
    {
      type: "folder",
      name: "Architecture",
      collapsible: true,
      children: [
        { type: "page", name: "DeepNerd System Architecture", url: "/docs/architecture/system-architecture" },
        { type: "page", name: "Request Lifecycle", url: "/docs/architecture/request-lifecycle" },
        { type: "page", name: "Agent Execution Flow", url: "/docs/architecture/agent-execution-flow" },
        { type: "page", name: "Model Routing System", url: "/docs/architecture/model-routing-system" },
        { type: "page", name: "IDE + Agent Interaction", url: "/docs/architecture/ide-agent-interaction" },
        { type: "page", name: "Scaling & Performance", url: "/docs/architecture/scaling-and-performance" },
        { type: "page", name: "Caching Strategy", url: "/docs/architecture/caching-strategy" },
      ],
    },
    {
      type: "folder",
      name: "Security",
      collapsible: true,
      children: [
        { type: "page", name: "API Key Management", url: "/docs/security/api-key-management" },
        { type: "page", name: "Secure Agent Execution", url: "/docs/security/secure-agent-execution" },
        { type: "page", name: "Data Privacy", url: "/docs/security/data-privacy" },
        { type: "page", name: "Rate Limiting", url: "/docs/security/rate-limiting" },
        { type: "page", name: "Best Practices", url: "/docs/security/best-practices" },
      ],
    },
    {
      type: "folder",
      name: "Configuration",
      collapsible: true,
      children: [
        { type: "page", name: "Environment Setup", url: "/docs/configuration/environment-setup" },
        { type: "page", name: "Model Selection", url: "/docs/configuration/model-selection" },
        { type: "page", name: "Agent Configuration", url: "/docs/configuration/agent-configuration" },
        { type: "page", name: "Prompt Templates", url: "/docs/configuration/prompt-templates" },
        { type: "page", name: "Runtime Settings", url: "/docs/configuration/runtime-settings" },
      ],
    },
    {
      type: "folder",
      name: "Examples",
      collapsible: true,
      children: [
        { type: "page", name: "Basic Chat Example", url: "/docs/examples/basic-chat-example" },
        { type: "page", name: "Code Generation Example", url: "/docs/examples/code-generation-example" },
        { type: "page", name: "Agent Automation Example", url: "/docs/examples/agent-automation-example" },
        { type: "page", name: "IDE Workflow Example", url: "/docs/examples/ide-workflow-example" },
        { type: "page", name: "API Integration Example", url: "/docs/examples/api-integration-example" },
      ],
    },
    {
      type: "folder",
      name: "Troubleshooting",
      collapsible: true,
      children: [
        { type: "page", name: "Common Errors", url: "/docs/troubleshooting/common-errors" },
        { type: "page", name: "Debugging API Issues", url: "/docs/troubleshooting/debugging-api-issues" },
        { type: "page", name: "Agent Failures", url: "/docs/troubleshooting/agent-failures" },
        { type: "page", name: "Model Limitations", url: "/docs/troubleshooting/model-limitations" },
        { type: "page", name: "Fixing Rate Limits", url: "/docs/troubleshooting/fixing-rate-limits" },
      ],
    },
    {
      type: "folder",
      name: "Releases",
      collapsible: true,
      children: [
        { type: "page", name: "Changelog", url: "/docs/releases/changelog" },
        { type: "page", name: "Version Updates", url: "/docs/releases/version-updates" },
        { type: "page", name: "Breaking Changes", url: "/docs/releases/breaking-changes" },
        { type: "page", name: "Migration Guides", url: "/docs/releases/migration-guides" },
      ],
    },
    {
      type: "folder",
      name: "Resources",
      collapsible: true,
      children: [
        { type: "page", name: "Glossary", url: "/docs/resources/glossary" },
        { type: "page", name: "FAQs", url: "/docs/resources/faqs" },
        { type: "page", name: "Community", url: "/docs/resources/community" },
        { type: "page", name: "Support", url: "/docs/resources/support" },
      ],
    },
  ],
}

export function getDocBySlug(slug: string[]): DocsEntry | undefined {
  return docsEntries.find((entry) => entry.slug.join("/") === slug.join("/"))
}

export function getBreadcrumbSegments(slug: string[]): Array<{ label: string; href: string }> {
  const segments: Array<{ label: string; href: string }> = [{ label: "Docs", href: "/docs" }]
  const mapped = slug.map((segment, index) => {
    const href = `/docs/${slug.slice(0, index + 1).join("/")}`
    const label = segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    return { label, href }
  })

  return [...segments, ...mapped]
}
