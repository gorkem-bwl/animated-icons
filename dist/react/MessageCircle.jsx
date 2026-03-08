import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-message-circle .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-message-circle .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-message-circle:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-message-circle * { transition: opacity 0.2s ease; }
@keyframes message-pop-0 {
  0% { transform: scale(1) translateY(0); }
  20% { transform: scale(0.85) translateY(4px); }
  50% { transform: scale(1.15) translateY(-4px); }
  70% { transform: scale(0.95) translateY(1px); }
  100% { transform: scale(1) translateY(0); }
}
  .animated-lucide-message-circle:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: message-pop-0 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const MessageCircle = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'message circle',
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
        className={`animated-lucide-icon animated-lucide-message-circle ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" className="al-el-0 al-primary" style={{ transformOrigin: '12px 14px' }} />
      </svg>
    </>
  );
});

MessageCircle.displayName = 'MessageCircle';

export { MessageCircle };
export default MessageCircle;
