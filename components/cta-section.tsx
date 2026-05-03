import Link from "next/link"

export function CtaSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-8 py-24 border-t border-b border-white/10 my-12 relative overflow-hidden">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          If you hate slow tools as much as we do — you belong here.
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 font-mono text-xs uppercase tracking-widest">
          <Link
            href="#use"
            className="flex items-center justify-center bg-white text-black px-8 py-4 font-bold hover:bg-gray-200 transition-colors"
          >
            Use The Agents
          </Link>
          <Link
            href="/docs"
            className="flex items-center justify-center border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-colors text-white"
          >
            Read The Docs
          </Link>
        </div>
      </div>
    </section>
  )
}
