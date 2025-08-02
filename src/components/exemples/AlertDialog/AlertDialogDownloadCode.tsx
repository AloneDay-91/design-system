"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function AlertDialogDownloadCode() {
  return (
    <DownloadCode
      componentName="AlertDialog"
      reactCode={`"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef, createContext, useContext, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

// Context pour gérer l'état de l'AlertDialog
const AlertDialogContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const AlertDialog = ({ open, defaultOpen = false, onOpenChange, children }: AlertDialogProps) => {
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

  return (
    <AlertDialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export interface AlertDialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  asChild?: boolean;
}

export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const context = useContext(AlertDialogContext);

    if (!context) {
      throw new Error("AlertDialogTrigger must be used within an AlertDialog");
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

AlertDialogTrigger.displayName = "AlertDialogTrigger";

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(AlertDialogContext);

    if (!context) {
      throw new Error("AlertDialogContent must be used within an AlertDialog");
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
        </div>
      </div>
    );
  }
);

AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  )
);

AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={twMerge("text-lg font-semibold", className)}
      {...props}
    />
  )
);

AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={twMerge("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);

AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
);

AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogAction = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const context = useContext(AlertDialogContext);

    if (!context) {
      throw new Error("AlertDialogAction must be used within an AlertDialog");
    }

    const { onOpenChange } = context;

    const handleClick = () => {
      onOpenChange(false);
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const context = useContext(AlertDialogContext);

    if (!context) {
      throw new Error("AlertDialogCancel must be used within an AlertDialog");
    }

    const { onOpenChange } = context;

    const handleClick = () => {
      onOpenChange(false);
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

AlertDialogCancel.displayName = "AlertDialogCancel";`}
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

const alertDialogState = reactive({
  open: props.open ?? props.defaultOpen,
  onOpenChange: (newOpen: boolean) => {
    if (props.open === undefined) {
      alertDialogState.open = newOpen
    }
    emit('open-change', newOpen)
  }
})

provide('alertDialog', alertDialogState)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && alertDialogState.open) {
    alertDialogState.onOpenChange(false)
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
