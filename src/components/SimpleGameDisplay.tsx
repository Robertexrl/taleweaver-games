
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface SimpleGameDisplayProps {
  storyText: string;
}

// Simple game generation based on story content
const SimpleGameDisplay: React.FC<SimpleGameDisplayProps> = ({ storyText }) => {
  const [gameType, setGameType] = useState<'quiz' | 'memory' | 'drawing'>('quiz');
  const [gameContent, setGameContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (storyText) {
      generateGame();
    }
  }, [storyText]);

  const generateGame = () => {
    setLoading(true);
    
    // Select a random game type for demo purposes
    const types: ('quiz' | 'memory' | 'drawing')[] = ['quiz', 'memory', 'drawing'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setGameType(randomType);
    
    // Simple mock game generation based on the type
    setTimeout(() => {
      if (randomType === 'quiz') {
        // Extract potential questions from the story
        const questions = generateQuizQuestions(storyText);
        setGameContent({ questions });
      } else if (randomType === 'memory') {
        // Generate memory card pairs based on the story
        const pairs = generateMemoryPairs(storyText);
        setGameContent({ pairs });
      } else if (randomType === 'drawing') {
        // Generate stick figure scene based on the story
        const scene = generateStickFigureScene(storyText);
        setGameContent({ scene });
      }
      
      setLoading(false);
    }, 2000);
  };

  const generateQuizQuestions = (text: string) => {
    // For MVP, generate simple questions based on story keywords
    const keywords = ["child", "play", "outside", "fort", "woods"];
    let foundKeywords = [];
    
    for (const word of keywords) {
      if (text.toLowerCase().includes(word)) {
        foundKeywords.push(word);
      }
    }
    
    const questions = [
      {
        question: "In the story, what did children do all day long?",
        options: ["Play outside", "Watch TV", "Read books", "Play video games"],
        answer: 0
      },
      {
        question: "What did children build in the woods?",
        options: ["Snowmen", "Forts", "Campfires", "Treehouses"],
        answer: 1
      },
      {
        question: "What technology didn't they have in the story?",
        options: ["Bicycles", "Pencils", "Phones", "Books"],
        answer: 2
      }
    ];
    
    return questions;
  };

  const generateMemoryPairs = (text: string) => {
    // For MVP, generate simple memory pairs based on story elements
    const pairs = [
      { id: 1, content: "Child" },
      { id: 2, content: "Child" },
      { id: 3, content: "Fort" },
      { id: 4, content: "Fort" },
      { id: 5, content: "Woods" },
      { id: 6, content: "Woods" },
      { id: 7, content: "Playing" },
      { id: 8, content: "Playing" }
    ];
    
    return pairs.sort(() => Math.random() - 0.5);
  };

  const generateStickFigureScene = (text: string) => {
    // For MVP, return a simple scene description
    return {
      title: "Children Playing Outside",
      description: "A group of stick figures building a fort in the woods",
      elements: [
        { type: "person", x: 50, y: 150, label: "Child 1" },
        { type: "person", x: 120, y: 150, label: "Child 2" },
        { type: "structure", x: 200, y: 120, label: "Fort" },
        { type: "tree", x: 250, y: 100, label: "Tree" },
        { type: "tree", x: 300, y: 110, label: "Tree" }
      ]
    };
  };

  const submitFeedback = () => {
    toast({
      title: "Thank you for your feedback!",
      description: `You rated this game ${feedbackRating} out of 5 stars.`
    });
    setShowFeedback(false);
  };

  const renderQuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const handleAnswerSelect = (index: number) => {
      setSelectedAnswer(index);
      
      if (index === gameContent.questions[currentQuestion].answer) {
        setScore(prev => prev + 1);
      }
      
      // Move to next question after a short delay
      setTimeout(() => {
        if (currentQuestion < gameContent.questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setQuizComplete(true);
        }
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-center">Story Quiz</h3>
        
        {!quizComplete ? (
          <>
            <div className="text-center mb-4">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {gameContent.questions.length}
              </span>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div 
                  className="bg-taleweaver-purple h-2 rounded-full"
                  style={{ width: `${((currentQuestion + 1) / gameContent.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-taleweaver-lightPurple rounded-xl">
              <h4 className="text-lg font-medium mb-4">
                {gameContent.questions[currentQuestion].question}
              </h4>
              
              <div className="space-y-3">
                {gameContent.questions[currentQuestion].options.map((option: string, index: number) => (
                  <button
                    key={index}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedAnswer === index
                        ? selectedAnswer === gameContent.questions[currentQuestion].answer
                          ? "bg-green-100 border-green-500 border-2"
                          : "bg-red-100 border-red-500 border-2"
                        : "bg-white hover:bg-gray-100 border border-gray-200"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-taleweaver-yellow rounded-xl">
            <h4 className="text-xl font-bold mb-2">Quiz Complete!</h4>
            <p className="text-lg mb-4">You scored {score} out of {gameContent.questions.length}</p>
            <Button onClick={() => setShowFeedback(true)} className="btn-primary">
              Rate This Game
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderMemoryGame = () => {
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    const handleCardClick = (id: number) => {
      // Don't allow more than 2 cards flipped at once
      if (flipped.length === 2) return;
      
      // Don't allow clicking already matched cards
      if (matched.includes(id)) return;
      
      // Don't allow clicking already flipped card
      if (flipped.includes(id)) return;
      
      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);
      
      // If we have 2 cards flipped, check for a match
      if (newFlipped.length === 2) {
        setMoves(prev => prev + 1);
        
        const [first, second] = newFlipped;
        const firstCard = gameContent.pairs.find((p: any) => p.id === first);
        const secondCard = gameContent.pairs.find((p: any) => p.id === second);
        
        if (firstCard.content === secondCard.content) {
          // Match found
          setMatched(prev => [...prev, first, second]);
          setFlipped([]);
          
          // Check if game is complete
          if (matched.length + 2 === gameContent.pairs.length) {
            setGameComplete(true);
          }
        } else {
          // No match, flip cards back after a delay
          setTimeout(() => {
            setFlipped([]);
          }, 1000);
        }
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-center">Memory Game</h3>
        
        {!gameComplete ? (
          <>
            <div className="text-center mb-4">
              <span className="text-sm font-medium">
                Moves: {moves} | Matches: {matched.length / 2}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {gameContent.pairs.map((card: any) => (
                <div
                  key={card.id}
                  className={`aspect-square bg-taleweaver-purple rounded-md flex items-center justify-center cursor-pointer transition-all transform ${
                    flipped.includes(card.id) || matched.includes(card.id)
                      ? "bg-white border-2 border-taleweaver-purple"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {(flipped.includes(card.id) || matched.includes(card.id)) && (
                    <span className="font-bold text-taleweaver-darkPurple">
                      {card.content}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-taleweaver-yellow rounded-xl">
            <h4 className="text-xl font-bold mb-2">Memory Game Complete!</h4>
            <p className="text-lg mb-4">You completed the game in {moves} moves</p>
            <Button onClick={() => setShowFeedback(true)} className="btn-primary">
              Rate This Game
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderDrawingGame = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-center">Story Drawing</h3>
        
        <div className="bg-white border-2 border-taleweaver-lightPurple rounded-xl p-4">
          <h4 className="text-lg font-medium text-center mb-4">{gameContent.scene.title}</h4>
          
          <div className="relative w-full h-64 bg-taleweaver-blue rounded-lg overflow-hidden">
            {gameContent.scene.elements.map((element: any, idx: number) => (
              <div
                key={idx}
                className="absolute"
                style={{ top: element.y, left: element.x }}
              >
                {element.type === 'person' && (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-black mb-1"></div>
                    <div className="w-1 h-10 bg-black"></div>
                    <div className="flex">
                      <div className="w-6 h-1 bg-black transform -rotate-45"></div>
                      <div className="w-6 h-1 bg-black transform rotate-45"></div>
                    </div>
                    <div className="flex mt-1">
                      <div className="w-6 h-1 bg-black transform rotate-20"></div>
                      <div className="w-6 h-1 bg-black transform -rotate-20"></div>
                    </div>
                    <div className="mt-2 text-xs">{element.label}</div>
                  </div>
                )}
                
                {element.type === 'structure' && (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-16 border-2 border-black"></div>
                    <div className="mt-2 text-xs">{element.label}</div>
                  </div>
                )}
                
                {element.type === 'tree' && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-16 bg-green-700 rounded-full"></div>
                    <div className="w-2 h-6 bg-brown-500"></div>
                    <div className="mt-2 text-xs">{element.label}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-center mt-4 text-sm text-gray-600">
            {gameContent.scene.description}
          </p>
          
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setShowFeedback(true)} className="btn-primary">
              Rate This Drawing
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6 w-full">
      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-taleweaver-purple mb-4"></div>
          <p className="text-xl font-medium">Creating a game from your story...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      ) : showFeedback ? (
        <div className="space-y-6 py-4">
          <h3 className="text-xl font-bold text-center">Rate This Game</h3>
          
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setFeedbackRating(rating)}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-xl transition-all ${
                  feedbackRating >= rating
                    ? "bg-taleweaver-purple text-white"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowFeedback(false)}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              onClick={submitFeedback}
              disabled={feedbackRating === 0}
            >
              Submit Rating
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {gameType === 'quiz' && renderQuizGame()}
          {gameType === 'memory' && renderMemoryGame()}
          {gameType === 'drawing' && renderDrawingGame()}
          
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={generateGame}
              className="text-sm"
            >
              Generate Different Game
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SimpleGameDisplay;
