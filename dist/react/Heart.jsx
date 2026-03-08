import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-heart .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-heart .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-heart:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-heart * { transition: opacity 0.2s ease; }
@keyframes heart-beat {
  0% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.1); }
  60% { transform: scale(1); }
}
  .animated-lucide-heart:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: heart-beat 0.6s ease both; }
`;

const Heart = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'heart',
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
        className={`animated-lucide-icon animated-lucide-heart ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" className="al-el-0 al-primary" style={{ transformOrigin: '12px 13px' }} />
      </svg>
    </>
  );
});

Heart.displayName = 'Heart';

export { Heart };
export default Heart;
