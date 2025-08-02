"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/design-system';
import type { DialogProps, DialogTriggerProps, DialogContentProps, DialogHeaderProps, DialogTitleProps, DialogDescriptionProps, DialogFooterProps } from '@/design-system';

export function DialogWrapper(props: DialogProps) {
  return <Dialog {...props} />;
}

export function DialogTriggerWrapper(props: DialogTriggerProps) {
  return <DialogTrigger {...props} />;
}

export function DialogContentWrapper(props: DialogContentProps) {
  return <DialogContent {...props} />;
}

export function DialogHeaderWrapper(props: DialogHeaderProps) {
  return <DialogHeader {...props} />;
}

export function DialogTitleWrapper(props: DialogTitleProps) {
  return <DialogTitle {...props} />;
}

export function DialogDescriptionWrapper(props: DialogDescriptionProps) {
  return <DialogDescription {...props} />;
}

export function DialogFooterWrapper(props: DialogFooterProps) {
  return <DialogFooter {...props} />;
}
