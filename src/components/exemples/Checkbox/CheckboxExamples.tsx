"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Checkbox } from "@/design-system";

export function CheckboxBasicExample() {
  return (
    <ComponentPreview
      title="Checkbox de base"
      reactCode={`import { Checkbox } from "@/design-system";

export default function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accepter les conditions d'utilisation
      </label>
    </div>
  );
}`}
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          J&apos;accepte les termes et conditions
        </label>
      </div>
    </ComponentPreview>
  );
}

export function CheckboxDisabledExample() {
  return (
    <ComponentPreview
      title="Désactivé"
      reactCode={`import { Checkbox } from "@/design-system";

export default function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" disabled />
      <label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Option désactivée
      </label>
    </div>
  );
}`}
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" disabled />
        <label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Option désactivée
        </label>
      </div>
    </ComponentPreview>
  );
}
