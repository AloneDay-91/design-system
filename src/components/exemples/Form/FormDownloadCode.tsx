"use client";

import { DownloadCode } from "@/components/DownloadCode";

const reactCode = `"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Types pour la gestion des erreurs du formulaire
export type FormErrors = Record<string, string | string[] | undefined>

type FormState = {
  submitting: boolean
  errors: FormErrors
}

// Context pour partager l'état du formulaire avec les champs
const FormContext = React.createContext<{
  state: FormState
  errors: FormErrors
  clearErrors: (errors: FormErrors) => void
} | null>(null)

export function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("Form components must be used within Form")
  }
  return context
}

// Props interface pour le composant Form
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  errors?: FormErrors
  onClearErrors?: (errors: FormErrors) => void
  children: React.ReactNode
}

// Composant Form principal
const Form = React.forwardRef<HTMLFormElement, FormProps>(({
  className,
  children,
  errors = {},
  onClearErrors,
  onSubmit,
  ...props
}, ref) => {
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Clear errors before submission
    onClearErrors?.({})
    
    setSubmitting(true)
    
    try {
      await onSubmit?.(event)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const clearErrors = React.useCallback((newErrors: FormErrors) => {
    onClearErrors?.(newErrors)
  }, [onClearErrors])

  const state: FormState = {
    submitting,
    errors
  }

  const contextValue = React.useMemo(() => ({
    state,
    errors,
    clearErrors
  }), [state, errors, clearErrors])

  return (
    <FormContext.Provider value={contextValue}>
      <form
        ref={ref}
        className={cn("space-y-4", className)}
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
})
Form.displayName = "Form"

// Composant FormField pour intégrer Field avec le contexte Form
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  children: React.ReactNode
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(({
  className,
  name,
  children,
  ...props
}, ref) => {
  const { errors } = useFormContext()
  const fieldError = errors[name]

  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      data-field={name}
      data-invalid={fieldError ? "" : undefined}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Injecter les erreurs dans les composants Field.Error
          if (child.type && typeof child.type === 'object' && 'displayName' in child.type && child.type.displayName === 'Field.Error') {
            return React.cloneElement(child, {
              children: child.props.children || (Array.isArray(fieldError) ? fieldError[0] : fieldError)
            })
          }
        }
        return child
      })}
    </div>
  )
})
FormField.displayName = "Form.Field"

// Composant FormSubmit pour les boutons de soumission
interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(({
  className,
  children,
  disabled,
  ...props
}, ref) => {
  const { state } = useFormContext()

  return (
    <button
      ref={ref}
      type="submit"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
        className
      )}
      disabled={disabled || state.submitting}
      {...props}
    >
      {state.submitting ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Envoi...
        </>
      ) : (
        children
      )}
    </button>
  )
})
FormSubmit.displayName = "Form.Submit"

// Export du composant avec ses parties
export {
  Form,
  FormField,
  FormSubmit,
  useFormContext
}`;

const vueCode = `<template>
  <form
    :class="cn('space-y-4', className)"
    @submit="handleSubmit"
    novalidate
  >
    <slot />
  </form>
</template>

<script setup>
import { ref, reactive, provide, computed } from 'vue';
import { cn } from '@/lib/utils';

// Props
const props = defineProps({
  errors: { type: Object, default: () => ({}) },
  className: String
});

const emit = defineEmits(['clearErrors', 'submit']);

// État du formulaire
const submitting = ref(false);

const state = computed(() => ({
  submitting: submitting.value,
  errors: props.errors
}));

// Méthodes
const handleSubmit = async (event) => {
  // Effacer les erreurs avant soumission
  emit('clearErrors', {});
  
  submitting.value = true;
  
  try {
    emit('submit', event);
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    submitting.value = false;
  }
};

const clearErrors = (newErrors) => {
  emit('clearErrors', newErrors);
};

// Fournir le contexte aux composants enfants
provide('formContext', {
  state,
  errors: props.errors,
  clearErrors
});
</script>`;

export function FormDownloadCode() {
  return (
    <DownloadCode
      componentName="Form"
      reactCode={reactCode}
      vueCode={vueCode}
    />
  );
}
