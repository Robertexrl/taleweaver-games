
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import { ArrowLeft, Home, HelpCircle, Gamepad, Puzzle, Volume } from 'lucide-react';

const GamePlay = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const [loading, setLoading] = useState(true);
  const [storyTitle, setStoryTitle] = useState("Grandma's Childhood Adventures");
  const [storyText, setStoryText] = useState("When I was a kid, I use to be a professional soccer player. Thanks to it I travelled all over the world and learnt about different cultures and languages, I can speak Spanish, Portuguese, and English");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handlePlayMemoryGame = () => {
    navigate(`/memory-game/${roomCode}`, { state: { storyText } });
  };
  
  const handlePlayAudio = () => {
    toast({
      title: "Playing Audio",
      description: "This would play the story audio in a real implementation."
    });
  };
  
  const navigateToHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col">
      <header className="p-4 flex justify-center items-center relative">
        <div className="absolute left-4">
          <Link to="/login/player" className="flex items-center text-purple-900">
            <ArrowLeft className="mr-2 h-15 w-15" />
            <span className="text-lg">Go back</span>
          </Link>
        </div>
        
        <Logo size="md" />
        
        <div className="absolute right-4">
          <Link to="/" className="text-purple-900">
            <Home className="h-15 w-15" />
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-playscribe-purple mb-4"></div>
            <p className="text-lg">Loading the story and games...</p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {storyTitle}
            </h1>
            
            <Card className="w-full max-w-4xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">The Story</h2>
                <Button 
                  onClick={handlePlayAudio}
                  variant="outline"
                  className="flex items-center"
                >
                  <Volume className="mr-2 h-4 w-4" />
                  Listen
                </Button>
              </div>
              
              <p className="text-lg mb-4">{storyText}</p>
            </Card>
            
            <h2 className="text-2xl font-bold mb-4">Choose a Game to Play</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={handlePlayMemoryGame}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-playscribe-purple flex items-center justify-center mb-4">
                    <Puzzle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Memory Card Game</h3>
                  <p className="text-gray-600 text-center">Match pairs of cards featuring images from the story</p>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-playscribe-coral flex items-center justify-center mb-4">
                    <Gamepad className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Choose-Your-Path Adventure</h3>
                  <p className="text-gray-600 text-center">Make choices that influence the direction of the story</p>
                </div>
              </Card>
            </div>
          </>
        )}
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

export default GamePlay;
