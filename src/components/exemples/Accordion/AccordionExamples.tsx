"use client";

import { ComponentPreview } from "@/components/ComponentPreview";
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/design-system";

export function AccordionBasicExample() {
  return (
    <ComponentPreview
      title="Accordion de base"
      reactCode={`import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/design-system";

export default function Example() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Est-ce que c&apos;est accessible ?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Oui. Il adhère au standard WAI-ARIA design pattern.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Est-ce que c&apos;est non stylé ?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Oui, il est livré avec des styles par défaut, mais vous pouvez le personnaliser.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`}
    >
      <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionHeader>
            <AccordionTrigger>Est-ce accessible ?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Oui, il respecte les directives WAI-ARIA.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionHeader>
            <AccordionTrigger>Est-ce facile à utiliser ?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Oui, il est intuitif et réactif.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ComponentPreview>
  );
}

export function AccordionSimpleExample() {
  return (
    <ComponentPreview
      title="Accordion simple"
      reactCode={`import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/design-system";

export default function SimpleAccordion() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem value="faq-1">
        <AccordionHeader>
          <AccordionTrigger>Comment ça marche ?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          L'accordion permet d'organiser le contenu en sections pliables.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`}
    >
      <Accordion className="w-full max-w-md">
        <AccordionItem value="faq-1">
          <AccordionHeader>
            <AccordionTrigger>Comment ça marche ?</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            L&apos;accordion permet d&apos;organiser le contenu en sections pliables.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ComponentPreview>
  );
}

export function AccordionExclusiveExample() {
  return (
    <ComponentPreview
      title="Mode exclusif"
      reactCode={`import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/design-system";

export default function ExclusiveAccordion() {
  return (
    <Accordion 
      openMultiple={false} 
      defaultValue={["section-1"]}
      className="w-full max-w-md"
    >
      <AccordionItem value="section-1">
        <AccordionHeader>
          <AccordionTrigger>Section 1</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Seule une section peut être ouverte à la fois.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="section-2">
        <AccordionHeader>
          <AccordionTrigger>Section 2</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Cliquer ici fermera la Section 1.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`}
    >
      <Accordion
        openMultiple={false}
        defaultValue={["section-1"]}
        className="w-full max-w-md"
      >
        <AccordionItem value="section-1">
          <AccordionHeader>
            <AccordionTrigger>Section 1</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Seule une section peut être ouverte à la fois.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="section-2">
          <AccordionHeader>
            <AccordionTrigger>Section 2</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Cliquer ici fermera la Section 1.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ComponentPreview>
  );
}

export function AccordionNoIconExample() {
  return (
    <ComponentPreview
      title="Sans chevron"
      reactCode={`import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/design-system";

export default function NoIconAccordion() {
  return (
    <Accordion defaultValue={["clean"]} className="w-full max-w-md">
      <AccordionItem value="clean">
        <AccordionHeader>
          <AccordionTrigger showIcon={false}>
            Interface épurée
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Aucune icône n'est affichée dans ce mode.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}`}
    >
      <Accordion defaultValue={["clean"]} className="w-full max-w-md">
        <AccordionItem value="clean">
          <AccordionHeader>
            <AccordionTrigger showIcon={false}>Interface épurée</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            Aucune icône n&#39;est affichée dans ce mode.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ComponentPreview>
  );
}
