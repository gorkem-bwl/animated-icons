import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-clipboard .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-clipboard .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-clipboard:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-clipboard * { transition: opacity 0.2s ease; }
@keyframes page-reveal-clipboard-0 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}
@keyframes page-reveal-clipboard-1 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}
  .animated-lucide-clipboard:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: page-reveal-clipboard-0 0.4s ease 0s both; }
  .animated-lucide-clipboard:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: page-reveal-clipboard-1 0.4s ease 0.07s both; }
`;

const Clipboard = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'clipboard',
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
        className={`animated-lucide-icon animated-lucide-clipboard ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" className="al-el-1 al-secondary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

Clipboard.displayName = 'Clipboard';

export { Clipboard };
export default Clipboard;
