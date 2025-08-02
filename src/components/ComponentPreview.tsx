"use client"

import React from "react"
import { CodeBlock } from "./CodeBlock"
import { cn } from "@/lib/utils"
import { Eye, Code2 } from "lucide-react"

interface ComponentPreviewProps {
  children: React.ReactNode
  reactCode: string
  vueCode?: string
  title?: string
  description?: string
  className?: string
}

export function ComponentPreview({ 
  title,
  description,
  children,
  reactCode,
  vueCode,
  className
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview")
  const [selectedLanguage, setSelectedLanguage] = React.useState<"react" | "vue">("react")

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {/* Header avec titre, description et onglets */}
      {(title || description) && (
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
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="relative">
        {activeTab === "preview" ? (
          <div className="p-6">
            <div className="flex items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed border-border bg-background/50 p-6">
              {children}
            </div>
          </div>
        ) : (
          <div>
            {/* Sélecteur de langage si Vue est disponible */}
            {vueCode && (
              <div className="border-b bg-muted/30 px-6 py-3">
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
                  <button
                    onClick={() => setSelectedLanguage("react")}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                      selectedLanguage === "react"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    React
                  </button>
                  <button
                    onClick={() => setSelectedLanguage("vue")}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium transition-colors rounded-md",
                      selectedLanguage === "vue"
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    Vue
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-b-lg">
              <CodeBlock
                language={selectedLanguage === "react" ? "tsx" : "vue"}
                showCopyButton={true}
                className="border-0 rounded-none"
              >
                {selectedLanguage === "react" ? reactCode : (vueCode || reactCode)}
              </CodeBlock>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
