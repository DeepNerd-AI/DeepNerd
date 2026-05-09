"use client"

import {
  User,
  CreditCard,
  Bell,
  LogOut,
  MoreVertical,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const supabase = createClient()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-zinc-800 data-[state=open]:text-white hover:bg-zinc-900"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale border border-zinc-800">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-zinc-800 text-zinc-400 text-xs font-mono">DN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-white">{user.name}</span>
                <span className="truncate text-xs text-zinc-500">
                  {user.email}
                </span>
              </div>
              <MoreVertical className="ml-auto size-4 text-zinc-600" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 bg-[#0a0a0a] border-zinc-800 text-white"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg border border-zinc-800">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-zinc-800 text-zinc-400 text-xs font-mono">DN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-white">{user.name}</span>
                  <span className="truncate text-xs text-zinc-500">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="text-zinc-400 hover:text-white focus:text-white focus:bg-zinc-800">
                <Link href="/dashboard/settings">
                <User className="size-4" />
                Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-zinc-400 hover:text-white focus:text-white focus:bg-zinc-800">
                <Link href="/dashboard/apis">
                <CreditCard className="size-4" />
                Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-zinc-400 hover:text-white focus:text-white focus:bg-zinc-800">
                <Link href="/dashboard/notifications">
                <Bell className="size-4" />
                Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-zinc-800"
                  onSelect={(e) => e.preventDefault()}
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#0a0a0a] border-zinc-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    You will be securely signed out of your account on this device.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-[#111] border-zinc-800 text-white hover:bg-zinc-800 hover:text-white">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={async () => {
                      await supabase.auth.signOut()
                      window.location.href = "/login"
                    }}
                  >
                    Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
