"use client";

import { useState, useEffect, useRef } from "react";
import { ICON_SET_CONFIG } from "@/data/icon-set-config";
import type { IconSet } from "@/data/icon-set-config";

/* ─── Per-set showcase data ─── */

interface ShowcaseIconDef {
  sidebar: { icon: string; label: string; active?: boolean; badge?: string }[];
  tabs: { icon: string; label: string; active?: boolean }[];
  buttonsLabeled: { icon: string; label: string }[];
  buttonsIcon: string[];
  toolbar: string[][];
  cardActions: { icon: string; label?: string }[];
  cardBookmark: string;
  bottomNav: { icon: string; label: string; active?: boolean; fab?: boolean }[];
}

interface ShowcaseSetConfig {
  icons: ShowcaseIconDef;
  chunkMap: Record<string, number>;
  chunkPrefix: string;
}

const SHOWCASE_CONFIGS: Record<string, ShowcaseSetConfig> = {
  lucide: {
    chunkPrefix: "/data/lucide/icons-chunk-",
    chunkMap: {
      home: 4, inbox: 4, calendar: 1, settings: 7, user: 9,
      search: 7, heart: 4, "share-2": 7, bookmark: 1, plus: 6,
      bold: 1, italic: 4, underline: 9, "align-left": 0,
      copy: 2, "trash-2": 8, archive: 0, send: 7, star: 8,
      "file-text": 3, image: 4, play: 6, download: 3,
      "shopping-cart": 7, "map-pin": 5, "message-square": 5,
      phone: 6, globe: 4, bell: 1, mail: 5, layers: 5,
      "bar-chart-2": 0, eye: 3, lock: 5, code: 2, zap: 9,
      scissors: 7, "arrow-right": 0, check: 1, camera: 1,
    },
    icons: {
      sidebar: [
        { icon: "home", label: "Home", active: true },
        { icon: "inbox", label: "Inbox", badge: "3" },
        { icon: "calendar", label: "Calendar" },
        { icon: "bar-chart-2", label: "Analytics" },
        { icon: "settings", label: "Settings" },
      ],
      tabs: [
        { icon: "layers", label: "Overview", active: true },
        { icon: "mail", label: "Messages" },
      ],
      buttonsLabeled: [
        { icon: "send", label: "Send" },
        { icon: "download", label: "Download" },
      ],
      buttonsIcon: ["heart", "bookmark", "share-2", "copy", "trash-2"],
      toolbar: [
        ["bold", "italic", "underline"],
        ["align-left", "copy", "scissors"],
        ["image", "code"],
      ],
      cardActions: [
        { icon: "heart", label: "24" },
        { icon: "message-square", label: "8" },
        { icon: "share-2" },
      ],
      cardBookmark: "bookmark",
      bottomNav: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Search" },
        { icon: "camera", label: "Camera", fab: true },
        { icon: "bell", label: "Alerts" },
        { icon: "user", label: "Profile" },
      ],
    },
  },
  heroicons: {
    chunkPrefix: "/data/heroicons/icons-chunk-",
    chunkMap: {
      home: 2, inbox: 2, calendar: 0, cog: 1, user: 3,
      "magnifying-glass": 2, heart: 2, share: 2, bookmark: 0,
      plus: 2, bold: 0, italic: 2, underline: 3, envelope: 1,
      bell: 0, "paper-airplane": 2, "arrow-down-tray": 0,
      "shopping-cart": 2, "map-pin": 2, "chat-bubble-left": 1,
      phone: 2, "globe-alt": 1, star: 2, scissors: 2, photo: 2,
      pencil: 2, trash: 3, eye: 1, "lock-closed": 2,
      "code-bracket": 1, "document-text": 1, check: 1, camera: 0,
      "chart-bar": 0, "squares-2x2": 2,
    },
    icons: {
      sidebar: [
        { icon: "home", label: "Home", active: true },
        { icon: "inbox", label: "Inbox", badge: "3" },
        { icon: "calendar", label: "Calendar" },
        { icon: "chart-bar", label: "Analytics" },
        { icon: "cog", label: "Settings" },
      ],
      tabs: [
        { icon: "squares-2x2", label: "Overview", active: true },
        { icon: "envelope", label: "Messages" },
      ],
      buttonsLabeled: [
        { icon: "paper-airplane", label: "Send" },
        { icon: "arrow-down-tray", label: "Download" },
      ],
      buttonsIcon: ["heart", "bookmark", "share", "pencil", "trash"],
      toolbar: [
        ["bold", "italic", "underline"],
        ["scissors", "pencil", "eye"],
        ["photo", "code-bracket"],
      ],
      cardActions: [
        { icon: "heart", label: "24" },
        { icon: "chat-bubble-left", label: "8" },
        { icon: "share" },
      ],
      cardBookmark: "bookmark",
      bottomNav: [
        { icon: "home", label: "Home", active: true },
        { icon: "magnifying-glass", label: "Search" },
        { icon: "camera", label: "Camera", fab: true },
        { icon: "bell", label: "Alerts" },
        { icon: "user", label: "Profile" },
      ],
    },
  },
  iconoir: {
    chunkPrefix: "/data/iconoir/icons-chunk-",
    chunkMap: {
      home: 3, mail: 3, calendar: 0, settings: 5, user: 6,
      search: 5, heart: 3, "share-ios": 5, bookmark: 0,
      send: 5, download: 1, cart: 1, "map-pin": 3,
      "chat-bubble": 1, phone: 4, globe: 2, bell: 0,
      star: 5, "edit-pencil": 2, trash: 6, eye: 2,
      lock: 3, code: 1, bold: 0, italic: 3, underline: 6,
      camera: 1, "graph-up": 2, "view-grid": 6, play: 4,
      scissor: 5, "media-image": 3, "color-picker": 1,
    },
    icons: {
      sidebar: [
        { icon: "home", label: "Home", active: true },
        { icon: "mail", label: "Inbox", badge: "3" },
        { icon: "calendar", label: "Calendar" },
        { icon: "graph-up", label: "Analytics" },
        { icon: "settings", label: "Settings" },
      ],
      tabs: [
        { icon: "view-grid", label: "Overview", active: true },
        { icon: "mail", label: "Messages" },
      ],
      buttonsLabeled: [
        { icon: "send", label: "Send" },
        { icon: "download", label: "Download" },
      ],
      buttonsIcon: ["heart", "bookmark", "share-ios", "edit-pencil", "trash"],
      toolbar: [
        ["bold", "italic", "underline"],
        ["scissor", "edit-pencil", "eye"],
        ["media-image", "code"],
      ],
      cardActions: [
        { icon: "heart", label: "24" },
        { icon: "chat-bubble", label: "8" },
        { icon: "share-ios" },
      ],
      cardBookmark: "bookmark",
      bottomNav: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Search" },
        { icon: "camera", label: "Camera", fab: true },
        { icon: "bell", label: "Alerts" },
        { icon: "user", label: "Profile" },
      ],
    },
  },
};

