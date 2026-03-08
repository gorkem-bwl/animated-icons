import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-navigation .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-navigation .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-navigation:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-navigation * { transition: opacity 0.2s ease; }
@keyframes nav-point-0 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
  .animated-lucide-navigation:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: nav-point-0 0.4s ease both; }
`;

const Navigation = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'navigation',
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
        className={`animated-lucide-icon animated-lucide-navigation ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <polygon points="3 11 22 2 13 21 11 13 3 11" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Navigation.displayName = 'Navigation';

export { Navigation };
export default Navigation;
