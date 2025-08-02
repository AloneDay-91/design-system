"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Field } from "@/design-system";

export function FieldBasicExample() {
  return (
    <ComponentPreview
      title="Field de base"
      reactCode={`import { Field } from "@/design-system";

export default function Example() {
  return (
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
  );
}`}
      vueCode={`<template>
  <FieldRoot class="w-full max-w-sm">
    <FieldLabel>Nom</FieldLabel>
    <FieldControl
      required
      placeholder="Votre nom complet"
    />
    <FieldError match="valueMissing">
      Veuillez saisir votre nom
    </FieldError>
    <FieldDescription>
      Visible sur votre profil public
    </FieldDescription>
  </FieldRoot>
</template>

<script setup>
import { Field } from "@/design-system";
const { Root: FieldRoot, Label: FieldLabel, Control: FieldControl, Error: FieldError, Description: FieldDescription } = Field;
</script>`}
    >
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
    </ComponentPreview>
  );
}

export function FieldValidationExample() {
  return (
    <ComponentPreview
      title="Validation personnalisée"
      reactCode={`import { Field } from "@/design-system";

export default function Example() {
  const validateEmail = (value) => {
    if (!value) return "L'email est requis";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
      return "Format d'email invalide";
    }
    return null;
  };

  return (
    <Field.Root 
      className="w-full max-w-sm"
      validate={validateEmail}
      validationMode="onChange"
    >
      <Field.Label>Email</Field.Label>
      <Field.Control
        type="email"
        placeholder="votre@email.com"
      />
      <Field.Error match={true}>
        <Field.Validity>
          {(validity) => validity.errors[0]}
        </Field.Validity>
      </Field.Error>
      <Field.Description>
        Nous ne partagerons jamais votre email
      </Field.Description>
    </Field.Root>
  );
}`}
    >
      <Field.Root
        className="w-full max-w-sm"
        validate={(value) => {
          if (!value) return "L'email est requis";
          if (!/^[^@]+@[^@]+\.[^@]+$/.test(String(value))) {
            return "Format d'email invalide";
          }
          return null;
        }}
        validationMode="onChange"
      >
        <Field.Label>Email</Field.Label>
        <Field.Control
          type="email"
          placeholder="votre@email.com"
        />
        <Field.Error match={true}>
          <Field.Validity>
            {(validity) => validity.errors[0]}
          </Field.Validity>
        </Field.Error>
        <Field.Description>
          Nous ne partagerons jamais votre email
        </Field.Description>
      </Field.Root>
    </ComponentPreview>
  );
}

export function FieldStatesExample() {
  return (
    <ComponentPreview
      title="États du champ"
      reactCode={`import { Field } from "@/design-system";

export default function Example() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      {/* Champ normal */}
      <Field.Root>
        <Field.Label>Champ normal</Field.Label>
        <Field.Control placeholder="Saisissez du texte" />
      </Field.Root>

      {/* Champ désactivé */}
      <Field.Root disabled>
        <Field.Label>Champ désactivé</Field.Label>
        <Field.Control placeholder="Champ désactivé" />
      </Field.Root>

      {/* Champ avec erreur */}
      <Field.Root invalid>
        <Field.Label>Champ avec erreur</Field.Label>
        <Field.Control placeholder="Valeur invalide" />
        <Field.Error match={true}>
          Ce champ contient une erreur
        </Field.Error>
      </Field.Root>
    </div>
  );
}`}
    >
      <div className="space-y-4 w-full max-w-sm">
        <Field.Root>
          <Field.Label>Champ normal</Field.Label>
          <Field.Control placeholder="Saisissez du texte" />
        </Field.Root>

        <Field.Root disabled>
          <Field.Label>Champ désactivé</Field.Label>
          <Field.Control placeholder="Champ désactivé" />
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Champ avec erreur</Field.Label>
          <Field.Control placeholder="Valeur invalide" />
          <Field.Error match={true}>
            Ce champ contient une erreur
          </Field.Error>
        </Field.Root>
      </div>
    </ComponentPreview>
  );
}
