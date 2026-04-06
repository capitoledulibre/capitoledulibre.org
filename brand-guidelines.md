# Charte Graphique — Capitole du Libre

## Couleurs

### Couleurs principales (orange)

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| Orange CDL | `#d03d00` | rgb(208, 61, 0) | Couleur principale, CTA, liens |
| Orange clair | `#ff6b35` | rgb(255, 107, 53) | Hover, accents secondaires |
| Orange foncé | `#a33000` | rgb(163, 48, 0) | États actifs, ombres |

### Couleurs secondaires

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| Bleu profond | `#1a365d` | rgb(26, 54, 93) | Texte principal, headers |
| Bleu moyen | `#2c5282` | rgb(44, 82, 130) | Texte secondaire, liens |
| Jaune doré | `#f6ad55` | rgb(246, 173, 85) | Highlights, badges |

### Couleurs neutres

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| Gris chaud | `#4a5568` | rgb(74, 85, 104) | Texte corps |
| Gris clair | `#e2e8f0` | rgb(226, 232, 240) | Bordures, fonds |
| Blanc cassé | `#fafafa` | rgb(250, 250, 250) | Fond de page |

---

## Typographie

### Police principale

**Ubuntu** — Sans-serif

- Graisses : 400 (Regular), 500 (Medium), 700 (Bold)
- Usage : Titres, navigation, boutons, CTA
- Source : [Google Fonts](https://fonts.google.com/specimen/Ubuntu)

### Police technique

**Ubuntu Mono** — Monospace

- Graisses : 400, 700
- Usage : Code, données techniques, terminaux
- Source : [Google Fonts](https://fonts.google.com/specimen/Ubuntu+Mono)

### Police alternative (corps de texte)

**Source Sans 3** — Sans-serif

- Graisses : 400, 600
- Usage : Corps de texte long, paragraphes
- Source : [Google Fonts](https://fonts.google.com/specimen/Source+Sans+3)

---

## Variables CSS

```css
:root {
  /* Couleurs principales */
  --cdl-orange: #d03d00;
  --cdl-orange-light: #ff6b35;
  --cdl-orange-dark: #a33000;

  /* Couleurs secondaires */
  --cdl-blue: #1a365d;
  --cdl-blue-light: #2c5282;
  --cdl-gold: #f6ad55;

  /* Neutres */
  --cdl-gray: #4a5568;
  --cdl-gray-light: #e2e8f0;
  --cdl-bg: #fafafa;
}
```

---

## Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        cdl: {
          orange: '#d03d00',
          'orange-light': '#ff6b35',
          'orange-dark': '#a33000',
          blue: '#1a365d',
          'blue-light': '#2c5282',
          gold: '#f6ad55',
        }
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        mono: ['Ubuntu Mono', 'monospace'],
      }
    }
  }
}
```

---

## Utilisation des couleurs

### Contraste et accessibilité

- **Texte sur fond clair** : utiliser `#1a365d` (bleu profond) ou `#4a5568` (gris chaud)
- **Texte sur fond orange** : utiliser `#ffffff` (blanc)
- **Texte sur fond bleu** : utiliser `#ffffff` (blanc) ou `#f6ad55` (jaune doré)

### Associations recommandées

| Contexte | Fond | Texte | Accent |
|----------|------|-------|--------|
| Header | `#1a365d` | `#ffffff` | `#d03d00` |
| Page | `#fafafa` | `#1a365d` | `#d03d00` |
| CTA | `#d03d00` | `#ffffff` | — |
| Badge | `#f6ad55` | `#1a365d` | — |
| Code | `#1a365d` | `#e2e8f0` | `#f6ad55` |

---

## Notes

- L'orange `#d03d00` est la couleur historique du Capitole du Libre
- Le jaune doré fait écho aux couleurs occitanes (croix occitane)
- Privilégier Ubuntu pour garder une cohérence avec l'écosystème du logiciel libre

