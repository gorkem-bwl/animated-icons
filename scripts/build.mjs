#!/usr/bin/env node

/**
 * Animated Lucide Build Script
 *
 * Uses CSS transitions (not keyframe animations) for rich, semantic SVG animations.
 * Inspired by the pattern: transition properties on elements, triggered by .group:hover.
 *
 * Animation types:
 * - fill: Shape fills with translucent currentColor on hover
 * - draw: Path draws in via stroke-dashoffset transition
 * - fade: Element fades in on hover
 * - transform: Element moves/scales/rotates via CSS transition
 * - bar: Bar grows via scaleY from bottom
 *
 * Each element gets an animation class + a stagger delay class.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'node_modules/lucide-static/icons');
const CATEGORIES_FILE = path.join(ROOT, 'src/data/categories.json');
const OUT_DIR = path.join(ROOT, 'dist');
const OUT_SVG = path.join(OUT_DIR, 'svg');
const OUT_REACT = path.join(OUT_DIR, 'react');
const OUT_CSS = path.join(OUT_DIR, 'css');
const GALLERY_DATA = path.join(ROOT, 'gallery/src/data');

const INITIAL_SUBSET = [
  // Arrows & directional
  'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
  'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
  'redo', 'undo', 'refresh-cw', 'refresh-ccw', 'rotate-cw',
  // Communication
  'mail', 'mail-open', 'mail-check', 'send', 'message-circle', 'message-square',
  'inbox', 'reply', 'forward', 'at-sign',
  // Media
  'play', 'pause', 'skip-forward', 'volume-1', 'volume-2',
  'mic', 'headphones', 'camera', 'video', 'music', 'image', 'film',
  // Files & documents
  'file', 'file-text', 'file-code', 'folder', 'folder-open',
  'clipboard', 'book-open', 'bookmark', 'notebook',
  // UI controls
  'check', 'check-circle', 'x', 'x-circle', 'plus', 'plus-circle', 'minus',
  'menu', 'settings', 'search', 'sliders', 'external-link', 'link', 'toggle-left',
  // Status & alerts
  'bell', 'bell-ring', 'alert-triangle', 'alert-circle', 'info', 'help-circle',
  'loader', 'zap', 'wifi', 'activity', 'timer',
  // Weather & nature
  'sun', 'cloud', 'cloud-rain', 'moon', 'snowflake',
  'wind', 'star', 'sunrise', 'sunset',
  // Objects
  'home', 'building', 'lock', 'lock-open', 'key',
  'trash-2', 'archive', 'package', 'gift', 'shopping-cart',
  'car', 'bike', 'rocket', 'lightbulb',
  // Editing & text
  'pencil', 'pen', 'eraser', 'copy', 'scissors',
  'bold', 'italic', 'align-left', 'list', 'crop', 'palette',
  // People & social
  'user', 'user-plus', 'users', 'heart', 'eye', 'smile', 'frown',
  'thumbs-up', 'hand', 'brain', 'fingerprint',
  // Navigation & location
  'map-pin', 'map', 'globe', 'compass', 'navigation', 'locate', 'flag',
  // Data & charts
  'bar-chart-2', 'line-chart', 'pie-chart', 'trending-up', 'trending-down',
  'database', 'server', 'table', 'calculator',
  // Security
  'shield', 'shield-check', 'scan', 'qr-code',
  // Development
  'code', 'code-2', 'terminal', 'terminal-square',
  'git-branch', 'git-commit', 'git-merge', 'bug',
  'wrench', 'cpu', 'box', 'puzzle',
  // Actions & system
  'download', 'upload', 'share-2', 'log-in', 'log-out', 'power', 'save', 'printer',
  'bluetooth', 'clock', 'calendar', 'phone', 'smartphone', 'laptop', 'monitor', 'tv',
  'hash', 'percent', 'filter', 'layers',
];

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
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
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
    return Math.PI * (3*(rx+ry) - Math.sqrt((3*rx+ry)*(rx+3*ry)));
  }
  if (el.tag === 'polyline' || el.tag === 'polygon') {
    const pts = (el.attrs.points || '').trim().split(/[\s,]+/).map(Number);
    let len = 0;
    for (let i = 2; i < pts.length; i += 2) {
      len += Math.sqrt((pts[i]-pts[i-2])**2 + (pts[i+1]-pts[i-1])**2);
    }
    if (el.tag === 'polygon' && pts.length >= 4) {
      len += Math.sqrt((pts[0]-pts[pts.length-2])**2 + (pts[1]-pts[pts.length-1])**2);
    }
    return len;
  }
  // path: rough estimate based on d attribute length
  const d = el.attrs.d || '';
  const coords = d.match(/[-+]?\d*\.?\d+/g) || [];
  if (coords.length < 4) return 20;
  let len = 0;
  for (let i = 2; i < coords.length; i += 2) {
    if (i+1 < coords.length) {
      const dx = parseFloat(coords[i]) - parseFloat(coords[i-2]);
      const dy = parseFloat(coords[i+1]) - parseFloat(coords[i-1]);
      len += Math.sqrt(dx*dx + dy*dy);
    }
  }
  return Math.max(len, 10);
}

// ─── Element Classification ─────────────────────────────────────────
// Classify SVG elements by their role in the icon

function classifyElement(el, index, total, iconName) {
  const tag = el.tag;
  const d = el.attrs.d || '';
  const r = parseFloat(el.attrs.r || 0);
  const w = parseFloat(el.attrs.width || 0);
  const h = parseFloat(el.attrs.height || 0);

  // Small circles (dots, pupils) → detail
  if (tag === 'circle' && r <= 1.5) return 'dot';

  // Large circles (heads, main shapes) → container
  if (tag === 'circle' && r >= 4) return 'container';

  // Large rects → container
  if (tag === 'rect' && w >= 10 && h >= 10) return 'container';

  // Short paths (checkmarks, small details)
  const pathLen = estimatePathLength(el);
  if (tag === 'path' && pathLen < 15) return 'detail';

  // Lines → detail
  if (tag === 'line') return 'detail';

  // First element is often the main shape
  if (index === 0 && total > 1) return 'container';

  // Last elements tend to be details
  if (index === total - 1 && total > 2) return 'detail';

  return 'body';
}

// ─── Animation Assignment Engine ────────────────────────────────────
// Each strategy assigns animation properties to elements

const animationStrategies = {

  // ── Directional (arrows, chevrons, redo/undo, refresh) ──
  directional(elements, iconName) {
    const isRefresh = iconName.includes('refresh') || iconName.includes('rotate');

    if (isRefresh) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'spin',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Redo/undo: full spin
    if (iconName === 'redo' || iconName === 'undo') {
      return elements.map((el, i) => ({
        ...el,
        anim: 'spin',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Determine direction
    const isRight = iconName.includes('right') || iconName.includes('redo');
    const isLeft = iconName.includes('left') || iconName.includes('undo');
    const isUp = iconName.includes('up');
    const isDown = iconName.includes('down') || iconName.includes('chevron-down');
    const tx = isRight ? 2 : isLeft ? -2 : 0;
    const ty = isDown ? 2 : isUp ? -2 : 0;

    return elements.map((el, i) => ({
      ...el,
      anim: 'nudge',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
      customProps: { tx: i === 0 ? tx * 0.5 : tx, ty: i === 0 ? ty * 0.5 : ty },
    }));
  },

  // ── Communication (mail, send, message, inbox) ──
  'pop-envelope'(elements, iconName) {
    if (iconName.includes('send')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('message')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('inbox')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Mail: flap opens/closes, body fills
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'mail-flap' : 'fill',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Playback (play, volume, camera, music) ──
  playback(elements, iconName) {
    if (iconName.includes('volume') || iconName.includes('speaker')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'scale-pop' : 'pulse-element',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('camera')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : (classifyElement(el, i, elements.length, iconName) === 'container' ? 'fill' : 'scale-pop'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('music') || iconName.includes('audio')) {
      return elements.map((el, i) => ({
        ...el,
        anim: el.tag === 'circle' ? 'scale-pop' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // rewind, fast-forward, skip: nudge in direction
    if (iconName.includes('rewind') || iconName.includes('skip-back') || iconName.includes('chevron-first')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: -2, ty: 0 },
      }));
    }

    if (iconName.includes('fast-forward') || iconName.includes('skip-forward') || iconName.includes('chevron-last')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 2, ty: 0 },
      }));
    }

    // mic: scale-pop
    if (iconName.includes('mic')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // play, pause, stop, headphones, etc: scale-pop
    return elements.map((el, i) => ({
      ...el,
      anim: 'scale-pop',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Files (file, folder, clipboard, book) ──
  unfold(elements, iconName) {
    const isBook = iconName.includes('book');
    if (isBook) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : (el.tag === 'line' ? 'fade' : 'page-turn'),
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Folder, file, clipboard: fill on main shape, fade on details
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'fill' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── UI (check, x, plus, menu, settings, search) ──
  toggle(elements, iconName) {
    if (iconName.includes('settings')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'gear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 90 },
      }));
    }

    if (iconName.includes('search')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'scale-pop' : 'fill',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('menu')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'menu-line',
        delay: i,
        colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
        customProps: { scaleX: 1 - i * 0.15 },
      }));
    }

    // check, x, plus: scale-pop on all elements (no draw/dasharray)
    return elements.map((el, i) => ({
      ...el,
      anim: 'scale-pop',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Status (bell, alert, loader, zap) ──
  pulse(elements, iconName) {
    if (iconName.includes('bell')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'bell-ring' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('alert')) {
      return elements.map((el, i) => {
        const role = classifyElement(el, i, elements.length, iconName);
        return {
          ...el,
          anim: role === 'container' ? 'fill' : 'pulse-element',
          delay: i,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        };
      });
    }

    if (iconName.includes('loader')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'spin',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('zap')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Default: fill containers, fade details
    return elements.map((el, i) => {
      const role = classifyElement(el, i, elements.length, iconName);
      return {
        ...el,
        anim: role === 'container' ? 'fill' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      };
    });
  },

  // ── Weather (sun, moon, cloud, snow) ──
  ambient(elements, iconName) {
    if (iconName.includes('sun')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'gear' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: i === 0 ? { rotation: 45 } : undefined,
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
        anim: i === 0 ? 'fill' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // snow, etc
    return elements.map((el, i) => ({
      ...el,
      anim: 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Objects (home, lock, trash, cart, rocket) ──
  'bounce-in'(elements, iconName) {
    if (iconName.includes('rocket')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'rocket-lift',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('trash')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'handle-lift' : 'fill',
        delay: i,
        colorGroup: i === 0 ? 'secondary' : 'primary',
      }));
    }

    if (iconName.includes('cart')) {
      return elements.map((el, i) => ({
        ...el,
        anim: el.tag === 'circle' ? 'fill' : 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Default: fill on first, fade on rest
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'fill' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Editing (pencil, copy, scissors) ──
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

    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'scale-pop' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── People (user, heart, eye, smile) ──
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
        anim: i === 0 ? 'fill' : 'scale-pop',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('smile') || iconName.includes('frown') || iconName.includes('meh')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // user, fingerprint: fill on circles, fade on body
    return elements.map((el, i) => ({
      ...el,
      anim: el.tag === 'circle' ? 'fill' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Navigation (map-pin, globe, compass) ──
  locate(elements, iconName) {
    if (iconName.includes('pin')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'dot-appear',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('globe')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('compass')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('navigation')) {
      return elements.map((el, i) => ({
        ...el,
        anim: 'rocket-lift',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('flag')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'shake',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Default: scale-pop is always visible
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'scale-pop' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Data (bar-chart, trending, database) ──
  'chart-rise'(elements, iconName) {
    if (iconName.includes('bar-chart')) {
      // Helper: detect bar-like elements (vertical/horizontal lines drawn as paths, rects, or actual lines)
      const isBarElement = (el) => {
        if (el.tag === 'line') return true;
        if (el.tag === 'rect') return true;
        if (el.tag === 'path') {
          const d = el.attrs.d || '';
          // Vertical bars: e.g. "M5 21v-6" or "M12 21V3"
          if (/^M[\d.\s]+[vV][-\d.]+\s*$/.test(d.trim())) return true;
          // Horizontal bars: e.g. "M7 16h8" or "M7 11h12"
          if (/^M[\d.\s]+[hH][-\d.]+\s*$/.test(d.trim())) return true;
        }
        return false;
      };

      return elements.map((el, i) => {
        if (isBarElement(el)) {
          return {
            ...el,
            anim: 'bar',
            delay: i,
            colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
          };
        }
        // Axis lines or containers get fill
        return {
          ...el,
          anim: 'fill',
          delay: 0,
          colorGroup: 'primary',
        };
      });
    }

    if (iconName.includes('line-chart')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'fill' : 'draw',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('trending')) {
      const isUp = iconName.includes('up');
      return elements.map((el, i) => ({
        ...el,
        anim: 'nudge',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 1.5, ty: isUp ? -1.5 : 1.5 },
      }));
    }

    if (iconName.includes('pie-chart')) {
      return elements.map((el, i) => ({
        ...el,
        anim: i === 0 ? 'gear' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: i === 0 ? { rotation: 45 } : undefined,
      }));
    }

    // database, server, table, calculator, etc
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'fill' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Security (shield, key, fingerprint) ──
  shield(elements, iconName) {
    if (iconName.includes('key')) {
      return elements.map((el, i) => ({
        ...el,
        anim: el.tag === 'circle' ? 'fill' : 'fade',
        delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    // Shield: container fills, inner elements fade
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'fill' : 'fade',
      delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  // ── Development (code, terminal, git, bug) ──
  'type-in'(elements, iconName) {
    return elements.map((el, i) => ({
      ...el,
      anim: i === 0 ? 'fill' : 'fade',
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
// Generates the shared animation CSS that goes in <style> tags

function generateAnimationCSS() {
  return `
  /* Delay utilities — 80ms increments */
  .al-delay-0 { --al-delay: 0ms; }
  .al-delay-1 { --al-delay: 80ms; }
  .al-delay-2 { --al-delay: 160ms; }
  .al-delay-3 { --al-delay: 240ms; }
  .al-delay-4 { --al-delay: 320ms; }
  .al-delay-5 { --al-delay: 400ms; }
  .al-delay-6 { --al-delay: 480ms; }
  .al-delay-7 { --al-delay: 560ms; }

  /* Two-tone colors — no opacity tricks, just two real colors */
  .al-primary { stroke: var(--animated-lucide-primary, var(--al-primary, currentColor)); }
  .al-secondary { stroke: var(--animated-lucide-secondary, var(--al-secondary, currentColor)); }

  /* ── Fill animation: shape fills with translucent color ── */
  .al-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-fill,
  .al-icon-wrapper:hover .al-anim-fill {
    fill-opacity: 0.18;
  }

  /* ── Draw animation: path re-draws on hover via keyframe ── */
  .al-anim-draw {
    /* Fully visible by default */
  }
  .animated-lucide-icon:hover .al-anim-draw,
  .al-icon-wrapper:hover .al-anim-draw {
    animation: al-draw-in 600ms ease var(--al-delay, 0ms) both;
  }
  @keyframes al-draw-in {
    0% { stroke-dashoffset: var(--al-dash-len, 50); }
    100% { stroke-dashoffset: 0; }
  }

  /* ── Draw-line: shorter lines re-draw on hover ── */
  .al-anim-draw-line {
    /* Fully visible by default */
  }
  .animated-lucide-icon:hover .al-anim-draw-line,
  .al-icon-wrapper:hover .al-anim-draw-line {
    animation: al-draw-line 500ms ease var(--al-delay, 0ms) both;
  }
  @keyframes al-draw-line {
    0% { stroke-dashoffset: var(--al-dash-len, 20); }
    100% { stroke-dashoffset: 0; }
  }

  /* ── Fade animation: subtle pop on hover (fully visible by default) ── */
  .al-anim-fade {
    /* Fully visible by default */
  }
  .animated-lucide-icon:hover .al-anim-fade,
  .al-icon-wrapper:hover .al-anim-fade {
    animation: al-fade-pop 500ms ease var(--al-delay, 0ms) both;
  }
  @keyframes al-fade-pop {
    0% { opacity: 0.3; transform: scale(0.92); }
    60% { opacity: 1; transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1); }
  }

  /* ── Dot appear: dot pops on hover (fully visible by default) ── */
  .al-anim-dot-appear {
    /* Fully visible by default */
  }
  .animated-lucide-icon:hover .al-anim-dot-appear,
  .al-icon-wrapper:hover .al-anim-dot-appear {
    animation: al-dot-pop 500ms ease 200ms both;
  }
  @keyframes al-dot-pop {
    0% { transform: scale(1); }
    40% { transform: scale(0.3); }
    70% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  /* ── Bar animation: bars bounce on hover (full size by default) ── */
  .al-anim-bar {
    transform-origin: center bottom;
  }
  .animated-lucide-icon:hover .al-anim-bar,
  .al-icon-wrapper:hover .al-anim-bar {
    animation: al-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms) both;
  }
  @keyframes al-bar-grow {
    0% { transform: scaleY(0.2); }
    60% { transform: scaleY(1.08); }
    100% { transform: scaleY(1); }
  }

  /* ── Scale-pop: element pops with scale ── */
  .al-anim-scale-pop {
    transform-origin: center;
  }
  .animated-lucide-icon:hover .al-anim-scale-pop,
  .al-icon-wrapper:hover .al-anim-scale-pop {
    animation: al-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms) both;
  }
  @keyframes al-scale-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  /* ── Pulse element: pulsing opacity for attention ── */
  .al-anim-pulse-element {
    /* Fully visible by default */
  }
  .animated-lucide-icon:hover .al-anim-pulse-element,
  .al-icon-wrapper:hover .al-anim-pulse-element {
    animation: al-pulse 0.7s ease-in-out;
  }
  @keyframes al-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── Gear: rotation on hover ── */
  .al-anim-gear {
    transform-origin: 12px 12px;
    transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-gear,
  .al-icon-wrapper:hover .al-anim-gear {
    transform: rotate(var(--al-rotation, 90deg));
  }

  /* ── Nudge: translate in a direction ── */
  .al-anim-nudge {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-nudge,
  .al-icon-wrapper:hover .al-anim-nudge {
    transform: translate(var(--al-tx, 0px), var(--al-ty, 0px));
  }

  /* ── Bell ring: keyframe ring animation ── */
  .al-anim-bell-ring {
    transform-origin: 12px 3px;
  }
  .animated-lucide-icon:hover .al-anim-bell-ring,
  .al-icon-wrapper:hover .al-anim-bell-ring {
    animation: al-bell-ring 0.7s ease;
  }
  @keyframes al-bell-ring {
    0% { transform: rotate(0deg); }
    12% { transform: rotate(14deg); }
    24% { transform: rotate(-12deg); }
    36% { transform: rotate(8deg); }
    48% { transform: rotate(-5deg); }
    60% { transform: rotate(2deg); }
    100% { transform: rotate(0deg); }
  }

  /* ── Heart beat: keyframe scale ── */
  .al-anim-heart-beat {
    transform-origin: 12px 13px;
  }
  .animated-lucide-icon:hover .al-anim-heart-beat,
  .al-icon-wrapper:hover .al-anim-heart-beat {
    animation: al-heart-beat 0.8s ease;
  }
  @keyframes al-heart-beat {
    0% { transform: scale(1); }
    15% { transform: scale(1.2); }
    30% { transform: scale(1); }
    45% { transform: scale(1.15); }
    60% { transform: scale(1); }
  }

  /* ── Rocket lift ── */
  .al-anim-rocket-lift {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-rocket-lift,
  .al-icon-wrapper:hover .al-anim-rocket-lift {
    transform: translate(1px, -1.5px);
  }

  /* ── Handle lift (trash lid, briefcase handle) ── */
  .al-anim-handle-lift {
    transition: transform 500ms ease var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-handle-lift,
  .al-icon-wrapper:hover .al-anim-handle-lift {
    transform: translateY(-1.5px);
  }

  /* ── Page turn ── */
  .al-anim-page-turn {
    transform-origin: left center;
    transition: transform 500ms ease var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-page-turn,
  .al-icon-wrapper:hover .al-anim-page-turn {
    transform: rotateY(-12deg);
  }

  /* ── Menu line (staggered scaleX) ── */
  .al-anim-menu-line {
    transform-origin: left center;
    transition: transform 400ms ease var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-menu-line,
  .al-icon-wrapper:hover .al-anim-menu-line {
    transform: scaleX(var(--al-scale-x, 0.7));
  }

  /* ── Mail flap: envelope opens and closes ── */
  .al-anim-mail-flap {
    transform-origin: center top;
  }
  .animated-lucide-icon:hover .al-anim-mail-flap,
  .al-icon-wrapper:hover .al-anim-mail-flap {
    animation: al-mail-flap 700ms ease var(--al-delay, 0ms) both;
  }
  @keyframes al-mail-flap {
    0% { transform: rotateX(0deg); }
    40% { transform: rotateX(-30deg); }
    70% { transform: rotateX(5deg); }
    100% { transform: rotateX(0deg); }
  }

  /* ── Shake: horizontal wobble ── */
  .al-anim-shake {
    transform-origin: center;
  }
  .animated-lucide-icon:hover .al-anim-shake,
  .al-icon-wrapper:hover .al-anim-shake {
    animation: al-shake 600ms ease var(--al-delay, 0ms) both;
  }
  @keyframes al-shake {
    0% { transform: translateX(0) rotate(0deg); }
    15% { transform: translateX(-1.5px) rotate(-3deg); }
    30% { transform: translateX(1.5px) rotate(3deg); }
    45% { transform: translateX(-1px) rotate(-2deg); }
    60% { transform: translateX(1px) rotate(2deg); }
    75% { transform: translateX(-0.5px) rotate(-1deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  /* ── Spin: full 360 rotation ── */
  .al-anim-spin {
    transform-origin: 12px 12px;
  }
  .animated-lucide-icon:hover .al-anim-spin,
  .al-icon-wrapper:hover .al-anim-spin {
    animation: al-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--al-delay, 0ms) both;
  }
  @keyframes al-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
}

// ─── Generate Animated SVG ──────────────────────────────────────────

function generateAnimatedSvg(iconName, svgContent, animationType) {
  const elements = parseSvgElements(svgContent);
  const strategy = animationStrategies[animationType] || animationStrategies.draw;
  const animatedElements = strategy(elements, iconName);
  const label = toLabel(iconName);
  const svgAttrs = extractSvgAttrs(svgContent);

  let innerSvg = '';
  animatedElements.forEach((el, i) => {
    const colorClass = el.colorGroup === 'primary' ? 'al-primary' : 'al-secondary';
    const delayClass = `al-delay-${Math.min(el.delay || 0, 7)}`;
    const animClass = `al-anim-${el.anim}`;

    let attrs = '';
    for (const [key, val] of Object.entries(el.attrs)) {
      attrs += ` ${key}="${val}"`;
    }

    // Add stroke-dash attrs for draw animations — only dasharray + CSS var for keyframe length
    // Do NOT set stroke-dashoffset so the path stays fully visible by default
    let extraAttrs = '';
    if (el.anim === 'draw' || el.anim === 'draw-line') {
      const len = Math.ceil(estimatePathLength(el));
      extraAttrs += ` stroke-dasharray="${len}"`;
      // The keyframe reads --al-dash-len to know how far to animate
      if (!el.customProps) el.customProps = {};
      el.customProps.dashLen = len;
    }

    // Add custom CSS properties as style
    let style = '';
    if (el.customProps) {
      const parts = [];
      if (el.customProps.rotation !== undefined) parts.push(`--al-rotation: ${el.customProps.rotation}deg`);
      if (el.customProps.tx !== undefined) parts.push(`--al-tx: ${el.customProps.tx}px`);
      if (el.customProps.ty !== undefined) parts.push(`--al-ty: ${el.customProps.ty}px`);
      if (el.customProps.scaleX !== undefined) parts.push(`--al-scale-x: ${el.customProps.scaleX}`);
      if (el.customProps.dashLen !== undefined) parts.push(`--al-dash-len: ${el.customProps.dashLen}`);
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
  stroke-width="${svgAttrs['stroke-width'] || '2'}"
  stroke-linecap="${svgAttrs['stroke-linecap'] || 'round'}"
  stroke-linejoin="${svgAttrs['stroke-linejoin'] || 'round'}"
  overflow="hidden"
  class="animated-lucide-icon animated-lucide-${iconName}"
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
  const strategy = animationStrategies[animationType] || animationStrategies.draw;
  const animatedElements = strategy(elements, iconName);
  const componentName = toPascalCase(iconName);
  const label = toLabel(iconName);

  let elementsJsx = '';
  animatedElements.forEach((el, i) => {
    const colorClass = el.colorGroup === 'primary' ? 'al-primary' : 'al-secondary';
    const delayClass = `al-delay-${Math.min(el.delay || 0, 7)}`;
    const animClass = `al-anim-${el.anim}`;

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
      if (el.customProps.rotation !== undefined) parts.push(`'--al-rotation': '${el.customProps.rotation}deg'`);
      if (el.customProps.tx !== undefined) parts.push(`'--al-tx': '${el.customProps.tx}px'`);
      if (el.customProps.ty !== undefined) parts.push(`'--al-ty': '${el.customProps.ty}px'`);
      if (el.customProps.scaleX !== undefined) parts.push(`'--al-scale-x': '${el.customProps.scaleX}'`);
      if (el.customProps.dashLen !== undefined) parts.push(`'--al-dash-len': '${el.customProps.dashLen}'`);
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
  strokeWidth = 2,
  className = '',
  label = '${label}',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '--al-primary': primaryColor || color,
    '--al-secondary': secondaryColor || color,
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
        className={\`animated-lucide-icon animated-lucide-${iconName} \${className}\`}
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
  console.log('Building Animated Lucide icons...\n');

  const categories = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));

  [OUT_SVG, OUT_REACT, OUT_CSS, GALLERY_DATA].forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });

  const galleryIcons = [];
  const indexExports = [];
  let allCss = `/* Animated Lucide Icons */
:root {
  --animated-lucide-primary: currentColor;
  --animated-lucide-secondary: currentColor;
}

`;

  let processed = 0;
  let skipped = 0;

  // Process ALL icons from lucide-static
  const allIconFiles = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg')).sort();
  const allIconNames = allIconFiles.map(f => f.replace('.svg', ''));

  for (const iconName of allIconNames) {
    const svgPath = path.join(ICONS_DIR, `${iconName}.svg`);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');
    const { category, animation } = getIconCategory(iconName, categories);

    const animatedSvg = generateAnimatedSvg(iconName, svgContent, animation);
    fs.writeFileSync(path.join(OUT_SVG, `${iconName}.svg`), animatedSvg);

    const reactComponent = generateReactComponent(iconName, svgContent, animation);
    fs.writeFileSync(path.join(OUT_REACT, `${toPascalCase(iconName)}.jsx`), reactComponent);
    indexExports.push(`export { default as ${toPascalCase(iconName)} } from './${toPascalCase(iconName)}';`);

    galleryIcons.push({
      name: iconName,
      componentName: toPascalCase(iconName),
      category,
      animation,
      elementCount: parseSvgElements(svgContent).length,
    });

    processed++;
  }

  console.log(`  Processed ${processed} icons.`);

  indexExports.push('');
  indexExports.push('// Re-export all icon names for programmatic access');
  indexExports.push(`export const iconNames = ${JSON.stringify(allIconNames)};`);

  fs.writeFileSync(path.join(OUT_REACT, 'index.js'), indexExports.join('\n') + '\n');
  fs.writeFileSync(path.join(GALLERY_DATA, 'icons.json'), JSON.stringify(galleryIcons, null, 2));

  console.log(`\nDone! ${processed} icons processed, ${skipped} skipped.`);
}

build();
