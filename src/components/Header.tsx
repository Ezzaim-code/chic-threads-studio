import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/shop", label: "Boutique" },
  { to: "/about", label: "Histoire" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-none hover:bg-transparent"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-5 w-5" strokeWidth={1.25} />
        </Button>

        <nav className="hidden md:flex items-center gap-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs uppercase tracking-[0.2em] hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="font-serif text-2xl tracking-tight absolute left-1/2 -translate-x-1/2">
          MAISON&nbsp;LUNA
        </Link>

        <div className="flex items-center gap-1 flex-1 justify-end">
          <Button variant="ghost" size="icon" className="rounded-none hover:bg-transparent hidden sm:inline-flex">
            <Search className="h-5 w-5" strokeWidth={1.25} />
          </Button>
          <CartDrawer />
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.2em]"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
