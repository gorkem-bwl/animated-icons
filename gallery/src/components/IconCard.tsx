"use client";

import { useState } from "react";

interface IconCardProps {
  name: string;
  category: string;
  animation: string;
  svgContent: string;
}

export default function IconCard({
  name,
  category,
  animation,
  svgContent,
}: IconCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `import { ${toPascalCase(name)} } from 'animated-lucide-react';`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // svgContent comes from our build script (trusted source, not user input)
  return (
    <button
      onClick={handleCopy}
      aria-label={`${name} icon. Click to copy import statement`}
      className="al-icon-wrapper group relative flex flex-col items-center gap-3 rounded-xl border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] p-5 transition-all duration-200 hover:border-neutral-300 dark:hover:border-white/[0.15] hover:bg-neutral-100 dark:hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 cursor-pointer"
    >
      <div
        className="flex h-12 w-12 items-center justify-center text-neutral-600 dark:text-white/80 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors [&_svg]:w-7 [&_svg]:h-7"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <span className="text-[11px] font-medium text-neutral-500 dark:text-white/40 group-hover:text-neutral-700 dark:group-hover:text-white/60 transition-colors truncate max-w-full">
        {name}
      </span>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-neutral-400 dark:text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? "copied!" : category}
      </span>
    </button>
  );
}

function toPascalCase(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}
