import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const sdkCode = `import { DeepNerd } from '@deepnerd/core';

const shell = await DeepNerd.tool('deepshell');
await shell.execute('cargo build');`;

const tools = [
  { tag: "AGENT_EXEC", status: "Stable", statusStyle: "text-white", name: "DeepShell", desc: "Terminal access with safety sandbox." },
  { tag: "API_PRIM", status: "Stable", statusStyle: "text-white", name: "Native-FS", desc: "Direct, high-speed file system operations." },
  { tag: "DEV_TOOL", status: "Beta", statusStyle: "text-[#aaaaaa]", name: "V-GPU", desc: "Virtualized GPU compute for agent inference." },
  { tag: "API_PRIM", status: "Stable", statusStyle: "text-white", name: "Auth-Proxy", desc: "Stateless agent authentication." },
  { tag: "AGENT_EXEC", status: "Soon", statusStyle: "text-[#666666] border-dashed", name: "Dom-Navigator", desc: "Machine-readable browser automation.", dimmed: true },
  { tag: "DEV_TOOL", status: "Beta", statusStyle: "text-[#aaaaaa]", name: "Kernel-Hook", desc: "Low-level system event monitoring." },
  { tag: "API_PRIM", status: "Stable", statusStyle: "text-white", name: "Secret-Safe", desc: "Encrypted key management for agents." },
  { tag: "DEV_TOOL", status: "Stable", statusStyle: "text-white", name: "Log-Stream", desc: "Real-time agent execution telemetry." },
  { tag: "API_PRIM", status: "Beta", statusStyle: "text-[#aaaaaa]", name: "Net-Stack", desc: "Agent-native TCP/UDP primitives." },
  { tag: "AGENT_EXEC", status: "Soon", statusStyle: "text-[#666666] border-dashed", name: "C-Runner", desc: "Compiled-speed agent task execution.", dimmed: true },
];

export default function ToolsPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#080808] text-primary font-['Space_Grotesk'] antialiased min-h-screen flex flex-col selection:bg-white selection:text-black">
        <Navbar />
        <main className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto">
          {/* Hero Section */}
          <section className="w-full px-6 py-[120px] md:py-[160px] flex flex-col items-start border-b border-[#2a2a2a]">
            <div className="max-w-3xl">
              <h1 className="font-h1 text-h1 text-white mb-6">Tools built for execution.<br/>Not extraction.</h1>
              <p className="font-body-lg text-body-lg text-[#888888] max-w-2xl">Not another MCP wrapper. Primitives that agents use to act — not just read.</p>
            </div>
          </section>

          {/* Tools Grid Section */}
          <section className="w-full px-6 py-12 md:py-[80px]">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-12 border-b border-[#2a2a2a] pb-1">
              <button className="font-label-sm text-label-sm text-white border-b-2 border-white pb-2 px-1">All</button>
              <button className="font-label-sm text-label-sm text-[#888888] hover:text-white pb-2 px-1 transition-colors">Agent Tools</button>
              <button className="font-label-sm text-label-sm text-[#888888] hover:text-white pb-2 px-1 transition-colors">Developer Tools</button>
              <button className="font-label-sm text-label-sm text-[#888888] hover:text-white pb-2 px-1 transition-colors">API Primitives</button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, i) => (
                <div key={i} className="bg-[#111111] border border-[#2a2a2a] p-6 hover:border-white hover:bg-[#151515] transition-all duration-150 group cursor-pointer flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#666666] group-hover:text-[#aaaaaa] transition-colors">{tool.tag}</span>
                    <span className={`bg-[#1a1a1a] border border-[#333333] ${tool.statusStyle} px-2 py-1 font-mono text-[10px] uppercase`}>{tool.status}</span>
                  </div>
                  <h3 className={`font-h3 text-h3 text-white mb-2 ${tool.dimmed ? 'opacity-50' : ''}`}>{tool.name}</h3>
                  <p className={`font-body-md text-body-md ${tool.dimmed ? 'text-[#555555]' : 'text-[#888888]'} flex-grow`}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy Strip */}
          <section className="w-full bg-[#0a0a0a] border-y border-[#2a2a2a] py-[100px] px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
              <h2 className="font-h2 text-h2 text-white max-w-4xl mb-6 leading-tight">
                {`"We don't add more MCPs.`}<br/>{`We make them unnecessary."`}
              </h2>
              <p className="font-body-md text-body-md text-[#888888] max-w-2xl">
                The gap between reading data and taking action is where reliability fails. Our primitives are built for agents to own the execution layer, not just extract information from it.
              </p>
            </div>
          </section>

          {/* SDK Section */}
          <section className="w-full px-6 py-[100px] flex flex-col md:flex-row gap-12 items-center border-b border-[#2a2a2a]">
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <h2 className="font-h2 text-h2 text-white mb-4">Integrate in seconds.</h2>
              <p className="font-body-md text-body-md text-[#888888] mb-6">Zero configuration. Direct access to high-performance system primitives from your agent loops.</p>
              <button className="bg-transparent border border-[#333333] text-white px-6 py-2 font-label-sm font-bold uppercase tracking-wider hover:border-white transition-colors duration-150">
                View Full Docs
              </button>
            </div>
            <div className="w-full md:w-1/2 bg-[#050505] border border-[#2a2a2a] p-6 font-mono text-sm overflow-x-auto text-[#aaaaaa]">
              <pre className="leading-relaxed"><code>{sdkCode}</code></pre>
            </div>
          </section>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
