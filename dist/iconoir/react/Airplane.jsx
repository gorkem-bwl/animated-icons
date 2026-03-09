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

const Airplane = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'airplane',
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
        className={`animated-iconoir animated-iconoir-airplane ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M10.5 4.5V9.16745C10.5 9.37433 10.3934 9.56661 10.218 9.67625L2.782 14.3237C2.60657 14.4334 2.5 14.6257 2.5 14.8325V15.7315C2.5 16.1219 2.86683 16.4083 3.24552 16.3136L9.75448 14.6864C10.1332 14.5917 10.5 14.8781 10.5 15.2685V18.2277C10.5 18.4008 10.4253 18.5654 10.2951 18.6793L8.13481 20.5695C7.6765 20.9706 8.03808 21.7204 8.63724 21.6114L11.8927 21.0195C11.9636 21.0066 12.0364 21.0066 12.1073 21.0195L15.3628 21.6114C15.9619 21.7204 16.3235 20.9706 15.8652 20.5695L13.7049 18.6793C13.5747 18.5654 13.5 18.4008 13.5 18.2277V15.2685C13.5 14.8781 13.8668 14.5917 14.2455 14.6864L20.7545 16.3136C21.1332 16.4083 21.5 16.1219 21.5 15.7315V14.8325C21.5 14.6257 21.3934 14.4334 21.218 14.3237L13.782 9.67625C13.6066 9.56661 13.5 9.37433 13.5 9.16745V4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-primary ai-anim-scale-pop ai-delay-0" style={{}} />
      </svg>
    </>
  );
});

Airplane.displayName = 'Airplane';

export { Airplane };
export default Airplane;
