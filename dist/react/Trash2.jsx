import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-trash-2 .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-trash-2 .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-trash-2:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-trash-2 * { transition: opacity 0.2s ease; }
@keyframes trash-lid {
  0% { transform: translateY(0) rotate(0deg); }
  40% { transform: translateY(-3px) rotate(-8deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
@keyframes trash-body-1 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.95); }
  100% { transform: scaleY(1); }
}
@keyframes trash-body-2 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.95); }
  100% { transform: scaleY(1); }
}
@keyframes trash-body-3 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.95); }
  100% { transform: scaleY(1); }
}
@keyframes trash-body-4 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.95); }
  100% { transform: scaleY(1); }
}
  .animated-lucide-trash-2:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: trash-lid 0.4s ease 0s both; }
  .animated-lucide-trash-2:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: trash-body-1 0.4s ease 0.05s both; }
  .animated-lucide-trash-2:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: trash-body-2 0.4s ease 0.1s both; }
  .animated-lucide-trash-2:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: trash-body-3 0.4s ease 0.15000000000000002s both; }
  .animated-lucide-trash-2:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: trash-body-4 0.4s ease 0.2s both; }
`;

const Trash2 = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'trash 2',
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
        className={`animated-lucide-icon animated-lucide-trash-2 ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M10 11v6" className="al-el-0 al-secondary" style={{ transformOrigin: '12px 6px' }} />
        <path d="M14 11v6" className="al-el-1 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" className="al-el-2 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M3 6h18" className="al-el-3 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" className="al-el-4 al-primary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

Trash2.displayName = 'Trash2';

export { Trash2 };
export default Trash2;
