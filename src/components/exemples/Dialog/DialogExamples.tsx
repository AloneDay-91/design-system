"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/design-system";
import { Button } from "@/design-system";
import { Form } from "@/design-system";
import { Input } from "@/design-system";

export function DialogBasicExample() {
  return (
    <ComponentPreview
      title="Dialog de base"
      reactCode={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/design-system";
import { Button } from "@/design-system";
import { Form } from "@/design-system";
import { Input } from "@/design-system";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ouvrir Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
          <DialogDescription>
            Apportez des modifications à votre profil ici. Cliquez sur sauvegarder lorsque vous avez terminé.
          </DialogDescription>
        </DialogHeader>
            <DialogContent>
                <Form className="grid gap-4 p-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Nom
            </label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </Form>
            </DialogContent>
        <DialogFooter>
          <Button type="submit">Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`}
      vueCode={`<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Ouvrir Dialog</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier le profil</DialogTitle>
        <DialogDescription>
          Apportez des modifications à votre profil ici. Cliquez sur sauvegarder lorsque vous avez terminé.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="name" class="text-right">Nom</label>
          <input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <label for="username" class="text-right">Username</label>
          <input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Sauvegarder</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ouvrir Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Apportez des modifications à votre profil ici. Cliquez sur sauvegarder lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <Form className="pt-0 px-6 pb-6">
            <div className="">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Nom
              </label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="">
              <label htmlFor="username" className="text-right text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </Form>
          <DialogFooter>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ComponentPreview>
  );
}

export function DialogScrollableExample() {
  return (
    <ComponentPreview
      title="Dialog avec contenu défilable"
      reactCode={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/design-system";
import { Button } from "@/design-system";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contenu long</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Conditions d'utilisation</DialogTitle>
          <DialogDescription>
            Veuillez lire attentivement nos conditions d'utilisation.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto">
          <div className="space-y-4 text-sm">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco...</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse...</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa...</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}`}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Contenu long</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Conditions d&#39;utilisation</DialogTitle>
            <DialogDescription>
              Veuillez lire attentivement nos conditions d&#39;utilisation.
            </DialogDescription>
          </DialogHeader>
            <div className="max-h-[300px] overflow-y-auto px-6 pb-6">
              <div className="space-y-4 text-sm">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </ComponentPreview>
  );
}
