import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function NewHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-8 max-w-xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight">
          WE'RE NOT BUILDING FOR HUMANS.
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          DeepNerd builds the infrastructure AI agents actually need — not another tool-board. Machine-readable. Agent-operable. Autonomous by design.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest mt-4">
          <Link
            href="#use"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition-colors"
          >
            Use The Agents
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-2 border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Read The Docs
          </Link>
        </div>
      </div>
      <div className="flex justify-center md:justify-end relative">
        <div className="w-full max-w-[400px] aspect-square relative text-white/20">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.5">
            {/* Concentric Circles */}
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="10" />
            
            {/* Radial Lines */}
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" />
            <line x1="21.7" y1="78.3" x2="78.3" y2="21.7" />

            {/* Polygon / Data Shape */}
            <polygon 
              points="50,20 71.2,28.8 80,50 60.6,71.2 50,80 30,60 20,50 28.8,28.8" 
              className="stroke-white text-white fill-white/5" 
              strokeWidth="1"
            />

            {/* Dots */}
            <circle cx="50" cy="20" r="1.5" className="fill-white" />
            <circle cx="71.2" cy="28.8" r="1.5" className="fill-white" />
            <circle cx="80" cy="50" r="1.5" className="fill-white" />
            <circle cx="60.6" cy="71.2" r="1.5" className="fill-white" />
            <circle cx="50" cy="80" r="1.5" className="fill-white" />
            <circle cx="30" cy="60" r="1.5" className="fill-white" />
            <circle cx="20" cy="50" r="1.5" className="fill-white" />
            <circle cx="28.8" cy="28.8" r="1.5" className="fill-white" />
            <circle cx="50" cy="50" r="1.5" className="fill-white" />
          </svg>
        </div>
      </div>
    </section>
  )
}
