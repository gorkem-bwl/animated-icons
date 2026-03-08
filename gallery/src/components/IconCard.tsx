"use client";

import { useState } from "react";

interface IconCardProps {
  name: string;
  category: string;
  animation: string;
  svgContent: string | null;
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

  return (
    <button
      onClick={handleCopy}
      aria-label={`${name} icon. Click to copy import statement`}
      className="al-icon-wrapper group relative flex flex-col items-center gap-2 rounded-xl border border-neutral-100 dark:border-white/[0.04] bg-white dark:bg-white/[0.02] p-4 transition-all duration-200 hover:border-neutral-200 dark:hover:border-white/[0.1] hover:bg-neutral-50 dark:hover:bg-white/[0.05] hover:shadow-sm dark:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 cursor-pointer"
    >
      <div className="flex h-10 w-10 items-center justify-center text-neutral-600 dark:text-white/70 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors [&_svg]:w-6 [&_svg]:h-6">
        {svgContent ? (
          <span dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : (
          <span className="h-6 w-6 rounded bg-neutral-100 dark:bg-white/[0.06] animate-pulse" />
        )}
      </div>
      <span className={`text-[10px] font-medium transition-all truncate max-w-full leading-tight ${
        copied
          ? "text-teal-600 dark:text-teal-400"
          : "text-neutral-400 dark:text-white/30 group-hover:text-neutral-600 dark:group-hover:text-white/50"
      }`}>
        {copied ? "copied!" : name}
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
