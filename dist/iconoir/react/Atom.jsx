import React, { forwardRef } from 'react';

const cssText = `
  .ai-delay-0 { --ai-delay: 0ms; }
  .ai-delay-1 { --ai-delay: 80ms; }
  .ai-delay-2 { --ai-delay: 160ms; }
  .ai-delay-3 { --ai-delay: 240ms; }
  .ai-delay-4 { --ai-delay: 320ms; }
  .ai-delay-5 { --ai-delay: 400ms; }
  .ai-delay-6 { --ai-delay: 480ms; }
  .ai-delay-7 { --ai-delay: 560ms; }

  .ai-primary { stroke: var(--animated-iconoir-primary, var(--ai-primary, currentColor)); }
  .ai-secondary { stroke: var(--animated-iconoir-secondary, var(--ai-secondary, currentColor)); }

  .ai-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--ai-delay, 0ms);
  }
  .animated-iconoir:hover .ai-anim-fill,
  .ai-icon-wrapper:hover .ai-anim-fill { fill-opacity: 0.18; }

  .ai-anim-draw { }
  .animated-iconoir:hover .ai-anim-draw,
  .ai-icon-wrapper:hover .ai-anim-draw { animation: ai-draw-in 600ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-draw-in { 0% { stroke-dashoffset: var(--ai-dash-len, 50); } 100% { stroke-dashoffset: 0; } }

  .ai-anim-draw-line { }
  .animated-iconoir:hover .ai-anim-draw-line,
  .ai-icon-wrapper:hover .ai-anim-draw-line { animation: ai-draw-line 500ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-draw-line { 0% { stroke-dashoffset: var(--ai-dash-len, 20); } 100% { stroke-dashoffset: 0; } }

  .ai-anim-fade { }
  .animated-iconoir:hover .ai-anim-fade,
  .ai-icon-wrapper:hover .ai-anim-fade { animation: ai-fade-pop 500ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-fade-pop { 0% { opacity: 0.3; transform: scale(0.92); } 60% { opacity: 1; transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }

  .ai-anim-dot-appear { }
  .animated-iconoir:hover .ai-anim-dot-appear,
  .ai-icon-wrapper:hover .ai-anim-dot-appear { animation: ai-dot-pop 500ms ease 200ms both; }
  @keyframes ai-dot-pop { 0% { transform: scale(1); } 40% { transform: scale(0.3); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .ai-anim-bar { transform-origin: center bottom; }
  .animated-iconoir:hover .ai-anim-bar,
  .ai-icon-wrapper:hover .ai-anim-bar { animation: ai-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms) both; }
  @keyframes ai-bar-grow { 0% { transform: scaleY(0.2); } 60% { transform: scaleY(1.08); } 100% { transform: scaleY(1); } }

  .ai-anim-scale-pop { transform-origin: center; }
  .animated-iconoir:hover .ai-anim-scale-pop,
  .ai-icon-wrapper:hover .ai-anim-scale-pop { animation: ai-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms) both; }
  @keyframes ai-scale-pop { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 100% { transform: scale(1); } }

  .ai-anim-pulse-element { }
  .animated-iconoir:hover .ai-anim-pulse-element,
  .ai-icon-wrapper:hover .ai-anim-pulse-element { animation: ai-pulse 0.7s ease-in-out; }
  @keyframes ai-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .ai-anim-gear { transform-origin: 12px 12px; transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-gear,
  .ai-icon-wrapper:hover .ai-anim-gear { transform: rotate(var(--ai-rotation, 90deg)); }

  .ai-anim-nudge { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-nudge,
  .ai-icon-wrapper:hover .ai-anim-nudge { transform: translate(var(--ai-tx, 0px), var(--ai-ty, 0px)); }

  .ai-anim-bell-ring { transform-origin: 12px 3px; }
  .animated-iconoir:hover .ai-anim-bell-ring,
  .ai-icon-wrapper:hover .ai-anim-bell-ring { animation: ai-bell-ring 0.7s ease; }
  @keyframes ai-bell-ring { 0% { transform: rotate(0deg); } 12% { transform: rotate(14deg); } 24% { transform: rotate(-12deg); } 36% { transform: rotate(8deg); } 48% { transform: rotate(-5deg); } 60% { transform: rotate(2deg); } 100% { transform: rotate(0deg); } }

  .ai-anim-heart-beat { transform-origin: 12px 13px; }
  .animated-iconoir:hover .ai-anim-heart-beat,
  .ai-icon-wrapper:hover .ai-anim-heart-beat { animation: ai-heart-beat 0.8s ease; }
  @keyframes ai-heart-beat { 0% { transform: scale(1); } 15% { transform: scale(1.2); } 30% { transform: scale(1); } 45% { transform: scale(1.15); } 60% { transform: scale(1); } }

  .ai-anim-rocket-lift { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-rocket-lift,
  .ai-icon-wrapper:hover .ai-anim-rocket-lift { transform: translate(1px, -1.5px); }

  .ai-anim-handle-lift { transition: transform 500ms ease var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-handle-lift,
  .ai-icon-wrapper:hover .ai-anim-handle-lift { transform: translateY(-1.5px); }

  .ai-anim-page-turn { transform-origin: left center; transition: transform 500ms ease var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-page-turn,
  .ai-icon-wrapper:hover .ai-anim-page-turn { transform: rotateY(-12deg); }

  .ai-anim-menu-line { transform-origin: left center; transition: transform 400ms ease var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-menu-line,
  .ai-icon-wrapper:hover .ai-anim-menu-line { transform: scaleX(var(--ai-scale-x, 0.7)); }

  .ai-anim-mail-flap { transform-origin: center top; }
  .animated-iconoir:hover .ai-anim-mail-flap,
  .ai-icon-wrapper:hover .ai-anim-mail-flap { animation: ai-mail-flap 700ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-mail-flap { 0% { transform: rotateX(0deg); } 40% { transform: rotateX(-30deg); } 70% { transform: rotateX(5deg); } 100% { transform: rotateX(0deg); } }

  .ai-anim-shake { transform-origin: center; }
  .animated-iconoir:hover .ai-anim-shake,
  .ai-icon-wrapper:hover .ai-anim-shake { animation: ai-shake 600ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-shake { 0% { transform: translateX(0) rotate(0deg); } 15% { transform: translateX(-1.5px) rotate(-3deg); } 30% { transform: translateX(1.5px) rotate(3deg); } 45% { transform: translateX(-1px) rotate(-2deg); } 60% { transform: translateX(1px) rotate(2deg); } 75% { transform: translateX(-0.5px) rotate(-1deg); } 100% { transform: translateX(0) rotate(0deg); } }

  .ai-anim-spin { transform-origin: 12px 12px; }
  .animated-iconoir:hover .ai-anim-spin,
  .ai-icon-wrapper:hover .ai-anim-spin { animation: ai-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--ai-delay, 0ms) both; }
  @keyframes ai-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const Atom = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'atom',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '--ai-primary': primaryColor || color,
    '--ai-secondary': secondaryColor || color,
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
        className={`animated-iconoir animated-iconoir-atom ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M4.40434 13.6099C3.51517 13.1448 3 12.5924 3 12C3 10.3431 7.02944 9 12 9C16.9706 9 21 10.3431 21 12C21 12.7144 20.2508 13.3705 19 13.8858" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-primary ai-anim-fill ai-delay-0" style={{}} />
        <path d="M12 11.01L12.01 10.9989" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-1" style={{}} />
        <path d="M16.8827 6C16.878 4.97702 16.6199 4.25309 16.0856 3.98084C14.6093 3.22864 11.5832 6.20912 9.32664 10.6379C7.07005 15.0667 6.43747 19.2668 7.91374 20.019C8.44117 20.2877 9.16642 20.08 9.98372 19.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-2" style={{}} />
        <path d="M9.60092 4.25164C8.94056 3.86579 8.35719 3.75489 7.91369 3.98086C6.43742 4.73306 7.06999 8.93309 9.32658 13.3619C11.5832 17.7907 14.6092 20.7712 16.0855 20.019C17.3977 19.3504 17.0438 15.9577 15.3641 12.1016" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-3" style={{}} />
      </svg>
    </>
  );
});

Atom.displayName = 'Atom';

export { Atom };
export default Atom;
