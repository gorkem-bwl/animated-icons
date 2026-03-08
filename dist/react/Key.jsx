import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-key .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-key .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-key:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-key * { transition: opacity 0.2s ease; }
@keyframes bounce-key-0 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
@keyframes bounce-key-1 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
@keyframes bounce-key-2 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
  .animated-lucide-key:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bounce-key-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-key:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bounce-key-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s both; }
  .animated-lucide-key:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: bounce-key-2 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s both; }
`;

const Key = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'key',
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
        className={`animated-lucide-icon animated-lucide-key ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m21 2-9.6 9.6" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <circle cx="7.5" cy="15.5" r="5.5" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Key.displayName = 'Key';

export { Key };
export default Key;
