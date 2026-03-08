#!/usr/bin/env node

/**
 * Prepares gallery data for both Lucide and Heroicons:
 * 1. icons-meta.json — lightweight metadata for static page
 * 2. public/data/{set}/icons-chunk-{N}.json — SVG content in chunks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function prepareSet({ name, svgDir, galleryData, publicData, chunkSize, iconsJsonName }) {
  fs.mkdirSync(publicData, { recursive: true });
  fs.mkdirSync(galleryData, { recursive: true });

  const iconsPath = path.join(galleryData, iconsJsonName || 'icons.json');
  if (!fs.existsSync(iconsPath)) {
    console.log(`  Skipping ${name}: no icons.json found at ${iconsPath}`);
    return;
  }

  const icons = JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));

  // 1. Write lightweight metadata
  const meta = icons.map(icon => ({
    name: icon.name,
    componentName: icon.componentName,
    category: icon.category,
    animation: icon.animation,
    elementCount: icon.elementCount,
  }));

  const metaFileName = name === 'lucide' ? 'icons-meta.json' : 'heroicons-meta.json';
  fs.writeFileSync(
    path.join(ROOT, 'src/data', metaFileName),
    JSON.stringify(meta)
  );

  // 2. Build name→svg lookup and write chunks
  const svgMap = {};
  for (const icon of icons) {
    const svgPath = path.join(svgDir, `${icon.name}.svg`);
    if (fs.existsSync(svgPath)) {
      svgMap[icon.name] = fs.readFileSync(svgPath, 'utf-8');
    }
  }

  const names = icons.map(i => i.name);
  const totalChunks = Math.ceil(names.length / chunkSize);

  const manifest = { totalIcons: names.length, chunkSize, totalChunks };
  fs.writeFileSync(path.join(publicData, 'manifest.json'), JSON.stringify(manifest));

  for (let i = 0; i < totalChunks; i++) {
    const chunkNames = names.slice(i * chunkSize, (i + 1) * chunkSize);
    const chunkData = {};
    for (const n of chunkNames) {
      chunkData[n] = svgMap[n];
    }
    fs.writeFileSync(
      path.join(publicData, `icons-chunk-${i}.json`),
      JSON.stringify(chunkData)
    );
  }

  console.log(`  ${name}: ${icons.length} icons → ${totalChunks} chunks of ${chunkSize}`);
}

console.log('Preparing gallery data...\n');

// Lucide
prepareSet({
  name: 'lucide',
  svgDir: path.join(ROOT, 'dist/svg'),
  galleryData: path.join(ROOT, 'src/data'),
  publicData: path.join(ROOT, 'public/data/lucide'),
  chunkSize: 200,
});

// Heroicons
const heroiconsSvgDir = path.join(ROOT, 'dist/heroicons/svg');
if (fs.existsSync(heroiconsSvgDir)) {
  prepareSet({
    name: 'heroicons',
    svgDir: heroiconsSvgDir,
    galleryData: path.join(ROOT, 'src/data'),
    publicData: path.join(ROOT, 'public/data/heroicons'),
    chunkSize: 100,
    iconsJsonName: 'heroicons-icons.json',
  });
} else {
  console.log('  heroicons: skipped (no dist/heroicons/svg found)');
}

console.log('\nDone!');
