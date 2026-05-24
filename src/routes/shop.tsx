import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/ProductGrid";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Boutique — Maison Luna" },
      { name: "description", content: "Découvrez toutes les pièces de la collection Maison Luna." },
      { property: "og:title", content: "Boutique — Maison Luna" },
      { property: "og:description", content: "L'intégralité de la collection en cours." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "shop"],
    queryFn: () => fetchProducts(50),
  });

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <header className="max-w-2xl mb-16">
        <p className="eyebrow text-accent mb-4">La collection</p>
        <h1 className="font-serif text-5xl md:text-6xl">Toutes les pièces</h1>
        <p className="mt-6 text-muted-foreground">
          Pensées pour traverser les saisons. Coupes nettes, matières nobles, palette retenue.
        </p>
      </header>

      {isLoading ? (
        <div className="py-24 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
