"use client";

import { Input as DesignSystemInput } from "@/design-system";

// Réexporter Input pour l'utiliser dans mdx-components.tsx
export { Input } from "@/design-system";

export function InputWrapper() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input basique</h3>
        <DesignSystemInput placeholder="Entrez votre nom" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input avec valeur par défaut</h3>
        <DesignSystemInput defaultValue="John Doe" placeholder="Nom" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input désactivé</h3>
        <DesignSystemInput placeholder="Input désactivé" disabled />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input avec type email</h3>
        <DesignSystemInput type="email" placeholder="email@exemple.com" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input avec callback</h3>
        <DesignSystemInput
          placeholder="Tapez quelque chose..."
          onValueChange={(value) => console.log("Valeur:", value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input avec classe personnalisée</h3>
        <DesignSystemInput
          placeholder="Style personnalisé"
          className="border-blue-500 focus-visible:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input avec fonction de classe basée sur l&#39;état</h3>
        <DesignSystemInput
          placeholder="Change de couleur selon l'état"
          className={(state) =>
            `${state.focused ? 'border-green-500 ring-green-500' : ''} 
             ${state.filled ? 'bg-green-50' : ''} 
             ${state.dirty ? 'border-orange-400' : ''}`
          }
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Input avec apostrophe</h3>
        <DesignSystemInput
          placeholder="Échec de l&apos;opération"
          onValueChange={(value) => console.log("Valeur:", value)}
        />
      </div>
    </div>
  );
}
