"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";
import Image from "next/image";

// Types
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface AvatarImageProps extends Omit<HTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Composant principal Avatar
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

// Composant AvatarImage
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      className={twMerge("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
);

AvatarImage.displayName = "AvatarImage";

// Composant AvatarFallback
export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium",
        className
      )}
      {...props}
    />
  )
);

AvatarFallback.displayName = "AvatarFallback";
