"use client";

import { useState, useMemo } from "react";
import IconCard from "./IconCard";

interface IconData {
  name: string;
  componentName: string;
  category: string;
  animation: string;
  elementCount: number;
  svg: string;
}

interface GalleryProps {
  icons: IconData[];
}

export default function Gallery({ icons }: GalleryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [primaryColor, setPrimaryColor] = useState("#0d9488");
  const [secondaryColor, setSecondaryColor] = useState("#0f766e");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(icons.map((i) => i.category));
    return ["all", ...Array.from(cats).sort()];
  }, [icons]);

  const filtered = useMemo(() => {
    return icons.filter((icon) => {
      const matchesSearch =
        !search || icon.name.includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [icons, search, activeCategory]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="icon-search" className="sr-only">
            Search icons
          </label>
          <input
            id="icon-search"
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-800 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/25 focus:border-teal-500/50 dark:focus:border-teal-500/30 focus:outline-none focus:ring-1 focus:ring-teal-500/20 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] px-3 py-2 text-xs text-neutral-500 dark:text-white/50 hover:text-neutral-700 dark:hover:text-white/70 transition-colors"
            aria-label="Toggle color customization"
            aria-expanded={showColorPicker}
          >
            <span
              className="h-3 w-3 rounded-full border border-neutral-200 dark:border-white/10"
              style={{ background: primaryColor }}
            />
            <span
              className="h-3 w-3 rounded-full border border-neutral-200 dark:border-white/10"
              style={{ background: secondaryColor }}
            />
            Colors
          </button>
        </div>
      </div>

      {/* Color picker */}
      {showColorPicker && (
        <div className="mb-8 flex flex-wrap items-center gap-6 rounded-xl border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <label htmlFor="primary-color" className="text-xs text-neutral-500 dark:text-white/50">
              Primary
            </label>
            <input
              id="primary-color"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-neutral-200 dark:border-white/10 bg-transparent"
            />
            <code className="text-xs text-neutral-400 dark:text-white/30 font-mono">
              {primaryColor}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="secondary-color" className="text-xs text-neutral-500 dark:text-white/50">
              Secondary
            </label>
            <input
              id="secondary-color"
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-neutral-200 dark:border-white/10 bg-transparent"
            />
            <code className="text-xs text-neutral-400 dark:text-white/30 font-mono">
              {secondaryColor}
            </code>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { p: "#0d9488", s: "#0f766e", name: "Teal" },
              { p: "#3b82f6", s: "#2563eb", name: "Blue" },
              { p: "#ef4444", s: "#dc2626", name: "Red" },
              { p: "#f59e0b", s: "#d97706", name: "Amber" },
              { p: "#8b5cf6", s: "#7c3aed", name: "Violet" },
              { p: "#ec4899", s: "#db2777", name: "Pink" },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setPrimaryColor(preset.p);
                  setSecondaryColor(preset.s);
                }}
                className="flex items-center gap-1 rounded-md border border-neutral-200 dark:border-white/[0.06] px-2 py-1 text-[10px] text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/60 transition-colors"
                aria-label={`${preset.name} color preset`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: preset.p }}
                />
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: preset.s }}
                />
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="tablist"
        aria-label="Icon categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-neutral-200 dark:bg-white/10 text-neutral-800 dark:text-white/80"
                : "text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
        style={
          {
            "--animated-lucide-primary": primaryColor,
            "--animated-lucide-secondary": secondaryColor,
            "--al-primary": primaryColor,
            "--al-secondary": secondaryColor,
          } as React.CSSProperties
        }
      >
        {filtered.map((icon) => (
          <IconCard
            key={icon.name}
            name={icon.name}
            category={icon.category}
            animation={icon.animation}
            svgContent={icon.svg}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-neutral-400 dark:text-white/30 text-sm">
          No icons found matching &ldquo;{search}&rdquo;
        </div>
      )}

      {/* Count */}
      <div className="mt-6 text-center text-xs text-neutral-400 dark:text-white/25">
        Showing {filtered.length} of {icons.length} icons
      </div>
    </div>
  );
}
