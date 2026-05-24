import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t mt-24 bg-secondary/40">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="font-serif text-2xl">Maison Luna</div>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">
            Vêtements pensés pour durer. Confectionnés en quantités limitées avec des matières naturelles.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Boutique</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">Tous les articles</Link></li>
            <li><Link to="/about" className="hover:text-accent">Notre histoire</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Nous contacter</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Aide</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Livraison & retours</li>
            <li>Guide des tailles</li>
            <li>Entretien</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 flex justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Maison Luna</span>
          <span>Conçu avec soin.</span>
        </div>
      </div>
    </footer>
  );
}
