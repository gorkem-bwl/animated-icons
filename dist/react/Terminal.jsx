import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-terminal .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-terminal .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-terminal:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-terminal * { transition: opacity 0.2s ease; }
@keyframes type-terminal-0 {
  0% { stroke-dashoffset: var(--path-length-0); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-terminal-1 {
  0% { stroke-dashoffset: var(--path-length-1); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
  .animated-lucide-terminal:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: type-terminal-0 0.4s ease 0s both; }
  .animated-lucide-terminal:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: type-terminal-1 0.4s ease 0.12s both; }
`;

const Terminal = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'terminal',
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
        className={`animated-lucide-icon animated-lucide-terminal ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M12 19h8" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="m4 17 6-6-6-6" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Terminal.displayName = 'Terminal';

export { Terminal };
export default Terminal;
