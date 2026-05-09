"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Cpu, Network, PenTool, Database } from "lucide-react";

const features = [
  {
    id: "01",
    title: "Agent Vault IDE",
    desc: "Headless development environment optimized for autonomous code generation and validation loops.",
    icon: Terminal,
    link: "/ide",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "02",
    title: "Autonomous Workers",
    desc: "Pre-configured operational nodes capable of executing complex multi-step reasoning tasks.",
    icon: Cpu,
    link: "/agents",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "03",
    title: "Pipeline CI/CD",
    desc: "Self-healing deployment pipelines that automatically detect and patch structural vulnerabilities.",
    icon: Network,
    link: "/automation",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "04",
    title: "Native Toolchain",
    desc: "Standardized API connectors and shell utilities designed exclusively for non-human interaction.",
    icon: PenTool,
    link: "/tools",
    colSpan: "md:col-span-1 lg:col-span-2",
  },
  {
    id: "05",
    title: "Core Logic Model",
    desc: "Awaiting parameter synchronization. Foundational intelligence layer.",
    icon: Database,
    link: "/model-teaser-1",
    colSpan: "md:col-span-1 lg:col-span-1",
    status: "SOON",
  },
];

export function CoreInfrastructure() {
  return (
    <section className="py-32 px-6 md:px-12 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Core Infrastructure
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            className="h-px bg-white/10 relative max-w-xl"
          >
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group ${item.colSpan}`}
            >
              <Link href={item.link} className="block h-full relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-32 h-32 text-white" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-zinc-500">{item.id} / MODULE</span>
                    {item.status && (
                      <span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold text-zinc-300">
                        {item.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
