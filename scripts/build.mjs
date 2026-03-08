#!/usr/bin/env node

/**
 * Animated Lucide Build Script
 *
 * Processes Lucide SVG icons and generates:
 * 1. Animated SVG files (standalone) with aria-label and role="img"
 * 2. React components with accessibility props
 * 3. CSS animation definitions
 * 4. Icon metadata for the gallery
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
  'arrow-right', 'chevron-down', 'refresh-cw', 'redo',
  'mail', 'send', 'message-circle', 'inbox',
  'play', 'volume-2', 'camera', 'music',
  'file', 'folder', 'clipboard', 'book-open',
  'check', 'x', 'plus', 'menu', 'settings', 'search',
  'bell', 'alert-triangle', 'loader', 'zap',
  'sun', 'cloud', 'moon', 'snowflake',
  'home', 'lock', 'trash-2', 'shopping-cart', 'rocket',
  'pencil', 'copy', 'scissors',
  'user', 'heart', 'eye', 'smile',
  'map-pin', 'globe', 'compass', 'navigation',
  'bar-chart-2', 'trending-up', 'database',
  'shield', 'key', 'fingerprint',
  'code', 'terminal', 'git-branch', 'bug',
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

// ─── Animation Strategies ────────────────────────────────────────────

const animationStrategies = {
  directional(elements, iconName) {
    const isRight = iconName.includes('right') || iconName.includes('redo');
    const isLeft = iconName.includes('left') || iconName.includes('undo');
    const isUp = iconName.includes('up');
    const isDown = iconName.includes('down') || iconName.includes('chevron-down');
    const isRefresh = iconName.includes('refresh') || iconName.includes('rotate');

    if (isRefresh) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `spin-${iconName}-${i}`,
          css: `
@keyframes spin-${iconName}-${i} {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: spin-${iconName}-${i} 0.65s cubic-bezier(0.4, 0, 0.2, 1);`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Arrow-right: shaft draws in from left, arrowhead overshoots right then bounces back
    if (iconName === 'arrow-right') {
      return elements.map((el, i) => {
        if (i === 0) {
          // Shaft — slides in from left
          return {
            ...el,
            animation: {
              name: 'arrow-shaft-slide',
              css: `
@keyframes arrow-shaft-slide {
  0% { transform: translateX(0); opacity: 1; }
  30% { transform: translateX(-8px); opacity: 0.3; }
  70% { transform: translateX(2px); opacity: 1; }
  100% { transform: translateX(0); }
}`,
              style: '',
              hoverCss: 'animation: arrow-shaft-slide 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;',
              colorGroup: 'secondary',
            }
          };
        }
        // Arrowhead — shoots right with overshoot
        return {
          ...el,
          animation: {
            name: 'arrow-head-shoot',
            css: `
@keyframes arrow-head-shoot {
  0% { transform: translateX(0); }
  40% { transform: translateX(6px); }
  70% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}`,
            style: '',
            hoverCss: 'animation: arrow-head-shoot 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;',
            colorGroup: 'primary',
          }
        };
      });
    }

    // Chevron-down: bounces down with spring
    if (iconName === 'chevron-down') {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: 'chevron-bounce',
          css: `
@keyframes chevron-bounce {
  0% { transform: translateY(0); }
  30% { transform: translateY(5px); }
  50% { transform: translateY(-3px); }
  70% { transform: translateY(2px); }
  100% { transform: translateY(0); }
}`,
          style: '',
          hoverCss: 'animation: chevron-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;',
          colorGroup: 'primary',
        }
      }));
    }

    // Redo: sweeping arc motion
    if (iconName === 'redo') {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `redo-sweep-${i}`,
          css: i === 0 ? `
@keyframes redo-sweep-0 {
  0% { transform: rotate(0deg) scale(1); }
  40% { transform: rotate(-30deg) scale(0.9); }
  70% { transform: rotate(10deg) scale(1.05); }
  100% { transform: rotate(0deg) scale(1); }
}` : `
@keyframes redo-sweep-1 {
  0% { transform: translateX(0) translateY(0); }
  40% { transform: translateX(4px) translateY(-3px); }
  70% { transform: translateX(-1px) translateY(1px); }
  100% { transform: translateX(0) translateY(0); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: redo-sweep-${i} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Generic directional — bigger movement
    const tx = isRight ? 6 : isLeft ? -6 : 0;
    const ty = isDown ? 6 : isUp ? -6 : 0;

    return elements.map((el, i) => {
      const delay = i * 0.06;
      const distance = i === 0 ? { tx: tx * 0.4, ty: ty * 0.4 } : { tx, ty };
      return {
        ...el,
        animation: {
          name: `nudge-${iconName}-${i}`,
          css: `
@keyframes nudge-${iconName}-${i} {
  0% { transform: translate(0, 0); }
  40% { transform: translate(${distance.tx}px, ${distance.ty}px); }
  70% { transform: translate(${-distance.tx * 0.3}px, ${-distance.ty * 0.3}px); }
  100% { transform: translate(0, 0); }
}`,
          style: '',
          hoverCss: `animation: nudge-${iconName}-${i} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both;`,
          colorGroup: i === 0 ? 'secondary' : 'primary',
        }
      };
    });
  },

  'pop-envelope'(elements, iconName) {
    // Send: paper plane launches up-right dramatically
    if (iconName.includes('send')) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `send-launch-${i}`,
          css: i === 0 ? `
@keyframes send-launch-0 {
  0% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(-3px, 2px) rotate(5deg); }
  60% { transform: translate(8px, -6px) rotate(-15deg); }
  80% { transform: translate(2px, -1px) rotate(-3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}` : `
@keyframes send-launch-${i} {
  0% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(-2px, 1px) rotate(3deg); }
  60% { transform: translate(6px, -5px) rotate(-10deg); }
  80% { transform: translate(1px, -1px) rotate(-2deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: send-launch-${i} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Inbox: item drops in from above
    if (iconName.includes('inbox')) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `inbox-drop-${i}`,
          css: i === 0 ? `
@keyframes inbox-drop-0 {
  0% { transform: translateY(-10px); opacity: 0; }
  50% { transform: translateY(3px); opacity: 1; }
  70% { transform: translateY(-2px); }
  100% { transform: translateY(0); opacity: 1; }
}` : `
@keyframes inbox-drop-${i} {
  0% { transform: scaleY(1) translateY(0); }
  50% { transform: scaleY(0.92) translateY(2px); }
  100% { transform: scaleY(1) translateY(0); }
}`,
          style: i === 0 ? '' : 'transform-origin: center bottom;',
          hoverCss: `animation: inbox-drop-${i} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s both;`,
          colorGroup: i === 0 ? 'secondary' : 'primary',
        }
      }));
    }

    // Message bubble: pops up with bounce like a chat message appearing
    if (iconName.includes('message')) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `message-pop-${i}`,
          css: `
@keyframes message-pop-${i} {
  0% { transform: scale(1) translateY(0); }
  20% { transform: scale(0.85) translateY(4px); }
  50% { transform: scale(1.15) translateY(-4px); }
  70% { transform: scale(0.95) translateY(1px); }
  100% { transform: scale(1) translateY(0); }
}`,
          style: 'transform-origin: 12px 14px;',
          hoverCss: `animation: message-pop-${i} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Mail: flap opens wide then closes, letter peeks out
    return elements.map((el, i) => {
      if (i === 0) {
        // Flap / letter content — rises up out of envelope
        return {
          ...el,
          animation: {
            name: 'mail-letter-peek',
            css: `
@keyframes mail-letter-peek {
  0% { transform: translateY(0) rotateX(0deg); }
  30% { transform: translateY(-8px) rotateX(-20deg); }
  60% { transform: translateY(-4px) rotateX(-10deg); }
  100% { transform: translateY(0) rotateX(0deg); }
}`,
            style: 'transform-origin: center bottom;',
            hoverCss: 'animation: mail-letter-peek 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;',
            colorGroup: 'secondary',
          }
        };
      }
      // Envelope body — slight squeeze reaction
      return {
        ...el,
        animation: {
          name: 'mail-body-react',
          css: `
@keyframes mail-body-react {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.03, 0.94); }
  60% { transform: scale(0.98, 1.02); }
  100% { transform: scale(1, 1); }
}`,
          style: 'transform-origin: center bottom;',
          hoverCss: 'animation: mail-body-react 0.5s ease 0.05s both;',
          colorGroup: 'primary',
        }
      };
    });
  },

  playback(elements, iconName) {
    // Volume: sound waves pulse outward dramatically
    if (iconName.includes('volume') || iconName.includes('speaker')) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `sound-pulse-${i}`,
          css: i === 0 ? `
@keyframes sound-pulse-0 {
  0% { transform: translateX(0); }
  30% { transform: translateX(-2px); }
  60% { transform: translateX(1px); }
  100% { transform: translateX(0); }
}` : `
@keyframes sound-pulse-${i} {
  0% { transform: scaleX(1) translateX(0); opacity: 0.4; }
  30% { transform: scaleX(1.4) translateX(3px); opacity: 1; }
  60% { transform: scaleX(0.8) translateX(-1px); opacity: 0.6; }
  100% { transform: scaleX(1) translateX(0); opacity: 0.55; }
}`,
          style: i === 0 ? '' : 'transform-origin: 4px 12px;',
          hoverCss: `animation: sound-pulse-${i} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Camera: shutter click with flash effect
    if (iconName.includes('camera')) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `shutter-click-${i}`,
          css: i === 0 ? `
@keyframes shutter-click-0 {
  0% { transform: scale(1); }
  20% { transform: scale(0.88); }
  40% { transform: scale(1.06); }
  60% { transform: scale(0.97); }
  100% { transform: scale(1); }
}` : `
@keyframes shutter-click-${i} {
  0% { transform: scale(1); opacity: 1; }
  20% { transform: scale(0.5); opacity: 0.3; }
  40% { transform: scale(1.3); opacity: 1; }
  60% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}`,
          style: 'transform-origin: 12px 13px;',
          hoverCss: `animation: shutter-click-${i} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Music: notes sway side to side like dancing
    if (iconName.includes('music')) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `music-dance-${i}`,
          css: `
@keyframes music-dance-${i} {
  0% { transform: rotate(0deg) translateY(0); }
  20% { transform: rotate(${i % 2 === 0 ? 12 : -8}deg) translateY(-2px); }
  40% { transform: rotate(${i % 2 === 0 ? -8 : 12}deg) translateY(1px); }
  60% { transform: rotate(${i % 2 === 0 ? 5 : -5}deg) translateY(-1px); }
  100% { transform: rotate(0deg) translateY(0); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: music-dance-${i} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    // Play: triangle scales up then snaps with a press-in effect
    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `play-press-${i}`,
        css: `
@keyframes play-press-${i} {
  0% { transform: scale(1) translateX(0); }
  25% { transform: scale(0.75) translateX(-2px); }
  50% { transform: scale(1.2) translateX(3px); }
  75% { transform: scale(0.95) translateX(0); }
  100% { transform: scale(1) translateX(0); }
}`,
        style: 'transform-origin: 10px 12px;',
        hoverCss: `animation: play-press-${i} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  unfold(elements, iconName) {
    const isFolder = iconName.includes('folder');
    return elements.map((el, i) => {
      if (isFolder && i === 0) {
        return {
          ...el,
          animation: {
            name: 'folder-open',
            css: `
@keyframes folder-open {
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-15deg); }
  100% { transform: rotateX(0deg); }
}`,
            style: 'transform-origin: center bottom;',
            hoverCss: 'animation: folder-open 0.4s ease both;',
            colorGroup: 'primary',
          }
        };
      }
      return {
        ...el,
        animation: {
          name: `page-reveal-${iconName}-${i}`,
          css: `
@keyframes page-reveal-${iconName}-${i} {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}`,
          style: 'transform-origin: center bottom;',
          hoverCss: `animation: page-reveal-${iconName}-${i} 0.4s ease ${i * 0.07}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      };
    });
  },

  toggle(elements, iconName) {
    const isSearch = iconName.includes('search');
    const isSettings = iconName.includes('settings');
    const isMenu = iconName.includes('menu');

    if (isSettings) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `gear-spin-${i}`,
          css: `
@keyframes gear-spin-${i} {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(${i === 0 ? 90 : -90}deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: gear-spin-${i} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isSearch) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: i === 0 ? 'search-handle' : 'search-glass',
          css: i === 0 ? `
@keyframes search-handle {
  0% { transform: translate(0, 0); }
  50% { transform: translate(1px, 1px); }
  100% { transform: translate(0, 0); }
}` : `
@keyframes search-glass {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`,
          style: i === 0 ? '' : 'transform-origin: 11px 11px;',
          hoverCss: `animation: ${i === 0 ? 'search-handle' : 'search-glass'} 0.35s ease both;`,
          colorGroup: i === 0 ? 'secondary' : 'primary',
        }
      }));
    }

    if (isMenu) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `menu-line-${i}`,
          css: `
@keyframes menu-line-${i} {
  0% { transform: scaleX(1); }
  40% { transform: scaleX(${1 - i * 0.1}); }
  100% { transform: scaleX(1); }
}`,
          style: 'transform-origin: left center;',
          hoverCss: `animation: menu-line-${i} 0.35s ease ${i * 0.05}s both;`,
          colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `toggle-pop-${iconName}-${i}`,
        css: `
@keyframes toggle-pop-${iconName}-${i} {
  0% { transform: scale(1); }
  50% { transform: scale(${i === 0 ? 0.8 : 1.2}); }
  100% { transform: scale(1); }
}`,
        style: 'transform-origin: 12px 12px;',
        hoverCss: `animation: toggle-pop-${iconName}-${i} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  pulse(elements, iconName) {
    const isBell = iconName.includes('bell');
    const isLoader = iconName.includes('loader');
    const isZap = iconName.includes('zap');

    if (isBell) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: i === 0 ? 'bell-ring' : `bell-part-${i}`,
          css: i === 0 ? `
@keyframes bell-ring {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(12deg); }
  30% { transform: rotate(-10deg); }
  45% { transform: rotate(8deg); }
  60% { transform: rotate(-5deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}` : `
@keyframes bell-part-${i} {
  0% { transform: translateX(0); }
  25% { transform: translateX(1.5px); }
  50% { transform: translateX(-1.5px); }
  75% { transform: translateX(0.5px); }
  100% { transform: translateX(0); }
}`,
          style: 'transform-origin: 12px 3px;',
          hoverCss: `animation: ${i === 0 ? 'bell-ring' : `bell-part-${i}`} 0.5s ease both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isLoader) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `loader-spin-${i}`,
          css: `
@keyframes loader-spin-${i} {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: loader-spin-${i} 0.8s linear;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isZap) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `zap-flash-${i}`,
          css: `
@keyframes zap-flash-${i} {
  0% { opacity: 1; transform: scale(1); }
  20% { opacity: 0.6; transform: scale(0.9); }
  40% { opacity: 1; transform: scale(1.15); }
  60% { opacity: 0.8; transform: scale(1); }
  80% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: zap-flash-${i} 0.4s ease both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `pulse-${iconName}-${i}`,
        css: `
@keyframes pulse-${iconName}-${i} {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}`,
        style: 'transform-origin: 12px 12px;',
        hoverCss: `animation: pulse-${iconName}-${i} 0.5s ease ${i * 0.1}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  ambient(elements, iconName) {
    const isSun = iconName.includes('sun');
    const isMoon = iconName.includes('moon');
    const isSnow = iconName.includes('snow');
    const isCloud = iconName.includes('cloud');

    if (isSun) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: i === 0 ? 'sun-spin' : `sun-ray-${i}`,
          css: i === 0 ? `
@keyframes sun-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(45deg); }
}` : `
@keyframes sun-ray-${i} {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: ${i === 0 ? 'sun-spin' : `sun-ray-${i}`} 0.6s ease both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isMoon) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: 'moon-rock',
          css: `
@keyframes moon-rock {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: 'animation: moon-rock 0.6s ease both;',
          colorGroup: 'primary',
        }
      }));
    }

    if (isSnow) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `snow-float-${i}`,
          css: `
@keyframes snow-float-${i} {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(${i % 2 === 0 ? 15 : -15}deg); }
  100% { transform: translateY(0) rotate(0deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: snow-float-${i} 0.7s ease ${i * 0.1}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isCloud) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `cloud-drift-${i}`,
          css: `
@keyframes cloud-drift-${i} {
  0% { transform: translateX(0); }
  50% { transform: translateX(${i === 0 ? 2 : -1}px); }
  100% { transform: translateX(0); }
}`,
          style: '',
          hoverCss: `animation: cloud-drift-${i} 0.7s ease ${i * 0.1}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `float-${iconName}-${i}`,
        css: `
@keyframes float-${iconName}-${i} {
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}`,
        style: '',
        hoverCss: `animation: float-${iconName}-${i} 0.6s ease ${i * 0.1}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  'bounce-in'(elements, iconName) {
    const isRocket = iconName.includes('rocket');
    const isTrash = iconName.includes('trash');
    const isCart = iconName.includes('cart');

    if (isRocket) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `rocket-launch-${i}`,
          css: `
@keyframes rocket-launch-${i} {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -3px); }
  100% { transform: translate(0, 0); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: rocket-launch-${i} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isTrash) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: i === 0 ? 'trash-lid' : `trash-body-${i}`,
          css: i === 0 ? `
@keyframes trash-lid {
  0% { transform: translateY(0) rotate(0deg); }
  40% { transform: translateY(-3px) rotate(-8deg); }
  100% { transform: translateY(0) rotate(0deg); }
}` : `
@keyframes trash-body-${i} {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.95); }
  100% { transform: scaleY(1); }
}`,
          style: i === 0 ? 'transform-origin: 12px 6px;' : 'transform-origin: center bottom;',
          hoverCss: `animation: ${i === 0 ? 'trash-lid' : `trash-body-${i}`} 0.4s ease ${i * 0.05}s both;`,
          colorGroup: i === 0 ? 'secondary' : 'primary',
        }
      }));
    }

    if (isCart) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `cart-roll-${i}`,
          css: `
@keyframes cart-roll-${i} {
  0% { transform: translateX(0); }
  30% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
}`,
          style: '',
          hoverCss: `animation: cart-roll-${i} 0.4s ease ${i * 0.04}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `bounce-${iconName}-${i}`,
        css: `
@keyframes bounce-${iconName}-${i} {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}`,
        style: 'transform-origin: 12px 12px;',
        hoverCss: `animation: bounce-${iconName}-${i} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  draw(elements, iconName) {
    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `draw-in-${iconName}-${i}`,
        usesStrokeDash: true,
        css: `
@keyframes draw-in-${iconName}-${i} {
  0% { stroke-dashoffset: var(--path-length-${i}); }
  100% { stroke-dashoffset: 0; }
}`,
        style: '',
        hoverCss: `animation: draw-in-${iconName}-${i} 0.5s ease ${i * 0.1}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  wave(elements, iconName) {
    const isHeart = iconName.includes('heart');
    const isSmile = iconName.includes('smile');
    const isEye = iconName.includes('eye');

    if (isHeart) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: 'heart-beat',
          css: `
@keyframes heart-beat {
  0% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.1); }
  60% { transform: scale(1); }
}`,
          style: 'transform-origin: 12px 13px;',
          hoverCss: 'animation: heart-beat 0.6s ease both;',
          colorGroup: 'primary',
        }
      }));
    }

    if (isEye) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: i === 0 ? 'eye-blink-outer' : `eye-blink-inner-${i}`,
          css: i === 0 ? `
@keyframes eye-blink-outer {
  0% { transform: scaleY(1); }
  40% { transform: scaleY(0.1); }
  60% { transform: scaleY(0.1); }
  100% { transform: scaleY(1); }
}` : `
@keyframes eye-blink-inner-${i} {
  0% { transform: scaleY(1); opacity: 1; }
  40% { transform: scaleY(0.3); opacity: 0; }
  60% { transform: scaleY(0.3); opacity: 0; }
  100% { transform: scaleY(1); opacity: 1; }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: ${i === 0 ? 'eye-blink-outer' : `eye-blink-inner-${i}`} 0.4s ease both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isSmile) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `smile-pop-${i}`,
          css: `
@keyframes smile-pop-${i} {
  0% { transform: scale(1); }
  50% { transform: scale(${i === 0 ? 1.08 : 1.15}); }
  100% { transform: scale(1); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: smile-pop-${i} 0.4s ease ${i * 0.05}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `wave-${iconName}-${i}`,
        css: `
@keyframes wave-${iconName}-${i} {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}`,
        style: 'transform-origin: 12px 16px;',
        hoverCss: `animation: wave-${iconName}-${i} 0.5s ease ${i * 0.08}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  locate(elements, iconName) {
    const isPin = iconName.includes('pin');
    const isGlobe = iconName.includes('globe');
    const isCompass = iconName.includes('compass');
    const isNav = iconName.includes('navigation');

    if (isPin) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `pin-drop-${i}`,
          css: `
@keyframes pin-drop-${i} {
  0% { transform: translateY(-4px); opacity: 0.5; }
  60% { transform: translateY(1px); opacity: 1; }
  80% { transform: translateY(-1px); }
  100% { transform: translateY(0); }
}`,
          style: 'transform-origin: 12px 24px;',
          hoverCss: `animation: pin-drop-${i} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isGlobe) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `globe-spin-${i}`,
          css: `
@keyframes globe-spin-${i} {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(${i === 0 ? 20 : -10}deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: globe-spin-${i} 0.6s ease both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isCompass) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `compass-needle-${i}`,
          css: `
@keyframes compass-needle-${i} {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(${i === 0 ? 15 : 25}deg); }
  50% { transform: rotate(${i === 0 ? -10 : -15}deg); }
  75% { transform: rotate(${i === 0 ? 5 : 8}deg); }
  100% { transform: rotate(0deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: compass-needle-${i} 0.6s ease both;`,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }
      }));
    }

    if (isNav) {
      return elements.map((el, i) => ({
        ...el,
        animation: {
          name: `nav-point-${i}`,
          css: `
@keyframes nav-point-${i} {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}`,
          style: 'transform-origin: 12px 12px;',
          hoverCss: `animation: nav-point-${i} 0.4s ease both;`,
          colorGroup: 'primary',
        }
      }));
    }

    return animationStrategies.pulse(elements, iconName);
  },

  'chart-rise'(elements, iconName) {
    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `bar-rise-${iconName}-${i}`,
        css: `
@keyframes bar-rise-${iconName}-${i} {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}`,
        style: 'transform-origin: center bottom;',
        hoverCss: `animation: bar-rise-${iconName}-${i} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s both;`,
        colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  shield(elements, iconName) {
    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: i === 0 ? `shield-solid-${iconName}` : `shield-inner-${iconName}-${i}`,
        css: i === 0 ? `
@keyframes shield-solid-${iconName} {
  0% { transform: scale(1); }
  30% { transform: scale(1.08); }
  60% { transform: scale(0.97); }
  100% { transform: scale(1); }
}` : `
@keyframes shield-inner-${iconName}-${i} {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}`,
        style: 'transform-origin: 12px 12px;',
        hoverCss: `animation: ${i === 0 ? `shield-solid-${iconName}` : `shield-inner-${iconName}-${i}`} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08}s both;`,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }
    }));
  },

  'type-in'(elements, iconName) {
    return elements.map((el, i) => ({
      ...el,
      animation: {
        name: `type-${iconName}-${i}`,
        usesStrokeDash: true,
        css: `
@keyframes type-${iconName}-${i} {
  0% { stroke-dashoffset: var(--path-length-${i}); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}`,
        style: '',
        hoverCss: `animation: type-${iconName}-${i} 0.4s ease ${i * 0.12}s both;`,
        colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
      }
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
  return { category: 'uncategorized', animation: 'draw' };
}

// ─── Generate Animated SVG ──────────────────────────────────────────

function generateAnimatedSvg(iconName, svgContent, animationType) {
  const elements = parseSvgElements(svgContent);
  const strategy = animationStrategies[animationType] || animationStrategies.draw;
  const animatedElements = strategy(elements, iconName);
  const label = toLabel(iconName);

  const keyframes = new Set();
  animatedElements.forEach(el => keyframes.add(el.animation.css.trim()));

  let innerSvg = '';
  animatedElements.forEach((el, i) => {
    const colorClass = el.animation.colorGroup === 'primary' ? 'animated-lucide-primary' : 'animated-lucide-secondary';
    const dashAttrs = el.animation.usesStrokeDash ? ` stroke-dasharray="var(--path-length-${i})" stroke-dashoffset="0"` : '';
    let attrs = '';
    for (const [key, val] of Object.entries(el.attrs)) {
      attrs += ` ${key}="${val}"`;
    }
    innerSvg += `  <${el.tag}${attrs}${dashAttrs} class="${colorClass} animated-lucide-el-${i}" style="${el.animation.style}" />\n`;
  });

  let hoverCss = '';
  animatedElements.forEach((el, i) => {
    // Trigger on self-hover (standalone SVG) AND parent wrapper hover (gallery/app)
    hoverCss += `.animated-lucide-icon:hover .animated-lucide-el-${i},\n.al-icon-wrapper:hover .animated-lucide-el-${i} { ${el.animation.hoverCss} }\n`;
  });

  const css = `
<style>
  .animated-lucide-primary { stroke: var(--animated-lucide-primary, currentColor); }
  .animated-lucide-secondary { stroke: var(--animated-lucide-secondary, currentColor); opacity: 0.55; }
  .animated-lucide-icon:hover .animated-lucide-secondary,
  .al-icon-wrapper:hover .animated-lucide-secondary { opacity: 0.7; }
  .animated-lucide-icon * { transition: opacity 0.2s ease; }
${Array.from(keyframes).join('\n')}
${hoverCss}
</style>`;

  const svgAttrs = extractSvgAttrs(svgContent);

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

  const keyframes = new Set();
  animatedElements.forEach(el => keyframes.add(el.animation.css.trim()));

  let hoverStyles = '';
  animatedElements.forEach((el, i) => {
    hoverStyles += `  .animated-lucide-${iconName}:hover .al-el-${i},\n  .al-icon-wrapper:hover .al-el-${i} { ${el.animation.hoverCss} }\n`;
  });

  const styleBlock = `\`.animated-lucide-${iconName} .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-${iconName} .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-${iconName}:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-${iconName} * { transition: opacity 0.2s ease; }
${Array.from(keyframes).join('\n')}
${hoverStyles}\``;

  let elementsJsx = '';
  animatedElements.forEach((el, i) => {
    const colorClass = el.animation.colorGroup === 'primary' ? 'al-primary' : 'al-secondary';
    let attrs = '';
    for (const [key, val] of Object.entries(el.attrs)) {
      const reactKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      attrs += ` ${reactKey}="${val}"`;
    }
    const dashAttrs = el.animation.usesStrokeDash ? ` strokeDasharray="var(--path-length-${i})" strokeDashoffset="0"` : '';

    let styleObj = '{}';
    if (el.animation.style) {
      const parts = el.animation.style.split(';').filter(Boolean).map(s => {
        const [prop, val] = s.split(':').map(x => x.trim());
        const reactProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return `${reactProp}: '${val}'`;
      });
      styleObj = `{ ${parts.join(', ')} }`;
    }

    elementsJsx += `        <${el.tag}${attrs}${dashAttrs} className="al-el-${i} ${colorClass}" style={${styleObj}} />\n`;
  });

  return `import React, { forwardRef, useId } from 'react';

const cssText = ${styleBlock};

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
  const styleId = useId();

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
  console.log('Building Animated Lucide icons...\\n');

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

  for (const iconName of INITIAL_SUBSET) {
    const svgPath = path.join(ICONS_DIR, `${iconName}.svg`);
    if (!fs.existsSync(svgPath)) {
      console.log(`  skip: ${iconName} (not found)`);
      skipped++;
      continue;
    }

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
    console.log(`  done: ${iconName} (${category}/${animation})`);
  }

  indexExports.push('');
  indexExports.push('// Re-export all icon names for programmatic access');
  indexExports.push(`export const iconNames = ${JSON.stringify(INITIAL_SUBSET.filter(n => fs.existsSync(path.join(ICONS_DIR, `${n}.svg`))))};`);

  fs.writeFileSync(path.join(OUT_REACT, 'index.js'), indexExports.join('\n') + '\n');
  fs.writeFileSync(path.join(GALLERY_DATA, 'icons.json'), JSON.stringify(galleryIcons, null, 2));

  console.log(`\\nDone! ${processed} icons processed, ${skipped} skipped.`);
}

build();
