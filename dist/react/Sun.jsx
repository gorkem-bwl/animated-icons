import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-sun .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-sun .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-sun:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-sun * { transition: opacity 0.2s ease; }
@keyframes sun-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(45deg); }
}
@keyframes sun-ray-1 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-2 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-3 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-4 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-5 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-6 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-7 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes sun-ray-8 {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
  .animated-lucide-sun:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: sun-spin 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: sun-ray-1 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: sun-ray-2 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: sun-ray-3 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: sun-ray-4 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-5,
  .al-icon-wrapper:hover .al-el-5 { animation: sun-ray-5 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-6,
  .al-icon-wrapper:hover .al-el-6 { animation: sun-ray-6 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-7,
  .al-icon-wrapper:hover .al-el-7 { animation: sun-ray-7 0.6s ease both; }
  .animated-lucide-sun:hover .al-el-8,
  .al-icon-wrapper:hover .al-el-8 { animation: sun-ray-8 0.6s ease both; }
`;

const Sun = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'sun',
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
        className={`animated-lucide-icon animated-lucide-sun ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <circle cx="12" cy="12" r="4" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 2v2" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 20v2" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m4.93 4.93 1.41 1.41" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m17.66 17.66 1.41 1.41" className="al-el-4 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M2 12h2" className="al-el-5 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M20 12h2" className="al-el-6 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m6.34 17.66-1.41 1.41" className="al-el-7 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m19.07 4.93-1.41 1.41" className="al-el-8 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Sun.displayName = 'Sun';

export { Sun };
export default Sun;
