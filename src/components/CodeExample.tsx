"use client"

import React from "react"
import { CodeBlock } from "./CodeBlock"
import { cn } from "@/lib/utils"
import { Eye, Code2 } from "lucide-react"

interface CodeExampleProps {
  children: React.ReactNode
  code: string
  language?: string
  title?: string
  description?: string
  className?: string
  showPreview?: boolean
}

export function CodeExample({
  children,
  code,
  language = "tsx",
  title,
  description,
  className,
  showPreview = true
}: CodeExampleProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview")

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {/* Header avec titre, description et onglets */}
      {(title || description || showPreview) && (
        <div className="border-b bg-muted/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-foreground p-0 m-0">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>

            {/* Onglets sous forme de boutons à droite */}
            {showPreview && (
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                    activeTab === "preview"
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Eye className="h-4 w-4" />
                  Aperçu
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                    activeTab === "code"
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Code2 className="h-4 w-4" />
                  Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="relative">
        {showPreview && activeTab === "preview" ? (
          <div className="p-6">
            <div className="flex items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed border-border bg-background/50">
              {children}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-b-lg">
            <CodeBlock
              language={language}
              showCopyButton={true}
              className="border-0 rounded-none"
            >
              {code}
            </CodeBlock>
          </div>
        )}
      </div>
    </div>
  )
}
