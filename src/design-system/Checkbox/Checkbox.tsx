"use client";

import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { Check } from "lucide-react";

// Types
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Composant principal Checkbox basé sur Base UI
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, disabled = false, ...props }, ref) => {
    return (
      <BaseCheckbox.Root
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={twMerge(
          "flex h-4 w-4 items-center justify-center rounded-sm outline-none transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[checked]:border-primary",
          "data-[unchecked]:border data-[unchecked]:border-input data-[unchecked]:bg-background",
          "hover:data-[unchecked]:bg-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <BaseCheckbox.Indicator className="flex text-current data-[unchecked]:hidden">
          <Check className="h-3 w-3" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";
