"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useTheme } from "next-themes"
import { Copy, Check } from "lucide-react"

interface CodeExampleProps {
  code: string
  language?: string
  showCopyButton?: boolean
}

export function CodeExample({ 
  code, 
  language = "tsx", 
  showCopyButton = true 
}: CodeExampleProps) {
  const [copied, setCopied] = React.useState(false)
  const { theme } = useTheme()
  const syntaxTheme = theme === "dark" ? oneDark : oneLight
  const isDark = theme === 'dark'

  // Mapper les langages pour une meilleure coloration
  const getLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "vue":
        return "vue"
      case "react":
        return "tsx"
      case "javascript":
        return "js"
      case "typescript":
        return "ts"
      case "bash":
        return "bash"
      case "shell":
        return "bash"
      case "css":
        return "css"
      case "html":
        return "html"
      case "json":
        return "json"
      case "markdown":
        return "markdown"
      default:
        return lang.toLowerCase()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  return (
    <div className="relative my-2">
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 z-10 flex items-center gap-2 rounded bg-muted/80 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copier
            </>
          )}
        </button>
      )}
      <div className="overflow-hidden rounded-md border">
        <SyntaxHighlighter
          language={getLanguage(language)}
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '1.5',
            padding: '16px',
            backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            color: isDark ? '#6b7280' : '#9ca3af',
            fontSize: '12px',
            paddingRight: '16px',
            minWidth: '2.5em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
} 