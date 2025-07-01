"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useTheme } from "next-themes"

interface ComponentPreviewProps {
  children: React.ReactNode
  reactCode: string
  vueCode: string
  title?: string
}

export function ComponentPreview({ 
  children, 
  reactCode, 
  vueCode, 
  title 
}: ComponentPreviewProps) {
  const [copied, setCopied] = React.useState<string | null>(null)
  const { theme } = useTheme()
  const syntaxTheme = theme === "dark" ? oneDark : oneLight

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const CodeBlock = ({ code, language }: { code: string; language: string }) => {
    const isDark = theme === 'dark'
    
    return (
      <div className="relative">
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <span className="text-sm font-medium text-muted-foreground">
            {language}
          </span>
          <button
            onClick={() => copyToClipboard(code, language)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied === language ? (
              <>
                <Check className="w-4 h-4" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copier
              </>
            )}
          </button>
        </div>
        <div className="overflow-hidden rounded-b-md border">
          <SyntaxHighlighter
            language={language.toLowerCase()}
            style={syntaxTheme}
            customStyle={{
              margin: 0,
              borderRadius: '0 0 6px 6px',
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

  return (
    <div className="my-8 space-y-6">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      
      {/* Preview */}
      <div className="p-6 border rounded-lg bg-background">
        <div className="flex items-center justify-center min-h-[100px]">
          {children}
        </div>
      </div>

      {/* Code Tabs */}
      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="vue">Vue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="react" className="mt-4">
          <CodeBlock code={reactCode} language="typescript" />
        </TabsContent>
        
        <TabsContent value="vue" className="mt-4">
          <CodeBlock code={vueCode} language="vue" />
        </TabsContent>
      </Tabs>
    </div>
  )
} 