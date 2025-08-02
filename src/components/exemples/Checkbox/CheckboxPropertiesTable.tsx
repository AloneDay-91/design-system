"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function CheckboxPropertiesTable() {
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
          <TableCell className="font-mono text-sm">checked</TableCell>
          <TableCell className="font-mono text-sm">boolean</TableCell>
          <TableCell className="font-mono text-sm">false</TableCell>
          <TableCell>État coché du checkbox</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">disabled</TableCell>
          <TableCell className="font-mono text-sm">boolean</TableCell>
          <TableCell className="font-mono text-sm">false</TableCell>
          <TableCell>Désactive le checkbox</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">onCheckedChange</TableCell>
          <TableCell className="font-mono text-sm">function</TableCell>
          <TableCell className="font-mono text-sm">-</TableCell>
          <TableCell>Appelée quand l&#39;état change</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">className</TableCell>
          <TableCell className="font-mono text-sm">string</TableCell>
          <TableCell className="font-mono text-sm">-</TableCell>
          <TableCell>Classes CSS additionnelles</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-sm">defaultChecked</TableCell>
          <TableCell className="font-mono text-sm">boolean</TableCell>
          <TableCell className="font-mono text-sm">false</TableCell>
          <TableCell className="px-4 py-2 text-sm">Si la checkbox est cochée à l&apos;état initial</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
