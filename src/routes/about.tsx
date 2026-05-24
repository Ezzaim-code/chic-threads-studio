import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Notre histoire — Maison Luna" },
      { name: "description", content: "Maison Luna est une marque indépendante qui conçoit des vêtements à porter longtemps." },
      { property: "og:title", content: "Notre histoire — Maison Luna" },
      { property: "og:description", content: "L'histoire d'une marque indépendante de mode lente." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 lg:py-32">
      <p className="eyebrow text-accent mb-4">Notre histoire</p>
      <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">
        Une garde-robe pensée pour traverser le temps.
      </h1>

      <div className="mt-16 space-y-8 text-lg leading-relaxed text-muted-foreground">
        <p>
          Maison Luna est née d'une conviction simple : on s'habille mieux quand on possède moins. Nos pièces sont conçues pour vivre des années, traverser les saisons, et trouver leur place dans une garde-robe que l'on construit avec soin.
        </p>
        <p>
          Chaque collection est produite en quantités limitées dans nos ateliers partenaires, en Europe et en Méditerranée. Nous travaillons les matières naturelles : lin lavé, laine mérinos, coton biologique, soie. Pas de plastique, pas de synthétique caché dans les coutures.
        </p>
        <p>
          Le résultat : des vêtements à la coupe nette, à la palette retenue, qui se patinent et se réparent. Une mode lente, intentionnelle, qui prend soin de celles et ceux qui la portent — et de ce qui l'entoure.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t pt-12">
        {[
          { n: "01", t: "Édition limitée", d: "Petites séries, jamais de surproduction." },
          { n: "02", t: "Matières naturelles", d: "Lin, laine, coton, soie — sourcés avec soin." },
          { n: "03", t: "Ateliers de confiance", d: "Une production transparente et tracée." },
        ].map((v) => (
          <div key={v.n}>
            <p className="eyebrow text-accent mb-3">— {v.n}</p>
            <h3 className="font-serif text-2xl mb-2">{v.t}</h3>
            <p className="text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
