import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-eye .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-eye .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-eye:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-eye * { transition: opacity 0.2s ease; }
@keyframes eye-blink-outer {
  0% { transform: scaleY(1); }
  40% { transform: scaleY(0.1); }
  60% { transform: scaleY(0.1); }
  100% { transform: scaleY(1); }
}
@keyframes eye-blink-inner-1 {
  0% { transform: scaleY(1); opacity: 1; }
  40% { transform: scaleY(0.3); opacity: 0; }
  60% { transform: scaleY(0.3); opacity: 0; }
  100% { transform: scaleY(1); opacity: 1; }
}
  .animated-lucide-eye:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: eye-blink-outer 0.4s ease both; }
  .animated-lucide-eye:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: eye-blink-inner-1 0.4s ease both; }
`;

const Eye = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'eye',
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
        className={`animated-lucide-icon animated-lucide-eye ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <circle cx="12" cy="12" r="3" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Eye.displayName = 'Eye';

export { Eye };
export default Eye;
