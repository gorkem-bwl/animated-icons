# Animated Lucide Icons

Beautifully animated, two-tone [Lucide](https://lucide.dev) icons with CSS-only hover animations. Drop-in replacement for `lucide-react` with zero JavaScript animation dependencies.

**[Live preview](https://animated-icons.vercel.app)**

## Features

- CSS transition-based animations triggered on hover (no Framer Motion, no JS)
- Two-tone color support via CSS custom properties
- All 1,951 Lucide icons across 14 categories
- Multiple output formats: React components, standalone SVGs
- Accessible: `role="img"`, `aria-label`, and `<title>` on every icon
- Semantic animations per category (bells ring, hearts beat, gears rotate, shields fill)
- Fully visible default state: animations only add effects on hover, never hide parts of the icon

## Quick start

### React

Copy the components from `dist/react/` into your project:

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

Wrap the icon (or its parent) with the `al-icon-wrapper` class to trigger animations on hover.

### SVG

Copy the SVGs from `dist/svg/` and use them directly in HTML:

```html
<div class="al-icon-wrapper">
  <img src="heart.svg" alt="Heart" />
</div>
```

Or inline them:

```html
<div class="al-icon-wrapper">
  <!-- paste contents of dist/svg/heart.svg -->
</div>
```

Each SVG includes its own `<style>` block with all animation CSS, so no external stylesheet is needed.

## Customizing colors

Colors are controlled via CSS custom properties. Set them on a parent element:

```css
.my-icons {
  --animated-lucide-primary: #0d9488;
  --animated-lucide-secondary: #0f766e;
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

For best results, pick two shades of the same hue that are close together.

## Hover trigger

Animations trigger on two selectors:

1. `.animated-lucide-icon:hover` (hovering the SVG itself)
2. `.al-icon-wrapper:hover` (hovering a parent wrapper)

This means you can wrap icons in buttons, cards, or nav items and the animation triggers when hovering the container:

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
| `gear`       | Partial rotation                      | Settings                             |
| `nudge`      | Translate in a direction              | Arrows, chevrons                     |
| `shake`      | Horizontal wobble                     | Send, shopping cart                  |
| `bell-ring`  | Pendulum swing from top               | Bell                                 |
| `heart-beat` | Double-pulse scale                    | Heart                                |
| `mail-flap`  | Envelope opens and closes             | Mail                                 |
| `rocket-lift`| Diagonal translate up-right           | Rocket, navigation, send             |
| `bar`        | Grow from bottom with bounce          | Bar chart                            |
| `handle-lift`| Lift upward                           | Trash lid                            |
| `page-turn`  | Rotate on Y axis                      | Book pages                           |
| `menu-line`  | Staggered scaleX                      | Hamburger menu                       |
| `pulse`      | Opacity pulse                         | Alert indicators                     |
| `dot-appear` | Pop scale on small elements           | Map pin dot, question mark dot       |

## React component props

| Prop             | Type     | Default          | Description                     |
| ---------------- | -------- | ---------------- | ------------------------------- |
| `size`           | `number` | `24`             | Width and height in pixels      |
| `color`          | `string` | `'currentColor'` | Stroke color                    |
| `primaryColor`   | `string` | -                | Primary tone color              |
| `secondaryColor` | `string` | -                | Secondary tone color            |
| `strokeWidth`    | `number` | `2`              | SVG stroke width                |
| `className`      | `string` | `''`             | Additional CSS classes           |
| `label`          | `string` | icon name        | Accessible label                |

All components forward refs and spread additional props onto the SVG element.

## Available icons

All 1,951 Lucide icons are supported. Browse them at [animated-icons.vercel.app](https://animated-icons.vercel.app).

## Building from source

```bash
# Install dependencies
npm install

# Build animated icons
node scripts/build.mjs

# Prepare gallery data
node scripts/prepare-gallery.mjs

# Run the gallery locally
cd gallery && npm install && npx next dev
```

## Project structure

```
animated-lucide/
  scripts/
    build.mjs              # Animation engine and icon generator
    prepare-gallery.mjs    # Embeds SVG content into gallery data
  src/data/
    categories.json        # Icon categorization and animation mapping
  dist/
    svg/                   # Standalone animated SVG files
    react/                 # React components (JSX)
  gallery/                 # Next.js preview website
```

## How it works

The build script reads Lucide's original SVG icons and:

1. Parses individual SVG elements (paths, circles, rects, lines)
2. Classifies each element by its role (container, detail, dot)
3. Assigns animation classes based on the icon's category
4. Applies staggered delays (80ms increments) for sequential reveals
5. Outputs SVGs with embedded `<style>` blocks and React components

Animations use CSS transitions and keyframes, triggered by `:hover` on the icon or a parent `.al-icon-wrapper`. No JavaScript animation library required.

## License

ISC

Icons based on [Lucide](https://lucide.dev) (ISC License).
