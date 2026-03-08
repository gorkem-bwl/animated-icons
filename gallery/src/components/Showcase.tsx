"use client";

import { useState, useEffect, useRef } from "react";

// Map icon names to their chunk indices (based on sorted icons-meta.json)
const ICON_CHUNK_MAP: Record<string, number> = {
  home: 4, inbox: 4, calendar: 1, settings: 7, user: 9,
  search: 7, heart: 4, "share-2": 7, bookmark: 1, plus: 6,
  bold: 1, italic: 4, underline: 9, "align-left": 0,
  copy: 2, "trash-2": 8, archive: 0, send: 7, star: 8,
  "file-text": 3, image: 4, play: 6, download: 3,
  "shopping-cart": 7, "map-pin": 5, "message-square": 5,
  phone: 6, globe: 4, bell: 1, mail: 5, layers: 5,
  "bar-chart-2": 0, eye: 3, lock: 5, code: 2, zap: 9,
  scissors: 7, "arrow-right": 0, check: 1,
};

const COLOR_VARS = {
  "--animated-lucide-primary": "#0d9488",
  "--animated-lucide-secondary": "#0f766e",
  "--al-primary": "#0d9488",
  "--al-secondary": "#0f766e",
} as React.CSSProperties;

// SVG content from our own build output — trusted, not user input
function AnimIcon({ name, cache, size = "h-5 w-5" }: { name: string; cache: Record<string, string>; size?: string }) {
  const svg = cache[name];
  if (!svg) return <span className={`inline-block animate-pulse rounded bg-neutral-200 dark:bg-white/[0.06] ${size}`} />;
  return (
    <span
      className={`inline-flex items-center justify-center [&_svg]:w-full [&_svg]:h-full ${size}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function Showcase() {
  const [svgCache, setSvgCache] = useState<Record<string, string>>({});
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const chunks = [...new Set(Object.values(ICON_CHUNK_MAP))];
    Promise.all(
      chunks.map((i) =>
        fetch(`/data/icons-chunk-${i}.json`)
          .then((r) => r.json())
          .catch(() => ({}))
      )
    ).then((results) => {
      const merged: Record<string, string> = {};
      for (const r of results) Object.assign(merged, r);
      setSvgCache(merged);
    });
  }, []);

  return (
    <section className="border-t border-neutral-200 dark:border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-6 py-20" style={COLOR_VARS}>
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white/90">
            See them in action
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-white/40">
            Hover over any element to preview the animation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Sidebar */}
          <ExampleCard title="Sidebar" dot="bg-teal-500">
            <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl p-3 space-y-0.5">
              {[
                { icon: "home", label: "Home", active: true, badge: "" },
                { icon: "inbox", label: "Inbox", active: false, badge: "3" },
                { icon: "calendar", label: "Calendar", active: false, badge: "" },
                { icon: "bar-chart-2", label: "Analytics", active: false, badge: "" },
                { icon: "settings", label: "Settings", active: false, badge: "" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`al-icon-wrapper flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer transition-all ${
                    item.active
                      ? "bg-teal-600 text-white"
                      : "text-neutral-600 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <AnimIcon name={item.icon} cache={svgCache} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.active
                        ? "bg-white/20 text-white"
                        : "bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ExampleCard>

          {/* 2. Tab bar */}
          <ExampleCard title="Tabs" dot="bg-blue-500">
            <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl overflow-hidden">
              <div className="flex border-b border-neutral-200 dark:border-white/[0.06]">
                {[
                  { icon: "layers", label: "Overview", active: true },
                  { icon: "mail", label: "Messages" },
                  { icon: "file-text", label: "Files" },
                  { icon: "settings", label: "Settings" },
                ].map((tab) => (
                  <div
                    key={tab.label}
                    className={`al-icon-wrapper flex items-center gap-1.5 px-4 py-3 text-xs font-medium cursor-pointer transition-all border-b-2 ${
                      tab.active
                        ? "border-teal-500 text-teal-700 dark:text-teal-400"
                        : "border-transparent text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/50"
                    }`}
                  >
                    <AnimIcon name={tab.icon} cache={svgCache} size="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 text-xs text-neutral-400 dark:text-white/25">
                Tab content area
              </div>
            </div>
          </ExampleCard>

          {/* 3. Buttons */}
          <ExampleCard title="Buttons" dot="bg-violet-500">
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                <button className="al-icon-wrapper inline-flex items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm text-white font-medium transition-colors cursor-pointer">
                  <AnimIcon name="plus" cache={svgCache} size="h-4 w-4" />
                  Create new
                </button>
                <button className="al-icon-wrapper inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] px-4 py-2 text-sm text-neutral-700 dark:text-white/60 font-medium hover:bg-neutral-50 dark:hover:bg-white/[0.08] transition-colors cursor-pointer">
                  <AnimIcon name="download" cache={svgCache} size="h-4 w-4" />
                  Download
                </button>
              </div>
              <div className="flex gap-2">
                {["heart", "bookmark", "share-2", "copy", "trash-2"].map((icon) => (
                  <button
                    key={icon}
                    className="al-icon-wrapper h-9 w-9 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] flex items-center justify-center text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 hover:border-neutral-300 dark:hover:border-white/[0.15] transition-all cursor-pointer"
                  >
                    <AnimIcon name={icon} cache={svgCache} size="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </ExampleCard>

          {/* 4. Toolbar */}
          <ExampleCard title="Toolbar" dot="bg-amber-500">
            <div className="flex items-center gap-1 bg-neutral-50 dark:bg-white/[0.03] rounded-xl p-2">
              {["bold", "italic", "underline"].map((icon) => (
                <button
                  key={icon}
                  className="al-icon-wrapper h-8 w-8 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/[0.1] hover:text-neutral-700 dark:hover:text-white/70 transition-all cursor-pointer"
                >
                  <AnimIcon name={icon} cache={svgCache} size="h-4 w-4" />
                </button>
              ))}
              <div className="w-px h-5 bg-neutral-200 dark:bg-white/[0.08] mx-1" />
              {["align-left", "copy", "scissors"].map((icon) => (
                <button
                  key={icon}
                  className="al-icon-wrapper h-8 w-8 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/[0.1] hover:text-neutral-700 dark:hover:text-white/70 transition-all cursor-pointer"
                >
                  <AnimIcon name={icon} cache={svgCache} size="h-4 w-4" />
                </button>
              ))}
              <div className="w-px h-5 bg-neutral-200 dark:bg-white/[0.08] mx-1" />
              {["image", "code"].map((icon) => (
                <button
                  key={icon}
                  className="al-icon-wrapper h-8 w-8 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/[0.1] hover:text-neutral-700 dark:hover:text-white/70 transition-all cursor-pointer"
                >
                  <AnimIcon name={icon} cache={svgCache} size="h-4 w-4" />
                </button>
              ))}
            </div>
          </ExampleCard>

          {/* 5. Card actions */}
          <ExampleCard title="Card actions" dot="bg-pink-500">
            <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-white/[0.06]">
                <div className="h-2.5 w-28 rounded bg-neutral-200 dark:bg-white/[0.1] mb-2" />
                <div className="h-2 w-full rounded bg-neutral-100 dark:bg-white/[0.05] mb-1.5" />
                <div className="h-2 w-3/4 rounded bg-neutral-100 dark:bg-white/[0.05]" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex gap-3">
                  {[
                    { icon: "heart", label: "24" },
                    { icon: "message-square", label: "8" },
                    { icon: "share-2", label: "" },
                  ].map((action) => (
                    <button
                      key={action.icon}
                      className="al-icon-wrapper flex items-center gap-1 text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/60 transition-colors cursor-pointer"
                    >
                      <AnimIcon name={action.icon} cache={svgCache} size="h-4 w-4" />
                      {action.label && <span className="text-[11px]">{action.label}</span>}
                    </button>
                  ))}
                </div>
                <button className="al-icon-wrapper text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/60 transition-colors cursor-pointer">
                  <AnimIcon name="bookmark" cache={svgCache} size="h-4 w-4" />
                </button>
              </div>
            </div>
          </ExampleCard>

          {/* 6. Bottom nav */}
          <ExampleCard title="Bottom nav" dot="bg-emerald-500">
            <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl overflow-hidden">
              <div className="p-4 text-xs text-neutral-300 dark:text-white/15 text-center">
                App content
              </div>
              <div className="flex items-end justify-around border-t border-neutral-200 dark:border-white/[0.06] py-2 px-3">
                {[
                  { icon: "home", label: "Home", active: true },
                  { icon: "search", label: "Search" },
                  { icon: "plus", label: "New", fab: true },
                  { icon: "bell", label: "Alerts" },
                  { icon: "user", label: "Profile" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`al-icon-wrapper flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                      item.fab ? "relative -top-3" : ""
                    }`}
                  >
                    <div className={`flex items-center justify-center transition-colors ${
                      item.fab
                        ? "h-10 w-10 rounded-full bg-teal-600 text-white shadow-md"
                        : item.active
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/50"
                    }`}>
                      <AnimIcon name={item.icon} cache={svgCache} size={item.fab ? "h-5 w-5" : "h-[18px] w-[18px]"} />
                    </div>
                    <span className={`text-[9px] font-medium ${
                      item.active
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-neutral-400 dark:text-white/30"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ExampleCard>
        </div>
      </div>
    </section>
  );
}

function ExampleCard({ title, dot, children }: { title: string; dot: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] overflow-hidden">
      <div className="px-5 py-3 border-b border-neutral-100 dark:border-white/[0.04] flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <h3 className="text-xs font-medium text-neutral-500 dark:text-white/50">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
