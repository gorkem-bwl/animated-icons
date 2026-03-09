/**
 * Create package.json files for all 12 npm packages.
 * Also copies the relevant CSS file into each package directory.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const packages = [
  // Lucide
  {
    name: '@animated-icons/lucide-react',
    dir: 'dist/react',
    cssDir: 'dist/css',
    cssFile: 'animated-lucide.css',
    description: 'Animated Lucide icons for React — CSS-only hover animations with two-tone color support. 1,933 icons.',
    keywords: ['lucide', 'icons', 'animated', 'react', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { react: '>=16.8.0', 'react-dom': '>=16.8.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/lucide-vue',
    dir: 'dist/vue',
    cssDir: 'dist/css',
    cssFile: 'animated-lucide.css',
    description: 'Animated Lucide icons for Vue — CSS-only hover animations with two-tone color support. 1,933 icons.',
    keywords: ['lucide', 'icons', 'animated', 'vue', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { vue: '>=3.0.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/lucide-svelte',
    dir: 'dist/svelte',
    cssDir: 'dist/css',
    cssFile: 'animated-lucide.css',
    description: 'Animated Lucide icons for Svelte — CSS-only hover animations with two-tone color support. 1,933 icons.',
    keywords: ['lucide', 'icons', 'animated', 'svelte', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { svelte: '>=3.0.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/lucide-wc',
    dir: 'dist/web-components',
    cssDir: 'dist/css',
    cssFile: 'animated-lucide.css',
    description: 'Animated Lucide icons as Web Components — CSS-only hover animations with two-tone color support. 1,933 icons.',
    keywords: ['lucide', 'icons', 'animated', 'web-components', 'custom-elements', 'css-animations', 'two-tone', 'hover'],
    peerDeps: {},
    main: 'index.js',
  },
  // Heroicons
  {
    name: '@animated-icons/heroicons-react',
    dir: 'dist/heroicons/react',
    cssDir: 'dist/heroicons/css',
    cssFile: 'animated-heroicons.css',
    description: 'Animated Heroicons for React — CSS-only hover animations with two-tone color support. 324 icons.',
    keywords: ['heroicons', 'icons', 'animated', 'react', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { react: '>=16.8.0', 'react-dom': '>=16.8.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/heroicons-vue',
    dir: 'dist/heroicons/vue',
    cssDir: 'dist/heroicons/css',
    cssFile: 'animated-heroicons.css',
    description: 'Animated Heroicons for Vue — CSS-only hover animations with two-tone color support. 324 icons.',
    keywords: ['heroicons', 'icons', 'animated', 'vue', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { vue: '>=3.0.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/heroicons-svelte',
    dir: 'dist/heroicons/svelte',
    cssDir: 'dist/heroicons/css',
    cssFile: 'animated-heroicons.css',
    description: 'Animated Heroicons for Svelte — CSS-only hover animations with two-tone color support. 324 icons.',
    keywords: ['heroicons', 'icons', 'animated', 'svelte', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { svelte: '>=3.0.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/heroicons-wc',
    dir: 'dist/heroicons/web-components',
    cssDir: 'dist/heroicons/css',
    cssFile: 'animated-heroicons.css',
    description: 'Animated Heroicons as Web Components — CSS-only hover animations with two-tone color support. 324 icons.',
    keywords: ['heroicons', 'icons', 'animated', 'web-components', 'custom-elements', 'css-animations', 'two-tone', 'hover'],
    peerDeps: {},
    main: 'index.js',
  },
  // Iconoir
  {
    name: '@animated-icons/iconoir-react',
    dir: 'dist/iconoir/react',
    cssDir: 'dist/iconoir/css',
    cssFile: 'animated-iconoir.css',
    description: 'Animated Iconoir icons for React — CSS-only hover animations with two-tone color support. 1,383 icons.',
    keywords: ['iconoir', 'icons', 'animated', 'react', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { react: '>=16.8.0', 'react-dom': '>=16.8.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/iconoir-vue',
    dir: 'dist/iconoir/vue',
    cssDir: 'dist/iconoir/css',
    cssFile: 'animated-iconoir.css',
    description: 'Animated Iconoir icons for Vue — CSS-only hover animations with two-tone color support. 1,383 icons.',
    keywords: ['iconoir', 'icons', 'animated', 'vue', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { vue: '>=3.0.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/iconoir-svelte',
    dir: 'dist/iconoir/svelte',
    cssDir: 'dist/iconoir/css',
    cssFile: 'animated-iconoir.css',
    description: 'Animated Iconoir icons for Svelte — CSS-only hover animations with two-tone color support. 1,383 icons.',
    keywords: ['iconoir', 'icons', 'animated', 'svelte', 'css-animations', 'two-tone', 'hover'],
    peerDeps: { svelte: '>=3.0.0' },
    main: 'index.js',
  },
  {
    name: '@animated-icons/iconoir-wc',
    dir: 'dist/iconoir/web-components',
    cssDir: 'dist/iconoir/css',
    cssFile: 'animated-iconoir.css',
    description: 'Animated Iconoir icons as Web Components — CSS-only hover animations with two-tone color support. 1,383 icons.',
    keywords: ['iconoir', 'icons', 'animated', 'web-components', 'custom-elements', 'css-animations', 'two-tone', 'hover'],
    peerDeps: {},
    main: 'index.js',
  },
];

for (const pkg of packages) {
  const pkgDir = path.join(ROOT, pkg.dir);

  const packageJson = {
    name: pkg.name,
    version: '1.0.0',
    description: pkg.description,
    main: pkg.main,
    module: pkg.main,
    type: 'module',
    files: ['*.js', '*.jsx', '*.vue', '*.svelte', '*.css'],
    keywords: pkg.keywords,
    author: 'Dr. Gorkem Cetin',
    license: 'ISC',
    homepage: 'https://animated-icons.vercel.app',
    repository: {
      type: 'git',
      url: 'git+https://github.com/gorkem-bwl/animated-icons.git',
    },
    bugs: {
      url: 'https://github.com/gorkem-bwl/animated-icons/issues',
    },
  };

  if (Object.keys(pkg.peerDeps).length > 0) {
    packageJson.peerDependencies = pkg.peerDeps;
  }

  // Write package.json
  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );

  // Copy CSS file into the package directory
  const cssSrc = path.join(ROOT, pkg.cssDir, pkg.cssFile);
  const cssDst = path.join(pkgDir, pkg.cssFile);
  if (fs.existsSync(cssSrc) && !fs.existsSync(cssDst)) {
    fs.copyFileSync(cssSrc, cssDst);
  }

  console.log(`✓ ${pkg.name} → ${pkg.dir}`);
}

console.log(`\nCreated ${packages.length} package.json files.`);
