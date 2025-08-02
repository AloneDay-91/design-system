"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef, createContext, useContext, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

// Context pour gérer l'état du Dialog
const DialogContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

// Types
export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  asChild?: boolean;
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  showClose?: boolean;
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Composant principal Dialog
export const Dialog = ({ open, defaultOpen = false, onOpenChange, children }: DialogProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [open, onOpenChange, setInternalOpen]);

  // Gérer l'échappement avec ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleOpenChange]);

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

Dialog.displayName = "Dialog";

// Composant DialogTrigger
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(DialogContext);

    if (!context) {
      throw new Error("DialogTrigger must be used within a Dialog");
    }

    const { onOpenChange } = context;

    return (
      <button
        ref={ref}
        className={twMerge("", className)}
        onClick={() => onOpenChange(true)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

// Composant DialogContent
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, showClose = true, children, ...props }, ref) => {
    const context = useContext(DialogContext);

    if (!context) {
      throw new Error("DialogContent must be used within a Dialog");
    }

    const { open, onOpenChange } = context;

    if (!open) return null;

    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />

        {/* Content */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={ref}
            className={twMerge(
              "relative w-full max-w-lg bg-background rounded-lg shadow-lg border",
              "animate-in fade-in-0 zoom-in-95 duration-300",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {showClose && (
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </button>
            )}
            {children}
          </div>
        </div>
      </>
    );
  }
);

DialogContent.displayName = "DialogContent";

// Composant DialogHeader
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col space-y-1.5 text-center sm:text-left p-6 pb-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);

DialogHeader.displayName = "DialogHeader";

// Composant DialogTitle
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={twMerge("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  )
);

DialogTitle.displayName = "DialogTitle";

// Composant DialogDescription
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={twMerge("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
);

DialogDescription.displayName = "DialogDescription";

// Composant DialogFooter
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);

DialogFooter.displayName = "DialogFooter";
