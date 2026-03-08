import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-bar-chart-2 .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-bar-chart-2 .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-bar-chart-2:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-bar-chart-2 * { transition: opacity 0.2s ease; }
@keyframes bar-rise-bar-chart-2-0 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes bar-rise-bar-chart-2-1 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes bar-rise-bar-chart-2-2 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
  .animated-lucide-bar-chart-2:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bar-rise-bar-chart-2-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-bar-chart-2:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bar-rise-bar-chart-2-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s both; }
  .animated-lucide-bar-chart-2:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: bar-rise-bar-chart-2-2 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.16s both; }
`;

const BarChart2 = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'bar chart 2',
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
        className={`animated-lucide-icon animated-lucide-bar-chart-2 ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M5 21v-6" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M12 21V3" className="al-el-1 al-secondary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M19 21V9" className="al-el-2 al-primary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

BarChart2.displayName = 'BarChart2';

export { BarChart2 };
export default BarChart2;
