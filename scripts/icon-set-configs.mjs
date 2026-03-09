/**
 * Icon Set Configurations
 *
 * Central config for all icon sets. Used by build scripts, prepare-gallery,
 * and generates the gallery config file.
 *
 * To add a new icon set:
 * 1. Add an entry here
 * 2. Create a categories JSON file at categoriesFile path
 * 3. Add a thin build script: `import { buildIconSet } from './animation-engine.mjs'; ...`
 * 4. Add a `build:<name>` script to package.json
 * 5. Import the meta JSON in page.tsx
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

export const iconSetConfigs = {
  lucide: {
    name: 'lucide',
    label: 'Lucide',

    // CSS/animation config
    cssPrefix: 'al',
    svgClassName: 'animated-lucide-icon',
    wrapperClass: 'al-icon-wrapper',
    primaryVar: '--animated-lucide-primary',
    secondaryVar: '--animated-lucide-secondary',
    shortPrimaryVar: '--al-primary',
    shortSecondaryVar: '--al-secondary',

    // SVG defaults
    defaultStrokeWidth: '2',
    defaultStrokeWidthNum: 2,
    defaultFill: 'none',

    // Paths (resolved from ROOT)
    sourceDir: path.join(ROOT, 'node_modules/lucide-static/icons'),
    categoriesFile: path.join(ROOT, 'src/data/categories.json'),
    outSvg: path.join(ROOT, 'dist/svg'),
    outReact: path.join(ROOT, 'dist/react'),
    outVue: path.join(ROOT, 'dist/vue'),
    outCss: path.join(ROOT, 'dist/css'),
    galleryData: path.join(ROOT, 'src/data'),
    galleryIconsFile: 'icons.json',
    galleryMetaFile: 'icons-meta.json',
    publicData: path.join(ROOT, 'public/data/lucide'),

    // Gallery config
    packageName: 'animated-lucide-react',
    chunkPath: '/data/lucide',
    chunkSize: 200,

    // Category icons for gallery sidebar
    categoryIcons: {
      all: 'layers',
      arrows: 'arrow-right',
      communication: 'mail',
      media: 'play',
      files: 'file-text',
      ui: 'settings',
      status: 'bell',
      weather: 'sun',
      objects: 'home',
      editing: 'pencil',
      people: 'user',
      navigation: 'map-pin',
      data: 'bar-chart-2',
      security: 'shield',
      development: 'code',
    },

    // Optional: copy source SVGs to this directory
    copySourceTo: null,
  },

  iconoir: {
    name: 'iconoir',
    label: 'Iconoir',

    cssPrefix: 'ai',
    svgClassName: 'animated-iconoir',
    wrapperClass: 'ai-icon-wrapper',
    primaryVar: '--animated-iconoir-primary',
    secondaryVar: '--animated-iconoir-secondary',
    shortPrimaryVar: '--ai-primary',
    shortSecondaryVar: '--ai-secondary',

    defaultStrokeWidth: '1.5',
    defaultStrokeWidthNum: 1.5,
    defaultFill: 'none',

    sourceDir: path.join(ROOT, 'node_modules/iconoir/icons/regular'),
    categoriesFile: path.join(ROOT, 'icons/iconoir/categories.json'),
    outSvg: path.join(ROOT, 'dist/iconoir/svg'),
    outReact: path.join(ROOT, 'dist/iconoir/react'),
    outVue: path.join(ROOT, 'dist/iconoir/vue'),
    outCss: path.join(ROOT, 'dist/iconoir/css'),
    galleryData: path.join(ROOT, 'src/data'),
    galleryIconsFile: 'iconoir-icons.json',
    galleryMetaFile: 'iconoir-meta.json',
    publicData: path.join(ROOT, 'public/data/iconoir'),

    packageName: 'animated-iconoir-react',
    chunkPath: '/data/iconoir',
    chunkSize: 200,

    categoryIcons: {
      all: 'view-grid',
      arrows: 'arrow-right',
      communication: 'mail',
      media: 'play',
      files: 'folder',
      ui: 'settings',
      status: 'bell',
      weather: 'sun-light',
      objects: 'home',
      editing: 'edit-pencil',
      people: 'user',
      navigation: 'map-pin',
      data: 'graph-up',
      security: 'shield',
      development: 'code',
    },

    copySourceTo: null,
  },

  heroicons: {
    name: 'heroicons',
    label: 'Heroicons',

    cssPrefix: 'ah',
    svgClassName: 'animated-heroicon',
    wrapperClass: 'ah-icon-wrapper',
    primaryVar: '--animated-heroicon-primary',
    secondaryVar: '--animated-heroicon-secondary',
    shortPrimaryVar: '--ah-primary',
    shortSecondaryVar: '--ah-secondary',

    defaultStrokeWidth: '1.5',
    defaultStrokeWidthNum: 1.5,
    defaultFill: 'none',

    sourceDir: path.join(ROOT, 'node_modules/heroicons/24/outline'),
    categoriesFile: path.join(ROOT, 'icons/heroicons/categories.json'),
    outSvg: path.join(ROOT, 'dist/heroicons/svg'),
    outReact: path.join(ROOT, 'dist/heroicons/react'),
    outVue: path.join(ROOT, 'dist/heroicons/vue'),
    outCss: path.join(ROOT, 'dist/heroicons/css'),
    galleryData: path.join(ROOT, 'src/data'),
    galleryIconsFile: 'heroicons-icons.json',
    galleryMetaFile: 'heroicons-meta.json',
    publicData: path.join(ROOT, 'public/data/heroicons'),

    packageName: 'animated-heroicons-react',
    chunkPath: '/data/heroicons',
    chunkSize: 100,

    categoryIcons: {
      all: 'squares-2x2',
      arrows: 'arrow-right',
      communication: 'envelope',
      media: 'play',
      files: 'document-text',
      ui: 'cog',
      status: 'bell',
      weather: 'sun',
      objects: 'home',
      editing: 'pencil',
      people: 'user',
      navigation: 'map-pin',
      data: 'chart-bar',
      security: 'shield-check',
      development: 'code-bracket',
    },

    copySourceTo: path.join(ROOT, 'icons/heroicons/source'),

    copySourceTo: null,
  },
};

/**
 * Generate the gallery config TypeScript file.
 * Called by prepare-gallery.mjs to keep gallery components data-driven.
 */
