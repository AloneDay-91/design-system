"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Avatar, AvatarImage, AvatarFallback } from "@/design-system";

export function AvatarBasicExample() {
  return (
    <ComponentPreview
      title="Avatar de base"
      reactCode={`import { Avatar, AvatarImage, AvatarFallback } from "@/design-system";

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}`}
      vueCode={`<template>
  <Avatar>
    <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>`}
    >
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </ComponentPreview>
  );
}

export function AvatarSizesExample() {
  return (
    <ComponentPreview
      title="Tailles"
      reactCode={`import { Avatar, AvatarImage, AvatarFallback } from "@/design-system";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}`}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" alt={""} />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" alt={""} />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://avatars.githubusercontent.com/u/56214457?v=4" alt={""} />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </div>
    </ComponentPreview>
  );
}

export function AvatarFallbackExample() {
  return (
    <ComponentPreview
      title="Avec fallback"
      reactCode={`import { Avatar, AvatarImage, AvatarFallback } from "@/design-system";

export default function Example() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://image-cassee.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  );
}`}
    >
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://image-cassee.jpg" alt={""} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    </ComponentPreview>
  );
}
