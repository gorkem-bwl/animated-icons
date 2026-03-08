import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-book-open .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-book-open .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-book-open:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-book-open * { transition: opacity 0.2s ease; }
@keyframes page-reveal-book-open-0 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}
@keyframes page-reveal-book-open-1 {
  0% { transform: scaleY(1); }
  30% { transform: scaleY(0.92); }
  60% { transform: scaleY(1.03); }
  100% { transform: scaleY(1); }
}
  .animated-lucide-book-open:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: page-reveal-book-open-0 0.4s ease 0s both; }
  .animated-lucide-book-open:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: page-reveal-book-open-1 0.4s ease 0.07s both; }
`;

const BookOpen = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'book open',
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
        className={`animated-lucide-icon animated-lucide-book-open ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M12 7v14" className="al-el-0 al-primary" style={{ transformOrigin: 'center bottom' }} />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" className="al-el-1 al-secondary" style={{ transformOrigin: 'center bottom' }} />
      </svg>
    </>
  );
});

BookOpen.displayName = 'BookOpen';

export { BookOpen };
export default BookOpen;
