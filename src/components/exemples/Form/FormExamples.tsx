"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Form, FormField, FormDescription, Field, FormSubmit } from "@/design-system";
import { useState } from "react";

export function FormBasicExample() {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Simulation de validation côté serveur
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Le nom est requis";
    if (!email) newErrors.email = "L'email est requis";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    setErrors(newErrors);

    // Simulation d'envoi réussi
    if (Object.keys(newErrors).length === 0) {
      alert('Formulaire envoyé avec succès !');
    }
  };

  return (
    <ComponentPreview
      title="Form de base"
      reactCode={`import { Form, FormField, FormSubmit, Field } from "@/design-system";
import { useState } from "react";

export default function Example() {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');

    const newErrors = {};
    if (!name) newErrors.name = "Le nom est requis";
    if (!email) newErrors.email = "L'email est requis";
    else if (!/^[^@]+@[^@]+\\.[^@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    setErrors(newErrors);
  };

  return (
    <Form 
      className="w-full max-w-md space-y-4"
      errors={errors} 
      onClearErrors={setErrors}
      onSubmit={handleSubmit}
    >
      <FormField name="name">
        <Field.Root name="name">
          <Field.Label>Nom</Field.Label>
          <Field.Control placeholder="Votre nom complet" />
          <Field.Error> </Field.Error>
        </Field.Root>
      </FormField>

      <FormField name="email">
        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" placeholder="votre@email.com" />
          <Field.Error> </Field.Error>
        </Field.Root>
      </FormField>

      <FormSubmit>Envoyer</FormSubmit>
    </Form>
  );
}`}
      vueCode={`<template>
  <Form 
    class="w-full max-w-md space-y-4"
    :errors="errors" 
    @clear-errors="setErrors"
    @submit="handleSubmit"
  >
    <FormField name="name">
      <FieldRoot name="name">
        <FieldLabel>Nom</FieldLabel>
        <FieldControl placeholder="Votre nom complet" />
        <FieldError />
      </FieldRoot>
    </FormField>

    <FormField name="email">
      <FieldRoot name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl type="email" placeholder="votre@email.com" />
        <FieldError />
      </FieldRoot>
    </FormField>

    <FormSubmit>Envoyer</FormSubmit>
  </Form>
</template>

<script setup>
import { Form, FormField, FormSubmit, Field } from "@/design-system";
import { ref } from "vue";

const errors = ref({});

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get('name');
  const email = formData.get('email');

  const newErrors = {};
  if (!name) newErrors.name = "Le nom est requis";
  if (!email) newErrors.email = "L'email est requis";
  
  errors.value = newErrors;
};

const setErrors = (newErrors) => {
  errors.value = newErrors;
};
</script>`}
    >
      <Form
        className="w-full max-w-md space-y-4"
        errors={errors}
        onClearErrors={setErrors}
        onSubmit={handleSubmit}
      >
        <FormField name="name">
          <Field.Root name="name">
            <Field.Label>Nom</Field.Label>
            <Field.Control placeholder="Votre nom complet" />
            <Field.Error> </Field.Error>
          </Field.Root>
        </FormField>

        <FormField name="email">
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" placeholder="votre@email.com" />
            <Field.Error> </Field.Error>
          </Field.Root>
        </FormField>

        <FormSubmit>Envoyer</FormSubmit>
      </Form>
    </ComponentPreview>
  );
}

export function FormWithValidationExample() {
  const [errors, setErrors] = useState({});

  const validateForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url') as string;

    // Simulation d'une réponse serveur
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.endsWith('example.com')) {
        setErrors({ url: 'Le domaine example.com n&apos;est pas autorisé' });
        return;
      }
    } catch {
      setErrors({ url: 'Ceci n&apos;est pas une URL valide' });
      return;
    }

    setErrors({});
    alert('URL validée avec succès !');
  };

  return (
    <ComponentPreview
      title="Form avec validation serveur"
      reactCode={`import { Form, FormField, FormSubmit, Field } from "@/design-system";
import { useState } from "react";

export default function Example() {
  const [errors, setErrors] = useState({});

  const validateForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url');

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.endsWith('example.com')) {
        setErrors({ url: 'Le domaine example.com n\\'est pas autorisé' });
        return;
      }
    } catch {
      setErrors({ url: 'Ceci n\\'est pas une URL valide' });
      return;
    }

    setErrors({});
    alert('URL validée avec succès !');
  };

  return (
    <Form 
      className="w-full max-w-md space-y-4"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={validateForm}
    >
      <FormField name="url">
        <Field.Root name="url">
          <Field.Label>Site web</Field.Label>
          <Field.Control
            type="url"
            placeholder="https://example.com"
            defaultValue="https://example.com"
          />
          <Field.Description>
            Entrez l'URL de votre site web
          </Field.Description>
          <Field.Error />
        </Field.Root>
      </FormField>

      <FormSubmit>Valider l'URL</FormSubmit>
    </Form>
  );
}`}
    >
      <Form
        className="w-full max-w-md space-y-4"
        errors={errors}
        onClearErrors={setErrors}
        onSubmit={validateForm}
      >
        <FormField name="url">
          <Field.Root name="url">
            <Field.Label>Site web</Field.Label>
            <Field.Control
              type="url"
              placeholder="https://example.com"
              defaultValue="https://example.com"
            />
            <Field.Description>
              Entrez l&apos;URL de votre site web
            </Field.Description>
            <Field.Error> </Field.Error>
          </Field.Root>
        </FormField>

        <FormSubmit>Valider l&apos;URL</FormSubmit>
      </Form>
    </ComponentPreview>
  );
}

