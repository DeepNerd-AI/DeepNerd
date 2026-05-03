export function FeaturesTable() {
  return (
    <section className="flex flex-col py-12">
      <div className="border-t border-white/20">
        {/* SPEED row */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/20 py-8 group hover:bg-white/[0.02] transition-colors px-4">
          <div className="col-span-1 flex items-center">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white group-hover:text-white/80 transition-colors">
              SPEED
            </h3>
          </div>
          <div className="col-span-1 md:col-span-3 flex items-center pt-4 md:pt-0">
            <p className="text-muted-foreground text-sm md:text-base tracking-wide uppercase font-mono">
              Instant execution on the Edge with Distributed inference for pure speed.
            </p>
          </div>
        </div>

        {/* ACCURACY row */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/20 py-8 group hover:bg-white/[0.02] transition-colors px-4">
          <div className="col-span-1 flex items-center">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white group-hover:text-white/80 transition-colors">
              ACCURACY
            </h3>
          </div>
          <div className="col-span-1 md:col-span-3 flex items-center pt-4 md:pt-0">
            <p className="text-muted-foreground text-sm md:text-base tracking-wide uppercase font-mono">
              Deterministic routing for reliably passing JSON payloads.
            </p>
          </div>
        </div>

        {/* AI-NATIVE row */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/20 py-8 group hover:bg-white/[0.02] transition-colors px-4">
          <div className="col-span-1 flex items-center">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white group-hover:text-white/80 transition-colors">
              AI-NATIVE
            </h3>
          </div>
          <div className="col-span-1 md:col-span-3 flex items-center pt-4 md:pt-0">
            <p className="text-muted-foreground text-sm md:text-base tracking-wide uppercase font-mono">
              Built specifically as a core environment that scales as machine models scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
