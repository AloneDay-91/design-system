"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Sidebar navigation data
export const sidebarNav = [
	{
		title: "Introduction",
		items: [
			{
				title: "Vue d'ensemble",
				href: "/docs",
				key: "overview",
				disabled: false,
			},
			{
				title: "Installation",
				href: "/docs/installation",
				key: "installation",
				disabled: false,
			},
			{
				title: "Composants",
				href: "/docs/components",
				key: "components-overview",
				disabled: false,
			},
		],
	},
	{
		title: "Composants",
		items: [
			{
				title: "Accordion",
				href: "/docs/components/accordion",
				key: "accordion",
				disabled: false,
			},
			{
				title: "Alert",
				href: "/docs/components/alert",
				key: "alert",
				disabled: false,
			},
			{
				title: "AlertDialog",
				href: "/docs/components/alert-dialog",
				key: "alert-dialog",
				disabled: false,
			},
			{
				title: "Avatar",
				href: "/docs/components/avatar",
				key: "avatar",
				disabled: false,
			},
			{
				title: "Button",
				href: "/docs/components/button",
				key: "button",
				disabled: false,
			},
			{
				title: "Card",
				href: "/docs/components/card",
				key: "card",
				disabled: false,
			},
			{
				title: "Checkbox",
				href: "/docs/components/checkbox",
				key: "checkbox",
				disabled: false,
			},
			{
				title: "Dialog",
				href: "/docs/components/dialog",
				key: "dialog",
				disabled: false,
			},
			{
				title: "Input",
				href: "/docs/components/input",
				key: "input",
				badge: "Bientôt",
				disabled: true,
			},
		].sort((a, b) => a.title.localeCompare(b.title)),
	},
	{
		title: "Configuration",
		items: [
			{
				title: "Thème",
				href: "/docs/theme",
				key: "theme",
				disabled: false,
			},
			{
				title: "Variables CSS",
				href: "/docs/css-variables",
				key: "css-variables",
				disabled: false,
			},
		],
	},
]

export function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
			<ScrollArea className="py-6 pr-6 lg:py-8">
				<div className="space-y-4">
					{sidebarNav.map((section) => (
						<div key={section.title}>
							<h4 className="mb-2 px-2 text-sm font-medium text-foreground">
								{section.title}
							</h4>
							<div className="space-y-1">
								{section.items.map((item) => {
									const isActive = pathname === item.href
									const isDisabled = item.disabled
									return (
										<Link
											key={item.key || item.href}
											href={item.href}
											className={cn(
												"block rounded-md px-2 py-1 text-sm transition-colors",
												isActive
													? "bg-accent text-accent-foreground font-medium"
													: isDisabled
													? "text-gray-400 cursor-not-allowed pointer-events-none bg-transparent"
													: "text-muted-foreground hover:text-foreground hover:bg-accent/50"
											)}
											tabIndex={isDisabled ? -1 : 0}
											aria-disabled={isDisabled ? true : undefined}
										>
											{item.title}
											{item.badge && (
												<Badge
													variant="secondary"
													className="ml-2 align-middle"
												>
													{item.badge}
												</Badge>
											)}
										</Link>
									)
								})}
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		</aside>
	)
}
