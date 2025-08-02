"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function AlertDownloadCode() {
  return (
    <DownloadCode
      componentName="Alert"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";

const variants: Record<string, string> = {
  default: "bg-background text-foreground border-border",
  destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-300",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-300",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-300"
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  className?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={twMerge(
          "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

export const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={twMerge("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";`}
      vueCode={`<template>
  <div
    :class="alertClasses"
    role="alert"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const alertClasses = computed(() => {
  const variants = {
    default: 'bg-background text-foreground border-border',
    destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    success: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
    info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
  }

  return [
    'relative w-full rounded-lg border px-4 py-3 text-sm',
    variants[props.variant],
    props.class
  ].filter(Boolean).join(' ')
})
</script>`}
    />
  );
}
