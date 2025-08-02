"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef, createContext, useContext, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

// Context pour gérer l'état de l'Accordion
const AccordionContext = createContext<{
  value: string[];
  onValueChange: (value: string[]) => void;
  openMultiple: boolean;
  disabled: boolean;
  orientation: "horizontal" | "vertical";
} | null>(null);

// Context pour gérer l'état d'un item individuel
const AccordionItemContext = createContext<{
  value: string;
  open: boolean;
  disabled: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

// Types
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  openMultiple?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export interface AccordionHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  showIcon?: boolean;
}

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  keepMounted?: boolean;
}

// Composant principal Accordion (Root)
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({
    defaultValue = [],
    value,
    onValueChange,
    openMultiple = true,
    disabled = false,
    orientation = "vertical",
    className,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = useCallback((newValue: string[]) => {
      if (disabled) return;

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onValueChange?.(newValue);
    }, [value, onValueChange, disabled]);

    const contextValue = {
      value: currentValue,
      onValueChange: handleValueChange,
      openMultiple,
      disabled,
      orientation
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-orientation={orientation}
          data-disabled={disabled ? "" : undefined}
          className={twMerge(
            "flex flex-col space-y-0",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

// Composant AccordionItem
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, onOpenChange, className, children, ...props }, ref) => {
    const context = useContext(AccordionContext);

    if (!context) {
      throw new Error("AccordionItem must be used within an Accordion");
    }

    const { value: accordionValue, onValueChange, openMultiple, disabled: accordionDisabled } = context;
    const isDisabled = disabled || accordionDisabled;
    const open = accordionValue.includes(value);

    const handleOpenChange = useCallback((newOpen: boolean) => {
      if (isDisabled) return;

      let newValue: string[];

      if (newOpen) {
        if (openMultiple) {
          newValue = [...accordionValue, value];
        } else {
          newValue = [value];
        }
      } else {
        newValue = accordionValue.filter(v => v !== value);
      }

      onValueChange(newValue);
      onOpenChange?.(newOpen);
    }, [value, accordionValue, onValueChange, openMultiple, onOpenChange, isDisabled]);

    const itemContextValue = {
      value,
      open,
      disabled: isDisabled,
      onOpenChange: handleOpenChange
    };

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div
          ref={ref}
          data-open={open ? "" : undefined}
          data-disabled={isDisabled ? "" : undefined}
          className={twMerge(
            "border-b border-border",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

// Composant AccordionHeader
export const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(AccordionItemContext);

    if (!context) {
      throw new Error("AccordionHeader must be used within an AccordionItem");
    }

    const { open, disabled } = context;

    return (
      <h3
        ref={ref}
        data-open={open ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={twMerge("m-0", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

AccordionHeader.displayName = "AccordionHeader";

// Composant AccordionTrigger
export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, showIcon = true, children, ...props }, ref) => {
    const context = useContext(AccordionItemContext);

    if (!context) {
      throw new Error("AccordionTrigger must be used within an AccordionItem");
    }

    const { open, disabled, onOpenChange } = context;

    const handleClick = () => {
      onOpenChange(!open);
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        data-panel-open={open ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={twMerge(
          "group relative flex w-full items-center justify-between gap-4",
          "py-4 px-2 text-left font-medium text-foreground text-lg",
          "transition-colors duration-200",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&[data-panel-open]>svg]:rotate-180",
          "[&>p]:p-0 [&>p]:m-0",
          className
        )}
        {...props}
      >
        {children}
        {showIcon && (
          <ChevronDown
            className="h-4 w-4 shrink-0 transition-transform duration-200"
          />
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

// Composant AccordionPanel
export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ className, keepMounted = false, children, ...props }, ref) => {
    const context = useContext(AccordionItemContext);

    if (!context) {
      throw new Error("AccordionPanel must be used within an AccordionItem");
    }

    const { open, disabled } = context;

    if (!open && !keepMounted) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-open={open ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={twMerge(
          "overflow-hidden text-sm text-muted-foreground",
          "transition-all duration-200 ease-out px-2 py-4",
          open ? "animate-accordion-down" : "animate-accordion-up",
          !open && keepMounted && "hidden",
          className
        )}
        {...props}
      >
        <div className="">
          {children}
        </div>
      </div>
    );
  }
);

AccordionPanel.displayName = "AccordionPanel";

// Export par défaut avec tous les sous-composants
const AccordionNamespace = Object.assign(Accordion, {
  Root: Accordion,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
});

export default AccordionNamespace;
