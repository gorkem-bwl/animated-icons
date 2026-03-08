import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-camera .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-camera .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-camera:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-camera * { transition: opacity 0.2s ease; }
@keyframes shutter-click-0 {
  0% { transform: scale(1); }
  20% { transform: scale(0.88); }
  40% { transform: scale(1.06); }
  60% { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes shutter-click-1 {
  0% { transform: scale(1); opacity: 1; }
  20% { transform: scale(0.5); opacity: 0.3; }
  40% { transform: scale(1.3); opacity: 1; }
  60% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
  .animated-lucide-camera:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: shutter-click-0 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-camera:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: shutter-click-1 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s both; }
`;

const Camera = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'camera',
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
        className={`animated-lucide-icon animated-lucide-camera ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" className="al-el-0 al-primary" style={{ transformOrigin: '12px 13px' }} />
        <circle cx="12" cy="13" r="3" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 13px' }} />
      </svg>
    </>
  );
});

Camera.displayName = 'Camera';

export { Camera };
export default Camera;
