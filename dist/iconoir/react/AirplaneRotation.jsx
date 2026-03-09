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

const AirplaneRotation = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'airplane rotation',
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
        className={`animated-iconoir animated-iconoir-airplane-rotation ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M9.87868 14.1218C11.0503 15.2934 12.9497 15.2934 14.1213 14.1218C15.2929 12.9502 15.2929 11.0507 14.1213 9.87913C12.9497 8.70756 11.0503 8.70756 9.87868 9.87913C8.70711 11.0507 8.7071 12.9502 9.87868 14.1218Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-primary ai-anim-fill ai-delay-0" style={{}} />
        <path d="M4.37076 16.7726C4.09132 16.3274 3.84879 15.8547 3.64986 15.3612C3.23116 14.323 3.00098 13.1891 3.00098 12.0012C3.00098 7.7649 5.93471 4.20879 9.8792 3.25392C10.5594 3.0891 11.2698 3.00195 12.0002 3.00195" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-1" style={{}} />
        <path d="M19.7148 7.3667C20.5304 8.72132 20.9993 10.3061 20.9993 12.0008C20.9993 15.807 18.6311 19.0638 15.29 20.3786C14.2708 20.7793 13.1605 21 12.0001 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-2" style={{}} />
        <path fillRule="evenodd" clipRule="evenodd" d="M14.1213 9.87918C14.1213 9.87918 14.1121 7.07691 15.5355 5.63653C16.9455 4.22798 18.3293 2.77204 19.7782 4.22232C21.1549 5.60047 19.793 7.03166 18.364 8.46496C16.9625 9.87069 14.1213 9.87918 14.1213 9.87918Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-3" style={{}} />
        <path fillRule="evenodd" clipRule="evenodd" d="M9.87869 14.1208C9.87869 14.1208 9.88788 16.9231 8.46448 18.3635C7.0545 19.772 5.6707 21.228 4.22183 19.7777C2.8451 18.3995 4.20698 16.9683 5.63605 15.535C7.03753 14.1293 9.87869 14.1208 9.87869 14.1208Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-4" style={{}} />
      </svg>
    </>
  );
});

AirplaneRotation.displayName = 'AirplaneRotation';

export { AirplaneRotation };
export default AirplaneRotation;
