#!/usr/bin/env node
/**
 * Generates a self-contained HTML file for recording a hero video.
 * 15×8 grid of animated SVG icons that transitions between 3 icon sets
 * (Lucide → Iconoir → Heroicons) with crossfade transitions.
 */

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const COLS = 15;
const ROWS = 8;
const TOTAL = COLS * ROWS; // 120

const DIST_DIR = new URL("../dist", import.meta.url).pathname;

// Curated icon lists for visual diversity
const LUCIDE_PICKS = [
  "heart", "bell", "settings", "mail", "shield", "home", "user", "search",
  "star", "sun", "moon", "cloud", "lock", "unlock", "trash-2", "folder",
  "file-text", "camera", "mic", "phone", "wifi", "bluetooth", "battery",
  "zap", "gift", "award", "bookmark", "clock", "calendar", "map-pin",
  "compass", "navigation", "send", "share-2", "download", "upload",
  "play", "pause", "volume-2", "music", "headphones", "monitor",
  "smartphone", "printer", "cpu", "hard-drive", "database", "globe",
  "link", "eye", "edit", "scissors", "clipboard", "layers", "grid",
  "bar-chart-2", "pie-chart", "activity", "trending-up", "check-circle",
  "alert-triangle", "info", "x-circle", "refresh-cw", "rotate-cw",
  "maximize", "minimize", "move", "crosshair", "target", "flag", "tag",
  "hash", "at-sign", "key", "terminal", "code", "git-branch",
  "feather", "umbrella", "coffee", "anchor", "truck",
  "plane", "rocket", "bike", "building", "building-2",
  "flame", "snowflake", "wind", "thermometer", "droplets",
  "lamp", "armchair", "bed", "bath", "utensils", "wine", "apple",
  "cherry", "egg", "fish", "beef", "sandwich",
  "package", "shopping-cart", "credit-card", "wallet", "receipt",
  "briefcase", "graduation-cap", "book-open", "pen-tool", "palette",
  "image", "video", "radio", "tv", "gamepad-2", "puzzle", "crown",
  "siren", "stethoscope", "pill", "dna", "microscope",
  "telescope", "satellite", "tower-control",
];

const ICONOIR_PICKS = [
  "activity", "airplane", "alarm", "apple", "archive", "atom",
  "attachment", "bag", "bank", "barcode", "basketball", "battery-full",
  "bed", "bell", "bicycle", "binocular", "birthday-cake", "bluetooth",
  "bold", "bonfire", "book", "bookmark", "bowling-ball", "brain",
  "bright-star", "bug", "building", "bus", "calculator", "calendar",
  "camera", "car", "chat-bubble", "check-circle", "chess-board",
  "cinema-old", "clipboard", "clock", "cloud", "code",
  "coffee-cup", "compass", "computer", "controller", "cookie",
  "credit-card", "crown", "cube", "database", "dashboard",
  "design-pencil", "diamond", "dice-1", "donate", "download",
  "drawer", "dribbble", "drone", "earth", "edit-pencil",
  "emoji", "ev-charge", "eye-alt", "face-id", "facetime",
  "film-camera", "filter", "fingerprint", "fire-flame", "fishing",
  "flash", "floppy-disk", "flower", "folder", "football",
  "garage", "gas-tank", "gif-format", "glasses", "globe",
  "golf", "gps", "graph-up", "guitar", "gym",
  "hand", "hashtag", "headset", "heart", "hexagon",
  "home", "hourglass", "ice-cream", "image", "inbox",
  "key", "keyframe", "lamp", "language", "laptop",
  "leaf", "light-bulb", "link", "lock", "log-in",
  "magic-wand", "mail", "map", "medal", "megaphone",
  "mic", "microscope", "moon", "mountain", "mouse",
  "music-note", "network", "nuclear", "palette", "parachute",
  "pen", "percentage", "phone", "pin", "pizza-slice",
];

