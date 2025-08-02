"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function AvatarDownloadCode() {
  return (
    <DownloadCode
      componentName="Avatar"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
);

Avatar.displayName = "Avatar";

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={twMerge("aspect-square h-full w-full", className)}
      {...props}
    />
  )
);

AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
);

AvatarFallback.displayName = "AvatarFallback";`}
      vueCode={`<template>
  <div :class="avatarClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const avatarClasses = computed(() => [
  'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
  props.class
].filter(Boolean).join(' '))
</script>`}
    />
  );
}
