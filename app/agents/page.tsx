import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import Beams from "@/components/ui/beams";
import { CodeHighlighter } from "@/components/ui/code-highlighter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents — Autonomous Operators for Code",
  description: "DeepNerd agents are autonomous operators — not chatbots. They write, review, test, deploy, and refactor code without human intervention. Built for multi-step reasoning at machine speed.",
  alternates: { canonical: "https://deepnerd.tech/agents" },
  openGraph: { title: "DeepNerd Agents — Autonomous Operators", description: "Agents that write, review, test, and deploy code without human intervention.", url: "https://deepnerd.tech/agents", siteName: "DeepNerd", type: "website" },
  twitter: { card: "summary_large_image", title: "DeepNerd Agents", description: "Autonomous operators for code — not chatbots.", creator: "@deepnerdai" },
};

const agentSdkCode = `// Initialize the DeepNerd Client
const { DeepNerd } = require('deepnerd-sdk');

const agent = new DeepNerd({
  apiKey: process.env.DEEPNERD_API_KEY,
  environment: 'production'
});

// Dispatch a task
const task = await agent.run({
  objective: "Migrate legacy database to new schema",
  context: {
    source: "db://legacy_cluster",
    target: "db://new_cluster_v2"
  },
  autonomous: true,
  verify: true
});

console.log(task.status); // 'COMPLETED'`;

export default function AgentsPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#050505] text-white font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {/* Hero Section */}
          <section className="relative w-full min-h-[716px] flex items-center justify-center border-b border-[#2a2a2a] overflow-hidden px-6">
            <Beams />
            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
              <h1 className="font-h1 text-h1 text-white">Agents that operate.<br/>Not just answer.</h1>
              <p className="font-body-lg text-body-lg text-grey max-w-2xl">DeepNerd agents click, navigate, execute and verify — at computer speed. No UI needed.</p>
              <div className="flex gap-4 mt-2">
                <button className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm font-bold rounded-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 uppercase tracking-widest">Get API Access</button>
                <button className="bg-transparent text-primary border border-[#2a2a2a] px-8 py-3 font-label-sm text-label-sm font-bold rounded-sm hover:border-primary transition-all duration-150 uppercase tracking-widest">Read Docs</button>
              </div>
            </div>
          </section>

          {/* Differentiator Section */}
          <section className="py-12 px-6 max-w-6xl mx-auto w-full border-b border-[#2a2a2a]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
              <div className="flex flex-col gap-4">
                <h3 className="font-h3 text-h3 text-[#555555]">Other agents</h3>
                <ul className="font-body-md text-body-md text-[#555555] space-y-2 list-disc list-inside">
                  <li>Reads screen</li>
                  <li>Suggests actions</li>
                  <li>Needs supervision</li>
                  <li>Slow</li>
                  <li>Needs pretty UI</li>
                </ul>
              </div>
              <div className="hidden md:block w-[1px] bg-[#2a2a2a] mx-6"></div>
              <div className="flex flex-col gap-4">
                <h3 className="font-h3 text-h3 text-white">DeepNerd agents</h3>
                <ul className="font-body-md text-body-md text-white space-y-2 list-disc list-inside">
                  <li>Operates interface</li>
                  <li>Executes autonomously</li>
                  <li>Self-verifying</li>
                  <li>CPU-speed</li>
                  <li>Machine-readable only</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use Cases Grid */}
          <section className="py-12 px-6 max-w-6xl mx-auto w-full border-b border-[#2a2a2a]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-sm flex flex-col gap-4 hover:border-primary transition-colors duration-150">
                <h3 className="font-h3 text-h3 text-white">Code Review Agent</h3>
                <div className="bg-[#050505] p-4 rounded-sm border border-[#2a2a2a] font-mono text-xs text-grey flex flex-col gap-1">
                  <span>&gt; INIT Code_Review_Module_v2</span>
                  <span>[RUNNING] git diff main..feature/auth</span>
                  <span>[ANALYSIS] Scanning for vulnerabilities...</span>
                  <span>[INFO] Found 1 memory leak in auth.ts:42</span>
                  <span>[ACTION] Generating patch...</span>
                  <span className="text-white">[SUCCESS] Patch applied. Verification complete.</span>
                </div>
              </div>
              <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-sm flex flex-col gap-4 hover:border-primary transition-colors duration-150">
                <h3 className="font-h3 text-h3 text-white">Deployment Agent</h3>
                <div className="bg-[#050505] p-4 rounded-sm border border-[#2a2a2a] font-mono text-xs text-grey flex flex-col gap-1">
                  <span>&gt; INIT Deploy_Orchestrator</span>
                  <span>[RUNNING] docker build -t app:latest .</span>
                  <span>[INFO] Pushing to registry...</span>
                  <span>[ACTION] Updating kubernetes manifests</span>
                  <span>[VERIFY] Waiting for pod health checks...</span>
                  <span className="text-white">[SUCCESS] Deployment stable across 3 regions.</span>
                </div>
              </div>
              <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-sm flex flex-col gap-4 hover:border-primary transition-colors duration-150">
                <h3 className="font-h3 text-h3 text-white">Data Pipeline Agent</h3>
                <div className="bg-[#050505] p-4 rounded-sm border border-[#2a2a2a] font-mono text-xs text-grey flex flex-col gap-1">
                  <span>&gt; INIT ETL_Agent_09</span>
                  <span>[RUNNING] Querying prod_db_cluster_1</span>
                  <span>[TRANSFORM] Normalizing user records (N=1.2M)</span>
                  <span>[VALIDATE] Checking schema constraints...</span>
                  <span>[ACTION] Upserting to data_warehouse</span>
                  <span className="text-white">[SUCCESS] Pipeline sync complete. 0 errors.</span>
                </div>
              </div>
              <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-sm flex flex-col gap-4 hover:border-primary transition-colors duration-150">
                <h3 className="font-h3 text-h3 text-white">QA Agent</h3>
                <div className="bg-[#050505] p-4 rounded-sm border border-[#2a2a2a] font-mono text-xs text-grey flex flex-col gap-1">
                  <span>&gt; INIT e2e_Test_Runner</span>
                  <span>[RUNNING] Executing headless browser suites</span>
                  <span>[INFO] Simulated 500 concurrent user sessions</span>
                  <span>[WARN] Timeout detected on checkout flow</span>
                  <span>[ACTION] Capturing trace and generating bug report...</span>
                  <span className="text-white">[SUCCESS] Report linked to JIRA ticket ENG-404.</span>
                </div>
              </div>
            </div>
          </section>

          {/* API Preview Section */}
          <section className="py-12 px-6 max-w-4xl mx-auto w-full border-b border-[#2a2a2a]">
            <div className="flex flex-col gap-4">
              <h2 className="font-h2 text-h2 text-white">Integrate in minutes</h2>
              <div className="bg-[#050505] border border-[#2a2a2a] rounded-sm p-6 overflow-hidden">
                <CodeHighlighter code={agentSdkCode} language="javascript" />
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-12 px-6 flex flex-col items-center justify-center gap-4">
            <h2 className="font-h2 text-h2 text-white text-center">Deploy your first agent in 5 minutes.</h2>
            <button className="mt-2 bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm font-bold rounded-sm hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 uppercase tracking-widest">Start Building</button>
          </section>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
