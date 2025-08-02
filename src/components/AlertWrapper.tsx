"use client";

import { Alert, AlertTitle, AlertDescription } from '@/design-system';
import type { AlertProps, AlertTitleProps, AlertDescriptionProps } from '@/design-system';

export function AlertWrapper(props: AlertProps) {
  return <Alert {...props} />;
}

export function AlertTitleWrapper(props: AlertTitleProps) {
  return <AlertTitle {...props} />;
}

export function AlertDescriptionWrapper(props: AlertDescriptionProps) {
  return <AlertDescription {...props} />;
}
