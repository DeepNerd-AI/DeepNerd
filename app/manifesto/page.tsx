import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function ManifestoPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#050505] text-on-background font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center w-full">
          {/* Hero Section */}
          <section className="w-full max-w-[960px] px-6 py-32 md:py-48 flex flex-col justify-center">
            <h1 className="text-white text-[64px] md:text-[96px] leading-[1.1] font-bold tracking-tighter mb-8">
              We think the tools are broken.<br/>
              So we rebuilt them.
            </h1>
          </section>

          {/* Manifesto Section */}
          <section className="w-full max-w-[800px] px-6 py-24 flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <h2 className="text-white text-[32px] md:text-[40px] font-bold leading-tight tracking-tight">{`Speed is not a feature. It's a requirement.`}</h2>
              <p className="text-[#888888] text-[18px] md:text-[20px] leading-relaxed font-light">
                {`In a system designed for high-throughput automated agents, milliseconds compound into minutes. We stripped the abstraction layers, removed the cruft, and engineered every path for zero-latency execution. If it isn't instantaneous, it's broken.`}
              </p>
            </div>
            <hr className="border-[#333333] w-full" />
            <div className="flex flex-col gap-6">
              <h2 className="text-white text-[32px] md:text-[40px] font-bold leading-tight tracking-tight">{`Agents don't need beautiful UIs. They need interfaces they can operate.`}</h2>
              <p className="text-[#888888] text-[18px] md:text-[20px] leading-relaxed font-light">
                The era of human-only design is over. Our interfaces are structurally deterministic, providing APIs that look like UIs and UIs that behave like APIs. We design for the machine first, ensuring every interaction is programmable, predictable, and parseable.
              </p>
            </div>
            <hr className="border-[#333333] w-full" />
            <div className="flex flex-col gap-6">
              <h2 className="text-white text-[32px] md:text-[40px] font-bold leading-tight tracking-tight">{`We chose Rust because we're serious.`}</h2>
              <p className="text-[#888888] text-[18px] md:text-[20px] leading-relaxed font-light">
                {`Memory safety, fearless concurrency, and bare-metal performance aren't just buzzwords. They are the foundational requirements for building resilient infrastructure that won't collapse under the weight of autonomous swarms. We don't compromise on the core.`}
              </p>
            </div>
            <hr className="border-[#333333] w-full" />
            <div className="flex flex-col gap-6">
              <h2 className="text-white text-[32px] md:text-[40px] font-bold leading-tight tracking-tight">AI-native doesn&apos;t mean AI-added.</h2>
              <p className="text-[#888888] text-[18px] md:text-[20px] leading-relaxed font-light">
                Wrapping an LLM in a text box is a toy. We build primitives where intelligence is woven into the execution engine. Our systems anticipate context, structure unstructured intent, and execute complex workflows without requiring a chat interface as a crutch.
              </p>
            </div>
            <hr className="border-[#333333] w-full" />
          </section>

          {/* What We Build Section */}
          <section className="w-full max-w-[960px] px-6 py-32 flex flex-col gap-12">
            <h3 className="text-[#555555] tracking-[0.2em] uppercase text-sm mb-4">Architecture</h3>
            <ul className="flex flex-col gap-8">
              <li className="flex items-baseline gap-4 border-b border-[#111111] pb-8">
                <span className="text-white text-[48px] md:text-[64px] font-bold tracking-tighter">IDE</span>
                <span className="text-[#666666] font-mono text-lg md:text-xl">[EDITOR]</span>
              </li>
              <li className="flex items-baseline gap-4 border-b border-[#111111] pb-8">
                <span className="text-white text-[48px] md:text-[64px] font-bold tracking-tighter">Agents</span>
                <span className="text-[#666666] font-mono text-lg md:text-xl">[OPERATORS]</span>
              </li>
              <li className="flex items-baseline gap-4 border-b border-[#111111] pb-8">
                <span className="text-white text-[48px] md:text-[64px] font-bold tracking-tighter">Automation</span>
                <span className="text-[#666666] font-mono text-lg md:text-xl">[WORKFLOW]</span>
              </li>
              <li className="flex items-baseline gap-4 border-b border-[#111111] pb-8">
                <span className="text-white text-[48px] md:text-[64px] font-bold tracking-tighter">Tools</span>
                <span className="text-[#666666] font-mono text-lg md:text-xl">[UTILITIES]</span>
              </li>
              <li className="flex items-baseline gap-4 border-b border-[#111111] pb-8">
                <span className="text-white text-[48px] md:text-[64px] font-bold tracking-tighter">Model</span>
                <span className="text-[#666666] font-mono text-lg md:text-xl">[ENGINE]</span>
              </li>
            </ul>
          </section>

          {/* Closing Section */}
          <section className="w-full px-6 py-48 flex justify-center items-center">
            <h2 className="text-white text-[48px] md:text-[80px] font-black tracking-tighter text-center leading-none">
              Deep by design.<br/>
              Nerd is not an insult.
            </h2>
          </section>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
