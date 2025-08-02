"use client";

import { DownloadCode } from "@/components/DownloadCode";

export function ToastDownloadCode() {
  return (
    <DownloadCode
      componentName="Toast"
      reactCode={`"use client";

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
  forwardRef
} from "react";
import { createPortal } from "react-dom";

// Types
export interface ToastObject<T = any> {
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
} | null>(null);

const ToastRootContext = createContext<ToastObject | null>(null);

// Hook
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

  return { toasts, add, close, update, promise };
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
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addToast = useCallback((toast: Omit<ToastObject, 'id'>): string => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastObject = {
      ...toast,
      id,
      timeout: toast.timeout ?? timeout
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      if (updated.length > limit) {
        const removed = updated.slice(limit);
        removed.forEach(t => {
          const timeoutId = timeoutRefs.current.get(t.id);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutRefs.current.delete(t.id);
          }
          t.onRemove?.();
        });
        return updated.slice(0, limit);
      }
      return updated;
    });

    if (newToast.timeout > 0) {
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, newToast.timeout);
      timeoutRefs.current.set(id, timeoutId);
    }

    return id;
  }, [limit, timeout]);

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
      setTimeout(() => {
        toast?.onRemove?.();
      }, 500);
      
      return filtered;
    });
  }, []);

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
      updateToast
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
    const [expanded, setExpanded] = useState(false);

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

// Root Component
export interface ToastRootProps extends HTMLAttributes<HTMLDivElement> {
  toast: ToastObject;
  swipeDirection?: ('right' | 'left' | 'up' | 'down') | ('right' | 'left' | 'up' | 'down')[];
  className?: string;
}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(
  ({ toast, swipeDirection = ['down', 'right'], className, children, ...props }, ref) => {
    return (
      <ToastRootContext.Provider value={toast}>
        <div
          ref={ref}
          className={twMerge(
            "relative flex w-full flex-col space-y-1 rounded-md border bg-background p-4 shadow-lg",
            "animate-in slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full",
            className
          )}
          data-type={toast.type}
          {...props}
        >
          {children}
        </div>
      </ToastRootContext.Provider>
    );
  }
);

// Title Component
export const ToastTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    const toast = useContext(ToastRootContext);
    
    return (
      <h2
        ref={ref}
        className={twMerge("text-sm font-semibold", className)}
        data-type={toast?.type}
        {...props}
      >
        {children || toast?.title}
      </h2>
    );
  }
);

// Description Component
export const ToastDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const toast = useContext(ToastRootContext);
    
    return (
      <p
        ref={ref}
        className={twMerge("text-sm opacity-90", className)}
        data-type={toast?.type}
        {...props}
      >
        {children || toast?.description}
      </p>
    );
  }
);

// Action Component
export const ToastAction = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const toast = useContext(ToastRootContext);
    const actionProps = toast?.actionProps || {};
    
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        data-type={toast?.type}
        {...actionProps}
        {...props}
      >
        {children || actionProps.children}
      </button>
    );
  }
);

// Close Component
export const ToastClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, onClick, ...props }, ref) => {
    const toast = useContext(ToastRootContext);
    const context = useContext(ToastContext);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (toast) {
        context?.removeToast(toast.id);
      }
    };
    
    return (
      <button
        ref={ref}
        className={twMerge(
          "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
          className
        )}
        data-type={toast?.type}
        onClick={handleClick}
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
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        )}
      </button>
    );
  }
);

// Create Toast Manager function
export function createToastManager(): ToastManager {
  let toasts: ToastObject[] = [];
  let listeners: ((toasts: ToastObject[]) => void)[] = [];

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
};`}
      vueCode={`<template>
  <ToastProvider :limit="limit" :timeout="timeout">
    <slot />
    <Teleport to="body">
      <ToastViewport 
        :class="viewportClass"
        @mouseenter="expanded = true"
        @mouseleave="expanded = false"
        :data-expanded="expanded"
      >
        <ToastRoot
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          :class="getToastClass(toast)"
          @close="removeToast(toast.id)"
        >
          <ToastTitle>{{ toast.title }}</ToastTitle>
          <ToastDescription>{{ toast.description }}</ToastDescription>
          <ToastAction v-if="toast.actionProps" v-bind="toast.actionProps" />
          <ToastClose />
        </ToastRoot>
      </ToastViewport>
    </Teleport>
  </ToastProvider>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'

interface ToastObject {
  id: string
  title?: string
  description?: string
  type?: string
  timeout?: number
  priority?: 'low' | 'high'
  onClose?: () => void
  onRemove?: () => void
  actionProps?: Record<string, any>
  data?: Record<string, unknown>
}

interface Props {
  limit?: number
  timeout?: number
  viewportClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  timeout: 5000,
  viewportClass: 'fixed bottom-4 right-4 z-50 w-80 max-w-sm'
})

const toasts = ref<ToastObject[]>([])
const expanded = ref(false)
const timeouts = ref<Map<string, NodeJS.Timeout>>(new Map())

const addToast = (options: Omit<ToastObject, 'id'>): string => {
  const id = Math.random().toString(36).substring(2, 9)
  const toast: ToastObject = {
    ...options,
    id,
    timeout: options.timeout ?? props.timeout
  }

  toasts.value = [toast, ...toasts.value]

  // Apply limit
  if (toasts.value.length > props.limit) {
    const removed = toasts.value.slice(props.limit)
    removed.forEach(t => {
      const timeoutId = timeouts.value.get(t.id)
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeouts.value.delete(t.id)
      }
      t.onRemove?.()
    })
    toasts.value = toasts.value.slice(0, props.limit)
  }

  // Set auto-dismiss timeout
  if (toast.timeout > 0) {
    const timeoutId = setTimeout(() => {
      removeToast(id)
    }, toast.timeout)
    timeouts.value.set(id, timeoutId)
  }

  return id
}

const removeToast = (id: string) => {
  const timeoutId = timeouts.value.get(id)
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeouts.value.delete(id)
  }

  const toast = toasts.value.find(t => t.id === id)
  toast?.onClose?.()
  
  toasts.value = toasts.value.filter(t => t.id !== id)
  
  setTimeout(() => {
    toast?.onRemove?.()
  }, 500)
}

const updateToast = (id: string, updates: Partial<ToastObject>) => {
  toasts.value = toasts.value.map(toast => 
    toast.id === id ? { ...toast, ...updates } : toast
  )
}

const getToastClass = (toast: ToastObject) => {
  const baseClasses = 'relative flex w-full flex-col space-y-1 rounded-md border bg-background p-4 shadow-lg group mb-2'
  const typeClasses = {
    success: 'border-green-200 bg-green-50 text-green-900',
    error: 'border-red-200 bg-red-50 text-red-900',
    warning: 'border-orange-200 bg-orange-50 text-orange-900',
    loading: 'border-blue-200 bg-blue-50 text-blue-900',
  }
  
  return \`\${baseClasses} \${typeClasses[toast.type as keyof typeof typeClasses] || ''}\`
}

// Provide toast manager
const toastManager = {
  toasts: computed(() => toasts.value),
  add: addToast,
  close: removeToast,
  update: updateToast,
  promise: <T>(promise: Promise<T>, options: {
    loading?: string
    success?: string | ((data: T) => string)
    error?: string | ((error: Error) => string)
  }) => {
    const toastId = addToast({
      description: typeof options.loading === 'string' ? options.loading : 'Chargement...',
      type: 'loading'
    })

    return promise
      .then((data) => {
        const successMessage = typeof options.success === 'string'
          ? options.success
          : typeof options.success === 'function'
          ? options.success(data)
          : 'Succès'
        
        updateToast(toastId, {
          description: successMessage,
          type: 'success'
        })
        return data
      })
      .catch((error) => {
        const errorMessage = typeof options.error === 'string'
          ? options.error
          : typeof options.error === 'function'
          ? options.error(error)
          : 'Erreur'
        
        updateToast(toastId, {
          description: errorMessage,
          type: 'error'
        })
        throw error
      })
  }
}

provide('toastManager', toastManager)

// Export for composable use
export const useToastManager = () => {
  return toastManager
}
</script>`}
    />
  );
}
