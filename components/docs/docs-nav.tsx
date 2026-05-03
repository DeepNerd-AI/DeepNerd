import Link from "next/link"

export function DocsNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black text-white">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-8 shrink-0">
        <Link href="/" className="mr-6 flex items-center space-x-2 font-mono text-sm uppercase tracking-[0.2em] text-white">
          <span className="font-bold">DEEPNERD</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-6 text-sm font-mono tracking-widest uppercase">
            <Link href="/docs" className="transition-colors hover:text-white text-white font-medium">DOCS</Link>
            <Link href="/blog" className="transition-colors hover:text-white text-zinc-400">BLOG</Link>
            <Link href="/" className="transition-colors hover:text-white text-zinc-400 hidden sm:inline-block">HOME</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
