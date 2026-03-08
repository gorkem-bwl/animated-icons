import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-zap .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-zap .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-zap:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-zap * { transition: opacity 0.2s ease; }
@keyframes zap-flash-0 {
  0% { opacity: 1; transform: scale(1); }
  20% { opacity: 0.6; transform: scale(0.9); }
  40% { opacity: 1; transform: scale(1.15); }
  60% { opacity: 0.8; transform: scale(1); }
  80% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
  .animated-lucide-zap:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: zap-flash-0 0.4s ease both; }
`;

const Zap = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'zap',
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
        className={`animated-lucide-icon animated-lucide-zap ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Zap.displayName = 'Zap';

export { Zap };
export default Zap;