const HEROICON_PICKS = [
  "academic-cap", "adjustments-horizontal", "archive-box", "arrow-path",
  "backspace", "banknotes", "beaker", "bell", "bolt", "book-open",
  "bookmark", "briefcase", "bug-ant", "building-library",
  "building-office", "building-storefront", "cake", "calculator",
  "calendar", "camera", "chart-bar", "chart-pie",
  "chat-bubble-left-right", "check-badge", "check-circle",
  "circle-stack", "clipboard", "clock", "cloud", "code-bracket",
  "cog", "command-line", "computer-desktop", "cpu-chip", "credit-card",
  "cube", "currency-dollar", "cursor-arrow-rays",
  "device-phone-mobile", "document-text", "envelope",
  "exclamation-triangle", "eye", "face-smile", "film",
  "finger-print", "fire", "flag", "folder", "forward",
  "funnel", "gift", "globe-alt", "hand-thumb-up", "hashtag",
  "heart", "home", "identification", "inbox", "information-circle",
  "key", "language", "lifebuoy", "light-bulb", "link",
  "lock-closed", "magnifying-glass", "map-pin", "map",
  "megaphone", "microphone", "moon", "musical-note", "newspaper",
  "paint-brush", "paper-airplane", "paper-clip", "pause",
  "pencil", "phone", "photo", "play", "plus-circle",
  "power", "printer", "puzzle-piece", "qr-code", "radio",
  "rocket-launch", "rss", "scale", "scissors", "server",
  "share", "shield-check", "shopping-bag", "shopping-cart",
  "signal", "sparkles", "speaker-wave", "star", "sun",
  "swatch", "tag", "ticket", "trash", "trophy", "truck",
  "tv", "user-circle", "user-group", "user", "users",
  "video-camera", "wallet", "wifi", "window", "wrench",
  "x-circle",
  "arrow-down-tray", "arrow-up-tray", "bars-3", "chevron-right",
  "document", "ellipsis-horizontal", "envelope-open", "eye-dropper",
  "folder-open", "globe-americas", "hand-raised", "minus-circle",
  "no-symbol", "percent-badge", "receipt-percent", "stop",
  "table-cells", "variable", "viewfinder-circle", "wrench-screwdriver",
];

function readSvgs(dir, picks) {
  const available = new Set(readdirSync(dir).filter(f => f.endsWith(".svg")));
  const results = [];

  // First try picks
  for (const name of picks) {
    if (results.length >= TOTAL) break;
    const fname = name + ".svg";
    if (available.has(fname)) {
      try {
        const content = readFileSync(join(dir, fname), "utf-8");
        results.push({ name, content });
        available.delete(fname);
      } catch {
        // skip
      }
    }
  }

  // Fill remaining from available files
  if (results.length < TOTAL) {
    const remaining = [...available].sort();
    // Spread picks across the alphabet
    const step = Math.max(1, Math.floor(remaining.length / (TOTAL - results.length)));
    for (let i = 0; i < remaining.length && results.length < TOTAL; i += step) {
      const fname = remaining[i];
      try {
        const content = readFileSync(join(dir, fname), "utf-8");
        results.push({ name: fname.replace(".svg", ""), content });
      } catch {
        // skip
      }
    }
  }

  // Final fallback: just fill from beginning
  if (results.length < TOTAL) {
    const all = [...readdirSync(dir).filter(f => f.endsWith(".svg"))].sort();
    for (const fname of all) {
      if (results.length >= TOTAL) break;
      if (!results.find(r => r.name === fname.replace(".svg", ""))) {
        try {
          const content = readFileSync(join(dir, fname), "utf-8");
          results.push({ name: fname.replace(".svg", ""), content });
        } catch {
          // skip
        }
      }
    }
  }

  return results.slice(0, TOTAL);
}

console.log("Reading Lucide SVGs...");
const lucide = readSvgs(join(DIST_DIR, "svg"), LUCIDE_PICKS);
console.log(`  Got ${lucide.length} icons`);

console.log("Reading Iconoir SVGs...");
const iconoir = readSvgs(join(DIST_DIR, "iconoir/svg"), ICONOIR_PICKS);
console.log(`  Got ${iconoir.length} icons`);

console.log("Reading Heroicons SVGs...");
const heroicons = readSvgs(join(DIST_DIR, "heroicons/svg"), HEROICON_PICKS);
console.log(`  Got ${heroicons.length} icons`);

// Strip <style> blocks from SVGs to avoid duplication (we'll add overrides globally)
function stripStyle(svg) {
  return svg.replace(/<style>[\s\S]*?<\/style>/g, "");
}

// Extract ALL unique style blocks (we need animation keyframes)
function extractStyles(svgs) {
  const styles = new Set();
  for (const { content } of svgs) {
    const match = content.match(/<style>([\s\S]*?)<\/style>/);
    if (match) styles.add(match[1]);
  }
  // Return the longest one (they're typically identical within a set, longest has all animations)
  let longest = "";
  for (const s of styles) {
    if (s.length > longest.length) longest = s;
  }
  return longest;
}

const lucideStyle = extractStyles(lucide);
const iconoirStyle = extractStyles(iconoir);
const heroiconsStyle = extractStyles(heroicons);

