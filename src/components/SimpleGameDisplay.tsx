
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface SimpleGameDisplayProps {
  storyText: string;
}

// Simple game generation based on story content
const SimpleGameDisplay: React.FC<SimpleGameDisplayProps> = ({ storyText }) => {
  const [gameType, setGameType] = useState<'quiz' | 'memory' | 'adventure'>('quiz');
  const [gameContent, setGameContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const { toast } = useToast();
  
  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Memory game states
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Adventure game states
  const [currentNode, setCurrentNode] = useState(0);
  const [storyPath, setStoryPath] = useState<number[]>([0]);
  const [adventureComplete, setAdventureComplete] = useState(false);

  useEffect(() => {
    if (storyText) {
      generateGame();
    }
  }, [storyText]);

  const generateGame = () => {
    setLoading(true);
    
    // Reset all game states when generating a new game
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizComplete(false);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameComplete(false);
    setCurrentNode(0);
    setStoryPath([0]);
    setAdventureComplete(false);
    
    // Select a random game type for demo purposes
    const types: ('quiz' | 'memory' | 'adventure')[] = ['quiz', 'memory', 'adventure'];
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
      } else if (randomType === 'adventure') {
        // Generate choose-your-path adventure based on the story
        const adventure = generateAdventure(storyText);
        setGameContent({ adventure });
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

  const generateAdventure = (text: string) => {
    // For MVP, generate a simple choose-your-path adventure
    return {
      title: "Back in My Day: An Adventure",
      nodes: [
        {
          id: 0,
          text: "You've traveled back in time to when your grandparent was a child. It's a sunny morning in the countryside. What do you want to do?",
          choices: [
            { id: 1, text: "Go play in the woods" },
            { id: 2, text: "Help with chores around the farm" }
          ]
        },
        {
          id: 1,
          text: "You head into the woods. The trees are tall and mysterious. You spot some other children building something in a clearing.",
          choices: [
            { id: 3, text: "Join them in building a fort" },
            { id: 4, text: "Watch from a distance first" }
          ]
        },
        {
          id: 2,
          text: "You decide to help with chores. There's feeding the chickens, picking vegetables from the garden, or helping fix the fence.",
          choices: [
            { id: 5, text: "Feed the chickens" },
            { id: 6, text: "Pick vegetables" }
          ]
        },
        {
          id: 3,
          text: "You join the children building a fort! They welcome you and give you the job of collecting sturdy branches. By midday, you've created an impressive hideout together.",
          choices: [
            { id: 7, text: "Suggest playing a game in the fort" },
            { id: 8, text: "Ask them about their lives" }
          ]
        },
        {
          id: 4,
          text: "You watch the children from behind a tree. They're laughing and working together to build what looks like a fort. One of them notices you.",
          choices: [
            { id: 3, text: "Wave and come out of hiding" },
            { id: 9, text: "Quietly back away and explore elsewhere" }
          ]
        },
        {
          id: 5,
          text: "The chickens cluck excitedly as you scatter feed. An older woman (your grandparent's mother) smiles at you. 'You have a good way with animals,' she says.",
          choices: [
            { id: 10, text: "Ask about what life is like here" },
            { id: 6, text: "Offer to help with more chores" }
          ]
        },
        {
          id: 6,
          text: "You help pick fresh vegetables from the garden. The smell of earth and growth is strong. You've never tasted vegetables this fresh before!",
          choices: [
            { id: 10, text: "Ask about what they'll cook with these" },
            { id: 5, text: "Help with the animals next" }
          ]
        },
        {
          id: 7,
          text: "You play hide and seek in and around the fort until the sun begins to set. This is the most outdoor fun you've had in ages!",
          choices: [
            { id: 11, text: "End your adventure and return home with this memory" }
          ]
        },
        {
          id: 8,
          text: "The children tell you about life without smartphones, internet, or video games. Instead, they make up games, tell stories, and use their imagination.",
          choices: [
            { id: 11, text: "End your adventure and return home with this knowledge" }
          ]
        },
        {
          id: 9,
          text: "You explore deeper in the woods and find a small stream with fish darting beneath the surface. It's peaceful here.",
          choices: [
            { id: 11, text: "End your adventure with this moment of solitude" }
          ]
        },
        {
          id: 10,
          text: "You learn about daily life in this time - how different it is without modern technology, but also how people connect more with each other and nature.",
          choices: [
            { id: 11, text: "End your adventure with these insights" }
          ]
        },
        {
          id: 11,
          text: "Your time travel adventure ends. You've experienced a day in the life of past generations, gaining appreciation for their experiences and how they shape our present.",
          choices: []
        }
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

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    
    if (index === gameContent?.questions[currentQuestion]?.answer) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < gameContent?.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }, 1000);
  };

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
      const firstCard = gameContent?.pairs.find((p: any) => p.id === first);
      const secondCard = gameContent?.pairs.find((p: any) => p.id === second);
      
      if (firstCard?.content === secondCard?.content) {
        // Match found
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
        
        // Check if game is complete
        if (matched.length + 2 === gameContent?.pairs.length) {
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

  const handleChoiceSelect = (choiceId: number) => {
    setCurrentNode(choiceId);
    setStoryPath(prev => [...prev, choiceId]);
    
    // Check if adventure is complete (node has no more choices)
    const nextNode = gameContent?.adventure.nodes.find((n: any) => n.id === choiceId);
    if (nextNode?.choices.length === 0) {
      setAdventureComplete(true);
    }
  };

  const renderQuizGame = () => {
    if (!gameContent?.questions) return null;
    
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
                  className="bg-playscribe-purple h-2 rounded-full"
                  style={{ width: `${((currentQuestion + 1) / gameContent.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-playscribe-purple bg-opacity-10 rounded-xl">
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
          <div className="text-center p-6 bg-playscribe-coral bg-opacity-10 rounded-xl">
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
    if (!gameContent?.pairs) return null;
    
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
                  className={`aspect-square bg-playscribe-purple rounded-md flex items-center justify-center cursor-pointer transition-all transform ${
                    flipped.includes(card.id) || matched.includes(card.id)
                      ? "bg-white border-2 border-playscribe-purple"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {(flipped.includes(card.id) || matched.includes(card.id)) && (
                    <span className="font-bold text-playscribe-purple">
                      {card.content}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-playscribe-coral bg-opacity-10 rounded-xl">
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

  const renderAdventureGame = () => {
    if (!gameContent?.adventure) return null;
    
    const currentNodeData = gameContent?.adventure.nodes.find((n: any) => n.id === currentNode);
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-center">Choose-Your-Path Adventure</h3>
        
        {!adventureComplete ? (
          <>
            <div className="text-center mb-4">
              <span className="text-sm font-medium">
                Your adventure journey: {storyPath.length} steps
              </span>
              <div className="flex justify-center gap-1 mt-2">
                {storyPath.map((nodeId, index) => (
                  <div 
                    key={index}
                    className="w-2 h-2 rounded-full bg-playscribe-purple"
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-playscribe-purple bg-opacity-5 rounded-xl">
              <h4 className="text-lg font-medium mb-6 leading-relaxed">
                {currentNodeData?.text}
              </h4>
              
              <div className="space-y-3">
                {currentNodeData?.choices.map((choice: any) => (
                  <button
                    key={choice.id}
                    className="w-full p-4 rounded-lg text-left border-2 border-playscribe-purple hover:bg-playscribe-purple hover:text-white transition-colors"
                    onClick={() => handleChoiceSelect(choice.id)}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-playscribe-coral bg-opacity-10 rounded-xl">
            <h4 className="text-xl font-bold mb-2">Adventure Complete!</h4>
            <p className="text-lg mb-4">You made {storyPath.length - 1} choices in your journey</p>
            <Button onClick={() => setShowFeedback(true)} className="btn-primary">
              Rate This Game
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 w-full">
      {loading ? (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-playscribe-purple mb-4"></div>
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
                    ? "bg-playscribe-purple text-white"
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
          {gameType === 'adventure' && renderAdventureGame()}
          
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
