import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function CareersPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#050505] text-[#888888] font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 pb-12 px-6 md:px-8 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <section className="mb-32 max-w-4xl">
            <h1 className="font-h1 text-h1 text-white mb-6">{`We're looking for people who think VSCode is too slow.`}</h1>
            <p className="font-body-lg text-body-lg">{`If you've ever rewritten something in Rust just because it bothered you — you might belong here.`}</p>
          </section>

          {/* Culture Strip */}
          <section className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-void mb-32">
            <div className="p-6 border-b md:border-b-0 md:border-r border-void">
              <h3 className="font-h3 text-h3 text-white mb-2">Speed</h3>
              <p className="font-body-md text-body-md">{`Ship before it's comfortable. Iterate faster than the market expects.`}</p>
            </div>
            <div className="p-6 border-b md:border-b-0 md:border-r border-void">
              <h3 className="font-h3 text-h3 text-white mb-2">Depth</h3>
              <p className="font-body-md text-body-md">Understand the underlying systems. Abstractions are meant to be broken.</p>
            </div>
            <div className="p-6">
              <h3 className="font-h3 text-h3 text-white mb-2">Ownership</h3>
              <p className="font-body-md text-body-md">{`Take the initiative. If it's broken, fix it. If it's missing, build it.`}</p>
            </div>
          </section>

          {/* Open Roles Section */}
          <section className="mb-32">
            <h2 className="font-h2 text-h2 text-white mb-6 border-b border-void pb-2">Open Roles</h2>
            <div className="flex flex-col gap-2">
              {/* Role Card 1 */}
              <a className="card-bg border border-void p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-white transition-colors duration-150 cursor-pointer" href="#">
                <div>
                  <h3 className="font-h3 text-h3 text-white group-hover:text-white transition-colors duration-150 mb-1">Founding Engineer (Rust)</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Engineering</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Remote</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline mt-4 md:mt-0 group-hover:text-white transition-colors duration-150">arrow_forward</span>
              </a>
              {/* Role Card 2 */}
              <a className="card-bg border border-void p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-white transition-colors duration-150 cursor-pointer" href="#">
                <div>
                  <h3 className="font-h3 text-h3 text-white group-hover:text-white transition-colors duration-150 mb-1">Product Designer (Technical)</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Design</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Remote</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline mt-4 md:mt-0 group-hover:text-white transition-colors duration-150">arrow_forward</span>
              </a>
              {/* Role Card 3 */}
              <a className="card-bg border border-void p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-white transition-colors duration-150 cursor-pointer" href="#">
                <div>
                  <h3 className="font-h3 text-h3 text-white group-hover:text-white transition-colors duration-150 mb-1">Research Lead (Agents)</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Research</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Remote</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline mt-4 md:mt-0 group-hover:text-white transition-colors duration-150">arrow_forward</span>
              </a>
              {/* Role Card 4 */}
              <a className="card-bg border border-void p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-white transition-colors duration-150 cursor-pointer" href="#">
                <div>
                  <h3 className="font-h3 text-h3 text-white group-hover:text-white transition-colors duration-150 mb-1">Systems Engineer</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Engineering</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-[#1a1a1a] px-2 py-1 text-on-surface-variant">Remote</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline mt-4 md:mt-0 group-hover:text-white transition-colors duration-150">arrow_forward</span>
              </a>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="border-t border-void pt-12 pb-12 flex flex-col items-start gap-4">
            <h3 className="font-h3 text-h3 text-white">{`Don't see your role? We read every email.`}</h3>
            <a className="font-label-sm text-label-sm text-white border border-white px-4 py-2 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150 uppercase tracking-widest" href="mailto:hello@deepnerd.dev">hello@deepnerd.dev</a>
          </section>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
