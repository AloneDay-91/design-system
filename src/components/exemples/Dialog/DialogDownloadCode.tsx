"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function DialogDownloadCode() {
  return (
    <DownloadCode
      componentName="Dialog"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef, createContext, useContext, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

// Context pour gérer l'état du Dialog
const DialogContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ open, defaultOpen = false, onOpenChange, children }: DialogProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [open, onOpenChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleOpenChange]);

  const contextValue = {
    open: isOpen,
    onOpenChange: handleOpenChange
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const context = useContext(DialogContext);

    if (!context) {
      throw new Error("DialogTrigger must be used within a Dialog");
    }

    const { onOpenChange } = context;

    const handleClick = () => {
      onOpenChange(true);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        onClick: handleClick
      });
    }

    return (
      <button
        ref={ref}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  showClose?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, showClose = true, children, ...props }, ref) => {
    const context = useContext(DialogContext);

    if (!context) {
      throw new Error("DialogContent must be used within a Dialog");
    }

    const { open, onOpenChange } = context;

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="fixed inset-0 bg-black/80" 
          onClick={() => onOpenChange(false)}
        />
        <div
          ref={ref}
          className={twMerge(
            "relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
            className
          )}
          {...props}
        >
          {children}
          {showClose && (
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";

export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
);

DialogHeader.displayName = "DialogHeader";

export const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={twMerge("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);

DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={twMerge("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);

DialogDescription.displayName = "DialogDescription";

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
);

DialogFooter.displayName = "DialogFooter";`}
      vueCode={`<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, onMounted, onUnmounted } from 'vue'

interface Props {
  open?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false
})

const emit = defineEmits<{
  'open-change': [open: boolean]
}>()

const dialogState = reactive({
  open: props.open ?? props.defaultOpen,
  onOpenChange: (newOpen: boolean) => {
    if (props.open === undefined) {
      dialogState.open = newOpen
    }
    emit('open-change', newOpen)
  }
})

provide('dialog', dialogState)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && dialogState.open) {
    dialogState.onOpenChange(false)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>`}
    />
  );
}
