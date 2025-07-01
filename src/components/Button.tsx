"use client";

import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

const variants: Record<string, string> = {
  default: "font-sm text-black dark:text-white font-normal",
  primary: "bg-black dark:bg-white text-white dark:text-black",
  secondary: "bg-gray-200 text-gray-800 dark:text-black",
  ghost: "hover:bg-gray-300/20",
  outline: "text-black border",
  link: "!bg-transparent"
};

const sizes: Record<string, string> = {
  sm: "text-sm py-1.5 px-2.5 rounded",
  md: "text-base py-1.5 px-3.5 rounded-md",
  link: "m-0 p-0"
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "font-medium cursor-pointer",
        variants.default,
        variant !== "default" ? variants[variant] : "",
        sizes[size],
        className
      )}
      {...props}
    />
  );
}