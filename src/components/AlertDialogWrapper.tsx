"use client";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/design-system';
import type { AlertDialogProps, AlertDialogTriggerProps, AlertDialogContentProps, AlertDialogHeaderProps, AlertDialogTitleProps, AlertDialogDescriptionProps, AlertDialogFooterProps, AlertDialogActionProps, AlertDialogCancelProps } from '@/design-system';

export function AlertDialogWrapper(props: AlertDialogProps) {
  return <AlertDialog {...props} />;
}

export function AlertDialogTriggerWrapper(props: AlertDialogTriggerProps) {
  return <AlertDialogTrigger {...props} />;
}

export function AlertDialogContentWrapper(props: AlertDialogContentProps) {
  return <AlertDialogContent {...props} />;
}

export function AlertDialogHeaderWrapper(props: AlertDialogHeaderProps) {
  return <AlertDialogHeader {...props} />;
}

export function AlertDialogTitleWrapper(props: AlertDialogTitleProps) {
  return <AlertDialogTitle {...props} />;
}

export function AlertDialogDescriptionWrapper(props: AlertDialogDescriptionProps) {
  return <AlertDialogDescription {...props} />;
}

export function AlertDialogFooterWrapper(props: AlertDialogFooterProps) {
  return <AlertDialogFooter {...props} />;
}

export function AlertDialogActionWrapper(props: AlertDialogActionProps) {
  return <AlertDialogAction {...props} />;
}

export function AlertDialogCancelWrapper(props: AlertDialogCancelProps) {
  return <AlertDialogCancel {...props} />;
}
