"use client"

import { useEffect, useState } from "react"

interface Heading {
  level: number
  text: string
  slug: string
}

export function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const extractedHeadings: Heading[] = []

      headingElements.forEach((element) => {
        const level = parseInt(element.tagName.charAt(1))
        const text = element.textContent || ""
        
        // Générer un slug basé sur le texte
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")

        // Ajouter l'ID au titre si il n'en a pas
        if (!element.id) {
          element.id = slug
        }

        extractedHeadings.push({
          level,
          text,
          slug: element.id || slug,
        })
      })

      setHeadings(extractedHeadings)
    }

    // Extraire les titres après un délai pour laisser le temps au contenu de se charger
    const timer = setTimeout(extractHeadings, 100)
    
    // Observer les changements dans le DOM
    const observer = new MutationObserver(extractHeadings)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return headings
} 