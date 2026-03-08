import Gallery from "@/components/Gallery";
import ThemeToggle from "@/components/ThemeToggle";
import iconsData from "@/data/icons-with-svg.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-neutral-200 dark:border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.04] dark:from-teal-500/[0.03] to-transparent" />
        <div className="absolute top-4 right-6">
          <ThemeToggle />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] px-4 py-1.5 text-xs text-neutral-500 dark:text-white/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
            {iconsData.length} animated icons
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
              Animated Lucide
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500 dark:text-white/45 leading-relaxed">
            Semantically animated Lucide icons with two-tone color support.
            Drop-in replacement for lucide-react. Hover over any icon to preview
            its animation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/gorkem-bwl/animated-icons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] px-4 py-2 text-sm text-neutral-600 dark:text-white/60 font-mono hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-white/[0.15] transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <Gallery icons={iconsData} />

      {/* Usage section */}
      <section className="border-t border-neutral-200 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-white/80 mb-8">
            Quick start
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-white/60 mb-3">
                React
              </h3>
              <pre className="text-sm text-teal-700 dark:text-teal-400/80 font-mono overflow-x-auto">
{`import { Heart, Mail } from 'animated-lucide-react';

function App() {
  return (
    <Heart
      size={24}
      primaryColor="#ef4444"
      secondaryColor="#fca5a5"
      label="Like"
    />
  );
}`}
              </pre>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-white/60 mb-3">
                Standalone SVG
              </h3>
              <pre className="text-sm text-teal-700 dark:text-teal-400/80 font-mono overflow-x-auto">
{`<!-- Inline for hover animations -->
<div style="
  --animated-lucide-primary: #ef4444;
  --animated-lucide-secondary: #fca5a5;
">
  <!-- paste SVG here -->
</div>`}
              </pre>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-neutral-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-white/60 mb-3">
              Customize colors
            </h3>
            <pre className="text-sm text-teal-700 dark:text-teal-400/80 font-mono overflow-x-auto">
{`/* CSS custom properties */
:root {
  --animated-lucide-primary: #0d9488;
  --animated-lucide-secondary: #5eead4;
}

/* Or per-icon via React props */
<Mail primaryColor="#3b82f6" secondaryColor="#93c5fd" />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-white/[0.06] py-8 text-center text-xs text-neutral-400 dark:text-white/25">
        <p>
          Built on{" "}
          <a
            href="https://lucide.dev"
            className="underline hover:text-neutral-600 dark:hover:text-white/40 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucide Icons
          </a>
          . Icons licensed under ISC.
        </p>
      </footer>
    </main>
  );
}
