import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — Maison Luna` },
      { name: "description", content: "Découvrez cette pièce de la collection Maison Luna." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const { data: product, isLoading: queryLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeImage, setActiveImage] = useState(0);

  const variants = product?.node.variants.edges ?? [];
  const options = product?.node.options ?? [];

  // initialize default options from first variant
  useMemo(() => {
    if (variants.length && Object.keys(selectedOptions).length === 0) {
      const first = variants[0].node;
      const init: Record<string, string> = {};
      first.selectedOptions.forEach((o) => (init[o.name] = o.value));
      setSelectedOptions(init);
    }
  }, [variants, selectedOptions]);

  const selectedVariant = variants.find((v) =>
    v.node.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
  )?.node;

  if (queryLoading) {
    return (
      <div className="py-32 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    throw notFound();
  }

  const node = product.node;
  const images = node.images.edges;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground mb-10">
        <ChevronLeft className="h-4 w-4" strokeWidth={1.25} /> Boutique
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            {images[activeImage] ? (
              <img
                src={images[activeImage].node.url}
                alt={images[activeImage].node.altText || node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Pas d'image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden bg-muted ${i === activeImage ? "ring-1 ring-foreground" : "opacity-70 hover:opacity-100"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:pt-8 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-accent mb-4">Maison Luna</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">{node.title}</h1>
          <p className="mt-4 text-xl">
            {selectedVariant
              ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
              : formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
          </p>

          {node.description && (
            <p className="mt-8 text-muted-foreground leading-relaxed whitespace-pre-line">
              {node.description}
            </p>
          )}

          <div className="mt-10 space-y-6">
            {options
              .filter((o) => !(o.values.length === 1 && o.values[0] === "Default Title"))
              .map((opt) => (
                <div key={opt.name}>
                  <p className="eyebrow mb-3">{opt.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      const isActive = selectedOptions[opt.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => setSelectedOptions((s) => ({ ...s, [opt.name]: val }))}
                          className={`px-4 h-10 border text-sm transition-colors ${
                            isActive
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>

          <Button
            onClick={handleAdd}
            disabled={isLoading || !selectedVariant || !selectedVariant.availableForSale}
            className="mt-10 w-full h-14 rounded-none text-xs tracking-[0.25em] uppercase"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : !selectedVariant?.availableForSale ? (
              "Épuisé"
            ) : (
              "Ajouter au panier"
            )}
          </Button>

          <div className="mt-10 pt-8 border-t space-y-3 text-sm text-muted-foreground">
            <p>Expédition sous 48 heures.</p>
            <p>Retours gratuits sous 30 jours.</p>
            <p>Confection en édition limitée.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
