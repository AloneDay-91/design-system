"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Types pour la validation
type ValidityState = {
  valid: boolean
  badInput: boolean
  customError: boolean
  patternMismatch: boolean
  rangeOverflow: boolean
  rangeUnderflow: boolean
  stepMismatch: boolean
  tooLong: boolean
  tooShort: boolean
  typeMismatch: boolean
  valueMissing: boolean
}

type FieldValidityState = ValidityState & {
  errors: string[]
}

type ValidationMode = "onBlur" | "onChange"

type FieldState = {
  disabled: boolean
  valid: boolean
  invalid: boolean
  dirty: boolean
  touched: boolean
  filled: boolean
  focused: boolean
  name?: string
  value: unknown
  validity: ValidityState
  errors: string[]
}

// Context pour partager l'état entre les composants
const FieldContext = React.createContext<{
  state: FieldState
  fieldId: string
  controlId: string
  descriptionId: string
  errorId: string
  updateState: (updates: Partial<FieldState>) => void
  setValue: (value: unknown) => void
  validate: () => Promise<void>
} | null>(null)

function useFieldContext() {
  const context = React.useContext(FieldContext)
  if (!context) {
    throw new Error("Field components must be used within Field.Root")
  }
  return context
}

// Utilitaire pour générer des IDs uniques
const useId = () => {
  return React.useId()
}

// Props interfaces
interface FieldRootProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  disabled?: boolean
  invalid?: boolean
  validate?: (value: unknown, formValues: Record<string, unknown>) => string | string[] | Promise<string | string[] | null> | null
  validationMode?: ValidationMode
  validationDebounceTime?: number
  children: React.ReactNode
}

interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

interface FieldControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string | number | string[]
  onValueChange?: (value: string, event: Event) => void
}

interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  match?: boolean | 'valid' | 'badInput' | 'customError' | 'patternMismatch' | 'rangeOverflow' | 'rangeUnderflow' | 'stepMismatch' | 'tooLong' | 'tooShort' | 'typeMismatch' | 'valueMissing'
  children: React.ReactNode
}

interface FieldValidityProps {
  children: (state: FieldValidityState) => React.ReactNode
}

