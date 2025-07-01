"use client"

import React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InstallCommandProps {
  packageName: string
  componentName: string
  dependencies?: string[]
  shadcnCommand?: string
}

export function InstallCommand({ 
  packageName, 
  componentName, 
  dependencies = [],
  shadcnCommand
}: InstallCommandProps) {
  const [copied, setCopied] = React.useState(false)

  const installCommand = `npm install ${packageName}${dependencies.length > 0 ? ` ${dependencies.join(' ')}` : ''}`
  const shadcnInstallCommand = shadcnCommand || `npx shadcn@latest add ${componentName.toLowerCase()}`

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  return (
    <div className="my-6 space-y-4">
      <div className="space-y-3">
        {/* Installation manuelle */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Installation manuelle :</p>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <code className="flex-1 text-sm font-mono">{installCommand}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(installCommand)}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Installation avec shadcn/ui */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Avec shadcn/ui :</p>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <code className="flex-1 text-sm font-mono">{shadcnInstallCommand}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(shadcnInstallCommand)}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 