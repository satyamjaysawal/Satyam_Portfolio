import React from 'react';

const LogoIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="50" height="50">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366f1' }} />
          <stop offset="100%" style={{ stopColor: '#a855f7' }} />
        </linearGradient>
        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ec4899' }} />
          <stop offset="100%" style={{ stopColor: '#f43f5e' }} />
        </linearGradient>
      </defs>
      
      {/* Background circle with gradient */}
      <circle cx="32" cy="32" r="28" fill="url(#gradient1)" />
      
      {/* Abstract geometric shape (stylized "M" or "X") */}
      <path 
        d="M 16 48 C 20 32, 44 32, 48 48 C 44 38, 20 38, 16 48 Z"
        fill="url(#gradient2)" 
        opacity="0.8" 
      />
      
      {/* Decorative inner circle (could represent focus or central point) */}
      <circle cx="32" cy="32" r="8" fill="white" />
    </svg>
  );
};

export default LogoIcon;
