import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-play .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-play .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-play:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-play * { transition: opacity 0.2s ease; }
@keyframes play-press-0 {
  0% { transform: scale(1) translateX(0); }
  25% { transform: scale(0.75) translateX(-2px); }
  50% { transform: scale(1.2) translateX(3px); }
  75% { transform: scale(0.95) translateX(0); }
  100% { transform: scale(1) translateX(0); }
}
  .animated-lucide-play:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: play-press-0 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
`;

const Play = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'play',
  style = {},
  ...props
}, ref) => {
  const styleId = useId();

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
        className={`animated-lucide-icon animated-lucide-play ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" className="al-el-0 al-primary" style={{ transformOrigin: '10px 12px' }} />
      </svg>
    </>
  );
});

Play.displayName = 'Play';

export { Play };
export default Play;
