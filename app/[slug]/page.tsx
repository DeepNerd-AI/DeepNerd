import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

type Article = {
  title: string;
  date: string;
  category: string;
  description: string;
  content: React.ReactNode;
};

const articles: Record<string, Article> = {
  "Why We Chose Rust for the DeepNerd Core": {
    title: "Why We Chose Rust for the DeepNerd Core",
    date: "2024.10.12",
    category: "Engineering",
    description: "A deep dive into memory safety, zero-cost abstractions, and why performance is the only metric that matters for autonomous agents.",
    content: (
      <>
        <p>
          When architecting the foundational layer of DeepNerd, the decision of which systems programming language to use was not taken lightly. In a landscape dominated by Go for cloud-native infrastructure and Python for AI, our choice of Rust was driven by an uncompromising demand for performance, predictable latency, and absolute memory safety.
        </p>
        <h2>The Latency Mandate</h2>
        <p>
          Autonomous agents operate at machine speed. When an agent is navigating a DOM, executing a terminal command, or analyzing a million-line codebase, the orchestrator cannot afford garbage collection pauses. Traditional runtimes introduce jitter that, while imperceptible to humans, compounding exponentially across millions of agent iterations. Rust’s lack of a runtime and garbage collector ensures that our P99 latency remains flat, giving DeepNerd the predictable execution environment that high-frequency autonomous operations demand.
        </p>
        <h2>Zero-Cost Abstractions</h2>
        <p>
          We needed the ability to build highly abstract, ergonomic APIs for our developers without paying a performance penalty. Rust’s trait system and monomorphization mean that our highest-level orchestrator logic compiles down to the exact same machine code as if we had written it in manual, error-prone C. This allows us to maintain a rapid development velocity without sacrificing a single CPU cycle.
        </p>
        <h2>Memory Safety Without Trade-offs</h2>
        <p>
          Agents execute untrusted code. They manipulate native file systems, interface with containerized execution environments, and proxy network requests. A buffer overflow or use-after-free vulnerability in the core orchestrator could be catastrophic. Rust’s borrow checker guarantees at compile-time that memory issues are eradicated. This mathematical certainty allows us to ship infrastructure-grade binaries with absolute confidence.
        </p>
        <h2>Conclusion</h2>
        <p>
          Rust is not just a language choice; it is a structural advantage. By building DeepNerd in Rust, we have created an operating layer that is lightweight, impenetrably secure, and blisteringly fast—the exact environment machine intelligence requires to thrive.
        </p>
      </>
    )
  },
  "Agents as First-Class Citizens": {
    title: "Agents as First-Class Citizens",
    date: "2024.10.05",
    category: "Agents",
    description: "Rethinking software architecture for non-human operators.",
    content: (
      <>
        <p>
          For the past four decades, software has been designed with a single primary consumer in mind: the human being. User interfaces, API rate limits, session management, and CAPTCHAs are all constructs built around the limitations and behaviors of biological operators. DeepNerd flips this paradigm. We are building a world where agents are the first-class citizens.
        </p>
        <h2>The Great Shift</h2>
        <p>
          When an AI agent attempts to use a standard web application, it encounters a hostile environment. It is forced to use headless browsers to parse highly volatile DOM structures, struggle with arbitrary pagination, and bypass bot-protection mechanisms. This is akin to forcing a race car to drive on a dirt path.
        </p>
        <h2>Machine-Native Interfaces (MNI)</h2>
        <p>
          At DeepNerd, we do not build GUIs for our core primitives. We build Machine-Native Interfaces. These are highly structured, deterministic API surfaces designed specifically for Large Language Models and autonomous orchestrators. When an agent interacts with the DeepNerd file system or executes a terminal command, it receives deterministic JSON schemas, strongly typed error codes, and exact state differentials.
        </p>
        <h2>Identity and Auth</h2>
        <p>
          Agents in the DeepNerd ecosystem have their own identity. They possess cryptographically secure verifiable credentials, allowing them to sign commits, authorize transactions, and maintain an immutable audit log of their actions. They are not acting on behalf of a user; they are entities with their own operational scope and bounded permissions.
        </p>
      </>
    )
  },
  "The Death of the GUI": {
    title: "The Death of the GUI",
    date: "2024.09.28",
    category: "Philosophy",
    description: "Why point-and-click interfaces are becoming legacy infrastructure.",
    content: (
      <>
        <p>
          The Graphical User Interface (GUI) was a necessary abstraction for humans to interact with digital systems. It mapped complex binary logic to spatial metaphors: desktops, folders, buttons, and windows. But as machine intelligence reaches parity with human reasoning, the GUI is rapidly becoming a bottleneck.
        </p>
        <h2>The Inefficiency of Visual Parsing</h2>
        <p>
          Consider the process of deploying a server. A human logs into an AWS console, visually scans for the EC2 dashboard, clicks a button, fills out a form, and confirms. An autonomous agent performing the same task via a GUI must render the page, execute vision models or complex DOM selectors, and simulate mouse movements. This is computationally wasteful and highly brittle.
        </p>
        <h2>Intent-Driven Execution</h2>
        <p>
          We are moving toward an era of Intent-Driven Execution. Instead of navigating a spatial interface, operators (both human and machine) declare an end-state: "Provision a high-availability database cluster." The intermediary steps—the clicks, the forms, the toggles—are abstracted away by autonomous orchestrators.
        </p>
        <h2>What Survives?</h2>
        <p>
          This does not mean screens will disappear. Instead, visual interfaces will transition from tools of execution to tools of observation. The GUI of the future is a dashboard for telemetry, audit logs, and high-level strategy adjustment. Execution will happen purely in the background, at machine speed, through deterministic APIs.
        </p>
      </>
    )
  },
  "Sub-10ms Latency in the Browser": {
    title: "Sub-10ms Latency in the Browser",
    date: "2024.09.15",
    category: "Engineering",
    description: "How we engineered a terminal-native IDE that outpaces native applications.",
    content: (
      <>
        <p>
          Web applications are notoriously sluggish. The DOM is heavy, JavaScript is single-threaded by default, and complex layouts cause layout thrashing. Yet, the DeepNerd Vault IDE delivers keystroke latency consistently under 10 milliseconds, rivaling the fastest native text editors like Vim and Alacritty. Here is how we achieved it.
        </p>
        <h2>Bypassing the DOM</h2>
        <p>
          The primary bottleneck in web-based text editors is the Document Object Model. Rendering thousands of lines of text as discrete HTML elements is inherently slow. We bypassed the DOM entirely for the editor surface. Instead, we use a custom WebGL renderer powered by WebAssembly. The text is drawn directly to the GPU using a highly optimized glyph cache.
        </p>
        <h2>Rust and WebAssembly</h2>
        <p>
          Our core text buffer and syntax highlighting engine are written in Rust and compiled to WebAssembly. This allows us to perform complex rope-based buffer mutations, regex lexing, and tree-sitter AST parsing in a highly parallelized, zero-allocation environment off the main thread.
        </p>
        <h2>Input Prediction</h2>
        <p>
          To push latency even lower, we implemented aggressive input prediction heuristics. Before the browser event loop even dispatches the final keyboard event, our WebAssembly core has already computed the anticipated buffer state and pre-rendered the glyphs to an offscreen canvas.
        </p>
      </>
    )
  },
  "v1.2.0: The Automation Update": {
    title: "v1.2.0: The Automation Update",
    date: "2024.09.01",
    category: "Releases",
    description: "Introducing unified pipeline engines for triggers, actions, and agent workflows.",
    content: (
      <>
        <p>
          Today, we are thrilled to announce the release of DeepNerd v1.2.0, our largest platform update to date. This release bridges the gap between reactive systems and proactive, autonomous agents through our new unified Automation Engine.
        </p>
        <h2>Code-First Pipelines</h2>
        <p>
          We have completely overhauled our workflow builder. Gone are the days of brittle, drag-and-drop Zapier clones. DeepNerd Automation is code-first. Workflows are defined as TypeScript primitives, version-controlled alongside your application code, and executed on our edge network with sub-50ms cold starts.
        </p>
        <h2>Agent-in-the-Loop</h2>
        <p>
          The most powerful feature of v1.2.0 is the ability to inject autonomous agents mid-pipeline. You can now define a trigger (e.g., a GitHub PR is opened), pass the context to a DeepNerd Code Review Agent, and use the agent's deterministic output (e.g., security vulnerability found) to conditionally route the pipeline to Slack or Jira.
        </p>
        <h2>Enhanced Observability</h2>
        <p>
          With complex, agent-driven automations, observability is critical. We have introduced Log-Stream, a real-time execution telemetry dashboard that allows you to trace exactly what an agent "thought," which APIs it called, and what data it mutated, at every step of the pipeline.
        </p>
      </>
    )
  }
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.slug);
  const article = articles[decodedSlug];

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: \`\${article.title} | DeepNerd\`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: ['/docs-og.png'], // User requested docs photo for thumbnail
      type: 'article',
      publishedTime: article.date.replace(/\\./g, '-'),
      authors: ['DeepNerd Engineering'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['/docs-og.png'],
    }
  };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.slug);
  const article = articles[decodedSlug];

  if (!article) {
    notFound();
  }

  return (
    <SmoothScroll>
      <div className="bg-[#050505] text-white font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col gap-6 mb-16">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="text-primary">{article.category}</span>
              <span>//</span>
              <span>{article.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              {article.title}
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              {article.description}
            </p>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-white prose-li:text-zinc-300">
            {article.content}
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-sm">DN</span>
              </div>
              <div>
                <div className="text-sm font-medium">DeepNerd Engineering</div>
                <div className="text-xs text-zinc-500">Core Infrastructure Team</div>
              </div>
            </div>
            <button className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium rounded-sm">
              Share Article
            </button>
          </div>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
