import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const codeContent = `// Core execution engine - zero allocations
pub fn execute_buffer_mutation(
    ctx: &mut EditorContext,
    mutation: BufferMutation,
) -> Result<(), EngineError> {
    let start_time = Instant::now();
    
    match mutation {
        BufferMutation::Insert { pos, text } => {
            ctx.buffer.insert(pos, &text);
            ctx.indexer.notify_change(pos, text.len());
        },
        BufferMutation::Delete { range } => {
            ctx.buffer.delete(range);
        }
    }

    // Enforce sub-10ms response guarantee
    if start_time.elapsed().as_millis() > 10 {
        tracing::warn!("Frame drop detected");
    }

    Ok(())
}`;

export default function IDEPage() {
  return (
    <SmoothScroll>
      <div className="bg-surface-container-lowest text-on-surface font-['Space_Grotesk'] antialiased min-h-screen flex flex-col selection:bg-primary selection:text-surface-container-lowest">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start gap-8">
              <div className="inline-flex items-center px-3 py-1 bg-surface-container-high border border-[#333333] font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary mr-2"></span> Beta v0.9.4 Live
              </div>
              <h1 className="font-h1 text-h1 text-primary leading-tight">
                Your editor.<br/>Finally fast.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Built in Rust. Not forked. Not wrapped. Ground up. A void-like environment engineered for absolute focus and zero latency.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <button className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 uppercase tracking-wider hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-150">
                  Download Beta
                </button>
                <button className="bg-transparent border border-[#333333] text-primary font-label-sm text-label-sm px-6 py-3 uppercase tracking-wider hover:border-primary transition-all duration-150">
                  View Benchmarks
                </button>
              </div>
            </div>

            {/* Fake IDE Screenshot */}
            <div className="relative w-full aspect-[4/3] bg-[#050505] border border-[#333333] rounded-sm overflow-hidden shadow-2xl flex flex-col group">
              {/* Mac-style Top Bar */}
              <div className="h-10 bg-[#0a0a0a] border-b border-[#333333] flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full border border-[#333333]"></div>
                  <div className="w-3 h-3 rounded-full border border-[#333333]"></div>
                  <div className="w-3 h-3 rounded-full border border-[#333333]"></div>
                </div>
                <div className="font-mono text-[10px] text-[#555555]">src/core/engine.rs — DeepNerd</div>
                <div className="w-12"></div>
              </div>
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#080808] border-r border-[#333333] hidden sm:flex flex-col p-4">
                  <div className="font-label-xs text-label-xs text-[#555555] uppercase tracking-widest mb-4">Explorer</div>
                  <div className="font-mono text-xs text-[#888888] flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined text-[14px]">folder_open</span> src</div>
                    <div className="flex items-center gap-2 pl-4 text-primary"><span className="material-symbols-outlined text-[14px]">folder</span> core</div>
                    <div className="flex items-center gap-2 pl-8 text-primary bg-[#111111] py-1 -ml-4 pl-12 border-l border-primary"><span className="material-symbols-outlined text-[14px]">description</span> engine.rs</div>
                    <div className="flex items-center gap-2 pl-8"><span className="material-symbols-outlined text-[14px]">description</span> memory.rs</div>
                    <div className="flex items-center gap-2 pl-4"><span className="material-symbols-outlined text-[14px]">folder</span> parser</div>
                    <div className="flex items-center gap-2 pl-4"><span className="material-symbols-outlined text-[14px]">folder</span> ui</div>
                    <div className="flex items-center gap-2 mt-4"><span className="material-symbols-outlined text-[14px]">description</span> Cargo.toml</div>
                  </div>
                </div>
                {/* Editor Area */}
                <div className="flex-1 bg-[#050505] p-6 overflow-hidden relative">
                  <pre className="font-mono text-sm leading-relaxed whitespace-pre font-light text-[#888888]">
                    <code>{codeContent}</code>
                  </pre>
                  <div className="absolute w-[2px] h-4 bg-primary top-[11.2rem] left-[5.5rem] animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Benchmarks Section */}
          <section className="border-t border-[#111111] bg-surface-container-low py-24 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <h2 className="font-h2 text-h2 text-primary mb-4">VSCode is slow. We fixed it.</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Technical performance metrics measured on Apple M3 Max, 64GB RAM.</p>
              </div>
              <div className="border border-[#333333] bg-[#0a0a0a]">
                {/* Header */}
                <div className="grid grid-cols-3 border-b border-[#333333] p-4 bg-[#111111]">
                  <div className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">Metric</div>
                  <div className="font-label-xs text-label-xs text-[#555555] uppercase tracking-widest text-right">Legacy IDE</div>
                  <div className="font-label-xs text-label-xs text-primary uppercase tracking-widest text-right">DeepNerd</div>
                </div>
                {/* Rows */}
                <div className="grid grid-cols-3 border-b border-[#222222] p-4 hover:bg-[#111111] transition-colors">
                  <div className="font-body-md text-body-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-outline">timer</span> Cold Start</div>
                  <div className="font-mono text-[#555555] text-right line-through">2.4s</div>
                  <div className="font-mono text-primary font-bold text-right">0.08s</div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#222222] p-4 hover:bg-[#111111] transition-colors">
                  <div className="font-body-md text-body-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-outline">memory</span> Idle Memory</div>
                  <div className="font-mono text-[#555555] text-right line-through">1.2GB</div>
                  <div className="font-mono text-primary font-bold text-right">42MB</div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#222222] p-4 hover:bg-[#111111] transition-colors">
                  <div className="font-body-md text-body-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-outline">search</span> File Indexing (10k files)</div>
                  <div className="font-mono text-[#555555] text-right">4.5s</div>
                  <div className="font-mono text-primary font-bold text-right">0.3s</div>
                </div>
                <div className="grid grid-cols-3 p-4 hover:bg-[#111111] transition-colors">
                  <div className="font-body-md text-body-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-outline">extension</span> Plugin Latency</div>
                  <div className="font-mono text-[#555555] text-right">Variable</div>
                  <div className="font-mono text-primary font-bold text-right">&lt;1ms</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid Section */}
          <section className="py-24 px-6 max-w-7xl mx-auto">
            <h2 className="font-h3 text-h3 text-primary mb-12 border-l-2 border-primary pl-4 uppercase tracking-widest">Architecture Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
              <div className="bg-[#0a0a0a] border border-[#222222] p-8 hover:border-primary transition-colors duration-150 group">
                <span className="material-symbols-outlined text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">code_blocks</span>
                <h3 className="font-h3 text-h3 text-primary mb-3">Rust Core</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Built entirely in Rust for memory safety and zero-cost abstractions.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222222] p-8 hover:border-primary transition-colors duration-150 group">
                <span className="material-symbols-outlined text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">bolt</span>
                <h3 className="font-h3 text-h3 text-primary mb-3">Zero Electron</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Custom GPU-accelerated renderer. No heavy browser engines.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222222] p-8 hover:border-primary transition-colors duration-150 group">
                <span className="material-symbols-outlined text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">speed</span>
                <h3 className="font-h3 text-h3 text-primary mb-3">Sub-10ms Response</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Guaranteed frame rates. Keystrokes register instantly.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222222] p-8 hover:border-primary transition-colors duration-150 group">
                <span className="material-symbols-outlined text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">psychology</span>
                <h3 className="font-h3 text-h3 text-primary mb-3">AI-Native Autocomplete</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Local LLM integration designed into the core editing loop, not bolted on.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222222] p-8 hover:border-primary transition-colors duration-150 group">
                <span className="material-symbols-outlined text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">terminal</span>
                <h3 className="font-h3 text-h3 text-primary mb-3">Agent-Operable</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Full headless API allowing AI agents to navigate and modify codebases.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#222222] p-8 hover:border-primary transition-colors duration-150 group">
                <span className="material-symbols-outlined text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">flight</span>
                <h3 className="font-h3 text-h3 text-primary mb-3">Lightweight Footprint</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">A 20MB binary. Unzip and run. No complex installation required.</p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-32 px-6 border-t border-[#111111] bg-surface-container-highest text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-h1 text-h1 text-primary mb-6">Stop tolerating slow.</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-12">Join the waitlist for early access to the terminal-native IDE of the future.</p>
              <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input className="bg-[#050505] border border-[#333333] px-6 py-4 text-primary font-mono w-full sm:w-80 focus:border-primary focus:ring-0 outline-none transition-colors" placeholder="root@localhost" required type="email" />
                <button className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 uppercase tracking-wider w-full sm:w-auto hover:bg-white/90 transition-colors" type="submit">
                  Join Waitlist
                </button>
              </form>
            </div>
          </section>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
