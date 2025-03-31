
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Logo size="lg" className="mb-8" />
        
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-playscribe-purple">Connecting Generations</span>
          <br />
          <span className="text-playscribe-purple">Through Stories & Games</span>
        </h1>
        
        <p className="text-lg max-w-2xl text-center mb-12">
          PlayScribe helps older Australians preserve their stories and transforms them into fun, 
          interactive games for children to enjoy and learn from.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
          <div className="card-container flex flex-col items-center text-center p-8">
            <div className="bg-playscribe-purple w-24 h-24 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-playscribe-purple">Storytellers</h2>
            <p className="mb-6 text-gray-600">
              Share your life experiences and have them transformed into games for the younger generation.
            </p>
            <Link to="/login/storyteller" className="mt-auto">
              <Button className="btn-primary">
                Start Storytelling
              </Button>
            </Link>
          </div>
          
          <div className="card-container flex flex-col items-center text-center p-8">
            <div className="bg-playscribe-teal w-24 h-24 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="12" rx="2" stroke="white" strokeWidth="2"/>
                <path d="M10 8L16 12L10 16V8Z" fill="white"/>
                <path d="M7 20H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-playscribe-teal">Game Players</h2>
            <p className="mb-6 text-gray-600">
              Play fun games based on real-life stories and learn from the experiences of older generations.
            </p>
            <Link to="/login/player" className="mt-auto">
              <Button className="btn-secondary">
                Play Games
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 max-w-2xl text-center">
          <h3 className="text-xl font-semibold mb-4 text-playscribe-black">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-playscribe-purple text-white flex items-center justify-center text-lg font-bold mb-3">
                1
              </div>
              <p className="text-sm">Storytellers record their experiences using simple voice tools</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-playscribe-purple text-white flex items-center justify-center text-lg font-bold mb-3">
                2
              </div>
              <p className="text-sm">PlayScribe transforms stories into interactive games</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-playscribe-purple text-white flex items-center justify-center text-lg font-bold mb-3">
                3
              </div>
              <p className="text-sm">Children play games and connect with older generations' experiences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
