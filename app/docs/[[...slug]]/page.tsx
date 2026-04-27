import Link from "next/link"
import { notFound } from "next/navigation"
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/layouts/docs/page"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { DocsMarkdownContent } from "@/components/docs/docs-markdown-content"
import { DocsExtras } from "@/components/docs/docs-extras"
import { docsEntries, getBreadcrumbSegments, getDocBySlug } from "@/lib/docs"

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export function generateStaticParams() {
  return docsEntries.map((entry) => (entry.slug.length === 0 ? {} : { slug: entry.slug }))
}

export default async function DocsContentPage({ params }: PageProps) {
  const { slug } = await params
  const normalizedSlug = slug ?? []
  const doc = getDocBySlug(normalizedSlug)

  if (!doc) {
    notFound()
  }

  const breadcrumbs = getBreadcrumbSegments(normalizedSlug)
  const lastIndex = breadcrumbs.length - 1

  return (
    <DocsPage full>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="inline-flex items-center gap-1.5">
                  <BreadcrumbItem>
                    {index === lastIndex ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < lastIndex ? <BreadcrumbSeparator /> : null}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="w-full max-w-xs">
            <Input
              type="search"
              placeholder="Search docs (UI only)"
              aria-label="Search docs"
              className="border-border bg-card text-sm"
            />
          </div>
        </div>

        <Separator />
      </div>

      <DocsTitle>{doc.title}</DocsTitle>
      <DocsDescription>{doc.description}</DocsDescription>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: {doc.lastUpdated}</p>

      <DocsBody className="max-w-4xl scroll-smooth">
        <DocsMarkdownContent markdown={doc.markdown} />
        <DocsExtras />
      </DocsBody>
    </DocsPage>
  )
}