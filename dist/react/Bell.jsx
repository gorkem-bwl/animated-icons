import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-bell .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-bell .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-bell:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-bell * { transition: opacity 0.2s ease; }
@keyframes bell-ring {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(12deg); }
  30% { transform: rotate(-10deg); }
  45% { transform: rotate(8deg); }
  60% { transform: rotate(-5deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}
@keyframes bell-part-1 {
  0% { transform: translateX(0); }
  25% { transform: translateX(1.5px); }
  50% { transform: translateX(-1.5px); }
  75% { transform: translateX(0.5px); }
  100% { transform: translateX(0); }
}
  .animated-lucide-bell:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bell-ring 0.5s ease both; }
  .animated-lucide-bell:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bell-part-1 0.5s ease both; }
`;

const Bell = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'bell',
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
        className={`animated-lucide-icon animated-lucide-bell ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M10.268 21a2 2 0 0 0 3.464 0" className="al-el-0 al-primary" style={{ transformOrigin: '12px 3px' }} />
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 3px' }} />
      </svg>
    </>
  );
});

Bell.displayName = 'Bell';

export { Bell };
export default Bell;
