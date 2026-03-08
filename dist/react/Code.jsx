import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-code .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-code .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-code:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-code * { transition: opacity 0.2s ease; }
@keyframes type-code-0 {
  0% { stroke-dashoffset: var(--path-length-0); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-code-1 {
  0% { stroke-dashoffset: var(--path-length-1); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
  .animated-lucide-code:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: type-code-0 0.4s ease 0s both; }
  .animated-lucide-code:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: type-code-1 0.4s ease 0.12s both; }
`;

const Code = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'code',
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
        className={`animated-lucide-icon animated-lucide-code ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m16 18 6-6-6-6" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="m8 6-6 6 6 6" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Code.displayName = 'Code';

export { Code };
export default Code;
