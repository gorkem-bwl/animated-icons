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

const EyeDropper = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'eye dropper',
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
        className={`animated-heroicon animated-heroicon-eye-dropper ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" className="ah-primary ah-anim-scale-pop ah-delay-0" style={{}} />
      </svg>
    </>
  );
});

EyeDropper.displayName = 'EyeDropper';

export { EyeDropper };
export default EyeDropper;
