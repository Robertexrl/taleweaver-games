
import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import { ArrowLeft, Home, HelpCircle, Share2 } from 'lucide-react';

const GameCodeShare = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleShareCode = () => {
    // In a real app, this would use the Web Share API if available
    navigator.clipboard.writeText(roomCode || "");
    toast({
      title: "Code Copied!",
      description: "Room code has been copied to clipboard. Share it with your grandkids!"
    });
  };

  const handlePlayGame = () => {
    navigate(`/play/${roomCode}`);
  };

  const handleTellAnotherStory = () => {
    navigate('/grandparent-nickname');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const navigateToHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link to={`/storyteller/${roomCode}`} className="flex items-center text-purple-900">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Go back</span>
        </Link>
        
        <Logo size="md" />
        
        <Link to="/" className="text-purple-900">
          <Home className="h-5 w-5" />
        </Link>
      </header>
      
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 max-w-3xl">
          Story saved and gamified!
          <br/>Time to pass the fun along.
        </h1>
        
        <div className="mt-10 mb-6">
          <div className="text-3xl font-bold text-purple-900 mb-2 flex items-center justify-center">
            Room Code: <span className="ml-2 text-purple-700" onClick={() => navigator.clipboard.writeText(roomCode || "")}>{roomCode}</span>
            <button onClick={handleShareCode} className="ml-2 p-1 hover:bg-purple-100 rounded-full">
              <Share2 className="h-5 w-5 text-purple-700" />
            </button>
          </div>
          <p className="text-lg">Share this with your favorite kiddo—game time awaits!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mb-6">
          <Button
            onClick={handleTellAnotherStory}
            className="bg-playscribe-teal hover:bg-playscribe-teal/90 py-6 text-xl font-bold border-2 border-black"
          >
            Tell another story
          </Button>
          
          <Button
            onClick={handleGoHome}
            className="bg-playscribe-coral hover:bg-playscribe-coral/90 py-6 text-xl font-bold border-2 border-black"
          >
            Go back home
          </Button>
        </div>
        
        <Button
          onClick={handlePlayGame}
          className="bg-playscribe-coral hover:bg-playscribe-coral/90 py-6 text-2xl font-bold border-2 border-black w-full max-w-xl"
        >
          Play Game
        </Button>
      </main>
      
      <footer className="p-6 text-center text-sm text-gray-600 flex justify-between items-center">
        <div>Terms and Privacy | All Right Reserved 2025 | Developed by SheTells</div>
        <button 
          onClick={navigateToHowItWorks}
          className="rounded-full bg-white p-3 shadow-md hover:shadow-lg"
          aria-label="How this works"
        >
          <HelpCircle className="h-6 w-6 text-playscribe-purple" />
        </button>
      </footer>
    </div>
  );
};

export default GameCodeShare;
