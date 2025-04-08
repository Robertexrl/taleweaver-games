
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mic, Gamepad } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  const handleHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col items-center justify-between py-10 px-6 relative">
      <div className="absolute top-6 right-6 flex flex-col items-center">
        <button 
          onClick={handleHowItWorks}
          className="rounded-full bg-white p-4 shadow-md hover:shadow-lg transition-all"
          aria-label="How this works"
        >
          <HelpCircle className="h-8 w-8 text-playscribe-purple" />
        </button>
        <span className="text-white font-medium mt-1 text-sm">How it works</span>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow text-center w-full max-w-4xl">
        <Logo size="lg" className="mb-10" />
        
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
          Connecting Generations<br />
          Stories and Games
        </h1>
        
        <p className="text-xl max-w-xl mb-12 mt-8">
          "Ready to share a story or play one?"<br />
          (Tap to begin your adventure!)
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mt-6 justify-center">
          <Link to="/grandparent-nickname" className="w-full md:w-auto">
            <Button className="bg-playscribe-teal hover:bg-playscribe-teal/90 text-black font-bold w-full md:w-64 py-6 text-xl border-2 border-black shadow-md">
              <Mic className="mr-2 h-6 w-6" />
              Tell Story
            </Button>
          </Link>
          
          <Link to="/login/player" className="w-full md:w-auto">
            <Button className="bg-playscribe-teal hover:bg-playscribe-teal/90 text-black font-bold w-full md:w-64 py-6 text-xl border-2 border-black shadow-md">
              <Gamepad className="mr-2 h-6 w-6" />
              Play Game
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-10 text-center text-sm text-gray-600">
        Terms and Privacy | All Rights Reserved 2025 | Developed by SheTells
      </div>
    </div>
  );
};

export default Home;
