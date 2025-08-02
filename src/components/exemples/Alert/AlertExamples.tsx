"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Alert, AlertTitle, AlertDescription } from "@/design-system";
import { Terminal, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

export function AlertBasicExample() {
  return (
    <ComponentPreview
      title="Alert de base"
      reactCode={`import { Alert, AlertTitle, AlertDescription } from "@/design-system";
import { Terminal } from "lucide-react";

export default function Example() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        Vous pouvez ajouter des composants dans votre dossier app/components et les importer dans vos pages.
      </AlertDescription>
    </Alert>
  );
}`}
      vueCode={`<template>
  <Alert>
    <Terminal class="h-4 w-4" />
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>
      Vous pouvez ajouter des composants dans votre dossier app/components et les importer dans vos pages.
    </AlertDescription>
  </Alert>
</template>

<script setup>
import { Alert, AlertTitle, AlertDescription } from "@/design-system";
import { Terminal } from "lucide-vue-next";
</script>`}
    >
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Vous pouvez ajouter des composants dans votre dossier app/components et les importer dans vos pages.
        </AlertDescription>
      </Alert>
    </ComponentPreview>
  );
}

export function AlertVariantsExample() {
  return (
    <ComponentPreview
      title="Variantes"
      reactCode={`import { Alert, AlertTitle, AlertDescription } from "@/design-system";
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function Example() {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Votre session a expiré. Veuillez vous reconnecter.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Succès</AlertTitle>
        <AlertDescription>
          Vos modifications ont été sauvegardées avec succès.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Cette action ne peut pas être annulée.
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Une nouvelle version est disponible.
        </AlertDescription>
      </Alert>
    </div>
  );
}`}
    >
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Votre session a expiré. Veuillez vous reconnecter.
          </AlertDescription>
        </Alert>

        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Succès</AlertTitle>
          <AlertDescription>
            Vos modifications ont été sauvegardées avec succès.
          </AlertDescription>
        </Alert>

        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            Cette action ne peut pas être annulée.
          </AlertDescription>
        </Alert>

        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Une nouvelle version est disponible.
          </AlertDescription>
        </Alert>
      </div>
    </ComponentPreview>
  );
}
