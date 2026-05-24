import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: node.handle }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Pas d'image</div>
        )}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant}
            className="w-full h-10 rounded-none text-[10px] tracking-[0.2em] uppercase bg-background text-foreground hover:bg-foreground hover:text-background"
          >
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Ajouter au panier"}
          </Button>
        </div>
      </div>
      <div className="pt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg leading-tight">{node.title}</h3>
        <span className="text-sm whitespace-nowrap">{formatPrice(price.amount, price.currencyCode)}</span>
      </div>
    </Link>
  );
}
