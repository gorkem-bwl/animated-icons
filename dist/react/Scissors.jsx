import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-scissors .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-scissors .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-scissors:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-scissors * { transition: opacity 0.2s ease; }
@keyframes draw-in-scissors-0 {
  0% { stroke-dashoffset: var(--path-length-0); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-scissors-1 {
  0% { stroke-dashoffset: var(--path-length-1); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-scissors-2 {
  0% { stroke-dashoffset: var(--path-length-2); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-scissors-3 {
  0% { stroke-dashoffset: var(--path-length-3); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-scissors-4 {
  0% { stroke-dashoffset: var(--path-length-4); }
  100% { stroke-dashoffset: 0; }
}
  .animated-lucide-scissors:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: draw-in-scissors-0 0.5s ease 0s both; }
  .animated-lucide-scissors:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: draw-in-scissors-1 0.5s ease 0.1s both; }
  .animated-lucide-scissors:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: draw-in-scissors-2 0.5s ease 0.2s both; }
  .animated-lucide-scissors:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: draw-in-scissors-3 0.5s ease 0.30000000000000004s both; }
  .animated-lucide-scissors:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: draw-in-scissors-4 0.5s ease 0.4s both; }
`;

const Scissors = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'scissors',
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
        className={`animated-lucide-icon animated-lucide-scissors ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <circle cx="6" cy="6" r="3" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <path d="M8.12 8.12 12 12" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
        <path d="M20 4 8.12 15.88" strokeDasharray="var(--path-length-2)" strokeDashoffset="0" className="al-el-2 al-secondary" style={{}} />
        <circle cx="6" cy="18" r="3" strokeDasharray="var(--path-length-3)" strokeDashoffset="0" className="al-el-3 al-secondary" style={{}} />
        <path d="M14.8 14.8 20 20" strokeDasharray="var(--path-length-4)" strokeDashoffset="0" className="al-el-4 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Scissors.displayName = 'Scissors';

export { Scissors };
export default Scissors;
