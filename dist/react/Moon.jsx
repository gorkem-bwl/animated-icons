import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-moon .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-moon .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-moon:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-moon * { transition: opacity 0.2s ease; }
@keyframes moon-rock {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}
  .animated-lucide-moon:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: moon-rock 0.6s ease both; }
`;

const Moon = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'moon',
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
        className={`animated-lucide-icon animated-lucide-moon ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Moon.displayName = 'Moon';

export { Moon };
export default Moon;
