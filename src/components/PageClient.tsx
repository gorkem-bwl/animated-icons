"use client";

import { useState } from "react";
import Gallery from "./Gallery";
import Showcase from "./Showcase";
import { ICON_SET_CONFIG, ICON_SET_KEYS } from "@/data/icon-set-config";
import type { IconSet } from "@/data/icon-set-config";

export type { IconSet };
export { ICON_SET_CONFIG };

export interface IconMeta {
  name: string;
  componentName: string;
  category: string;
  animation: string;
  elementCount: number;
}

interface PageClientProps {
  metaBySet: Record<string, IconMeta[]>;
}

export default function PageClient({ metaBySet }: PageClientProps) {
  const [activeSet, setActiveSet] = useState<IconSet>(ICON_SET_KEYS[0]);
  const [primaryColor, setPrimaryColor] = useState("#0d9488");
  const [secondaryColor, setSecondaryColor] = useState("#0f766e");

  const iconsMeta = metaBySet[activeSet] || [];
  const config = ICON_SET_CONFIG[activeSet];

  return (
    <>
      {/* Icon set selector */}
      <div className="border-b border-neutral-200 dark:border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-center gap-1 py-2">
            {ICON_SET_KEYS.map((set) => {
              const cfg = ICON_SET_CONFIG[set];
              const count = metaBySet[set]?.length || 0;
              const isActive = activeSet === set;
              return (
                <button
                  key={set}
                  onClick={() => setActiveSet(set)}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-all cursor-pointer rounded-lg ${
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-400 dark:text-white/30 hover:text-neutral-600 dark:hover:text-white/50"
                  }`}
                >
                  {cfg.label}
                  <span className={`ml-2 text-xs tabular-nums ${
                    isActive ? "text-neutral-500 dark:text-white/40" : "text-neutral-300 dark:text-white/20"
                  }`}>
                    {count.toLocaleString()}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-neutral-900 dark:bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div id="gallery">
        <Gallery
          iconsMeta={iconsMeta}
          activeSet={activeSet}
          config={config}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onColorChange={(p, s) => {
            setPrimaryColor(p);
            setSecondaryColor(s);
          }}
        />
      </div>
      {activeSet === "lucide" && (
        <Showcase primaryColor={primaryColor} secondaryColor={secondaryColor} />
      )}
    </>
  );
}
