"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function CardDownloadCode() {
  return (
    <DownloadCode
      componentName="Card"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={twMerge(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={twMerge("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge("p-6 pt-0", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";`}
      vueCode={`<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const cardClasses = computed(() => [
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  props.class
].filter(Boolean).join(' '))
</script>`}
    />
  );
}
