"use client";
import { useEffect, useState } from "react";

export default function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/gorkem-bwl/animated-icons")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
  }, []);

  if (stars === null) return null;

  return (
    <a
      href="https://github.com/gorkem-bwl/animated-icons"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-500 dark:text-white/50 hover:text-neutral-700 dark:hover:text-white/70 hover:border-neutral-300 dark:hover:border-white/[0.15] transition-colors backdrop-blur-sm"
    >
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
      </svg>
      {stars.toLocaleString()}
    </a>
  );
}
