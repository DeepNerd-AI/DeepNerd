import json
import urllib.request
import os
import re

json_file = "/home/umang/.gemini/antigravity/brain/3e7a2bb7-3fce-4504-bc09-d54d486bb4e2/.system_generated/steps/57/output.txt"

with open(json_file, 'r') as f:
    data = json.load(f)

# Map IDs to route paths
routes = {
    "66dad4fcc8cb47f4a63c7213092de3df": "app/ide/page.tsx",
    "758cbf50bfb74b27913d0a072e61cc7c": "app/products/page.tsx",
    "b3ec0131d00444cea8e2cdee9964545e": "app/agents/page.tsx",
    "d7358d6feb11497c9f625becff900d9d": "app/automation/page.tsx",
    "b20b0cbb33744ba6889c2ac851605506": "app/tools/page.tsx",
    "023a7e6c391d4ed7bbe4038b87674e56": "app/model-teaser-1/page.tsx",
    "d81784d884c1482f82392aa3d7a787c0": "app/model-teaser-2/page.tsx",
    "debc86eaad1043a3a1b743b5d3232f27": "app/manifesto/page.tsx",
    "cd42d0186cbe440e90177adeca0c4dee": "app/writing/page.tsx",
    "f627b9a7fdd84d9b8f96ed932ce6f3c5": "app/changelog/page.tsx",
    "371c85b02a1740678e134615d721d23f": "app/dashboard/overview/page.tsx",
    "511c301f03a248d19d976912d689641c": "app/careers/page.tsx"
}

navbar = """
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
"""

page_template = """import { DeepNerdFooter } from "@/components/ui/flickering-footer";
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
        {NAVBAR}
        {CONTENT}
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  )
}
"""

def html_to_jsx(html):
    # Very basic html to jsx conversion
    html = re.sub(r'class="', 'className="', html)
    html = re.sub(r'style="([^"]*)"', lambda m: 'style={{' + ', '.join([f'"{k.strip()}": "{v.strip()}"' for k, v in [x.split(':', 1) for x in m.group(1).split(';') if ':' in x]]) + '}}', html)
    # Handle self-closing tags
    for tag in ['img', 'input', 'br', 'hr']:
        html = re.sub(r'<(%s[^>]*?)(?<!/)>' % tag, r'<\1 />', html)
    # Remove HTML comments
    html = re.sub(r'<!--(.*?)-->', '', html, flags=re.DOTALL)
    # convert inline SVGs
    html = re.sub(r'stroke-width=', 'strokeWidth=', html)
    html = re.sub(r'stroke-linecap=', 'strokeLinecap=', html)
    html = re.sub(r'stroke-linejoin=', 'strokeLinejoin=', html)
    html = re.sub(r'fill-rule=', 'fillRule=', html)
    html = re.sub(r'clip-rule=', 'clipRule=', html)
    html = re.sub(r'viewBox=', 'viewBox=', html)
    return html

for screen in data['screens']:
    screen_id = screen['name'].split('/')[-1]
    if screen_id in routes:
        print(f"Fetching {screen['title']}...")
        url = screen['htmlCode']['downloadUrl']
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
        # extract body or main content
        # stitch output usually has a structure like <html><body>...</body></html>
        body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
        if body_match:
            content = body_match.group(1)
        else:
            content = html
            
        # Optional: remove top navbar if stitch output includes a generic one
        # Let's just convert it
        jsx_content = html_to_jsx(content)
        
        # some of them might have the header inside, let's just use it as is
        # but replace the page template
        final_code = page_template.replace('{NAVBAR}', navbar).replace('{CONTENT}', jsx_content)
        
        filepath = routes[screen_id]
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w') as f:
            f.write(final_code)
        print(f"Saved to {filepath}")

