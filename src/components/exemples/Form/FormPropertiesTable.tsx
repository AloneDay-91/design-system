"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function FormPropertiesTable() {
  return (
    <>
      <h3>Form</h3>
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
            <TableCell className="font-mono text-sm">errors</TableCell>
            <TableCell className="font-mono text-sm">FormErrors</TableCell>
            <TableCell className="font-mono text-sm">{}</TableCell>
            <TableCell>Objet contenant les erreurs du formulaire par nom de champ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">onClearErrors</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Appelée quand les erreurs doivent être effacées</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">onSubmit</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Gestionnaire de soumission du formulaire</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">className</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Classes CSS additionnelles</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>FormField</h3>
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
            <TableCell>Nom du champ correspondant aux erreurs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">className</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Classes CSS additionnelles</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>FormSubmit</h3>
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
            <TableCell className="font-mono text-sm">disabled</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">false</TableCell>
            <TableCell>Désactive le bouton de soumission</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">className</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Classes CSS additionnelles</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>FormMessage</h3>
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

      <h3>FormDescription</h3>
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
    </>
  );
}
