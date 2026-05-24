import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "";

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-none hover:bg-transparent">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background">
        <SheetHeader className="flex-shrink-0 text-left border-b pb-4">
          <SheetTitle className="font-serif text-2xl">Panier</SheetTitle>
          <SheetDescription className="eyebrow">
            {totalItems === 0 ? "Votre panier est vide" : `${totalItems} article${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                <p className="text-muted-foreground text-sm">Aucun article pour le moment</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4">
                      <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-lg leading-tight truncate">{item.product.node.title}</h4>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.selectedOptions.map((o) => o.value).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm mt-2">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border">
                            <button
                              className="h-7 w-7 flex items-center justify-center hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              className="h-7 w-7 flex items-center justify-center hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" /> Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-6 border-t bg-background">
                <div className="flex justify-between items-baseline">
                  <span className="eyebrow">Total</span>
                  <span className="font-serif text-2xl">{currency} {totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Livraison et taxes calculées au paiement.</p>
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-none h-12 text-xs tracking-[0.2em] uppercase"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Passer au paiement"}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
