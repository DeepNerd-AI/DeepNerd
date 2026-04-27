import type { ReactNode } from "react"
import { DocsLayout } from "@/components/docs/docs-layout"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout>
      {children}
    </DocsLayout>
  )
}
