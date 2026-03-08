import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-rocket .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-rocket .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-rocket:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-rocket * { transition: opacity 0.2s ease; }
@keyframes rocket-launch-0 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -3px); }
  100% { transform: translate(0, 0); }
}
@keyframes rocket-launch-1 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -3px); }
  100% { transform: translate(0, 0); }
}
@keyframes rocket-launch-2 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -3px); }
  100% { transform: translate(0, 0); }
}
@keyframes rocket-launch-3 {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -3px); }
  100% { transform: translate(0, 0); }
}
  .animated-lucide-rocket:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: rocket-launch-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-rocket:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: rocket-launch-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s both; }
  .animated-lucide-rocket:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: rocket-launch-2 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both; }
  .animated-lucide-rocket:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: rocket-launch-3 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15000000000000002s both; }
`;

const Rocket = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'rocket',
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
        className={`animated-lucide-icon animated-lucide-rocket ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Rocket.displayName = 'Rocket';

export { Rocket };
export default Rocket;
