"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function FieldPropertiesTable() {
  return (
    <>
      <h3>Field.Root</h3>
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
            <TableCell className="font-mono text-sm">name</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Identifie le champ lors de la soumission du formulaire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">disabled</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">false</TableCell>
            <TableCell>Désactive toutes les interactions utilisateur</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">invalid</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Force le champ comme invalide</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">validate</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Fonction de validation personnalisée</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">validationMode</TableCell>
            <TableCell className="font-mono text-sm">&quot;onBlur&quot; | &quot;onChange&quot;</TableCell>
            <TableCell className="font-mono text-sm">&quot;onBlur&quot;</TableCell>
            <TableCell>Détermine quand le champ doit être validé</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">validationDebounceTime</TableCell>
            <TableCell className="font-mono text-sm">number</TableCell>
            <TableCell className="font-mono text-sm">0</TableCell>
            <TableCell>Délai en millisecondes entre les validations onChange</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>Field.Label</h3>
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
            <TableCell className="font-mono text-sm">className</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Classes CSS additionnelles</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>Field.Control</h3>
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
            <TableCell className="font-mono text-sm">defaultValue</TableCell>
            <TableCell className="font-mono text-sm">string | number | string[]</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Valeur par défaut du champ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">onValueChange</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Appelée quand la valeur change</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>Field.Error</h3>
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
            <TableCell className="font-mono text-sm">match</TableCell>
            <TableCell className="font-mono text-sm">boolean | ValidityState</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Détermine quand afficher le message d&apos;erreur</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>Field.Validity</h3>
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
            <TableCell className="font-mono text-sm">children</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Fonction qui reçoit l&apos;état de validité du champ</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
