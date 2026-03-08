import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-loader .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-loader .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-loader:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-loader * { transition: opacity 0.2s ease; }
@keyframes loader-spin-0 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-1 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-2 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-3 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-4 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-5 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-6 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes loader-spin-7 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  .animated-lucide-loader:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: loader-spin-0 0.8s linear; }
  .animated-lucide-loader:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: loader-spin-1 0.8s linear; }
  .animated-lucide-loader:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: loader-spin-2 0.8s linear; }
  .animated-lucide-loader:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: loader-spin-3 0.8s linear; }
  .animated-lucide-loader:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: loader-spin-4 0.8s linear; }
  .animated-lucide-loader:hover .al-el-5,
  .al-icon-wrapper:hover .al-el-5 { animation: loader-spin-5 0.8s linear; }
  .animated-lucide-loader:hover .al-el-6,
  .al-icon-wrapper:hover .al-el-6 { animation: loader-spin-6 0.8s linear; }
  .animated-lucide-loader:hover .al-el-7,
  .al-icon-wrapper:hover .al-el-7 { animation: loader-spin-7 0.8s linear; }
`;

const Loader = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'loader',
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
        className={`animated-lucide-icon animated-lucide-loader ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M12 2v4" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m16.2 7.8 2.9-2.9" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M18 12h4" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m16.2 16.2 2.9 2.9" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M12 18v4" className="al-el-4 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m4.9 19.1 2.9-2.9" className="al-el-5 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M2 12h4" className="al-el-6 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m4.9 4.9 2.9 2.9" className="al-el-7 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Loader.displayName = 'Loader';

export { Loader };
export default Loader;
