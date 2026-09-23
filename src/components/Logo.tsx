import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 cursor-pointer select-none group font-display font-extrabold tracking-tight ${sizeClasses[size]} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Mischievous logo badge */}
        <div className={`${iconSizes[size]} rounded-lg bg-gradient-to-tr from-[#d8ff38] to-[#99e600] flex items-center justify-center shadow-lg shadow-[#d8ff38]/20 group-hover:scale-105 transition-transform`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3/4 h-3/4 text-slate-950 stroke-[2.5]"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Playful devilish wink / speech bubble */}
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <path d="M15 10l-2 1" />
            <path d="M9 13.5c1.5 1 4.5 1 6 0" />
          </svg>
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-white group-hover:text-slate-100 transition-colors">Bad</span>
        <span className="text-[#d8ff38] group-hover:brightness-110 transition-all">Lingo</span>
      </div>
    </div>
  );
};
