import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function AutomationPage() {
  return (
    <SmoothScroll>
      <div className="bg-black text-[#e2e2e2] font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-32">
          {/* Hero Section */}
          <section className="flex flex-col items-start pt-20 pb-12 w-full max-w-4xl">
            <h1 className="font-h1 text-h1 text-white mb-6">If it repeats, it runs itself.</h1>
            <p className="font-body-lg text-body-lg text-grey mb-10 max-w-2xl">Connect your stack. Define the trigger. Walk away. DeepNerd Automation handles the glue logic with sub-millisecond latency.</p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-6 py-3 font-body-md font-bold uppercase tracking-tight hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150">Build a Pipeline</button>
              <button className="bg-transparent text-white border border-subtle px-6 py-3 font-body-md uppercase tracking-tight hover:border-white transition-all duration-150">See Examples</button>
            </div>
          </section>

          {/* Pipeline Visualizer */}
          <section className="w-full relative py-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#000] to-[#000] opacity-50 z-0"></div>
            <div className="relative z-10 code-block p-8 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm">
              <div className="flex flex-col gap-4 items-center">
                <span className="font-mono text-xs text-grey">Event</span>
                <div className="border border-subtle bg-subtle px-4 py-2 font-mono text-sm text-white">PR_OPENED</div>
              </div>
              <div className="hidden md:flex flex-grow h-px bg-subtle relative items-center justify-center">
                <span className="material-symbols-outlined text-grey text-sm absolute">arrow_forward</span>
              </div>
              <div className="md:hidden w-px h-8 bg-subtle"></div>
              <div className="flex flex-col gap-4 items-center">
                <span className="font-mono text-xs text-grey">Action 01</span>
                <div className="border border-white bg-black px-4 py-2 font-mono text-sm text-white shadow-[0_0_8px_rgba(255,255,255,0.15)]">RUN_TESTS</div>
              </div>
              <div className="hidden md:flex flex-grow h-px bg-subtle relative items-center justify-center">
                <span className="material-symbols-outlined text-grey text-sm absolute">arrow_forward</span>
              </div>
              <div className="md:hidden w-px h-8 bg-subtle"></div>
              <div className="flex flex-col gap-4 items-center">
                <span className="font-mono text-xs text-grey">Action 02</span>
                <div className="border border-subtle bg-subtle px-4 py-2 font-mono text-sm text-white">DEPLOY_STAGING</div>
              </div>
              <div className="hidden md:flex flex-grow h-px bg-subtle relative items-center justify-center">
                <span className="material-symbols-outlined text-grey text-sm absolute">arrow_forward</span>
              </div>
              <div className="md:hidden w-px h-8 bg-subtle"></div>
              <div className="flex flex-col gap-4 items-center">
                <span className="font-mono text-xs text-grey">Notify</span>
                <div className="border border-subtle bg-subtle px-4 py-2 font-mono text-sm text-white">SLACK_NOTIFY</div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="w-full flex flex-col gap-12">
            <h2 className="font-h2 text-h2 text-white">The Execution Flow</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px border-t border-dashed border-subtle -translate-y-1/2 z-0"></div>
              <div className="bg-card border border-subtle p-6 flex flex-col gap-4 z-10 glow-hover transition-all duration-150 rounded-sm">
                <span className="font-mono text-white/50 text-xl">01</span>
                <h3 className="font-h3 text-h3 text-white">Define Trigger</h3>
                <p className="font-body-md text-body-md text-grey">Listen to webhooks, database row changes, or cron schedules. The system waits in pure silence until conditions are met.</p>
              </div>
              <div className="bg-card border border-subtle p-6 flex flex-col gap-4 z-10 glow-hover transition-all duration-150 rounded-sm">
                <span className="font-mono text-white/50 text-xl">02</span>
                <h3 className="font-h3 text-h3 text-white">Set Actions</h3>
                <p className="font-body-md text-body-md text-grey">Chain logical operations. Filter payloads, map JSON outputs, and construct complex API requests visually or via code.</p>
              </div>
              <div className="bg-card border border-subtle p-6 flex flex-col gap-4 z-10 glow-hover transition-all duration-150 rounded-sm">
                <span className="font-mono text-white/50 text-xl">03</span>
                <h3 className="font-h3 text-h3 text-white">Agent Executes</h3>
                <p className="font-body-md text-body-md text-grey">The pipeline compiles and runs on our edge network. Logs stream back instantly for complete observability.</p>
              </div>
            </div>
          </section>

          {/* Integration Strip */}
          <section className="w-full py-12 flex flex-col items-center gap-8 border-y border-subtle">
            <h3 className="font-label-sm text-label-sm text-grey uppercase tracking-widest">Connects with everything</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="border border-subtle bg-subtle px-4 py-1.5 font-mono text-sm text-white rounded-full">GitHub</span>
              <span className="border border-subtle bg-subtle px-4 py-1.5 font-mono text-sm text-white rounded-full">Linear</span>
              <span className="border border-subtle bg-subtle px-4 py-1.5 font-mono text-sm text-white rounded-full">Slack</span>
              <span className="border border-subtle bg-subtle px-4 py-1.5 font-mono text-sm text-white rounded-full">Vercel</span>
              <span className="border border-subtle bg-subtle px-4 py-1.5 font-mono text-sm text-white rounded-full">AWS</span>
              <span className="border border-subtle bg-subtle px-4 py-1.5 font-mono text-sm text-white rounded-full">PostgreSQL</span>
            </div>
          </section>

          {/* Features Grid */}
          <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-popover border border-subtle p-8 flex flex-col gap-4 glow-hover transition-all duration-150">
                <span className="material-symbols-outlined text-white text-3xl mb-2">bolt</span>
                <h3 className="font-h3 text-h3 text-white">Speed</h3>
                <p className="font-body-md text-body-md text-grey">Edge-deployed runtimes ensure sub-50ms latency from trigger to initial execution. No cold starts.</p>
              </div>
              <div className="bg-popover border border-subtle p-8 flex flex-col gap-4 glow-hover transition-all duration-150">
                <span className="material-symbols-outlined text-white text-3xl mb-2">verified</span>
                <h3 className="font-h3 text-h3 text-white">Accuracy</h3>
                <p className="font-body-md text-body-md text-grey">Deterministic execution paths. Built-in retry logic and dead-letter queues guarantee message delivery.</p>
              </div>
              <div className="bg-popover border border-subtle p-8 flex flex-col gap-4 glow-hover transition-all duration-150">
                <span className="material-symbols-outlined text-white text-3xl mb-2">memory</span>
                <h3 className="font-h3 text-h3 text-white">AI Decision Layer</h3>
                <p className="font-body-md text-body-md text-grey">Inject LLM evaluations mid-pipeline to parse unstructured data or route payloads based on sentiment.</p>
              </div>
              <div className="bg-popover border border-subtle p-8 flex flex-col gap-4 glow-hover transition-all duration-150">
                <span className="material-symbols-outlined text-white text-3xl mb-2">code_blocks</span>
                <h3 className="font-h3 text-h3 text-white">Zero Glue Code</h3>
                <p className="font-body-md text-body-md text-grey">Eliminate fragile middleware. Our visual builder handles auth, pagination, and rate limits out of the box.</p>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="w-full py-20 flex flex-col items-center text-center gap-8 border border-subtle bg-[#050505]">
            <h2 className="font-h2 text-h2 text-white">Replace your glue code.</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input className="bg-popover border border-subtle text-white font-mono text-sm px-4 py-3 flex-grow focus:border-white focus:ring-0 outline-none transition-colors rounded-none placeholder:text-[#555]" placeholder="sysadmin@company.com" type="email" />
              <button className="bg-white text-black px-6 py-3 font-body-md font-bold uppercase tracking-tight hover:shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 whitespace-nowrap">Start Automating</button>
            </div>
          </section>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
