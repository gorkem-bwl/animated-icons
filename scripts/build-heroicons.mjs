#!/usr/bin/env node

/**
 * Animated Heroicons Build Script
 *
 * Uses CSS transitions and keyframe animations for rich, semantic SVG animations.
 * Triggered by hover on .animated-heroicon or .ah-icon-wrapper parent.
 *
 * Key differences from animated-lucide:
 * - Most heroicons have a single path — animations target individual path elements
 * - 13 icons have 2 paths — each gets a distinct animation
 * - stroke-width="1.5" (heroicons default)
 * - CSS prefix: ah- (animated-heroicons)
 * - Wrapper class: animated-heroicon / ah-icon-wrapper
 *
 * Animation types:
 * - fill: Shape fills with translucent currentColor on hover
 * - fade: Element pops in on hover
 * - scale-pop: Element scales up and back
 * - nudge: Translate in a direction
 * - gear: Rotation on hover
 * - spin: Full 360 rotation
 * - shake: Horizontal wobble
 * - bell-ring: Bell swing animation
 * - heart-beat: Rhythmic scale pulse
 * - rocket-lift: Upward diagonal translate
 * - handle-lift: Vertical translate up
 * - page-turn: rotateY for book pages
 * - menu-line: Staggered scaleX
 * - mail-flap: Envelope open/close
 * - pulse-element: Pulsing opacity
 * - dot-appear: Dot pop scale
 * - bar: Bar grow from bottom
 * - draw: Stroke dash draw-in
 * - draw-line: Short line draw-in
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HEROICONS_DIR = path.join(ROOT, 'node_modules/heroicons/24/outline');
const CATEGORIES_FILE = path.join(ROOT, 'icons/heroicons/categories.json');
const OUT_DIR = path.join(ROOT, 'dist/heroicons');
const OUT_SVG = path.join(OUT_DIR, 'svg');
const OUT_REACT = path.join(OUT_DIR, 'react');
const OUT_CSS = path.join(OUT_DIR, 'css');
const SRC_ICONS = path.join(ROOT, 'icons/heroicons/source');
const GALLERY_DATA = path.join(ROOT, 'src/data');

// ─── SVG Parser ──────────────────────────────────────────────────────

function parseSvgElements(svgContent) {
  const elements = [];
  const elementRegex = /<(path|circle|rect|line|polyline|polygon|ellipse)\s([^>]*?)\/?\s*>/g;
  let match;
  let index = 0;

  while ((match = elementRegex.exec(svgContent)) !== null) {
    const tag = match[1];
    const attrsStr = match[2];
    const attrs = {};

    const attrRegex = /(\w[\w-]*)="([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    elements.push({ tag, attrs, index });
    index++;
  }

  return elements;
}

function extractSvgAttrs(svgContent) {
  const match = svgContent.match(/<svg\s([^>]*)>/);
  if (!match) return {};
  const attrs = {};
  const attrRegex = /(\w[\w-]*)="([^"]*)"/g;
  let attrMatch;
  while ((attrMatch = attrRegex.exec(match[1])) !== null) {
    attrs[attrMatch[1]] = attrMatch[2];
  }
  return attrs;
}

function toLabel(iconName) {
  return iconName.split('-').join(' ');
}

// ─── Approximate path length for stroke-dash animations ─────────────

function estimatePathLength(el) {
  if (el.tag === 'line') {
    const x1 = parseFloat(el.attrs.x1 || 0), y1 = parseFloat(el.attrs.y1 || 0);
    const x2 = parseFloat(el.attrs.x2 || 0), y2 = parseFloat(el.attrs.y2 || 0);
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  if (el.tag === 'circle') {
    return 2 * Math.PI * parseFloat(el.attrs.r || 0);
  }
  if (el.tag === 'rect') {
    const w = parseFloat(el.attrs.width || 0), h = parseFloat(el.attrs.height || 0);
    return 2 * (w + h);
  }
  if (el.tag === 'ellipse') {
    const rx = parseFloat(el.attrs.rx || 0), ry = parseFloat(el.attrs.ry || 0);
    return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  }
  if (el.tag === 'polyline' || el.tag === 'polygon') {
    const pts = (el.attrs.points || '').trim().split(/[\s,]+/).map(Number);
    let len = 0;
    for (let i = 2; i < pts.length; i += 2) {
      len += Math.sqrt((pts[i] - pts[i - 2]) ** 2 + (pts[i + 1] - pts[i - 1]) ** 2);
    }
    if (el.tag === 'polygon' && pts.length >= 4) {
      len += Math.sqrt((pts[0] - pts[pts.length - 2]) ** 2 + (pts[1] - pts[pts.length - 1]) ** 2);
    }
    return len;
  }
  // path: rough estimate based on d attribute length
  const d = el.attrs.d || '';
  const coords = d.match(/[-+]?\d*\.?\d+/g) || [];
  if (coords.length < 4) return 20;
  let len = 0;
  for (let i = 2; i < coords.length; i += 2) {
    if (i + 1 < coords.length) {
      const dx = parseFloat(coords[i]) - parseFloat(coords[i - 2]);
      const dy = parseFloat(coords[i + 1]) - parseFloat(coords[i - 1]);
      len += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return Math.max(len, 10);
}

// ─── Element Classification ─────────────────────────────────────────

function classifyElement(el, index, total, iconName) {
  const tag = el.tag;
  const r = parseFloat(el.attrs.r || 0);
  const w = parseFloat(el.attrs.width || 0);
  const h = parseFloat(el.attrs.height || 0);

  if (tag === 'circle' && r <= 1.5) return 'dot';
  if (tag === 'circle' && r >= 4) return 'container';
  if (tag === 'rect' && w >= 10 && h >= 10) return 'container';

  const pathLen = estimatePathLength(el);
  if (tag === 'path' && pathLen < 15) return 'detail';
  if (tag === 'line') return 'detail';
  if (index === 0 && total > 1) return 'container';
  if (index === total - 1 && total > 2) return 'detail';

  return 'body';
}

// ─── Animation Assignment Engine ────────────────────────────────────
// Each strategy assigns animation properties to elements.
// For single-path icons the animation is applied to the single path element.
// For 2-path icons each path gets its own animation.

const animationStrategies = {

  // ── Directional (arrows, chevrons) ──
  directional(elements, iconName) {
    const isPath = iconName.includes('path');
    const isUturn = iconName.includes('uturn');

    // arrow-path and uturn variants: spin
    if (isPath || isUturn) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'spin',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Determine direction from name
    const isRight = iconName.includes('right');
    const isLeft = iconName.includes('left');
    const isUp = iconName.includes('up');
    const isDown = iconName.includes('down');
    const tx = isRight ? 2 : isLeft ? -2 : 0;
    const ty = isDown ? 2 : isUp ? -2 : 0;

    // For pointing-in/pointing-out and compound arrows, use scale-pop
    if (iconName.includes('pointing')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el,
      anim: 'nudge',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
      customProps: {
        tx: elements.length === 1 ? tx : (i === 0 ? tx * 0.5 : tx),
        ty: elements.length === 1 ? ty : (i === 0 ? ty * 0.5 : ty),
      },
    }));
  },

  // ── Communication (chat, envelope, phone, paper-airplane) ──
  'pop-envelope'(elements, iconName) {
    if (iconName.includes('paper-airplane')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('chat') || iconName.includes('phone')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('envelope')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'mail-flap',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('inbox')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // megaphone, rss, share, at-symbol: scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: 'scale-pop',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Playback (play, pause, stop, backward, forward, speaker) ──
  playback(elements, iconName) {
    if (iconName.includes('speaker')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'scale-pop' : 'pulse-element',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('backward')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: -2, ty: 0 },
      }));
    }

    if (iconName.includes('forward')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 2, ty: 0 },
      }));
    }

    if (iconName.includes('camera') || iconName.includes('video')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'scale-pop'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('music') || iconName.includes('radio')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('microphone')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // play, pause, stop, play-circle, pause-circle, stop-circle, play-pause, gif, film, photo
    return elements.map((el, i) => ({
      ...el,
      anim: 'scale-pop',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Files (document, folder, clipboard, book, archive) ──
  unfold(elements, iconName) {
    if (iconName.includes('book')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'page-turn'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // folder, document, clipboard, archive, bookmark, newspaper, paper-clip, queue-list
    // Single-path: use scale-pop (fill barely visible on outlines)
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── UI (cog, check, plus, x, bars, magnifying-glass) ──
  toggle(elements, iconName) {
    if (iconName.includes('cog')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 90 },
      }));
    }

    if (iconName.includes('magnifying-glass')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('bars')) {
      // bars-* are single-path icons — use shake for visible whole-icon animation
      return elements.map((el, i) => ({
        ...el,
        anim: 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('adjustments')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'menu-line',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { scaleX: 0.85 },
      }));
    }

    // check, x, plus, minus, power, funnel, squares, etc: scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: 'scale-pop',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Status (bell, bolt, sparkles, signal, exclamation, info, question) ──
  pulse(elements, iconName) {
    if (iconName.includes('bell')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'bell-ring',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('bolt') || iconName.includes('sparkles')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('signal')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'pulse-element',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('wifi')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'pulse-element',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // exclamation, information, question: single-path uses scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Weather (sun, moon, cloud, fire) ──
  ambient(elements, iconName) {
    if (iconName.includes('sun')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 45 },
      }));
    }

    if (iconName.includes('moon')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: -15 },
      }));
    }

    if (iconName.includes('cloud')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('fire')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Default
    return elements.map((el, i) => ({
      ...el,
      anim: 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Objects (home, lock, rocket, cart, trash, building, etc.) ──
  'bounce-in'(elements, iconName) {
    if (iconName.includes('rocket')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'rocket-lift',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('cart') || iconName.includes('shopping')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('trash')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'shake' : (i === 0 ? 'handle-lift' : 'fill'),
        delay: i,
        colorGroup: i === 0 ? 'secondary' : 'primary',
      }));
    }

    if (iconName.includes('lock')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'shake' : (i === 0 ? 'fill' : 'handle-lift'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('key')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 45 },
      }));
    }

    if (iconName.includes('wrench')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 30 },
      }));
    }

    if (iconName.includes('clock')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 30 },
      }));
    }

    if (iconName.includes('truck')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 2, ty: 0 },
      }));
    }

    // Default: single-path uses scale-pop, multi uses fill+fade
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Editing (pencil, paint-brush, scissors, cursor) ──
  draw(elements, iconName) {
    if (iconName.includes('scissors')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 15 },
      }));
    }

    if (iconName.includes('cursor')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // pencil, paint-brush, eye-dropper, etc: scale-pop + fade
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'scale-pop' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── People (heart, eye, user, hand, face) ──
  wave(elements, iconName) {
    if (iconName.includes('heart')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'heart-beat',
        delay: i,
        colorGroup: 'primary',
      }));
    }

    if (iconName.includes('eye')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'scale-pop'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('hand') || iconName.includes('thumb')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('face') || iconName.includes('smile') || iconName.includes('frown')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // user, users, identification, finger-print: single-path uses scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Navigation (map-pin, globe, compass, flag, calendar) ──
  locate(elements, iconName) {
    if (iconName.includes('map-pin')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'dot-appear'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('globe')) {
      return elements.map((el, i) => ({
        ...el,
        anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('compass')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('flag')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // calendar, viewfinder, map: single-path uses scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Data (chart-bar, chart-pie, server, table, calculator) ──
  'chart-rise'(elements, iconName) {
    if (iconName.includes('chart-bar') || iconName.includes('presentation-chart-bar')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'bar',
        delay: i,
        colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('chart-pie')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('presentation-chart-line')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 1.5, ty: -1.5 },
      }));
    }

    // server, table, calculator, circle-stack, percent-badge: scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: 'scale-pop',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Security (shield, star, qr-code) ──
  shield(elements, iconName) {
    if (iconName.includes('star')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }
    // Shield: single-path uses scale-pop, multi uses fill+fade
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Development (code, terminal, bug, cpu) ──
  'type-in'(elements, iconName) {
    // Single-path: use scale-pop (fill barely visible on outlines)
    return elements.map((el, i) => ({
      ...el,
      anim: elements.length === 1 ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'),
      delay: i,
      colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
    }));
  },
};

// ─── Lookup icon category ────────────────────────────────────────────

function getIconCategory(iconName, categories) {
  for (const [catName, catData] of Object.entries(categories.categories)) {
    if (catData.icons.includes(iconName)) {
      return { category: catName, animation: catData.animation };
    }
  }
  return { category: 'uncategorized', animation: 'toggle' };
}

// ─── CSS Generation ──────────────────────────────────────────────────

function generateAnimationCSS() {
  return `
  /* Delay utilities - 80ms increments */
  .ah-delay-0 { --ah-delay: 0ms; }
  .ah-delay-1 { --ah-delay: 80ms; }
  .ah-delay-2 { --ah-delay: 160ms; }
  .ah-delay-3 { --ah-delay: 240ms; }
  .ah-delay-4 { --ah-delay: 320ms; }
  .ah-delay-5 { --ah-delay: 400ms; }
  .ah-delay-6 { --ah-delay: 480ms; }
  .ah-delay-7 { --ah-delay: 560ms; }

  /* Two-tone colors */
  .ah-primary { stroke: var(--animated-heroicon-primary, var(--ah-primary, currentColor)); }
  .ah-secondary { stroke: var(--animated-heroicon-secondary, var(--ah-secondary, currentColor)); }

  /* ── Fill animation: shape fills with translucent color ── */
  .ah-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-fill,
  .ah-icon-wrapper:hover .ah-anim-fill {
    fill-opacity: 0.18;
  }

  /* ── Draw animation: path re-draws on hover via keyframe ── */
  .ah-anim-draw {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-draw,
  .ah-icon-wrapper:hover .ah-anim-draw {
    animation: ah-draw-in 600ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-draw-in {
    0% { stroke-dashoffset: var(--ah-dash-len, 50); }
    100% { stroke-dashoffset: 0; }
  }

  /* ── Draw-line: shorter lines re-draw on hover ── */
  .ah-anim-draw-line {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-draw-line,
  .ah-icon-wrapper:hover .ah-anim-draw-line {
    animation: ah-draw-line 500ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-draw-line {
    0% { stroke-dashoffset: var(--ah-dash-len, 20); }
    100% { stroke-dashoffset: 0; }
  }

  /* ── Fade animation: subtle pop on hover (fully visible by default) ── */
  .ah-anim-fade {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-fade,
  .ah-icon-wrapper:hover .ah-anim-fade {
    animation: ah-fade-pop 500ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-fade-pop {
    0% { opacity: 0.3; transform: scale(0.92); }
    60% { opacity: 1; transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1); }
  }

  /* ── Dot appear: dot pops on hover (fully visible by default) ── */
  .ah-anim-dot-appear {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-dot-appear,
  .ah-icon-wrapper:hover .ah-anim-dot-appear {
    animation: ah-dot-pop 500ms ease 200ms both;
  }
  @keyframes ah-dot-pop {
    0% { transform: scale(1); }
    40% { transform: scale(0.3); }
    70% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  /* ── Bar animation: bars bounce on hover (full size by default) ── */
  .ah-anim-bar {
    transform-origin: center bottom;
  }
  .animated-heroicon:hover .ah-anim-bar,
  .ah-icon-wrapper:hover .ah-anim-bar {
    animation: ah-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms) both;
  }
  @keyframes ah-bar-grow {
    0% { transform: scaleY(0.2); }
    60% { transform: scaleY(1.08); }
    100% { transform: scaleY(1); }
  }

  /* ── Scale-pop: element pops with scale ── */
  .ah-anim-scale-pop {
    transform-origin: center;
  }
  .animated-heroicon:hover .ah-anim-scale-pop,
  .ah-icon-wrapper:hover .ah-anim-scale-pop {
    animation: ah-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms) both;
  }
  @keyframes ah-scale-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  /* ── Pulse element: pulsing opacity for attention ── */
  .ah-anim-pulse-element {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-pulse-element,
  .ah-icon-wrapper:hover .ah-anim-pulse-element {
    animation: ah-pulse 0.7s ease-in-out;
  }
  @keyframes ah-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── Gear: rotation on hover ── */
  .ah-anim-gear {
    transform-origin: 12px 12px;
    transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-gear,
  .ah-icon-wrapper:hover .ah-anim-gear {
    transform: rotate(var(--ah-rotation, 90deg));
  }

  /* ── Nudge: translate in a direction ── */
  .ah-anim-nudge {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-nudge,
  .ah-icon-wrapper:hover .ah-anim-nudge {
    transform: translate(var(--ah-tx, 0px), var(--ah-ty, 0px));
  }

  /* ── Bell ring: keyframe ring animation ── */
  .ah-anim-bell-ring {
    transform-origin: 12px 3px;
  }
  .animated-heroicon:hover .ah-anim-bell-ring,
  .ah-icon-wrapper:hover .ah-anim-bell-ring {
    animation: ah-bell-ring 0.7s ease;
  }
  @keyframes ah-bell-ring {
    0% { transform: rotate(0deg); }
    12% { transform: rotate(14deg); }
    24% { transform: rotate(-12deg); }
    36% { transform: rotate(8deg); }
    48% { transform: rotate(-5deg); }
    60% { transform: rotate(2deg); }
    100% { transform: rotate(0deg); }
  }

  /* ── Heart beat: keyframe scale ── */
  .ah-anim-heart-beat {
    transform-origin: 12px 13px;
  }
  .animated-heroicon:hover .ah-anim-heart-beat,
  .ah-icon-wrapper:hover .ah-anim-heart-beat {
    animation: ah-heart-beat 0.8s ease;
  }
  @keyframes ah-heart-beat {
    0% { transform: scale(1); }
    15% { transform: scale(1.2); }
    30% { transform: scale(1); }
    45% { transform: scale(1.15); }
    60% { transform: scale(1); }
  }

  /* ── Rocket lift ── */
  .ah-anim-rocket-lift {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-rocket-lift,
  .ah-icon-wrapper:hover .ah-anim-rocket-lift {
    transform: translate(1px, -1.5px);
  }

  /* ── Handle lift (trash lid, lock shackle) ── */
  .ah-anim-handle-lift {
    transition: transform 500ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-handle-lift,
  .ah-icon-wrapper:hover .ah-anim-handle-lift {
    transform: translateY(-1.5px);
  }

  /* ── Page turn ── */
  .ah-anim-page-turn {
    transform-origin: left center;
    transition: transform 500ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-page-turn,
  .ah-icon-wrapper:hover .ah-anim-page-turn {
    transform: rotateY(-12deg);
  }

  /* ── Menu line (staggered scaleX) ── */
  .ah-anim-menu-line {
    transform-origin: left center;
    transition: transform 400ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-menu-line,
  .ah-icon-wrapper:hover .ah-anim-menu-line {
    transform: scaleX(var(--ah-scale-x, 0.7));
  }

  /* ── Mail flap: envelope opens and closes ── */
  .ah-anim-mail-flap {
    transform-origin: center top;
  }
  .animated-heroicon:hover .ah-anim-mail-flap,
  .ah-icon-wrapper:hover .ah-anim-mail-flap {
    animation: ah-mail-flap 700ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-mail-flap {
    0% { transform: rotateX(0deg); }
    40% { transform: rotateX(-30deg); }
    70% { transform: rotateX(5deg); }
    100% { transform: rotateX(0deg); }
  }

  /* ── Shake: horizontal wobble ── */
  .ah-anim-shake {
    transform-origin: center;
  }
  .animated-heroicon:hover .ah-anim-shake,
  .ah-icon-wrapper:hover .ah-anim-shake {
    animation: ah-shake 600ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-shake {
    0% { transform: translateX(0) rotate(0deg); }
    15% { transform: translateX(-1.5px) rotate(-3deg); }
    30% { transform: translateX(1.5px) rotate(3deg); }
    45% { transform: translateX(-1px) rotate(-2deg); }
    60% { transform: translateX(1px) rotate(2deg); }
    75% { transform: translateX(-0.5px) rotate(-1deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  /* ── Spin: full 360 rotation ── */
  .ah-anim-spin {
    transform-origin: 12px 12px;
  }
  .animated-heroicon:hover .ah-anim-spin,
  .ah-icon-wrapper:hover .ah-anim-spin {
    animation: ah-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--ah-delay, 0ms) both;
  }
  @keyframes ah-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
}

// ─── Generate Animated SVG ──────────────────────────────────────────

function generateAnimatedSvg(iconName, svgContent, animationType) {
  const elements = parseSvgElements(svgContent);
  const strategy = animationStrategies[animationType] || animationStrategies.toggle;
  const animatedElements = strategy(elements, iconName);
  const label = toLabel(iconName);

  let innerSvg = '';
  animatedElements.forEach((el) => {
    const colorClass = el.colorGroup === 'primary' ? 'ah-primary' : 'ah-secondary';
    const delayClass = `ah-delay-${Math.min(el.delay || 0, 7)}`;
    const animClass = `ah-anim-${el.anim}`;

    let attrs = '';
    for (const [key, val] of Object.entries(el.attrs)) {
      attrs += ` ${key}="${val}"`;
    }

    // Add stroke-dash attrs for draw animations
    let extraAttrs = '';
    if (el.anim === 'draw' || el.anim === 'draw-line') {
      const len = Math.ceil(estimatePathLength(el));
      extraAttrs += ` stroke-dasharray="${len}"`;
      if (!el.customProps) el.customProps = {};
      el.customProps.dashLen = len;
    }

    // Add custom CSS properties as style
    let style = '';
    if (el.customProps) {
      const parts = [];
      if (el.customProps.rotation !== undefined) parts.push(`--ah-rotation: ${el.customProps.rotation}deg`);
      if (el.customProps.tx !== undefined) parts.push(`--ah-tx: ${el.customProps.tx}px`);
      if (el.customProps.ty !== undefined) parts.push(`--ah-ty: ${el.customProps.ty}px`);
      if (el.customProps.scaleX !== undefined) parts.push(`--ah-scale-x: ${el.customProps.scaleX}`);
      if (el.customProps.dashLen !== undefined) parts.push(`--ah-dash-len: ${el.customProps.dashLen}`);
      if (parts.length) style = ` style="${parts.join('; ')}"`;
    }

    innerSvg += `  <${el.tag}${attrs}${extraAttrs} class="${colorClass} ${animClass} ${delayClass}"${style} />\n`;
  });

  const css = `<style>${generateAnimationCSS()}</style>`;

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  overflow="visible"
  class="animated-heroicon animated-heroicon-${iconName}"
  role="img"
  aria-label="${label}"
>
  <title>${label}</title>
${css}
${innerSvg}</svg>`;
}

// ─── Generate React Component ───────────────────────────────────────

function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function generateReactComponent(iconName, svgContent, animationType) {
  const elements = parseSvgElements(svgContent);
  const strategy = animationStrategies[animationType] || animationStrategies.toggle;
  const animatedElements = strategy(elements, iconName);
  const componentName = toPascalCase(iconName);
  const label = toLabel(iconName);

  let elementsJsx = '';
  animatedElements.forEach((el) => {
    const colorClass = el.colorGroup === 'primary' ? 'ah-primary' : 'ah-secondary';
    const delayClass = `ah-delay-${Math.min(el.delay || 0, 7)}`;
    const animClass = `ah-anim-${el.anim}`;

    let attrs = '';
    for (const [key, val] of Object.entries(el.attrs)) {
      const reactKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      attrs += ` ${reactKey}="${val}"`;
    }

    let extraAttrs = '';
    if (el.anim === 'draw' || el.anim === 'draw-line') {
      const len = Math.ceil(estimatePathLength(el));
      extraAttrs += ` strokeDasharray="${len}"`;
      if (!el.customProps) el.customProps = {};
      el.customProps.dashLen = len;
    }

    let styleObj = '{}';
    if (el.customProps) {
      const parts = [];
      if (el.customProps.rotation !== undefined) parts.push(`'--ah-rotation': '${el.customProps.rotation}deg'`);
      if (el.customProps.tx !== undefined) parts.push(`'--ah-tx': '${el.customProps.tx}px'`);
      if (el.customProps.ty !== undefined) parts.push(`'--ah-ty': '${el.customProps.ty}px'`);
      if (el.customProps.scaleX !== undefined) parts.push(`'--ah-scale-x': '${el.customProps.scaleX}'`);
      if (el.customProps.dashLen !== undefined) parts.push(`'--ah-dash-len': '${el.customProps.dashLen}'`);
      styleObj = `{ ${parts.join(', ')} }`;
    }

    elementsJsx += `        <${el.tag}${attrs}${extraAttrs} className="${colorClass} ${animClass} ${delayClass}" style={${styleObj}} />\n`;
  });

  const cssText = '`' + generateAnimationCSS() + '`';

  return `import React, { forwardRef } from 'react';

const cssText = ${cssText};

const ${componentName} = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = '${label}',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '--ah-primary': primaryColor || color,
    '--ah-secondary': secondaryColor || color,
    ...style,
  };

  return (
    <>
      <style>{cssText}</style>
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={\`animated-heroicon animated-heroicon-${iconName} \${className}\`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
${elementsJsx}      </svg>
    </>
  );
});

${componentName}.displayName = '${componentName}';

export { ${componentName} };
export default ${componentName};
`;
}

// ─── Main Build ─────────────────────────────────────────────────────

function build() {
  console.log('Building Animated Heroicons...\n');

  // Verify heroicons source exists
  if (!fs.existsSync(HEROICONS_DIR)) {
    console.error('Heroicons source not found at: ' + HEROICONS_DIR);
    console.error('Make sure heroicons is installed in the animated-lucide project.');
    process.exit(1);
  }

  const categories = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));

  // Create output directories
  [OUT_SVG, OUT_REACT, OUT_CSS, GALLERY_DATA, SRC_ICONS].forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });

  const galleryIcons = [];
  const indexExports = [];

  let processed = 0;
  let singlePathCount = 0;
  let multiPathCount = 0;

  // Read all SVGs from heroicons/24/outline/
  const allIconFiles = fs.readdirSync(HEROICONS_DIR).filter(f => f.endsWith('.svg')).sort();
  const allIconNames = allIconFiles.map(f => f.replace('.svg', ''));

  console.log('  Found ' + allIconFiles.length + ' heroicon SVGs.\n');

  for (const iconName of allIconNames) {
    const svgPath = path.join(HEROICONS_DIR, iconName + '.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    // Copy source SVG to src/icons/ for reference
    fs.writeFileSync(path.join(SRC_ICONS, iconName + '.svg'), svgContent);

    const { category, animation } = getIconCategory(iconName, categories);
    const elements = parseSvgElements(svgContent);
    const elementCount = elements.length;

    if (elementCount === 1) {
      singlePathCount++;
    } else {
      multiPathCount++;
    }

    // Generate animated SVG
    const animatedSvg = generateAnimatedSvg(iconName, svgContent, animation);
    fs.writeFileSync(path.join(OUT_SVG, iconName + '.svg'), animatedSvg);

    // Generate React component
    const reactComponent = generateReactComponent(iconName, svgContent, animation);
    const componentName = toPascalCase(iconName);
    fs.writeFileSync(path.join(OUT_REACT, componentName + '.jsx'), reactComponent);
    indexExports.push("export { default as " + componentName + " } from './" + componentName + "';");

    // Gallery metadata
    galleryIcons.push({
      name: iconName,
      componentName,
      category,
      animation,
      elementCount,
    });

    processed++;
  }

  // Write shared CSS file
  const sharedCss = '/* Animated Heroicons - Shared Animation Styles */\n:root {\n  --animated-heroicon-primary: currentColor;\n  --animated-heroicon-secondary: currentColor;\n}\n' + generateAnimationCSS();

  fs.writeFileSync(path.join(OUT_CSS, 'animated-heroicons.css'), sharedCss);

  // Write React index.js with all exports
  indexExports.push('');
  indexExports.push('// Re-export all icon names for programmatic access');
  indexExports.push('export const iconNames = ' + JSON.stringify(allIconNames) + ';');
  fs.writeFileSync(path.join(OUT_REACT, 'index.js'), indexExports.join('\n') + '\n');

  // Write gallery data
  fs.writeFileSync(path.join(GALLERY_DATA, 'heroicons-icons.json'), JSON.stringify(galleryIcons, null, 2));

  console.log('  Processed: ' + processed + ' icons total');
  console.log('    Single-path: ' + singlePathCount);
  console.log('    Multi-path:  ' + multiPathCount);
  console.log('');
  console.log('  Output:');
  console.log('    SVGs:       ' + OUT_SVG + '/');
  console.log('    React:      ' + OUT_REACT + '/');
  console.log('    CSS:        ' + OUT_CSS + '/');
  console.log('    Gallery:    ' + GALLERY_DATA + '/icons.json');
  console.log('    Source:     ' + SRC_ICONS + '/');
  console.log('');
  console.log('  Done!');
}

build();
