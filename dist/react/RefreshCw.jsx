import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-refresh-cw .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-refresh-cw .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-refresh-cw:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-refresh-cw * { transition: opacity 0.2s ease; }
@keyframes spin-refresh-cw-0 {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-refresh-cw-1 {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-refresh-cw-2 {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-refresh-cw-3 {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
  .animated-lucide-refresh-cw:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: spin-refresh-cw-0 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
  .animated-lucide-refresh-cw:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: spin-refresh-cw-1 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
  .animated-lucide-refresh-cw:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: spin-refresh-cw-2 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
  .animated-lucide-refresh-cw:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: spin-refresh-cw-3 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
`;

const RefreshCw = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'refresh cw',
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
        className={`animated-lucide-icon animated-lucide-refresh-cw ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M21 3v5h-5" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M8 16H3v5" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

RefreshCw.displayName = 'RefreshCw';

export { RefreshCw };
export default RefreshCw;
