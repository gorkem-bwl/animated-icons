import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-send .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-send .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-send:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-send * { transition: opacity 0.2s ease; }
@keyframes send-launch-0 {
  0% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(-3px, 2px) rotate(5deg); }
  60% { transform: translate(8px, -6px) rotate(-15deg); }
  80% { transform: translate(2px, -1px) rotate(-3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
@keyframes send-launch-1 {
  0% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(-2px, 1px) rotate(3deg); }
  60% { transform: translate(6px, -5px) rotate(-10deg); }
  80% { transform: translate(1px, -1px) rotate(-2deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
  .animated-lucide-send:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: send-launch-0 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .animated-lucide-send:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: send-launch-1 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

const Send = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'send',
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
        className={`animated-lucide-icon animated-lucide-send ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <path d="m21.854 2.147-10.94 10.939" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Send.displayName = 'Send';

export { Send };
export default Send;
