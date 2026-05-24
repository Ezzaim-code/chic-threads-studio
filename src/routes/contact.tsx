import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Luna" },
      { name: "description", content: "Contactez Maison Luna pour toute question sur nos collections, commandes ou collaborations." },
      { property: "og:title", content: "Contact — Maison Luna" },
      { property: "og:description", content: "Une question ? Notre équipe vous répond." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message envoyé", { description: "Nous vous répondrons sous 48 heures." });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 lg:gap-24">
      <div>
        <p className="eyebrow text-accent mb-4">Nous écrire</p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05]">
          Une question, une idée, un projet ?
        </h1>
        <p className="mt-6 text-muted-foreground">
          Notre équipe lit chaque message et répond sous 48 heures ouvrées.
        </p>

        <div className="mt-12 space-y-6 text-sm">
          <div>
            <p className="eyebrow mb-2">E-mail</p>
            <p>bonjour@maisonluna.com</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Atelier</p>
            <p>12 rue des Tisserands<br />75003 Paris, France</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Horaires</p>
            <p>Lundi — Vendredi, 10h–18h</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="eyebrow block mb-2">Nom</label>
          <input
            required
            type="text"
            className="w-full bg-transparent border-b border-foreground py-3 outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">E-mail</label>
          <input
            required
            type="email"
            className="w-full bg-transparent border-b border-foreground py-3 outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">Sujet</label>
          <input
            type="text"
            className="w-full bg-transparent border-b border-foreground py-3 outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="eyebrow block mb-2">Message</label>
          <textarea
            required
            rows={5}
            className="w-full bg-transparent border-b border-foreground py-3 outline-none focus:border-accent transition-colors resize-none"
          />
        </div>
        <Button
          type="submit"
          disabled={sent}
          className="w-full md:w-auto px-12 h-12 rounded-none text-xs tracking-[0.25em] uppercase"
        >
          {sent ? "Message envoyé" : "Envoyer"}
        </Button>
      </form>
    </div>
  );
}
