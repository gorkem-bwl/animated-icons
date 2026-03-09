import React, { forwardRef } from 'react';

const cssText = `
  .ai-delay-0 { --ai-delay: 0ms; }
  .ai-delay-1 { --ai-delay: 80ms; }
  .ai-delay-2 { --ai-delay: 160ms; }
  .ai-delay-3 { --ai-delay: 240ms; }
  .ai-delay-4 { --ai-delay: 320ms; }
  .ai-delay-5 { --ai-delay: 400ms; }
  .ai-delay-6 { --ai-delay: 480ms; }
  .ai-delay-7 { --ai-delay: 560ms; }

  .ai-primary { stroke: var(--animated-iconoir-primary, var(--ai-primary, currentColor)); }
  .ai-secondary { stroke: var(--animated-iconoir-secondary, var(--ai-secondary, currentColor)); }

  .ai-anim-fill {
    fill: currentColor;
    fill-opacity: 0;
    transition: fill-opacity 500ms ease var(--ai-delay, 0ms);
  }
  .animated-iconoir:hover .ai-anim-fill,
  .ai-icon-wrapper:hover .ai-anim-fill { fill-opacity: 0.18; }

  .ai-anim-draw { }
  .animated-iconoir:hover .ai-anim-draw,
  .ai-icon-wrapper:hover .ai-anim-draw { animation: ai-draw-in 600ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-draw-in { 0% { stroke-dashoffset: var(--ai-dash-len, 50); } 100% { stroke-dashoffset: 0; } }

  .ai-anim-draw-line { }
  .animated-iconoir:hover .ai-anim-draw-line,
  .ai-icon-wrapper:hover .ai-anim-draw-line { animation: ai-draw-line 500ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-draw-line { 0% { stroke-dashoffset: var(--ai-dash-len, 20); } 100% { stroke-dashoffset: 0; } }

  .ai-anim-fade { }
  .animated-iconoir:hover .ai-anim-fade,
  .ai-icon-wrapper:hover .ai-anim-fade { animation: ai-fade-pop 500ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-fade-pop { 0% { opacity: 0.3; transform: scale(0.92); } 60% { opacity: 1; transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }

  .ai-anim-dot-appear { }
  .animated-iconoir:hover .ai-anim-dot-appear,
  .ai-icon-wrapper:hover .ai-anim-dot-appear { animation: ai-dot-pop 500ms ease 200ms both; }
  @keyframes ai-dot-pop { 0% { transform: scale(1); } 40% { transform: scale(0.3); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .ai-anim-bar { transform-origin: center bottom; }
  .animated-iconoir:hover .ai-anim-bar,
  .ai-icon-wrapper:hover .ai-anim-bar { animation: ai-bar-grow 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms) both; }
  @keyframes ai-bar-grow { 0% { transform: scaleY(0.2); } 60% { transform: scaleY(1.08); } 100% { transform: scaleY(1); } }

  .ai-anim-scale-pop { transform-origin: center; }
  .animated-iconoir:hover .ai-anim-scale-pop,
  .ai-icon-wrapper:hover .ai-anim-scale-pop { animation: ai-scale-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms) both; }
  @keyframes ai-scale-pop { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 100% { transform: scale(1); } }

  .ai-anim-pulse-element { }
  .animated-iconoir:hover .ai-anim-pulse-element,
  .ai-icon-wrapper:hover .ai-anim-pulse-element { animation: ai-pulse 0.7s ease-in-out; }
  @keyframes ai-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .ai-anim-gear { transform-origin: 12px 12px; transition: transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-gear,
  .ai-icon-wrapper:hover .ai-anim-gear { transform: rotate(var(--ai-rotation, 90deg)); }

  .ai-anim-nudge { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-nudge,
  .ai-icon-wrapper:hover .ai-anim-nudge { transform: translate(var(--ai-tx, 0px), var(--ai-ty, 0px)); }

  .ai-anim-bell-ring { transform-origin: 12px 3px; }
  .animated-iconoir:hover .ai-anim-bell-ring,
  .ai-icon-wrapper:hover .ai-anim-bell-ring { animation: ai-bell-ring 0.7s ease; }
  @keyframes ai-bell-ring { 0% { transform: rotate(0deg); } 12% { transform: rotate(14deg); } 24% { transform: rotate(-12deg); } 36% { transform: rotate(8deg); } 48% { transform: rotate(-5deg); } 60% { transform: rotate(2deg); } 100% { transform: rotate(0deg); } }

  .ai-anim-heart-beat { transform-origin: 12px 13px; }
  .animated-iconoir:hover .ai-anim-heart-beat,
  .ai-icon-wrapper:hover .ai-anim-heart-beat { animation: ai-heart-beat 0.8s ease; }
  @keyframes ai-heart-beat { 0% { transform: scale(1); } 15% { transform: scale(1.2); } 30% { transform: scale(1); } 45% { transform: scale(1.15); } 60% { transform: scale(1); } }

  .ai-anim-rocket-lift { transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-rocket-lift,
  .ai-icon-wrapper:hover .ai-anim-rocket-lift { transform: translate(1px, -1.5px); }

  .ai-anim-handle-lift { transition: transform 500ms ease var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-handle-lift,
  .ai-icon-wrapper:hover .ai-anim-handle-lift { transform: translateY(-1.5px); }

  .ai-anim-page-turn { transform-origin: left center; transition: transform 500ms ease var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-page-turn,
  .ai-icon-wrapper:hover .ai-anim-page-turn { transform: rotateY(-12deg); }

  .ai-anim-menu-line { transform-origin: left center; transition: transform 400ms ease var(--ai-delay, 0ms); }
  .animated-iconoir:hover .ai-anim-menu-line,
  .ai-icon-wrapper:hover .ai-anim-menu-line { transform: scaleX(var(--ai-scale-x, 0.7)); }

  .ai-anim-mail-flap { transform-origin: center top; }
  .animated-iconoir:hover .ai-anim-mail-flap,
  .ai-icon-wrapper:hover .ai-anim-mail-flap { animation: ai-mail-flap 700ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-mail-flap { 0% { transform: rotateX(0deg); } 40% { transform: rotateX(-30deg); } 70% { transform: rotateX(5deg); } 100% { transform: rotateX(0deg); } }

  .ai-anim-shake { transform-origin: center; }
  .animated-iconoir:hover .ai-anim-shake,
  .ai-icon-wrapper:hover .ai-anim-shake { animation: ai-shake 600ms ease var(--ai-delay, 0ms) both; }
  @keyframes ai-shake { 0% { transform: translateX(0) rotate(0deg); } 15% { transform: translateX(-1.5px) rotate(-3deg); } 30% { transform: translateX(1.5px) rotate(3deg); } 45% { transform: translateX(-1px) rotate(-2deg); } 60% { transform: translateX(1px) rotate(2deg); } 75% { transform: translateX(-0.5px) rotate(-1deg); } 100% { transform: translateX(0) rotate(0deg); } }

  .ai-anim-spin { transform-origin: 12px 12px; }
  .animated-iconoir:hover .ai-anim-spin,
  .ai-icon-wrapper:hover .ai-anim-spin { animation: ai-spin 700ms cubic-bezier(0.4, 0, 0.2, 1) var(--ai-delay, 0ms) both; }
  @keyframes ai-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const OpenVpn = forwardRef(({
  size = 24,
  color = 'currentColor',
  primaryColor,
  secondaryColor,
  strokeWidth = 1.5,
  className = '',
  label = 'open vpn',
  style = {},
  ...props
}, ref) => {
  const cssVars = {
    '--ai-primary': primaryColor || color,
    '--ai-secondary': secondaryColor || color,
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
        className={`animated-iconoir animated-iconoir-open-vpn ${className}`}
        style={cssVars}
        role="img"
        aria-label={label}
        {...props}
      >
        <title>{label}</title>
        <path d="M10.8351 15.2894L11.5726 15.426L10.8351 15.2894ZM10.4771 14.582L10.8583 13.9361L10.4771 14.582ZM10.2016 21.8286L10.3402 21.0915L10.2016 21.8286ZM9.75001 21.1507L10.4875 21.2872L9.75001 21.1507ZM16.8489 19.8141L17.586 19.6755L16.8489 19.8141ZM17.7212 20.1916L17.2912 19.5771L17.7212 20.1916ZM7.87166 15.9841L7.13459 15.8455L7.87166 15.9841ZM7.73203 15.4643L7.15066 15.9381L7.73203 15.4643ZM13.5232 14.582L13.9045 15.2279L13.5232 14.582ZM13.1652 15.2894L13.9027 15.1529L13.1652 15.2894ZM16.268 15.4643L15.6866 14.9905L16.268 15.4643ZM16.1283 15.9841L16.8654 15.8455L16.1283 15.9841ZM14.2501 21.1513L13.5126 21.2878L14.2501 21.1513ZM13.7972 21.8297L13.9347 22.567L13.7972 21.8297ZM6.27883 20.1916L5.84889 20.8061L6.27883 20.1916ZM2.75 12C2.75 6.89078 6.89078 2.75 12 2.75V1.25C6.06235 1.25 1.25 6.06235 1.25 12H2.75ZM6.70878 19.5771C4.3153 17.9025 2.75 15.1368 2.75 12H1.25C1.25 15.6498 3.07379 18.8646 5.84889 20.8061L6.70878 19.5771ZM7.13459 15.8455L6.41403 19.6755L7.88817 19.9528L8.60873 16.1228L7.13459 15.8455ZM5.75 12C5.75 13.4936 6.27575 14.8646 7.15066 15.9381L8.3134 14.9905C7.64834 14.1745 7.25 13.1354 7.25 12H5.75ZM12 5.75C8.54868 5.75 5.75 8.54868 5.75 12H7.25C7.25 9.3771 9.3771 7.25 12 7.25V5.75ZM18.25 12C18.25 8.54868 15.4513 5.75 12 5.75V7.25C14.6229 7.25 16.75 9.3771 16.75 12H18.25ZM16.8493 15.9381C17.7243 14.8646 18.25 13.4936 18.25 12H16.75C16.75 13.1354 16.3517 14.1745 15.6866 14.9905L16.8493 15.9381ZM17.586 19.6755L16.8654 15.8455L15.3913 16.1228L16.1118 19.9528L17.586 19.6755ZM21.25 12C21.25 15.1368 19.6847 17.9025 17.2912 19.5771L18.1511 20.8061C20.9262 18.8646 22.75 15.6498 22.75 12H21.25ZM12 2.75C17.1092 2.75 21.25 6.89078 21.25 12H22.75C22.75 6.06235 17.9377 1.25 12 1.25V2.75ZM15.7502 12C15.7502 9.92949 14.0706 8.24996 12.0002 8.24996V9.74996C13.2422 9.74996 14.2502 10.7579 14.2502 12H15.7502ZM13.9045 15.2279C15.0061 14.5777 15.7502 13.3768 15.7502 12H14.2502C14.2502 12.8229 13.8068 13.5437 13.142 13.9361L13.9045 15.2279ZM14.9876 21.0148L13.9027 15.1529L12.4277 15.4259L13.5126 21.2878L14.9876 21.0148ZM12.0002 22.75C12.6654 22.75 13.3108 22.6834 13.9347 22.567L13.6597 21.0925C13.118 21.1935 12.5649 21.25 12.0002 21.25V22.75ZM10.063 22.5657C10.688 22.6832 11.3343 22.75 12.0002 22.75V21.25C11.435 21.25 10.8817 21.1934 10.3402 21.0915L10.063 22.5657ZM10.0977 15.1529L9.01255 21.0141L10.4875 21.2872L11.5726 15.426L10.0977 15.1529ZM8.25018 12C8.25018 13.3767 8.99426 14.5776 10.0958 15.2279L10.8583 13.9361C10.1935 13.5437 9.75018 12.8229 9.75018 12H8.25018ZM12.0002 8.24996C9.92971 8.24996 8.25018 9.92949 8.25018 12H9.75018C9.75018 10.7579 10.7581 9.74996 12.0002 9.74996V8.24996ZM11.5726 15.426C11.6951 14.7643 11.3142 14.2052 10.8583 13.9361L10.0958 15.2279C10.1005 15.2306 10.1042 15.2337 10.1066 15.2361C10.1089 15.2386 10.1082 15.2386 10.1061 15.2346C10.1039 15.2304 10.0997 15.2209 10.0971 15.2059C10.0944 15.1902 10.0942 15.1718 10.0977 15.1529L11.5726 15.426ZM10.3402 21.0915C10.4587 21.1138 10.5 21.2197 10.4875 21.2872L9.01255 21.0141C8.88408 21.708 9.3184 22.4256 10.063 22.5657L10.3402 21.0915ZM16.1118 19.9528C16.2796 20.8445 17.3238 21.385 18.1511 20.8061L17.2912 19.5771C17.3508 19.5354 17.4317 19.533 17.4888 19.5582C17.5413 19.5813 17.577 19.6277 17.586 19.6755L16.1118 19.9528ZM8.60873 16.1228C8.6883 15.6999 8.55779 15.2903 8.3134 14.9905L7.15066 15.9381C7.14395 15.9299 7.12459 15.8987 7.13459 15.8455L8.60873 16.1228ZM13.142 13.9361C12.6861 14.2052 12.3053 14.7642 12.4277 15.4259L13.9027 15.1529C13.9062 15.1718 13.9059 15.1903 13.9032 15.2059C13.9006 15.2209 13.8964 15.2304 13.8942 15.2346C13.8921 15.2386 13.8914 15.2386 13.8938 15.2362C13.8961 15.2337 13.8998 15.2307 13.9045 15.2279L13.142 13.9361ZM15.6866 14.9905C15.4422 15.2903 15.3117 15.6999 15.3913 16.1228L16.8654 15.8455C16.8754 15.8987 16.8561 15.9299 16.8493 15.9381L15.6866 14.9905ZM13.5126 21.2878C13.5001 21.22 13.5417 21.1145 13.6597 21.0925L13.9347 22.567C14.68 22.428 15.1163 21.7101 14.9876 21.0148L13.5126 21.2878ZM5.84889 20.8061C6.67624 21.385 7.72041 20.8445 7.88817 19.9528L6.41403 19.6755C6.42302 19.6277 6.45865 19.5813 6.51117 19.5582C6.56834 19.533 6.64921 19.5354 6.70878 19.5771L5.84889 20.8061Z" fill="currentColor" className="ai-primary ai-anim-scale-pop ai-delay-0" style={{}} />
      </svg>
    </>
  );
});

OpenVpn.displayName = 'OpenVpn';

export { OpenVpn };
export default OpenVpn;
