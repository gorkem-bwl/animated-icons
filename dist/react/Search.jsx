import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-search .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-search .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-search:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-search * { transition: opacity 0.2s ease; }
@keyframes draw-in-search-0 {
  0% { stroke-dashoffset: var(--path-length-0); }
  100% { stroke-dashoffset: 0; }
}
@keyframes draw-in-search-1 {
  0% { stroke-dashoffset: var(--path-length-1); }
  100% { stroke-dashoffset: 0; }
}
  .animated-lucide-search:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: draw-in-search-0 0.5s ease 0s both; }
  .animated-lucide-search:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: draw-in-search-1 0.5s ease 0.1s both; }
`;

const Search = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'search',
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
        className={`animated-lucide-icon animated-lucide-search ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="m21 21-4.34-4.34" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <circle cx="11" cy="11" r="8" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
      </svg>
    </>
  );
});

Search.displayName = 'Search';

export { Search };
export default Search;