function buildGrid(svgs, setId) {
  let cells = "";
  for (let i = 0; i < svgs.length; i++) {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const svg = stripStyle(svgs[i].content);
    cells += `<div class="cell" data-row="${row}" data-col="${col}">${svg}</div>\n`;
  }
  return cells;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1200">
<title>Animated Icon Sets - Hero Video</title>
<style>
/* ===== BASE ANIMATION STYLES (from icon sets) ===== */
/* Lucide animations */
${lucideStyle}

/* Iconoir animations */
${iconoirStyle}

/* Heroicons animations */
${heroiconsStyle}

/* ===== OVERRIDE: trigger animations via .animating class on .cell ===== */
/* Lucide overrides */
.cell.animating .al-anim-fill { fill-opacity: 0.18; }
.cell.animating .al-anim-draw { animation: al-draw-in 600ms ease var(--al-delay, 0ms) both; }
.cell.animating .al-anim-draw-line { animation: al-draw-line 500ms ease var(--al-delay, 0ms) both; }
.cell.animating .al-anim-fade { animation: al-fade-pop 500ms ease var(--al-delay, 0ms) both; }
.cell.animating .al-anim-dot-appear { animation: al-dot-pop 500ms ease 200ms both; }
.cell.animating .al-anim-bar { animation: al-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms) both; }
.cell.animating .al-anim-scale-pop { animation: al-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms) both; }
.cell.animating .al-anim-pulse-element { animation: al-pulse 0.7s ease-in-out; }
.cell.animating .al-anim-gear { transform: rotate(var(--al-rotation, 90deg)); }
.cell.animating .al-anim-nudge { transform: translate(var(--al-tx, 0px), var(--al-ty, 0px)); }
.cell.animating .al-anim-bell-ring { animation: al-bell-ring 0.7s ease; }
.cell.animating .al-anim-heart-beat { animation: al-heart-beat 0.8s ease; }
.cell.animating .al-anim-rocket-lift { transform: translate(1px, -1.5px); }
.cell.animating .al-anim-handle-lift { transform: translateY(-1.5px); }
.cell.animating .al-anim-page-turn { transform: rotateY(-12deg); }
.cell.animating .al-anim-menu-line { transform: scaleX(var(--al-scale-x, 0.7)); }
.cell.animating .al-anim-mail-flap { animation: al-mail-flap 700ms ease var(--al-delay, 0ms) both; }
.cell.animating .al-anim-shake { animation: al-shake 600ms ease var(--al-delay, 0ms) both; }
.cell.animating .al-anim-spin { animation: al-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--al-delay, 0ms) both; }

