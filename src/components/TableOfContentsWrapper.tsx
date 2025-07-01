"use client"

import React from "react"
import { TableOfContents } from "./TableOfContents"
import { useHeadings } from "@/hooks/useHeadings"

export function TableOfContentsWrapper() {
  const headings = useHeadings()

  // Filtrer les titres pour ne garder que les sections principales
  const filteredHeadings = headings.filter((heading) => {
    // Ne garder que h1 et h2
    if (heading.level !== 1 && heading.level !== 2) return false
    
    // Exclure les titres trop courts
    if (heading.text.length < 3) return false
    
    // Exclure les titres non pertinents
    const excludeKeywords = [
      'nouveau', 'créé', 'fonctionnalités', 'disponible', 'maintenant',
      'vue d\'ensemble', 'introduction', 'exemple', 'exemples',
      'documentation', 'navigation', 'disponibles', 'base', 'feedback'
    ]
    if (excludeKeywords.some(keyword => heading.text.toLowerCase().includes(keyword))) return false
    
    // Exclure les titres qui contiennent des emojis ou des caractères spéciaux
    if (/[🚨✅📝🎯📁🚀🎨🔧🎉📋🔗⚡]/.test(heading.text)) return false
    
    return true
  })

  // Ne pas afficher si il n'y a pas assez de contenu pertinent
  if (filteredHeadings.length < 2) {
    return null
  }

  return <TableOfContents headings={headings} />
} 