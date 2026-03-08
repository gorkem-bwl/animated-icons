import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-shield .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-shield .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-shield:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-shield * { transition: opacity 0.2s ease; }
@keyframes shield-solid-shield {
  0% { transform: scale(1); }
  30% { transform: scale(1.08); }
  60% { transform: scale(0.97); }
  100% { transform: scale(1); }
}
  .animated-lucide-shield:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: shield-solid-shield 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
`;

const Shield = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'shield',
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
        className={`animated-lucide-icon animated-lucide-shield ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Shield.displayName = 'Shield';

export { Shield };
export default Shield;
