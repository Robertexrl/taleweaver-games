
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-20 w-20', // Doubled from h-10 w-10
    md: 'h-32 w-32', // Doubled from h-16 w-16
    lg: 'h-40 w-40'  // Doubled from h-20 w-20
  };

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="logo-container">
        <div className={`bg-white flex items-center justify-center p-3 rounded-lg ${sizeClasses[size]}`}>
          <img 
            src="/lovable-uploads/d8800917-7107-4e3f-9876-7f34cb119ac0.png" 
            alt="PlayScribe Logo" 
            className="h-full w-auto"
          />
        </div>
      </div>
      <div className="font-display font-bold text-base md:text-xl">
        <span className="text-black">play</span>
        <span className="text-playscribe-purple">scribe</span>
        <span className="text-black">.</span>
      </div>
    </div>
  );
};

export default Logo;
