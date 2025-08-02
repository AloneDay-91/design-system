"use client";

import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/design-system";

export function AccordionWrapper() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>
            Qu&apos;est-ce que ce design system ?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Un design system moderne et accessible basé sur React et Tailwind CSS,
          conçu pour créer des interfaces utilisateur cohérentes et élégantes.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>
            Comment commencer ?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Consultez le guide &#34;Installation&#34; dans la documentation. Si vous avez déjà
          utilisé des bibliothèques de composants non stylés, vous vous sentirez à l&#39;aise.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>
            Puis-je l&#39;utiliser pour mon projet ?
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Bien sûr ! Ce design system est libre et open source.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
