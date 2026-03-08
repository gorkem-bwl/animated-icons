import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-volume-2 .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-volume-2 .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-volume-2:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-volume-2 * { transition: opacity 0.2s ease; }
@keyframes sound-pulse-0 {
  0% { transform: translateX(0); }
  30% { transform: translateX(-2px); }
  60% { transform: translateX(1px); }
  100% { transform: translateX(0); }
}
@keyframes sound-pulse-1 {
  0% { transform: scaleX(1) translateX(0); opacity: 0.4; }
  30% { transform: scaleX(1.4) translateX(3px); opacity: 1; }
  60% { transform: scaleX(0.8) translateX(-1px); opacity: 0.6; }
  100% { transform: scaleX(1) translateX(0); opacity: 0.55; }
}
@keyframes sound-pulse-2 {
  0% { transform: scaleX(1) translateX(0); opacity: 0.4; }
  30% { transform: scaleX(1.4) translateX(3px); opacity: 1; }
  60% { transform: scaleX(0.8) translateX(-1px); opacity: 0.6; }
  100% { transform: scaleX(1) translateX(0); opacity: 0.55; }
}
  .animated-lucide-volume-2:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: sound-pulse-0 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-volume-2:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: sound-pulse-1 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both; }
  .animated-lucide-volume-2:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: sound-pulse-2 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both; }
`;

const Volume2 = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'volume 2',
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
        className={`animated-lucide-icon animated-lucide-volume-2 ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" className="al-el-0 al-primary" style={{}} />
        <path d="M16 9a5 5 0 0 1 0 6" className="al-el-1 al-secondary" style={{ transformOrigin: '4px 12px' }} />
        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" className="al-el-2 al-secondary" style={{ transformOrigin: '4px 12px' }} />
      </svg>
    </>
  );
});

Volume2.displayName = 'Volume2';

export { Volume2 };
export default Volume2;
