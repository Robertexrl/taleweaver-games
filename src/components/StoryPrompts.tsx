
import React from 'react';
import { Button } from '@/components/ui/button';

interface StoryPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const StoryPrompts: React.FC<StoryPromptsProps> = ({ onSelectPrompt }) => {
  const promptOptions = [
    {
      title: "Finish this sentence: 'Back in my day...'",
      subtitle: "(We promise we're listening.)"
    },
    {
      title: "A time you broke the rules (just a little)!",
      subtitle: "(Your secret's safe with us... sort of!)"
    },
    {
      title: "Spill the beans on a family secret!",
      subtitle: "(We'll turn it into a game!)"
    },
    {
      title: "A meal that brings back the best memories?",
      subtitle: "(Whatever memory bubbles up—no pressure!)"
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {promptOptions.map((prompt, index) => (
        <div 
          key={index} 
          className="prompt-card cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={() => onSelectPrompt(prompt.title)}
        >
          <h3 className="text-lg font-bold mb-1">{prompt.title}</h3>
          <p className="text-sm text-gray-600 italic">{prompt.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default StoryPrompts;
