import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { createClient } from "@/utils/supabase/server"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).maybeSingle()
    : { data: null }

  const sidebarUser = {
    name: profile?.display_name || (user?.user_metadata?.full_name as string) || "Developer",
    email: user?.email || "unknown@deepnerd.tech",
    avatar:
      profile?.avatar_url ||
      (user?.user_metadata?.avatar_url as string) ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent((profile?.display_name || user?.email || "DN") as string)}&background=111111&color=ffffff`,
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={sidebarUser} />
      <SidebarInset className="bg-[#050505]">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
