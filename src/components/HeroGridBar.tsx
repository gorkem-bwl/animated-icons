"use client";

import { useEffect, useRef, useCallback } from "react";

const SETS = [
  { id: "lucide", url: "/data/lucide/icons-chunk-0.json", prefix: "al", label: "Lucide", color: "#0d9488", primaryVar: "--animated-lucide-primary", secondaryVar: "--animated-lucide-secondary" },
  { id: "iconoir", url: "/data/iconoir/icons-chunk-0.json", prefix: "ai", label: "Iconoir", color: "#6366f1", primaryVar: "--animated-iconoir-primary", secondaryVar: "--animated-iconoir-secondary" },
  { id: "heroicons", url: "/data/heroicons/icons-chunk-0.json", prefix: "ah", label: "Heroicons", color: "#f59e0b", primaryVar: "--animated-heroicon-primary", secondaryVar: "--animated-heroicon-secondary" },
];

const CELL_SIZE = 70;
const ROWS = 3;
const STAGGER = 25;
const WAVE_DURATION = 1500;
const CROSSFADE_MS = 400;

/* All animation class names that need programmatic trigger overrides */
const ANIM_TYPES = [
  "fill", "draw", "draw-line", "fade", "dot-appear", "bar",
  "scale-pop", "pulse-element", "gear", "nudge", "bell-ring",
  "heart-beat", "rocket-lift", "handle-lift", "page-turn",
  "menu-line", "mail-flap", "shake", "spin",
];

function generateAnimationCSS(): string {
  const rules: string[] = [];
  for (const prefix of ["al", "ai", "ah"]) {
    const d = `--${prefix}-delay`;
    rules.push(
      `.hero-cell.animating .${prefix}-anim-fill { fill-opacity: 0.18; }`,
      `.hero-cell.animating .${prefix}-anim-draw { animation: ${prefix}-draw-in 600ms ease var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-draw-line { animation: ${prefix}-draw-line 500ms ease var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-fade { animation: ${prefix}-fade-pop 500ms ease var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-dot-appear { animation: ${prefix}-dot-pop 500ms ease 200ms both; }`,
      `.hero-cell.animating .${prefix}-anim-bar { animation: ${prefix}-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-scale-pop { animation: ${prefix}-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-pulse-element { animation: ${prefix}-pulse 0.7s ease-in-out; }`,
      `.hero-cell.animating .${prefix}-anim-gear { transform: rotate(var(--${prefix}-rotation, 90deg)); }`,
      `.hero-cell.animating .${prefix}-anim-nudge { transform: translate(var(--${prefix}-tx, 0px), var(--${prefix}-ty, 0px)); }`,
      `.hero-cell.animating .${prefix}-anim-bell-ring { animation: ${prefix}-bell-ring 0.7s ease; }`,
      `.hero-cell.animating .${prefix}-anim-heart-beat { animation: ${prefix}-heart-beat 0.8s ease; }`,
      `.hero-cell.animating .${prefix}-anim-rocket-lift { transform: translate(1px, -1.5px); }`,
      `.hero-cell.animating .${prefix}-anim-handle-lift { transform: translateY(-1.5px); }`,
      `.hero-cell.animating .${prefix}-anim-page-turn { transform: rotateY(-12deg); }`,
      `.hero-cell.animating .${prefix}-anim-menu-line { transform: scaleX(var(--${prefix}-scale-x, 0.7)); }`,
      `.hero-cell.animating .${prefix}-anim-mail-flap { animation: ${prefix}-mail-flap 700ms ease var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-shake { animation: ${prefix}-shake 600ms ease var(${d}, 0ms) both; }`,
      `.hero-cell.animating .${prefix}-anim-spin { animation: ${prefix}-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(${d}, 0ms) both; }`,
    );
  }
  return rules.join("\n");
}

