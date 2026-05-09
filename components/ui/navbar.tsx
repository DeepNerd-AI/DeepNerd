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
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <header className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex justify-between items-center px-6 h-14 w-full max-w-5xl shadow-2xl subtle-ring">
        <Link href="/" className="text-sm font-bold tracking-widest text-white shrink-0 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
          DEEPNERD
        </Link>
        <nav className="hidden md:flex items-center ml-8">
          <Link className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/5" href="/">Home</Link>

          <NavigationMenu delayDuration={0} skipDelayDuration={0}>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 hover:text-white text-zinc-400 font-medium px-4 py-2 data-[state=open]:bg-white/5 data-[active]:bg-white/5 h-auto text-sm rounded-full transition-colors">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 w-56 shadow-2xl">
                  <ul className="grid gap-1">
                    <li><NavigationMenuLink asChild><Link href="/ide" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Vault IDE</Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link href="/agents" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Agents</Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link href="/automation" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Automation</Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link href="/tools" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Tools</Link></NavigationMenuLink></li>
                    <div className="h-px bg-white/5 my-1 mx-2"></div>
                    <li><NavigationMenuLink asChild><Link href="/model-teaser-1" className="block px-4 py-2.5 rounded-xl text-zinc-500 text-sm hover:text-zinc-300 hover:bg-white/5 transition-colors">Model <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded border border-white/10 text-zinc-500">SOON</span></Link></NavigationMenuLink></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 hover:text-white text-zinc-400 font-medium px-4 py-2 data-[state=open]:bg-white/5 data-[active]:bg-white/5 h-auto text-sm rounded-full transition-colors">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 w-48 shadow-2xl">
                  <ul className="grid gap-1">
                    <li><NavigationMenuLink asChild><Link href="/manifesto" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Manifesto</Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link href="/careers" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Careers</Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link href="/about" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">About</Link></NavigationMenuLink></li>
                    <li><NavigationMenuLink asChild><Link href="/contact" className="block px-4 py-2.5 rounded-xl text-zinc-300 text-sm hover:bg-white/10 hover:text-white transition-colors">Contact</Link></NavigationMenuLink></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/5" href="/writing">Writing</Link>
          <Link className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/5" href="/docs">Docs</Link>
        </nav>
        
        <div className="flex items-center ml-auto">
          {user ? (
            <Link href="/dashboard" className="hidden md:block shrink-0">
              <img 
                src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white transition-colors ring-2 ring-transparent hover:ring-white/20"
              />
            </Link>
          ) : (
            <Link href="/signup" className="hidden md:block bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Sign Up
            </Link>
          )}
          <button className="md:hidden text-white ml-4" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>
    </div>
  )
}
