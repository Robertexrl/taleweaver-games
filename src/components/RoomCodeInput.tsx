
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface RoomCodeInputProps {
  userType: 'storyteller' | 'player';
}

const RoomCodeInput: React.FC<RoomCodeInputProps> = ({ userType }) => {
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateRoomCode = () => {
    setIsGenerating(true);
    // Generate a 6-character alphanumeric code
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setCode(result);
    setIsGenerating(false);
    
    toast({
      title: "Room Code Generated",
      description: `Your room code is: ${result}`,
    });
  };

  const handleJoinRoom = () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room code",
        variant: "destructive",
      });
      return;
    }
    
    // For MVP, we'll just navigate to the appropriate page based on user type
    if (userType === 'storyteller') {
      navigate(`/storyteller/${code}`);
    } else {
      navigate(`/play/${code}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-2">
        <Input
          placeholder="Enter 6-character room code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="text-center text-xl uppercase font-medium rounded-lg border-2 border-playscribe-purple"
          maxLength={6}
        />
        <Button
          onClick={generateRoomCode}
          variant="outline"
          disabled={isGenerating}
          className="shrink-0"
        >
          Generate
        </Button>
      </div>
      <Button 
        onClick={handleJoinRoom} 
        variant={userType === 'storyteller' ? 'teal' : 'secondary'}
        className="mt-2 py-6"
      >
        {userType === 'storyteller' ? 'Start Storytelling' : 'Join Game'}
      </Button>
    </div>
  );
};

export default RoomCodeInput;
