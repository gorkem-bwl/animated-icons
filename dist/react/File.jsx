import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-file .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-file .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-file:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-file * { transition: opacity 0.2s ease; }
@keyframes page-reveal-file-0 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}
@keyframes page-reveal-file-1 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}
  .animated-lucide-file:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: page-reveal-file-0 0.4s ease 0s both; }
  .animated-lucide-file:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: page-reveal-file-1 0.4s ease 0.07s both; }
`;

const File = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'file',
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
        className={`animated-lucide-icon animated-lucide-file ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" className="al-el-1 al-secondary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

File.displayName = 'File';

export { File };
export default File;
