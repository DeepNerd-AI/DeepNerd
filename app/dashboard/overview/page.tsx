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

        

<aside className="w-sidebar bg-dn-sidebar border-r border-dn-border flex flex-col fixed h-full left-0 z-20">

<div className="h-16 flex items-center px-6 border-b border-dn-border justify-between cursor-pointer hover:bg-dn-border/50 transition-colors">
<span className="font-h3 text-h3 text-primary tracking-tighter">DeepNerd</span>
<span className="material-symbols-outlined text-on-surface-variant text-sm">unfold_more</span>
</div>

<nav className="flex-1 overflow-y-auto hide-scrollbar py-6">
<div className="px-3 space-y-1">
<a className="flex items-center gap-3 px-3 py-2 text-primary bg-dn-card border-l-2 border-primary" href="#">
<span className="material-symbols-outlined text-sm">home</span>
<span className="font-body-md text-label-sm">Home</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors border-l-2 border-transparent" href="#">
<span className="material-symbols-outlined text-sm">terminal</span>
<span className="font-body-md text-label-sm">IDE</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors border-l-2 border-transparent" href="#">
<span className="material-symbols-outlined text-sm">smart_toy</span>
<span className="font-body-md text-label-sm">Agents</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors border-l-2 border-transparent" href="#">
<span className="material-symbols-outlined text-sm">bolt</span>
<span className="font-body-md text-label-sm">Automation</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors border-l-2 border-transparent" href="#">
<span className="material-symbols-outlined text-sm">build</span>
<span className="font-body-md text-label-sm">Tools</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors border-l-2 border-transparent" href="#">
<span className="material-symbols-outlined text-sm">monitoring</span>
<span className="font-body-md text-label-sm">Analytics</span>
</a>
</div>
<div className="my-6 border-t border-dn-border mx-6"></div>

<div className="px-3 space-y-1">
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors rounded-DEFAULT" href="#">
<span className="material-symbols-outlined text-sm">menu_book</span>
<span className="font-body-md text-label-sm">Docs</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors rounded-DEFAULT" href="#">
<span className="material-symbols-outlined text-sm">history</span>
<span className="font-body-md text-label-sm">Changelog</span>
</a>
<a className="flex items-center justify-between px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors rounded-DEFAULT" href="#">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-sm">notifications</span>
<span className="font-body-md text-label-sm">Notifications</span>
</div>
<span className="bg-primary text-background font-mono text-[10px] px-1.5 py-0.5 rounded-sm">3</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-dn-card/50 transition-colors rounded-DEFAULT" href="#">
<span className="material-symbols-outlined text-sm">settings</span>
<span className="font-body-md text-label-sm">Settings</span>
</a>
</div>
</nav>

<div className="p-4 border-t border-dn-border bg-dn-sidebar">
<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-dn-border">
<img alt="User Avatar" className="w-full h-full object-cover" data-alt="A cinematic, high-contrast headshot of a developer in a dark environment, subtly lit by screen glow. Minimalist composition, deep shadows, professional and focused mood, pure monochrome palette with stark white highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL_ofXu7g3UHePiN_24TiNwQrkPuObvPPeqMQwi3ngTgOlzf1g_bofwiUvDJibyUDZrLLZd1PuG4SERko577uFT6tbpuDUa1_3oy_F4zXavtp-v2_l4DeM1rYm2tUqHO28tI-Bd5IIAOQWysAHAE2UWYdrjRsVtZes-cmTYu811zM16fcivRliRPd1bLXTBsAvbWEnOlnuSi3yptgyKddk2-Rqk8Zl7w1BWRwV3YU45qIVMh2UbK0BliKTNQfPABvWsuh23PTf4TM"/>
</div>
<div className="flex-1 min-w-0 flex items-center justify-between">
<span className="font-body-md text-label-sm text-primary truncate">sysadmin_01</span>
<span className="font-mono text-[10px] border border-dn-border text-on-surface-variant px-1 py-0.5 rounded-sm">PRO</span>
</div>
</div>
<div className="flex items-center justify-between px-3 py-2 bg-dn-card border border-dn-border rounded-DEFAULT text-on-surface-variant">
<span className="font-body-md text-label-sm">Search</span>
<span className="font-mono text-[10px] bg-dn-sidebar border border-dn-border px-1 py-0.5 rounded-sm">⌘K</span>
</div>
</div>
</aside>

