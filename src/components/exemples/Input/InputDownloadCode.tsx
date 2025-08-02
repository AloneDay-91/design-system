"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function InputDownloadCode() {
  return (
    <DownloadCode
      componentName="Input"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, forwardRef, useState, useCallback } from "react";

export interface InputState {
  disabled: boolean;
  valid: boolean;
  invalid: boolean;
  dirty: boolean;
  touched: boolean;
  filled: boolean;
  focused: boolean;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'className'> {
  defaultValue?: string | number | string[];
  onValueChange?: (value: string, event: Event) => void;
  className?: string | ((state: InputState) => string);
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    defaultValue, 
    onValueChange, 
    className, 
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [value, setValue] = useState(defaultValue?.toString() || "");

    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    }, [onFocus]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setTouched(true);
      onBlur?.(event);
    }, [onBlur]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      setDirty(true);
      
      if (onValueChange) {
        onValueChange(newValue, event.nativeEvent);
      }
    }, [onValueChange]);

    const state: InputState = {
      disabled: props.disabled || false,
      valid: props['aria-invalid'] !== true && props['aria-invalid'] !== 'true',
      invalid: props['aria-invalid'] === true || props['aria-invalid'] === 'true',
      dirty,
      touched,
      filled: value.length > 0,
      focused
    };

    const computedClassName = typeof className === 'function' ? className(state) : className;

    return (
      <input
        ref={ref}
        className={twMerge(
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          computedClassName
        )}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-disabled={state.disabled || undefined}
        data-valid={state.valid || undefined}
        data-invalid={state.invalid || undefined}
        data-dirty={state.dirty || undefined}
        data-touched={state.touched || undefined}
        data-filled={state.filled || undefined}
        data-focused={state.focused || undefined}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";`}
      vueCode={`<template>
  <input
    :value="value"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur"
    :class="computedClassName"
    :disabled="disabled"
    :readonly="readOnly"
    :required="required"
    :placeholder="placeholder"
    :type="type"
    :data-disabled="disabled || undefined"
    :data-valid="valid || undefined"
    :data-invalid="invalid || undefined"
    :data-dirty="dirty || undefined"
    :data-touched="touched || undefined"
    :data-filled="filled || undefined"
    :data-focused="focused || undefined"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface InputState {
  disabled: boolean
  valid: boolean
  invalid: boolean
  dirty: boolean
  touched: boolean
  filled: boolean
  focused: boolean
}

interface Props {
  defaultValue?: string | number | string[]
  className?: string | ((state: InputState) => string)
  type?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readOnly: false,
  required: false
})

const emit = defineEmits<{
  valueChange: [value: string, event: Event]
}>()

const focused = ref(false)
const touched = ref(false)
const dirty = ref(false)
const value = ref(props.defaultValue?.toString() || '')

const state = computed<InputState>(() => ({
  disabled: props.disabled,
  valid: true,
  invalid: false,
  dirty: dirty.value,
  touched: touched.value,
  filled: value.value.length > 0,
  focused: focused.value
}))

const computedClassName = computed(() => {
  const baseClasses = 'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  if (typeof props.className === 'function') {
    return \`\${baseClasses} \${props.className(state.value)}\`
  }
  
  return \`\${baseClasses} \${props.className || ''}\`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  value.value = target.value
  dirty.value = true
  emit('valueChange', target.value, event)
}

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
  touched.value = true
}
</script>`}
    />
  );
}
