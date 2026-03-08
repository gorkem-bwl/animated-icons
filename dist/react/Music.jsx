import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-music .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-music .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-music:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-music * { transition: opacity 0.2s ease; }
@keyframes music-dance-0 {
  0% { transform: rotate(0deg) translateY(0); }
  20% { transform: rotate(12deg) translateY(-2px); }
  40% { transform: rotate(-8deg) translateY(1px); }
  60% { transform: rotate(5deg) translateY(-1px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes music-dance-1 {
  0% { transform: rotate(0deg) translateY(0); }
  20% { transform: rotate(-8deg) translateY(-2px); }
  40% { transform: rotate(12deg) translateY(1px); }
  60% { transform: rotate(-5deg) translateY(-1px); }
  100% { transform: rotate(0deg) translateY(0); }
}
@keyframes music-dance-2 {
  0% { transform: rotate(0deg) translateY(0); }
  20% { transform: rotate(12deg) translateY(-2px); }
  40% { transform: rotate(-8deg) translateY(1px); }
  60% { transform: rotate(5deg) translateY(-1px); }
  100% { transform: rotate(0deg) translateY(0); }
}
  .animated-lucide-music:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: music-dance-0 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0s both; }
  .animated-lucide-music:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: music-dance-1 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s both; }
  .animated-lucide-music:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: music-dance-2 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s both; }
`;

const Music = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'music',
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
        className={`animated-lucide-icon animated-lucide-music ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M9 18V5l12-2v13" className="al-el-0 al-primary" style={{ transformOrigin: '12px 12px' }} />
        <circle cx="6" cy="18" r="3" className="al-el-1 al-secondary" style={{ transformOrigin: '12px 12px' }} />
        <circle cx="18" cy="16" r="3" className="al-el-2 al-secondary" style={{ transformOrigin: '12px 12px' }} />
      </svg>
    </>
  );
});

Music.displayName = 'Music';

export { Music };
export default Music;
