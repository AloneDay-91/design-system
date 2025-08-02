"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/TableWrapper";

export function InputPropertiesTable() {
  return (
    <div className="space-y-6">
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
            <TableCell>-</TableCell>
            <TableCell>Valeur par défaut de l&#39;input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">onValueChange</TableCell>
            <TableCell className="font-mono text-sm">(value: string, event: Event) =&gt; void</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Callback appelé quand la valeur change</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">className</TableCell>
            <TableCell className="font-mono text-sm">string | ((state: InputState) =&gt; string)</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Classes CSS ou fonction retournant des classes basées sur l&#39;état</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">type</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell>&quot;text&quot;</TableCell>
            <TableCell>Type de l&#39;input (text, email, password, etc.)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">placeholder</TableCell>
            <TableCell className="font-mono text-sm">string</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Texte d&#39;indication affiché quand l&#39;input est vide</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">disabled</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>Désactive l&#39;input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">readOnly</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>Rend l&#39;input en lecture seule</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-sm">required</TableCell>
            <TableCell className="font-mono text-sm">boolean</TableCell>
            <TableCell>false</TableCell>
            <TableCell>Rend l&#39;input obligatoire</TableCell>
          </TableRow>
        </TableBody>
      </Table>

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
              <TableCell className="font-mono text-sm">data-disabled</TableCell>
              <TableCell>Présent quand l&#39;input est désactivé</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-valid</TableCell>
              <TableCell>Présent quand l&#39;input est dans un état valide</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-invalid</TableCell>
              <TableCell>Présent quand l&#39;input est dans un état invalide</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-dirty</TableCell>
              <TableCell>Présent quand la valeur de l&#39;input a changé</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-touched</TableCell>
              <TableCell>Présent quand l&#39;input a été touché (focus puis blur)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-filled</TableCell>
              <TableCell>Présent quand l&#39;input contient une valeur</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono text-sm">data-focused</TableCell>
              <TableCell>Présent quand l&#39;input a le focus</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
