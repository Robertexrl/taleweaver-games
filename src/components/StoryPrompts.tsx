
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StoryPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const StoryPrompts: React.FC<StoryPromptsProps> = ({ onSelectPrompt }) => {
  const promptCategories = [
    {
      title: "Childhood Memories",
      prompts: [
        "Tell me about your favorite childhood game",
        "What was school like when you were young?",
        "Describe a family tradition from your childhood"
      ]
    },
    {
      title: "Life Lessons",
      prompts: [
        "Share a time when you learned something important",
        "Tell me about a challenge you overcame",
        "What advice would you give to your younger self?"
      ]
    },
    {
      title: "Adventures",
      prompts: [
        "Describe the most exciting trip you ever took",
        "Tell me about a time you tried something new",
        "Share a story about getting lost or finding your way"
      ]
    }
  ];

  return (
    <Card className="p-6 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-medium">Story Prompts</h3>
        <p className="text-sm text-muted-foreground">Need inspiration? Try one of these prompts to get started with your story:</p>
        
        <div className="space-y-4">
          {promptCategories.map((category, idx) => (
            <div key={idx}>
              <h4 className="font-medium text-taleweaver-darkPurple mb-2">{category.title}</h4>
              <div className="grid grid-cols-1 gap-2">
                {category.prompts.map((prompt, promptIdx) => (
                  <Button
                    key={promptIdx}
                    variant="outline"
                    className="text-left justify-start h-auto py-3 border-taleweaver-lightPurple hover:bg-taleweaver-lightPurple"
                    onClick={() => onSelectPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-taleweaver-yellow rounded-md">
          <p className="text-sm font-medium">Tips for great stories:</p>
          <ul className="text-sm list-disc pl-5 mt-1">
            <li>Begin with "When I was..." or "I remember..."</li>
            <li>Include details about what you saw, heard, or felt</li>
            <li>Take your time and speak naturally</li>
            <li>Don't worry about making it perfect</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default StoryPrompts;
