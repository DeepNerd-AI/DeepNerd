"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "DeepNerd's deterministic DOM execution completely eliminated the flakiness in our AI automation pipelines. It's incredibly stable.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    name: "Elena Rostova",
    role: "Operations Manager",
  },
  {
    text: "Switching to DeepNerd's gRPC architecture dropped our LLM action latency by 80%. It's a game-changing edge for real-time agents.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    name: "Marcus Chen",
    role: "IT Manager",
  },
  {
    text: "The ability to hook directly into the browser protocol without overhead allowed us to scale our agent fleet effortlessly.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    name: "Sarah Jenkins",
    role: "CTO",
  },
  {
    text: "We used to struggle with unhandled DOM states. DeepNerd's execution streams gave us true deterministic control over browser hooks.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    name: "David Alaba",
    role: "Lead Engineer",
  },
  {
    text: "The real-time log streams and low-latency WSS connections make debugging AI-driven flows a breeze.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    name: "Zainab Hussain",
    role: "AI Developer",
  },
  {
    text: "DeepNerd provides the exact right primitives for building robust AI agents. Zero flakiness, high reliability.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    name: "Aliza Khan",
    role: "Agent Architect",
  },
  {
    text: "Unmatched speed and control. DeepNerd revolutionized the way we let natural language models interact with dynamic web interfaces.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    name: "Farhan Siddiqui",
    role: "Automation Engineer",
  },
  {
    text: "A true game-changer for agentic workflows. We shipped our AI automation product months faster thanks to DeepNerd.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80",
    name: "Sophia Wright",
    role: "Founder",
  },
  {
    text: "DeepNerd's protocol execution is the missing link for AI agents interacting with the web securely and consistently.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
    name: "Hassan Ali",
    role: "Security Engineer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-[#050505] noise-bg py-24 relative border-b border-zinc-800">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="border border-zinc-800 bg-black py-1 px-4 text-xs font-code-sm text-zinc-400">TELEMETRY_LOGS // REVIEWS</div>
          </div>

          <h2 className="text-3xl md:text-5xl font-headline-md tracking-tighter text-white">
            Trusted by AI Pioneers
          </h2>
          <p className="mt-5 text-zinc-400 font-body-md">
            See how engineering teams use deterministic execution to build unbreakable agentic workflows.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;