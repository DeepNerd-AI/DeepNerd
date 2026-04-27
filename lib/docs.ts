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
  {
    "title": "DeepNerd Documentation",
    "slug": [],
    "description": "Welcome to the DeepNerd platform documentation.",
    "category": "Home"
  },
  {
    "title": "What is DeepNerd?",
    "slug": [
      "getting-started",
      "what-is-deepnerd"
    ],
    "description": "Comprehensive documentation for What is DeepNerd? in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "Why DeepNerd?",
    "slug": [
      "getting-started",
      "why-deepnerd"
    ],
    "description": "Comprehensive documentation for Why DeepNerd? in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "Platform Overview",
    "slug": [
      "getting-started",
      "platform-overview"
    ],
    "description": "Comprehensive documentation for Platform Overview in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "Quickstart",
    "slug": [
      "getting-started",
      "quickstart"
    ],
    "description": "Comprehensive documentation for Quickstart in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "Your First AI Request",
    "slug": [
      "getting-started",
      "your-first-ai-request"
    ],
    "description": "Comprehensive documentation for Your First AI Request in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "Setting up API Keys",
    "slug": [
      "getting-started",
      "setting-up-api-keys"
    ],
    "description": "Comprehensive documentation for Setting up API Keys in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "Using DeepNerd with your project",
    "slug": [
      "getting-started",
      "using-deepnerd-with-your-project"
    ],
    "description": "Comprehensive documentation for Using DeepNerd with your project in the Getting Started category.",
    "category": "Getting Started"
  },
  {
    "title": "How DeepNerd Works",
    "slug": [
      "core-concepts",
      "how-deepnerd-works"
    ],
    "description": "Comprehensive documentation for How DeepNerd Works in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "Models & Intelligence Layer",
    "slug": [
      "core-concepts",
      "models-intelligence-layer"
    ],
    "description": "Comprehensive documentation for Models & Intelligence Layer in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "Agents vs IDE vs API",
    "slug": [
      "core-concepts",
      "agents-vs-ide-vs-api"
    ],
    "description": "Comprehensive documentation for Agents vs IDE vs API in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "AI Workflows",
    "slug": [
      "core-concepts",
      "ai-workflows"
    ],
    "description": "Comprehensive documentation for AI Workflows in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "Prompting Basics for Developers",
    "slug": [
      "core-concepts",
      "prompting-basics-for-developers"
    ],
    "description": "Comprehensive documentation for Prompting Basics for Developers in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "Streaming & Responses",
    "slug": [
      "core-concepts",
      "streaming-responses"
    ],
    "description": "Comprehensive documentation for Streaming & Responses in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "Token Usage & Limits",
    "slug": [
      "core-concepts",
      "token-usage-limits"
    ],
    "description": "Comprehensive documentation for Token Usage & Limits in the Core Concepts category.",
    "category": "Core Concepts"
  },
  {
    "title": "What is Vault IDE?",
    "slug": [
      "products",
      "vault-ide",
      "what-is-vault-ide"
    ],
    "description": "Comprehensive documentation for What is Vault IDE? in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "Key Features",
    "slug": [
      "products",
      "vault-ide",
      "key-features"
    ],
    "description": "Comprehensive documentation for Key Features in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "AI in the Editor",
    "slug": [
      "products",
      "vault-ide",
      "ai-in-the-editor"
    ],
    "description": "Comprehensive documentation for AI in the Editor in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "Code Generation",
    "slug": [
      "products",
      "vault-ide",
      "code-generation"
    ],
    "description": "Comprehensive documentation for Code Generation in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "Debugging with AI",
    "slug": [
      "products",
      "vault-ide",
      "debugging-with-ai"
    ],
    "description": "Comprehensive documentation for Debugging with AI in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "AI Autocomplete & Refactor",
    "slug": [
      "products",
      "vault-ide",
      "ai-autocomplete-refactor"
    ],
    "description": "Comprehensive documentation for AI Autocomplete & Refactor in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "Working with Projects",
    "slug": [
      "products",
      "vault-ide",
      "working-with-projects"
    ],
    "description": "Comprehensive documentation for Working with Projects in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "Future: Extensions System",
    "slug": [
      "products",
      "vault-ide",
      "future-extensions-system"
    ],
    "description": "Comprehensive documentation for Future: Extensions System in the Vault IDE category.",
    "category": "Vault IDE"
  },
  {
    "title": "What are DeepNerd Agents?",
    "slug": [
      "products",
      "ai-agents",
      "what-are-deepnerd-agents"
    ],
    "description": "Comprehensive documentation for What are DeepNerd Agents? in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "Creating Your First Agent",
    "slug": [
      "products",
      "ai-agents",
      "creating-your-first-agent"
    ],
    "description": "Comprehensive documentation for Creating Your First Agent in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "Agent Workflows",
    "slug": [
      "products",
      "ai-agents",
      "agent-workflows"
    ],
    "description": "Comprehensive documentation for Agent Workflows in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "Task Automation",
    "slug": [
      "products",
      "ai-agents",
      "task-automation"
    ],
    "description": "Comprehensive documentation for Task Automation in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "Multi-step Reasoning",
    "slug": [
      "products",
      "ai-agents",
      "multi-step-reasoning"
    ],
    "description": "Comprehensive documentation for Multi-step Reasoning in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "File System Access",
    "slug": [
      "products",
      "ai-agents",
      "file-system-access"
    ],
    "description": "Comprehensive documentation for File System Access in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "Memory & Context Handling",
    "slug": [
      "products",
      "ai-agents",
      "memory-context-handling"
    ],
    "description": "Comprehensive documentation for Memory & Context Handling in the AI Agents category.",
    "category": "AI Agents"
  },
  {
    "title": "Overview",
    "slug": [
      "products",
      "deepnerd-api",
      "overview"
    ],
    "description": "Comprehensive documentation for Overview in the DeepNerd API category.",
    "category": "DeepNerd API"
  },
  {
    "title": "Authentication",
    "slug": [
      "products",
      "deepnerd-api",
      "authentication"
    ],
    "description": "Comprehensive documentation for Authentication in the DeepNerd API category.",
    "category": "DeepNerd API"
  },
  {
    "title": "Making Your First Request",
    "slug": [
      "products",
      "deepnerd-api",
      "making-your-first-request"
    ],
    "description": "Comprehensive documentation for Making Your First Request in the DeepNerd API category.",
    "category": "DeepNerd API"
  },
  {
    "title": "Streaming Responses",
    "slug": [
      "products",
      "deepnerd-api",
      "streaming-responses"
    ],
    "description": "Comprehensive documentation for Streaming Responses in the DeepNerd API category.",
    "category": "DeepNerd API"
  },
  {
    "title": "Rate Limits",
    "slug": [
      "products",
      "deepnerd-api",
      "rate-limits"
    ],
    "description": "Comprehensive documentation for Rate Limits in the DeepNerd API category.",
    "category": "DeepNerd API"
  },
  {
    "title": "Error Handling",
    "slug": [
      "products",
      "deepnerd-api",
      "error-handling"
    ],
    "description": "Comprehensive documentation for Error Handling in the DeepNerd API category.",
    "category": "DeepNerd API"
  },
  {
    "title": "Authentication",
    "slug": [
      "api-reference",
      "authentication"
    ],
    "description": "Comprehensive documentation for Authentication in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "Base URL",
    "slug": [
      "api-reference",
      "base-url"
    ],
    "description": "Comprehensive documentation for Base URL in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "Request Format",
    "slug": [
      "api-reference",
      "request-format"
    ],
    "description": "Comprehensive documentation for Request Format in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "Chat Endpoints",
    "slug": [
      "api-reference",
      "chat-endpoints"
    ],
    "description": "Comprehensive documentation for Chat Endpoints in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "Agent Endpoints",
    "slug": [
      "api-reference",
      "agent-endpoints"
    ],
    "description": "Comprehensive documentation for Agent Endpoints in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "Code Endpoints",
    "slug": [
      "api-reference",
      "code-endpoints"
    ],
    "description": "Comprehensive documentation for Code Endpoints in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "Models Endpoints",
    "slug": [
      "api-reference",
      "models-endpoints"
    ],
    "description": "Comprehensive documentation for Models Endpoints in the API Reference category.",
    "category": "API Reference"
  },
  {
    "title": "JavaScript SDK",
    "slug": [
      "sdks-integrations",
      "javascript-sdk"
    ],
    "description": "Comprehensive documentation for JavaScript SDK in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "Python SDK",
    "slug": [
      "sdks-integrations",
      "python-sdk"
    ],
    "description": "Comprehensive documentation for Python SDK in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "REST API Usage",
    "slug": [
      "sdks-integrations",
      "rest-api-usage"
    ],
    "description": "Comprehensive documentation for REST API Usage in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "CLI (future)",
    "slug": [
      "sdks-integrations",
      "cli-future"
    ],
    "description": "Comprehensive documentation for CLI (future) in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "GitHub Integration",
    "slug": [
      "sdks-integrations",
      "github-integration"
    ],
    "description": "Comprehensive documentation for GitHub Integration in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "IDE Integrations",
    "slug": [
      "sdks-integrations",
      "ide-integrations"
    ],
    "description": "Comprehensive documentation for IDE Integrations in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "Vercel Integrations (future)",
    "slug": [
      "sdks-integrations",
      "vercel-integrations-future"
    ],
    "description": "Comprehensive documentation for Vercel Integrations (future) in the SDKs & Integrations category.",
    "category": "SDKs & Integrations"
  },
  {
    "title": "Build a Chat App",
    "slug": [
      "guides",
      "build-a-chat-app"
    ],
    "description": "Comprehensive documentation for Build a Chat App in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "Build a Coding Agent",
    "slug": [
      "guides",
      "build-a-coding-agent"
    ],
    "description": "Comprehensive documentation for Build a Coding Agent in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "Use AI in Your IDE Workflow",
    "slug": [
      "guides",
      "use-ai-in-your-ide-workflow"
    ],
    "description": "Comprehensive documentation for Use AI in Your IDE Workflow in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "Automate Dev Tasks",
    "slug": [
      "guides",
      "automate-dev-tasks"
    ],
    "description": "Comprehensive documentation for Automate Dev Tasks in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "Build an AI Code Assistant",
    "slug": [
      "guides",
      "build-an-ai-code-assistant"
    ],
    "description": "Comprehensive documentation for Build an AI Code Assistant in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "Debugging AI Output",
    "slug": [
      "guides",
      "debugging-ai-output"
    ],
    "description": "Comprehensive documentation for Debugging AI Output in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "Scaling AI Features",
    "slug": [
      "guides",
      "scaling-ai-features"
    ],
    "description": "Comprehensive documentation for Scaling AI Features in the Guides category.",
    "category": "Guides"
  },
  {
    "title": "DeepNerd System Architecture",
    "slug": [
      "architecture",
      "deepnerd-system-architecture"
    ],
    "description": "Comprehensive documentation for DeepNerd System Architecture in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "Request Lifecycle",
    "slug": [
      "architecture",
      "request-lifecycle"
    ],
    "description": "Comprehensive documentation for Request Lifecycle in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "Agent Execution Flow",
    "slug": [
      "architecture",
      "agent-execution-flow"
    ],
    "description": "Comprehensive documentation for Agent Execution Flow in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "Model Routing System",
    "slug": [
      "architecture",
      "model-routing-system"
    ],
    "description": "Comprehensive documentation for Model Routing System in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "IDE + Agent Interaction",
    "slug": [
      "architecture",
      "ide-agent-interaction"
    ],
    "description": "Comprehensive documentation for IDE + Agent Interaction in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "Scaling & Performance",
    "slug": [
      "architecture",
      "scaling-performance"
    ],
    "description": "Comprehensive documentation for Scaling & Performance in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "Caching Strategy",
    "slug": [
      "architecture",
      "caching-strategy"
    ],
    "description": "Comprehensive documentation for Caching Strategy in the Architecture category.",
    "category": "Architecture"
  },
  {
    "title": "API Key Management",
    "slug": [
      "security",
      "api-key-management"
    ],
    "description": "Comprehensive documentation for API Key Management in the Security category.",
    "category": "Security"
  },
  {
    "title": "Secure Agent Execution",
    "slug": [
      "security",
      "secure-agent-execution"
    ],
    "description": "Comprehensive documentation for Secure Agent Execution in the Security category.",
    "category": "Security"
  },
  {
    "title": "Data Privacy",
    "slug": [
      "security",
      "data-privacy"
    ],
    "description": "Comprehensive documentation for Data Privacy in the Security category.",
    "category": "Security"
  },
  {
    "title": "Rate Limiting",
    "slug": [
      "security",
      "rate-limiting"
    ],
    "description": "Comprehensive documentation for Rate Limiting in the Security category.",
    "category": "Security"
  },
  {
    "title": "Best Practices",
    "slug": [
      "security",
      "best-practices"
    ],
    "description": "Comprehensive documentation for Best Practices in the Security category.",
    "category": "Security"
  },
  {
    "title": "Environment Setup",
    "slug": [
      "configuration",
      "environment-setup"
    ],
    "description": "Comprehensive documentation for Environment Setup in the Configuration category.",
    "category": "Configuration"
  },
  {
    "title": "Model Selection",
    "slug": [
      "configuration",
      "model-selection"
    ],
    "description": "Comprehensive documentation for Model Selection in the Configuration category.",
    "category": "Configuration"
  },
  {
    "title": "Agent Configuration",
    "slug": [
      "configuration",
      "agent-configuration"
    ],
    "description": "Comprehensive documentation for Agent Configuration in the Configuration category.",
    "category": "Configuration"
  },
  {
    "title": "Prompt Templates",
    "slug": [
      "configuration",
      "prompt-templates"
    ],
    "description": "Comprehensive documentation for Prompt Templates in the Configuration category.",
    "category": "Configuration"
  },
  {
    "title": "Runtime Settings",
    "slug": [
      "configuration",
      "runtime-settings"
    ],
    "description": "Comprehensive documentation for Runtime Settings in the Configuration category.",
    "category": "Configuration"
  },
  {
    "title": "Basic Chat Example",
    "slug": [
      "examples",
      "basic-chat-example"
    ],
    "description": "Comprehensive documentation for Basic Chat Example in the Examples category.",
    "category": "Examples"
  },
  {
    "title": "Code Generation Example",
    "slug": [
      "examples",
      "code-generation-example"
    ],
    "description": "Comprehensive documentation for Code Generation Example in the Examples category.",
    "category": "Examples"
  },
  {
    "title": "Agent Automation Example",
    "slug": [
      "examples",
      "agent-automation-example"
    ],
    "description": "Comprehensive documentation for Agent Automation Example in the Examples category.",
    "category": "Examples"
  },
  {
    "title": "IDE Workflow Example",
    "slug": [
      "examples",
      "ide-workflow-example"
    ],
    "description": "Comprehensive documentation for IDE Workflow Example in the Examples category.",
    "category": "Examples"
  },
  {
    "title": "API Integration Example",
    "slug": [
      "examples",
      "api-integration-example"
    ],
    "description": "Comprehensive documentation for API Integration Example in the Examples category.",
    "category": "Examples"
  },
  {
    "title": "Common Errors",
    "slug": [
      "troubleshooting",
      "common-errors"
    ],
    "description": "Comprehensive documentation for Common Errors in the Troubleshooting category.",
    "category": "Troubleshooting"
  },
  {
    "title": "Debugging API Issues",
    "slug": [
      "troubleshooting",
      "debugging-api-issues"
    ],
    "description": "Comprehensive documentation for Debugging API Issues in the Troubleshooting category.",
    "category": "Troubleshooting"
  },
  {
    "title": "Agent Failures",
    "slug": [
      "troubleshooting",
      "agent-failures"
    ],
    "description": "Comprehensive documentation for Agent Failures in the Troubleshooting category.",
    "category": "Troubleshooting"
  },
  {
    "title": "Model Limitations",
    "slug": [
      "troubleshooting",
      "model-limitations"
    ],
    "description": "Comprehensive documentation for Model Limitations in the Troubleshooting category.",
    "category": "Troubleshooting"
  },
  {
    "title": "Fixing Rate Limits",
    "slug": [
      "troubleshooting",
      "fixing-rate-limits"
    ],
    "description": "Comprehensive documentation for Fixing Rate Limits in the Troubleshooting category.",
    "category": "Troubleshooting"
  },
  {
    "title": "Changelog",
    "slug": [
      "releases",
      "changelog"
    ],
    "description": "Comprehensive documentation for Changelog in the Releases category.",
    "category": "Releases"
  },
  {
    "title": "Version Updates",
    "slug": [
      "releases",
      "version-updates"
    ],
    "description": "Comprehensive documentation for Version Updates in the Releases category.",
    "category": "Releases"
  },
  {
    "title": "Breaking Changes",
    "slug": [
      "releases",
      "breaking-changes"
    ],
    "description": "Comprehensive documentation for Breaking Changes in the Releases category.",
    "category": "Releases"
  },
  {
    "title": "Migration Guides",
    "slug": [
      "releases",
      "migration-guides"
    ],
    "description": "Comprehensive documentation for Migration Guides in the Releases category.",
    "category": "Releases"
  },
  {
    "title": "Glossary",
    "slug": [
      "resources",
      "glossary"
    ],
    "description": "Comprehensive documentation for Glossary in the Resources category.",
    "category": "Resources"
  },
  {
    "title": "FAQs",
    "slug": [
      "resources",
      "faqs"
    ],
    "description": "Comprehensive documentation for FAQs in the Resources category.",
    "category": "Resources"
  },
  {
    "title": "Community",
    "slug": [
      "resources",
      "community"
    ],
    "description": "Comprehensive documentation for Community in the Resources category.",
    "category": "Resources"
  },
  {
    "title": "Support",
    "slug": [
      "resources",
      "support"
    ],
    "description": "Comprehensive documentation for Support in the Resources category.",
    "category": "Resources"
  }
];

