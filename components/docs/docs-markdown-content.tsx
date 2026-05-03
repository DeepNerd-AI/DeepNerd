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

function generateId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

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

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

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
    <div className="my-6 overflow-hidden rounded-lg border border-zinc-800 bg-black">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
        <Badge variant="secondary" className="rounded-md border border-zinc-800 bg-black text-zinc-500">
          {language || "code"}
        </Badge>
        <Button variant="ghost" size="sm" onClick={onCopy} className="h-7 px-2 text-xs">
          <Copy className="mr-1" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language === "ts" ? "typescript" : language === "sh" ? "bash" : language || "text"}
        style={vscDarkPlus}
        customStyle={{ margin: 0, background: "transparent", fontSize: "0.875rem", padding: "1rem" }}
        PreTag="div"
      >
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  )
}

export function DocsMarkdownContent({ markdown }: { markdown: string }) {
  const normalizedMarkdown = useMemo(() => markdown.replace(/\r\n/g, "\n"), [markdown])

  return (
    <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-3xl prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:text-zinc-500 prose-li:text-zinc-500 prose-strong:text-white prose-a:text-white hover:prose-a:text-white">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, ...props }) => <h1 className={cn("scroll-mt-24", className)} {...props} />,
          h2: ({ className, children, ...props }) => <h2 id={generateId(String(children))} className={cn("scroll-mt-24 border-b border-zinc-800 pb-2 font-bold", className)} {...props}>{children}</h2>,
          h3: ({ className, children, ...props }) => <h3 id={generateId(String(children))} className={cn("scroll-mt-24 font-bold", className)} {...props}>{children}</h3>,
          code: ({ className, children, ...props }) => {
            const language = className?.replace("language-", "") ?? ""
            const rawCode = String(children).replace(/\n$/, "")
            const isBlock = Boolean(className?.startsWith("language-")) || rawCode.includes("\n")

            if (isBlock) {
              return <CodeBlock language={language} code={rawCode} />
            }

            return (
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-white" {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => <>{children}</>,
          table: ({ children }) => (
            <div className="my-6 overflow-hidden rounded-lg border border-zinc-800">
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
              return <blockquote className="border-l-2 border-zinc-800 pl-4 text-zinc-500">{children}</blockquote>
            }

            const isWarning = parsed.type === "warning"
            return (
              <Alert className="my-6 border-zinc-800 bg-black">
                {isWarning ? <TriangleAlert className="text-zinc-500" /> : <Info className="text-zinc-500" />}
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

      <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
        <AlertCircle className="size-3.5" />
        Documentation content is versioned and reviewed before release.
      </div>
    </div>
  )
}