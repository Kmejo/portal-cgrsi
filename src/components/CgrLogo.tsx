import React from 'react';

interface CgrLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CgrLogo: React.FC<CgrLogoProps> = ({
  variant = 'auto',
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const isDark = variant === 'dark';
  
  // Sizing tokens
  const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Hexagonal Industrial Symbol */}
      <svg
        viewBox="0 0 100 115"
        className={`${heightClass} w-auto aspect-[100/115] shrink-0 transition-transform duration-300 hover:rotate-6`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Graphite Hexagon Plate */}
        <polygon
          points="50,4 96,30 96,84 50,110 4,84 4,30"
          fill="#2F3640"
          stroke="#1A212A"
          strokeWidth="2"
        />
        {/* Inner Copper Hex Nut */}
        <polygon
          points="50,22 82,40 82,74 50,92 18,74 18,40"
          fill="#D35400"
        />
        {/* Core Precision Borescope Aperture */}
        <circle
          cx="50"
          cy="57"
          r="11"
          fill="#FFFFFF"
          stroke="#2F3640"
          strokeWidth="2"
        />
      </svg>

      {/* Brand Typography Text Block */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5 leading-none">
          <div className="relative flex items-center">
            <span
              className={`font-heading font-black tracking-tight text-2xl lg:text-3xl ${
                isDark ? 'text-white' : 'text-[#2F3640]'
              }`}
            >
              C
            </span>
            <div className="relative inline-flex items-center">
              <span
                className={`font-heading font-black tracking-tight text-2xl lg:text-3xl ${
                  isDark ? 'text-white' : 'text-[#2F3640]'
                }`}
              >
                G
              </span>
              {/* Characteristic embedded copper hexagon in G */}
              <span className="absolute right-[4px] top-[48%] -translate-y-1/2 w-2.5 h-2.5 bg-[#D35400] clip-hex pointer-events-none" />
            </div>
            <span
              className={`font-heading font-black tracking-tight text-2xl lg:text-3xl ${
                isDark ? 'text-white' : 'text-[#2F3640]'
              }`}
            >
              R
            </span>
          </div>

          <span
            className={`font-sans font-bold text-xs tracking-wider ${
              isDark ? 'text-gray-300' : 'text-[#2F3640]'
            }`}
          >
            S.U.R.L.
          </span>
        </div>

        {showTagline && (
          <span className="font-heading font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#D35400] leading-none mt-1 whitespace-nowrap">
            Soluciones Integrales
          </span>
        )}
      </div>
    </div>
  );
};
