"use client";

import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, forwardRef, useState, useCallback } from "react";

export interface InputState {
  disabled: boolean;
  valid: boolean;
  invalid: boolean;
  dirty: boolean;
  touched: boolean;
  filled: boolean;
  focused: boolean;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'className'> {
  defaultValue?: string | number | string[];
  onValueChange?: (value: string, event: Event) => void;
  className?: string | ((state: InputState) => string);
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    defaultValue, 
    onValueChange, 
    className, 
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const [touched, setTouched] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [value, setValue] = useState(defaultValue?.toString() || "");

    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    }, [onFocus]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setTouched(true);
      onBlur?.(event);
    }, [onBlur]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      setDirty(true);
      
      if (onValueChange) {
        onValueChange(newValue, event.nativeEvent);
      }
    }, [onValueChange]);

    const state: InputState = {
      disabled: props.disabled || false,
      valid: props['aria-invalid'] !== true && props['aria-invalid'] !== 'true',
      invalid: props['aria-invalid'] === true || props['aria-invalid'] === 'true',
      dirty,
      touched,
      filled: value.length > 0,
      focused
    };

    const computedClassName = typeof className === 'function' ? className(state) : className;

    return (
      <input
        ref={ref}
        className={twMerge(
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          computedClassName
        )}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-disabled={state.disabled || undefined}
        data-valid={state.valid || undefined}
        data-invalid={state.invalid || undefined}
        data-dirty={state.dirty || undefined}
        data-touched={state.touched || undefined}
        data-filled={state.filled || undefined}
        data-focused={state.focused || undefined}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