<main className="ml-sidebar flex-1 flex flex-col min-w-0 overflow-y-auto">

<header className="h-16 border-b border-dn-border bg-dn-main/90 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
<h1 className="font-h3 text-h3 text-primary">Overview</h1>
<div className="flex items-center gap-4">
<button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-md">notifications</span>
</button>
</div>
</header>
<div className="p-8 space-y-8">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div className="bg-dn-card border border-dn-border p-6 rounded-DEFAULT flex flex-col gap-2 hover:border-surface-variant transition-colors group">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">Active Agents</span>
<div className="flex items-end justify-between">
<span className="font-mono text-h2 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all">12</span>
<span className="font-mono text-[10px] text-primary flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 2</span>
</div>
</div>
<div className="bg-dn-card border border-dn-border p-6 rounded-DEFAULT flex flex-col gap-2 hover:border-surface-variant transition-colors group">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">Automations Today</span>
<div className="flex items-end justify-between">
<span className="font-mono text-h2 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all">843</span>
<span className="font-mono text-[10px] text-primary flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 14%</span>
</div>
</div>
<div className="bg-dn-card border border-dn-border p-6 rounded-DEFAULT flex flex-col gap-2 hover:border-surface-variant transition-colors group">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">IDE Sessions</span>
<div className="flex items-end justify-between">
<span className="font-mono text-h2 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all">4</span>
<span className="font-mono text-[10px] text-on-surface-variant flex items-center"><span className="material-symbols-outlined text-[12px]">horizontal_rule</span> 0</span>
</div>
</div>
<div className="bg-dn-card border border-dn-border p-6 rounded-DEFAULT flex flex-col gap-2 hover:border-surface-variant transition-colors group">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest">API Calls</span>
<div className="flex items-end justify-between">
<span className="font-mono text-h2 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all">12.4k</span>
<span className="font-mono text-[10px] text-primary flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 5%</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-7 flex flex-col gap-4">
<h2 className="font-h3 text-[18px] text-primary">Recent Agent Activity</h2>
<div className="bg-dn-card border border-dn-border rounded-DEFAULT overflow-hidden">
<div className="divide-y divide-dn-border">

<div className="p-4 hover:bg-surface-container-lowest transition-colors flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-8 h-8 rounded-sm bg-dn-main border border-dn-border flex items-center justify-center">
<span className="material-symbols-outlined text-sm text-primary">smart_toy</span>
</div>
<div>
<div className="font-body-md text-label-sm text-primary">DataScraper_Alpha</div>
<div className="font-mono text-[10px] text-on-surface-variant mt-1">Executing crawl routine on target domain</div>
</div>
</div>
<div className="flex items-center gap-6">
<span className="font-mono text-[10px] text-on-surface-variant">2m ago</span>
<span className="font-mono text-[10px] px-2 py-1 bg-dn-main border border-primary text-primary rounded-sm uppercase tracking-widest">Running</span>
</div>
</div>

<div className="p-4 hover:bg-surface-container-lowest transition-colors flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-8 h-8 rounded-sm bg-dn-main border border-dn-border flex items-center justify-center">
<span className="material-symbols-outlined text-sm text-on-surface-variant">analytics</span>
</div>
<div>
<div className="font-body-md text-label-sm text-primary">LogAnalyzer_01</div>
<div className="font-mono text-[10px] text-on-surface-variant mt-1">Compiled daily error reports</div>
</div>
</div>
<div className="flex items-center gap-6">
<span className="font-mono text-[10px] text-on-surface-variant">15m ago</span>
<span className="font-mono text-[10px] px-2 py-1 bg-dn-main border border-dn-border text-on-surface-variant rounded-sm uppercase tracking-widest">Complete</span>
</div>
</div>

