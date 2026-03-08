import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-git-branch .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-git-branch .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-git-branch:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-git-branch * { transition: opacity 0.2s ease; }
@keyframes type-git-branch-0 {
  0% { stroke-dashoffset: var(--path-length-0); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-git-branch-1 {
  0% { stroke-dashoffset: var(--path-length-1); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes type-git-branch-2 {
  0% { stroke-dashoffset: var(--path-length-2); opacity: 0.3; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
  .animated-lucide-git-branch:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: type-git-branch-0 0.4s ease 0s both; }
  .animated-lucide-git-branch:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: type-git-branch-1 0.4s ease 0.12s both; }
  .animated-lucide-git-branch:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: type-git-branch-2 0.4s ease 0.24s both; }
`;

const GitBranch = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'git branch',
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
        className={`animated-lucide-icon animated-lucide-git-branch ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M15 6a9 9 0 0 0-9 9V3" strokeDasharray="var(--path-length-0)" strokeDashoffset="0" className="al-el-0 al-primary" style={{}} />
        <circle cx="18" cy="6" r="3" strokeDasharray="var(--path-length-1)" strokeDashoffset="0" className="al-el-1 al-secondary" style={{}} />
        <circle cx="6" cy="18" r="3" strokeDasharray="var(--path-length-2)" strokeDashoffset="0" className="al-el-2 al-primary" style={{}} />
      </svg>
    </>
  );
});

GitBranch.displayName = 'GitBranch';

export { GitBranch };
export default GitBranch;
