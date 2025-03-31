
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import VoiceRecorder from '@/components/VoiceRecorder';
import StoryPrompts from '@/components/StoryPrompts';

const StorytellerSession = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const [transcript, setTranscript] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTranscriptUpdate = (newTranscript: string) => {
    setTranscript(newTranscript);
  };

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    
    toast({
      title: "Prompt Selected",
      description: `Try telling a story about: "${prompt}"`,
    });
  };

  const handleCreateGame = () => {
    if (!transcript.trim()) {
      toast({
        title: "No story recorded",
        description: "Please record a story before creating a game",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to the game page with the transcript
    navigate(`/play/${roomCode}`, { state: { storyText: transcript } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-taleweaver-lightPurple/30 to-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <div className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-taleweaver-lightPurple">
            Room Code: <span className="text-taleweaver-purple">{roomCode}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-taleweaver-darkPurple">Storyteller Session</h1>
          <p className="text-gray-600">
            Record your story and we'll transform it into an interactive game.
          </p>
        </div>
        
        {selectedPrompt && (
          <Card className="p-4 mb-6 bg-taleweaver-yellow border-0">
            <p className="font-medium">Selected Prompt: "{selectedPrompt}"</p>
          </Card>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <VoiceRecorder onTranscriptUpdate={handleTranscriptUpdate} />
          </div>
          <div>
            <StoryPrompts onSelectPrompt={handleSelectPrompt} />
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleCreateGame}
            className="btn-primary"
            disabled={!transcript.trim()}
            size="lg"
          >
            Create Game From Story
          </Button>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Remember, the best stories are the ones from your heart. Take your time and enjoy sharing your experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorytellerSession;
