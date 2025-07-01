"use client";

import { Alert } from './Alert';
import type { AlertProps } from './Alert';
import { Alert as AlertUI, AlertDescription } from '@/components/ui/alert';

export function AlertWrapper(props: AlertProps) {
  return <Alert {...props} />;
}

export { AlertUI as Alert, AlertDescription }; 