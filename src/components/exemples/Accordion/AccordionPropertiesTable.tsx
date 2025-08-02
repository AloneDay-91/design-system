"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function AccordionPropertiesTable() {
  return (
    <>
      <h3>Accordion (Racine)</h3>
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
            <TableCell className="font-mono text-sm">string[]</TableCell>
            <TableCell className="font-mono text-sm">[]</TableCell>
            <TableCell>Sections ouvertes par défaut</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">value</TableCell>
            <TableCell className="font-mono text-sm">string[]</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Sections ouvertes (mode contrôlé)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">onValueChange</TableCell>
            <TableCell className="font-mono text-sm">function</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Appelée quand l&#39;état change</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">openMultiple</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">true</TableCell>
            <TableCell>Contrôle si l&apos;accordion peut avoir plusieurs sections ouvertes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">disabled</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">false</TableCell>
            <TableCell>Désactive toutes les interactions</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>AccordionItem</h3>
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
            <TableCell className="font-mono text-sm">value</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell className="font-mono text-sm">-</TableCell>
            <TableCell>Identifiant unique (requis)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">disabled</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">false</TableCell>
            <TableCell>Désactive cet élément</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3>AccordionTrigger</h3>
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
            <TableCell className="font-mono text-sm">showIcon</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell className="font-mono text-sm">true</TableCell>
            <TableCell>Si l&apos;icône de chevron doit être affichée</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
