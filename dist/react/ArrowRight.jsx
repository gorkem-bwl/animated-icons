import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-arrow-right .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-arrow-right .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-arrow-right:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-arrow-right * { transition: opacity 0.2s ease; }
@keyframes arrow-shaft-slide {
  0% { transform: translateX(0); opacity: 1; }
  30% { transform: translateX(-8px); opacity: 0.3; }
  70% { transform: translateX(2px); opacity: 1; }
  100% { transform: translateX(0); }
}
@keyframes arrow-head-shoot {
  0% { transform: translateX(0); }
  40% { transform: translateX(6px); }
  70% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
  .animated-lucide-arrow-right:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: arrow-shaft-slide 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .animated-lucide-arrow-right:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: arrow-head-shoot 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const ArrowRight = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'arrow right',
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
        className={`animated-lucide-icon animated-lucide-arrow-right ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M5 12h14" className="al-el-0 al-secondary" style={{}} />
        <path d="m12 5 7 7-7 7" className="al-el-1 al-primary" style={{}} />
      </svg>
    </>
  );
});

ArrowRight.displayName = 'ArrowRight';

export { ArrowRight };
export default ArrowRight;
