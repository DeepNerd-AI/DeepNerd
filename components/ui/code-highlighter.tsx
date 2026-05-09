"use client";

import React from "react";

interface CodeHighlighterProps {
  code: string;
  language?: "rust" | "typescript" | "javascript" | "json";
  className?: string;
}

export function CodeHighlighter({ code, language = "typescript", className = "" }: CodeHighlighterProps) {
  // A very basic regex-based syntax highlighter for a dark theme
  const highlightCode = (str: string) => {
    let highlighted = str;

    // Keywords
    const keywords = [
      "pub", "fn", "mut", "match", "if", "else", "return", "let", "const", 
      "await", "async", "import", "from", "require", "new", "class", "export", 
      "default", "interface", "type", "struct", "enum", "impl"
    ];
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");

    // Types
    const types = [
      "Result", "EngineError", "Instant", "BufferMutation", "EditorContext", "String", "number", "boolean", "any"
    ];
    const typeRegex = new RegExp(`\\b(${types.join("|")})\\b`, "g");

    // Comments
    const commentRegex = /(\/\/.*$)/gm;

    // Strings
    const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;

    // Numbers
    const numberRegex = /\b(\d+)\b/g;

    // Booleans
    const boolRegex = /\b(true|false)\b/g;

    // Functions/Methods calls
    const funcRegex = /\b([a-zA-Z_]\w*)(?=\s*\()/g;

    // Properties/Macros
    const propRegex = /([a-zA-Z_]\w*)(?=\s*:|!)/g;

    // Apply highlighting by wrapping in spans
    // Note: order matters. String and comments first to avoid parsing inside them
    // Actually, simple regex replacement has edge cases, but we're doing this for specific snippets

    // Protect strings and comments temporarily (naive approach)
    let parts: { type: string, text: string }[] = [];
    
    // Split by lines to handle comments better
    const lines = str.split("\\n");
    
    // For simplicity, let's just do sequential replacements with unique tokens 
    // to avoid nested replacements if we aren't using a real lexer.
    // Or we can just render it line by line
    
    return str.split("\\n").map((line, i) => {
      if (line.trim().startsWith("//")) {
        return <span key={i} className="text-zinc-500">{line}{"\\n"}</span>;
      }
      
      // Basic line parsing
      let parsedLine = line
        .replace(keywordRegex, '<span class="text-blue-400">$1</span>')
        .replace(typeRegex, '<span class="text-yellow-300">$1</span>')
        .replace(funcRegex, '<span class="text-yellow-200">$1</span>')
        .replace(propRegex, '<span class="text-purple-400">$1</span>')
        .replace(stringRegex, '<span class="text-green-400">$&</span>')
        .replace(numberRegex, '<span class="text-orange-400">$1</span>')
        .replace(boolRegex, '<span class="text-orange-400">$1</span>');

      // Re-fix comments at the end of the line
      parsedLine = parsedLine.replace(/(<span.*?>)?(\/\/.*)(<\/span>)?$/, (match, p1, p2, p3) => {
        // Just strip out any inner tags from the comment
        const cleanComment = p2.replace(/<[^>]+>/g, "");
        return `<span class="text-zinc-500">${cleanComment}</span>`;
      });

      return <span key={i} dangerouslySetInnerHTML={{ __html: parsedLine + "\\n" }} />;
    });
  };

  return (
    <pre className={\`font-mono text-sm leading-relaxed whitespace-pre font-light \${className}\`}>
      <code>{highlightCode(code)}</code>
    </pre>
  );
}
