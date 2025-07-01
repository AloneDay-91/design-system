"use client";

import { Button } from './Button';
import type { ButtonProps } from './Button';

export function ButtonWrapper(props: ButtonProps) {
  return <Button {...props} />;
} 