import PageClient from "@/components/PageClient";
import ThemeToggle from "@/components/ThemeToggle";
import lucideMeta from "@/data/icons-meta.json";
import heroiconsMeta from "@/data/heroicons-meta.json";

export default function Home() {
  const totalIcons = lucideMeta.length + heroiconsMeta.length;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/[0.06] dark:from-teal-500/[0.04] via-transparent to-transparent" />
        <div className="absolute top-4 right-6 z-10">
          <ThemeToggle />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] px-4 py-1.5 text-xs text-neutral-500 dark:text-white/50 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
            {totalIcons.toLocaleString()} animated icons
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl leading-[1.1]">
            <span className="bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-white/50 bg-clip-text text-transparent">
              Animated Icons
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-neutral-500 dark:text-white/40 leading-relaxed">
            Lucide and Heroicons, semantically animated with CSS-only hover
            transitions and two-tone color support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/gorkem-bwl/animated-icons"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-neutral-900 dark:bg-white px-5 py-2.5 text-sm text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
              View on GitHub
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-5 py-2.5 text-sm text-neutral-600 dark:text-white/60 font-medium hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-white/[0.15] transition-colors"
            >
              Browse icons
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-white/[0.06] to-transparent" />
      </header>

      {/* Gallery + Showcase (share color state) */}
      <PageClient lucideMeta={lucideMeta} heroiconsMeta={heroiconsMeta} />

      {/* Usage section */}
      <section className="border-t border-neutral-200 dark:border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white/90">
              Quick start
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-white/40">
              Get animated icons in your project in seconds
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-200 dark:border-white/[0.06] flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500/80" />
                <h3 className="text-xs font-medium text-neutral-600 dark:text-white/60">
                  Lucide (React)
                </h3>
              </div>
              <pre className="p-5 text-[13px] text-neutral-700 dark:text-white/60 font-mono overflow-x-auto leading-relaxed">
{`import { Heart, Mail }
  from 'animated-lucide-react';

function App() {
  return (
    <Heart
      size={24}
      primaryColor="#ef4444"
      secondaryColor="#dc2626"
    />
  );
}`}
              </pre>
            </div>
            <div className="rounded-2xl border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-200 dark:border-white/[0.06] flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500/80" />
                <h3 className="text-xs font-medium text-neutral-600 dark:text-white/60">
                  Heroicons (React)
                </h3>
              </div>
              <pre className="p-5 text-[13px] text-neutral-700 dark:text-white/60 font-mono overflow-x-auto leading-relaxed">
{`import { Heart, Envelope }
  from 'animated-heroicons-react';

function App() {
  return (
    <Heart
      size={24}
      primaryColor="#ef4444"
      secondaryColor="#dc2626"
    />
  );
}`}
              </pre>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-200 dark:border-white/[0.06] flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-500/80" />
              <h3 className="text-xs font-medium text-neutral-600 dark:text-white/60">
                Standalone SVG
              </h3>
            </div>
            <pre className="p-5 text-[13px] text-neutral-700 dark:text-white/60 font-mono overflow-x-auto leading-relaxed">
{`<div class="al-icon-wrapper"
  style="
    --animated-lucide-primary: #0d9488;
    --animated-lucide-secondary: #0f766e;
  ">
  <!-- paste SVG from dist/svg/ -->
</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-white/[0.06] py-10 text-center">
        <p className="text-xs text-neutral-400 dark:text-white/25">
          Built on{" "}
          <a
            href="https://lucide.dev"
            className="underline decoration-neutral-300 dark:decoration-white/20 hover:text-neutral-600 dark:hover:text-white/40 underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucide
          </a>
          {" "}and{" "}
          <a
            href="https://heroicons.com"
            className="underline decoration-neutral-300 dark:decoration-white/20 hover:text-neutral-600 dark:hover:text-white/40 underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Heroicons
          </a>
          {" "}&middot; Icons licensed under ISC / MIT &middot;{" "}
          <a
            href="https://github.com/gorkem-bwl/animated-icons"
            className="underline decoration-neutral-300 dark:decoration-white/20 hover:text-neutral-600 dark:hover:text-white/40 underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}
