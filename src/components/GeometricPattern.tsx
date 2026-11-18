import React from 'react';

export function IslamicGeometricPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="girih-lattice"
          width="88"
          height="88"
          patternUnits="userSpaceOnUse"
        >
          {/* Subtle 8-fold Islamic geometric star & octagon lattice */}
          <path
            d="M44 0 L56.88 31.12 L88 44 L56.88 56.88 L44 88 L31.12 56.88 L0 44 L31.12 31.12 Z"
            fill="none"
            stroke="rgba(223, 183, 108, 0.16)"
            strokeWidth="0.95"
          />
          <rect
            x="18"
            y="18"
            width="52"
            height="52"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.75"
          />
          <rect
            x="18"
            y="18"
            width="52"
            height="52"
            transform="rotate(45 44 44)"
            fill="none"
            stroke="rgba(223, 183, 108, 0.1)"
            strokeWidth="0.75"
          />
          <circle
            cx="44"
            cy="44"
            r="7"
            fill="none"
            stroke="rgba(223, 183, 108, 0.2)"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#girih-lattice)" />
    </svg>
  );
}

export function TalimLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="drop-shadow-[0_2px_8px_rgba(223,183,108,0.2)]"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#142642" />
          <stop offset="100%" stopColor="#07111E" />
        </linearGradient>
        <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5DEB3" />
          <stop offset="50%" stopColor="#DFB76C" />
          <stop offset="100%" stopColor="#B38634" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logo-bg)" />
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        stroke="url(#logo-gold)"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      {/* Interlocking Rub el Hizb geometric emblem */}
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        rx="2.5"
        stroke="url(#logo-gold)"
        strokeWidth="1.6"
      />
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        rx="2.5"
        transform="rotate(45 20 20)"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="1.6"
      />
      <circle cx="20" cy="20" r="3" fill="url(#logo-gold)" />
    </svg>
  );
}
