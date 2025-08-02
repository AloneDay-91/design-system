"use client";

import { Avatar, AvatarImage, AvatarFallback } from '@/design-system';
import type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from '@/design-system';

export function AvatarWrapper(props: AvatarProps) {
  return <Avatar {...props} />;
}

export function AvatarImageWrapper(props: AvatarImageProps) {
  return <AvatarImage {...props} />;
}

export function AvatarFallbackWrapper(props: AvatarFallbackProps) {
  return <AvatarFallback {...props} />;
}
