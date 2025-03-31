
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import SimpleGameDisplay from '@/components/SimpleGameDisplay';

const GamePlay = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [storyText, setStoryText] = useState<string>('');
  
  useEffect(() => {
    // Check if we have story text from the storyteller session
    if (location.state?.storyText) {
      setStoryText(location.state.storyText);
      setLoading(false);
      return;
    }
    
    // For MVP demo purposes, set a default sample story if no real story exists
    const demoStory = "When I was a child, we used to play outside all day long. We didn't have phones or computers. We would build forts in the woods and pretend we were explorers discovering new lands. Sometimes we would play until the sun went down and our parents called us home for dinner. Those were some of the happiest days of my childhood.";
    
    // Simulate loading of a story
    const timer = setTimeout(() => {
      setStoryText(demoStory);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location.state]);

  const handleNewGame = () => {
    // For MVP, we'll just reload the current page to reset the game
    navigate(0);
  };

  const handleEndSession = () => {
    toast({
      title: "Session Ended",
      description: "Thank you for playing! You're being redirected to the home page."
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
            Room Code: <span className="text-playscribe-purple">{roomCode}</span>
          </div>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-playscribe-purple mb-2">Story Game</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            This interactive game was created from a real story shared by someone from an older generation.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-playscribe-purple mb-4 mx-auto"></div>
            <p className="text-xl font-medium">Loading the story game...</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <SimpleGameDisplay storyText={storyText} />
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button 
                onClick={handleNewGame}
                variant="outline"
                className="border-playscribe-purple text-playscribe-purple"
              >
                Try Another Game
              </Button>
              <Button 
                onClick={handleEndSession}
                className="btn-primary"
              >
                End Session
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Every game is unique because it's created from a real person's memories and experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
