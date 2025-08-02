"use client";

import { twMerge } from "tailwind-merge";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  CSSProperties
} from "react";
import { createPortal } from "react-dom";

// Types
export interface ToastObject<T = Record<string, unknown>> {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  timeout?: number;
  priority?: 'low' | 'high';
  onClose?: () => void;
  onRemove?: () => void;
  actionProps?: React.ComponentPropsWithRef<'button'>;
  data?: T;
  index?: number;
}

export interface ToastManagerOptions {
  title?: string;
  description?: string;
  type?: string;
  timeout?: number;
  priority?: 'low' | 'high';
  onClose?: () => void;
  onRemove?: () => void;
  actionProps?: React.ComponentPropsWithRef<'button'>;
  data?: Record<string, unknown>;
}

export interface ToastManager {
  toasts: ToastObject[];
  add: (options: ToastManagerOptions) => string;
  close: (toastId: string) => void;
  update: (toastId: string, options: Partial<ToastManagerOptions>) => void;
  promise: <T>(promise: Promise<T>, options: {
    loading?: string | ToastManagerOptions;
    success?: string | ((data: T) => string) | ToastManagerOptions;
    error?: string | ((error: Error) => string) | ToastManagerOptions;
  }) => Promise<T>;
}

// Context
const ToastContext = createContext<{
  toasts: ToastObject[];
  limit: number;
  timeout: number;
  addToast: (toast: Omit<ToastObject, 'id'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<ToastObject>) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
} | null>(null);

const ToastRootContext = createContext<ToastObject | null>(null);

// Hooks
export function useToastManager(): ToastManager {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastManager must be used within Toast.Provider');
  }

  const { toasts, addToast, removeToast, updateToast } = context;

  const add = useCallback((options: ToastManagerOptions): string => {
    return addToast(options);
  }, [addToast]);

  const close = useCallback((toastId: string) => {
    removeToast(toastId);
  }, [removeToast]);

  const update = useCallback((toastId: string, options: Partial<ToastManagerOptions>) => {
    updateToast(toastId, options);
  }, [updateToast]);

  const promise = useCallback(<T,>(
    promise: Promise<T>,
    options: {
      loading?: string | ToastManagerOptions;
      success?: string | ((data: T) => string) | ToastManagerOptions;
      error?: string | ((error: Error) => string) | ToastManagerOptions;
    }
  ): Promise<T> => {
    const loadingOptions = typeof options.loading === 'string'
      ? { description: options.loading, type: 'loading' }
      : { ...options.loading, type: 'loading' };

    const toastId = addToast(loadingOptions);

    return promise
      .then((data) => {
        const successOptions = typeof options.success === 'string'
          ? { description: options.success, type: 'success' }
          : typeof options.success === 'function'
          ? { description: options.success(data), type: 'success' }
          : { ...options.success, type: 'success' };

        updateToast(toastId, successOptions);
        return data;
      })
      .catch((error) => {
        const errorOptions = typeof options.error === 'string'
          ? { description: options.error, type: 'error' }
          : typeof options.error === 'function'
          ? { description: options.error(error), type: 'error' }
          : { ...options.error, type: 'error' };

        updateToast(toastId, errorOptions);
        throw error;
      });
  }, [addToast, updateToast]);

  return {
    toasts,
    add,
    close,
    update,
    promise
  };
}

function useToastRoot() {
  const toast = useContext(ToastRootContext);
  if (!toast) {
    throw new Error('Toast components must be used within Toast.Root');
  }
  return toast;
}

// Provider Component
export interface ToastProviderProps {
  children: ReactNode;
  limit?: number;
  timeout?: number;
  toastManager?: ToastManager;
}

