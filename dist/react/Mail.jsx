import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-mail .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-mail .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-mail:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-mail * { transition: opacity 0.2s ease; }
@keyframes mail-letter-peek {
  0% { transform: translateY(0) rotateX(0deg); }
  30% { transform: translateY(-8px) rotateX(-20deg); }
  60% { transform: translateY(-4px) rotateX(-10deg); }
  100% { transform: translateY(0) rotateX(0deg); }
}
@keyframes mail-body-react {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.03, 0.94); }
  60% { transform: scale(0.98, 1.02); }
  100% { transform: scale(1, 1); }
}
  .animated-lucide-mail:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: mail-letter-peek 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .animated-lucide-mail:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: mail-body-react 0.5s ease 0.05s both; }
`;

const Mail = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'mail',
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
        className={`animated-lucide-icon animated-lucide-mail ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" className="al-el-0 al-secondary" style={{ transformOrigin: 'center bottom' }} />
        <rect x="2" y="4" width="20" height="16" rx="2" className="al-el-1 al-primary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

Mail.displayName = 'Mail';

export { Mail };
export default Mail;
