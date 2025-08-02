"use client"

import { Form, FormField, FormSubmit, Field } from "@/design-system"
import { useState } from "react"

export function FormWrapper() {
  const [errors, setErrors] = useState({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    // Simulation de validation côté serveur
    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = "Le nom est requis"
    if (!email) newErrors.email = "L'email est requis"
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide"
    }

    setErrors(newErrors)
  }

  return (
    <div className="w-full max-w-md">
      <Form
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
    </div>
  )
}
