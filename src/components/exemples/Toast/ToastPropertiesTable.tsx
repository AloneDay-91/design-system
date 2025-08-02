"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function ToastPropertiesTable() {
  return (
    <div className="space-y-8">
      {/* Provider Props */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Toast.Provider</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Propriété</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Défaut</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-sm">limit</TableCell>
              <TableCell className="font-mono text-sm">number</TableCell>
              <TableCell>3</TableCell>
              <TableCell>Nombre maximum de toasts affichés simultanément</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">timeout</TableCell>
              <TableCell className="font-mono text-sm">number</TableCell>
              <TableCell>5000</TableCell>
              <TableCell>Durée par défaut avant fermeture automatique (ms)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">toastManager</TableCell>
              <TableCell className="font-mono text-sm">ToastManager</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Manager global pour les toasts</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">children</TableCell>
              <TableCell className="font-mono text-sm">ReactNode</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Contenu du provider</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Root Props */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Toast.Root</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Propriété</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Défaut</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-sm">toast</TableCell>
              <TableCell className="font-mono text-sm">ToastObject</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Objet toast à rendre (requis)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">swipeDirection</TableCell>
              <TableCell className="font-mono text-sm">&#39;right&#39; | &#39;left&#39; | &#39;up&#39; | &#39;down&#39; | array</TableCell>
              <TableCell>[&#39;down&#39;, &#39;right&#39;]</TableCell>
              <TableCell>Direction(s) de balayage pour fermer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">className</TableCell>
              <TableCell className="font-mono text-sm">string</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Classes CSS personnalisées</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Manager Options */}
      <div>
        <h4 className="text-lg font-semibold mb-3">ToastManager Options</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Propriété</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Défaut</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-sm">title</TableCell>
              <TableCell className="font-mono text-sm">string</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Titre du toast</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">description</TableCell>
              <TableCell className="font-mono text-sm">string</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Description du toast</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">type</TableCell>
              <TableCell className="font-mono text-sm">string</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Type du toast pour le style conditionnel</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">timeout</TableCell>
              <TableCell className="font-mono text-sm">number</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Durée avant fermeture automatique (ms)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">priority</TableCell>
              <TableCell className="font-mono text-sm">&#39;low&#39; | &#39;high&#39;</TableCell>
              <TableCell>&#39;low&#39;</TableCell>
              <TableCell>Priorité d&#39;annonce pour les lecteurs d&#39;écran</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">onClose</TableCell>
              <TableCell className="font-mono text-sm">() =&gt; void</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Callback appelé à la fermeture</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">onRemove</TableCell>
              <TableCell className="font-mono text-sm">() =&gt; void</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Callback appelé après suppression</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">actionProps</TableCell>
              <TableCell className="font-mono text-sm">ButtonProps</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Props pour le bouton d&#39;action</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data</TableCell>
              <TableCell className="font-mono text-sm">Record&lt;string, unknown&gt;</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Données personnalisées attachées au toast</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Data Attributes */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Data Attributes</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Attribut</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-sm">data-type</TableCell>
              <TableCell>Type du toast pour le style conditionnel</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-expanded</TableCell>
              <TableCell>Présent quand les toasts sont étendus dans le viewport</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-limited</TableCell>
              <TableCell>Présent quand le toast a été supprimé par la limite</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-swipe-direction</TableCell>
              <TableCell>Direction du balayage du toast</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-swiping</TableCell>
              <TableCell>Présent pendant le balayage du toast</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-starting-style</TableCell>
              <TableCell>Présent pendant l&#39;animation d&#39;entrée</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-ending-style</TableCell>
              <TableCell>Présent pendant l&#39;animation de sortie</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Manager Methods */}
      <div>
        <h4 className="text-lg font-semibold mb-3">ToastManager Methods</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Méthode</TableHead>
              <TableHead>Signature</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-sm">add</TableCell>
              <TableCell className="font-mono text-sm">(options: ToastManagerOptions) =&gt; string</TableCell>
              <TableCell>Ajoute un toast et retourne son ID</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">close</TableCell>
              <TableCell className="font-mono text-sm">(toastId: string) =&gt; void</TableCell>
              <TableCell>Ferme un toast par son ID</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">update</TableCell>
              <TableCell className="font-mono text-sm">(toastId: string, options: Partial&lt;ToastManagerOptions&gt;) =&gt; void</TableCell>
              <TableCell>Met à jour un toast existant</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">promise</TableCell>
              <TableCell className="font-mono text-sm">&lt;T&gt;(promise: Promise&lt;T&gt;, options) =&gt; Promise&lt;T&gt;</TableCell>
              <TableCell>Crée un toast qui suit une promesse</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
