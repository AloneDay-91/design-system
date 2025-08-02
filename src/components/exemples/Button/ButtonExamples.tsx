"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Button } from "@/design-system";

export function ButtonBasicExample() {
  return (
    <ComponentPreview
      title="Button de base"
      reactCode={`import { Button } from "@/design-system";

export default function Example() {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`}
      vueCode={`<template>
  <div class="flex gap-3 flex-wrap">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
</template>`}
    >
      <div className="flex gap-3 flex-wrap">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </ComponentPreview>
  );
}

export function ButtonSizesExample() {
  return (
    <ComponentPreview
      title="Tailles"
      reactCode={`import { Button } from "@/design-system";

export default function Example() {
  return (
    <div className="flex gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`}
    >
      <div className="flex gap-3 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </ComponentPreview>
  );
}

export function ButtonDisabledExample() {
  return (
    <ComponentPreview
      title="Désactivé"
      reactCode={`import { Button } from "@/design-system";

export default function Example() {
  return (
    <div className="flex gap-3">
      <Button disabled>Default</Button>
      <Button variant="default" disabled>Default</Button>
      <Button variant="outline" disabled>Outline</Button>
    </div>
  );
}`}
    >
      <div className="flex gap-3">
        <Button variant="default" disabled>Default</Button>
        <Button variant="outline" disabled>Outline</Button>
      </div>
    </ComponentPreview>
  );
}
