import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-inbox .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-inbox .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-inbox:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-inbox * { transition: opacity 0.2s ease; }
@keyframes inbox-drop-0 {
  0% { transform: translateY(-10px); opacity: 0; }
  50% { transform: translateY(3px); opacity: 1; }
  70% { transform: translateY(-2px); }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes inbox-drop-1 {
  0% { transform: scaleY(1) translateY(0); }
  50% { transform: scaleY(0.92) translateY(2px); }
  100% { transform: scaleY(1) translateY(0); }
}
  .animated-lucide-inbox:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: inbox-drop-0 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-inbox:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: inbox-drop-1 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s both; }
`;

const Inbox = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'inbox',
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
        className={`animated-lucide-icon animated-lucide-inbox ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" className="al-el-0 al-secondary" style={{}} />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" className="al-el-1 al-primary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

Inbox.displayName = 'Inbox';

export { Inbox };
export default Inbox;
