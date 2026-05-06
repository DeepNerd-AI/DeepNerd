import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Everything We Build",
  description: "One stack. Five weapons. DeepNerd products: Vault IDE (Rust-native editor), Agents (autonomous operators), Automation (pipeline engine), Tools (execution primitives), and a proprietary model.",
  alternates: { canonical: "https://deepnerd.tech/products" },
  openGraph: { title: "DeepNerd Products", description: "One stack. Five weapons. Everything we build.", url: "https://deepnerd.tech/products", siteName: "DeepNerd", type: "website" },
  twitter: { card: "summary_large_image", title: "DeepNerd Products", description: "One stack. Five weapons.", creator: "@deepnerdai" },
};

export default function ProductsPage() {
  return (
    <SmoothScroll>
      <div className="bg-black text-on-surface font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12 text-left">
            <h1 className="font-h1 text-h1 text-primary mb-2">Everything we build.</h1>
            <p className="font-body-lg text-body-lg text-outline">One stack. Five weapons.</p>
          </header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
            {/* Card 1 (IDE) */}
            <Link href="/ide" className="md:col-span-8 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">01 / IDE</span>
                <h2 className="font-h2 text-h2 text-primary mb-4">The editor rebuilt from zero. In Rust.</h2>
                <p className="font-body-md text-body-md text-outline max-w-md">Engineered for absolute performance. Zero latency, infinite extensibility, and native agent integration built into the core loop.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Explore</span>
              </div>
            </Link>

            {/* Card 2 (Agents) */}
            <Link href="/agents" className="md:col-span-4 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">02 / Agents</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">Operators, not assistants.</h3>
                <p className="font-body-md text-body-md text-outline">Autonomous units designed to execute complex tasks. They write, test, and deploy without holding your hand.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Deploy</span>
              </div>
            </Link>

            {/* Card 3 (Automation) */}
            <Link href="/automation" className="md:col-span-4 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">03 / Automation</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">If it repeats, it runs itself.</h3>
                <p className="font-body-md text-body-md text-outline">A unified pipeline for defining triggers, actions, and agent workflows. Code-first infrastructure.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Automate</span>
              </div>
            </Link>

            {/* Card 4 (Tools) */}
            <Link href="/tools" className="md:col-span-4 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">04 / Tools</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">Primitives that agents actually use.</h3>
                <p className="font-body-md text-body-md text-outline">Standardized interfaces for search, file system access, and external APIs. Built for machine consumption.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Access</span>
              </div>
            </Link>

            {/* Card 5 (Model - Classified) */}
            <Link href="/model-teaser-1" className="md:col-span-4 relative bg-[#111]/50 border border-[#2a2a2a] p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-[2px] z-10 pointer-events-none"></div>
              <div className="relative z-0 opacity-40">
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">SOON</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">The model that runs it all.</h3>
                <p className="font-body-md text-body-md text-outline">Our proprietary foundational architecture designed specifically for software engineering and logic.</p>
              </div>
              <div className="relative z-20 mt-auto flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-sm">lock</span>
                <span className="font-mono text-xs text-outline">Classified</span>
              </div>
            </Link>
          </div>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
