import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-snowflake .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-snowflake .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-snowflake:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-snowflake * { transition: opacity 0.2s ease; }
@keyframes snow-float-0 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-1 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-2 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-3 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-4 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-5 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-6 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-7 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-8 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-9 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-10 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes snow-float-11 {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(-15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
  .animated-lucide-snowflake:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: snow-float-0 0.7s ease 0s both; }
  .animated-lucide-snowflake:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: snow-float-1 0.7s ease 0.1s both; }
  .animated-lucide-snowflake:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: snow-float-2 0.7s ease 0.2s both; }
  .animated-lucide-snowflake:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: snow-float-3 0.7s ease 0.30000000000000004s both; }
  .animated-lucide-snowflake:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: snow-float-4 0.7s ease 0.4s both; }
  .animated-lucide-snowflake:hover .al-el-5,
  .al-icon-wrapper:hover .al-el-5 { animation: snow-float-5 0.7s ease 0.5s both; }
  .animated-lucide-snowflake:hover .al-el-6,
  .al-icon-wrapper:hover .al-el-6 { animation: snow-float-6 0.7s ease 0.6000000000000001s both; }
  .animated-lucide-snowflake:hover .al-el-7,
  .al-icon-wrapper:hover .al-el-7 { animation: snow-float-7 0.7s ease 0.7000000000000001s both; }
  .animated-lucide-snowflake:hover .al-el-8,
  .al-icon-wrapper:hover .al-el-8 { animation: snow-float-8 0.7s ease 0.8s both; }
  .animated-lucide-snowflake:hover .al-el-9,
  .al-icon-wrapper:hover .al-el-9 { animation: snow-float-9 0.7s ease 0.9s both; }
  .animated-lucide-snowflake:hover .al-el-10,
  .al-icon-wrapper:hover .al-el-10 { animation: snow-float-10 0.7s ease 1s both; }
  .animated-lucide-snowflake:hover .al-el-11,
  .al-icon-wrapper:hover .al-el-11 { animation: snow-float-11 0.7s ease 1.1s both; }
`;

const Snowflake = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'snowflake',
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
        className={`animated-lucide-icon animated-lucide-snowflake ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m10 20-1.25-2.5L6 18" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M10 4 8.75 6.5 6 6" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m14 20 1.25-2.5L18 18" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m14 4 1.25 2.5L18 6" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m17 21-3-6h-4" className="al-el-4 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m17 3-3 6 1.5 3" className="al-el-5 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M2 12h6.5L10 9" className="al-el-6 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m20 10-1.5 2 1.5 2" className="al-el-7 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M22 12h-6.5L14 15" className="al-el-8 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m4 10 1.5 2L4 14" className="al-el-9 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m7 21 3-6-1.5-3" className="al-el-10 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m7 3 3 6h4" className="al-el-11 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Snowflake.displayName = 'Snowflake';

export { Snowflake };
export default Snowflake;
