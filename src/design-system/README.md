# Lumen/UI Design System

## Architecture des composants

### 📁 `/src/design-system/` - Composants du Design System
Composants réutilisables de votre design system basés sur Base UI :
- `Button.tsx` - Composant bouton avec variants et tailles
- `index.ts` - Point d'entrée pour tous les exports

**Usage :**
```tsx
import { Button } from '@/design-system';
// ou
import { Button } from '@/design-system/Button';
```

### 📁 `/src/components/` - Composants de documentation
Composants utilisés pour la documentation et le site (shadcn/ui) :
- `ui/` - Composants shadcn/ui
- `*Wrapper.tsx` - Wrappers pour la documentation
- Composants de layout (Header, Sidebar, etc.)

### 📁 `/src/components/ui/` - shadcn/ui
Composants shadcn/ui pour l'interface de documentation uniquement.

## Conventions

1. **Design System** : Utilisez Base UI comme foundation
2. **Documentation** : Utilisez shadcn/ui pour l'interface
3. **Exports** : Tous les composants du design system sont exportés via `/design-system/index.ts`

## Ajouter un nouveau composant

1. Créer le composant dans `/src/design-system/`
2. L'exporter dans `/src/design-system/index.ts`
3. Créer la documentation dans `/src/app/docs/components/`
