"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function ButtonPropertiesTable() {
  return (
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
          <TableCell className="font-mono text-sm">variant</TableCell>
          <TableCell className="font-mono text-sm">&quot;default&quot; | &quot;destructive&quot; | &quot;outline&quot; | &quot;secondary&quot; | &quot;ghost&quot; | &quot;link&quot;</TableCell>
          <TableCell className="font-mono text-sm">&quot;default&quot;</TableCell>
          <TableCell>Style visuel du bouton</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">size</TableCell>
          <TableCell className="font-mono text-sm">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</TableCell>
          <TableCell className="font-mono text-sm">&quot;md&quot;</TableCell>
          <TableCell>Taille du bouton</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">disabled</TableCell>
          <TableCell className="font-mono text-sm">boolean</TableCell>
          <TableCell className="font-mono text-sm">false</TableCell>
          <TableCell>Désactive le bouton</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">className</TableCell>
          <TableCell className="font-mono text-sm">string</TableCell>
          <TableCell className="font-mono text-sm">-</TableCell>
          <TableCell>Classes CSS additionnelles</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
