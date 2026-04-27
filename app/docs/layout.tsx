import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { docsTree } from "@/lib/docs"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={docsTree}
      sidebar={{
        enabled: true,
        collapsible: true,
        defaultOpenLevel: 2,
      }}
      links={[
        {
          text: "Home",
          url: "/",
          active: "nested-url",
        },
        {
          text: "About",
          url: "/about",
          active: "nested-url",
        },
      ]}
      nav={{
        title: "DeepNerd Docs",
      }}
    >
      {children}
    </DocsLayout>
  )
}