const fs = require('fs');

const structure = [
  { folder: "Getting Started", pages: ["What is DeepNerd?", "Why DeepNerd?", "Platform Overview", "Quickstart", "Your First AI Request", "Setting up API Keys", "Using DeepNerd with your project"] },
  { folder: "Core Concepts", pages: ["How DeepNerd Works", "Models & Intelligence Layer", "Agents vs IDE vs API", "AI Workflows", "Prompting Basics for Developers", "Streaming & Responses", "Token Usage & Limits"] },
  { folder: "Products", subfolders: [
    { folder: "Vault IDE", pages: ["What is Vault IDE?", "Key Features", "AI in the Editor", "Code Generation", "Debugging with AI", "AI Autocomplete & Refactor", "Working with Projects", "Future: Extensions System"] },
    { folder: "AI Agents", pages: ["What are DeepNerd Agents?", "Creating Your First Agent", "Agent Workflows", "Task Automation", "Multi-step Reasoning", "File System Access", "Memory & Context Handling"] },
    { folder: "DeepNerd API", pages: ["Overview", "Authentication", "Making Your First Request", "Streaming Responses", "Rate Limits", "Error Handling"] }
  ]},
  { folder: "API Reference", pages: ["Authentication", "Base URL", "Request Format", "Chat Endpoints", "Agent Endpoints", "Code Endpoints", "Models Endpoints"] },
  { folder: "SDKs & Integrations", pages: ["JavaScript SDK", "Python SDK", "REST API Usage", "CLI (future)", "GitHub Integration", "IDE Integrations", "Vercel Integrations (future)"] },
  { folder: "Guides", pages: ["Build a Chat App", "Build a Coding Agent", "Use AI in Your IDE Workflow", "Automate Dev Tasks", "Build an AI Code Assistant", "Debugging AI Output", "Scaling AI Features"] },
  { folder: "Architecture", pages: ["DeepNerd System Architecture", "Request Lifecycle", "Agent Execution Flow", "Model Routing System", "IDE + Agent Interaction", "Scaling & Performance", "Caching Strategy"] },
  { folder: "Security", pages: ["API Key Management", "Secure Agent Execution", "Data Privacy", "Rate Limiting", "Best Practices"] },
  { folder: "Configuration", pages: ["Environment Setup", "Model Selection", "Agent Configuration", "Prompt Templates", "Runtime Settings"] },
  { folder: "Examples", pages: ["Basic Chat Example", "Code Generation Example", "Agent Automation Example", "IDE Workflow Example", "API Integration Example"] },
  { folder: "Troubleshooting", pages: ["Common Errors", "Debugging API Issues", "Agent Failures", "Model Limitations", "Fixing Rate Limits"] },
  { folder: "Releases", pages: ["Changelog", "Version Updates", "Breaking Changes", "Migration Guides"] },
  { folder: "Resources", pages: ["Glossary", "FAQs", "Community", "Support"] }
];

function generateSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

let pageDefs = [];
let treeChildren = [];

// Base page
pageDefs.push({ title: "DeepNerd Documentation", slug: [], description: "Welcome to the DeepNerd platform documentation.", category: "Home" });
treeChildren.push(`{ type: "page", name: "DeepNerd Documentation", url: "/docs" }`);

for (const section of structure) {
  if (section.pages) {
    let folderChildren = [];
    for (const page of section.pages) {
      const slug = ["docs", generateSlug(section.folder), generateSlug(page)];
      pageDefs.push({ title: page, slug: slug.slice(1), description: `Comprehensive documentation for ${page} in the ${section.folder} category.`, category: section.folder });
      folderChildren.push(`{ type: "page", name: "${page}", url: "/${slug.join('/')}" }`);
    }
    treeChildren.push(`{
      type: "folder",
      name: "${section.folder}",
      collapsible: true,
      children: [\n        ${folderChildren.join(',\n        ')}\n      ]
    }`);
  } else if (section.subfolders) {
    let subFolderDefs = [];
    for (const sub of section.subfolders) {
      let subChildren = [];
      for (const page of sub.pages) {
        const slug = ["docs", generateSlug(section.folder), generateSlug(sub.folder), generateSlug(page)];
        pageDefs.push({ title: page, slug: slug.slice(1), description: `Comprehensive documentation for ${page} in the ${sub.folder} category.`, category: sub.folder });
        subChildren.push(`{ type: "page", name: "${page}", url: "/${slug.join('/')}" }`);
      }
      subFolderDefs.push(`{
        type: "folder",
        name: "${sub.folder}",
        collapsible: true,
        children: [\n          ${subChildren.join(',\n          ')}\n        ]
      }`);
    }
    treeChildren.push(`{
      type: "folder",
      name: "${section.folder}",
      collapsible: true,
      children: [\n        ${subFolderDefs.join(',\n        ')}\n      ]
    }`);
  }
}

