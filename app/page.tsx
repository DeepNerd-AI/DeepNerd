import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll"
import Silk from "@/components/ui/silk"
import Link from "next/link"
import { Testimonials } from "@/components/demo-testimonials"
import { GridPatternBackground } from "@/components/ui/grid-feature-cards"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Navbar } from "@/components/ui/navbar"

export default async function Page(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  if (searchParams?.code) {
    redirect(`/auth/callback?code=${searchParams.code}`);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <SmoothScroll>
      <div className="bg-background text-on-background font-body-lg text-body-lg antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
        {/* converted content */}
        
<Navbar />
<main className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto border-x border-zinc-800">
{/* Hero Section */}
<section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center px-6 md:px-12 py-12 noise-bg border-b border-zinc-800" style={{ backgroundColor: '#050505' }}>
<Silk speed={5} scale={1} color="#2A2A2A" noiseIntensity={1.5} rotation={0} className="absolute inset-0 z-0 bg-transparent opacity-60 mix-blend-screen" />
<div className="relative z-10 max-w-4xl flex flex-col items-center gap-8">
<h1 className="text-[48px] md:text-[72px] lg:text-[84px] leading-[0.9] font-black tracking-tighter text-white uppercase">We're not<br/>building for<br/>humans.</h1>
<p className="font-body-lg text-body-lg text-zinc-400 max-w-2xl text-lg md:text-xl mx-auto">
                    DeepNerd builds the infrastructure AI agents actually need — not prettier dashboards. Machine-readable. Agent-operable. Autonomous by design.</p>
<div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
<Link className="bg-primary text-on-primary px-8 py-4 font-technical-label text-technical-label uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2" href="/signup">
                        INIT WORKSPACE <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
<a className="bg-black text-white border border-zinc-600 px-8 py-4 font-technical-label text-technical-label uppercase tracking-widest hover:bg-zinc-900 hover:border-white transition-colors flex items-center justify-center" href="#">
                        READ THE VISION
                    </a>
</div>
</div>
</section>
{/* Trust Bar */}
<section className="py-8 px-6 md:px-12 border-b border-zinc-800 bg-black flex flex-wrap gap-8 items-center justify-between opacity-50 grayscale font-technical-label text-technical-label tracking-widest text-zinc-500">
<span className="">VSCODE</span>
<span className="">GITHUB</span>
<span className="">CLAUDE</span>
<span className="">OPENAI</span>
<span className="">TERMINAL</span>
<span className="">LINUX</span>
</section>
{/* What We Build Section */}
<section className="py-24 px-6 md:px-12 noise-bg border-b border-zinc-800" style={{ backgroundColor: '#000000' }}>
<div className="mb-16">
<h2 className="font-headline-lg text-headline-lg text-white mb-4">Core Infrastructure</h2>
<div className="h-px w-full bg-zinc-800 mt-8 relative">
<div className="absolute top-0 left-0 w-24 h-px bg-white"></div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-800">
{/* Card 1 */}
<div className="bg-black p-8 border-b md:border-r lg:border-b-0 border-zinc-800 hover-bento transition-all duration-200 flex flex-col h-64 justify-between relative group">
<div className="font-code-sm text-code-sm text-zinc-500 mb-4 group-hover:text-white transition-colors">01 / Vault IDE</div>
<div>
<h3 className="font-headline-md text-headline-md text-white mb-2">Agent Vault IDE</h3>
<p className="font-body-md text-body-md text-zinc-400">Headless development environment optimized for autonomous code generation and validation loops.</p>
</div>
<span className="material-symbols-outlined absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-colors" data-icon="terminal">terminal</span>
</div>
{/* Card 2 */}
<div className="bg-black p-8 border-b lg:border-r lg:border-b-0 border-zinc-800 hover-bento transition-all duration-200 flex flex-col h-64 justify-between relative group">
<div className="font-code-sm text-code-sm text-zinc-500 mb-4 group-hover:text-white transition-colors">02 / AGENTS</div>
<div>
<h3 className="font-headline-md text-headline-md text-white mb-2">Autonomous Workers</h3>
<p className="font-body-md text-body-md text-zinc-400">Pre-configured operational nodes capable of executing complex multi-step reasoning tasks.</p>
</div>
<span className="material-symbols-outlined absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-colors" data-icon="smart_toy">smart_toy</span>
</div>
{/* Card 3 */}
<div className="bg-black p-8 border-b md:border-r lg:border-r-0 lg:border-b-0 border-zinc-800 hover-bento transition-all duration-200 flex flex-col h-64 justify-between relative group">
<div className="font-code-sm text-code-sm text-zinc-500 mb-4 group-hover:text-white transition-colors">03 / AUTOMATION</div>
<div>
<h3 className="font-headline-md text-headline-md text-white mb-2">Pipeline CI/CD</h3>
<p className="font-body-md text-body-md text-zinc-400">Self-healing deployment pipelines that automatically detect and patch structural vulnerabilities.</p>
</div>
<span className="material-symbols-outlined absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-colors" data-icon="account_tree">account_tree</span>
</div>
{/* Card 4 */}
<div className="bg-black p-8 border-b md:border-b-0 md:border-r border-zinc-800 hover-bento transition-all duration-200 flex flex-col h-64 justify-between relative group lg:border-t">
<div className="font-code-sm text-code-sm text-zinc-500 mb-4 group-hover:text-white transition-colors">04 / TOOLS</div>
<div>
<h3 className="font-headline-md text-headline-md text-white mb-2">Native Toolchain</h3>
<p className="font-body-md text-body-md text-zinc-400">Standardized API connectors and shell utilities designed exclusively for non-human interaction.</p>
</div>
<span className="material-symbols-outlined absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-colors" data-icon="build">build</span>
</div>
{/* Card 5 */}
<div className="bg-[#050505] p-8 border-zinc-800 hover-bento transition-all duration-200 flex flex-col h-64 justify-between relative group lg:border-t">
<div className="font-code-sm text-code-sm text-zinc-600 mb-4">05 / MODEL</div>
<div>
<h3 className="font-headline-md text-headline-md text-zinc-500 mb-2">[INITIALIZING]</h3>
<p className="font-body-md text-body-md text-zinc-600">Awaiting parameter synchronization. Core logic model deployment scheduled.</p>
</div>
<div className="absolute top-8 right-8 px-2 py-1 border border-zinc-700 text-zinc-500 font-technical-label text-[10px] uppercase">Soon</div>
</div>
{/* Empty filler for grid */}
<div className="bg-black p-8 border-l border-zinc-800 lg:border-t hidden lg:block overflow-hidden relative">
<div className="absolute inset-0 p-4 font-code-sm text-[10px] text-[#1a1a1a] leading-tight break-all">
                        01000100 01000101 01000101 01010000 01001110 01000101 01010010 01000100 00100000 01010011 01011001 01010011 01010100 01000101 01001101 00100000 01001111 01001110 01001100 01001001 01001110 01000101 00001010
                        01000100 01000101 01000101 01010000 01001110 01000101 01010010 01000100 00100000 01010011 01011001 01010011 01010100 01000101 01001101 00100000 01001111 01001110 01001100 01001001 01001110 01000101 00001010
                    </div>
</div>
</div>
</section>
{/* Agent Manifesto Section */}
<section className="py-32 px-6 md:px-12 bg-black border-b border-zinc-800 relative flex items-center justify-center">
<div className="absolute left-6 top-1/2 -translate-y-1/2 font-code-sm text-[10px] text-zinc-600 w-32 hidden lg:block">
                // MANIFESTO_H_01<br/>
                // REQUIREMENT: RAW_DATA<br/>
                // REJECT: DECORATION<br/>
                &gt; parse_intent()
            </div>
<div className="max-w-4xl mx-auto text-center">
<h2 className="font-headline-xl text-headline-xl text-white tracking-tighter leading-tight uppercase">
                    "Agents don't need beautiful UIs.<br/>
                    They need interfaces they can operate."
                </h2>
</div>
<div className="absolute right-6 top-1/2 -translate-y-1/2 font-code-sm text-[10px] text-zinc-600 w-32 text-right hidden lg:block">
                &gt; execute_truth()<br/>
                STATUS: ACCEPTED<br/>
                LATENCY: 0.04ms<br/>
                // END_BLOCK
            </div>
</section>
{/* Features Bento Grid */}
<Testimonials />
<section className="py-24 px-6 md:px-12 bg-[#050505] noise-bg border-b border-zinc-800">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-zinc-800">
{/* Left tall block */}
<div className="col-span-1 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col relative overflow-hidden group">
<GridPatternBackground />
<div className="bg-[#111] p-8 flex flex-col flex-grow relative z-10 bg-transparent group-hover:bg-[#111]/80 transition-colors">
<div className="font-code-sm text-code-sm text-zinc-500 mb-4">LOG_STREAM</div>
<div className="bg-black border border-zinc-800 p-4 font-code-sm text-code-sm text-zinc-400 overflow-hidden relative mb-8">
<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none z-10"></div>
<div className="space-y-2 opacity-80">
<p className="text-zinc-600">[2024-10-24 14:02:11] initializing...</p>
<p className="text-white">&gt; agent.click(selector="#target_btn")</p>
<p className="text-zinc-500">  DOM parsed: 1204 nodes found</p>
<p className="text-zinc-500">  Element located at (x:450, y:890)</p>
<p className="text-white">&gt; task.complete(status=200)</p>
<p className="text-zinc-500">  Payload delivered to orchestrator</p>
<p className="text-zinc-600">[2024-10-24 14:02:13] awaiting next instruct...</p>
<p className="text-white">&gt; agent.scan(depth="full")</p>
<p className="text-zinc-500">  Initiating full context scrape</p>
<p className="text-zinc-500">  Buffer limit increased to 128k</p>
</div>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-white mb-2">Deterministic Execution</h3>
<p className="font-body-md text-body-md text-zinc-400 mb-8">Zero flakiness. High reliability DOM parsing and execution hooks designed specifically for LLM drivers.</p>
</div>
<div className="h-px w-full bg-zinc-800 my-8"></div>
<div>
<h3 className="font-headline-md text-headline-md text-white mb-2">Low Latency</h3>
<p className="font-body-md text-body-md text-zinc-400">Direct protocol communication bypassing traditional browser overhead.</p>
</div>
</div>
</div>

{/* Right blocks container */}
<div className="col-span-1 lg:col-span-8 flex flex-col">
{/* Right top wide block */}
<div className="bg-[#0a0a0a] p-8 border-b border-zinc-800 flex flex-col relative min-h-[300px] overflow-hidden group">
<GridPatternBackground />
<div className="font-code-sm text-code-sm text-zinc-500 mb-4 relative z-10">ARCHITECTURE_DIAGRAM</div>
<div className="flex items-center justify-between h-full px-8 mt-4 relative z-10">
<div className="w-16 h-16 border border-zinc-700 flex items-center justify-center bg-black"><span className="material-symbols-outlined text-white" data-icon="memory">memory</span></div>
<div className="flex-grow h-px bg-zinc-800 relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-zinc-600 text-[10px] font-code-sm">gRPC</div></div>
<div className="w-16 h-16 border border-white flex items-center justify-center bg-[#111]"><span className="material-symbols-outlined text-white" data-icon="route">route</span></div>
<div className="flex-grow h-px bg-zinc-800 relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-zinc-600 text-[10px] font-code-sm">WSS</div></div>
<div className="w-16 h-16 border border-zinc-700 flex items-center justify-center bg-black"><span className="material-symbols-outlined text-white" data-icon="dns">dns</span></div>
</div>
</div>
{/* Right bottom block */}
<div className="bg-black p-8 flex flex-col justify-center items-center text-center flex-grow relative overflow-hidden min-h-[300px] group">
<GridPatternBackground />
<div className="absolute inset-0 p-4 font-code-sm text-[10px] text-[#1a1a1a] leading-tight break-all pointer-events-none text-left z-10">
                        SELECT * FROM SYS_STATE WHERE AGENT='ACTIVE' AND STATUS='OK' LIMIT 1;
                        UPDATE PROTOCOL SET SPEED='MAX' WHERE NODE='CORE';
                    </div>
<div className="z-10 flex flex-col items-center">
<span className="material-symbols-outlined text-4xl text-white mb-2" data-icon="diamond">diamond</span>
<div className="font-technical-label text-zinc-500 text-[10px] tracking-widest mb-2">[ 0 ]</div>
<h3 className="font-technical-label text-technical-label text-white uppercase tracking-widest">NO HUMAN ERROR</h3>
</div>
</div>
</div>
</div>
</section>
{/* Built for Agents. Loved by Developers. Section */}
<section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-800">
<div className="max-w-6xl mx-auto">
<h2 className="text-[48px] md:text-[80px] leading-[1] font-headline-xl tracking-tighter text-white mb-16 uppercase">
            We don't choose sides.<br/>
            Agents run it.<br/>
            Developers ship it.
        </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-zinc-800 font-code-sm text-code-sm">
<div className="p-8 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#050505]">
<h3 className="text-white text-lg mb-8 uppercase tracking-widest">// For Agents</h3>
<ul className="space-y-4">
<li className="flex border-b border-zinc-800 pb-2">
<span className="text-zinc-500 w-32">FORMAT:</span>
<span className="text-zinc-300">Machine-readable JSON/gRPC</span>
</li>
<li className="flex border-b border-zinc-800 pb-2">
<span className="text-zinc-500 w-32">UI:</span>
<span className="text-zinc-300">No visual overhead</span>
</li>
<li className="flex border-b border-zinc-800 pb-2">
<span className="text-zinc-500 w-32">SPEED:</span>
<span className="text-zinc-300">Operable at CPU speed</span>
</li>
</ul>
</div>
<div className="p-8 bg-[#0a0a0a]">
<h3 className="text-white text-lg mb-8 uppercase tracking-widest">// For Developers</h3>
<ul className="space-y-4">
<li className="flex border-b border-zinc-800 pb-2">
<span className="text-zinc-500 w-32">PERF:</span>
<span className="text-zinc-300">Blazing fast execution</span>
</li>
<li className="flex border-b border-zinc-800 pb-2">
<span className="text-zinc-500 w-32">RELIABILITY:</span>
<span className="text-zinc-300">100% accurate parsers</span>
</li>
<li className="flex border-b border-zinc-800 pb-2">
<span className="text-zinc-500 w-32">NATIVE:</span>
<span className="text-zinc-300">AI-native architecture, zero bloat</span>
</li>
</ul>
</div>
</div>
</div>
</section>
{/* The Developer Stack Bento */}
<section className="py-24 px-6 md:px-12 noise-bg border-b border-zinc-800 bg-[#050505]">
<div className="max-w-6xl mx-auto">
<h2 className="font-headline-lg text-headline-lg text-white mb-12">The Developer Stack</h2>
<div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-zinc-800">
{/* Card 1 (Wide) */}
<div className="col-span-1 md:col-span-8 p-8 border-b md:border-r border-zinc-800 bg-[#111] flex flex-col justify-between h-[400px]">
<div>
<div className="font-code-sm text-zinc-500 mb-2">01 / Vault IDE</div>
<h3 className="font-headline-md text-white mb-4">Your editor. Finally fast.</h3>
<div className="flex gap-2 font-technical-label text-[10px] uppercase text-zinc-400">
<span className="px-2 py-1 border border-zinc-700">Rust-native</span>
<span className="px-2 py-1 border border-zinc-700">Zero Electron</span>
<span className="px-2 py-1 border border-zinc-700">Sub-10ms response</span>
</div>
</div>
<div className="bg-black border border-zinc-800 p-4 font-code-sm text-xs text-zinc-400 mt-8 overflow-hidden h-40">
<pre><code className="text-zinc-300">fn execute_task(task_id: &amp;str) -&gt; Result&lt;(), Error&gt; {"{"}
    let ctx = SystemContext::init();
    let runner = CoreEngine::new(ctx);
    
    <span className="text-zinc-500">// Zero overhead execution</span>
    runner.process(task_id).await?;
    Ok(())
{"}"}</code></pre>
</div>
</div>
{/* Card 2 (Square) */}
<div className="col-span-1 md:col-span-4 p-8 border-b border-zinc-800 bg-[#0a0a0a] flex flex-col justify-between h-[400px]">
<div>
<div className="font-code-sm text-zinc-500 mb-2">02 / AGENTS</div>
<h3 className="font-headline-md text-white mb-4">Not a chatbot. An operator.</h3>
</div>
<div className="flex-grow flex items-center justify-center opacity-50">
<svg className="w-full h-full stroke-white stroke-[1] fill-none" viewBox="0 0 100 100">
<circle cx="20" cy="50" r="4"/>
<circle cx="50" cy="20" r="4"/>
<circle cx="50" cy="80" r="4"/>
<circle cx="80" cy="50" r="4"/>
<path d="M 24 50 L 46 24 M 24 50 L 46 76 M 54 24 L 76 50 M 54 76 L 76 50" strokeDasharray="2 2"/>
</svg>
</div>
</div>
{/* Card 3 (Square) */}
<div className="col-span-1 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#0a0a0a] flex flex-col justify-between h-[400px]">
<div>
<div className="font-code-sm text-zinc-500 mb-2">03 / AUTOMATION</div>
<h3 className="font-headline-md text-white mb-4">If it's repetitive, it's already automated.</h3>
</div>
<div className="mt-8 font-code-sm text-xs text-zinc-500">
<div className="">$ trigger pipeline --force</div>
<div className="pl-4 border-l border-zinc-700 ml-2 mt-2 space-y-1">
<div className="">&gt; lint... OK</div>
<div className="">&gt; build... OK</div>
<div className="">&gt; deploy... OK</div>
</div>
</div>
</div>
{/* Card 4 (Square) */}
<div className="col-span-1 md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#111] flex flex-col justify-between h-[400px]">
<div>
<div className="font-code-sm text-zinc-500 mb-2">04 / MCP</div>
<h3 className="font-headline-md text-white mb-4">We don't add more MCPs. We make them unnecessary.</h3>
</div>
<div className="bg-black border border-zinc-800 p-2 mt-auto">
<div className="text-zinc-400 font-code-sm text-xs border-b border-zinc-800 pb-2 mb-2">&gt; Search commands...</div>
<div className="text-white font-code-sm text-xs bg-zinc-900 p-1">execute native_toolchain</div>
</div>
</div>
{/* Card 5 (Square) */}
<div className="col-span-1 md:col-span-4 p-8 bg-black flex flex-col justify-between h-[400px] relative overflow-hidden">
<div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm z-10 flex items-center justify-center">
<div className="border border-red-900/50 text-red-700 px-4 py-1 font-technical-label text-sm uppercase tracking-widest rotate-[-15deg]">
                        [REDACTED]
                    </div>
</div>
<div className="z-0 opacity-20">
<div className="font-code-sm text-zinc-500 mb-2">05 / MODEL</div>
<h3 className="font-headline-md text-white mb-4">The model that runs the stack.</h3>
</div>
</div>
</div>
</div>
</section>
{/* Why Not VSCode Section */}
<section className="py-24 px-6 md:px-12 bg-[#080808] border-b border-zinc-800">
<div className="max-w-4xl mx-auto">
<h2 className="font-headline-xl text-white mb-16 text-center">VSCode is slow. We said it.</h2>
<div className="border border-zinc-800 font-code-sm">
<div className="grid grid-cols-3 bg-black border-b border-zinc-800 p-4 text-zinc-500 text-xs uppercase tracking-widest">
<div className="">Metric</div>
<div className="">VSCode v1.x</div>
<div className="text-white">DeepNerd Vault IDE beta</div>
</div>
<div className="grid grid-cols-3 p-4 border-b border-zinc-800 items-center">
<div className="text-zinc-400">Cold Start</div>
<div className="text-zinc-600">~2.5s</div>
<div className="text-white">&lt; 50ms</div>
</div>
<div className="grid grid-cols-3 p-4 border-b border-zinc-800 items-center">
<div className="text-zinc-400">Memory Footprint</div>
<div className="text-zinc-600">~800MB (Base)</div>
<div className="text-white">~45MB</div>
</div>
<div className="grid grid-cols-3 p-4 border-b border-zinc-800 items-center">
<div className="text-zinc-400">File Indexing (10k files)</div>
<div className="text-zinc-600">~12s</div>
<div className="text-white">~0.8s</div>
</div>
<div className="grid grid-cols-3 p-4 items-center">
<div className="text-zinc-400">Plugin Overhead</div>
<div className="text-zinc-600">High (JS/Node)</div>
<div className="text-white">Zero (Native Rust API)</div>
</div>
</div>
<p className="text-zinc-600 font-code-sm text-[10px] mt-4 text-center">
            * Benchmarks run on identical hardware. VSCode v1.x vs DeepNerd Vault IDE beta.
        </p>
</div>
</section>
{/* The Speed Obsession Section */}
<section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-800">
<div className="max-w-6xl mx-auto">
<div className="border-t border-zinc-800 py-8 group">
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
<h3 className="font-code-sm text-3xl text-white md:col-span-1">SPEED</h3>
<p className="font-code-sm text-zinc-400 md:col-span-3">Compiled to native machine code. Bypassing DOM overhead completely for agent operations.</p>
</div>
</div>
<div className="border-t border-zinc-800 py-8 group">
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
<h3 className="font-code-sm text-3xl text-white md:col-span-1">ACCURACY</h3>
<p className="font-code-sm text-zinc-400 md:col-span-3">Deterministic AST parsing. No flaky UI locators, just pure structural truth.</p>
</div>
</div>
<div className="border-t border-b border-zinc-800 py-8 group">
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
<h3 className="font-code-sm text-3xl text-white md:col-span-1">AI-NATIVE</h3>
<p className="font-code-sm text-zinc-400 md:col-span-3">Built specifically as a host environment for LLMs, not retrofitted for them.</p>
</div>
</div>
</div>
</section>
{/* Open to Builders Section */}
<section className="py-32 px-6 bg-[#050505] noise-bg border-b border-zinc-800 flex flex-col items-center text-center">
<h2 className="font-headline-xl text-[48px] md:text-[64px] text-white tracking-tighter mb-12 max-w-4xl leading-tight">
        If you hate slow tools as much as we do — you belong here.
    </h2>
<div className="flex flex-col sm:flex-row gap-6">
<a className="bg-white text-black px-8 py-4 font-technical-label text-technical-label uppercase tracking-widest hover:bg-zinc-200 transition-colors" href="#">
            Request Early Access
        </a>
<a className="bg-transparent text-white border border-zinc-600 px-8 py-4 font-technical-label text-technical-label uppercase tracking-widest hover:border-white transition-colors" href="#">
            Read the Docs
        </a>
</div>
</section>
{/* Bottom CTA */}
<section className="py-32 px-6 flex flex-col items-center justify-center text-center bg-black border-b border-zinc-800">
<h2 className="font-headline-xl text-[64px] text-white tracking-tighter mb-8">Join the agent era.</h2>
<a className="bg-white text-black px-12 py-5 font-technical-label text-technical-label uppercase tracking-widest hover:bg-zinc-300 transition-colors" href="#">
                INITIALIZE WORKSPACE
            </a>
</section>
</main>
{/* Footer */}
<DeepNerdFooter />
</div>
</SmoothScroll>
  )
}
