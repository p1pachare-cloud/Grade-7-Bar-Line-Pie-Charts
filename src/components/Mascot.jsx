import React from 'react';

export default function Mascot({ mood = 'idle', size = 'medium', className = '' }) {
  const sizePx = size === 'large' ? 120 : size === 'medium' ? 80 : 52;

  return (
    <div className={`mascot-robot mascot-mood-${mood} ${className}`} style={{ width: sizePx, height: sizePx }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="plottyBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c5cbf" />
            <stop offset="100%" stopColor="#283593" />
          </linearGradient>
          <linearGradient id="plottyGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#ffc107" />
          </linearGradient>
          <filter id="plottyGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Line Graph Antenna */}
        <path
          d="M 50 26 Q 44 14 52 10 T 50 4"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#plottyGlow)"
        />
        <circle cx="50" cy="4" r="3.5" fill="#ff4081" filter="url(#plottyGlow)" />

        {/* Bar Chart Arms */}
        {/* Left Arm: Staggered bar blocks */}
        <rect x="14" y="44" width="7" height="22" rx="3" fill="#ffc107" />
        <rect x="23" y="50" width="6" height="16" rx="2" fill="#00e5ff" />
        {/* Right Arm: Staggered bar blocks */}
        <rect x="71" y="50" width="6" height="16" rx="2" fill="#00e5ff" />
        <rect x="79" y="44" width="7" height="22" rx="3" fill="#ffc107" />

        {/* Head / Body Chassis */}
        <rect
          x="26"
          y="26"
          width="48"
          height="48"
          rx="24"
          fill="url(#plottyBodyGrad)"
          stroke="#00e5ff"
          strokeWidth="2"
          filter="url(#plottyGlow)"
        />

        {/* Face Screen: Pie Chart Face Disc */}
        <circle cx="50" cy="50" r="20" fill="#0c0a2a" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

        {/* Glowing Pie Chart Sector Accents */}
        <path d="M 50 50 L 50 30 A 20 20 0 0 1 68 42 Z" fill="rgba(0, 229, 255, 0.45)" />
        <path d="M 50 50 L 68 42 A 20 20 0 0 1 64 64 Z" fill="rgba(255, 193, 7, 0.45)" />
        <path d="M 50 50 L 64 64 A 20 20 0 0 1 34 62 Z" fill="rgba(255, 64, 129, 0.45)" />
        <path d="M 50 50 L 34 62 A 20 20 0 0 1 50 30 Z" fill="rgba(0, 230, 118, 0.45)" />

        {/* Plotty's Expressive Eyes based on Mood */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <>
            <path d="M 41 48 Q 45 42 49 48" stroke="#00e5ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 51 48 Q 55 42 59 48" stroke="#00e5ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'thinking' || mood === 'curious' ? (
          <>
            <circle cx="43" cy="47" r="2.8" fill="#00e5ff" />
            <ellipse cx="57" cy="45" rx="3.5" ry="2" fill="#ffd54f" />
          </>
        ) : (
          <>
            <circle cx="44" cy="47" r="3" fill="#00e5ff" />
            <circle cx="56" cy="47" r="3" fill="#00e5ff" />
          </>
        )}

        {/* Mouth */}
        {mood === 'celebrating' ? (
          <path d="M 43 56 Q 50 63 57 56" stroke="#ff4081" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : mood === 'thinking' ? (
          <line x1="45" y1="56" x2="55" y2="54" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round" />
        ) : mood === 'encouraging' ? (
          <path d="M 44 55 Q 50 60 56 55" stroke="#00e676" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 45 56 Q 50 59 55 56" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}
