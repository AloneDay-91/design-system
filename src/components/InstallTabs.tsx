"use client"

import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface InstallTabsProps {
  npm: string
  yarn?: string
  pnpm?: string
  bun?: string
  className?: string
}

export function InstallTabs({ npm, yarn, pnpm, bun, className }: InstallTabsProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const handleCopy = async (cmd: string, type: string) => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Erreur lors de la copie:", err)
    }
  }

  const CommandBlock = ({ command, type }: { command: string; type: string }) => (
    <div className="group relative">
      <div className="flex items-center gap-3 rounded-lg border bg-muted p-4">
        <Terminal className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <code className="flex-1 text-sm font-mono text-foreground break-all">
          {command}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(command, type)}
          className={cn(
            "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
            "hover:bg-accent hover:text-accent-foreground"
          )}
          aria-label={`Copier la commande ${type}`}
        >
          {copied === type ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )

  return (
    <div className={cn("w-full my-4", className)}>
      <Tabs defaultValue="npm" className="w-full">
        <TabsList className="h-auto p-1 bg-muted rounded-lg mb-4">
          <TabsTrigger
            value="npm"
            className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1.5 rounded-md"
          >
            npm
          </TabsTrigger>
          {yarn && (
            <TabsTrigger
              value="yarn"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1.5 rounded-md"
            >
              Yarn
            </TabsTrigger>
          )}
          {pnpm && (
            <TabsTrigger
              value="pnpm"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1.5 rounded-md"
            >
              pnpm
            </TabsTrigger>
          )}
          {bun && (
            <TabsTrigger
              value="bun"
              className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-3 py-1.5 rounded-md"
            >
              Bun
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="npm" className="mt-0">
          <CommandBlock command={npm} type="npm" />
        </TabsContent>

        {yarn && (
          <TabsContent value="yarn" className="mt-0">
            <CommandBlock command={yarn} type="yarn" />
          </TabsContent>
        )}

        {pnpm && (
          <TabsContent value="pnpm" className="mt-0">
            <CommandBlock command={pnpm} type="pnpm" />
          </TabsContent>
        )}

        {bun && (
          <TabsContent value="bun" className="mt-0">
            <CommandBlock command={bun} type="bun" />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