/* Iconoir overrides */
.cell.animating .ai-anim-fill { fill-opacity: 0.18; }
.cell.animating .ai-anim-draw { animation: ai-draw-in 600ms ease var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-draw-line { animation: ai-draw-line 500ms ease var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-fade { animation: ai-fade-pop 500ms ease var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-dot-appear { animation: ai-dot-pop 500ms ease 200ms both; }
.cell.animating .ai-anim-bar { animation: ai-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-scale-pop { animation: ai-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-pulse-element { animation: ai-pulse 0.7s ease-in-out; }
.cell.animating .ai-anim-gear { transform: rotate(var(--ai-rotation, 90deg)); }
.cell.animating .ai-anim-nudge { transform: translate(var(--ai-tx, 0px), var(--ai-ty, 0px)); }
.cell.animating .ai-anim-bell-ring { animation: ai-bell-ring 0.7s ease; }
.cell.animating .ai-anim-heart-beat { animation: ai-heart-beat 0.8s ease; }
.cell.animating .ai-anim-rocket-lift { transform: translate(1px, -1.5px); }
.cell.animating .ai-anim-handle-lift { transform: translateY(-1.5px); }
.cell.animating .ai-anim-page-turn { transform: rotateY(-12deg); }
.cell.animating .ai-anim-menu-line { transform: scaleX(var(--ai-scale-x, 0.7)); }
.cell.animating .ai-anim-mail-flap { animation: ai-mail-flap 700ms ease var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-shake { animation: ai-shake 600ms ease var(--ai-delay, 0ms) both; }
.cell.animating .ai-anim-spin { animation: ai-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--ai-delay, 0ms) both; }

/* Heroicons overrides */
.cell.animating .ah-anim-fill { fill-opacity: 0.18; }
.cell.animating .ah-anim-draw { animation: ah-draw-in 600ms ease var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-draw-line { animation: ah-draw-line 500ms ease var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-fade { animation: ah-fade-pop 500ms ease var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-dot-appear { animation: ah-dot-pop 500ms ease 200ms both; }
.cell.animating .ah-anim-bar { animation: ah-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-scale-pop { animation: ah-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-pulse-element { animation: ah-pulse 0.7s ease-in-out; }
.cell.animating .ah-anim-gear { transform: rotate(var(--ah-rotation, 90deg)); }
.cell.animating .ah-anim-nudge { transform: translate(var(--ah-tx, 0px), var(--ah-ty, 0px)); }
.cell.animating .ah-anim-bell-ring { animation: ah-bell-ring 0.7s ease; }
.cell.animating .ah-anim-heart-beat { animation: ah-heart-beat 0.8s ease; }
.cell.animating .ah-anim-rocket-lift { transform: translate(1px, -1.5px); }
.cell.animating .ah-anim-handle-lift { transform: translateY(-1.5px); }
.cell.animating .ah-anim-page-turn { transform: rotateY(-12deg); }
.cell.animating .ah-anim-menu-line { transform: scaleX(var(--ah-scale-x, 0.7)); }
.cell.animating .ah-anim-mail-flap { animation: ah-mail-flap 700ms ease var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-shake { animation: ah-shake 600ms ease var(--ah-delay, 0ms) both; }
.cell.animating .ah-anim-spin { animation: ah-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--ah-delay, 0ms) both; }

/* ===== LAYOUT ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.canvas {
  width: 1200px;
  height: 640px;
  position: relative;
  overflow: hidden;
}

.grid-layer {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  grid-template-rows: repeat(${ROWS}, 1fr);
  opacity: 0;
  transition: opacity 400ms ease;
}
.grid-layer.visible { opacity: 1; }

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.cell svg {
  width: 32px;
  height: 32px;
  transition: transform 150ms ease;
}

/* Color theming per set */
#lucide-layer { color: #0d9488; --al-primary: #0d9488; --al-secondary: #5eead4; }
#iconoir-layer { color: #6366f1; --ai-primary: #6366f1; --ai-secondary: #a5b4fc; }
#heroicons-layer { color: #f59e0b; --ah-primary: #f59e0b; --ah-secondary: #fcd34d; }

/* Set label */
.set-label {
  position: absolute;
  bottom: 16px;
  right: 24px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 400ms ease;
  pointer-events: none;
}
.set-label.visible { opacity: 0.5; }

#lucide-label { color: #0d9488; }
#iconoir-label { color: #6366f1; }
#heroicons-label { color: #f59e0b; }
</style>
</head>
<body>

<div class="canvas">
  <!-- Lucide layer -->
  <div id="lucide-layer" class="grid-layer visible">
    ${buildGrid(lucide, "lucide")}
  </div>

  <!-- Iconoir layer -->
  <div id="iconoir-layer" class="grid-layer">
    ${buildGrid(iconoir, "iconoir")}
  </div>

  <!-- Heroicons layer -->
  <div id="heroicons-layer" class="grid-layer">
    ${buildGrid(heroicons, "heroicons")}
  </div>

  <!-- Set labels -->
  <div id="lucide-label" class="set-label visible">Lucide</div>
  <div id="iconoir-label" class="set-label">Iconoir</div>
  <div id="heroicons-label" class="set-label">Heroicons</div>
</div>

<script>
const COLS = ${COLS};
const ROWS = ${ROWS};
const WAVE_DELAY = 30; // ms per diagonal step

const layers = [
  { layer: document.getElementById('lucide-layer'), label: document.getElementById('lucide-label') },
  { layer: document.getElementById('iconoir-layer'), label: document.getElementById('iconoir-label') },
  { layer: document.getElementById('heroicons-layer'), label: document.getElementById('heroicons-label') },
];

function triggerWave(layerEl) {
  const cells = layerEl.querySelectorAll('.cell');
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const delay = (row + col) * WAVE_DELAY;
    setTimeout(() => {
      cell.classList.add('animating');
    }, delay);
  });
}

function clearWave(layerEl) {
  const cells = layerEl.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('animating'));
}

function crossfade(fromIdx, toIdx) {
  layers[fromIdx].layer.classList.remove('visible');
  layers[fromIdx].label.classList.remove('visible');
  layers[toIdx].layer.classList.add('visible');
  layers[toIdx].label.classList.add('visible');
}

// Animation timeline
function runSequence() {
  // 0.0s: Lucide visible, trigger wave
  triggerWave(layers[0].layer);

  // 1.0s: Crossfade to Iconoir
  setTimeout(() => {
    crossfade(0, 1);
  }, 1000);

  // 1.5s: Iconoir wave
  setTimeout(() => {
    clearWave(layers[0].layer);
    triggerWave(layers[1].layer);
  }, 1500);

  // 2.5s: Crossfade to Heroicons
  setTimeout(() => {
    crossfade(1, 2);
  }, 2500);

  // 3.0s: Heroicons wave
  setTimeout(() => {
    clearWave(layers[1].layer);
    triggerWave(layers[2].layer);
  }, 3000);

  // 3.5s: Crossfade back to Lucide (loop)
  setTimeout(() => {
    crossfade(2, 0);
    clearWave(layers[2].layer);
    // 4.0s: restart
    setTimeout(() => {
      runSequence();
    }, 500);
  }, 3500);
}

// Auto-play on load
window.addEventListener('load', () => {
  setTimeout(runSequence, 300);
});
</script>

</body>
</html>
`;

const outPath = new URL("hero-video.html", import.meta.url).pathname;
writeFileSync(outPath, html, "utf-8");
console.log(`\nGenerated: ${outPath}`);
console.log(`File size: ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB`);
