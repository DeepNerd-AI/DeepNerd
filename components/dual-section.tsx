export function DualSection() {
  return (
    <section className="flex flex-col gap-12 py-12">
      <h2 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl uppercase leading-[0.9]">
        We don't choose sides.<br/>
        <span className="text-white/50">Agents run it.</span><br/>
        Developers ship it.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10 bg-white/[0.01]">
        
        {/* UI FOR AGENTS */}
        <div className="p-8 md:border-r border-white/10 flex flex-col gap-8">
          <div className="font-mono text-sm tracking-widest uppercase border-b border-white/10 pb-4">
            UI FOR AGENTS
          </div>
          <div className="flex flex-col font-mono text-xs text-muted-foreground uppercase tracking-wider">
            <div className="grid grid-cols-3 border-b border-white/5 py-4">
              <span className="col-span-1 text-white/40">TYPE</span>
              <span className="col-span-2 text-white">Machine Graph API</span>
            </div>
            <div className="grid grid-cols-3 border-b border-white/5 py-4">
              <span className="col-span-1 text-white/40">I/O</span>
              <span className="col-span-2 text-white">JSON, Protobuf</span>
            </div>
            <div className="grid grid-cols-3 py-4">
              <span className="col-span-1 text-white/40">SPEED</span>
              <span className="col-span-2 text-white">Sub-10ms TTFB</span>
            </div>
          </div>
        </div>

        {/* UI FOR DEVELOPERS */}
        <div className="p-8 flex flex-col gap-8">
          <div className="font-mono text-sm tracking-widest uppercase border-b border-white/10 pb-4">
            UI FOR DEVELOPERS
          </div>
          <div className="flex flex-col font-mono text-xs text-muted-foreground uppercase tracking-wider">
            <div className="grid grid-cols-3 border-b border-white/5 py-4">
              <span className="col-span-1 text-white/40">TYPE</span>
              <span className="col-span-2 text-white">React / Next.js Components</span>
            </div>
            <div className="grid grid-cols-3 border-b border-white/5 py-4">
              <span className="col-span-1 text-white/40">STATE</span>
              <span className="col-span-2 text-white">100% Declarative</span>
            </div>
            <div className="grid grid-cols-3 py-4">
              <span className="col-span-1 text-white/40">SETUP</span>
              <span className="col-span-2 text-white">{"< 2 Lines of Configuration"}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
