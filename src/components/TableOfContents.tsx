"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Hash, ChevronRight } from "lucide-react"

interface TableOfContentsProps {
  headings: Array<{
    level: number
    text: string
    slug: string
  }>
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = React.useState<string>("")
  const [isExpanded, setIsExpanded] = React.useState(true)

  // Filtrer les titres pour ne garder que les sections principales
  const filteredHeadings = headings.filter((heading) => {
    // Ne garder que h1 et h2
    if (heading.level !== 1 && heading.level !== 2) return false

    // Exclure les titres trop courts
    if (heading.text.length < 3) return false

    // Exclure les titres non pertinents
    const excludeKeywords = [
      'nouveau', 'créé', 'fonctionnalités', 'disponible', 'maintenant',
      'vue d\'ensemble','documentation', 'navigation', 'disponibles', 'base', 'feedback',
      'success', 'error', 'warning', 'loading', 'toast', 'modal', 'dialog', 'search',
      'command palette', 'palette', 'command', 'recherche', 'rechercher'
    ]
    if (excludeKeywords.some(keyword => heading.text.toLowerCase().includes(keyword))) return false

    // Exclure les titres qui contiennent des emojis ou des caractères spéciaux
    if (/[🚨✅📝🎯📁🚀🎨🔧🎉📋🔗⚡]/.test(heading.text)) return false

    return true
  })

  // Créer un Set des slugs valides pour une recherche rapide
  const validSlugs = React.useMemo(() =>
    new Set(filteredHeadings.map(h => h.slug)),
    [filteredHeadings]
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.id
            // Vérifier que l'élément correspond à un heading valide
            if (validSlugs.has(elementId)) {
              // Vérifier que l'élément est bien un heading (h1, h2, etc.)
              const element = entry.target as HTMLElement
              if (element.tagName.match(/^H[1-6]$/)) {
                // Vérifier que l'élément est dans le contenu principal, pas dans un overlay/modal
                const isInMainContent = !element.closest('[role="dialog"]') &&
                                      !element.closest('[data-radix-portal]') &&
                                      !element.closest('.toast-viewport') &&
                                      !element.closest('[data-toast-viewport]') &&
                                      !element.closest('[role="alertdialog"]') &&
                                      !element.closest('.modal') &&
                                      !element.closest('[data-overlay]') &&
                                      !element.closest('.cmdk-root')

                if (isInMainContent) {
                  setActiveHeading(elementId)
                }
              }
            }
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0
      }
    )

    // Observer uniquement les headings valides qui sont dans le DOM principal
    filteredHeadings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) {
        // Vérifier que l'élément est bien un heading et dans le contenu principal
        if (element.tagName.match(/^H[1-6]$/) &&
            !element.closest('[role="dialog"]') &&
            !element.closest('[data-radix-portal]') &&
            !element.closest('.toast-viewport') &&
            !element.closest('[data-toast-viewport]')) {
          observer.observe(element)
        }
      }
    })

    return () => observer.disconnect()
  }, [filteredHeadings, validSlugs])

  const scrollToHeading = (slug: string) => {
    const element = document.getElementById(slug)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (filteredHeadings.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-semibold text-sm text-foreground m-0">Sur cette page</h4>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-accent rounded-sm transition-colors"
          aria-label={isExpanded ? "Réduire" : "Développer"}
        >
          <ChevronRight
            className={cn(
              "h-3 w-3 text-muted-foreground transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        </button>
      </div>
      
      {isExpanded && (
        <nav className="relative space-y-1">
          {/* Barre verticale de fond */}
          <div className="absolute left-4 top-[35px] h-[calc(100%-45px)] w-0.5 bg-muted-foreground/20" />

          {filteredHeadings.map((heading) => {
            const isActive = activeHeading === heading.slug
            const indent = heading.level === 1 ? 0 : 16

            return (
              <button
                key={heading.slug}
                onClick={() => scrollToHeading(heading.slug)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground",
                  isActive
                    ? "text-accent-foreground font-medium"
                    : "text-muted-foreground"
                )}
                style={{ paddingLeft: `${indent + 12}px` }}
              >
                {/* Barre claire pour la section active */}
                {isActive && (
                  <div className="absolute left-4 h-[calc(100%)] w-0.5 bg-muted-foreground rounded-full" />
                )}
                <span className="truncate">{heading.text}</span>
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}
