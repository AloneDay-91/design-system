"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function AlertPropertiesTable() {
  return (
    <>
      <h3>Alert</h3>
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
            <TableCell className="font-mono text-sm">&quot;default&quot; | &quot;destructive&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;info&quot;</TableCell>
            <TableCell className="font-mono text-sm">&quot;default&quot;</TableCell>
            <TableCell className="px-4 py-2 text-sm">Variante de l&apos;alerte</TableCell>
          </TableRow>
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
