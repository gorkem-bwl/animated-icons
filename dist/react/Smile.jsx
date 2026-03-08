import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-smile .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-smile .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-smile:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-smile * { transition: opacity 0.2s ease; }
@keyframes smile-pop-0 {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
@keyframes smile-pop-1 {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes smile-pop-2 {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes smile-pop-3 {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
  .animated-lucide-smile:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: smile-pop-0 0.4s ease 0s both; }
  .animated-lucide-smile:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: smile-pop-1 0.4s ease 0.05s both; }
  .animated-lucide-smile:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: smile-pop-2 0.4s ease 0.1s both; }
  .animated-lucide-smile:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: smile-pop-3 0.4s ease 0.15000000000000002s both; }
`;

const Smile = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'smile',
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
        className={`animated-lucide-icon animated-lucide-smile ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <circle cx="12" cy="12" r="10" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <line x1="9" x2="9.01" y1="9" y2="9" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <line x1="15" x2="15.01" y1="9" y2="9" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Smile.displayName = 'Smile';

export { Smile };
export default Smile;
