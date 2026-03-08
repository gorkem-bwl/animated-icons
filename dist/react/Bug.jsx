import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-bug .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-bug .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-bug:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-bug * { transition: opacity 0.2s ease; }
@keyframes type-bug-0 {
  0% { stroke-dashoffset: var(--path-length-0); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-1 {
  0% { stroke-dashoffset: var(--path-length-1); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-2 {
  0% { stroke-dashoffset: var(--path-length-2); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-3 {
  0% { stroke-dashoffset: var(--path-length-3); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-4 {
  0% { stroke-dashoffset: var(--path-length-4); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-5 {
  0% { stroke-dashoffset: var(--path-length-5); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-6 {
  0% { stroke-dashoffset: var(--path-length-6); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-7 {
  0% { stroke-dashoffset: var(--path-length-7); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-8 {
  0% { stroke-dashoffset: var(--path-length-8); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-9 {
  0% { stroke-dashoffset: var(--path-length-9); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-bug-10 {
  0% { stroke-dashoffset: var(--path-length-10); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
  .animated-lucide-bug:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: type-bug-0 0.4s ease 0s both; }
  .animated-lucide-bug:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: type-bug-1 0.4s ease 0.12s both; }
  .animated-lucide-bug:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: type-bug-2 0.4s ease 0.24s both; }
  .animated-lucide-bug:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: type-bug-3 0.4s ease 0.36s both; }
  .animated-lucide-bug:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: type-bug-4 0.4s ease 0.48s both; }
  .animated-lucide-bug:hover .al-el-5,
  .al-icon-wrapper:hover .al-el-5 { animation: type-bug-5 0.4s ease 0.6s both; }
  .animated-lucide-bug:hover .al-el-6,
  .al-icon-wrapper:hover .al-el-6 { animation: type-bug-6 0.4s ease 0.72s both; }
  .animated-lucide-bug:hover .al-el-7,
  .al-icon-wrapper:hover .al-el-7 { animation: type-bug-7 0.4s ease 0.84s both; }
  .animated-lucide-bug:hover .al-el-8,
  .al-icon-wrapper:hover .al-el-8 { animation: type-bug-8 0.4s ease 0.96s both; }
  .animated-lucide-bug:hover .al-el-9,
  .al-icon-wrapper:hover .al-el-9 { animation: type-bug-9 0.4s ease 1.08s both; }
  .animated-lucide-bug:hover .al-el-10,
  .al-icon-wrapper:hover .al-el-10 { animation: type-bug-10 0.4s ease 1.2s both; }
`;

const Bug = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'bug',
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
        className={`animated-lucide-icon animated-lucide-bug ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M12 20v-9" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
        <path d="M14.12 3.88 16 2" strokeDasharray="var(--path-length-2)" strokeDashoffset="0" className="al-el-2 al-primary" style={{}} />
        <path d="M21 21a4 4 0 0 0-3.81-4" strokeDasharray="var(--path-length-3)" strokeDashoffset="0" className="al-el-3 al-secondary" style={{}} />
        <path d="M21 5a4 4 0 0 1-3.55 3.97" strokeDasharray="var(--path-length-4)" strokeDashoffset="0" className="al-el-4 al-primary" style={{}} />
        <path d="M22 13h-4" strokeDasharray="var(--path-length-5)" strokeDashoffset="0" className="al-el-5 al-secondary" style={{}} />
        <path d="M3 21a4 4 0 0 1 3.81-4" strokeDasharray="var(--path-length-6)" strokeDashoffset="0" className="al-el-6 al-primary" style={{}} />
        <path d="M3 5a4 4 0 0 0 3.55 3.97" strokeDasharray="var(--path-length-7)" strokeDashoffset="0" className="al-el-7 al-secondary" style={{}} />
        <path d="M6 13H2" strokeDasharray="var(--path-length-8)" strokeDashoffset="0" className="al-el-8 al-primary" style={{}} />
        <path d="m8 2 1.88 1.88" strokeDasharray="var(--path-length-9)" strokeDashoffset="0" className="al-el-9 al-secondary" style={{}} />
        <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" strokeDasharray="var(--path-length-10)" strokeDashoffset="0" className="al-el-10 al-primary" style={{}} />
      </svg>
    </>
  );
});

Bug.displayName = 'Bug';

export { Bug };
export default Bug;
