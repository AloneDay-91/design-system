"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";

// Types spécifiques à AlertDialog
export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface AlertDialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface AlertDialogActionProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface AlertDialogCancelProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Composant principal AlertDialog basé sur Base UI
export const AlertDialog = BaseAlertDialog.Root;
AlertDialog.displayName = "AlertDialog";

// AlertDialogTrigger
export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Trigger
      ref={ref}
      className={twMerge("", className)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Trigger>
  )
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

// AlertDialogContent - Wrapper complet avec Portal, Backdrop et Popup
export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <BaseAlertDialog.Popup
        ref={ref}
        className={twMerge(
          "fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg border",
          "transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
          className
        )}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
);
AlertDialogContent.displayName = "AlertDialogContent";

// AlertDialogHeader
export const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  )
);
AlertDialogHeader.displayName = "AlertDialogHeader";

// AlertDialogTitle
export const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Title
      ref={ref}
      className={twMerge("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Title>
  )
);
AlertDialogTitle.displayName = "AlertDialogTitle";

// AlertDialogDescription
export const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Description
      ref={ref}
      className={twMerge("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Description>
  )
);
AlertDialogDescription.displayName = "AlertDialogDescription";

// AlertDialogFooter
export const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);
AlertDialogFooter.displayName = "AlertDialogFooter";

// AlertDialogAction - Bouton d'action principal (souvent destructeur)
export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Close
      ref={ref}
      className={twMerge(
        "inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </BaseAlertDialog.Close>
  )
);
AlertDialogAction.displayName = "AlertDialogAction";

// AlertDialogCancel - Bouton d'annulation
export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Close
      ref={ref}
      className={twMerge(
        "mt-2 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:mt-0 sm:mr-3",
        className
      )}
      {...props}
    >
      {children}
    </BaseAlertDialog.Close>
  )
);
AlertDialogCancel.displayName = "AlertDialogCancel";
