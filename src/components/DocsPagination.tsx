"use client"

import React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Liste des composants dans l'ordre alphabétique avec descriptions
const componentOrder = [
	{
		title: "Accordion",
		href: "/docs/components/accordion",
		description: "Un composant pliable pour organiser le contenu en sections",
	},
	{
		title: "Alert",
		href: "/docs/components/alert",
		description: "Affiche des messages d'information, d'avertissement ou d'erreur",
	},
	{
		title: "AlertDialog",
		href: "/docs/components/alert-dialog",
		description: "Dialogue modal pour les confirmations importantes",
	},
	{
		title: "Avatar",
		href: "/docs/components/avatar",
		description: "Affiche une image de profil utilisateur avec fallback",
	},
	{
		title: "Button",
		href: "/docs/components/button",
		description: "Bouton interactif avec différentes variantes et tailles",
	},
	{
		title: "Card",
		href: "/docs/components/card",
		description: "Conteneur flexible pour organiser le contenu",
	},
	{
		title: "Checkbox",
		href: "/docs/components/checkbox",
		description: "Case à cocher pour les sélections multiples",
	},
	{
		title: "Dialog",
		href: "/docs/components/dialog",
		description: "Fenêtre modale pour afficher du contenu additionnel",
	},
	{
		title: "Field",
		href: "/docs/components/field",
		description: "Composant de champ de formulaire avec validation et étiquetage",
	},
	{
		title: "Form",
		href: "/docs/components/form",
		description: "Élément de formulaire natif avec gestion consolidée des erreurs",
	},
	{
		title: "Input",
		href: "/docs/components/input",
		description: "Champ de saisie de texte avec validation",
	},
]

interface DocsPaginationProps {
	currentPath: string
	className?: string
}

export function DocsPagination({ currentPath, className }: DocsPaginationProps) {
	const currentIndex = componentOrder.findIndex(item => item.href === currentPath)

	if (currentIndex === -1) return null

	const prevComponent = currentIndex > 0 ? componentOrder[currentIndex - 1] : null
	const nextComponent = currentIndex < componentOrder.length - 1 ? componentOrder[currentIndex + 1] : null

	return (
		<div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 mt-8 border-t", className)}>
			{/* Carte Précédent */}
			<div className="flex justify-start">
				{prevComponent && (
					<Link
						href={prevComponent.href}
						className="group flex items-center gap-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors w-full max-w-sm"
					>
						<ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
						<div className="flex-1 text-left">
							<div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
								Précédent
							</div>
							<div className="font-semibold text-foreground mb-1">
								{prevComponent.title}
							</div>
							<div className="text-sm text-muted-foreground line-clamp-2">
								{prevComponent.description}
							</div>
						</div>
					</Link>
				)}
			</div>

			{/* Carte Suivant */}
			<div className="flex justify-end">
				{nextComponent && (
					<Link
						href={nextComponent.href}
						className="group flex items-center gap-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors w-full max-w-sm"
					>
						<div className="flex-1 text-right">
							<div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
								Suivant
							</div>
							<div className="font-semibold text-foreground mb-1">
								{nextComponent.title}
							</div>
							<div className="text-sm text-muted-foreground line-clamp-2">
								{nextComponent.description}
							</div>
						</div>
						<ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
					</Link>
				)}
			</div>
		</div>
	)
}
