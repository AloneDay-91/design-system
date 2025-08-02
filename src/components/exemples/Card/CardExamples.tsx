"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/design-system";
import { Button } from "@/design-system";

export function CardBasicExample() {
  return (
    <ComponentPreview
      title="Card de base"
      reactCode={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/design-system";
import { Button } from "@/design-system";

export default function Example() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Créer un projet</CardTitle>
        <CardDescription>Déployez votre nouveau projet en un clic.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Configurez votre projet et déployez-le sur notre plateforme.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Déployer</Button>
      </CardFooter>
    </Card>
  );
}`}
      vueCode={`<template>
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Créer un projet</CardTitle>
      <CardDescription>Déployez votre nouveau projet en un clic.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Configurez votre projet et déployez-le sur notre plateforme.</p>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button variant="outline">Annuler</Button>
      <Button>Déployer</Button>
    </CardFooter>
  </Card>
</template>`}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Créer un projet</CardTitle>
          <CardDescription>Déployez votre nouveau projet en un clic.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Configurez votre projet et déployez-le sur notre plateforme.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button>Déployer</Button>
        </CardFooter>
      </Card>
    </ComponentPreview>
  );
}

export function CardSimpleExample() {
  return (
    <ComponentPreview
      title="Card simple"
      reactCode={`import { Card, CardContent } from "@/design-system";

export default function Example() {
  return (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Une carte simple avec juste du contenu.</p>
      </CardContent>
    </Card>
  );
}`}
    >
      <Card className="w-[350px]">
        <CardContent className="pt-6">
          <p>Une carte simple avec juste du contenu.</p>
        </CardContent>
      </Card>
    </ComponentPreview>
  );
}
