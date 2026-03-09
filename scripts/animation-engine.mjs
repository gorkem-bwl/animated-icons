/**
 * Shared Animation Engine
 *
 * Contains all shared logic for building animated icon sets:
 * - SVG parsing and element classification
 * - Animation strategies (unified for all icon sets)
 * - CSS generation (parameterized by prefix)
 * - SVG and React component generation
 * - Build orchestrator
 *
 * Each icon set only needs a thin wrapper that imports this module
 * and passes its config from icon-set-configs.mjs.
 */

import fs from 'fs';
import path from 'path';

// ─── SVG Parser ──────────────────────────────────────────────────────

export function parseSvgElements(svgContent) {
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

export function extractSvgAttrs(svgContent) {
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

export function toLabel(iconName) {
  return iconName.split('-').join(' ');
}

export function toPascalCase(str) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

// ─── Approximate path length for stroke-dash animations ─────────────

export function estimatePathLength(el) {
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

export function classifyElement(el, index, total, iconName) {
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

// ─── Single-path animation helper ───────────────────────────────────
// When an icon has only one element, multi-element strategies
// (fill+fade, etc.) produce barely visible results. This picks
// a category-appropriate whole-icon animation instead.

function singlePathAnim(iconName, categoryDefault) {
  if (iconName.includes('heart')) return 'heart-beat';
  if (iconName.includes('bell')) return 'bell-ring';
  if (iconName.includes('compass')) return 'shake';
  if (iconName.includes('rocket')) return 'rocket-lift';
  if (iconName.includes('cart') || iconName.includes('shopping')) return 'shake';
  if (iconName.includes('trash')) return 'shake';
  if (iconName.includes('lock')) return 'shake';
  if (iconName.includes('cog') || iconName.includes('settings')) return 'gear';
  if (iconName.includes('sun')) return 'gear';
  if (iconName.includes('moon')) return 'gear';
  if (iconName.includes('loader')) return 'spin';
  if (iconName.includes('refresh') || iconName.includes('rotate')) return 'spin';
  if (iconName.includes('flag')) return 'shake';
  if (iconName.includes('bars') || iconName.includes('menu')) return 'shake';
  if (iconName.includes('truck')) return 'nudge';
  if (iconName.includes('paper-airplane') || iconName.includes('send')) return 'shake';
  return categoryDefault;
}

// ─── Animation Assignment Engine ────────────────────────────────────

export const animationStrategies = {

  directional(elements, iconName) {
    const isSpin = iconName.includes('refresh') || iconName.includes('rotate')
      || iconName === 'redo' || iconName === 'undo'
      || iconName.includes('path') || iconName.includes('uturn');

    if (isSpin) {
      return elements.map((el, i) => ({
        ...el, anim: 'spin', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('pointing')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    const isRight = iconName.includes('right') || iconName.includes('redo');
    const isLeft = iconName.includes('left') || iconName.includes('undo');
    const isUp = iconName.includes('up');
    const isDown = iconName.includes('down');
    const tx = isRight ? 2 : isLeft ? -2 : 0;
    const ty = isDown ? 2 : isUp ? -2 : 0;

    return elements.map((el, i) => ({
      ...el, anim: 'nudge', delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
      customProps: {
        tx: elements.length === 1 ? tx : (i === 0 ? tx * 0.5 : tx),
        ty: elements.length === 1 ? ty : (i === 0 ? ty * 0.5 : ty),
      },
    }));
  },

  'pop-envelope'(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('send') || iconName.includes('paper-airplane')) {
      return elements.map((el, i) => ({
        ...el, anim: 'shake', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('message') || iconName.includes('chat') || iconName.includes('phone')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'scale-pop'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('inbox')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('envelope') || iconName.includes('mail')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'mail-flap' : (i === 0 ? 'mail-flap' : 'fill'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: 'scale-pop', delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  playback(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('volume') || iconName.includes('speaker')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'scale-pop' : 'pulse-element'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('camera') || iconName.includes('video')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'scale-pop'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('music') || iconName.includes('audio') || iconName.includes('radio')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'fade' : (el.tag === 'circle' ? 'scale-pop' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('rewind') || iconName.includes('skip-back')
      || iconName.includes('chevron-first') || iconName.includes('backward')) {
      return elements.map((el, i) => ({
        ...el, anim: 'nudge', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: -2, ty: 0 },
      }));
    }

    if (iconName.includes('fast-forward') || iconName.includes('skip-forward')
      || iconName.includes('chevron-last') || iconName.includes('forward')) {
      return elements.map((el, i) => ({
        ...el, anim: 'nudge', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 2, ty: 0 },
      }));
    }

    if (iconName.includes('mic') || iconName.includes('microphone')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: 'scale-pop', delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  unfold(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('book')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : (el.tag === 'line' ? 'fade' : 'page-turn')),
        delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? singlePathAnim(iconName, 'fade') : (i === 0 ? 'fill' : 'fade'),
      delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  toggle(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('settings') || iconName.includes('cog')) {
      return elements.map((el, i) => ({
        ...el, anim: 'gear', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 90 },
      }));
    }

    if (iconName.includes('search') || iconName.includes('magnifying-glass')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'scale-pop' : 'fill'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('menu') || iconName.includes('bars')) {
      if (single) {
        return elements.map((el, i) => ({
          ...el, anim: 'shake', delay: i,
          colorGroup: i === 0 ? 'primary' : 'secondary',
        }));
      }
      return elements.map((el, i) => ({
        ...el, anim: 'menu-line', delay: i,
        colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
        customProps: { scaleX: 1 - i * 0.15 },
      }));
    }

    if (iconName.includes('adjustments')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'shake' : 'menu-line', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        ...(single ? {} : { customProps: { scaleX: 0.85 } }),
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: 'scale-pop', delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  pulse(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('bell')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'bell-ring' : (i === 0 ? 'bell-ring' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('loader')) {
      return elements.map((el, i) => ({
        ...el, anim: 'spin', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('zap') || iconName.includes('bolt') || iconName.includes('sparkles')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('alert')) {
      return elements.map((el, i) => {
        const role = classifyElement(el, i, elements.length, iconName);
        return {
          ...el, anim: single ? 'shake' : (role === 'container' ? 'fill' : 'pulse-element'),
          delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
        };
      });
    }

    if (iconName.includes('signal') || iconName.includes('wifi')) {
      return elements.map((el, i) => ({
        ...el, anim: 'pulse-element', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => {
      const role = classifyElement(el, i, elements.length, iconName);
      return {
        ...el, anim: single ? 'pulse-element' : (role === 'container' ? 'fill' : 'fade'),
        delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
      };
    });
  },

  ambient(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('sun')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'gear' : (i === 0 ? 'gear' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 45 },
      }));
    }

    if (iconName.includes('moon')) {
      return elements.map((el, i) => ({
        ...el, anim: 'gear', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: -15 },
      }));
    }

    if (iconName.includes('cloud')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('fire')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? singlePathAnim(iconName, 'fade') : 'fade', delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  'bounce-in'(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('rocket')) {
      return elements.map((el, i) => ({
        ...el, anim: 'rocket-lift', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('trash')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'shake' : (i === 0 ? 'handle-lift' : 'fill'), delay: i,
        colorGroup: i === 0 ? 'secondary' : 'primary',
      }));
    }

    if (iconName.includes('cart') || iconName.includes('shopping')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'shake' : (el.tag === 'circle' ? 'fill' : 'shake'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('lock')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'shake' : (i === 0 ? 'fill' : 'handle-lift'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('key') || iconName.includes('wrench')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'gear' : (el.tag === 'circle' ? 'fill' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: iconName.includes('key') ? 45 : 30 },
      }));
    }

    if (iconName.includes('clock')) {
      return elements.map((el, i) => ({
        ...el, anim: 'gear', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 30 },
      }));
    }

    if (iconName.includes('truck')) {
      return elements.map((el, i) => ({
        ...el, anim: 'nudge', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 2, ty: 0 },
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? singlePathAnim(iconName, 'scale-pop') : (i === 0 ? 'fill' : 'fade'),
      delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  draw(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('scissors')) {
      return elements.map((el, i) => ({
        ...el, anim: 'gear', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 15 },
      }));
    }

    if (iconName.includes('cursor')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? 'scale-pop' : (i === 0 ? 'scale-pop' : 'fade'), delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  wave(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('heart')) {
      return elements.map((el, i) => ({
        ...el, anim: 'heart-beat', delay: i, colorGroup: 'primary',
      }));
    }

    if (iconName.includes('eye')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'scale-pop'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('smile') || iconName.includes('frown') || iconName.includes('meh')
      || iconName.includes('face')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('hand') || iconName.includes('thumb')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? singlePathAnim(iconName, 'scale-pop') : (el.tag === 'circle' ? 'fill' : 'fade'),
      delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  locate(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('pin')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'dot-appear'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('globe')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('compass')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'shake' : (i === 0 ? 'fill' : 'shake'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('navigation')) {
      return elements.map((el, i) => ({
        ...el, anim: 'rocket-lift', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    if (iconName.includes('flag')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'shake' : (i === 0 ? 'fill' : 'shake'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? singlePathAnim(iconName, 'shake') : (i === 0 ? 'scale-pop' : 'fade'),
      delay: i, colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  'chart-rise'(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('bar-chart') || iconName.includes('chart-bar')
      || iconName.includes('presentation-chart-bar')) {
      const isBarElement = (el) => {
        if (el.tag === 'line') return true;
        if (el.tag === 'rect') return true;
        if (el.tag === 'path') {
          const d = el.attrs.d || '';
          if (/^M[\d.\s]+[vV][-\d.]+\s*$/.test(d.trim())) return true;
          if (/^M[\d.\s]+[hH][-\d.]+\s*$/.test(d.trim())) return true;
        }
        return false;
      };

      if (single) {
        return elements.map((el, i) => ({
          ...el, anim: 'bar', delay: i,
          colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
        }));
      }

      return elements.map((el, i) => {
        if (isBarElement(el)) {
          return { ...el, anim: 'bar', delay: i, colorGroup: i % 2 === 0 ? 'primary' : 'secondary' };
        }
        return { ...el, anim: 'fill', delay: 0, colorGroup: 'primary' };
      });
    }

    if (iconName.includes('line-chart') || iconName.includes('presentation-chart-line')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'nudge' : (i === 0 ? 'fill' : 'draw'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        ...(single ? { customProps: { tx: 1.5, ty: -1.5 } } : {}),
      }));
    }

    if (iconName.includes('trending')) {
      const isUp = iconName.includes('up');
      return elements.map((el, i) => ({
        ...el, anim: 'nudge', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { tx: 1.5, ty: isUp ? -1.5 : 1.5 },
      }));
    }

    if (iconName.includes('pie-chart') || iconName.includes('chart-pie')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'gear' : (i === 0 ? 'gear' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        customProps: { rotation: 45 },
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'), delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  shield(elements, iconName) {
    const single = elements.length === 1;

    if (iconName.includes('key')) {
      return elements.map((el, i) => ({
        ...el, anim: single ? 'gear' : (el.tag === 'circle' ? 'fill' : 'fade'), delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
        ...(single ? { customProps: { rotation: 45 } } : {}),
      }));
    }

    if (iconName.includes('star')) {
      return elements.map((el, i) => ({
        ...el, anim: 'scale-pop', delay: i,
        colorGroup: i === 0 ? 'primary' : 'secondary',
      }));
    }

    return elements.map((el, i) => ({
      ...el, anim: single ? 'scale-pop' : (i === 0 ? 'fill' : 'fade'), delay: i,
      colorGroup: i === 0 ? 'primary' : 'secondary',
    }));
  },

  'type-in'(elements, iconName) {
    const single = elements.length === 1;
    return elements.map((el, i) => ({
      ...el, anim: single ? singlePathAnim(iconName, 'scale-pop') : (i === 0 ? 'fill' : 'fade'),
      delay: i, colorGroup: i % 2 === 0 ? 'primary' : 'secondary',
    }));
  },
};

// ─── Lookup icon category ────────────────────────────────────────────

export function getIconCategory(iconName, categories) {
  for (const [catName, catData] of Object.entries(categories.categories)) {
    if (catData.icons.includes(iconName)) {
      return { category: catName, animation: catData.animation };
    }
  }
  return { category: 'uncategorized', animation: 'toggle' };
}

// ─── CSS Generation ──────────────────────────────────────────────────

export function generateAnimationCSS(config) {
  const p = config.cssPrefix;
  const cls = config.svgClassName;
  const w = config.wrapperClass;
  const pVar = config.primaryVar;
  const sVar = config.secondaryVar;
  const sp = config.shortPrimaryVar;
  const ss = config.shortSecondaryVar;

  const h = (animClass) =>
    `.${cls}:hover .${p}-anim-${animClass},\n  .${w}:hover .${p}-anim-${animClass}`;

  return `
  .${p}-delay-0 { --${p}-delay: 0ms; }
  .${p}-delay-1 { --${p}-delay: 80ms; }
  .${p}-delay-2 { --${p}-delay: 160ms; }
  .${p}-delay-3 { --${p}-delay: 240ms; }
  .${p}-delay-4 { --${p}-delay: 320ms; }
  .${p}-delay-5 { --${p}-delay: 400ms; }
  .${p}-delay-6 { --${p}-delay: 480ms; }
  .${p}-delay-7 { --${p}-delay: 560ms; }

  .${p}-primary { stroke: var(${pVar}, var(${sp}, currentColor)); }
  .${p}-secondary { stroke: var(${sVar}, var(${ss}, currentColor)); }

  .${p}-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--${p}-delay, 0ms);
  }
  ${h('fill')} { fill-opacity: 0.18; }

  .${p}-anim-draw { }
  ${h('draw')} { animation: ${p}-draw-in 600ms ease var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-draw-in { 0% { stroke-dashoffset: var(--${p}-dash-len, 50); } 100% { stroke-dashoffset: 0; } }

  .${p}-anim-draw-line { }
  ${h('draw-line')} { animation: ${p}-draw-line 500ms ease var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-draw-line { 0% { stroke-dashoffset: var(--${p}-dash-len, 20); } 100% { stroke-dashoffset: 0; } }

  .${p}-anim-fade { }
  ${h('fade')} { animation: ${p}-fade-pop 500ms ease var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-fade-pop { 0% { opacity: 0.3; transform: scale(0.92); } 60% { opacity: 1; transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }

  .${p}-anim-dot-appear { }
  ${h('dot-appear')} { animation: ${p}-dot-pop 500ms ease 200ms both; }
  @keyframes ${p}-dot-pop { 0% { transform: scale(1); } 40% { transform: scale(0.3); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .${p}-anim-bar { transform-origin: center bottom; }
  ${h('bar')} { animation: ${p}-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-bar-grow { 0% { transform: scaleY(0.2); } 60% { transform: scaleY(1.08); } 100% { transform: scaleY(1); } }

  .${p}-anim-scale-pop { transform-origin: center; }
  ${h('scale-pop')} { animation: ${p}-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-scale-pop { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 100% { transform: scale(1); } }

  .${p}-anim-pulse-element { }
  ${h('pulse-element')} { animation: ${p}-pulse 0.7s ease-in-out; }
  @keyframes ${p}-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .${p}-anim-gear { transform-origin: 12px 12px; transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--${p}-delay, 0ms); }
  ${h('gear')} { transform: rotate(var(--${p}-rotation, 90deg)); }

  .${p}-anim-nudge { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--${p}-delay, 0ms); }
  ${h('nudge')} { transform: translate(var(--${p}-tx, 0px), var(--${p}-ty, 0px)); }

  .${p}-anim-bell-ring { transform-origin: 12px 3px; }
  ${h('bell-ring')} { animation: ${p}-bell-ring 0.7s ease; }
  @keyframes ${p}-bell-ring { 0% { transform: rotate(0deg); } 12% { transform: rotate(14deg); } 24% { transform: rotate(-12deg); } 36% { transform: rotate(8deg); } 48% { transform: rotate(-5deg); } 60% { transform: rotate(2deg); } 100% { transform: rotate(0deg); } }

  .${p}-anim-heart-beat { transform-origin: 12px 13px; }
  ${h('heart-beat')} { animation: ${p}-heart-beat 0.8s ease; }
  @keyframes ${p}-heart-beat { 0% { transform: scale(1); } 15% { transform: scale(1.2); } 30% { transform: scale(1); } 45% { transform: scale(1.15); } 60% { transform: scale(1); } }

  .${p}-anim-rocket-lift { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--${p}-delay, 0ms); }
  ${h('rocket-lift')} { transform: translate(1px, -1.5px); }

  .${p}-anim-handle-lift { transition: transform 500ms ease var(--${p}-delay, 0ms); }
  ${h('handle-lift')} { transform: translateY(-1.5px); }

  .${p}-anim-page-turn { transform-origin: left center; transition: transform 500ms ease var(--${p}-delay, 0ms); }
  ${h('page-turn')} { transform: rotateY(-12deg); }

  .${p}-anim-menu-line { transform-origin: left center; transition: transform 400ms ease var(--${p}-delay, 0ms); }
  ${h('menu-line')} { transform: scaleX(var(--${p}-scale-x, 0.7)); }

  .${p}-anim-mail-flap { transform-origin: center top; }
  ${h('mail-flap')} { animation: ${p}-mail-flap 700ms ease var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-mail-flap { 0% { transform: rotateX(0deg); } 40% { transform: rotateX(-30deg); } 70% { transform: rotateX(5deg); } 100% { transform: rotateX(0deg); } }

  .${p}-anim-shake { transform-origin: center; }
  ${h('shake')} { animation: ${p}-shake 600ms ease var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-shake { 0% { transform: translateX(0) rotate(0deg); } 15% { transform: translateX(-1.5px) rotate(-3deg); } 30% { transform: translateX(1.5px) rotate(3deg); } 45% { transform: translateX(-1px) rotate(-2deg); } 60% { transform: translateX(1px) rotate(2deg); } 75% { transform: translateX(-0.5px) rotate(-1deg); } 100% { transform: translateX(0) rotate(0deg); } }

  .${p}-anim-spin { transform-origin: 12px 12px; }
  ${h('spin')} { animation: ${p}-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--${p}-delay, 0ms) both; }
  @keyframes ${p}-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
}

// ─── Generate Animated SVG ──────────────────────────────────────────

export function generateAnimatedSvg(iconName, svgContent, animationType, config) {
  const elements = parseSvgElements(svgContent);
  const strategy = animationStrategies[animationType] || animationStrategies.toggle;
  const animatedElements = strategy(elements, iconName);
  const label = toLabel(iconName);
  const svgAttrs = extractSvgAttrs(svgContent);
  const p = config.cssPrefix;

  let innerSvg = '';
  animatedElements.forEach((el) => {
    const colorClass = el.colorGroup === 'primary' ? `${p}-primary` : `${p}-secondary`;
    const delayClass = `${p}-delay-${Math.min(el.delay || 0, 7)}`;
    const animClass = `${p}-anim-${el.anim}`;

    let attrs = '';
    for (const [key, val] of Object.entries(el.attrs)) {
      attrs += ` ${key}="${val}"`;
    }

    let extraAttrs = '';
    if (el.anim === 'draw' || el.anim === 'draw-line') {
      const len = Math.ceil(estimatePathLength(el));
      extraAttrs += ` stroke-dasharray="${len}"`;
      if (!el.customProps) el.customProps = {};
      el.customProps.dashLen = len;
    }

    let style = '';
    if (el.customProps) {
      const parts = [];
      if (el.customProps.rotation !== undefined) parts.push(`--${p}-rotation: ${el.customProps.rotation}deg`);
      if (el.customProps.tx !== undefined) parts.push(`--${p}-tx: ${el.customProps.tx}px`);
      if (el.customProps.ty !== undefined) parts.push(`--${p}-ty: ${el.customProps.ty}px`);
      if (el.customProps.scaleX !== undefined) parts.push(`--${p}-scale-x: ${el.customProps.scaleX}`);
      if (el.customProps.dashLen !== undefined) parts.push(`--${p}-dash-len: ${el.customProps.dashLen}`);
      if (parts.length) style = ` style="${parts.join('; ')}"`;
    }

    innerSvg += `  <${el.tag}${attrs}${extraAttrs} class="${colorClass} ${animClass} ${delayClass}"${style} />\n`;
  });

  const css = `<style>${generateAnimationCSS(config)}</style>`;

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="${config.defaultFill}"
  stroke="currentColor"
  stroke-width="${svgAttrs['stroke-width'] || config.defaultStrokeWidth}"
  stroke-linecap="${svgAttrs['stroke-linecap'] || 'round'}"
  stroke-linejoin="${svgAttrs['stroke-linejoin'] || 'round'}"
  overflow="visible"
  class="${config.svgClassName} ${config.svgClassName}-${iconName}"
  role="img"
  aria-label="${label}"
>
  <title>${label}</title>
${css}
${innerSvg}</svg>`;
}

// ─── Generate React Component ───────────────────────────────────────

export function generateReactComponent(iconName, svgContent, animationType, config) {
  const elements = parseSvgElements(svgContent);
  const strategy = animationStrategies[animationType] || animationStrategies.toggle;
  const animatedElements = strategy(elements, iconName);
  const componentName = toPascalCase(iconName);
  const label = toLabel(iconName);
  const p = config.cssPrefix;

  let elementsJsx = '';
  animatedElements.forEach((el) => {
    const colorClass = el.colorGroup === 'primary' ? `${p}-primary` : `${p}-secondary`;
    const delayClass = `${p}-delay-${Math.min(el.delay || 0, 7)}`;
    const animClass = `${p}-anim-${el.anim}`;

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
      if (el.customProps.rotation !== undefined) parts.push(`'--${p}-rotation': '${el.customProps.rotation}deg'`);
      if (el.customProps.tx !== undefined) parts.push(`'--${p}-tx': '${el.customProps.tx}px'`);
      if (el.customProps.ty !== undefined) parts.push(`'--${p}-ty': '${el.customProps.ty}px'`);
      if (el.customProps.scaleX !== undefined) parts.push(`'--${p}-scale-x': '${el.customProps.scaleX}'`);
      if (el.customProps.dashLen !== undefined) parts.push(`'--${p}-dash-len': '${el.customProps.dashLen}'`);
      styleObj = `{ ${parts.join(', ')} }`;
    }

    elementsJsx += `        <${el.tag}${attrs}${extraAttrs} className="${colorClass} ${animClass} ${delayClass}" style={${styleObj}} />\n`;
  });

  const cssText = '`' + generateAnimationCSS(config) + '`';

  return `import React, { forwardRef } from 'react';

const cssText = ${cssText};

const ${componentName} = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = ${config.defaultStrokeWidthNum},
  className = '',
  label = '${label}',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '${config.shortPrimaryVar}': primaryColor || color,
    '${config.shortSecondaryVar}': secondaryColor || color,
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
        fill="${config.defaultFill}"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={\`${config.svgClassName} ${config.svgClassName}-${iconName} \${className}\`}
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

// ─── Main Build Orchestrator ─────────────────────────────────────────

export function buildIconSet(config) {
  console.log(`Building Animated ${config.label} icons...\n`);

  if (!fs.existsSync(config.sourceDir)) {
    console.error(`Source not found at: ${config.sourceDir}`);
    process.exit(1);
  }

  const categories = JSON.parse(fs.readFileSync(config.categoriesFile, 'utf-8'));

  const dirs = [config.outSvg, config.outReact, config.outCss, config.galleryData];
  if (config.copySourceTo) dirs.push(config.copySourceTo);
  dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  const galleryIcons = [];
  const indexExports = [];
  let processed = 0;

  const allIconFiles = fs.readdirSync(config.sourceDir).filter(f => f.endsWith('.svg')).sort();
  const allIconNames = allIconFiles.map(f => f.replace('.svg', ''));

  console.log(`  Found ${allIconFiles.length} ${config.name} SVGs.\n`);

  for (const iconName of allIconNames) {
    const svgPath = path.join(config.sourceDir, `${iconName}.svg`);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    if (config.copySourceTo) {
      fs.writeFileSync(path.join(config.copySourceTo, `${iconName}.svg`), svgContent);
    }

    const { category, animation } = getIconCategory(iconName, categories);
    const elements = parseSvgElements(svgContent);

    const animatedSvg = generateAnimatedSvg(iconName, svgContent, animation, config);
    fs.writeFileSync(path.join(config.outSvg, `${iconName}.svg`), animatedSvg);

    const reactComponent = generateReactComponent(iconName, svgContent, animation, config);
    const componentName = toPascalCase(iconName);
    fs.writeFileSync(path.join(config.outReact, `${componentName}.jsx`), reactComponent);
    indexExports.push(`export { default as ${componentName} } from './${componentName}';`);

    galleryIcons.push({
      name: iconName,
      componentName,
      category,
      animation,
      elementCount: elements.length,
    });

    processed++;
  }

  const sharedCss = `/* Animated ${config.label} Icons */\n:root {\n  ${config.primaryVar}: currentColor;\n  ${config.secondaryVar}: currentColor;\n}\n` + generateAnimationCSS(config);
  fs.writeFileSync(path.join(config.outCss, `animated-${config.name}.css`), sharedCss);

  indexExports.push('');
  indexExports.push(`export const iconNames = ${JSON.stringify(allIconNames)};`);
  fs.writeFileSync(path.join(config.outReact, 'index.js'), indexExports.join('\n') + '\n');

  fs.writeFileSync(
    path.join(config.galleryData, config.galleryIconsFile),
    JSON.stringify(galleryIcons, null, 2)
  );

  console.log(`  Processed: ${processed} icons`);
  console.log(`  Done!\n`);
}
