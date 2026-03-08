import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-menu .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-menu .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-menu:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-menu * { transition: opacity 0.2s ease; }
@keyframes menu-line-0 {
  0% { transform: scaleX(1); }
  40% { transform: scaleX(1); }
  100% { transform: scaleX(1); }
}
@keyframes menu-line-1 {
  0% { transform: scaleX(1); }
  40% { transform: scaleX(0.9); }
  100% { transform: scaleX(1); }
}
@keyframes menu-line-2 {
  0% { transform: scaleX(1); }
  40% { transform: scaleX(0.8); }
  100% { transform: scaleX(1); }
}
  .animated-lucide-menu:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: menu-line-0 0.35s ease 0s both; }
  .animated-lucide-menu:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: menu-line-1 0.35s ease 0.05s both; }
  .animated-lucide-menu:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: menu-line-2 0.35s ease 0.1s both; }
`;

const Menu = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'menu',
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
        className={`animated-lucide-icon animated-lucide-menu ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M4 5h16" className="al-el-0 al-primary" style={{ transformOrigin: 'left center' }} />
        <path d="M4 12h16" className="al-el-1 al-secondary" style={{ transformOrigin: 'left center' }} />
        <path d="M4 19h16" className="al-el-2 al-primary" style={{ transformOrigin: 'left center' }} />
      </svg>
    </>
  );
});

Menu.displayName = 'Menu';

export { Menu };
export default Menu;
