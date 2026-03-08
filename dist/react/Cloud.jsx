import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-cloud .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-cloud .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-cloud:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-cloud * { transition: opacity 0.2s ease; }
@keyframes cloud-drift-0 {
  0% { transform: translateX(0); }
  50% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}
  .animated-lucide-cloud:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: cloud-drift-0 0.7s ease 0s both; }
`;

const Cloud = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'cloud',
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
        className={`animated-lucide-icon animated-lucide-cloud ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" className="al-el-0 al-primary" style={{}} />
      </svg>
    </>
  );
});

Cloud.displayName = 'Cloud';

export { Cloud };
export default Cloud;
