"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center px-6 md:px-12 py-20 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full hero-grid opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-zinc-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>DeepNerd Vault IDE Beta is Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-[48px] md:text-[80px] lg:text-[96px] leading-[0.95] font-bold tracking-tighter text-white"
        >
          The Operating Layer for <br />
          <span className="gradient-text">Autonomous Agents</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-400 max-w-3xl text-lg md:text-xl leading-relaxed mx-auto"
        >
          An ecosystem where AI agents operate with tools, APIs, MCP servers, memory, and automation. Not another VSCode clone—infrastructure built specifically for non-human workers with human oversight.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center w-full sm:w-auto"
        >
          <Link 
            href="/signup"
            className="group relative flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Initialize Workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full duration-500 ease-out transition-transform -translate-x-full skew-x-12" />
          </Link>
          
          <Link 
            href="/docs"
            className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/10 px-8 py-4 rounded-lg font-medium tracking-wide hover:bg-white/5 transition-all duration-300"
          >
            <Terminal className="w-4 h-4 text-zinc-400" />
            Read the Documentation
          </Link>
        </motion.div>
      </div>

      {/* Futuristic Dashboard Teaser Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl mt-24 relative z-20"
      >
        <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-2xl overflow-hidden shadow-2xl subtle-ring">
          <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-black/50 rounded-md text-xs text-zinc-400 border border-white/5 font-mono">
              <span className="text-zinc-600">sys/</span>orchestrator-node
            </div>
          </div>
          <div className="h-[400px] p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
                <span>ACTIVE_AGENTS</span>
                <span className="text-green-400">3 ONLINE</span>
              </div>
              <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Agent 01: Core Logic</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                </div>
                <div className="text-xs text-zinc-500 font-mono">Executing tool: mcp_shadcn_builder...</div>
              </div>
              <div className="p-4 rounded-lg border border-white/5 bg-white/5 opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Agent 02: Refactor</span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                </div>
                <div className="text-xs text-zinc-500 font-mono">Awaiting context...</div>
              </div>
            </div>
            <div className="w-full md:w-2/3 border border-white/5 rounded-lg bg-black p-4 font-mono text-xs overflow-hidden">
              <div className="text-zinc-500 mb-2">// ORCHESTRATOR LOG STREAM</div>
              <div className="space-y-2">
                <div className="text-zinc-400"><span className="text-blue-400">[info]</span> Initializing MCP connection to 21st.dev...</div>
                <div className="text-zinc-400"><span className="text-blue-400">[info]</span> Fetching futuristic UI components...</div>
                <div className="text-green-400"><span className="text-green-500">[success]</span> 14 components retrieved.</div>
                <div className="text-zinc-400"><span className="text-blue-400">[info]</span> Handing context to Agent 01...</div>
                <div className="text-zinc-400 flex items-center gap-2">
                  <span className="animate-pulse">&gt;</span> <span className="text-white">agent.execute(instruction="apply_global_theme")</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
