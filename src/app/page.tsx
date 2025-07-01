import { Hero195 } from "@/components/hero195";
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
  return (
    <main className="relative max-w-5xl mx-auto w-full">
      {/* Spotlight background */}
      <Spotlight />
      {/* Hero Section */}
      <div className="relative z-10">
        <Hero195
          title={"Lumen/UI"}
          description={"Lumen/UI est un système de design moderne, élégant et réutilisable pour vos applications React et Vue. Accélérez vos développements avec des composants UI cohérents, typés et personnalisables, pensés pour la performance et l'accessibilité."}
          primaryButtonText={"Voir la documentation"}
          primaryButtonUrl={"/docs"}
          secondaryButtonText={"Voir sur GitHub"}
          secondaryButtonUrl={"https://github.com"}
        />
      </div>
    </main>
  );
}
