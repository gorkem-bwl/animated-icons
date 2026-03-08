import React, { forwardRef } from 'react';

const cssText = `
  /* Delay utilities - 80ms increments */
  .ah-delay-0 { --ah-delay: 0ms; }
  .ah-delay-1 { --ah-delay: 80ms; }
  .ah-delay-2 { --ah-delay: 160ms; }
  .ah-delay-3 { --ah-delay: 240ms; }
  .ah-delay-4 { --ah-delay: 320ms; }
  .ah-delay-5 { --ah-delay: 400ms; }
  .ah-delay-6 { --ah-delay: 480ms; }
  .ah-delay-7 { --ah-delay: 560ms; }

  /* Two-tone colors */
  .ah-primary { stroke: var(--animated-heroicon-primary, var(--ah-primary, currentColor)); }
  .ah-secondary { stroke: var(--animated-heroicon-secondary, var(--ah-secondary, currentColor)); }

  /* ── Fill animation: shape fills with translucent color ── */
  .ah-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-fill,
  .ah-icon-wrapper:hover .ah-anim-fill {
    fill-opacity: 0.18;
  }

  /* ── Draw animation: path re-draws on hover via keyframe ── */
  .ah-anim-draw {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-draw,
  .ah-icon-wrapper:hover .ah-anim-draw {
    animation: ah-draw-in 600ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-draw-in {
    0% { stroke-dashoffset: var(--ah-dash-len, 50); }
    100% { stroke-dashoffset: 0; }
  }

  /* ── Draw-line: shorter lines re-draw on hover ── */
  .ah-anim-draw-line {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-draw-line,
  .ah-icon-wrapper:hover .ah-anim-draw-line {
    animation: ah-draw-line 500ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-draw-line {
    0% { stroke-dashoffset: var(--ah-dash-len, 20); }
    100% { stroke-dashoffset: 0; }
  }

  /* ── Fade animation: subtle pop on hover (fully visible by default) ── */
  .ah-anim-fade {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-fade,
  .ah-icon-wrapper:hover .ah-anim-fade {
    animation: ah-fade-pop 500ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-fade-pop {
    0% { opacity: 0.3; transform: scale(0.92); }
    60% { opacity: 1; transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1); }
  }

  /* ── Dot appear: dot pops on hover (fully visible by default) ── */
  .ah-anim-dot-appear {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-dot-appear,
  .ah-icon-wrapper:hover .ah-anim-dot-appear {
    animation: ah-dot-pop 500ms ease 200ms both;
  }
  @keyframes ah-dot-pop {
    0% { transform: scale(1); }
    40% { transform: scale(0.3); }
    70% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  /* ── Bar animation: bars bounce on hover (full size by default) ── */
  .ah-anim-bar {
    transform-origin: center bottom;
  }
  .animated-heroicon:hover .ah-anim-bar,
  .ah-icon-wrapper:hover .ah-anim-bar {
    animation: ah-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms) both;
  }
  @keyframes ah-bar-grow {
    0% { transform: scaleY(0.2); }
    60% { transform: scaleY(1.08); }
    100% { transform: scaleY(1); }
  }

  /* ── Scale-pop: element pops with scale ── */
  .ah-anim-scale-pop {
    transform-origin: center;
  }
  .animated-heroicon:hover .ah-anim-scale-pop,
  .ah-icon-wrapper:hover .ah-anim-scale-pop {
    animation: ah-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms) both;
  }
  @keyframes ah-scale-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  /* ── Pulse element: pulsing opacity for attention ── */
  .ah-anim-pulse-element {
    /* Fully visible by default */
  }
  .animated-heroicon:hover .ah-anim-pulse-element,
  .ah-icon-wrapper:hover .ah-anim-pulse-element {
    animation: ah-pulse 0.7s ease-in-out;
  }
  @keyframes ah-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── Gear: rotation on hover ── */
  .ah-anim-gear {
    transform-origin: 12px 12px;
    transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-gear,
  .ah-icon-wrapper:hover .ah-anim-gear {
    transform: rotate(var(--ah-rotation, 90deg));
  }

  /* ── Nudge: translate in a direction ── */
  .ah-anim-nudge {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-nudge,
  .ah-icon-wrapper:hover .ah-anim-nudge {
    transform: translate(var(--ah-tx, 0px), var(--ah-ty, 0px));
  }

  /* ── Bell ring: keyframe ring animation ── */
  .ah-anim-bell-ring {
    transform-origin: 12px 3px;
  }
  .animated-heroicon:hover .ah-anim-bell-ring,
  .ah-icon-wrapper:hover .ah-anim-bell-ring {
    animation: ah-bell-ring 0.7s ease;
  }
  @keyframes ah-bell-ring {
    0% { transform: rotate(0deg); }
    12% { transform: rotate(14deg); }
    24% { transform: rotate(-12deg); }
    36% { transform: rotate(8deg); }
    48% { transform: rotate(-5deg); }
    60% { transform: rotate(2deg); }
    100% { transform: rotate(0deg); }
  }

  /* ── Heart beat: keyframe scale ── */
  .ah-anim-heart-beat {
    transform-origin: 12px 13px;
  }
  .animated-heroicon:hover .ah-anim-heart-beat,
  .ah-icon-wrapper:hover .ah-anim-heart-beat {
    animation: ah-heart-beat 0.8s ease;
  }
  @keyframes ah-heart-beat {
    0% { transform: scale(1); }
    15% { transform: scale(1.2); }
    30% { transform: scale(1); }
    45% { transform: scale(1.15); }
    60% { transform: scale(1); }
  }

  /* ── Rocket lift ── */
  .ah-anim-rocket-lift {
    transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-rocket-lift,
  .ah-icon-wrapper:hover .ah-anim-rocket-lift {
    transform: translate(1px, -1.5px);
  }

  /* ── Handle lift (trash lid, lock shackle) ── */
  .ah-anim-handle-lift {
    transition: transform 500ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-handle-lift,
  .ah-icon-wrapper:hover .ah-anim-handle-lift {
    transform: translateY(-1.5px);
  }

  /* ── Page turn ── */
  .ah-anim-page-turn {
    transform-origin: left center;
    transition: transform 500ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-page-turn,
  .ah-icon-wrapper:hover .ah-anim-page-turn {
    transform: rotateY(-12deg);
  }

  /* ── Menu line (staggered scaleX) ── */
  .ah-anim-menu-line {
    transform-origin: left center;
    transition: transform 400ms ease var(--ah-delay, 0ms);
  }
  .animated-heroicon:hover .ah-anim-menu-line,
  .ah-icon-wrapper:hover .ah-anim-menu-line {
    transform: scaleX(var(--ah-scale-x, 0.7));
  }

  /* ── Mail flap: envelope opens and closes ── */
  .ah-anim-mail-flap {
    transform-origin: center top;
  }
  .animated-heroicon:hover .ah-anim-mail-flap,
  .ah-icon-wrapper:hover .ah-anim-mail-flap {
    animation: ah-mail-flap 700ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-mail-flap {
    0% { transform: rotateX(0deg); }
    40% { transform: rotateX(-30deg); }
    70% { transform: rotateX(5deg); }
    100% { transform: rotateX(0deg); }
  }

  /* ── Shake: horizontal wobble ── */
  .ah-anim-shake {
    transform-origin: center;
  }
  .animated-heroicon:hover .ah-anim-shake,
  .ah-icon-wrapper:hover .ah-anim-shake {
    animation: ah-shake 600ms ease var(--ah-delay, 0ms) both;
  }
  @keyframes ah-shake {
    0% { transform: translateX(0) rotate(0deg); }
    15% { transform: translateX(-1.5px) rotate(-3deg); }
    30% { transform: translateX(1.5px) rotate(3deg); }
    45% { transform: translateX(-1px) rotate(-2deg); }
    60% { transform: translateX(1px) rotate(2deg); }
    75% { transform: translateX(-0.5px) rotate(-1deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  /* ── Spin: full 360 rotation ── */
  .ah-anim-spin {
    transform-origin: 12px 12px;
  }
  .animated-heroicon:hover .ah-anim-spin,
  .ah-icon-wrapper:hover .ah-anim-spin {
    animation: ah-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--ah-delay, 0ms) both;
  }
  @keyframes ah-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GlobeAsiaAustralia = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'globe asia australia',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '--ah-primary': primaryColor || color,
    '--ah-secondary': secondaryColor || color,
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
        className={`animated-heroicon animated-heroicon-globe-asia-australia ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" className="ah-primary ah-anim-fill ah-delay-0" style={{}} />
      </svg>
    </>
  );
});

GlobeAsiaAustralia.displayName = 'GlobeAsiaAustralia';

export { GlobeAsiaAustralia };
export default GlobeAsiaAustralia;
