"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useTheme } from "next-themes"
import { Copy, Check, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: React.ReactNode
  language?: string
  showCopyButton?: boolean
  title?: string
  className?: string
  variant?: "default" | "inline" | "preview"
}

export function CodeBlock({
  children,
  language = "tsx",
  showCopyButton = true,
  title,
  className,
  variant = "default"
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Convertir les children React en string
  const codeString = React.useMemo(() => {
    if (typeof children === 'string') {
      return children
    }
    return React.Children.toArray(children)
      .map((child) => {
        if (typeof child === 'string') {
          return child
        }
        if (React.isValidElement(child)) {
          // Vérification de type pour child.props
          const props = child.props as { children?: React.ReactNode }
          if (props.children) {
            return typeof props.children === 'string'
              ? props.children
              : React.Children.toArray(props.children).join('')
          }
        }
        return ''
      })
      .join('')
      .trim()
  }, [children])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Thèmes personnalisés utilisant les variables CSS shadcn/ui
  const customDarkTheme = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'hsl(var(--muted))',
      border: '1px solid hsl(var(--border))',
      color: 'hsl(var(--foreground))',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      color: 'hsl(var(--foreground))',
    },
  }

  const customLightTheme = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: 'hsl(var(--muted))',
      border: '1px solid hsl(var(--border))',
      color: 'hsl(var(--foreground))',
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      background: 'transparent',
      color: 'hsl(var(--foreground))',
    },
  }

  if (!mounted) {
    return (
      <div className="rounded-lg border bg-muted p-4">
        <pre className="text-sm">
          <code>{codeString}</code>
        </pre>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <code className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground",
        className
      )}>
        {children}
      </code>
    )
  }

  return (
    <div className={cn(
      "group relative rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}>
      {title && (
        <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2 rounded-t-lg">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      )}

      <div className="relative">
        {showCopyButton && (
          <button
            onClick={copyToClipboard}
            className={cn(
              "absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "opacity-0 group-hover:opacity-100"
            )}
            aria-label="Copier le code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}

        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? customDarkTheme : customLightTheme}
          customStyle={{
            margin: 0,
            borderRadius: title ? "0 0 calc(var(--radius)) calc(var(--radius))" : "calc(var(--radius))",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Consolas, monospace",
            }
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
