import Link from "next/link"

export function NewFooter() {
  return (
    <footer className="relative bg-black pt-24 pb-8 flex flex-col border-t border-white/5">
      <div className="flex flex-col items-center justify-center text-center gap-12 mb-32 px-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Join the agent era.
        </h2>
        <Link
          href="#use"
          className="font-mono text-xs uppercase tracking-widest bg-white text-black px-8 py-4 font-bold hover:bg-gray-200 transition-colors"
        >
          Build With DeepNerd
        </Link>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          
          <div className="flex items-center gap-2 text-white font-bold tracking-[0.2em]">
            <div className="size-3 border border-white"></div>
            DEEPNERD
          </div>

          <div className="text-center md:text-left">
            &copy; 2026 DEEPNERD INFRASTRUCTURE — ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>

        </div>
      </div>
    </footer>
  )
}
