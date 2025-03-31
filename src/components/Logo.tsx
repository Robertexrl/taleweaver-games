
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`bg-taleweaver-purple text-white rounded-full p-2 ${sizeClasses[size]}`}>
        <svg
          className="h-full w-auto"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Silhouette of an older person */}
          <path
            d="M12 4C10.5 4 9.25 5 9 6.5C8.9 7 8.9 7.5 9 8C9.25 9.5 10.5 10.5 12 10.5C13.5 10.5 14.75 9.5 15 8C15.1 7.5 15.1 7 15 6.5C14.75 5 13.5 4 12 4Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Head outline */}
          <path
            d="M7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Remote controller as glasses */}
          <rect
            x="8"
            y="7"
            width="8"
            height="2"
            rx="0.5"
            fill="currentColor"
          />
          <rect
            x="7"
            y="7"
            width="1.5"
            height="0.8"
            rx="0.4"
            fill="currentColor"
          />
          <rect
            x="15.5"
            y="7"
            width="1.5"
            height="0.8"
            rx="0.4"
            fill="currentColor"
          />
          {/* Speech bubble / storytelling */}
          <path
            d="M17 12C19 12 20 13.5 20 15C20 16.5 19 18 17 18H16L15 20L14 18H13C11 18 10 16.5 10 15C10 13.5 11 12 13 12H17Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Button on remote */}
          <circle
            cx="9.5"
            cy="7.4"
            r="0.4"
            fill="white"
          />
          <circle
            cx="16.5"
            cy="7.4"
            r="0.4"
            fill="white"
          />
        </svg>
      </div>
      <div className="font-bold">
        <span className="text-taleweaver-darkPurple">Play</span>
        <span className="text-taleweaver-purple">Scribe</span>
      </div>
    </div>
  );
};

export default Logo;
