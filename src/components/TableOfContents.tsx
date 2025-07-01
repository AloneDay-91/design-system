"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Hash } from "lucide-react"

interface TableOfContentsProps {
  headings: Array<{
    level: number
    text: string
    slug: string
  }>
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = React.useState<string>("")

  // Filtrer les titres pour ne garder que les sections principales
  const filteredHeadings = headings.filter((heading) => {
    // Ne garder que h1 et h2
    if (heading.level !== 1 && heading.level !== 2) return false
    
    // Exclure les titres trop courts
    if (heading.text.length < 3) return false
    
    // Exclure les titres non pertinents
    const excludeKeywords = [
      'nouveau', 'créé', 'fonctionnalités', 'disponible', 'maintenant',
      'vue d\'ensemble','documentation', 'navigation', 'disponibles', 'base', 'feedback'
    ]
    if (excludeKeywords.some(keyword => heading.text.toLowerCase().includes(keyword))) return false
    
    // Exclure les titres qui contiennent des emojis ou des caractères spéciaux
    if (/[🚨✅📝🎯📁🚀🎨🔧🎉📋🔗⚡]/.test(heading.text)) return false
    
    return true
  })

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    )

    filteredHeadings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [filteredHeadings])

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
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4 text-muted-foreground" />
        <h4 className="font-semibold text-sm text-foreground m-0">Navigation</h4>
      </div>
      
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
    </div>
  )
} 