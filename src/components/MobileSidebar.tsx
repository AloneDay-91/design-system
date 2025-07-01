"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Sidebar navigation data (même que Sidebar.tsx)
const sidebarNav = [
  {
    title: "Introduction",
    items: [
      {
        title: "Vue d'ensemble",
        href: "/docs",
        key: "overview",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        key: "installation",
      },
    ],
  },
  {
    title: "Composants",
    items: [
      {
        title: "Button",
        href: "/docs/components/button",
        key: "button",
      },
      {
        title: "Alert",
        href: "/docs/components/alert",
        key: "alert",
      },
      {
        title: "Input",
        href: "/docs/components/input",
        key: "input",
      },
      {
        title: "Card",
        href: "/docs/components/card",
        key: "card",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Thème",
        href: "/docs/theme",
        key: "theme",
      },
      {
        title: "Variables CSS",
        href: "/docs/css-variables",
        key: "css-variables",
      },
    ],
  },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
      <div className="pl-1 pr-7">
        <div className="space-y-4">
          {sidebarNav.map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-foreground">{section.title}</h4>
              <div className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.key || item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-2 py-1 text-sm transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
} 