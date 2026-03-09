#!/usr/bin/env node

/**
 * Prepares gallery data for all icon sets:
 * 1. icons-meta.json — lightweight metadata for static page
 * 2. public/data/{set}/icons-chunk-{N}.json — SVG content in chunks
 * 3. src/data/icon-set-config.ts — auto-generated gallery config
 */

import fs from 'fs';
import path from 'path';
import { iconSetConfigs, generateGalleryConfigTS } from './icon-set-configs.mjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

console.log('Preparing gallery data...\n');

for (const [key, config] of Object.entries(iconSetConfigs)) {
  const iconsPath = path.join(config.galleryData, config.galleryIconsFile);

  if (!fs.existsSync(iconsPath)) {
    console.log(`  Skipping ${config.name}: no ${config.galleryIconsFile} found`);
    continue;
  }

  fs.mkdirSync(config.publicData, { recursive: true });

  const icons = JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));

  // 1. Write lightweight metadata
  const meta = icons.map(icon => ({
    name: icon.name,
    componentName: icon.componentName,
    category: icon.category,
    animation: icon.animation,
    elementCount: icon.elementCount,
  }));

  fs.writeFileSync(
    path.join(ROOT, 'src/data', config.galleryMetaFile),
    JSON.stringify(meta)
  );

  // 2. Build name→svg lookup and write chunks
  const svgMap = {};
  for (const icon of icons) {
    const svgPath = path.join(config.outSvg, `${icon.name}.svg`);
    if (fs.existsSync(svgPath)) {
      svgMap[icon.name] = fs.readFileSync(svgPath, 'utf-8');
    }
  }

  const names = icons.map(i => i.name);
  const totalChunks = Math.ceil(names.length / config.chunkSize);

  const manifest = { totalIcons: names.length, chunkSize: config.chunkSize, totalChunks };
  fs.writeFileSync(path.join(config.publicData, 'manifest.json'), JSON.stringify(manifest));

  for (let i = 0; i < totalChunks; i++) {
    const chunkNames = names.slice(i * config.chunkSize, (i + 1) * config.chunkSize);
    const chunkData = {};
    for (const n of chunkNames) {
      chunkData[n] = svgMap[n];
    }
    fs.writeFileSync(
      path.join(config.publicData, `icons-chunk-${i}.json`),
      JSON.stringify(chunkData)
    );
  }

  console.log(`  ${config.name}: ${icons.length} icons -> ${totalChunks} chunks of ${config.chunkSize}`);
}

// 3. Generate gallery config TypeScript file
const configTS = generateGalleryConfigTS();
fs.writeFileSync(path.join(ROOT, 'src/data/icon-set-config.ts'), configTS);
console.log('\n  Generated src/data/icon-set-config.ts');

console.log('\nDone!');
