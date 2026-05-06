import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { createClient } from "@/utils/supabase/server"

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-black text-white font-technical-label text-technical-label tracking-tighter uppercase border-b border-zinc-800 flex justify-between items-center px-6 h-14 w-full sticky top-0 z-50 backdrop-blur-xl bg-black/90">
      <Link href="/" className="text-base font-black tracking-[0.2em] text-white shrink-0">DEEPNERD</Link>
      <nav className="hidden md:flex items-center">
        <Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out text-xs px-3 py-1.5" href="/">HOME</Link>

        <Separator orientation="vertical" className="h-4 bg-zinc-700 mx-1" />

        <NavigationMenu delayDuration={0} skipDelayDuration={0}>
          <NavigationMenuList className="gap-0">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white text-zinc-500 font-technical-label uppercase px-3 py-1.5 data-[state=open]:bg-transparent data-[active]:bg-transparent h-auto text-xs rounded-none">
                PRODUCTS
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#0a0a0a] border border-zinc-800 rounded-none p-1.5 w-52 shadow-2xl shadow-black/80">
                <ul className="grid gap-0.5">
                  <li><NavigationMenuLink asChild><Link href="/ide" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Vault IDE</Link></NavigationMenuLink></li>
                  <li><NavigationMenuLink asChild><Link href="/agents" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Agents</Link></NavigationMenuLink></li>
                  <li><NavigationMenuLink asChild><Link href="/automation" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Automation</Link></NavigationMenuLink></li>
                  <li><NavigationMenuLink asChild><Link href="/tools" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Tools</Link></NavigationMenuLink></li>
                  <div className="h-px bg-zinc-800 my-1"></div>
                  <li><NavigationMenuLink asChild><Link href="/model-teaser-1" className="block px-3 py-2 text-zinc-600 text-xs hover:text-zinc-300 hover:bg-zinc-800 transition-colors">Model [SOON]</Link></NavigationMenuLink></li>
                  <div className="h-px bg-zinc-800 my-1"></div>
                  <li><NavigationMenuLink asChild><Link href="/products" className="block px-3 py-2 text-zinc-500 text-xs hover:text-white hover:bg-zinc-800 transition-colors">ALL PRODUCTS →</Link></NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white text-zinc-500 font-technical-label uppercase px-3 py-1.5 data-[state=open]:bg-transparent data-[active]:bg-transparent h-auto text-xs rounded-none">
                COMPANY
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#0a0a0a] border border-zinc-800 rounded-none p-1.5 w-48 shadow-2xl shadow-black/80">
                <ul className="grid gap-0.5">
                  <li><NavigationMenuLink asChild><Link href="/manifesto" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Manifesto</Link></NavigationMenuLink></li>
                  <li><NavigationMenuLink asChild><Link href="/careers" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Careers</Link></NavigationMenuLink></li>
                  <li><NavigationMenuLink asChild><Link href="/about" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">About</Link></NavigationMenuLink></li>
                  <li><NavigationMenuLink asChild><Link href="/contact" className="block px-3 py-2 text-zinc-300 text-xs hover:bg-zinc-800 hover:text-white transition-colors">Contact</Link></NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Separator orientation="vertical" className="h-4 bg-zinc-700 mx-1" />

        <Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out text-xs px-3 py-1.5" href="/writing">WRITING</Link>
        <Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out text-xs px-3 py-1.5" href="/docs">DOCS</Link>
      </nav>
      {user ? (
        <Link href="/dashboard" className="hidden md:block shrink-0">
          <img 
            src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-zinc-800 hover:border-white transition-colors"
          />
        </Link>
      ) : (
        <Link href="/signup" className="hidden md:block bg-white text-black px-4 py-1.5 font-technical-label text-[11px] uppercase tracking-widest hover:bg-zinc-200 transition-colors shrink-0">Sign Up</Link>
      )}
      <button className="md:hidden text-white" aria-label="Menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
    </header>
  )
}
