import { ComponentPreview } from "@/components/ComponentPreview";
import { Input } from "@/design-system";

export function InputBasicExample() {
  return (
    <ComponentPreview
      title="Exemple de base"
      reactCode={`import { Input } from "@/design-system";

<Input placeholder="Entrez votre nom" />`}
      vueCode={`<template>
  <Input placeholder="Entrez votre nom" />
</template>

<script setup>
import { Input } from '@/components/ui/input.vue'
</script>`}
    >
      <Input placeholder="Entrez votre nom" />
    </ComponentPreview>
  );
}

export function InputTypesExample() {
  return (
    <ComponentPreview
      title="Types d'input"
      reactCode={`import { Input } from "@/design-system";

<div className="space-y-4">
  <Input type="text" placeholder="Saisissez votre nom" />
  <Input type="email" placeholder="email@exemple.com" />
  <Input type="password" placeholder="Mot de passe" />
  <Input type="number" placeholder="Âge" />
</div>`}
      vueCode={`<template>
  <div className="space-y-4">
    <Input type="text" placeholder="Saisissez votre nom" />
    <Input type="email" placeholder="email@exemple.com" />
    <Input type="password" placeholder="Mot de passe" />
    <Input type="number" placeholder="Âge" />
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input.vue'
</script>`}
    >
      <div className="space-y-4">
        <Input type="text" placeholder="Saisissez votre nom" />
        <Input type="email" placeholder="email@exemple.com" />
        <Input type="password" placeholder="Mot de passe" />
        <Input type="number" placeholder="Âge" />
      </div>
    </ComponentPreview>
  );
}

export function InputStatesExample() {
  return (
    <ComponentPreview
      title="États"
      reactCode={`import { Input } from "@/design-system";

<div className="space-y-4">
  <Input placeholder="Champ normal" />
  <Input placeholder="Champ désactivé" disabled />
  <Input placeholder="Champ en lecture seule" readOnly />
  <Input defaultValue="Valeur par défaut" />
</div>`}
      vueCode={`<template>
  <div className="space-y-4">
    <Input placeholder="Champ normal" />
    <Input placeholder="Champ désactivé" disabled />
    <Input placeholder="Champ en lecture seule" readOnly />
    <Input defaultValue="Valeur par défaut" />
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input.vue'
</script>`}
    >
      <div className="space-y-4">
        <Input placeholder="Champ normal" />
        <Input placeholder="Champ désactivé" disabled />
        <Input placeholder="Champ en lecture seule" readOnly />
        <Input defaultValue="Valeur par défaut" />
      </div>
    </ComponentPreview>
  );
}

export function InputCallbackExample() {
  return (
    <ComponentPreview
      title="Avec callback"
      reactCode={`import { Input } from "@/design-system";

function MyComponent() {
  const handleValueChange = (value: string, event: Event) => {
    console.log("Valeur:", value);
  };

  return (
    <Input 
      placeholder="Tapez pour voir la valeur en console"
      onValueChange={handleValueChange}
    />
  );
}`}
      vueCode={`<template>
  <Input 
    placeholder="Tapez pour voir la valeur en console"
    @value-change="handleValueChange"
  />
</template>

<script setup>
import { Input } from '@/components/ui/input.vue'

const handleValueChange = (value: string) => {
  console.log('Valeur:', value)
}
</script>`}
    >
      <div className="space-y-2">
        <Input placeholder="Tapez pour voir la valeur en console" />
        <p className="text-sm text-muted-foreground">
          💡 Ouvrez la console du navigateur et tapez dans le champ pour voir
          l&#39;événement onValueChange en action
        </p>
      </div>
    </ComponentPreview>
  );
}
