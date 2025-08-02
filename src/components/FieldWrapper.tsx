"use client"

import { Field } from "@/design-system"

export function FieldWrapper() {
  return (
    <div className="space-y-6">
      <Field.Root className="w-full max-w-sm">
        <Field.Label>Nom</Field.Label>
        <Field.Control
          required
          placeholder="Votre nom complet"
        />
        <Field.Error match="valueMissing">
          Veuillez saisir votre nom
        </Field.Error>
        <Field.Description>
          Visible sur votre profil public
        </Field.Description>
      </Field.Root>
    </div>
  )
}
