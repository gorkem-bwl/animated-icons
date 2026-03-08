import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-alert-triangle .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-alert-triangle .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-alert-triangle:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-alert-triangle * { transition: opacity 0.2s ease; }
@keyframes pulse-alert-triangle-0 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes pulse-alert-triangle-1 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes pulse-alert-triangle-2 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
}
  .animated-lucide-alert-triangle:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: pulse-alert-triangle-0 0.5s ease 0s both; }
  .animated-lucide-alert-triangle:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: pulse-alert-triangle-1 0.5s ease 0.1s both; }
  .animated-lucide-alert-triangle:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: pulse-alert-triangle-2 0.5s ease 0.2s both; }
`;

const AlertTriangle = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'alert triangle',
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
        className={`animated-lucide-icon animated-lucide-alert-triangle ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 9v4" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 17h.01" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

AlertTriangle.displayName = 'AlertTriangle';

export { AlertTriangle };
export default AlertTriangle;
