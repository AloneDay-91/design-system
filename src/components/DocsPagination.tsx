"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pages = [
  { href: "/docs", title: "Lumen/UI", description: "Accueil de la documentation" },
  { href: "/docs/installation", title: "Installation", description: "Installer et configurer le design system" },
  { href: "/docs/components/button", title: "Button", description: "Boutons réutilisables et stylés" },
  { href: "/docs/components/alert", title: "Alert", description: "Messages d'alerte et notifications" },
  { href: "/docs/components/input", title: "Input", description: "Champs de saisie accessibles" },
  { href: "/docs/components/card", title: "Card", description: "Conteneurs pour organiser le contenu" },
];

export function DocsPagination() {
  const pathname = usePathname();
  const currentIndex = pages.findIndex((p) => p.href === pathname);
  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group block rounded-lg border border-border bg-card p-6 transition hover:border-primary hover:bg-accent/50 dark:hover:bg-accent/10",
            "flex flex-col gap-2 h-full"
          )}
        >
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </span>
          <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{prev.title}</span>
          <span className="text-sm text-muted-foreground">{prev.description}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group block rounded-lg border border-border bg-card p-6 transition hover:border-primary hover:bg-accent/50 dark:hover:bg-accent/10",
            "flex flex-col gap-2 h-full text-right items-end"
          )}
        >
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            Suivant
            <ArrowRight className="w-4 h-4" />
          </span>
          <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{next.title}</span>
          <span className="text-sm text-muted-foreground">{next.description}</span>
        </Link>
      ) : <div />}
    </nav>
  );
} 