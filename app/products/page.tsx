import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

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
            <div className="md:col-span-8 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">01 / IDE</span>
                <h2 className="font-h2 text-h2 text-primary mb-4">The editor rebuilt from zero. In Rust.</h2>
                <p className="font-body-md text-body-md text-outline max-w-md">Engineered for absolute performance. Zero latency, infinite extensibility, and native agent integration built into the core loop.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Explore</span>
              </div>
            </div>

            {/* Card 2 (Agents) */}
            <div className="md:col-span-4 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">02 / Agents</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">Operators, not assistants.</h3>
                <p className="font-body-md text-body-md text-outline">Autonomous units designed to execute complex tasks. They write, test, and deploy without holding your hand.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Deploy</span>
              </div>
            </div>

            {/* Card 3 (Automation) */}
            <div className="md:col-span-4 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">03 / Automation</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">If it repeats, it runs itself.</h3>
                <p className="font-body-md text-body-md text-outline">A unified pipeline for defining triggers, actions, and agent workflows. Code-first infrastructure.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Automate</span>
              </div>
            </div>

            {/* Card 4 (Tools) */}
            <div className="md:col-span-4 bg-[#111] border border-[#2a2a2a] p-6 flex flex-col justify-between hover:border-primary hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 cursor-pointer group">
              <div>
                <span className="font-mono text-xs text-outline tracking-widest uppercase mb-4 block">04 / Tools</span>
                <h3 className="font-h3 text-h3 text-primary mb-4">Primitives that agents actually use.</h3>
                <p className="font-body-md text-body-md text-outline">Standardized interfaces for search, file system access, and external APIs. Built for machine consumption.</p>
              </div>
              <div className="mt-6 text-outline group-hover:text-primary transition-colors duration-150">
                <span className="font-mono text-sm">→ Access</span>
              </div>
            </div>

            {/* Card 5 (Model - Classified) */}
            <div className="md:col-span-4 relative bg-[#111]/50 border border-[#2a2a2a] p-6 flex flex-col justify-between overflow-hidden">
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
            </div>
          </div>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
