"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import IconCard from "./IconCard";
import type { IconMeta } from "./PageClient";
import { ICON_SET_CONFIG, ICON_SET_KEYS } from "@/data/icon-set-config";
import type { IconSet, IconSetGalleryConfig } from "@/data/icon-set-config";

interface GalleryProps {
  iconsMeta: IconMeta[];
  activeSet: IconSet;
  config: IconSetGalleryConfig;
  primaryColor: string;
  secondaryColor: string;
  onColorChange: (primary: string, secondary: string) => void;
}

const PAGE_SIZE = 80;

const COLOR_PRESETS = [
  { p: "#0d9488", s: "#0f766e", name: "Teal" },
  { p: "#3b82f6", s: "#2563eb", name: "Blue" },
  { p: "#ef4444", s: "#dc2626", name: "Red" },
  { p: "#f59e0b", s: "#d97706", name: "Amber" },
  { p: "#8b5cf6", s: "#7c3aed", name: "Violet" },
  { p: "#ec4899", s: "#db2777", name: "Pink" },
  { p: "#64748b", s: "#475569", name: "Slate" },
  { p: "#10b981", s: "#059669", name: "Emerald" },
];

// Content from our own build output — trusted, not user input
function CategoryIcon({ svg, isActive }: { svg: string; isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4 transition-colors ${
        isActive
          ? "text-white dark:text-neutral-900"
          : "text-neutral-400 dark:text-white/30"
      }`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function Gallery({ iconsMeta, activeSet, config, primaryColor, secondaryColor, onColorChange }: GalleryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [showCustomColor, setShowCustomColor] = useState(false);

  const setPrimaryColor = (c: string) => onColorChange(c, secondaryColor);
  const setSecondaryColor = (c: string) => onColorChange(primaryColor, c);

  const [svgCache, setSvgCache] = useState<Record<string, string>>({});
  const loadingChunks = useRef<Set<string>>(new Set());

  const categoryIcons = config.categoryIcons;

  useEffect(() => {
    setActiveCategory("all");
    setPage(1);
    setSearch("");
  }, [activeSet]);

  const allIconNames = useMemo(() => iconsMeta.map((i) => i.name), [iconsMeta]);

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { all: iconsMeta.length };
    for (const icon of iconsMeta) {
      counts[icon.category] = (counts[icon.category] || 0) + 1;
    }
    const sorted = Object.keys(counts)
      .filter((k) => k !== "all" && k !== "uncategorized")
      .sort();
    const result = [{ name: "all", count: iconsMeta.length }, ...sorted.map((k) => ({ name: k, count: counts[k] }))];
    if (counts["uncategorized"]) {
      result.push({ name: "uncategorized", count: counts["uncategorized"] });
    }
    return result;
  }, [iconsMeta]);

  const filtered = useMemo(() => {
    return iconsMeta.filter((icon) => {
      const matchesSearch = !search || icon.name.includes(search.toLowerCase());
      const matchesCategory = activeCategory === "all" || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [iconsMeta, search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const loadChunk = useCallback(async (chunkIndex: number, chunkPath: string) => {
    const key = `${chunkPath}-${chunkIndex}`;
    if (loadingChunks.current.has(key)) return;
    loadingChunks.current.add(key);
    try {
      const res = await fetch(`${chunkPath}/icons-chunk-${chunkIndex}.json`);
      if (res.ok) {
        const data: Record<string, string> = await res.json();
        setSvgCache((prev) => ({ ...prev, ...data }));
      }
    } catch {
      loadingChunks.current.delete(key);
    }
  }, []);

  useEffect(() => {
    const neededChunks = new Set<number>();
    for (const icon of paginated) {
      const globalIndex = allIconNames.indexOf(icon.name);
      if (globalIndex >= 0) {
        neededChunks.add(Math.floor(globalIndex / config.chunkSize));
      }
    }
    for (const iconName of Object.values(categoryIcons)) {
      const globalIndex = allIconNames.indexOf(iconName);
      if (globalIndex >= 0) {
        neededChunks.add(Math.floor(globalIndex / config.chunkSize));
      }
    }
    for (const chunk of neededChunks) {
      loadChunk(chunk, config.chunkPath);
    }
  }, [paginated, allIconNames, loadChunk, config.chunkPath, config.chunkSize, categoryIcons]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  const getCategoryIconSvg = (catName: string) => {
    const iconName = categoryIcons[catName];
    return iconName ? svgCache[iconName] ?? null : null;
  };

  // Build color vars for ALL icon sets so sidebar icons always work
  const colorVars: Record<string, string> = {};
  for (const cfg of Object.values(ICON_SET_CONFIG)) {
    colorVars[cfg.primaryVar] = primaryColor;
    colorVars[cfg.secondaryVar] = secondaryColor;
    colorVars[cfg.shortPrimaryVar] = primaryColor;
    colorVars[cfg.shortSecondaryVar] = secondaryColor;
  }

  const wrapperClass = config.wrapperClass;

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-6">
            <div className="relative mb-5">
              <label htmlFor="icon-search" className="sr-only">Search icons</label>
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 dark:text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input id="icon-search" type="text" placeholder="Search..." value={search} onChange={(e) => handleSearchChange(e.target.value)} className="w-full rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] pl-9 pr-8 py-2 text-sm text-neutral-800 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/25 focus:border-teal-500/50 dark:focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all" />
              {search && (
                <button onClick={() => handleSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/60 cursor-pointer" aria-label="Clear search">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <nav aria-label="Icon categories">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-white/25 mb-2 px-2">Categories</p>
              <div className="flex flex-col gap-0.5" style={colorVars as React.CSSProperties}>
                {categoriesWithCounts.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  const svg = getCategoryIconSvg(cat.name);
                  return (
                    <button key={cat.name} onClick={() => handleCategoryChange(cat.name)} className={`${wrapperClass} flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all text-left cursor-pointer group/cat ${isActive ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white/80 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"}`} aria-current={isActive ? "true" : undefined}>
                      {svg ? <CategoryIcon svg={svg} isActive={isActive} /> : <span className="w-4 h-4 shrink-0" />}
                      <span className="capitalize flex-1">{cat.name}</span>
                      <span className={`text-[11px] tabular-nums ${isActive ? "text-white/50 dark:text-neutral-900/50" : "text-neutral-400 dark:text-white/25"}`}>{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-white/25 mb-3 px-2">Colors</p>
              <div className="grid grid-cols-4 gap-3 px-1">
                {COLOR_PRESETS.map((preset) => (
                  <button key={preset.name} onClick={() => onColorChange(preset.p, preset.s)} className={`group/color relative h-8 w-8 rounded-lg transition-all cursor-pointer ${primaryColor === preset.p ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0b] scale-110" : "hover:scale-110"}`} style={{ background: `linear-gradient(135deg, ${preset.p} 50%, ${preset.s} 50%)`, ...(primaryColor === preset.p ? { ringColor: preset.p } : {}) }} aria-label={`${preset.name} color preset`} title={preset.name} />
                ))}
              </div>
              <button onClick={() => setShowCustomColor(!showCustomColor)} className={`mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed px-2 py-1.5 text-[11px] font-medium transition-all cursor-pointer ${showCustomColor ? "border-teal-400 dark:border-teal-500/50 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/[0.05]" : "border-neutral-300 dark:border-white/15 text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/60 hover:border-neutral-400 dark:hover:border-white/25"}`}>Custom color</button>
              {showCustomColor && (
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <input id="primary-color" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-7 w-7 cursor-pointer rounded border border-neutral-200 dark:border-white/10 bg-transparent shrink-0" />
                    <div>
                      <label htmlFor="primary-color" className="text-[10px] text-neutral-500 dark:text-white/40 block">Primary</label>
                      <code className="text-[10px] text-neutral-400 dark:text-white/25 font-mono">{primaryColor}</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="secondary-color" type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-7 w-7 cursor-pointer rounded border border-neutral-200 dark:border-white/10 bg-transparent shrink-0" />
                    <div>
                      <label htmlFor="secondary-color" className="text-[10px] text-neutral-500 dark:text-white/40 block">Secondary</label>
                      <code className="text-[10px] text-neutral-400 dark:text-white/25 font-mono">{secondaryColor}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-6 space-y-4">
            <div className="relative">
              <label htmlFor="icon-search-mobile" className="sr-only">Search icons</label>
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input id="icon-search-mobile" type="text" placeholder={`Search ${iconsMeta.length} icons...`} value={search} onChange={(e) => handleSearchChange(e.target.value)} className="w-full rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-neutral-800 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/25 focus:border-teal-500/50 dark:focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all" />
            </div>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1" style={colorVars as React.CSSProperties}>
              {categoriesWithCounts.map((cat) => {
                const isActive = activeCategory === cat.name;
                const svg = getCategoryIconSvg(cat.name);
                return (
                  <button key={cat.name} onClick={() => handleCategoryChange(cat.name)} className={`${wrapperClass} shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${isActive ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm" : "text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/60 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"}`}>
                    {svg && <CategoryIcon svg={svg} isActive={isActive} />}
                    {cat.name}
                    <span className={`text-[10px] ${isActive ? "text-white/60 dark:text-neutral-900/60" : "text-neutral-400 dark:text-white/25"}`}>{cat.count}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button key={preset.name} onClick={() => onColorChange(preset.p, preset.s)} className={`h-6 w-6 rounded-full transition-all cursor-pointer ${primaryColor === preset.p ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0b] scale-110" : "hover:scale-110"}`} style={{ background: `linear-gradient(135deg, ${preset.p} 50%, ${preset.s} 50%)` }} aria-label={`${preset.name} color preset`} title={preset.name} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8" style={colorVars as React.CSSProperties}>
            {paginated.map((icon) => (
              <IconCard key={icon.name} name={icon.name} category={icon.category} animation={icon.animation} svgContent={svgCache[icon.name] ?? null} wrapperClass={wrapperClass} packageName={config.packageName} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <div className="text-4xl mb-3 opacity-30">
                <svg className="inline h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <path d="M8 11h6" />
                </svg>
              </div>
              <p className="text-neutral-500 dark:text-white/40 text-sm">No icons found for &ldquo;{search}&rdquo;</p>
              <button onClick={() => handleSearchChange("")} className="mt-3 text-xs text-teal-600 dark:text-teal-400 hover:underline cursor-pointer">Clear search</button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="h-9 w-9 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer" aria-label="Previous page">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                {pageNumbers.map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="h-9 w-5 flex items-center justify-center text-neutral-400 dark:text-white/25 text-sm">...</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p)} className={`h-9 min-w-[36px] rounded-lg px-2 text-sm font-medium transition-all cursor-pointer ${page === p ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm" : "text-neutral-500 dark:text-white/40 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"}`}>{p}</button>
                  )
                )}
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="h-9 w-9 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer" aria-label="Next page">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
              <p className="text-xs text-neutral-400 dark:text-white/25">Showing {(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} icons</p>
            </div>
          )}

          {totalPages <= 1 && filtered.length > 0 && (
            <div className="mt-6 text-center text-xs text-neutral-400 dark:text-white/25">
              {filtered.length} {filtered.length === 1 ? "icon" : "icons"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
