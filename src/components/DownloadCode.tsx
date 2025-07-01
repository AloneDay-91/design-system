"use client"

import React from "react"
import { Download, FileText, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useTheme } from "next-themes"

interface DownloadCodeProps {
  componentName: string
  reactCode: string
  vueCode: string
  reactFileName?: string
  vueFileName?: string
}

export function DownloadCode({ 
  componentName,
  reactCode,
  vueCode,
  reactFileName,
  vueFileName
}: DownloadCodeProps) {
  const [copied, setCopied] = React.useState<string | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark';
  const syntaxTheme = isDark ? oneDark : oneLight;

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CodeBlock = ({ code, language, filename, isDark, syntaxTheme }: { code: string; language: string; filename: string; isDark: boolean; syntaxTheme: any }) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {filename}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(code, `${language}-copy`)}
              className="h-8"
            >
              {copied === `${language}-copy` ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copier
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => downloadFile(code, filename)}
              className="h-8"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <SyntaxHighlighter
            language={language.toLowerCase()}
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

  return (
    <div className="my-6 space-y-4">
      <div className="flex flex-row items-center gap-2">
        <FileText className="w-5 h-5 text-muted-foreground" />
        <h4 className="text-sm font-medium m-0">Code source</h4>
      </div>
      
      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="vue">Vue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="react" className="mt-4">
          <CodeBlock 
            code={reactCode} 
            language="typescript" 
            filename={reactFileName || `${componentName}.tsx`}
            isDark={isDark}
            syntaxTheme={syntaxTheme}
          />
        </TabsContent>
        
        <TabsContent value="vue" className="mt-4">
          <CodeBlock 
            code={vueCode} 
            language="vue" 
            filename={vueFileName || `${componentName}.vue`}
            isDark={isDark}
            syntaxTheme={syntaxTheme}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 