import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-fingerprint .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-fingerprint .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-fingerprint:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-fingerprint * { transition: opacity 0.2s ease; }
@keyframes wave-fingerprint-0 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-1 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-2 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-3 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-4 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-5 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-6 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-7 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes wave-fingerprint-8 {
  0% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-1px); }
  50% { transform: rotate(3deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(-0.5px); }
  100% { transform: rotate(0deg) translateY(0); }
}
  .animated-lucide-fingerprint:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: wave-fingerprint-0 0.5s ease 0s both; }
  .animated-lucide-fingerprint:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: wave-fingerprint-1 0.5s ease 0.08s both; }
  .animated-lucide-fingerprint:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: wave-fingerprint-2 0.5s ease 0.16s both; }
  .animated-lucide-fingerprint:hover .al-el-3,
  .al-icon-wrapper:hover .al-el-3 { animation: wave-fingerprint-3 0.5s ease 0.24s both; }
  .animated-lucide-fingerprint:hover .al-el-4,
  .al-icon-wrapper:hover .al-el-4 { animation: wave-fingerprint-4 0.5s ease 0.32s both; }
  .animated-lucide-fingerprint:hover .al-el-5,
  .al-icon-wrapper:hover .al-el-5 { animation: wave-fingerprint-5 0.5s ease 0.4s both; }
  .animated-lucide-fingerprint:hover .al-el-6,
  .al-icon-wrapper:hover .al-el-6 { animation: wave-fingerprint-6 0.5s ease 0.48s both; }
  .animated-lucide-fingerprint:hover .al-el-7,
  .al-icon-wrapper:hover .al-el-7 { animation: wave-fingerprint-7 0.5s ease 0.56s both; }
  .animated-lucide-fingerprint:hover .al-el-8,
  .al-icon-wrapper:hover .al-el-8 { animation: wave-fingerprint-8 0.5s ease 0.64s both; }
`;

const Fingerprint = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'fingerprint',
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
        className={`animated-lucide-icon animated-lucide-fingerprint ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" className="al-el-0 al-primary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M2 12a10 10 0 0 1 18-6" className="al-el-3 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M2 16h.01" className="al-el-4 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M21.8 16c.2-2 .131-5.354 0-6" className="al-el-5 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" className="al-el-6 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M8.65 22c.21-.66.45-1.32.57-2" className="al-el-7 al-secondary" style={{ transformOrigin: '12px 16px' }} />
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2" className="al-el-8 al-secondary" style={{ transformOrigin: '12px 16px' }} />
      </svg>
    </>
  );
});

Fingerprint.displayName = 'Fingerprint';

export { Fingerprint };
export default Fingerprint;
