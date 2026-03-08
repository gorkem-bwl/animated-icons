import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-settings .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-settings .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-settings:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-settings * { transition: opacity 0.2s ease; }
@keyframes gear-spin-0 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
}
@keyframes gear-spin-1 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-90deg); }
}
  .animated-lucide-settings:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: gear-spin-0 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .animated-lucide-settings:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: gear-spin-1 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const Settings = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'settings',
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
        className={`animated-lucide-icon animated-lucide-settings ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <circle cx="12" cy="12" r="3" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Settings.displayName = 'Settings';

export { Settings };
export default Settings;
