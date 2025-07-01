"use client";

import { CheckCircle, Info, XCircle, AlertTriangle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";

const alertVariants = {
  default: "bg-background text-foreground",
  destructive: "text-red-400 [&>svg]:text-red-400 [&_p]:text-red-400",
  success: "text-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 [&_p]:text-green-600 dark:[&_p]:text-green-400",
  warning: "text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400  [&_p]:text-yellow-600 dark:[&_p]:text-yellow-400",
  info: "text-blue-700 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 [&_p]:text-blue-600 dark:[&_p]:text-blue-400",
} as const;

const alertSizes = {
  sm: "p-3 text-sm",
  md: "p-4 text-base",
  lg: "p-6 text-lg",
} as const;

const icons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

type AlertVariant = keyof typeof alertVariants;
type AlertSize = keyof typeof alertSizes;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", size = "md", title, children, onClose, ...props }, ref) => {
    const Icon = icons[variant];

    const showIcon = variant !== "default";

    return (
      <div
        ref={ref}
        role="alert"
        className={twMerge(
          "relative w-full rounded-lg border p-2 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7 bg-white dark:bg-neutral-900 shadow-sm",
          alertVariants[variant],
          alertSizes[size],
          className
        )}
        {...props}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            aria-label="Fermer l'alerte"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {showIcon && <Icon className="h-4 w-4" />}
        {title && (
          <h5 className="mb-1 font-semibold text-sm leading-none tracking-tight">
            {title}
          </h5>
        )}
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400 [&_p]:leading-relaxed [&_p]:m-0 [&_li]:m-0">
          {children}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert"; 