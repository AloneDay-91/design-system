"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/design-system";
import { Button } from "@/design-system";

export function AlertDialogBasicExample() {
  return (
    <ComponentPreview
      title="AlertDialog de base"
      reactCode={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/design-system";
import { Button } from "@/design-system";

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Supprimer le compte</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera définitivement votre
            compte et supprimera vos données de nos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction>Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`}
      vueCode={`<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive">Supprimer le compte</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action ne peut pas être annulée. Cela supprimera définitivement votre
          compte et supprimera vos données de nos serveurs.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction>Continuer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>`}
    >
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">Supprimer le compte</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement votre
              compte et supprimera vos données de nos serveurs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ComponentPreview>
  );
}

export function AlertDialogCustomExample() {
  return (
    <ComponentPreview
      title="AlertDialog personnalisé"
      reactCode={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/design-system";
import { Button } from "@/design-system";

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Vider la corbeille</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vider la corbeille ?</AlertDialogTitle>
          <AlertDialogDescription>
            Tous les éléments de la corbeille seront définitivement supprimés.
            Cette action ne peut pas être annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Conserver</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
            Vider la corbeille
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`}
    >
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">Vider la corbeille</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vider la corbeille ?</AlertDialogTitle>
            <AlertDialogDescription>
              Tous les éléments de la corbeille seront définitivement supprimés.
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Conserver</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
              Vider la corbeille
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ComponentPreview>
  );
}