export function FormComplexExample() {
  const [errors, setErrors] = useState({});

  const handleComplexSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      age: formData.get('age') as string,
      newsletter: formData.get('newsletter') === 'on'
    };

    // Validation complexe
    const newErrors: Record<string, string> = {};

    if (!data.firstName) newErrors.firstName = "Le prénom est requis";
    if (!data.lastName) newErrors.lastName = "Le nom est requis";
    if (!data.email) newErrors.email = "L'email est requis";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!data.age) newErrors.age = "L'âge est requis";
    else if (parseInt(data.age) < 18) {
      newErrors.age = "Vous devez avoir au moins 18 ans";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Inscription réussie pour ${data.firstName} ${data.lastName} !`);
    }
  };

  return (
    <ComponentPreview
      title="Formulaire complexe"
      reactCode={`import { Form, FormField, FormSubmit, FormDescription, Field } from "@/design-system";
import { useState } from "react";

export default function Example() {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      age: formData.get('age'),
      newsletter: formData.get('newsletter') === 'on'
    };

    const newErrors = {};
    if (!data.firstName) newErrors.firstName = "Le prénom est requis";
    if (!data.lastName) newErrors.lastName = "Le nom est requis";
    if (!data.email) newErrors.email = "L'email est requis";
    if (!data.age) newErrors.age = "L'âge est requis";
    else if (parseInt(data.age) < 18) {
      newErrors.age = "Vous devez avoir au moins 18 ans";
    }

    setErrors(newErrors);
  };

  return (
    <Form 
      className="w-full max-w-md space-y-4"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={handleSubmit}
    >
      <FormDescription>
        Remplissez ce formulaire pour créer votre compte
      </FormDescription>

      <div className="grid grid-cols-2 gap-4">
        <FormField name="firstName">
          <Field.Root name="firstName">
            <Field.Label>Prénom</Field.Label>
            <Field.Control placeholder="John" />
            <Field.Error />
          </Field.Root>
        </FormField>

        <FormField name="lastName">
          <Field.Root name="lastName">
            <Field.Label>Nom</Field.Label>
            <Field.Control placeholder="Doe" />
            <Field.Error />
          </Field.Root>
        </FormField>
      </div>

      <FormField name="email">
        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control type="email" placeholder="john@example.com" />
          <Field.Error />
        </Field.Root>
      </FormField>

      <FormField name="age">
        <Field.Root name="age">
          <Field.Label>Âge</Field.Label>
          <Field.Control type="number" placeholder="25" />
          <Field.Error />
        </Field.Root>
      </FormField>

      <FormSubmit>Créer mon compte</FormSubmit>
    </Form>
  );
}`}
    >
      <Form
        className="w-full max-w-md space-y-4"
        errors={errors}
        onClearErrors={setErrors}
        onSubmit={handleComplexSubmit}
      >
        <FormDescription>
          Remplissez ce formulaire pour créer votre compte
        </FormDescription>

        <div className="grid grid-cols-2 gap-4">
          <FormField name="firstName">
            <Field.Root name="firstName">
              <Field.Label>Prénom</Field.Label>
              <Field.Control placeholder="John" />
              <Field.Error> </Field.Error>
            </Field.Root>
          </FormField>

          <FormField name="lastName">
            <Field.Root name="lastName">
              <Field.Label>Nom</Field.Label>
              <Field.Control placeholder="Doe" />
              <Field.Error> </Field.Error>
            </Field.Root>
          </FormField>
        </div>

        <FormField name="email">
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" placeholder="john@example.com" />
            <Field.Error> </Field.Error>
          </Field.Root>
        </FormField>

        <FormField name="age">
          <Field.Root name="age">
            <Field.Label>Âge</Field.Label>
            <Field.Control type="number" placeholder="25" />
            <Field.Error> </Field.Error>
          </Field.Root>
        </FormField>

        <FormSubmit>Créer mon compte</FormSubmit>
      </Form>
    </ComponentPreview>
  );
}
