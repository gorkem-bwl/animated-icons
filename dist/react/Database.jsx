import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-database .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-database .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-database:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-database * { transition: opacity 0.2s ease; }
@keyframes bar-rise-database-0 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes bar-rise-database-1 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
@keyframes bar-rise-database-2 {
  0% { transform: scaleY(0.3); opacity: 0.5; }
  60% { transform: scaleY(1.05); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
  .animated-lucide-database:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bar-rise-database-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-database:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bar-rise-database-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s both; }
  .animated-lucide-database:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: bar-rise-database-2 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.16s both; }
`;

const Database = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'database',
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
        className={`animated-lucide-icon animated-lucide-database ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <ellipse cx="12" cy="5" rx="9" ry="3" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" className="al-el-1 al-secondary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M3 12A9 3 0 0 0 21 12" className="al-el-2 al-primary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

Database.displayName = 'Database';

export { Database };
export default Database;
