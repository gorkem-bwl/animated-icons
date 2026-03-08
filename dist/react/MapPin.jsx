import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-map-pin .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-map-pin .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-map-pin:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-map-pin * { transition: opacity 0.2s ease; }
@keyframes pin-drop-0 {
  0% { transform: translateY(-4px); opacity: 0.5; }
  60% { transform: translateY(1px); opacity: 1; }
  80% { transform: translateY(-1px); }
  100% { transform: translateY(0); }
}
@keyframes pin-drop-1 {
  0% { transform: translateY(-4px); opacity: 0.5; }
  60% { transform: translateY(1px); opacity: 1; }
  80% { transform: translateY(-1px); }
  100% { transform: translateY(0); }
}
  .animated-lucide-map-pin:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: pin-drop-0 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-map-pin:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: pin-drop-1 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s both; }
`;

const MapPin = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'map pin',
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
        className={`animated-lucide-icon animated-lucide-map-pin ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" className="al-el-0 al-primary" style={{ transformOrigin: '12px 24px' }} />
        <circle cx="12" cy="10" r="3" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 24px' }} />
      </svg>
    </>
  );
});

MapPin.displayName = 'MapPin';

export { MapPin };
export default MapPin;
