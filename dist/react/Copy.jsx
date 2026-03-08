import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-copy .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-copy .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-copy:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-copy * { transition: opacity 0.2s ease; }
@keyframes draw-in-copy-0 {
  0% { stroke-dashoffset: var(--path-length-0); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-copy-1 {
  0% { stroke-dashoffset: var(--path-length-1); }
  100% { stroke-dashoffset: 0; }
}
  .animated-lucide-copy:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: draw-in-copy-0 0.5s ease 0s both; }
  .animated-lucide-copy:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: draw-in-copy-1 0.5s ease 0.1s both; }
`;

const Copy = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'copy',
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
        className={`animated-lucide-icon animated-lucide-copy ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Copy.displayName = 'Copy';

export { Copy };
export default Copy;