// Composant Root
const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(({
  className,
  children,
  name,
  disabled = false,
  invalid,
  validate,
  validationDebounceTime = 0,
  ...props
}, ref) => {
  const fieldId = useId()
  const controlId = `${fieldId}-control`
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`

  const [state, setState] = React.useState<FieldState>({
    disabled,
    valid: true,
    invalid: false,
    dirty: false,
    touched: false,
    filled: false,
    focused: false,
    name,
    value: "",
    validity: {
      valid: true,
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valueMissing: false,
    },
    errors: []
  })

  // Déclaration de updateState avant son utilisation
  const updateState = React.useCallback((updates: Partial<FieldState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  const validateDebounced = React.useMemo(() => {
    if (validationDebounceTime === 0) {
      return async () => {
        if (validate) {
          const result = await validate(state.value, {})
          const errors = result ? (Array.isArray(result) ? result : [result]) : []
          updateState({
            errors,
            valid: errors.length === 0,
            invalid: errors.length > 0
          })
        }
      }
    }

    let timeoutId: NodeJS.Timeout
    return async () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(async () => {
        if (validate) {
          const result = await validate(state.value, {})
          const errors = result ? (Array.isArray(result) ? result : [result]) : []
          updateState({
            errors,
            valid: errors.length === 0,
            invalid: errors.length > 0
          })
        }
      }, validationDebounceTime)
    }
  }, [validate, state.value, validationDebounceTime, updateState])

  const setValue = React.useCallback((value: unknown) => {
    updateState({
      value,
      dirty: true,
      filled: Boolean(value && String(value).length > 0)
    })
  }, [updateState])

  const validateField = React.useCallback(async () => {
    await validateDebounced()
  }, [validateDebounced])

  // Mettre à jour l'état quand les props changent
  React.useEffect(() => {
    updateState({
      disabled,
      invalid: invalid || false,
      valid: !invalid
    })
  }, [disabled, invalid, updateState])

  const contextValue = React.useMemo(() => ({
    state,
    fieldId,
    controlId,
    descriptionId,
    errorId,
    updateState,
    setValue,
    validate: validateField
  }), [state, fieldId, controlId, descriptionId, errorId, updateState, setValue, validateField])

  return (
    <FieldContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn("flex flex-col space-y-2", className)}
        data-disabled={state.disabled ? "" : undefined}
        data-valid={state.valid ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        data-dirty={state.dirty ? "" : undefined}
        data-touched={state.touched ? "" : undefined}
        data-filled={state.filled ? "" : undefined}
        data-focused={state.focused ? "" : undefined}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  )
})
FieldRoot.displayName = "Field.Root"

// Composant Label
const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(({
  className,
  children,
  ...props
}, ref) => {
  const { state, controlId } = useFieldContext()

  return (
    <label
      ref={ref}
      htmlFor={controlId}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      data-disabled={state.disabled ? "" : undefined}
      data-valid={state.valid ? "" : undefined}
      data-invalid={state.invalid ? "" : undefined}
      data-dirty={state.dirty ? "" : undefined}
      data-touched={state.touched ? "" : undefined}
      data-filled={state.filled ? "" : undefined}
      data-focused={state.focused ? "" : undefined}
      {...props}
    >
      {children}
    </label>
  )
})
FieldLabel.displayName = "Field.Label"

// Composant Control
const FieldControl = React.forwardRef<HTMLInputElement, FieldControlProps>(({
  className,
  defaultValue,
  onValueChange,
  onFocus,
  onBlur,
  onChange,
  ...props
}, ref) => {
  const { state, controlId, updateState, setValue, validate } = useFieldContext()

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    updateState({ focused: true })
    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    updateState({ focused: false, touched: true })
    onBlur?.(event)
    validate()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue(value)
    onChange?.(event)
    onValueChange?.(value, event.nativeEvent)
  }

  return (
    <input
      ref={ref}
      id={controlId}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        state.invalid && "border-destructive focus-visible:ring-destructive",
        className
      )}
      disabled={state.disabled}
      defaultValue={defaultValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      data-disabled={state.disabled ? "" : undefined}
      data-valid={state.valid ? "" : undefined}
      data-invalid={state.invalid ? "" : undefined}
      data-dirty={state.dirty ? "" : undefined}
      data-touched={state.touched ? "" : undefined}
      data-filled={state.filled ? "" : undefined}
      data-focused={state.focused ? "" : undefined}
      {...props}
    />
  )
})
FieldControl.displayName = "Field.Control"

// Composant Description
const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(({
  className,
  children,
  ...props
}, ref) => {
  const { state, descriptionId } = useFieldContext()

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      data-disabled={state.disabled ? "" : undefined}
      data-valid={state.valid ? "" : undefined}
      data-invalid={state.invalid ? "" : undefined}
      data-dirty={state.dirty ? "" : undefined}
      data-touched={state.touched ? "" : undefined}
      data-filled={state.filled ? "" : undefined}
      data-focused={state.focused ? "" : undefined}
      {...props}
    >
      {children}
    </p>
  )
})
FieldDescription.displayName = "Field.Description"

// Composant Error
const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(({
  className,
  children,
  match,
  ...props
}, ref) => {
  const { state, errorId } = useFieldContext()

  const shouldShow = React.useMemo(() => {
    if (match === undefined) return state.invalid && state.errors.length > 0
    if (match === true) return true
    if (match === "valid") return state.valid
    if (typeof match === "string") {
      return state.validity[match as keyof ValidityState]
    }
    return false
  }, [match, state])

  if (!shouldShow) return null

  return (
    <div
      ref={ref}
      id={errorId}
      className={cn("text-sm font-medium text-destructive", className)}
      data-disabled={state.disabled ? "" : undefined}
      data-valid={state.valid ? "" : undefined}
      data-invalid={state.invalid ? "" : undefined}
      data-dirty={state.dirty ? "" : undefined}
      data-touched={state.touched ? "" : undefined}
      data-filled={state.filled ? "" : undefined}
      data-focused={state.focused ? "" : undefined}
      {...props}
    >
      {children}
    </div>
  )
})
FieldError.displayName = "Field.Error"

// Composant Validity
const FieldValidity: React.FC<FieldValidityProps> = ({ children }) => {
  const { state } = useFieldContext()

  const validityState: FieldValidityState = {
    ...state.validity,
    errors: state.errors
  }

  return <>{children(validityState)}</>
}
FieldValidity.displayName = "Field.Validity"

// Export du composant avec ses parties
export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Validity: FieldValidity,
}

// Export des types pour utilisation externe
export type {
  FieldRootProps,
  FieldLabelProps,
  FieldControlProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldValidityProps,
  FieldState,
  FieldValidityState,
  ValidationMode
}
