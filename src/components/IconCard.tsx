"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface IconCardProps {
  name: string;
  category: string;
  animation: string;
  svgContent: string | null;
  wrapperClass: string;
  packageName: string;
}

export default function IconCard({
  name,
  category,
  animation,
  svgContent,
  wrapperClass,
  packageName,
}: IconCardProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);

  const componentName = toPascalCase(name);
  const importStatement = `import { ${componentName} } from '${packageName}';`;

  const close = useCallback(() => {
    setOpen(false);
    setCopied(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        cardRef.current &&
        !cardRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, close]);

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const downloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // SVG content from our own build output — trusted, not user input
  return (
    <div className="relative">
      <button
        ref={cardRef}
        onClick={() => setOpen(!open)}
        aria-label={`${name} icon. Click for options`}
        className={`${wrapperClass} group relative flex w-full flex-col items-center gap-2 rounded-xl border border-neutral-100 dark:border-white/[0.04] bg-white dark:bg-white/[0.02] p-4 transition-all duration-200 hover:border-neutral-200 dark:hover:border-white/[0.1] hover:bg-neutral-50 dark:hover:bg-white/[0.05] hover:shadow-sm dark:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 cursor-pointer ${open ? "border-neutral-300 dark:border-white/[0.15] bg-neutral-50 dark:bg-white/[0.05] shadow-sm" : ""}`}
      >
        <div className="flex h-11 w-11 items-center justify-center text-neutral-600 dark:text-white/70 group-hover:text-neutral-900 dark:group-hover:text-white transition-all group-hover:scale-110 [&_svg]:w-7 [&_svg]:h-7">
          {svgContent ? (
            // SVG content from our own build output — trusted, not user input
            <span dangerouslySetInnerHTML={{ __html: svgContent }} />
          ) : (
            <span className="h-6 w-6 rounded bg-neutral-100 dark:bg-white/[0.06] animate-pulse" />
          )}
        </div>
        <span className="text-[10px] font-medium transition-all truncate max-w-full leading-tight text-neutral-400 dark:text-white/30 group-hover:text-neutral-600 dark:group-hover:text-white/50">
          {name}
        </span>
      </button>

      {open && svgContent && (
        <div
          ref={popoverRef}
          className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#141415] shadow-lg dark:shadow-black/40 overflow-hidden"
        >

          {/* Icon preview — SVG from our own build output, trusted */}
          <div className={`${wrapperClass} flex items-center gap-3 px-4 pt-4 pb-3`}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-white/80 [&_svg]:w-7 [&_svg]:h-7">
              <span dangerouslySetInnerHTML={{ __html: svgContent }} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white/90 truncate">{componentName}</p>
              <p className="text-[11px] text-neutral-400 dark:text-white/30 truncate">{name}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 px-4 pb-3">
            <span className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-white/40 capitalize">
              {category}
            </span>
            <span className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-white/40">
              {animation}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-100 dark:bg-white/[0.06]" />

          {/* Actions */}
          <div className="p-1.5">
            <button
              onClick={() => copyText(importStatement, "import")}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] text-neutral-600 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <svg className="h-3.5 w-3.5 shrink-0 text-neutral-400 dark:text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span className="flex-1">{copied === "import" ? "Copied!" : "Copy import"}</span>
              {copied !== "import" && <code className="text-[10px] text-neutral-300 dark:text-white/20 font-mono truncate max-w-[100px]">{componentName}</code>}
            </button>

            <button
              onClick={() => copyText(svgContent, "svg")}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] text-neutral-600 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <svg className="h-3.5 w-3.5 shrink-0 text-neutral-400 dark:text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span className="flex-1">{copied === "svg" ? "Copied!" : "Copy SVG"}</span>
            </button>

            <button
              onClick={downloadSvg}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] text-neutral-600 dark:text-white/60 hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <svg className="h-3.5 w-3.5 shrink-0 text-neutral-400 dark:text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span className="flex-1">Download SVG</span>
              <span className="text-[10px] text-neutral-300 dark:text-white/20">.svg</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function toPascalCase(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
