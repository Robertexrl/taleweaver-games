import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Shuffle, Volume } from 'lucide-react';

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryCardGameProps {
  storyText: string;
  onGameComplete: () => void;
  audioUrl?: string;
}

const MemoryCardGame: React.FC<MemoryCardGameProps> = ({ storyText, onGameComplete, audioUrl }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  const imageUrls = [
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1501286353178-1ec871c42e5f?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1579168765467-3b235f938439?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0d?auto=format&fit=crop&q=80&w=300&h=300",
  ];
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  useEffect(() => {
    if (matchedPairs === imageUrls.length && matchedPairs > 0) {
      setIsGameOver(true);
      onGameComplete();
      toast({
        title: "Congratulations!",
        description: "You've completed the memory game!",
      });
    }
  }, [matchedPairs, onGameComplete]);
  
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);
      
      if (firstCard?.imageUrl === secondCard?.imageUrl) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);
  
  const initializeGame = () => {
    setIsLoading(true);
    
    const cardPairs = imageUrls.flatMap((imageUrl, index) => [
      {
        id: index * 2,
        imageUrl,
        isFlipped: false,
        isMatched: false
      },
      {
        id: index * 2 + 1,
        imageUrl,
        isFlipped: false,
        isMatched: false
      }
    ]);
    
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameOver(false);
    
    setIsLoading(false);
  };
  
  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const clickedCard = cards.find(card => card.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId
          ? { ...card, isFlipped: true }
          : card
      )
    );
    
    setFlippedCards(prev => [...prev, cardId]);
  };
  
  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        toast({
          title: "Audio Error",
          description: "Could not play the story audio.",
          variant: "destructive"
        });
      });
    } else {
      toast({
        title: "No Audio Available",
        description: "Sorry, there's no audio recording for this story."
      });
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Memory Game</h2>
          <p className="text-sm text-gray-600">Match the cards related to the story</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handlePlayAudio} 
            variant="outline"
            className="flex items-center"
          >
            <Volume className="mr-2 h-4 w-4" />
            Listen to Story
          </Button>
          
          <Button 
            onClick={initializeGame}
            variant="outline"
            className="flex items-center"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">
          Pairs: {matchedPairs}/{imageUrls.length}
        </div>
        <div className="text-sm font-medium">
          Moves: {moves}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading game...</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform ${
                card.isFlipped || card.isMatched 
                  ? 'rotate-y-180' 
                  : ''
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className={`w-full h-full rounded-lg border-2 flex items-center justify-center ${
                card.isMatched 
                  ? 'border-green-500 bg-green-100' 
                  : card.isFlipped 
                  ? 'border-blue-500' 
                  : 'border-gray-300 bg-playscribe-purple'
              }`}>
                {(card.isFlipped || card.isMatched) ? (
                  <img 
                    src={card.imageUrl} 
                    alt="Card" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-4xl font-bold text-white">?</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isGameOver && (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold mb-2">
            Congratulations! You completed the game in {moves} moves.
          </p>
          <Button onClick={initializeGame} className="mt-2">
            Play Again
          </Button>
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">The Story:</h3>
        <p className="bg-white p-4 rounded-lg border">{storyText}</p>
      </div>
    </div>
  );
};

export default MemoryCardGame;