export function generateGalleryConfigTS() {
  const entries = Object.entries(iconSetConfigs).map(([key, cfg]) => {
    return `  ${key}: {
    label: "${cfg.label}",
    packageName: "${cfg.packageName}",
    cssPrefix: "${cfg.cssPrefix}",
    wrapperClass: "${cfg.wrapperClass}",
    primaryVar: "${cfg.primaryVar}",
    secondaryVar: "${cfg.secondaryVar}",
    shortPrimaryVar: "${cfg.shortPrimaryVar}",
    shortSecondaryVar: "${cfg.shortSecondaryVar}",
    chunkPath: "${cfg.chunkPath}",
    chunkSize: ${cfg.chunkSize},
    categoryIcons: ${JSON.stringify(cfg.categoryIcons, null, 6).replace(/\n/g, '\n    ')},
  }`;
  });

  return `// AUTO-GENERATED by prepare-gallery.mjs — do not edit manually
// To add a new icon set, update scripts/icon-set-configs.mjs

export interface IconSetGalleryConfig {
  label: string;
  packageName: string;
  cssPrefix: string;
  wrapperClass: string;
  primaryVar: string;
  secondaryVar: string;
  shortPrimaryVar: string;
  shortSecondaryVar: string;
  chunkPath: string;
  chunkSize: number;
  categoryIcons: Record<string, string>;
}

export const ICON_SET_CONFIG: Record<string, IconSetGalleryConfig> = {
${entries.join(',\n')}
};

export const ICON_SET_KEYS = ${JSON.stringify(Object.keys(iconSetConfigs))} as const;
export type IconSet = typeof ICON_SET_KEYS[number];
`;
}
