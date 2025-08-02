import { NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileSidebar } from "@/components/MobileSidebar";
import Link from "next/link";
import { Menu, Search, Github } from "lucide-react";
import {StackIcon} from "@radix-ui/react-icons"
import { CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup, CommandDialog, CommandSeparator } from "@/components/ui/command";
import React from "react";
import { sidebarNav } from "@/components/Sidebar";
import {
  FileTextIcon,
  Component1Icon,
  GearIcon,
  ReaderIcon,
  InputIcon,
  CardStackIcon,
  ButtonIcon,
  ExclamationTriangleIcon
} from "@radix-ui/react-icons";

export default function Header() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-ring md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pl-1 pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center">
                <span className="font-bold">Lumen/UI</span>
              </Link>
            </div>
            <MobileSidebar />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block md:flex md:flex-row md:items-center md:justify-between md:gap-2">
              <StackIcon width="20" height="20"/>
              Lumen/UI
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <NavigationMenu>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/docs">Documentation</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/docs/components">Composants</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/docs/api">Api</Link>
              </NavigationMenuLink>
            </NavigationMenu>
          </div>

          
          <div
            className="relative flex items-center cursor-pointer group"
            onClick={() => setOpen(true)}
            tabIndex={0}
            role="button"
            aria-label="Ouvrir la recherche (Commande K)"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
          >
            <span className="absolute left-3 text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <div className="flex h-9 items-center w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm text-muted-foreground transition-colors">
              <span className="flex-1 text-left select-none">Rechercher...</span>
              <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none ml-4">
                <span className="text-sm">⌘</span>K
              </kbd>
            </div>
          </div>
          {open && (
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Rechercher une page ou un composant..." />
            <CommandList>
              <CommandEmpty>Aucun résultat.</CommandEmpty>
              {sidebarNav.map((section, idx) => (
                <React.Fragment key={section.title}>
                  {idx > 0 && <CommandSeparator />}
                  <CommandGroup heading={section.title}>
                    {section.items.map((item) => {
                      let icon = null;
                      if (section.title === "Introduction") icon = <ReaderIcon className="mr-2 h-4 w-4" />;
                      else if (section.title === "Composants") {
                        switch (item.key) {
                          case "alert": icon = <ExclamationTriangleIcon className="mr-2 h-4 w-4" />; break;
                          case "button": icon = <ButtonIcon className="mr-2 h-4 w-4" />; break;
                          case "input": icon = <InputIcon className="mr-2 h-4 w-4" />; break;
                          case "card": icon = <CardStackIcon className="mr-2 h-4 w-4" />; break;
                          default: icon = <Component1Icon className="mr-2 h-4 w-4" />;
                        }
                      } else if (section.title === "Configuration") icon = <GearIcon className="mr-2 h-4 w-4" />;
                      else icon = <FileTextIcon className="mr-2 h-4 w-4" />;
                      return (
                        <CommandItem
                          key={item.key || item.href}
                          onSelect={() => {
                            if (!item.disabled) {
                              window.location.href = item.href;
                              setOpen(false);
                            }
                          }}
                          disabled={item.disabled}
                          className={item.disabled ? "text-gray-400 cursor-not-allowed" : ""}
                        >
                          {icon}
                          {item.title}
                          {item.badge && (
                            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded align-middle">{item.badge}</span>
                          )}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </React.Fragment>
              ))}
            </CommandList>
          </CommandDialog>
          )}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* GitHub */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 