import { NextResponse } from "next/server";

export async function GET() {
  const content = `# DeepNerd
> Infrastructure for AI Agents — not prettier dashboards.

## About
DeepNerd builds the infrastructure AI agents actually need. Machine-readable. Agent-operable. Autonomous by design. We engineer the tools, platforms, and systems that let autonomous agents write, test, deploy, and operate software — without human bottlenecks.

## Core Products

### Vault IDE
A code editor rebuilt from zero in Rust. Engineered for absolute performance — zero latency, infinite extensibility, and native agent integration built into the core execution loop. Sub-10ms response time. 42MB memory footprint. No Electron.
- URL: https://deepnerd.tech/ide

### Agents
Autonomous operators, not chatbots. Pre-configured operational nodes capable of executing complex multi-step reasoning tasks — code review, deployment, refactoring, and testing — without human intervention.
- URL: https://deepnerd.tech/agents

### Automation
If it repeats, it runs itself. A unified pipeline engine for defining triggers, actions, and agent workflows. Code-first infrastructure for CI/CD, webhooks, scheduled tasks, and event-driven automation.
- URL: https://deepnerd.tech/automation

### Tools & Primitives
Standardized interfaces for terminal access (DeepShell), file system operations (Native-FS), GPU compute (V-GPU), authentication (Auth-Proxy), secrets management (Secret-Safe), and more — all built for machine consumption.
- URL: https://deepnerd.tech/tools

### Model [Coming Soon]
A proprietary foundational model designed specifically for software engineering tasks and agentic logic. Built to natively understand every tool, agent, and interface in the DeepNerd ecosystem.
- URL: https://deepnerd.tech/model-teaser-1

## Company

### Manifesto
We think the tools are broken — so we rebuilt them. Speed is not a feature, it's a requirement. Agents don't need beautiful UIs, they need interfaces they can operate. We chose Rust because we're serious. AI-native doesn't mean AI-added.
- URL: https://deepnerd.tech/manifesto

### Careers
We're looking for engineers who think VSCode is too slow. Founding engineers (Rust), product designers, research leads, and systems engineers. Remote-first.
- URL: https://deepnerd.tech/careers

### Writing / Blog
Engineering decisions, opinions, and technical deep dives. Topics include Rust architecture, agent-first design, sub-10ms latency, and the future of autonomous software development.
- URL: https://deepnerd.tech/writing

### Changelog
Every update, fix, and ship. Detailed release notes with version history, new features, improvements, and bug fixes across all DeepNerd products.
- URL: https://deepnerd.tech/changelog

## Technical Architecture
- **Language**: Rust (core), TypeScript (web)
- **Protocol**: gRPC, WebSocket
- **Performance**: Sub-10ms response, 42MB memory, 0.08s cold start
- **Design Philosophy**: Machine-first, deterministic, zero-abstraction

## Contact
- Website: https://deepnerd.tech
- Email: hello@deepnerd.tech
- Contact Page: https://deepnerd.tech/contact
- GitHub: https://github.com/DeepNerd-AI
- X/Twitter: https://x.com/deepnerdai
- YouTube: https://www.youtube.com/@deepnerdai

## Documentation
- Docs: https://deepnerd.tech/docs
- Products Overview: https://deepnerd.tech/products
- All Pages Sitemap: https://deepnerd.tech/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