/* ─── Component ─── */

interface ShowcaseProps {
  primaryColor: string;
  secondaryColor: string;
  activeSet: IconSet;
}

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

export default function Showcase({ primaryColor, secondaryColor, activeSet }: ShowcaseProps) {
  const [svgCacheBySet, setSvgCacheBySet] = useState<Record<string, Record<string, string>>>({});
  const loadedSets = useRef<Set<string>>(new Set());

  const showcaseConfig = SHOWCASE_CONFIGS[activeSet];
  const setConfig = ICON_SET_CONFIG[activeSet];
  const svgCache = svgCacheBySet[activeSet] || {};
  const wrapperClass = setConfig.wrapperClass;

  const COLOR_VARS = {
    [setConfig.primaryVar]: primaryColor,
    [setConfig.secondaryVar]: secondaryColor,
    [setConfig.shortPrimaryVar]: primaryColor,
    [setConfig.shortSecondaryVar]: secondaryColor,
  } as React.CSSProperties;

  useEffect(() => {
    if (!showcaseConfig || loadedSets.current.has(activeSet)) return;
    loadedSets.current.add(activeSet);
    const chunks = [...new Set(Object.values(showcaseConfig.chunkMap))];
    Promise.all(
      chunks.map((i) =>
        fetch(`${showcaseConfig.chunkPrefix}${i}.json`)
          .then((r) => r.json())
          .catch(() => ({}))
      )
    ).then((results) => {
      const merged: Record<string, string> = {};
      for (const r of results) Object.assign(merged, r);
      setSvgCacheBySet((prev) => ({ ...prev, [activeSet]: merged }));
    });
  }, [activeSet, showcaseConfig]);

  if (!showcaseConfig) return null;

  const { icons } = showcaseConfig;

  return (
    <section className="border-t border-neutral-200 dark:border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-6 py-20" style={COLOR_VARS}>
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white/90">
            See {setConfig.label} in action
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-white/40">
            Hover over any element to preview the animation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Sidebar */}
          <ExampleCard title="Sidebar" dot="bg-teal-500">
            <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl p-3 space-y-0.5">
              {icons.sidebar.map((item) => (
                <div
                  key={item.label}
                  className={`${wrapperClass} flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer transition-all ${
                    item.active
                      ? "bg-teal-500/15 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300"
                      : "text-neutral-600 dark:text-white/50 hover:bg-neutral-100 dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <AnimIcon name={item.icon} cache={svgCache} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.active
                        ? "bg-teal-500/20 text-teal-700 dark:text-teal-300"
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
                {icons.tabs.map((tab) => (
                  <div
                    key={tab.label}
                    className={`${wrapperClass} flex items-center gap-1.5 px-4 py-3 text-xs font-medium cursor-pointer transition-all border-b-2 ${
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
                {icons.buttonsLabeled.map((btn, i) => (
                  <button
                    key={btn.icon}
                    className={`${wrapperClass} inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      i === 0
                        ? "bg-teal-500/15 dark:bg-teal-500/15 hover:bg-teal-500/25 dark:hover:bg-teal-500/25 text-teal-700 dark:text-teal-300"
                        : "border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-neutral-700 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    <AnimIcon name={btn.icon} cache={svgCache} size="h-4 w-4" />
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {icons.buttonsIcon.map((icon) => (
                  <button
                    key={icon}
                    className={`${wrapperClass} h-9 w-9 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] flex items-center justify-center text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/70 hover:border-neutral-300 dark:hover:border-white/[0.15] transition-all cursor-pointer`}
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
              {icons.toolbar.map((group, gi) => (
                <span key={gi} className="contents">
                  {gi > 0 && <div className="w-px h-5 bg-neutral-200 dark:bg-white/[0.08] mx-1" />}
                  {group.map((icon) => (
                    <button
                      key={icon}
                      className={`${wrapperClass} h-8 w-8 rounded-lg flex items-center justify-center text-neutral-500 dark:text-white/40 hover:bg-neutral-200 dark:hover:bg-white/[0.1] hover:text-neutral-700 dark:hover:text-white/70 transition-all cursor-pointer`}
                    >
                      <AnimIcon name={icon} cache={svgCache} size="h-4 w-4" />
                    </button>
                  ))}
                </span>
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
                  {icons.cardActions.map((action) => (
                    <button
                      key={action.icon}
                      className={`${wrapperClass} flex items-center gap-1 text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/60 transition-colors cursor-pointer`}
                    >
                      <AnimIcon name={action.icon} cache={svgCache} size="h-4 w-4" />
                      {action.label && <span className="text-[11px]">{action.label}</span>}
                    </button>
                  ))}
                </div>
                <button className={`${wrapperClass} text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/60 transition-colors cursor-pointer`}>
                  <AnimIcon name={icons.cardBookmark} cache={svgCache} size="h-4 w-4" />
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
                {icons.bottomNav.map((item) => (
                  <div
                    key={item.label}
                    className={`${wrapperClass} flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                      item.fab ? "relative -top-3" : ""
                    }`}
                  >
                    <div className={`flex items-center justify-center transition-colors ${
                      item.fab
                        ? "h-10 w-10 rounded-full bg-teal-500/20 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 shadow-sm ring-1 ring-teal-500/20"
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
