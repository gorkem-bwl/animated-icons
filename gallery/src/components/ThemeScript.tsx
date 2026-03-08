"use client";

// Inline script to prevent flash of wrong theme on load.
// Content is a hardcoded static string — no user input involved.
export function ThemeScript() {
  const themeScript = `(function(){var t=localStorage.getItem('al-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})()`;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
