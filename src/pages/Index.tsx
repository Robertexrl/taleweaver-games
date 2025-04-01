
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10 px-6">
      <div className="w-full flex justify-end">
        <div className="text-xs text-gray-600">Terms and Privacy</div>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <Logo size="lg" className="mb-12" />
        
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
          Connecting Generations<br />
          Stories and Games
        </h1>
        
        <p className="text-xl max-w-xl mb-12 mt-8">
          "Ready to share a story or play one?"<br />
          (Tap to begin your adventure!)
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mt-6 justify-center">
          <Link to="/login/storyteller" className="w-full md:w-auto">
            <button className="btn-primary w-full md:w-64 py-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z" stroke="white" strokeWidth="2" />
                <path d="M8 10C8 10 9.5 12 12 12C14.5 12 16 10 16 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Tell Story
            </button>
          </Link>
          
          <Link to="/login/player" className="w-full md:w-auto">
            <button className="btn-secondary w-full md:w-64 py-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <rect x="4" y="6" width="16" height="10" rx="2" stroke="white" strokeWidth="2"/>
                <path d="M10 9L14 11L10 13V9Z" fill="white"/>
                <path d="M7 16H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Play Game
            </button>
          </Link>
        </div>
      </div>
      
      <div className="h-10"></div>
    </div>
  );
};

export default Index;
