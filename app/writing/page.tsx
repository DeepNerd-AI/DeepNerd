import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const posts = [
  { category: "Agents", date: "2024.10.05", title: "Agents as First-Class Citizens" },
  { category: "Philosophy", date: "2024.09.28", title: "The Death of the GUI" },
  { category: "Engineering", date: "2024.09.15", title: "Sub-10ms Latency in the Browser" },
  { category: "Releases", date: "2024.09.01", title: "v1.2.0: The Automation Update" },
];

export default function WritingPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#080808] text-on-background font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8 max-w-5xl">
          {/* Header */}
          <header className="mb-6">
            <h1 className="font-h1 text-h1 text-primary mb-1">Writing</h1>
            <p className="font-body-lg text-body-lg text-[#888888]">Engineering decisions. Opinions. Technical deep dives. No fluff.</p>
          </header>

          {/* Filter Strip */}
          <div className="flex items-center gap-6 border-b border-[#333333] mb-12 pb-2">
            <button className="font-label-sm text-label-sm uppercase tracking-widest text-primary border-b border-white pb-2 -mb-[9px]">All</button>
            <button className="font-label-sm text-label-sm uppercase tracking-widest text-[#888888] hover:text-primary transition-colors duration-150 pb-2">Engineering</button>
            <button className="font-label-sm text-label-sm uppercase tracking-widest text-[#888888] hover:text-primary transition-colors duration-150 pb-2">Agents</button>
            <button className="font-label-sm text-label-sm uppercase tracking-widest text-[#888888] hover:text-primary transition-colors duration-150 pb-2">Philosophy</button>
            <button className="font-label-sm text-label-sm uppercase tracking-widest text-[#888888] hover:text-primary transition-colors duration-150 pb-2">Releases</button>
          </div>

          {/* Featured Post */}
          <article className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 mb-12 hover:border-white transition-colors duration-150 group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs border border-[#2a2a2a] bg-[#131313] text-[#888888] px-2 py-1 rounded-sm uppercase tracking-widest">Engineering</span>
                <span className="font-mono text-label-xs text-[#888888]">2024.10.12</span>
              </div>
              <h2 className="font-h2 text-h2 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300">Why We Chose Rust for the DeepNerd Core</h2>
              <p className="font-body-md text-body-md text-[#888888] max-w-3xl">A deep dive into memory safety, zero-cost abstractions, and why performance is the only metric that matters for autonomous agents.</p>
              <div className="flex items-center gap-2 mt-4 text-primary font-label-sm text-label-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                <span>Read More</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </article>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <article key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 hover:border-white transition-colors duration-150 group cursor-pointer flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-xs text-label-xs border border-[#2a2a2a] bg-[#131313] text-[#888888] px-2 py-1 rounded-sm uppercase tracking-widest">{post.category}</span>
                    <span className="font-mono text-label-xs text-[#888888]">{post.date}</span>
                  </div>
                  <h3 className="font-h3 text-h3 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300">{post.title}</h3>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[#888888] group-hover:text-primary font-label-sm text-label-sm uppercase tracking-widest transition-colors duration-300">
                  <span>Read</span>
                  <span className="material-symbols-outlined text-[14px]">east</span>
                </div>
              </article>
            ))}
          </div>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
