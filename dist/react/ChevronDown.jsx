import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-chevron-down .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-chevron-down .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-chevron-down:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-chevron-down * { transition: opacity 0.2s ease; }
@keyframes chevron-bounce {
  0% { transform: translateY(0); }
  30% { transform: translateY(5px); }
  50% { transform: translateY(-3px); }
  70% { transform: translateY(2px); }
  100% { transform: translateY(0); }
}
  .animated-lucide-chevron-down:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: chevron-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const ChevronDown = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'chevron down',
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
        className={`animated-lucide-icon animated-lucide-chevron-down ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m6 9 6 6 6-6" className="al-el-0 al-primary" style={{}} />
      </svg>
    </>
  );
});

ChevronDown.displayName = 'ChevronDown';

export { ChevronDown };
export default ChevronDown;