function defaultMarkdown(page: PageDef) {
  if (page.slug.join('/') === 'releases/changelog') {
    return `# Changelog

All notable changes to the DeepNerd platform (Vault IDE, AI Agents, DeepNerd API) will be documented here.

## [v1.2.0] - 2026-04-20

### Added
- **Vault IDE**: Introducing new multi-agent debugging sessions.
- **DeepNerd API**: New \`/v1/models/fine-tune\` endpoint for custom LoRA tuning.
- **Agents**: Added cross-region file system sync capabilities.

### Changed
- **DeepNerd API**: Rate limits for free tier increased from 100 req/min to 500 req/min.
- **SDK**: Python SDK now auto-retries on 429 status codes by default.

### Fixed
- **Vault IDE**: Resolved an issue where the integrated terminal would lose context on reload.
- **Agents**: Fixed a memory leakage issue during long-running automation tasks.

---

## [v1.1.0] - 2026-03-15

### Added
- **Vault IDE**: WebAssembly (WASM) execution environment natively inside the editor.
- **DeepNerd API**: Support for streaming reasoning traces (chain-of-thought) in completion endpoints.

### Changed
- **General**: Rebranded \`Codex Assistants\` to \`DeepNerd Agents\` across the ecosystem.

### Security
- **DeepNerd API**: Enforced TLS 1.3 minimum requirement for all API interactions.

---

## [v1.0.0] - 2026-01-01

### Added
- Initial public release of the DeepNerd Platform.
- Vault IDE with local intelligence routing.
- DeepNerd API supporting \`/chat\`, \`/code\`, and \`/agents\` endpoints.
- JavaScript and Python official SDKs.
- Autonomous coding agent CLI workflows.
`;
  }

  const pagePath = "/docs/" + page.slug.join("/")
  
  return `# ${page.title}

Welcome to the comprehensive documentation for **${page.title}**. This section provides deep technical insights, examples, and workflows required to master the DeepNerd platform.

## Overview

DeepNerd provides a suite of advanced developer tools designed for AI-native workflows, including **Vault IDE**, **DeepNerd Agents**, and the **DeepNerd API**. This page covers the essential aspects of ${page.title} to help you integrate, customize, and scale your AI implementations effectively.

> [!NOTE]
> DeepNerd is constantly evolving. Make sure to check the [Changelog](/docs/releases/changelog) for the latest updates on ${page.title}.

## Key Capabilities

When utilizing ${page.title}, you can expect the following capabilities out of the box:

- **Scalable Architecture:** Designed to handle complex enterprise AI workloads.
- **Context-Aware Execution:** Native integration with project structure and file systems.
- **Secure by Default:** Adherence to strict data privacy and isolation bounds.
- **Extensible:** Easily bindable APIs and extensible logic layers.

### Technical Implementation

Implementing ${page.title} requires understanding the core API concepts and standard authentication mechanisms. Below is a foundational example of interacting with DeepNerd capabilities:

\`\`\`typescript
import { DeepNerdClient } from '@deepnerd/sdk';

// Initialize the DeepNerd Client
const client = new DeepNerdClient({
  apiKey: process.env.DEEPNERD_API_KEY,
  environment: 'production'
});

async function runExample() {
  try {
    const response = await client.execute({
      target: '${page.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}',
      parameters: {
        verbose: true,
        mode: 'advanced'
      }
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Execution failed:', error);
  }
}

runExample();
\`\`\`

### Parameter Configuration

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`apiKey\` | \`string\` | Yes | Your DeepNerd authenticating token. |
| \`environment\` | \`string\` | No | Target environment (\`production\`, \`sandbox\`, \`local\`). |
| \`target\` | \`string\` | Yes | The module or function you are invoking. |
| \`mode\` | \`string\` | No | Execution mode flag to govern compute allocation. |

## Advanced Workflows

For more complex applications, ${page.title} can be composed with other platform features. For instance, you might combine Vault IDE indexing with DeepNerd Agents to execute multi-step automated refactors.

> [!WARNING]
> Ensure your API keys are never exposed in client side bundles. Always route requests through a secure backend utilizing the DeepNerd Node SDK.

### Where do I go next?

Continue to the related guides or inspect the [API Reference](/docs/api-reference/authentication) for exact data contracts.

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
  lastUpdated: "April 27, 2026",
}))

export const docsTree: PageTree.Root = {
  name: "DeepNerd Docs",
  children: [
    { type: "page", name: "DeepNerd Documentation", url: "/docs" },
    {
      type: "folder",
      name: "Getting Started",
      collapsible: true,
      children: [
        { type: "page", name: "What is DeepNerd?", url: "/docs/getting-started/what-is-deepnerd" },
        { type: "page", name: "Why DeepNerd?", url: "/docs/getting-started/why-deepnerd" },
        { type: "page", name: "Platform Overview", url: "/docs/getting-started/platform-overview" },
        { type: "page", name: "Quickstart", url: "/docs/getting-started/quickstart" },
        { type: "page", name: "Your First AI Request", url: "/docs/getting-started/your-first-ai-request" },
        { type: "page", name: "Setting up API Keys", url: "/docs/getting-started/setting-up-api-keys" },
        { type: "page", name: "Using DeepNerd with your project", url: "/docs/getting-started/using-deepnerd-with-your-project" }
      ]
    },
    {
      type: "folder",
      name: "Core Concepts",
      collapsible: true,
      children: [
        { type: "page", name: "How DeepNerd Works", url: "/docs/core-concepts/how-deepnerd-works" },
        { type: "page", name: "Models & Intelligence Layer", url: "/docs/core-concepts/models-intelligence-layer" },
        { type: "page", name: "Agents vs IDE vs API", url: "/docs/core-concepts/agents-vs-ide-vs-api" },
        { type: "page", name: "AI Workflows", url: "/docs/core-concepts/ai-workflows" },
        { type: "page", name: "Prompting Basics for Developers", url: "/docs/core-concepts/prompting-basics-for-developers" },
        { type: "page", name: "Streaming & Responses", url: "/docs/core-concepts/streaming-responses" },
        { type: "page", name: "Token Usage & Limits", url: "/docs/core-concepts/token-usage-limits" }
      ]
    },
    {
      type: "folder",
      name: "Products",
      collapsible: true,
      children: [
        {
        type: "folder",
        name: "Vault IDE",
        collapsible: true,
        children: [
          { type: "page", name: "What is Vault IDE?", url: "/docs/products/vault-ide/what-is-vault-ide" },
          { type: "page", name: "Key Features", url: "/docs/products/vault-ide/key-features" },
          { type: "page", name: "AI in the Editor", url: "/docs/products/vault-ide/ai-in-the-editor" },
          { type: "page", name: "Code Generation", url: "/docs/products/vault-ide/code-generation" },
          { type: "page", name: "Debugging with AI", url: "/docs/products/vault-ide/debugging-with-ai" },
          { type: "page", name: "AI Autocomplete & Refactor", url: "/docs/products/vault-ide/ai-autocomplete-refactor" },
          { type: "page", name: "Working with Projects", url: "/docs/products/vault-ide/working-with-projects" },
          { type: "page", name: "Future: Extensions System", url: "/docs/products/vault-ide/future-extensions-system" }
        ]
      },
        {
        type: "folder",
        name: "AI Agents",
        collapsible: true,
        children: [
          { type: "page", name: "What are DeepNerd Agents?", url: "/docs/products/ai-agents/what-are-deepnerd-agents" },
          { type: "page", name: "Creating Your First Agent", url: "/docs/products/ai-agents/creating-your-first-agent" },
          { type: "page", name: "Agent Workflows", url: "/docs/products/ai-agents/agent-workflows" },
          { type: "page", name: "Task Automation", url: "/docs/products/ai-agents/task-automation" },
          { type: "page", name: "Multi-step Reasoning", url: "/docs/products/ai-agents/multi-step-reasoning" },
          { type: "page", name: "File System Access", url: "/docs/products/ai-agents/file-system-access" },
          { type: "page", name: "Memory & Context Handling", url: "/docs/products/ai-agents/memory-context-handling" }
        ]
      },
        {
        type: "folder",
        name: "DeepNerd API",
        collapsible: true,
        children: [
          { type: "page", name: "Overview", url: "/docs/products/deepnerd-api/overview" },
          { type: "page", name: "Authentication", url: "/docs/products/deepnerd-api/authentication" },
          { type: "page", name: "Making Your First Request", url: "/docs/products/deepnerd-api/making-your-first-request" },
          { type: "page", name: "Streaming Responses", url: "/docs/products/deepnerd-api/streaming-responses" },
          { type: "page", name: "Rate Limits", url: "/docs/products/deepnerd-api/rate-limits" },
          { type: "page", name: "Error Handling", url: "/docs/products/deepnerd-api/error-handling" }
        ]
      }
      ]
    },
    {
      type: "folder",
      name: "API Reference",
      collapsible: true,
      children: [
        { type: "page", name: "Authentication", url: "/docs/api-reference/authentication" },
        { type: "page", name: "Base URL", url: "/docs/api-reference/base-url" },
        { type: "page", name: "Request Format", url: "/docs/api-reference/request-format" },
        { type: "page", name: "Chat Endpoints", url: "/docs/api-reference/chat-endpoints" },
        { type: "page", name: "Agent Endpoints", url: "/docs/api-reference/agent-endpoints" },
        { type: "page", name: "Code Endpoints", url: "/docs/api-reference/code-endpoints" },
        { type: "page", name: "Models Endpoints", url: "/docs/api-reference/models-endpoints" }
      ]
    },
    {
      type: "folder",
      name: "SDKs & Integrations",
      collapsible: true,
      children: [
        { type: "page", name: "JavaScript SDK", url: "/docs/sdks-integrations/javascript-sdk" },
        { type: "page", name: "Python SDK", url: "/docs/sdks-integrations/python-sdk" },
        { type: "page", name: "REST API Usage", url: "/docs/sdks-integrations/rest-api-usage" },
        { type: "page", name: "CLI (future)", url: "/docs/sdks-integrations/cli-future" },
        { type: "page", name: "GitHub Integration", url: "/docs/sdks-integrations/github-integration" },
        { type: "page", name: "IDE Integrations", url: "/docs/sdks-integrations/ide-integrations" },
        { type: "page", name: "Vercel Integrations (future)", url: "/docs/sdks-integrations/vercel-integrations-future" }
      ]
    },
    {
      type: "folder",
      name: "Guides",
      collapsible: true,
      children: [
        { type: "page", name: "Build a Chat App", url: "/docs/guides/build-a-chat-app" },
        { type: "page", name: "Build a Coding Agent", url: "/docs/guides/build-a-coding-agent" },
        { type: "page", name: "Use AI in Your IDE Workflow", url: "/docs/guides/use-ai-in-your-ide-workflow" },
        { type: "page", name: "Automate Dev Tasks", url: "/docs/guides/automate-dev-tasks" },
        { type: "page", name: "Build an AI Code Assistant", url: "/docs/guides/build-an-ai-code-assistant" },
        { type: "page", name: "Debugging AI Output", url: "/docs/guides/debugging-ai-output" },
        { type: "page", name: "Scaling AI Features", url: "/docs/guides/scaling-ai-features" }
      ]
    },
    {
      type: "folder",
      name: "Architecture",
      collapsible: true,
      children: [
        { type: "page", name: "DeepNerd System Architecture", url: "/docs/architecture/deepnerd-system-architecture" },
        { type: "page", name: "Request Lifecycle", url: "/docs/architecture/request-lifecycle" },
        { type: "page", name: "Agent Execution Flow", url: "/docs/architecture/agent-execution-flow" },
        { type: "page", name: "Model Routing System", url: "/docs/architecture/model-routing-system" },
        { type: "page", name: "IDE + Agent Interaction", url: "/docs/architecture/ide-agent-interaction" },
        { type: "page", name: "Scaling & Performance", url: "/docs/architecture/scaling-performance" },
        { type: "page", name: "Caching Strategy", url: "/docs/architecture/caching-strategy" }
      ]
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
        { type: "page", name: "Best Practices", url: "/docs/security/best-practices" }
      ]
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
        { type: "page", name: "Runtime Settings", url: "/docs/configuration/runtime-settings" }
      ]
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
        { type: "page", name: "API Integration Example", url: "/docs/examples/api-integration-example" }
      ]
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
        { type: "page", name: "Fixing Rate Limits", url: "/docs/troubleshooting/fixing-rate-limits" }
      ]
    },
    {
      type: "folder",
      name: "Releases",
      collapsible: true,
      children: [
        { type: "page", name: "Changelog", url: "/docs/releases/changelog" },
        { type: "page", name: "Version Updates", url: "/docs/releases/version-updates" },
        { type: "page", name: "Breaking Changes", url: "/docs/releases/breaking-changes" },
        { type: "page", name: "Migration Guides", url: "/docs/releases/migration-guides" }
      ]
    },
    {
      type: "folder",
      name: "Resources",
      collapsible: true,
      children: [
        { type: "page", name: "Glossary", url: "/docs/resources/glossary" },
        { type: "page", name: "FAQs", url: "/docs/resources/faqs" },
        { type: "page", name: "Community", url: "/docs/resources/community" },
        { type: "page", name: "Support", url: "/docs/resources/support" }
      ]
    }
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
