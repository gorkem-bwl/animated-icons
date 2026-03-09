#!/usr/bin/env node
/**
 * Records the hero video HTML page as a .webm video using Playwright,
 * then converts to MP4 via ffmpeg.
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '..', 'assets');
const HTML_URL = 'http://localhost:8787/hero-video.html';

const WIDTH = 1200;
const HEIGHT = 640;
const DURATION_MS = 5000; // record for 5s to capture the full ~3.5s sequence + buffer

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: WIDTH, height: HEIGHT },
    },
  });

  const page = await context.newPage();
  await page.goto(HTML_URL, { waitUntil: 'domcontentloaded' });

  // Wait for the animation sequence to play through
  await page.waitForTimeout(DURATION_MS);

  // Close context to finalize video
  await context.close();
  await browser.close();

  console.log(`Video saved to ${OUTPUT_DIR}/`);
  console.log('Check for .webm file and convert to mp4 with:');
  console.log(`  ffmpeg -i assets/*.webm -c:v libx264 -pix_fmt yuv420p -movflags +faststart assets/hero.mp4`);
}

main().catch(console.error);
