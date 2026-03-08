import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-compass .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-compass .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-compass:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-compass * { transition: opacity 0.2s ease; }
@keyframes draw-in-compass-0 {
  0% { stroke-dashoffset: var(--path-length-0); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-compass-1 {
  0% { stroke-dashoffset: var(--path-length-1); }
  100% { stroke-dashoffset: 0; }
}
  .animated-lucide-compass:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: draw-in-compass-0 0.5s ease 0s both; }
  .animated-lucide-compass:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: draw-in-compass-1 0.5s ease 0.1s both; }
`;

const Compass = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'compass',
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
        className={`animated-lucide-icon animated-lucide-compass ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <circle cx="12" cy="12" r="10" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Compass.displayName = 'Compass';

export { Compass };
export default Compass;
