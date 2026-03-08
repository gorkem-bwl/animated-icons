#!/usr/bin/env node

/**
 * Prepares gallery data:
 * 1. icons-meta.json — lightweight metadata (name, category, animation) for static page
 * 2. public/data/icons-chunk-{N}.json — SVG content in chunks for client-side loading
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SVG_DIR = path.join(ROOT, 'dist/svg');
const GALLERY_DATA = path.join(ROOT, 'gallery/src/data');
const PUBLIC_DATA = path.join(ROOT, 'gallery/public/data/lucide');

const CHUNK_SIZE = 200;

// Ensure directories exist
fs.mkdirSync(PUBLIC_DATA, { recursive: true });

const icons = JSON.parse(fs.readFileSync(path.join(GALLERY_DATA, 'icons.json'), 'utf-8'));

// 1. Write lightweight metadata (no SVG content)
const meta = icons.map(icon => ({
  name: icon.name,
  componentName: icon.componentName,
  category: icon.category,
  animation: icon.animation,
  elementCount: icon.elementCount,
}));
fs.writeFileSync(
  path.join(GALLERY_DATA, 'icons-meta.json'),
  JSON.stringify(meta)
);

// 2. Build name→svg lookup and write chunks
const svgMap = {};
for (const icon of icons) {
  const svgPath = path.join(SVG_DIR, `${icon.name}.svg`);
  svgMap[icon.name] = fs.readFileSync(svgPath, 'utf-8');
}

const names = icons.map(i => i.name);
const totalChunks = Math.ceil(names.length / CHUNK_SIZE);

// Write a manifest so the client knows how many chunks exist
const manifest = { totalIcons: names.length, chunkSize: CHUNK_SIZE, totalChunks };
fs.writeFileSync(path.join(PUBLIC_DATA, 'manifest.json'), JSON.stringify(manifest));

for (let i = 0; i < totalChunks; i++) {
  const chunkNames = names.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  const chunkData = {};
  for (const name of chunkNames) {
    chunkData[name] = svgMap[name];
  }
  fs.writeFileSync(
    path.join(PUBLIC_DATA, `icons-chunk-${i}.json`),
    JSON.stringify(chunkData)
  );
}

// 3. Also keep icons-with-svg.json for backwards compatibility but only if small enough
// Skip if > 5MB to avoid Vercel issues
const enriched = icons.map(icon => ({ ...icon, svg: svgMap[icon.name] }));
const fullJson = JSON.stringify(enriched);
if (fullJson.length < 5 * 1024 * 1024) {
  fs.writeFileSync(path.join(GALLERY_DATA, 'icons-with-svg.json'), fullJson);
} else {
  // Write a placeholder that the app won't import
  fs.writeFileSync(path.join(GALLERY_DATA, 'icons-with-svg.json'), '[]');
}

console.log(`Prepared ${icons.length} icons: ${totalChunks} chunks of ${CHUNK_SIZE}, metadata JSON, and manifest.`);
