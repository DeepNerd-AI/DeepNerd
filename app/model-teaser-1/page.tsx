"use client";

import { SmoothScroll } from "@/components/smooth-scroll";

export default function ModelTeaserPage() {
  return (
    <SmoothScroll>
      <div className="bg-black text-primary min-h-screen flex flex-col relative font-['Space_Grotesk'] overflow-hidden">
        <div className="absolute inset-0 noise-bg z-0"></div>
        <header className="absolute top-0 left-0 p-8 z-10 w-full flex justify-start">
          <span className="font-h3 text-h3 tracking-tighter text-primary select-none">DEEPNERD</span>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center px-6 relative z-10 w-full max-w-4xl mx-auto text-center space-y-6">
          <div className="mb-2">
            <span className="font-mono text-[10px] tracking-widest text-[#555555] uppercase select-none">CLASSIFIED</span>
          </div>
          <h1 className="font-h1 text-h1 text-primary max-w-2xl leading-tight">
            The model that runs the stack.
          </h1>
          <p className="font-body-lg text-body-lg text-[#888888] max-w-xl mx-auto">
            {`We're building up. When it ships, it'll know every tool, every agent, every interface in the DeepNerd world — natively.`}
          </p>
          <form className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2 mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-full flex-grow">
              <input className="w-full bg-[#0a0a0a] border border-[#333333] text-primary placeholder-[#555555] font-body-md text-body-md py-2 px-4 rounded-sm focus:outline-none focus:border-primary focus:ring-0 transition-colors duration-150" placeholder="Enter your email" required type="email" />
            </div>
            <button className="w-full sm:w-auto whitespace-nowrap bg-primary text-black font-bold text-sm px-6 py-2 rounded-sm hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150" type="submit">
              Notify Me
            </button>
          </form>
        </main>
        <footer className="absolute bottom-0 left-0 w-full p-8 z-10 flex justify-center pb-8">
          <span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase select-none">
            No timeline. No hype. Just work.
          </span>
        </footer>
      </div>
    </SmoothScroll>
  );
}
