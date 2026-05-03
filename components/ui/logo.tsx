import React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
      {...props}
    >
      <path d="M12 2L6 12h12L12 2zM6 12L0 22h12L6 12zM18 12l-6 10h12l-6-10z" />
    </svg>
  )
}
