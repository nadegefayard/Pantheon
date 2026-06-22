# Maison Panthéon

Site vitrine d'un traiteur parisien : **boutique traiteur**, **traiteur évènementiel**
et **location de matériel évènementiel**.

Site statique (HTML / CSS / JS), sans dépendance ni build. Il suffit d'ouvrir
`index.html` dans un navigateur.

## Structure

```
index.html   structure et contenu
styles.css   direction artistique (palette, typo, layout, responsive)
script.js    reveal au scroll, menu mobile, formulaire de démo
```

## Direction artistique

Construit avec le cadre [taste-skill](https://github.com/Leonxlnx/taste-skill)
(design éditorial intentionnel plutôt que template générique) :

- **Lecture du brief** : landing éditoriale luxe, traiteur Paris 5e.
- **Réglages** : variance de layout 7, intensité de motion 4, densité 3.
- **Palette** : ivoire chaud + encre + un seul accent grenat (volontairement
  loin du beige + laiton trop vu pour le haut de gamme).
- **Typo** : Cormorant Garamond (titres) + Outfit (texte).
- **Règles respectées** : zéro em-dash, pas de trois cartes identiques
  (rangées éditoriales numérotées), un seul accent, un seul système de radius,
  hero qui tient dans le viewport, contraste WCAG AA, motion respectant
  `prefers-reduced-motion`.

## Personnaliser

- **Photos** : les images sont des substituts (`picsum.photos`). Remplacez les
  URL `src` par vos vraies photos (boutique, plats, réceptions, matériel).
- **Coordonnées** : adresse, téléphone et courriel sont à mettre à jour dans la
  section contact et le pied de page de `index.html`.
- **Formulaire** : actuellement une démo front. Pour recevoir les demandes,
  branchez un service d'envoi (Formspree, Netlify Forms ou un backend).
- **Couleurs / typo** : tout est centralisé dans les variables `:root` de
  `styles.css`.
