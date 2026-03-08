import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-redo .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-redo .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-redo:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-redo * { transition: opacity 0.2s ease; }
@keyframes redo-sweep-0 {
  0% { transform: rotate(0deg) scale(1); }
  40% { transform: rotate(-30deg) scale(0.9); }
  70% { transform: rotate(10deg) scale(1.05); }
  100% { transform: rotate(0deg) scale(1); }
}
@keyframes redo-sweep-1 {
  0% { transform: translateX(0) translateY(0); }
  40% { transform: translateX(4px) translateY(-3px); }
  70% { transform: translateX(-1px) translateY(1px); }
  100% { transform: translateX(0) translateY(0); }
}
  .animated-lucide-redo:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: redo-sweep-0 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .animated-lucide-redo:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: redo-sweep-1 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const Redo = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'redo',
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
        className={`animated-lucide-icon animated-lucide-redo ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M21 7v6h-6" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Redo.displayName = 'Redo';

export { Redo };
export default Redo;
