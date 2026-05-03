import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const codeExample = `// Example config update required for v1.4.0
{
  "model_config": {
    "engine": "v-DN-4-turbo",
    "strict_types": true
  }
}`;

export default function ChangelogPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#050505] text-[#888] font-['Space_Grotesk'] antialiased min-h-screen flex flex-col selection:bg-primary selection:text-[#131313]">
        <Navbar />
        <main className="flex-grow pt-32 pb-12 px-6 max-w-5xl mx-auto w-full">
          {/* Header Section */}
          <header className="mb-12">
            <h1 className="font-h1 text-h1 text-primary mb-2">Changelog</h1>
            <p className="font-body-lg text-body-lg">Every update. Every fix. Every ship.</p>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-12 border-b border-[#2a2a2a] pb-2 font-mono text-xs uppercase tracking-widest">
            <button className="text-primary hover:text-primary transition-colors">All</button>
            <button className="text-[#555] hover:text-primary transition-colors">IDE</button>
            <button className="text-[#555] hover:text-primary transition-colors">Agents</button>
            <button className="text-[#555] hover:text-primary transition-colors">Automation</button>
            <button className="text-[#555] hover:text-primary transition-colors">Tools</button>
            <button className="text-[#555] hover:text-primary transition-colors">Model</button>
          </div>

          {/* Timeline Container */}
          <div className="relative grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-12">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-[160px] top-2 bottom-0 w-px bg-[#2a2a2a] ml-6"></div>

            {/* Entry 1 */}
            <div className="contents">
              <div className="font-mono pt-1">
                <div className="text-[#555] text-xs mb-1">2024.10.15</div>
                <div className="text-primary text-sm">v1.4.2</div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#333333] p-6 hover:border-white transition-colors duration-150 group relative">
                <div className="hidden md:block absolute -left-[29px] top-4 w-2 h-2 bg-[#1a1a1a] border border-[#555] rounded-full group-hover:bg-white group-hover:border-white transition-colors"></div>
                <h2 className="font-h3 text-h3 text-primary mb-4">Agentic Context Resolver &amp; IDE Performance</h2>
                <div className="space-y-4 font-body-md text-body-md">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[NEW]</span>
                    <span>Introduced advanced context resolution for agents, allowing seamless cross-file semantic search during automated refactoring tasks.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[IMPROVED]</span>
                    <span>IDE startup time reduced by 40% through parallelized extension loading and deferred LSP initialization.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[FIX]</span>
                    <span>Resolved memory leak in the terminal emulator buffer when processing high-volume streaming output from long-running bash scripts.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Entry 2 */}
            <div className="contents">
              <div className="font-mono pt-1">
                <div className="text-[#555] text-xs mb-1">2024.10.02</div>
                <div className="text-primary text-sm">v1.4.0</div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#333333] p-6 hover:border-white transition-colors duration-150 group relative">
                <div className="hidden md:block absolute -left-[29px] top-4 w-2 h-2 bg-[#1a1a1a] border border-[#555] rounded-full group-hover:bg-white group-hover:border-white transition-colors"></div>
                <h2 className="font-h3 text-h3 text-primary mb-4">Major Model Weights Update &amp; Deprecations</h2>
                <div className="space-y-4 font-body-md text-body-md">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[NEW]</span>
                    <span>Deployed custom model weights (v-DN-4-turbo) optimized specifically for Rust and Go syntax tree manipulation.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[REMOVED]</span>
                    <span>Legacy syntax highlighters for unsupported templating languages have been purged from the core bundle.</span>
                  </div>
                </div>
                {/* Code block */}
                <div className="mt-6 bg-[#050505] border border-[#333] p-4 font-mono text-xs text-[#888] overflow-x-auto">
                  <pre><code>{codeExample}</code></pre>
                </div>
              </div>
            </div>

            {/* Entry 3 */}
            <div className="contents">
              <div className="font-mono pt-1">
                <div className="text-[#555] text-xs mb-1">2024.09.28</div>
                <div className="text-primary text-sm">v1.3.9</div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#333333] p-6 hover:border-white transition-colors duration-150 group relative">
                <div className="hidden md:block absolute -left-[29px] top-4 w-2 h-2 bg-[#1a1a1a] border border-[#555] rounded-full group-hover:bg-white group-hover:border-white transition-colors"></div>
                <h2 className="font-h3 text-h3 text-primary mb-4">Automation Pipeline Refinements</h2>
                <div className="space-y-4 font-body-md text-body-md">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[FIX]</span>
                    <span>Corrected webhook signature validation logic that sporadically failed when payloads contained multi-byte Unicode characters.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] border border-[#333] px-1.5 py-0.5 text-primary shrink-0 mt-1">[IMPROVED]</span>
                    <span>Automation dashboard now renders 60fps even with 10k+ active nodes, utilizing WebGL for the graph view.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