export const ToastProvider = ({
  children,
  limit = 3,
  timeout = 5000
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastObject[]>([]);
  const [expanded, setExpanded] = useState(false);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }

    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      toast?.onClose?.();

      const filtered = prev.filter(t => t.id !== id);
      // Reassign indices after removal
      const withIndices = filtered.map((t, index) => ({ ...t, index }));

      // Call onRemove after a delay to allow for exit animations
      setTimeout(() => {
        toast?.onRemove?.();
      }, 500);

      return withIndices;
    });
  }, []);

  const addToast = useCallback((toast: Omit<ToastObject, 'id'>): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastObject = {
      ...toast,
      id,
      timeout: toast.timeout ?? timeout
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      // Assign indices to toasts
      const withIndices = updated.map((t, index) => ({ ...t, index }));

      // Apply limit
      if (withIndices.length > limit) {
        const removed = withIndices.slice(limit);
        removed.forEach(t => {
          const timeoutId = timeoutRefs.current.get(t.id);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutRefs.current.delete(t.id);
          }
          t.onRemove?.();
        });
        return withIndices.slice(0, limit);
      }
      return withIndices;
    });

    // Set auto-dismiss timeout
    if (newToast.timeout && newToast.timeout > 0) {
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, newToast.timeout);
      timeoutRefs.current.set(id, timeoutId);
    }

    return id;
  }, [limit, timeout, removeToast]);

  const updateToast = useCallback((id: string, updates: Partial<ToastObject>) => {
    setToasts(prev => prev.map(toast =>
      toast.id === id ? { ...toast, ...updates } : toast
    ));
  }, []);

  return (
    <ToastContext.Provider value={{
      toasts,
      limit,
      timeout,
      addToast,
      removeToast,
      updateToast,
      expanded,
      setExpanded
    }}>
      {children}
    </ToastContext.Provider>
  );
};

// Portal Component
export interface ToastPortalProps {
  children: ReactNode;
  container?: HTMLElement | null;
}

export const ToastPortal = ({ children, container }: ToastPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalContainer = container || document.body;
  return createPortal(children, portalContainer);
};

// Viewport Component
export interface ToastViewportProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(ToastContext);
    const { expanded, setExpanded } = context || { expanded: false, setExpanded: () => {} };

    return (
      <div
        ref={ref}
        className={twMerge(
          "fixed z-50 flex flex-col gap-2 p-4",
          className
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        data-expanded={expanded || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastViewport.displayName = "ToastViewport";

// Root Component
export interface ToastRootProps extends HTMLAttributes<HTMLDivElement> {
  toast: ToastObject;
  className?: string;
}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(
  ({ toast, className, children, style, ...props }, ref) => {
    const context = useContext(ToastContext);
    const expanded = context?.expanded || false;
    const toastIndex = toast.index || 0;

    // Calculate CSS variables for animations
    const cssVars: CSSProperties = {
      '--toast-index': toastIndex,
      '--toast-offset-y': expanded ? `${toastIndex * -130}px` : `${toastIndex * -15}px`, // Plus d'espace quand expanded (130px au lieu de 75px)
      '--toast-swipe-movement-x': '0px',
      '--toast-swipe-movement-y': '0px',
      '--gap': '1rem',
      '--offset-y': `calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))`,
      ...style
    } as CSSProperties;

    return (
      <ToastRootContext.Provider value={toast}>
        <div
          ref={ref}
          className={twMerge(
            // Base styles
            "absolute right-0 bottom-0 left-auto w-full rounded-lg border border-border bg-background p-4 shadow-lg select-none",
            // Transform and stacking - condition selon l'état expanded
            "z-[calc(1000-var(--toast-index))]",
            expanded
              ? "[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-offset-y))_scale(1)]"
              : "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+calc(min(var(--toast-index),10)*-15px)))_scale(calc(max(0.85,1-(var(--toast-index)*0.05))))]",
            // Transitions
            "transition-all duration-300 ease-out",
            "[transition-property:opacity,transform]",
            // Pseudo elements for gap
            "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
            // Animation states
            "data-[starting-style]:[transform:translateY(150%)]",
            "data-[ending-style]:opacity-0",
            "data-[ending-style]:[&:not([data-limited])]:[transform:translateY(150%)]",
            "data-[limited]:opacity-0",
            // Swipe directions (gardés pour compatibilité)
            "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
            "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
            "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
            "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
            className
          )}
          style={cssVars}
          data-type={toast.type}
          data-expanded={expanded || undefined}
          {...props}
        >
          {children}
        </div>
      </ToastRootContext.Provider>
    );
  }
);

ToastRoot.displayName = "ToastRoot";

// Title Component
export interface ToastTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export const ToastTitle = forwardRef<HTMLHeadingElement, ToastTitleProps>(
  ({ className, children, ...props }, ref) => {
    const toast = useToastRoot();

    return (
      <h2
        ref={ref}
        className={twMerge("text-[0.975rem] leading-5 font-medium", className)}
        data-type={toast.type}
        {...props}
      >
        {children || toast.title}
      </h2>
    );
  }
);

ToastTitle.displayName = "ToastTitle";

// Description Component
export interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const ToastDescription = forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const toast = useToastRoot();

    return (
      <p
        ref={ref}
        className={twMerge("text-[0.925rem] leading-5 text-muted-foreground", className)}
        data-type={toast.type}
        {...props}
      >
        {children || toast.description}
      </p>
    );
  }
);

ToastDescription.displayName = "ToastDescription";

// Action Component
export interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, children, ...props }, ref) => {
    const toast = useToastRoot();
    const actionProps = toast.actionProps || {};

    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        data-type={toast.type}
        {...actionProps}
        {...props}
      >
        {children || actionProps.children}
      </button>
    );
  }
);

