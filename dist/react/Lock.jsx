import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-lock .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-lock .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-lock:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-lock * { transition: opacity 0.2s ease; }
@keyframes bounce-lock-0 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
@keyframes bounce-lock-1 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
  .animated-lucide-lock:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bounce-lock-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-lock:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bounce-lock-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s both; }
`;

const Lock = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'lock',
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
        className={`animated-lucide-icon animated-lucide-lock ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Lock.displayName = 'Lock';

export { Lock };
export default Lock;
