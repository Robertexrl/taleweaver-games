
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
          <path
            d="M12 6.5C12 6.5 9 3.5 5 3.5C3 3.5 2 4.5 2 6.5C2 8.5 3 10.5 5 10.5C7 10.5 12 6.5 12 6.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M12 6.5C12 6.5 15 3.5 19 3.5C21 3.5 22 4.5 22 6.5C22 8.5 21 10.5 19 10.5C17 10.5 12 6.5 12 6.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M12 6.5V20.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 15C7 15 9 17 12 17C15 17 17 15 17 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="font-bold">
        <span className="text-taleweaver-darkPurple">Tale</span>
        <span className="text-taleweaver-purple">Weaver</span>
      </div>
    </div>
  );
};

export default Logo;
