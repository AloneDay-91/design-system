"use client"

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface InstallTabsProps {
  npm: string;
  yarn?: string;
  pnpm?: string;
  bun?: string;
}

export function InstallTabs({ npm, yarn, pnpm, bun }: InstallTabsProps) {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = async (cmd: string, type: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <Tabs defaultValue="npm" className="w-full my-4">
      <TabsList className="flex mb-2">
        <TabsTrigger value="npm" className="min-w-0 px-4">npm</TabsTrigger>
        <TabsTrigger value="yarn" disabled={!yarn} className="min-w-0 px-4">Yarn</TabsTrigger>
        <TabsTrigger value="pnpm" disabled={!pnpm} className="min-w-0 px-4">pnpm</TabsTrigger>
        {bun && <TabsTrigger value="bun" className="min-w-0 px-4">Bun</TabsTrigger>}
      </TabsList>
      <TabsContent value="npm">
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
          <code className="flex-1 text-sm font-mono">{npm}</code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(npm, "npm")}
            className="h-8 w-8 p-0"
          >
            {copied === "npm" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </TabsContent>
      {yarn && (
        <TabsContent value="yarn">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <code className="flex-1 text-sm font-mono">{yarn}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(yarn, "yarn")}
              className="h-8 w-8 p-0"
            >
              {copied === "yarn" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </TabsContent>
      )}
      {pnpm && (
        <TabsContent value="pnpm">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <code className="flex-1 text-sm font-mono">{pnpm}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(pnpm, "pnpm")}
              className="h-8 w-8 p-0"
            >
              {copied === "pnpm" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </TabsContent>
      )}
      {bun && (
        <TabsContent value="bun">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <code className="flex-1 text-sm font-mono">{bun}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(bun, "bun")}
              className="h-8 w-8 p-0"
            >
              {copied === "bun" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
} 