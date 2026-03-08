#!/usr/bin/env node

/**
 * Prepares gallery data by embedding SVG content into the icons.json
 * so the gallery can render icons without importing individual SVG files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SVG_DIR = path.join(ROOT, 'dist/svg');
const GALLERY_DATA = path.join(ROOT, 'gallery/src/data');

const icons = JSON.parse(fs.readFileSync(path.join(GALLERY_DATA, 'icons.json'), 'utf-8'));

const enriched = icons.map(icon => {
  const svgPath = path.join(SVG_DIR, `${icon.name}.svg`);
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  return { ...icon, svg: svgContent };
});

fs.writeFileSync(
  path.join(GALLERY_DATA, 'icons-with-svg.json'),
  JSON.stringify(enriched, null, 2)
);

console.log(`Prepared ${enriched.length} icons with embedded SVG content.`);
