"use client"

import { useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { AlertCircle, Copy, Info, TriangleAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

function parseCallout(text: string): { type: "note" | "warning"; body: string } | null {
  const noteMatch = text.match(/^> \[!NOTE\]\n([\s\S]*)$/)
  if (noteMatch) {
    return { type: "note", body: noteMatch[1].trim() }
  }

  const warningMatch = text.match(/^> \[!WARNING\]\n([\s\S]*)$/)
  if (warningMatch) {
    return { type: "warning", body: warningMatch[1].trim() }
  }

  return null
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <Badge variant="secondary" className="rounded-md border border-border bg-background text-muted-foreground">
          {language || "code"}
        </Badge>
        <Button variant="ghost" size="sm" onClick={onCopy} className="h-7 px-2 text-xs">
          <Copy className="mr-1" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function DocsMarkdownContent({ markdown }: { markdown: string }) {
  const normalizedMarkdown = useMemo(() => markdown.replace(/\r\n/g, "\n"), [markdown])

  return (
    <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-3xl prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground hover:prose-a:text-white">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, ...props }) => <h1 className={cn("scroll-mt-24", className)} {...props} />,
          h2: ({ className, ...props }) => <h2 className={cn("scroll-mt-24 border-b border-border pb-2", className)} {...props} />,
          h3: ({ className, ...props }) => <h3 className={cn("scroll-mt-24", className)} {...props} />,
          code: ({ className, children, ...props }) => {
            const language = className?.replace("language-", "") ?? ""
            const rawCode = String(children).replace(/\n$/, "")
            const isBlock = Boolean(className?.startsWith("language-")) || rawCode.includes("\n")

            if (isBlock) {
              return <CodeBlock language={language} code={rawCode} />
            }

            return (
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground" {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="my-6 overflow-hidden rounded-lg border border-border">
              <Table>{children}</Table>
            </div>
          ),
          thead: ({ children }) => <TableHeader>{children}</TableHeader>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          th: ({ children }) => <TableHead>{children}</TableHead>,
          td: ({ children }) => <TableCell>{children}</TableCell>,
          blockquote: ({ children }) => {
            const rawText = String(children)
              .replaceAll("\n", "\n")
              .replace(/\s+/g, " ")
              .trim()

            const parsed = parseCallout(rawText)
            if (!parsed) {
              return <blockquote className="border-l-2 border-border pl-4 text-muted-foreground">{children}</blockquote>
            }

            const isWarning = parsed.type === "warning"
            return (
              <Alert className="my-6 border-border bg-card">
                {isWarning ? <TriangleAlert className="text-muted-foreground" /> : <Info className="text-muted-foreground" />}
                <AlertTitle>{isWarning ? "Warning" : "Note"}</AlertTitle>
                <AlertDescription>{parsed.body}</AlertDescription>
              </Alert>
            )
          },
          a: ({ href, children }) => {
            const isExternal = Boolean(href?.startsWith("http"))
            if (isExternal) {
              return (
                <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  {children}
                </a>
              )
            }

            return (
              <a href={href} className="underline underline-offset-4">
                {children}
              </a>
            )
          },
        }}
      >
        {normalizedMarkdown}
      </ReactMarkdown>

      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <AlertCircle className="size-3.5" />
        Documentation content is versioned and reviewed before release.
      </div>
    </div>
  )
}