import { Terminal, Copy } from "lucide-react"

export function DeveloperStack() {
  return (
    <section className="flex flex-col gap-8 py-12">
      <h2 className="text-3xl font-bold tracking-tight">The Developer Stack</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 bg-black">
        
        {/* Left Column (Spans 2) */}
        <div className="col-span-1 md:col-span-2 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
          
          {/* Top section: Code block */}
          <div className="p-8 border-b border-white/10 flex flex-col gap-6 relative">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-white/10 pb-4">
              <span>OS_SDK</span>
              <div className="flex gap-4">
                <span className="text-white">View Code</span>
                <span>Run App</span>
              </div>
            </div>
            <div className="font-mono text-sm leading-relaxed text-white/80 bg-white/[0.02] p-6 border border-white/5 relative overflow-hidden">
              <pre>
{`import { DeepNerd } from "@deepnerd/core";

const agent = new DeepNerd({
  api_key: process.env.API_KEY,
});

// Autonomous execution initialized
agent.execute("scan-repo");`}
              </pre>
            </div>
          </div>

          {/* Bottom section: CLI */}
          <div className="p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 relative z-10">
              <span>OS_CLI</span>
              <span>Native</span>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight relative z-10 mb-4">
              It's native. It's fast. It's yours.
            </h3>
            <div className="font-mono text-xs text-muted-foreground flex flex-col gap-2 relative z-10">
              <p className="text-white">{"$ deepnerd install --core"}</p>
              <p className="pl-4 border-l border-white/20">{"[✓] core initialized"}</p>
              <p className="pl-4 border-l border-white/20">{"[✓] fs linked"}</p>
              <p className="pl-4 border-l border-white/20">{"[✓] network ready"}</p>
            </div>
            {/* Background styling */}
            <div className="absolute right-[-5%] bottom-[-10%] opacity-5 pointer-events-none">
              <Terminal className="w-[300px] h-[300px]" />
            </div>
          </div>

        </div>

        {/* Right Column (Spans 1) */}
        <div className="col-span-1 flex flex-col">
          
          {/* Top section: Browser debug */}
          <div className="flex-1 p-8 border-b border-white/10 flex flex-col gap-6 items-center justify-center relative group overflow-hidden">
            <div className="absolute top-8 left-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              OS_BROWSER
            </div>
            <div className="absolute top-8 right-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              DEBUG
            </div>
            
            {/* Diagram */}
            <div className="mt-12 w-48 h-48 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 fill-none" strokeWidth="1">
                <line x1="50" y1="10" x2="90" y2="50" />
                <line x1="90" y1="50" x2="50" y2="90" />
                <line x1="50" y1="90" x2="10" y2="50" />
                <line x1="10" y1="50" x2="50" y2="10" />
                
                <circle cx="50" cy="10" r="4" className="fill-black stroke-white" strokeWidth="2" />
                <circle cx="90" cy="50" r="4" className="fill-black stroke-white" strokeWidth="2" />
                <circle cx="50" cy="90" r="4" className="fill-black stroke-white" strokeWidth="2" />
                <circle cx="10" cy="50" r="4" className="fill-black stroke-white" strokeWidth="2" />
                
                <circle cx="50" cy="50" r="1.5" className="fill-white stroke-none" />
              </svg>
            </div>
          </div>

          {/* Bottom section: Install */}
          <div className="p-8 h-[250px] flex flex-col justify-end relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-8 left-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              INSTALL
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-red-500/20 font-bold text-4xl uppercase -rotate-12 border-4 border-red-500/20 px-4 py-2">
                Deploying...
              </span>
            </div>
            
            <button className="flex items-center justify-between border border-white/20 bg-black px-4 py-3 text-sm font-mono text-white hover:bg-white/10 transition-colors w-full relative z-10">
              <span>npm install @deepnerd/core</span>
              <Copy className="w-4 h-4 text-white/50" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
