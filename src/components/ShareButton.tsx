"use client";

const TWEETS: Record<string, string> = {
  en: "Check out 3,640+ beautifully animated icons — CSS-only hover animations for Lucide, Iconoir, and Heroicons 🔥 by @gorkemcetin",
  tr: "3.640+ harika animasyonlu ikon seti — Lucide, Iconoir ve Heroicons için CSS-only hover animasyonları 🔥 by @gorkemcetin",
  de: "Schau dir 3.640+ wunderschön animierte Icons an — CSS-only Hover-Animationen für Lucide, Iconoir und Heroicons 🔥 by @gorkemcetin",
  fr: "Découvrez 3 640+ icônes animées — animations CSS-only au survol pour Lucide, Iconoir et Heroicons 🔥 by @gorkemcetin",
  es: "Mira 3.640+ iconos animados — animaciones CSS-only en hover para Lucide, Iconoir y Heroicons 🔥 by @gorkemcetin",
  pt: "Confira 3.640+ ícones animados — animações CSS-only em hover para Lucide, Iconoir e Heroicons 🔥 by @gorkemcetin",
  ja: "3,640以上の美しいアニメーションアイコン — Lucide、Iconoir、HeroiconsのCSSのみのホバーアニメーション 🔥 by @gorkemcetin",
  ko: "3,640개 이상의 아름다운 애니메이션 아이콘 — Lucide, Iconoir, Heroicons CSS-only 호버 애니메이션 🔥 by @gorkemcetin",
  zh: "3,640+ 精美动画图标 — Lucide、Iconoir 和 Heroicons 的纯 CSS 悬停动画 🔥 by @gorkemcetin",
  ru: "3 640+ красиво анимированных иконок — CSS-only hover анимации для Lucide, Iconoir и Heroicons 🔥 by @gorkemcetin",
  it: "Scopri 3.640+ icone animate — animazioni CSS-only al passaggio del mouse per Lucide, Iconoir e Heroicons 🔥 by @gorkemcetin",
  nl: "Bekijk 3.640+ prachtig geanimeerde iconen — CSS-only hover-animaties voor Lucide, Iconoir en Heroicons 🔥 by @gorkemcetin",
};

function getTweet(): string {
  if (typeof navigator === "undefined") return TWEETS.en;
  const lang = (navigator.language || "en").slice(0, 2).toLowerCase();
  return TWEETS[lang] || TWEETS.en;
}

export default function ShareButton() {
  const handleClick = () => {
    const text = getTweet();
    const url = "https://animated-icons.vercel.app";
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.03] px-3 py-2 text-xs font-medium text-neutral-500 dark:text-white/50 hover:text-neutral-700 dark:hover:text-white/70 transition-colors cursor-pointer"
    >
      Share with <span className="text-red-500">&#10084;</span> on 𝕏
    </button>
  );
}