ToastAction.displayName = "ToastAction";

// Close Component
export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const toast = useToastRoot();
    const context = useContext(ToastContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      context?.removeToast(toast.id);
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          "absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded border-none bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
          className
        )}
        data-type={toast.type}
        onClick={handleClick}
        aria-label="Close"
        {...props}
      >
        {children || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        )}
      </button>
    );
  }
);

ToastClose.displayName = "ToastClose";

// Create Toast Manager function
export function createToastManager(): ToastManager {
  let toasts: ToastObject[] = [];
  const listeners: ((toasts: ToastObject[]) => void)[] = [];

  const notifyListeners = () => {
    listeners.forEach(listener => listener(toasts));
  };

  const add = (options: ToastManagerOptions): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastObject = { ...options, id };
    toasts = [toast, ...toasts];
    notifyListeners();
    return id;
  };

  const close = (toastId: string) => {
    toasts = toasts.filter(t => t.id !== toastId);
    notifyListeners();
  };

  const update = (toastId: string, options: Partial<ToastManagerOptions>) => {
    toasts = toasts.map(t => t.id === toastId ? { ...t, ...options } : t);
    notifyListeners();
  };

  const promise = <T,>(
    promise: Promise<T>,
    options: {
      loading?: string | ToastManagerOptions;
      success?: string | ((data: T) => string) | ToastManagerOptions;
      error?: string | ((error: Error) => string) | ToastManagerOptions;
    }
  ): Promise<T> => {
    const loadingOptions = typeof options.loading === 'string'
      ? { description: options.loading, type: 'loading' }
      : { ...options.loading, type: 'loading' };

    const toastId = add(loadingOptions);

    return promise
      .then((data) => {
        const successOptions = typeof options.success === 'string'
          ? { description: options.success, type: 'success' }
          : typeof options.success === 'function'
          ? { description: options.success(data), type: 'success' }
          : { ...options.success, type: 'success' };

        update(toastId, successOptions);
        return data;
      })
      .catch((error) => {
        const errorOptions = typeof options.error === 'string'
          ? { description: options.error, type: 'error' }
          : typeof options.error === 'function'
          ? { description: options.error(error), type: 'error' }
          : { ...options.error, type: 'error' };

        update(toastId, errorOptions);
        throw error;
      });
  };

  return {
    get toasts() { return toasts; },
    add,
    close,
    update,
    promise
  };
}

// Export compound component
export const Toast = {
  Provider: ToastProvider,
  Portal: ToastPortal,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
  useToastManager,
  createToastManager
};
