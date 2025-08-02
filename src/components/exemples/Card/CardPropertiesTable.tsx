"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function CardPropertiesTable() {
  return (
    <>
      <h3>Card</h3>
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

      <p className="text-sm text-muted-foreground mt-4">
        Les composants CardHeader, CardTitle, CardDescription, CardContent et CardFooter acceptent tous une prop <code>className</code> pour la personnalisation.
      </p>
    </>
  );
}
