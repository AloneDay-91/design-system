"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./CodeBlock"
import {Download, FileText} from "lucide-react";

interface DownloadCodeProps {
  componentName: string
  reactCode: string
  vueCode: string
  reactFileName?: string
  vueFileName?: string
}

export function DownloadCode({ 
  componentName,
  reactCode,
  vueCode,
  reactFileName,
  vueFileName
}: DownloadCodeProps) {

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const reactFile = reactFileName || `${componentName}.tsx`
  const vueFile = vueFileName || `${componentName}.vue`

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Code source</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadFile(reactCode, reactFile)}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            React
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadFile(vueCode, vueFile)}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Vue
          </Button>
        </div>
      </div>

      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="react" className="gap-2">
            <FileText className="h-4 w-4" />
            React
          </TabsTrigger>
          <TabsTrigger value="vue" className="gap-2">
            <FileText className="h-4 w-4" />
            Vue
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="react" className="mt-4">
          <CodeBlock 
            language="tsx"
            title={reactFile}
            showCopyButton={true}
          >
            {reactCode}
          </CodeBlock>
        </TabsContent>
        
        <TabsContent value="vue" className="mt-4">
          <CodeBlock 
            language="vue"
            title={vueFile}
            showCopyButton={true}
          >
            {vueCode}
          </CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  )
}