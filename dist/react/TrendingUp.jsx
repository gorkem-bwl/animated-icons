import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-trending-up .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-trending-up .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-trending-up:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-trending-up * { transition: opacity 0.2s ease; }
@keyframes bar-rise-trending-up-0 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes bar-rise-trending-up-1 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
  .animated-lucide-trending-up:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bar-rise-trending-up-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-trending-up:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bar-rise-trending-up-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s both; }
`;

const TrendingUp = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'trending up',
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
        className={`animated-lucide-icon animated-lucide-trending-up ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M16 7h6v6" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="m22 7-8.5 8.5-5-5L2 17" className="al-el-1 al-secondary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

TrendingUp.displayName = 'TrendingUp';

export { TrendingUp };
export default TrendingUp;
