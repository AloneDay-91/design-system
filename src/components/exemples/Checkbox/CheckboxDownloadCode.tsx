"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function CheckboxDownloadCode() {
  return (
    <DownloadCode
      componentName="Checkbox"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";
import { Check } from "lucide-react";

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, disabled = false, onCheckedChange, className, id, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        id={id}
        className={twMerge(
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          checked && "bg-primary text-primary-foreground",
          className
        )}
        data-state={checked ? "checked" : "unchecked"}
        {...props}
      >
        {checked && (
          <Check className="h-4 w-4" />
        )}
      </button>
    );
  }
);

Checkbox.displayName = "Checkbox";`}
      vueCode={`<template>
  <button
    :class="checkboxClasses"
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :disabled="disabled"
    @click="handleClick"
    :data-state="checked ? 'checked' : 'unchecked'"
  >
    <Check v-if="checked" class="h-4 w-4" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-react'

interface Props {
  checked?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false
})

const emit = defineEmits<{
  'checked-change': [checked: boolean]
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('checked-change', !props.checked)
  }
}

const checkboxClasses = computed(() => [
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  props.checked && 'bg-primary text-primary-foreground',
  props.class
].filter(Boolean).join(' '))
</script>`}
    />
  );
}
