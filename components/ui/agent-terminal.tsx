"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Square, Play, ShieldAlert, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status?: "streaming" | "complete" | "error";
  metadata?: any;
};

export function AgentTerminal({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "system",
      content: `DEEPNERD AGENT CORE v2.4.1\nINITIALIZING NODE: ${agentId}\n[OK] SYSTEM HANDSHAKE COMPLETE.\n[OK] WAITING FOR DIRECTIVES...`,
      status: "complete",
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate Agent SDK Streaming Response
    const responseId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: responseId,
        role: "assistant",
        content: "",
        status: "streaming",
      },
    ]);

    const fakeResponse = `> analyzing input parameters...\n> parsing DOM structure...\n> executing tool: [Navigation]\n[200 OK] Action completed successfully. Awaiting further instruction.`;
    
    let currentText = "";
    for (let i = 0; i < fakeResponse.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30)); // Delay for typewriter effect
      currentText += fakeResponse[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === responseId ? { ...msg, content: currentText } : msg
        )
      );
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === responseId ? { ...msg, status: "complete" } : msg
      )
    );
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-black border border-white/10 shadow-2xl relative overflow-hidden group">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            SECURE_COMMS // {agentId}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm no-scrollbar relative z-10">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "text-blue-400" : 
                msg.role === "system" ? "text-zinc-500 text-xs whitespace-pre-line" : "text-zinc-300"
              )}
            >
              <div className="shrink-0 mt-0.5">
                {msg.role === "user" ? (
                  <span className="text-blue-500">&gt;</span>
                ) : msg.role === "system" ? (
                  <ShieldAlert className="w-3 h-3 text-zinc-600" />
                ) : (
                  <Cpu className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="flex-1 whitespace-pre-wrap leading-relaxed">
                {msg.content}
                {msg.status === "streaming" && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-white/50 ml-1 translate-y-1"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input */}
      <div className="p-4 bg-black border-t border-white/10 relative z-10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative flex items-center bg-white/5 border border-white/10 focus-within:border-white/30 transition-colors">
            <span className="pl-3 text-blue-500 font-mono">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter directive..."
              className="w-full bg-transparent p-3 outline-none text-white font-mono text-sm placeholder:text-zinc-700"
              autoComplete="off"
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="px-4 border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isTyping ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </form>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-10"></div>
    </div>
  );
}
