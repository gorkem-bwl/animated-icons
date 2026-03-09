# Animated Icons

![Animated Icons - Lucide, Iconoir, and Heroicons with CSS-only hover animations](assets/hero.gif)

Beautifully animated, two-tone icon libraries with CSS-only hover animations. Currently supports [Lucide](https://lucide.dev) (1,933 icons), [Heroicons](https://heroicons.com) (324 icons), and [Iconoir](https://iconoir.com) (1,383 icons). Zero JavaScript animation dependencies.

**[Live preview](https://animated-icons.vercel.app)**

## Features

- CSS transition-based animations triggered on hover (no Framer Motion, no JS)
- Two-tone color support via CSS custom properties
- 3,640 animated icons across three icon sets
- Multiple output formats: React, Vue, Svelte, Web Components, standalone SVGs
- Accessible: `role="img"`, `aria-label`, and `<title>` on every icon
- Semantic animations per category (bells ring, hearts beat, gears rotate, shields fill)
- Fully visible default state: animations only add effects on hover
- Shared animation engine: adding new icon sets requires only config + category mapping

## Supported icon sets

| Icon set | Icons | Wrapper class |
| -------- | ----- | ------------- |
| Lucide | 1,933 | `al-icon-wrapper` |
| Iconoir | 1,383 | `ai-icon-wrapper` |
| Heroicons | 324 | `ah-icon-wrapper` |

### Output formats

Each icon set is available in 5 formats:

| Format | Directory | Usage |
| ------ | --------- | ----- |
| **React** | `dist/react/` | `import { Heart } from './dist/react'` |
| **Vue** | `dist/vue/` | `import { Heart } from './dist/vue'` |
| **Svelte** | `dist/svelte/` | `import Heart from './dist/svelte/Heart.svelte'` |
| **Web Components** | `dist/web-components/` | `<animated-lucide-heart>` |
| **SVG** | `dist/svg/` | Copy and paste, includes embedded CSS |

## Quick start

### React (Lucide)

```jsx
import { Heart, Bell, Settings } from './animated-lucide-react';

function App() {
  return (
    <div className="al-icon-wrapper">
      <Heart size={24} primaryColor="#0d9488" secondaryColor="#0f766e" />
    </div>
  );
}
```

### React (Heroicons)

```jsx
import { Heart, Envelope } from './animated-heroicons-react';

function App() {
  return (
    <div className="ah-icon-wrapper">
      <Heart size={24} primaryColor="#ef4444" secondaryColor="#dc2626" />
    </div>
  );
}
```

### React (Iconoir)

```jsx
import { Heart, Mail } from './animated-iconoir-react';

function App() {
  return (
    <div className="ai-icon-wrapper">
      <Heart size={24} primaryColor="#ef4444" secondaryColor="#dc2626" />
    </div>
  );
}
```

Wrap the icon (or its parent) with the wrapper class to trigger animations on hover.

### Vue

```vue
<template>
  <div class="al-icon-wrapper">
    <Heart :size="24" primary-color="#0d9488" secondary-color="#0f766e" />
  </div>
</template>

<script setup>
import { Heart, Bell, Settings } from './animated-lucide-vue';
</script>
```

Vue components use `<style scoped>` so animation CSS is automatically included per-component.

### Svelte

```svelte
<script>
  import Heart from './animated-lucide-svelte/Heart.svelte';
</script>

<div class="al-icon-wrapper">
  <Heart size={24} primaryColor="#0d9488" secondaryColor="#0f766e" />
</div>
```

### Web Components

```html
<script type="module">
  import './animated-lucide-wc/Heart.js';
</script>

<div class="al-icon-wrapper">
  <animated-lucide-heart
    size="24"
    color="#0d9488"
    primary-color="#0d9488"
    secondary-color="#0f766e">
  </animated-lucide-heart>
</div>
```

Web Components use Shadow DOM — each icon encapsulates its own styles. No external CSS needed, works in any framework or vanilla HTML.

### SVG

Copy SVGs from `dist/svg/` (Lucide), `dist/heroicons/svg/` (Heroicons), or `dist/iconoir/svg/` (Iconoir) and use them directly:

```html
<div class="al-icon-wrapper">
  <!-- paste contents of dist/svg/heart.svg -->
</div>
```

Each SVG includes its own `<style>` block with all animation CSS, so no external stylesheet is needed.

## Customizing colors

Colors are controlled via CSS custom properties:

```css
/* Lucide */
.my-icons {
  --animated-lucide-primary: #0d9488;
  --animated-lucide-secondary: #0f766e;
}

/* Heroicons */
.my-icons {
  --animated-heroicon-primary: #3b82f6;
  --animated-heroicon-secondary: #2563eb;
}

/* Iconoir */
.my-icons {
  --animated-iconoir-primary: #f59e0b;
  --animated-iconoir-secondary: #d97706;
}
```

Or pass them directly to React components:

```jsx
<Heart primaryColor="#3b82f6" secondaryColor="#2563eb" />
```

### Color presets

| Name   | Primary   | Secondary |
| ------ | --------- | --------- |
| Teal   | `#0d9488` | `#0f766e` |
| Blue   | `#3b82f6` | `#2563eb` |
| Red    | `#ef4444` | `#dc2626` |
| Amber  | `#f59e0b` | `#d97706` |
| Violet | `#8b5cf6` | `#7c3aed` |
| Pink   | `#ec4899` | `#db2777` |

## Hover trigger

Animations trigger on two selectors per icon set:

**Lucide:**
1. `.animated-lucide-icon:hover`
2. `.al-icon-wrapper:hover`

**Heroicons:**
1. `.animated-heroicon:hover`
2. `.ah-icon-wrapper:hover`

**Iconoir:**
1. `.animated-iconoir:hover`
2. `.ai-icon-wrapper:hover`

Wrap icons in buttons, cards, or nav items and the animation triggers when hovering the container:

```html
<button class="al-icon-wrapper">
  <!-- icon animates when button is hovered -->
</button>
```

## Animation types

| Animation    | Effect                                | Used by                              |
| ------------ | ------------------------------------- | ------------------------------------ |
| `fill`       | Shape fills with translucent color    | Shield, folder, file, user head      |
| `fade`       | Pop-in with subtle scale              | Details, secondary elements          |
| `scale-pop`  | Bounce scale                          | Check, x, plus, eye pupil            |
| `spin`       | Full 360 rotation                     | Redo, refresh, loader                |
| `gear`       | Partial rotation                      | Settings, cog, sun, moon             |
| `nudge`      | Translate in a direction              | Arrows, chevrons, truck              |
| `shake`      | Horizontal wobble                     | Send, cart, bars, menu, flag         |
| `bell-ring`  | Pendulum swing from top               | Bell                                 |
| `heart-beat` | Double-pulse scale                    | Heart                                |
| `mail-flap`  | Envelope opens and closes             | Mail, envelope                       |
| `rocket-lift`| Diagonal translate up-right           | Rocket, navigation                   |
| `bar`        | Grow from bottom with bounce          | Bar chart, chart-bar                 |
| `handle-lift`| Lift upward                           | Trash lid                            |
| `page-turn`  | Rotate on Y axis                      | Book pages                           |
| `menu-line`  | Staggered scaleX                      | Hamburger menu (multi-element)       |
| `pulse`      | Opacity pulse                         | Alert indicators, signal, wifi       |
| `dot-appear` | Pop scale on small elements           | Map pin dot                          |

## Component props

All frameworks share the same prop API:

| Prop             | Type     | Default          | Description                     |
| ---------------- | -------- | ---------------- | ------------------------------- |
| `size`           | `number` | `24`             | Width and height in pixels      |
| `color`          | `string` | `'currentColor'` | Stroke color                    |
| `primaryColor`   | `string` | -                | Primary tone color              |
| `secondaryColor` | `string` | -                | Secondary tone color            |
| `strokeWidth`    | `number` | `2` / `1.5`      | SVG stroke width (set-specific) |
| `className`      | `string` | `''`             | Additional CSS classes           |
| `label`          | `string` | icon name        | Accessible label                |

React components forward refs and spread additional props onto the SVG element. Web Components use kebab-case attributes (`primary-color`, `secondary-color`, `stroke-width`).

## Available icons

Browse all 3,640 icons at [animated-icons.vercel.app](https://animated-icons.vercel.app).

## Building from source

```bash
# Install dependencies
npm install

# Build Lucide icons
node scripts/build.mjs

# Build Heroicons
node scripts/build-heroicons.mjs

# Build Iconoir
node scripts/build-iconoir.mjs

# Prepare gallery data (chunks + config)
node scripts/prepare-gallery.mjs

# Run the gallery locally
npm run dev
```

## Project structure

```
animated-icons/
  scripts/
    animation-engine.mjs     # Shared animation engine (strategies, CSS, SVG/React generation)
    icon-set-configs.mjs     # Central config for all icon sets
    build.mjs                # Lucide build (thin wrapper)
    build-heroicons.mjs      # Heroicons build (thin wrapper)
    build-iconoir.mjs        # Iconoir build (thin wrapper)
    prepare-gallery.mjs      # Gallery data preparation (chunks + TS config generation)
  icons/
    heroicons/
      categories.json        # Heroicons category mapping
    iconoir/
      categories.json        # Iconoir category mapping
  src/
    data/
      categories.json        # Lucide category mapping
      icon-set-config.ts     # Auto-generated gallery config (from prepare-gallery)
    components/              # Next.js gallery components
  dist/
    svg/                     # Animated Lucide SVGs
    react/                   # Lucide React components (.jsx)
    vue/                     # Lucide Vue components (.vue)
    svelte/                  # Lucide Svelte components (.svelte)
    web-components/          # Lucide Web Components (.js)
    css/                     # Shared Lucide CSS
    heroicons/               # Same structure for Heroicons
    iconoir/                 # Same structure for Iconoir
```

## Adding a new icon set

1. Add an entry to `scripts/icon-set-configs.mjs` with paths, prefixes, and CSS variable names
2. Create a categories JSON file mapping icons to animation categories
3. Create a thin build script (2 lines: import engine + config, call `buildIconSet`)
4. Add a `build:<name>` script to `package.json`
5. Import the generated metadata in `src/app/page.tsx`
6. Run `prepare-gallery.mjs` to regenerate gallery config

No changes to gallery components are needed.

## How it works

The shared animation engine reads source SVG icons and:

1. Parses individual SVG elements (paths, circles, rects, lines)
2. Classifies each element by its role (container, detail, dot)
3. Assigns animation classes based on the icon's category
4. Handles single-path icons with category-appropriate whole-icon animations
5. Applies staggered delays (80ms increments) for sequential reveals
6. Outputs SVGs with embedded `<style>` blocks, plus React, Vue, Svelte, and Web Components

Animations use CSS transitions and keyframes, triggered by `:hover` on the icon or a parent wrapper class. No JavaScript animation library required.

## License

ISC

Icons based on [Lucide](https://lucide.dev) (ISC License), [Heroicons](https://heroicons.com) (MIT License), and [Iconoir](https://iconoir.com) (MIT License).
