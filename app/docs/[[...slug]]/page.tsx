import Link from "next/link"
import { notFound } from "next/navigation"
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
import { RightSidebar } from "@/components/docs/toc"

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
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_260px]">
      <div className="mx-auto w-full min-w-0">
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
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search docs..."
                    aria-label="Search docs"
                    className="h-8 md:h-9 text-sm"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                    <kbd className="hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-muted-foreground">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </div>

          <div className="space-y-2">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-2">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-lg text-muted-foreground">
                {doc.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Last updated: {doc.lastUpdated}</p>
          </div>

          <div className="pb-12 pt-8">
            <DocsMarkdownContent markdown={doc.markdown} />
            <DocsExtras />
          </div>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-14 -mt-10 pt-4 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <RightSidebar markdown={doc.markdown} />
          </div>
        </div>
      </main>
  )
}
