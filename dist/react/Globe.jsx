import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-globe .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-globe .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-globe:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-globe * { transition: opacity 0.2s ease; }
@keyframes globe-spin-0 {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(20deg); }
}
@keyframes globe-spin-1 {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-10deg); }
}
@keyframes globe-spin-2 {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-10deg); }
}
  .animated-lucide-globe:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: globe-spin-0 0.6s ease both; }
  .animated-lucide-globe:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: globe-spin-1 0.6s ease both; }
  .animated-lucide-globe:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: globe-spin-2 0.6s ease both; }
`;

const Globe = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'globe',
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
        className={`animated-lucide-icon animated-lucide-globe ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <circle cx="12" cy="12" r="10" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M2 12h20" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Globe.displayName = 'Globe';

export { Globe };
export default Globe;