const content = `import type * as PageTree from "fumadocs-core/page-tree"

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

const PAGE_DEFS: PageDef[] = ${JSON.stringify(pageDefs, null, 2)};

function defaultMarkdown(page: PageDef) {
  const pagePath = "/docs/" + page.slug.join("/")
  
  return \`# \${page.title}

Welcome to the comprehensive documentation for **\${page.title}**. This section provides deep technical insights, examples, and workflows required to master the DeepNerd platform.

## Overview

DeepNerd provides a suite of advanced developer tools designed for AI-native workflows, including **Vault IDE**, **DeepNerd Agents**, and the **DeepNerd API**. This page covers the essential aspects of \${page.title} to help you integrate, customize, and scale your AI implementations effectively.

> [!NOTE]
> DeepNerd is constantly evolving. Make sure to check the [Changelog](/docs/releases/changelog) for the latest updates on \${page.title}.

## Key Capabilities

When utilizing \${page.title}, you can expect the following capabilities out of the box:

- **Scalable Architecture:** Designed to handle complex enterprise AI workloads.
- **Context-Aware Execution:** Native integration with project structure and file systems.
- **Secure by Default:** Adherence to strict data privacy and isolation bounds.
- **Extensible:** Easily bindable APIs and extensible logic layers.

### Technical Implementation

Implementing \${page.title} requires understanding the core API concepts and standard authentication mechanisms. Below is a foundational example of interacting with DeepNerd capabilities:

\\\`\\\`\\\`typescript
import { DeepNerdClient } from '@deepnerd/sdk';

// Initialize the DeepNerd Client
const client = new DeepNerdClient({
  apiKey: process.env.DEEPNERD_API_KEY,
  environment: 'production'
});

async function runExample() {
  try {
    const response = await client.execute({
      target: '\${page.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}',
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
\\\`\\\`\\\`

### Parameter Configuration

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`apiKey\` | \`string\` | Yes | Your DeepNerd authenticating token. |
| \`environment\` | \`string\` | No | Target environment (\`production\`, \`sandbox\`, \`local\`). |
| \`target\` | \`string\` | Yes | The module or function you are invoking. |
| \`mode\` | \`string\` | No | Execution mode flag to govern compute allocation. |

## Advanced Workflows

For more complex applications, \${page.title} can be composed with other platform features. For instance, you might combine Vault IDE indexing with DeepNerd Agents to execute multi-step automated refactors.

> [!WARNING]
> Ensure your API keys are never exposed in client side bundles. Always route requests through a secure backend utilizing the DeepNerd Node SDK.

### Where do I go next?

Continue to the related guides or inspect the [API Reference](/docs/api-reference/authentication) for exact data contracts.

## Related Links

- Current page: \${pagePath}
- Platform root: /docs
- Support: /docs/resources/support
\`
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
    ${treeChildren.join(',\n    ')}
  ],
}

export function getDocBySlug(slug: string[]): DocsEntry | undefined {
  return docsEntries.find((entry) => entry.slug.join("/") === slug.join("/"))
}

export function getBreadcrumbSegments(slug: string[]): Array<{ label: string; href: string }> {
  const segments: Array<{ label: string; href: string }> = [{ label: "Docs", href: "/docs" }]
  const mapped = slug.map((segment, index) => {
    const href = \`/docs/\${slug.slice(0, index + 1).join("/")}\`
    const label = segment.replace(/-/g, " ").replace(/\\b\\w/g, (char) => char.toUpperCase())
    return { label, href }
  })

  return [...segments, ...mapped]
}
`;

fs.writeFileSync('lib/docs.ts', content);
console.log('Successfully generated lib/docs.ts');
