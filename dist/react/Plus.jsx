import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-plus .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-plus .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-plus:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-plus * { transition: opacity 0.2s ease; }
@keyframes toggle-pop-plus-0 {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}
@keyframes toggle-pop-plus-1 {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
  .animated-lucide-plus:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: toggle-pop-plus-0 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .animated-lucide-plus:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: toggle-pop-plus-1 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const Plus = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'plus',
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
        className={`animated-lucide-icon animated-lucide-plus ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M5 12h14" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 5v14" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Plus.displayName = 'Plus';

export { Plus };
export default Plus;
