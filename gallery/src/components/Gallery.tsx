"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import IconCard from "./IconCard";

interface IconMeta {
  name: string;
  componentName: string;
  category: string;
  animation: string;
  elementCount: number;
}

interface GalleryProps {
  iconsMeta: IconMeta[];
}

const PAGE_SIZE = 80;
const CHUNK_SIZE = 200; // Must match prepare-gallery.mjs

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

const CATEGORY_ICONS: Record<string, string> = {
  all: "layers",
  arrows: "arrow-right",
  communication: "mail",
  media: "play",
  files: "file-text",
  ui: "settings",
  status: "bell",
  weather: "sun",
  objects: "home",
  editing: "pencil",
  people: "user",
  navigation: "map-pin",
  data: "bar-chart-2",
  security: "shield",
  development: "code",
};

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

export default function Gallery({ iconsMeta }: GalleryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [primaryColor, setPrimaryColor] = useState("#0d9488");
  const [secondaryColor, setSecondaryColor] = useState("#0f766e");
  const [page, setPage] = useState(1);
  const [showCustomColor, setShowCustomColor] = useState(false);

  // SVG content cache: name → svg string
  const [svgCache, setSvgCache] = useState<Record<string, string>>({});
  const loadingChunks = useRef<Set<number>>(new Set());

  // Build a sorted index of all icon names for chunk lookup
  const allIconNames = useMemo(() => iconsMeta.map((i) => i.name), [iconsMeta]);

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { all: iconsMeta.length };
    for (const icon of iconsMeta) {
      counts[icon.category] = (counts[icon.category] || 0) + 1;
    }
    const sorted = Object.keys(counts)
      .filter((k) => k !== "all")
      .sort();
    return [{ name: "all", count: iconsMeta.length }, ...sorted.map((k) => ({ name: k, count: counts[k] }))];
  }, [iconsMeta]);

  const filtered = useMemo(() => {
    return iconsMeta.filter((icon) => {
      const matchesSearch =
        !search || icon.name.includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [iconsMeta, search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Determine which chunks are needed for the current page
  const loadChunk = useCallback(async (chunkIndex: number) => {
    if (loadingChunks.current.has(chunkIndex)) return;
    loadingChunks.current.add(chunkIndex);
    try {
      const res = await fetch(`/data/icons-chunk-${chunkIndex}.json`);
      if (res.ok) {
        const data: Record<string, string> = await res.json();
        setSvgCache((prev) => ({ ...prev, ...data }));
      }
    } catch {
      loadingChunks.current.delete(chunkIndex);
    }
  }, []);

  // Load chunks needed for current paginated icons
  useEffect(() => {
    const neededChunks = new Set<number>();
    for (const icon of paginated) {
      const globalIndex = allIconNames.indexOf(icon.name);
      if (globalIndex >= 0) {
        neededChunks.add(Math.floor(globalIndex / CHUNK_SIZE));
      }
    }
    // Also load chunks for category icons
    for (const iconName of Object.values(CATEGORY_ICONS)) {
      const globalIndex = allIconNames.indexOf(iconName);
      if (globalIndex >= 0) {
        neededChunks.add(Math.floor(globalIndex / CHUNK_SIZE));
      }
    }
    for (const chunk of neededChunks) {
      if (!loadingChunks.current.has(chunk)) {
        loadChunk(chunk);
      }
    }
  }, [paginated, allIconNames, loadChunk]);

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
    const iconName = CATEGORY_ICONS[catName];
    return iconName ? svgCache[iconName] ?? null : null;
  };

  const colorVars = {
    "--animated-lucide-primary": primaryColor,
    "--animated-lucide-secondary": secondaryColor,
    "--al-primary": primaryColor,
    "--al-secondary": secondaryColor,
  } as React.CSSProperties;

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-6">
            {/* Search */}
            <div className="relative mb-5">
              <label htmlFor="icon-search" className="sr-only">
                Search icons
              </label>
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 dark:text-white/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                id="icon-search"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] pl-9 pr-8 py-2 text-sm text-neutral-800 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/25 focus:border-teal-500/50 dark:focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/60"
                  aria-label="Clear search"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Categories */}
            <nav aria-label="Icon categories">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-white/25 mb-2 px-2">
                Categories
              </p>
              <div className="flex flex-col gap-0.5" style={colorVars}>
                {categoriesWithCounts.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  const svg = getCategoryIconSvg(cat.name);
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`al-icon-wrapper flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all text-left cursor-pointer group/cat ${
                        isActive
                          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                          : "text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white/80 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {svg ? (
                        <CategoryIcon svg={svg} isActive={isActive} />
                      ) : (
                        <span className="w-4 h-4 shrink-0" />
                      )}
                      <span className="capitalize flex-1">{cat.name}</span>
                      <span className={`text-[11px] tabular-nums ${
                        isActive
                          ? "text-white/50 dark:text-neutral-900/50"
                          : "text-neutral-400 dark:text-white/25"
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Color presets */}
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-white/25 mb-3 px-2">
                Colors
              </p>
              <div className="grid grid-cols-4 gap-3 px-1">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setPrimaryColor(preset.p);
                      setSecondaryColor(preset.s);
                    }}
                    className={`group/color relative h-8 w-8 rounded-lg transition-all ${
                      primaryColor === preset.p
                        ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0b] scale-110"
                        : "hover:scale-110"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${preset.p} 50%, ${preset.s} 50%)`,
                      ...(primaryColor === preset.p ? { ringColor: preset.p } : {}),
                    }}
                    aria-label={`${preset.name} color preset`}
                    title={preset.name}
                  />
                ))}
              </div>
              <button
                onClick={() => setShowCustomColor(!showCustomColor)}
                className={`mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed px-2 py-1.5 text-[11px] font-medium transition-all ${
                  showCustomColor
                    ? "border-teal-400 dark:border-teal-500/50 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/[0.05]"
                    : "border-neutral-300 dark:border-white/15 text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/60 hover:border-neutral-400 dark:hover:border-white/25"
                }`}
              >
                Custom color
              </button>

              {showCustomColor && (
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-7 w-7 cursor-pointer rounded border border-neutral-200 dark:border-white/10 bg-transparent shrink-0"
                    />
                    <div>
                      <label htmlFor="primary-color" className="text-[10px] text-neutral-500 dark:text-white/40 block">Primary</label>
                      <code className="text-[10px] text-neutral-400 dark:text-white/25 font-mono">{primaryColor}</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="secondary-color"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="h-7 w-7 cursor-pointer rounded border border-neutral-200 dark:border-white/10 bg-transparent shrink-0"
                    />
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

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile controls */}
          <div className="lg:hidden mb-6 space-y-4">
            <div className="relative">
              <label htmlFor="icon-search-mobile" className="sr-only">
                Search icons
              </label>
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-white/30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                id="icon-search-mobile"
                type="text"
                placeholder={`Search ${iconsMeta.length} icons...`}
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-neutral-800 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/25 focus:border-teal-500/50 dark:focus:border-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1" style={colorVars}>
              {categoriesWithCounts.map((cat) => {
                const isActive = activeCategory === cat.name;
                const svg = getCategoryIconSvg(cat.name);
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`al-icon-wrapper shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                        : "text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/60 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    {svg && <CategoryIcon svg={svg} isActive={isActive} />}
                    {cat.name}
                    <span className={`text-[10px] ${
                      isActive
                        ? "text-white/60 dark:text-neutral-900/60"
                        : "text-neutral-400 dark:text-white/25"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setPrimaryColor(preset.p);
                    setSecondaryColor(preset.s);
                  }}
                  className={`h-6 w-6 rounded-full transition-all ${
                    primaryColor === preset.p
                      ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0b] scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${preset.p} 50%, ${preset.s} 50%)`,
                  }}
                  aria-label={`${preset.name} color preset`}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          {/* Icon grid */}
          <div
            className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
            style={colorVars}
          >
            {paginated.map((icon) => (
              <IconCard
                key={icon.name}
                name={icon.name}
                category={icon.category}
                animation={icon.animation}
                svgContent={svgCache[icon.name] ?? null}
              />
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
              <p className="text-neutral-500 dark:text-white/40 text-sm">
                No icons found for &ldquo;{search}&rdquo;
              </p>
              <button
                onClick={() => handleSearchChange("")}
                className="mt-3 text-xs text-teal-600 dark:text-teal-400 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Previous page"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {pageNumbers.map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="h-9 w-5 flex items-center justify-center text-neutral-400 dark:text-white/25 text-sm">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-9 min-w-[36px] rounded-lg px-2 text-sm font-medium transition-all ${
                        page === p
                          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                          : "text-neutral-500 dark:text-white/40 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/25">
                Showing {(page - 1) * PAGE_SIZE + 1}&ndash;{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} icons
              </p>
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
