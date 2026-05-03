import { Terminal, Database, Shield, Zap, Box, Activity } from "lucide-react"

export function CoreInfrastructure() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex gap-4 items-center mb-4 border-b border-white/10 pb-8">
        <h2 className="text-3xl font-bold tracking-tight">Core Infrastructure</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 bg-black/50">
        
        {/* Agent OS */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-6 group hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>OS_CORE</span>
            <Box className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Agent OS</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seamless execution environment optimized for autonomous AI tasks and workflows.
            </p>
          </div>
        </div>

        {/* Autonomous Workers */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-6 group hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>OS_EXEC</span>
            <Activity className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Autonomous Workers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pre-configured autonomous workers capable of executing complex multi-step, reasoning tasks.
            </p>
          </div>
        </div>

        {/* Pipeline RAG */}
        <div className="p-8 border-b md:border-b-0 border-white/10 flex flex-col gap-6 group hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>OS_NETWORK</span>
            <Zap className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Pipeline RAG</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Self-healing distributed systems that automatically detect and patch RAG anomalies.
            </p>
          </div>
        </div>

        {/* Native Toolchain */}
        <div className="p-8 border-t border-r border-white/10 flex flex-col gap-6 group hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span>OS_DATA</span>
            <Database className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Native Toolchain</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Standardized API connection protocols defined centrally for uniform tool interactions.
            </p>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="p-8 border-t border-white/10 md:col-span-2 flex flex-col gap-6 group hover:bg-white/5 transition-colors relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-widest relative z-10">
            <span>OS_SEC</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <Terminal className="w-4 h-4 opacity-50" />
            </span>
          </div>
          <div className="font-mono text-xs text-muted-foreground/70 leading-loose relative z-10 space-y-1">
            <p className="text-white">{"[INIT] OS SEQUENCE"}</p>
            <p>{"Loading modules for autonomous environment... success."}</p>
            <p>{"Mounting tools: fs, exec, network... success."}</p>
            <p>{"Verifying agent runtime protocols... "}<span className="text-white">secure</span>.</p>
          </div>
          {/* Faded background text for visual flair */}
          <div className="absolute right-[-10%] bottom-[-20%] text-[8rem] font-bold text-white/[0.02] pointer-events-none uppercase leading-none font-sans select-none tracking-tighter">
            AGENTS
          </div>
        </div>

      </div>
    </section>
  )
}
