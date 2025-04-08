
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';

const Login = () => {
  const { userType } = useParams<{ userType: 'storyteller' | 'player' }>();
  const [gamePin, setGamePin] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleEnterRoom = () => {
    if (!gamePin.trim()) {
      toast({
        title: "Error",
        description: "Please enter a game pin",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to the appropriate game
    navigate(`/play/${gamePin}`);
  };

  const navigateToHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-purple-900">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Go back</span>
        </Link>
        
        <Logo size="md" />
        
        <Link to="/" className="text-purple-900">
          <Home className="h-5 w-5" />
        </Link>
      </header>
      
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Connecting Generations<br/>
          Stories and Games
        </h1>
        
        <div className="bg-white rounded-lg p-10 shadow-lg w-full max-w-xl">
          <h2 className="text-3xl font-bold mb-6">Game Pin</h2>
          
          <Input
            placeholder="Enter your game pin, please!"
            value={gamePin}
            onChange={(e) => setGamePin(e.target.value.toUpperCase())}
            className="text-center text-xl uppercase font-medium rounded-lg border-2 border-playscribe-purple mb-6 p-6"
            maxLength={8}
          />
          
          <div className="flex gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1 py-4"
            >
              Go back
            </Button>
            
            <Button
              onClick={handleEnterRoom}
              className="bg-playscribe-teal hover:bg-playscribe-teal/90 flex-1 py-4 font-bold text-lg"
            >
              Enter Room
            </Button>
          </div>
        </div>
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

export default Login;
