
import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';
import MemoryCardGame from '@/components/MemoryCardGame';

const MemoryGame = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // In a real app, we would fetch the story text and audio URL from the backend
  const storyText = location.state?.storyText || 
    "When I was a child, we used to play outside all day long. We didn't have phones or computers. We would build forts in the woods.";
  
  const handleGameComplete = () => {
    setGameCompleted(true);
    
    // Notify the storyteller (in a real app, this would be done via a backend service)
    setTimeout(() => {
      toast({
        title: "Connection Established!",
        description: "Why not make a call to talk about the game? The storyteller has been notified that you've completed their game!",
        duration: 6000,
      });
    }, 1000);
  };

  const navigateToHowItWorks = () => {
    navigate('/how-it-works');
  };
  
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link to={`/play/${roomCode}`} className="flex items-center text-purple-900">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Go back</span>
        </Link>
        
        <Logo size="md" />
        
        <Link to="/" className="text-purple-900">
          <Home className="h-5 w-5" />
        </Link>
      </header>
      
      <main className="flex flex-col items-center justify-center flex-grow px-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-8">
          <MemoryCardGame 
            storyText={storyText} 
            onGameComplete={handleGameComplete} 
          />
        </div>
        
        {gameCompleted && (
          <div className="w-full max-w-4xl bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-green-700 mb-2">Connection Established! 🎉</h3>
            <p className="text-lg">
              Why not make a call to talk about the game? The storyteller would love to hear what you thought!
            </p>
          </div>
        )}
        
        <Button 
          onClick={goHome}
          className="bg-playscribe-coral hover:bg-playscribe-coral/90 py-4 text-xl font-bold"
        >
          Back to Home
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

export default MemoryGame;
