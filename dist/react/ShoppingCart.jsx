import React, { forwardRef, useId } from 'react';

const cssText = `.animated-lucide-shopping-cart .al-primary { stroke: var(--al-primary, currentColor); }
.animated-lucide-shopping-cart .al-secondary { stroke: var(--al-secondary, currentColor); opacity: 0.55; }
.animated-lucide-shopping-cart:hover .al-secondary,
.al-icon-wrapper:hover .al-secondary { opacity: 0.7; }
.animated-lucide-shopping-cart * { transition: opacity 0.2s ease; }
@keyframes cart-roll-0 {
  0% { transform: translateX(0); }
  30% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
}
@keyframes cart-roll-1 {
  0% { transform: translateX(0); }
  30% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
}
@keyframes cart-roll-2 {
  0% { transform: translateX(0); }
  30% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
}
  .animated-lucide-shopping-cart:hover .al-el-0,
  .al-icon-wrapper:hover .al-el-0 { animation: cart-roll-0 0.4s ease 0s both; }
  .animated-lucide-shopping-cart:hover .al-el-1,
  .al-icon-wrapper:hover .al-el-1 { animation: cart-roll-1 0.4s ease 0.04s both; }
  .animated-lucide-shopping-cart:hover .al-el-2,
  .al-icon-wrapper:hover .al-el-2 { animation: cart-roll-2 0.4s ease 0.08s both; }
`;

const ShoppingCart = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 2,
  className = '',
  label = 'shopping cart',
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
        className={`animated-lucide-icon animated-lucide-shopping-cart ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <circle cx="8" cy="21" r="1" className="al-el-0 al-primary" style={{}} />
        <circle cx="19" cy="21" r="1" className="al-el-1 al-secondary" style={{}} />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" className="al-el-2 al-secondary" style={{}} />
      </svg>
    </>
  );
});

ShoppingCart.displayName = 'ShoppingCart';

export { ShoppingCart };
export default ShoppingCart;
