import type { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, emptyMessage }: { products: ShopifyProduct[]; emptyMessage?: string }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed">
        <p className="font-serif text-2xl mb-2">Aucun produit pour le moment</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {emptyMessage ?? "La collection arrive bientôt. Les premières pièces seront ajoutées sous peu."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((p) => (
        <ProductCard key={p.node.id} product={p} />
      ))}
    </div>
  );
}
