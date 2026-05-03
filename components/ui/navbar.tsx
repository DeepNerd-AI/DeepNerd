import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/server"

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-black text-white font-technical-label text-technical-label tracking-tighter uppercase docked full-width top-0 border-b border-zinc-800 flat no shadows flex justify-between items-center px-6 h-16 w-full sticky z-50">
      <Link href="/" className="text-xl font-black tracking-[0.2em] text-white">DEEPNERD</Link>
      <nav className="hidden md:flex gap-6 items-center">
        <Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out" href="/">HOME</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out outline-none">
            PRODUCTS
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black border border-zinc-800 text-white font-mono uppercase tracking-widest rounded-none">
            <DropdownMenuItem>
              <Link href="/products/vault-ide" className="w-full">VAULT Vault IDE</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/products/muac-agent" className="w-full">MUAC AGENT</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem>
              <Link href="/products" className="w-full text-zinc-500 hover:text-white">MORE...</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out" href="/docs">DOCS</Link>
        <Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out" href="/about">ABOUT</Link>
      </nav>
      {user ? (
        <Link href="/dashboard" className="hidden md:block">
          <img 
            src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-zinc-800 hover:border-white transition-colors"
          />
        </Link>
      ) : (
        <Link href="/signup" className="hidden md:block bg-primary text-on-primary px-4 py-2 font-technical-label text-technical-label border border-primary hover:bg-black hover:text-white transition-colors duration-150">Sign Up</Link>
      )}
      <button className="md:hidden text-white">
        <span className="material-symbols-outlined" data-icon="menu">menu</span>
      </button>
    </header>
  )
}
