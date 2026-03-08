import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-home .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-home .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-home:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-home * { transition: opacity 0.2s ease; }
@keyframes bounce-home-0 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
@keyframes bounce-home-1 {
  0% { transform: scale(1); }
  30% { transform: scale(0.9); }
  60% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
  .animated-lucide-home:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: bounce-home-0 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-home:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: bounce-home-1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s both; }
`;

const Home = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'home',
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
        className={`animated-lucide-icon animated-lucide-home ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Home.displayName = 'Home';

export { Home };
export default Home;
