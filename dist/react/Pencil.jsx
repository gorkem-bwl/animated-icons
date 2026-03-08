import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-pencil .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-pencil .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-pencil:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-pencil * { transition: opacity 0.2s ease; }
@keyframes draw-in-pencil-0 {
  0% { stroke-dashoffset: var(--path-length-0); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-pencil-1 {
  0% { stroke-dashoffset: var(--path-length-1); }
  100% { stroke-dashoffset: 0; }
}
  .animated-lucide-pencil:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: draw-in-pencil-0 0.5s ease 0s both; }
  .animated-lucide-pencil:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: draw-in-pencil-1 0.5s ease 0.1s both; }
`;

const Pencil = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'pencil',
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
        className={`animated-lucide-icon animated-lucide-pencil ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="m15 5 4 4" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Pencil.displayName = 'Pencil';

export { Pencil };
export default Pencil;
