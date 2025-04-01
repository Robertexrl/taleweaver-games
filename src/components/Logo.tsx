
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="logo-container">
        <div className={`bg-white flex items-center justify-center p-3 rounded-lg ${sizeClasses[size]}`}>
          <svg
            className="h-full w-auto"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 10C22 10 20 12 20 15C20 18 22 20 25 20C28 20 30 18 30 15C30 12 28 10 25 10Z"
              fill="#632D6E"
            />
            <circle cx="21" cy="15" r="1" fill="#36A89F" />
            <circle cx="29" cy="15" r="1" fill="#36A89F" />
            <path
              d="M16 22C16 18 20 14 25 14C30 14 34 18 34 22"
              stroke="#632D6E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M34 24C36 24 38 26 38 28C38 30 36 32 34 32H33L32 34L31 32H30C28 32 26 30 26 28C26 26 28 24 30 24H34Z"
              fill="#E4746B"
            />
          </svg>
        </div>
      </div>
      <div className="font-display font-bold text-base md:text-lg">
        <span className="text-black">play</span>
        <span className="text-playscribe-purple">scribe</span>
        <span className="text-black">.</span>
      </div>
    </div>
  );
};

export default Logo;
