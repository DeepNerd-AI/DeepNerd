import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <SmoothScroll>
      <div className="bg-background text-on-background font-body-lg text-body-lg antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
        
<header className="bg-black text-white font-technical-label text-technical-label tracking-tighter uppercase docked full-width top-0 border-b border-b border-zinc-800 flat no shadows flex justify-between items-center px-6 h-16 w-full sticky z-50">
<Link href="/" className="text-xl font-black tracking-[0.2em] text-white">DEEPNERD</Link>
<nav className="hidden md:flex gap-6 items-center">
<Link className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out" href="/">HOME</Link>
<DropdownMenu>
  <DropdownMenuTrigger className="text-zinc-500 hover:text-white transition-colors duration-150 ease-in-out outline-none">
    PRODUCTS
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-black border border-zinc-800 text-white font-mono uppercase tracking-widest rounded-none">
    <DropdownMenuItem>
      <Link href="/ide" className="w-full">VAULT Vault IDE</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href="/agents" className="w-full">MUAC AGENT</Link>
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

        
<div className="absolute inset-0 bg-noise z-0"></div>
<header className="absolute top-0 left-0 p-margin z-10 w-full flex justify-start">
<span className="font-h3 text-h3 tracking-tighter text-primary select-none">DEEPNERD</span>
</header>
<main className="flex-grow flex flex-col items-center justify-center px-gutter relative z-10 w-full max-w-4xl mx-auto text-center space-y-lg">
<div className="mb-sm">
<span className="font-mono text-[10px] tracking-widest text-[#555555] uppercase select-none">CLASSIFIED</span>
</div>
<h1 className="font-h1 text-h1 text-primary max-w-2xl leading-tight">
            The model that runs the stack.
        </h1>
<p className="font-body-lg text-body-lg text-[#888888] max-w-xl mx-auto">
            We're building up. When it ships, it'll know every tool, every agent, every interface in the DeepNerd world — natively.
        </p>
<form action="#" className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center gap-sm mt-margin" method="POST" onsubmit="event.preventDefault();">
<div className="relative w-full flex-grow">
<input className="w-full bg-[#0a0a0a] border border-[#333333] text-primary placeholder-[#555555] font-body-md text-body-md py-sm px-md rounded-DEFAULT focus:outline-none focus:border-primary focus:ring-0 transition-colors duration-150" id="email" name="email" placeholder="Enter your email" required="" type="email"/>
</div>
<button className="w-full sm:w-auto whitespace-nowrap bg-primary text-[#000000] font-h3 text-h3 text-sm px-lg py-sm rounded-DEFAULT hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-150" type="submit">
                Notify Me
            </button>
</form>
</main>
<footer className="absolute bottom-0 left-0 w-full p-margin z-10 flex justify-center pb-margin">
<span className="font-mono text-[10px] tracking-widest text-[#444444] uppercase select-none">
            No timeline. No hype. Just work.
        </span>
</footer>

        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  )
}
