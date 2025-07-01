"use client"

import React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InstallCommandsProps {
  npmPackage?: string
  dependencies?: string[]
  shadcnCommand?: string
  vuePackage?: string
  vueDependencies?: string[]
}

export function InstallCommands({ 
  npmPackage,
  dependencies = [],
  shadcnCommand,
  vuePackage,
  vueDependencies = []
}: InstallCommandsProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const CommandBlock = ({ command, label }: { command: string; label: string }) => (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
        <code className="flex-1 text-sm font-mono">{command}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(command, label)}
          className="h-8 w-8 p-0"
        >
          {copied === label ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="my-6 space-y-4">
      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="vue">Vue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="react" className="mt-4 space-y-3">
          {shadcnCommand && (
            <CommandBlock 
              command={shadcnCommand} 
              label="Avec shadcn/ui (recommandé)" 
            />
          )}
          
          {npmPackage && (
            <CommandBlock 
              command={`npm install ${npmPackage}${dependencies.length > 0 ? ` ${dependencies.join(' ')}` : ''}`} 
              label="Installation manuelle" 
            />
          )}
          
          {npmPackage && (
            <CommandBlock 
              command={`yarn add ${npmPackage}${dependencies.length > 0 ? ` ${dependencies.join(' ')}` : ''}`} 
              label="Avec Yarn" 
            />
          )}
          
          {npmPackage && (
            <CommandBlock 
              command={`pnpm add ${npmPackage}${dependencies.length > 0 ? ` ${dependencies.join(' ')}` : ''}`} 
              label="Avec pnpm" 
            />
          )}
        </TabsContent>
        
        <TabsContent value="vue" className="mt-4 space-y-3">
          {vuePackage && (
            <CommandBlock 
              command={`npm install ${vuePackage}${vueDependencies.length > 0 ? ` ${vueDependencies.join(' ')}` : ''}`} 
              label="Installation manuelle" 
            />
          )}
          
          {vuePackage && (
            <CommandBlock 
              command={`yarn add ${vuePackage}${vueDependencies.length > 0 ? ` ${vueDependencies.join(' ')}` : ''}`} 
              label="Avec Yarn" 
            />
          )}
          
          {vuePackage && (
            <CommandBlock 
              command={`pnpm add ${vuePackage}${vueDependencies.length > 0 ? ` ${vueDependencies.join(' ')}` : ''}`} 
              label="Avec pnpm" 
            />
          )}
          
          {!vuePackage && (
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">
                Version Vue.js en cours de développement pour ce composant.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 