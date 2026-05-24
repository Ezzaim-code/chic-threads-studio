import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/ProductGrid";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import womenImage from "@/assets/category-women.jpg";
import menImage from "@/assets/category-men.jpg";
import accessoriesImage from "@/assets/category-accessories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Luna — Vêtements intemporels" },
      { name: "description", content: "Découvrez la nouvelle collection Maison Luna : pièces en matières naturelles, confectionnées en quantités limitées." },
      { property: "og:title", content: "Maison Luna — Nouvelle collection" },
      { property: "og:description", content: "Vêtements pensés pour durer, en matières naturelles." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: products = [] } = useQuery({
    queryKey: ["products", "home"],
    queryFn: () => fetchProducts(8),
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative grid md:grid-cols-12 min-h-[80vh] md:min-h-[88vh]">
        <div className="md:col-span-7 relative bg-secondary/40">
          <img
            src={heroImage}
            alt="Collection Maison Luna"
            width={1600}
            height={1200}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-5 flex items-center px-6 md:px-12 lg:px-16 py-16">
          <div className="max-w-md">
            <p className="eyebrow text-accent">Automne / Hiver 26</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mt-6">
              Le silence des matières naturelles.
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Une collection en édition limitée, confectionnée à la main. Lin, laine, soie — pour une garde-robe pensée pour durer.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 mt-10 group"
            >
              <span className="text-xs uppercase tracking-[0.25em] border-b border-foreground pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                Découvrir la collection
              </span>
              <ArrowRight className="h-4 w-4 group-hover:text-accent transition-colors" strokeWidth={1.25} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow text-accent mb-3">Univers</p>
            <h2 className="font-serif text-4xl md:text-5xl">Explorer les catégories</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: womenImage, label: "Femme", caption: "Mailles & coordonnés" },
            { img: menImage, label: "Homme", caption: "Tailoring essentiel" },
            { img: accessoriesImage, label: "Accessoires", caption: "Cuir & soie" },
          ].map((cat) => (
            <Link
              key={cat.label}
              to="/shop"
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={cat.img}
                  alt={cat.label}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-serif text-2xl">{cat.label}</h3>
                <span className="text-xs text-muted-foreground tracking-wider">{cat.caption}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow text-accent mb-3">Nouveautés</p>
            <h2 className="font-serif text-4xl md:text-5xl">La sélection de la saison</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] hover:text-accent">
            Tout voir <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>

      {/* Values */}
      <section className="border-y mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Confection limitée", text: "Chaque pièce est produite en petite série, pour limiter l'invendu." },
            { title: "Matières naturelles", text: "Lin, laine mérinos, coton biologique, soie — sourcés avec soin." },
            { title: "Livraison & retours", text: "Expédition sous 48h. Retours gratuits sous 30 jours." },
          ].map((v) => (
            <div key={v.title}>
              <p className="eyebrow text-accent mb-3">— 0{["1", "2", "3"][["Confection limitée", "Matières naturelles", "Livraison & retours"].indexOf(v.title)]}</p>
              <h3 className="font-serif text-2xl mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="eyebrow text-accent mb-4">Lettre Maison Luna</p>
        <h2 className="font-serif text-4xl md:text-5xl">Recevoir nos nouvelles collections en avant-première.</h2>
        <form className="mt-10 flex max-w-md mx-auto border-b border-foreground">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="flex-1 bg-transparent py-3 outline-none text-sm placeholder:text-muted-foreground"
          />
          <button type="button" className="text-xs uppercase tracking-[0.25em] hover:text-accent transition-colors">
            S'inscrire
          </button>
        </form>
      </section>
    </div>
  );
}
