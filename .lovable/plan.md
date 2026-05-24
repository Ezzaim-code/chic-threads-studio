
# Plan : Boutique de vêtements en ligne

Shopify a été activé (store : `chic-threads-studio-dciy4`, devise MAD). Voici ce que je vais construire.

## Design

- Style éditorial mode haut de gamme : palette neutre (ivoire/noir/terracotta accent), typographie sérif élégante (titres) + sans-serif moderne (corps), beaucoup d'espace blanc, photos plein cadre.
- Mobile-first, animations subtiles (fade/scroll).

## Pages (routes TanStack séparées)

- `/` — Accueil : hero plein écran, sélection "Nouveautés", catégories (Femme/Homme/Accessoires), bandeau valeurs (livraison, retours), newsletter.
- `/shop` — Catalogue complet avec filtres simples (catégorie, prix).
- `/product/$handle` — Fiche produit : galerie images, sélection variante (taille/couleur), description, bouton "Ajouter au panier".
- `/about` — Histoire de la marque.
- `/contact` — Formulaire + infos.

## Fonctionnalités e-commerce (Shopify Storefront API)

- Récupération des produits réels via l'API Shopify (pas de mock).
- Panier persistant (Zustand + localStorage) avec drawer latéral.
- Création/synchro du panier Shopify via `cartCreate` / `cartLinesAdd` / `cartLinesUpdate` / `cartLinesRemove`.
- Checkout via URL Shopify officielle (ouverture nouvel onglet avec `channel=online_store`).
- Hook `useCartSync` pour nettoyer le panier après commande.

## Composants partagés

- `Header` (logo, nav, icône panier avec badge)
- `Footer`
- `ProductCard`, `ProductGrid`
- `CartDrawer`

## Détails techniques

- Stack : TanStack Start, React 19, Tailwind v4, shadcn/ui, Zustand.
- Tokens design dans `src/styles.css` (oklch).
- SEO : `head()` unique par route.
- Constantes Shopify récupérées via `shopify--get_shop_permanent_domain` et `shopify--get_storefront_token`.

## Note importante

Le store est vide pour l'instant. Après la construction, je vous demanderai de me dire quels produits ajouter (nom, prix, description, image) — je les créerai directement dans Shopify via le chat.
