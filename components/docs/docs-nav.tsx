import Link from "next/link"

export function DocsNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4 sm:px-8 shrink-0">
        <Link href="/" className="mr-6 flex items-center space-x-2 font-mono text-sm uppercase tracking-widest text-foreground">
          <span className="font-bold">DeepNerd</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="transition-colors hover:text-foreground/80 text-foreground font-medium">Docs</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">Blog</Link>
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:inline-block">Home</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
