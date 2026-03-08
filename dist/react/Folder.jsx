import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-folder .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-folder .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-folder:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-folder * { transition: opacity 0.2s ease; }
@keyframes folder-open {
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(-15deg); }
  100% { transform: rotateX(0deg); }
}
  .animated-lucide-folder:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: folder-open 0.4s ease both; }
`;

const Folder = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'folder',
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
        className={`animated-lucide-icon animated-lucide-folder ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

Folder.displayName = 'Folder';

export { Folder };
export default Folder;
