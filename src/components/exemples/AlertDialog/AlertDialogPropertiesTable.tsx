"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function AlertDialogPropertiesTable() {
  return (
    <>
      <h3>AlertDialog</h3>
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
            <TableCell className="font-mono text-sm">open</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>État ouvert/fermé (mode contrôlé)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">defaultOpen</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">false</TableCell>
            <TableCell>État initial (mode non contrôlé)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">onOpenChange</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Appelée quand l&#39;état change</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">closeOnOutsideClick</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">true</TableCell>
            <TableCell className="px-4 py-2 text-sm">Contrôle si le dialogue peut être fermé en cliquant à l&apos;extérieur</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>AlertDialogAction</h3>
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

      <h3>AlertDialogCancel</h3>
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
