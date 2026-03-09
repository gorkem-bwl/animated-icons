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

const Figma = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'figma',
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
        className={`animated-iconoir animated-iconoir-figma ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M6 6C6 5.20435 6.31607 4.44129 6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3H12V9H9C8.20435 9 7.44129 8.68393 6.87868 8.12132C6.31607 7.55871 6 6.79565 6 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-primary ai-anim-fill ai-delay-0" style={{}} />
        <path d="M12 3H15C15.394 3 15.7841 3.0776 16.1481 3.22836C16.512 3.37913 16.8427 3.6001 17.1213 3.87868C17.3999 4.15726 17.6209 4.48797 17.7716 4.85195C17.9224 5.21593 18 5.60603 18 6C18 6.39397 17.9224 6.78407 17.7716 7.14805C17.6209 7.51203 17.3999 7.84274 17.1213 8.12132C16.8427 8.3999 16.512 8.62087 16.1481 8.77164C15.7841 8.9224 15.394 9 15 9H12V3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-1" style={{}} />
        <path d="M12 12C12 11.606 12.0776 11.2159 12.2284 10.8519C12.3791 10.488 12.6001 10.1573 12.8787 9.87868C13.1573 9.6001 13.488 9.37913 13.8519 9.22836C14.2159 9.0776 14.606 9 15 9C15.394 9 15.7841 9.0776 16.1481 9.22836C16.512 9.37913 16.8427 9.6001 17.1213 9.87868C17.3999 10.1573 17.6209 10.488 17.7716 10.8519C17.9224 11.2159 18 11.606 18 12C18 12.394 17.9224 12.7841 17.7716 13.1481C17.6209 13.512 17.3999 13.8427 17.1213 14.1213C16.8427 14.3999 16.512 14.6209 16.1481 14.7716C15.7841 14.9224 15.394 15 15 15C14.606 15 14.2159 14.9224 13.8519 14.7716C13.488 14.6209 13.1573 14.3999 12.8787 14.1213C12.6001 13.8427 12.3791 13.512 12.2284 13.1481C12.0776 12.7841 12 12.394 12 12V12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-primary ai-anim-fade ai-delay-2" style={{}} />
        <path d="M6 18C6 17.2044 6.31607 16.4413 6.87868 15.8787C7.44129 15.3161 8.20435 15 9 15H12V18C12 18.7956 11.6839 19.5587 11.1213 20.1213C10.5587 20.6839 9.79565 21 9 21C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-secondary ai-anim-fade ai-delay-3" style={{}} />
        <path d="M6 12C6 11.2044 6.31607 10.4413 6.87868 9.87868C7.44129 9.31607 8.20435 9 9 9H12V15H9C8.20435 15 7.44129 14.6839 6.87868 14.1213C6.31607 13.5587 6 12.7956 6 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="ai-primary ai-anim-fade ai-delay-4" style={{}} />
      </svg>
    </>
  );
});

Figma.displayName = 'Figma';

export { Figma };
export default Figma;
