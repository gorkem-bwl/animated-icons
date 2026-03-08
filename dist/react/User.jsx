import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-user .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-user .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-user:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-user * { transition: opacity 0.2s ease; }
@keyframes wave-user-0 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-user-1 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
  .animated-lucide-user:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: wave-user-0 0.5s ease 0s both; }
  .animated-lucide-user:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: wave-user-1 0.5s ease 0.08s both; }
`;

const User = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'user',
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
        className={`animated-lucide-icon animated-lucide-user ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" className="al-el-0 al-primary" style={{ transformOrigin: '12px 16px' }} />
        <circle cx="12" cy="7" r="4" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 16px' }} />
      </svg>
    </>
  );
});

User.displayName = 'User';

export { User };
export default User;
