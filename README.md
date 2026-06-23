# Maison Panthéon

Site vitrine de **Maison Panthéon** : épicerie de bouche et traiteur.
La boutique (traiteur sur place, fromages & crèmerie, cave & vins, épicerie fine)
et l'événementiel (traiteur de réceptions, location de matériel, photographie).

Site statique (HTML / CSS / JS), sans dépendance ni build. Ouvrez simplement
`index.html` dans un navigateur, ou le fichier autonome `maison-pantheon.html`.

## Structure

```
index.html            structure et contenu
styles.css            direction artistique (terracotta / bleu / crème)
script.js             reveal au scroll, menu mobile, filtre du catalogue, formulaire
maison-pantheon.html  version autonome (tout-en-un) pour ouverture directe
```

## Direction artistique

Construit avec le cadre [taste-skill](https://github.com/Leonxlnx/taste-skill) :

- **Palette** : terracotta + bleu + crème, inspirée de la boutique (terrazzo,
  arches, bois clair).
- **Typo** : Fraunces (titres), Ephesis (script de marque), Outfit (texte).
- **Signature visuelle** : images en arche, rappelant l'architecture du lieu.
- **Règles respectées** : zéro em-dash, palette de marque verrouillée, un seul
  système de radius, hero contenu dans le viewport, contraste WCAG AA, motion
  respectant `prefers-reduced-motion`.

## Sections

Accueil · La Maison · Nos Univers (boutique + événementiel) · Traiteur
(pré-commande et sur place) · Location de matériel (catalogue filtrable) ·
Photographie · La Boutique (adresse, horaires) · Contact.

## À personnaliser

- **Photos** : substituts `picsum.photos`. Remplacez les URL `src` par vos
  vraies photos (boutique, plats, fromages, cave, réceptions, matériel).
- **Adresse de la boutique** : à compléter dans la section « La Boutique ».
- **Coordonnées** : 06 95 32 44 33, pantheon.evenement@gmail.com,
  Instagram @pantheon.evenement (modifiables dans `index.html`).
- **Prix de location** : repris de votre catalogue, ajustables dans la section
  « Location ».
- **Formulaire** : démo front. Pour recevoir les demandes, branchez Formspree,
  Netlify Forms ou un backend.
- **Couleurs / typo** : centralisées dans les variables `:root` de `styles.css`.
