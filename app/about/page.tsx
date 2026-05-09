import Link from "next/link";
import { ArrowRight, Bot, Code2, ShieldCheck, Zap } from "lucide-react";
import type React from "react";
import { SiteGoalsAccordion } from "@/components/site-goals-accordion";

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">About DeepNerd</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Building the operating system for AI-native developer teams.
          </h1>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            DeepNerd is designed for teams shipping production AI products. We combine a fast developer experience with secure execution,
            real-time telemetry, and dependable platform primitives so agents can move quickly without breaking trust.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/getting-started/quickstart"
              className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
              Start Building <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 border border-zinc-800 px-5 py-2.5 text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Code2 className="size-5 text-white" />}
            title="Developer-first architecture"
            body="Low-latency workflows, clean APIs, and production patterns that scale from side project to enterprise."
          />
          <FeatureCard
            icon={<Bot className="size-5 text-white" />}
            title="Agent-native workflows"
            body="Build, schedule, and monitor autonomous agents with transparent execution state and safe defaults."
          />
          <FeatureCard
            icon={<ShieldCheck className="size-5 text-white" />}
            title="Security by default"
            body="Auth guards, RLS-backed data access, auditable events, and strict separation between users and workloads."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <SiteGoalsAccordion />
      </section>
          />
          <FeatureCard
            icon={<Zap className="size-5 text-white" />}
            title="Real-time operations"
            body="Live metrics, notification-driven awareness, and rapid feedback loops for modern product teams."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">Our product philosophy</h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            AI products fail when velocity and reliability fight each other. DeepNerd exists to remove that tradeoff: fast iteration,
            predictable operations, and clear ownership boundaries across code, agents, APIs, and automation.
          </p>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            We treat platform quality as a feature. Every route should work, every permission should be enforced, and every UX surface
            should communicate system state with clarity.
          </p>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 hover:border-zinc-700 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-400 leading-relaxed">{body}</p>
    </article>
  );
}