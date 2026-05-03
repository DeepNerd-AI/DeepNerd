import { Terminal, Database, FileJson, ArrowRight } from "lucide-react"

export function QuoteSection() {
  return (
    <section className="flex flex-col gap-24 py-12">
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center max-w-4xl mx-auto uppercase leading-[1.1]">
        "Agents don't need beautiful UIs. They need interfaces they can operate."
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column - Deterministic Execution */}
        <div className="flex flex-col border border-white/10 bg-white/[0.02]">
          <div className="p-8 border-b border-white/10 h-64 overflow-hidden relative font-mono text-xs text-muted-foreground">
            <pre className="text-white/80 whitespace-pre-wrap">
{`{
  "name": "executeTask",
  "description": "Runs agent workflow",
  "parameters": {
    "type": "object",
    "properties": {
      "input": { "type": "string" },
      "context": { "type": "object" }
    },
    "required": ["input"]
  }
}`}
            </pre>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]/80"></div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Deterministic Execution</h3>
            <p className="text-muted-foreground leading-relaxed">
              Consistent, fast, predictable JSON responses. Built for autonomous workflows and tool operations, stripping away unnecessary UI elements.
            </p>
          </div>
        </div>

        {/* Right Column - Low Latency */}
        <div className="flex flex-col border border-white/10 bg-white/[0.02]">
          <div className="p-8 border-b border-white/10 h-64 flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-4 text-white/50 w-full px-8">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center bg-black shrink-0 relative z-10">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 h-[1px] bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-mono uppercase bg-black px-2 tracking-widest text-white">
                  Execute
                </div>
              </div>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center bg-black shrink-0 relative z-10">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 h-[1px] bg-white/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-mono uppercase bg-black px-2 tracking-widest text-white">
                  Store
                </div>
              </div>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center bg-black shrink-0 relative z-10">
                <FileJson className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* Background scanner line effect */}
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20 shadow-[0_0_20px_2px_rgba(255,255,255,0.4)]" style={{animation: "scan 4s linear infinite alternate", willChange: "transform"}}>
              <style>{`
                @keyframes scan {
                  0% { transform: translateX(-100px); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(500px); opacity: 0; }
                }
              `}</style>
            </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Low Latency</h3>
            <p className="text-muted-foreground leading-relaxed">
              Designed for high-throughput autonomous machine-to-machine workloads. Removing the middleman to provide direct hardware-level communication.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