export default function HeroGridBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const iconDataRef = useRef<Record<string, string[]>>({});
  const stylesInjectedRef = useRef<Record<string, boolean>>({});
  const loopRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const extractAndInjectStyle = useCallback((svgStr: string, setId: string): string => {
    const match = svgStr.match(/<style>([\s\S]*?)<\/style>/);
    if (match && !stylesInjectedRef.current[setId]) {
      const styleEl = document.createElement("style");
      styleEl.textContent = match[1];
      styleEl.setAttribute("data-hero-grid", setId);
      document.head.appendChild(styleEl);
      stylesInjectedRef.current[setId] = true;
    }
    return svgStr.replace(/<style>[\s\S]*?<\/style>/, "");
  }, []);

  const buildGrids = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cols = Math.floor(window.innerWidth / CELL_SIZE);
    const totalCells = cols * ROWS;
    const barHeight = ROWS * CELL_SIZE;
    wrapper.style.height = `${barHeight}px`;

    for (const set of SETS) {
      const layer = layerRefs.current[set.id];
      if (!layer) continue;

      while (layer.firstChild) layer.removeChild(layer.firstChild);
      layer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      layer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

      const icons = iconDataRef.current[set.id] || [];
      if (icons.length === 0) continue;

      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.className = "hero-cell";
        cell.style.cssText = "display:flex;align-items:center;justify-content:center;width:100%;height:100%";
        const row = Math.floor(i / cols);
        const col = i % cols;
        cell.setAttribute("data-row", String(row));
        cell.setAttribute("data-col", String(col));

        const svgRaw = icons[i % icons.length];
        const svgClean = extractAndInjectStyle(svgRaw, set.id);
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgClean, "image/svg+xml");
        const svgNode = doc.documentElement;
        if (svgNode && svgNode.nodeName === "svg") {
          const imported = document.importNode(svgNode, true);
          imported.style.cssText = "width:28px;height:28px;opacity:0.55;transition:opacity 300ms ease";
          cell.appendChild(imported);
        }

        layer.appendChild(cell);
      }
    }
  }, [extractAndInjectStyle]);

  const triggerWave = useCallback((setId: string) => {
    const layer = layerRefs.current[setId];
    if (!layer) return;

    const cells = layer.querySelectorAll(".hero-cell");
    const cols = Math.floor(window.innerWidth / CELL_SIZE);

    cells.forEach((cell) => {
      const row = parseInt(cell.getAttribute("data-row") || "0", 10);
      const col = parseInt(cell.getAttribute("data-col") || "0", 10);
      const delay = (row + col) * STAGGER;

      setTimeout(() => {
        cell.classList.add("animating");
        const svg = cell.querySelector("svg");
        if (svg) svg.style.opacity = "0.85";
      }, delay);
    });

    const maxDelay = (ROWS - 1 + cols - 1) * STAGGER + 800;
    setTimeout(() => {
      cells.forEach((cell) => {
        cell.classList.remove("animating");
        const svg = cell.querySelector("svg");
        if (svg) svg.style.opacity = "0.55";
      });
    }, maxDelay);
  }, []);

  const setActive = useCallback((index: number) => {
    SETS.forEach((s, i) => {
      const layer = layerRefs.current[s.id];
      const label = labelRefs.current[s.id];
      if (layer) {
        layer.style.opacity = i === index ? "1" : "0";
      }
      if (label) {
        label.style.opacity = i === index ? "0.4" : "0";
      }
    });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Inject animation trigger CSS
    const animStyle = document.createElement("style");
    animStyle.textContent = generateAnimationCSS();
    animStyle.setAttribute("data-hero-grid", "triggers");
    document.head.appendChild(animStyle);

    // Load icon data
    Promise.all(SETS.map((s) => fetch(s.url).then((r) => r.json()))).then(
      (results) => {
        if (!mountedRef.current) return;
        results.forEach((chunk, i) => {
          iconDataRef.current[SETS[i].id] = Object.values(chunk) as string[];
        });
        buildGrids();
        startLoop();
      }
    );

    function startLoop() {
      let current = 0;

      function cycle() {
        if (!mountedRef.current) return;
        setActive(current);

        setTimeout(() => {
          if (!mountedRef.current) return;
          triggerWave(SETS[current].id);
        }, 200);

        loopRef.current = window.setTimeout(() => {
          current = (current + 1) % SETS.length;
          cycle();
        }, WAVE_DURATION + CROSSFADE_MS + 200);
      }

      cycle();
    }

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (mountedRef.current) buildGrids();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mountedRef.current = false;
      if (loopRef.current) clearTimeout(loopRef.current);
      window.removeEventListener("resize", handleResize);
      // Clean up injected styles
      document.querySelectorAll("style[data-hero-grid]").forEach((el) => el.remove());
    };
  }, [buildGrids, triggerWave, setActive]);

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden" style={{ height: ROWS * CELL_SIZE }}>
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-[120px] z-10 pointer-events-none bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent" />
      <div className="absolute top-0 right-0 bottom-0 w-[120px] z-10 pointer-events-none bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[40px] z-10 pointer-events-none bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[40px] z-10 pointer-events-none bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent" />

      {/* Set labels */}
      {SETS.map((set) => (
        <div
          key={set.id}
          ref={(el) => { labelRefs.current[set.id] = el; }}
          className="absolute bottom-3 right-5 z-[15] text-xs font-medium tracking-wider uppercase pointer-events-none transition-opacity duration-[400ms]"
          style={{ opacity: 0, color: set.color }}
        >
          {set.label}
        </div>
      ))}

      {/* Grid layers */}
      {SETS.map((set) => (
        <div
          key={set.id}
          ref={(el) => { layerRefs.current[set.id] = el; }}
          className="absolute inset-0 grid gap-[2px] transition-opacity duration-[400ms] pointer-events-none"
          style={{
            opacity: 0,
            color: set.color,
            [set.primaryVar as string]: set.color,
            [set.secondaryVar as string]: set.color,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
