import React, { forwardRef } from 'react';

const cssText = `
  .al-delay-0 { --al-delay: 0ms; }
  .al-delay-1 { --al-delay: 80ms; }
  .al-delay-2 { --al-delay: 160ms; }
  .al-delay-3 { --al-delay: 240ms; }
  .al-delay-4 { --al-delay: 320ms; }
  .al-delay-5 { --al-delay: 400ms; }
  .al-delay-6 { --al-delay: 480ms; }
  .al-delay-7 { --al-delay: 560ms; }

  .al-primary { stroke: var(--animated-lucide-primary, var(--al-primary, currentColor)); }
  .al-secondary { stroke: var(--animated-lucide-secondary, var(--al-secondary, currentColor)); }

  .al-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--al-delay, 0ms);
  }
  .animated-lucide-icon:hover .al-anim-fill,
  .al-icon-wrapper:hover .al-anim-fill { fill-opacity: 0.18; }

  .al-anim-draw { }
  .animated-lucide-icon:hover .al-anim-draw,
  .al-icon-wrapper:hover .al-anim-draw { animation: al-draw-in 600ms ease var(--al-delay, 0ms) both; }
  @keyframes al-draw-in { 0% { stroke-dashoffset: var(--al-dash-len, 50); } 100% { stroke-dashoffset: 0; } }

  .al-anim-draw-line { }
  .animated-lucide-icon:hover .al-anim-draw-line,
  .al-icon-wrapper:hover .al-anim-draw-line { animation: al-draw-line 500ms ease var(--al-delay, 0ms) both; }
  @keyframes al-draw-line { 0% { stroke-dashoffset: var(--al-dash-len, 20); } 100% { stroke-dashoffset: 0; } }

  .al-anim-fade { }
  .animated-lucide-icon:hover .al-anim-fade,
  .al-icon-wrapper:hover .al-anim-fade { animation: al-fade-pop 500ms ease var(--al-delay, 0ms) both; }
  @keyframes al-fade-pop { 0% { opacity: 0.3; transform: scale(0.92); } 60% { opacity: 1; transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }

  .al-anim-dot-appear { }
  .animated-lucide-icon:hover .al-anim-dot-appear,
  .al-icon-wrapper:hover .al-anim-dot-appear { animation: al-dot-pop 500ms ease 200ms both; }
  @keyframes al-dot-pop { 0% { transform: scale(1); } 40% { transform: scale(0.3); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .al-anim-bar { transform-origin: center bottom; }
  .animated-lucide-icon:hover .al-anim-bar,
  .al-icon-wrapper:hover .al-anim-bar { animation: al-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms) both; }
  @keyframes al-bar-grow { 0% { transform: scaleY(0.2); } 60% { transform: scaleY(1.08); } 100% { transform: scaleY(1); } }

  .al-anim-scale-pop { transform-origin: center; }
  .animated-lucide-icon:hover .al-anim-scale-pop,
  .al-icon-wrapper:hover .al-anim-scale-pop { animation: al-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms) both; }
  @keyframes al-scale-pop { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 100% { transform: scale(1); } }

  .al-anim-pulse-element { }
  .animated-lucide-icon:hover .al-anim-pulse-element,
  .al-icon-wrapper:hover .al-anim-pulse-element { animation: al-pulse 0.7s ease-in-out; }
  @keyframes al-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .al-anim-gear { transform-origin: 12px 12px; transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms); }
  .animated-lucide-icon:hover .al-anim-gear,
  .al-icon-wrapper:hover .al-anim-gear { transform: rotate(var(--al-rotation, 90deg)); }

  .al-anim-nudge { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms); }
  .animated-lucide-icon:hover .al-anim-nudge,
  .al-icon-wrapper:hover .al-anim-nudge { transform: translate(var(--al-tx, 0px), var(--al-ty, 0px)); }

  .al-anim-bell-ring { transform-origin: 12px 3px; }
  .animated-lucide-icon:hover .al-anim-bell-ring,
  .al-icon-wrapper:hover .al-anim-bell-ring { animation: al-bell-ring 0.7s ease; }
  @keyframes al-bell-ring { 0% { transform: rotate(0deg); } 12% { transform: rotate(14deg); } 24% { transform: rotate(-12deg); } 36% { transform: rotate(8deg); } 48% { transform: rotate(-5deg); } 60% { transform: rotate(2deg); } 100% { transform: rotate(0deg); } }

  .al-anim-heart-beat { transform-origin: 12px 13px; }
  .animated-lucide-icon:hover .al-anim-heart-beat,
  .al-icon-wrapper:hover .al-anim-heart-beat { animation: al-heart-beat 0.8s ease; }
  @keyframes al-heart-beat { 0% { transform: scale(1); } 15% { transform: scale(1.2); } 30% { transform: scale(1); } 45% { transform: scale(1.15); } 60% { transform: scale(1); } }

  .al-anim-rocket-lift { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--al-delay, 0ms); }
  .animated-lucide-icon:hover .al-anim-rocket-lift,
  .al-icon-wrapper:hover .al-anim-rocket-lift { transform: translate(1px, -1.5px); }

  .al-anim-handle-lift { transition: transform 500ms ease var(--al-delay, 0ms); }
  .animated-lucide-icon:hover .al-anim-handle-lift,
  .al-icon-wrapper:hover .al-anim-handle-lift { transform: translateY(-1.5px); }

  .al-anim-page-turn { transform-origin: left center; transition: transform 500ms ease var(--al-delay, 0ms); }
  .animated-lucide-icon:hover .al-anim-page-turn,
  .al-icon-wrapper:hover .al-anim-page-turn { transform: rotateY(-12deg); }

  .al-anim-menu-line { transform-origin: left center; transition: transform 400ms ease var(--al-delay, 0ms); }
  .animated-lucide-icon:hover .al-anim-menu-line,
  .al-icon-wrapper:hover .al-anim-menu-line { transform: scaleX(var(--al-scale-x, 0.7)); }

  .al-anim-mail-flap { transform-origin: center top; }
  .animated-lucide-icon:hover .al-anim-mail-flap,
  .al-icon-wrapper:hover .al-anim-mail-flap { animation: al-mail-flap 700ms ease var(--al-delay, 0ms) both; }
  @keyframes al-mail-flap { 0% { transform: rotateX(0deg); } 40% { transform: rotateX(-30deg); } 70% { transform: rotateX(5deg); } 100% { transform: rotateX(0deg); } }

  .al-anim-shake { transform-origin: center; }
  .animated-lucide-icon:hover .al-anim-shake,
  .al-icon-wrapper:hover .al-anim-shake { animation: al-shake 600ms ease var(--al-delay, 0ms) both; }
  @keyframes al-shake { 0% { transform: translateX(0) rotate(0deg); } 15% { transform: translateX(-1.5px) rotate(-3deg); } 30% { transform: translateX(1.5px) rotate(3deg); } 45% { transform: translateX(-1px) rotate(-2deg); } 60% { transform: translateX(1px) rotate(2deg); } 75% { transform: translateX(-0.5px) rotate(-1deg); } 100% { transform: translateX(0) rotate(0deg); } }

  .al-anim-spin { transform-origin: 12px 12px; }
  .animated-lucide-icon:hover .al-anim-spin,
  .al-icon-wrapper:hover .al-anim-spin { animation: al-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--al-delay, 0ms) both; }
  @keyframes al-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const Volume1 = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'volume 1',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '--al-primary': primaryColor || color,
    '--al-secondary': secondaryColor || color,
    ...style,
  };

  return (
    <>
      <style>{cssText}</style>
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`animated-lucide-icon animated-lucide-icon-volume-1 ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" className="al-primary al-anim-scale-pop al-delay-0" style={{}} />
        <path d="M16 9a5 5 0 0 1 0 6" className="al-secondary al-anim-pulse-element al-delay-1" style={{}} />
      </svg>
    </>
  );
});

Volume1.displayName = 'Volume1';

export { Volume1 };
export default Volume1;