<div className="p-4 hover:bg-surface-container-lowest transition-colors flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-8 h-8 rounded-sm bg-dn-main border border-dn-border flex items-center justify-center">
<span className="material-symbols-outlined text-sm text-on-surface-variant">webhook</span>
</div>
<div>
<div className="font-body-md text-label-sm text-primary">SyncWorker_Prod</div>
<div className="font-mono text-[10px] text-on-surface-variant mt-1">Database connection timeout</div>
</div>
</div>
<div className="flex items-center gap-6">
<span className="font-mono text-[10px] text-on-surface-variant">1h ago</span>
<span className="font-mono text-[10px] px-2 py-1 bg-dn-main border border-error text-error rounded-sm uppercase tracking-widest">Failed</span>
</div>
</div>

<div className="p-4 hover:bg-surface-container-lowest transition-colors flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-8 h-8 rounded-sm bg-dn-main border border-dn-border flex items-center justify-center">
<span className="material-symbols-outlined text-sm text-on-surface-variant">build</span>
</div>
<div>
<div className="font-body-md text-label-sm text-primary">BuildRunner_CI</div>
<div className="font-mono text-[10px] text-on-surface-variant mt-1">Deployed artifact #8492</div>
</div>
</div>
<div className="flex items-center gap-6">
<span className="font-mono text-[10px] text-on-surface-variant">3h ago</span>
<span className="font-mono text-[10px] px-2 py-1 bg-dn-main border border-dn-border text-on-surface-variant rounded-sm uppercase tracking-widest">Complete</span>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-8">

<div className="flex flex-col gap-4">
<h2 className="font-h3 text-[18px] text-primary">Quick Launch</h2>
<div className="grid grid-cols-1 gap-3">
<button className="bg-primary text-background border border-transparent py-3 px-4 rounded-DEFAULT font-body-md text-label-sm flex items-center justify-center gap-2 hover:bg-tertiary-container hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] transition-all">
<span className="material-symbols-outlined text-sm">terminal</span>
                                New IDE Session
                            </button>
<button className="bg-transparent text-primary border border-dn-border py-3 px-4 rounded-DEFAULT font-body-md text-label-sm flex items-center justify-center gap-2 hover:border-primary transition-all">
<span className="material-symbols-outlined text-sm">rocket_launch</span>
                                Deploy Agent
                            </button>
<button className="bg-transparent text-primary border border-dn-border py-3 px-4 rounded-DEFAULT font-body-md text-label-sm flex items-center justify-center gap-2 hover:border-primary transition-all">
<span className="material-symbols-outlined text-sm">route</span>
                                Create Pipeline
                            </button>
</div>
</div>

<div className="flex flex-col gap-4">
<h2 className="font-h3 text-[18px] text-primary">Active Automations</h2>
<div className="bg-dn-card border border-dn-border rounded-DEFAULT p-4 flex flex-col gap-4">
<div className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span className="font-body-md text-label-sm text-primary group-hover:underline decoration-1 underline-offset-4">Nightly DB Backup</span>
</div>
<span className="font-mono text-[10px] text-on-surface-variant">Next: 02:00</span>
</div>
<div className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span className="font-body-md text-label-sm text-primary group-hover:underline decoration-1 underline-offset-4">User Sync Pipeline</span>
</div>
<span className="font-mono text-[10px] text-on-surface-variant">Next: 15m</span>
</div>
<div className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span className="font-body-md text-label-sm text-primary group-hover:underline decoration-1 underline-offset-4">Health Check Monitor</span>
</div>
<span className="font-mono text-[10px] text-on-surface-variant">Continuous</span>
</div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-dn-border">
<div className="bg-dn-card border border-dn-border p-4 rounded-DEFAULT flex items-center justify-between hover:border-surface-variant transition-colors cursor-pointer">
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest mb-1">Latest Changelog</span>
<span className="font-body-md text-label-sm text-primary">v2.4.1: Agent concurrency fixes</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
</div>
<div className="bg-dn-card border border-dn-border p-4 rounded-DEFAULT flex items-center justify-center gap-3">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<span className="font-mono text-[10px] text-primary uppercase tracking-widest">All Systems Operational</span>
</div>
</div>
</div>
</main>

        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  )
}
