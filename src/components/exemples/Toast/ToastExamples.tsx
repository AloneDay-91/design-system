"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Toast } from "@/design-system";
import { useState } from "react";

export function ToastBasicExample() {
  return (
    <ComponentPreview
      title="Exemple de base"
      reactCode={`import { Toast } from "@/design-system";

function ToastDemo() {
  return (
    <Toast.Provider>
      <ToastButton />
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50 w-80">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastButton() {
  const toastManager = Toast.useToastManager();
  const [count, setCount] = useState(0);

  function createToast() {
    setCount((prev) => prev + 1);
    toastManager.add({
      title: \`Toast \${count + 1} créé\`,
      description: 'Ceci est une notification toast.',
    });
  }

  return (
    <button onClick={createToast}>
      Créer un toast
    </button>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Title />
      <Toast.Description />
      <Toast.Close />
    </Toast.Root>
  ));
}`}
      vueCode={`<template>
  <ToastProvider>
    <ToastButton />
    <ToastPortal>
      <ToastViewport class="fixed bottom-4 right-4 z-50 w-80">
        <ToastList />
      </ToastViewport>
    </ToastPortal>
  </ToastProvider>
</template>

<script setup>
import { Toast } from '@/components/ui/toast.vue'
import { ref } from 'vue'

const count = ref(0)
</script>`}
    >
      <Toast.Provider>
        <ToastBasicButton />
        <Toast.Portal>
          <Toast.Viewport className="fixed bottom-4 right-4 z-50 w-80 max-w-sm">
            <ToastBasicList />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
    </ComponentPreview>
  );
}

function ToastBasicButton() {
  const toastManager = Toast.useToastManager();
  const [count, setCount] = useState(0);

  function createToast() {
    setCount((prev) => prev + 1);
    toastManager.add({
      title: `Toast ${count + 1} créé`,
      description: 'Ceci est une notification toast.',
    });
  }

  return (
    <button
      onClick={createToast}
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
    >
      Créer un toast
    </button>
  );
}

function ToastBasicList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className="group mb-2">
      <Toast.Title />
      <Toast.Description />
      <Toast.Close />
    </Toast.Root>
  ));
}

export function ToastTypesExample() {
  return (
    <ComponentPreview
      title="Types de toast"
      reactCode={`import { Toast } from "@/design-system";

function ToastTypesDemo() {
  const toastManager = Toast.useToastManager();

  const createSuccessToast = () => {
    toastManager.add({
      title: 'Succès',
      description: 'Opération réussie !',
      type: 'success',
    });
  };

  const createErrorToast = () => {
    toastManager.add({
      title: 'Erreur',
      description: 'Une erreur est survenue.',
      type: 'error',
    });
  };

  const createWarningToast = () => {
    toastManager.add({
      title: 'Attention',
      description: 'Vérifiez vos données.',
      type: 'warning',
    });
  };

  return (
    <div className="flex gap-2">
      <button onClick={createSuccessToast}>Succès</button>
      <button onClick={createErrorToast}>Erreur</button>
      <button onClick={createWarningToast}>Attention</button>
    </div>
  );
}`}
      vueCode={`<template>
  <div class="flex gap-2">
    <button @click="createSuccessToast">Succès</button>
    <button @click="createErrorToast">Erreur</button>
    <button @click="createWarningToast">Attention</button>
  </div>
</template>

<script setup>
import { Toast } from '@/components/ui/toast.vue'
</script>`}
    >
      <Toast.Provider>
        <ToastTypesButtons />
        <Toast.Portal>
          <Toast.Viewport className="fixed bottom-4 right-4 z-50 w-80 max-w-sm">
            <ToastTypesList />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
    </ComponentPreview>
  );
}

function ToastTypesButtons() {
  const toastManager = Toast.useToastManager();

  const createSuccessToast = () => {
    toastManager.add({
      title: 'Succès',
      description: 'Opération réussie !',
      type: 'success',
    });
  };

  const createErrorToast = () => {
    toastManager.add({
      title: 'Erreur',
      description: 'Une erreur est survenue.',
      type: 'error',
    });
  };

  const createWarningToast = () => {
    toastManager.add({
      title: 'Attention',
      description: 'Vérifiez vos données.',
      type: 'warning',
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={createSuccessToast}
        className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
      >
        Succès
      </button>
      <button
        onClick={createErrorToast}
        className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
      >
        Erreur
      </button>
      <button
        onClick={createWarningToast}
        className="inline-flex items-center justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700"
      >
        Attention
      </button>
    </div>
  );
}

function ToastTypesList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => {
    const typeClasses = {
      success: 'border-green-200 bg-green-50 text-green-900',
      error: 'border-red-200 bg-red-50 text-red-900',
      warning: 'border-orange-200 bg-orange-50 text-orange-900',
    };

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={`group mb-2 ${typeClasses[toast.type as keyof typeof typeClasses] || ''}`}
      >
        <Toast.Title />
        <Toast.Description />
        <Toast.Close />
      </Toast.Root>
    );
  });
}

export function ToastPromiseExample() {
  return (
    <ComponentPreview
      title="Toast avec Promise"
      reactCode={`import { Toast } from "@/design-system";

function ToastPromiseDemo() {
  const toastManager = Toast.useToastManager();

  function runPromise() {
    toastManager.promise(
      new Promise((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldSucceed) {
            resolve('Opération terminée');
          } else {
            reject(new Error('Échec de l\'opération'));
          }
        }, 2000);
      }),
      {
        loading: 'Chargement...',
        success: (data) => \`Succès: \${data}\`,
        error: (err) => \`Erreur: \${err.message}\`,
      },
    );
  }

  return (
    <button onClick={runPromise}>
      Lancer une promesse
    </button>
  );
}`}
      vueCode={`<template>
  <button @click="runPromise">
    Lancer une promesse
  </button>
</template>

<script setup>
import { Toast } from '@/components/ui/toast.vue'
</script>`}
    >
      <Toast.Provider>
        <ToastPromiseButton />
        <Toast.Portal>
          <Toast.Viewport className="fixed bottom-4 right-4 z-50 w-80 max-w-sm">
            <ToastPromiseList />
          </Toast.Viewport>
        </Toast.Portal>
      </Toast.Provider>
    </ComponentPreview>
  );
}

function ToastPromiseButton() {
  const toastManager = Toast.useToastManager();

  function runPromise() {
    toastManager.promise(
      new Promise((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldSucceed) {
            resolve('Opération terminée');
          } else {
            reject(new Error('Échec de l\'opération'));
          }
        }, 2000);
      }),
      {
        loading: 'Chargement...',
        success: (data) => `Succès: ${data}`,
        error: (err) => `Erreur: ${err.message}`,
      },
    );
  }

  return (
    <button
      onClick={runPromise}
      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      Lancer une promesse
    </button>
  );
}

function ToastPromiseList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => {
    const typeClasses = {
      loading: 'border-blue-200 bg-blue-50 text-blue-900',
      success: 'border-green-200 bg-green-50 text-green-900',
      error: 'border-red-200 bg-red-50 text-red-900',
    };

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={`group mb-2 ${typeClasses[toast.type as keyof typeof typeClasses] || ''}`}
      >
        <Toast.Title />
        <Toast.Description />
        <Toast.Close />
      </Toast.Root>
    );
  });
}
