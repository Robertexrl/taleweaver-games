
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import { ArrowLeft, Mic, Save, Trash, Home, HelpCircle } from 'lucide-react';

const StorytellerSession = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(180); // 3 minutes in seconds
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Simulate transcript creation for demo purposes
      const demoTranscripts = [
        "When I was a kid...",
        "When I was a kid, I use to be a professional soccer player.",
        "When I was a kid, I use to be a professional soccer player. Thanks to it I travelled all over the world",
        "When I was a kid, I use to be a professional soccer player. Thanks to it I travelled all over the world and learnt about different cultures and languages, I can speak Spanish, Portuguese, and English"
      ];
      
      let index = 0;
      const transcriptInterval = setInterval(() => {
        if (index < demoTranscripts.length) {
          setTranscript(demoTranscripts[index]);
          index++;
        } else {
          clearInterval(transcriptInterval);
        }
      }, 5000);
      
      // Simulate time counting down
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimerInterval(interval);
      
      toast({
        title: "Recording Started",
        description: "Share your story. Your voice is being recorded."
      });
    } catch (error) {
      toast({
        title: "Permission Denied",
        description: "Please allow microphone access to record your story.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Stop the timer interval
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    toast({
      title: "Recording Stopped",
      description: "Your story has been recorded."
    });
  };

  const clearRecording = () => {
    setTranscript('');
    setAudioChunks([]);
    setRecordingTime(180); // Reset to 3 minutes
    
    toast({
      title: "Recording Cleared",
      description: "Your story has been cleared. You can start over."
    });
  };

  const saveAudio = () => {
    // In a real app, we would save the audio here
    toast({
      title: "Story Saved",
      description: "Your story has been saved."
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
    
    // Navigate to the game code share page
    navigate(`/game-code/${roomCode}`, { state: { storyText: transcript } });
  };

  const navigateToHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col">
      <header className="p-4 flex justify-center items-center relative">
        <div className="absolute left-4">
          <Link to="/grandparent-nickname" className="flex items-center text-purple-900">
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
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Storyteller Session
        </h1>
        
        <p className="text-xl mb-8">
          Record your story and we'll transform it into an interactive game
        </p>
        
        <div className="text-center mb-8">
          <div className="text-2xl font-bold mb-2">Time Left</div>
          <div className="bg-purple-200 px-6 py-3 rounded-lg text-4xl font-bold">
            {formatTime(recordingTime)}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl justify-center mb-8">
          <Button
            onClick={toggleRecording}
            className={`py-6 text-xl font-bold flex-1 ${isRecording ? 
              "bg-red-500 hover:bg-red-600 border-2 border-black" : 
              "bg-red-500 hover:bg-red-600 border-2 border-black"}`}
          >
            <Mic className="mr-2 h-5 w-5" />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          
          <Button
            onClick={clearRecording}
            className="bg-playscribe-teal hover:bg-playscribe-teal/90 py-6 text-xl font-bold border-2 border-black flex-1"
            disabled={!transcript}
          >
            <Trash className="mr-2 h-5 w-5" />
            Clear
          </Button>
          
          <Button
            onClick={saveAudio}
            className="bg-green-500 hover:bg-green-600 py-6 text-xl font-bold border-2 border-black flex-1"
            disabled={!transcript}
          >
            <Save className="mr-2 h-5 w-5" />
            Save Audio
          </Button>
        </div>
        
        <div className="w-full max-w-3xl border-4 border-playscribe-teal rounded-xl p-4 min-h-[200px] mb-10 bg-white">
          <p className="text-gray-500 text-xl mb-2">
            {transcript ? "" : "Your live transcription will be shown here."}
          </p>
          <p className="text-2xl text-left">{transcript}</p>
        </div>
        
        {transcript && (
          <Button
            onClick={handleCreateGame}
            className="bg-playscribe-teal hover:bg-playscribe-teal/90 py-6 text-2xl font-bold border-2 border-black px-8"
          >
            Create Game
          </Button>
        )}
      </main>
      
      <footer className="p-6 text-center text-sm text-gray-600 flex justify-between items-center">
        <div>Terms and Privacy | All Right Reserved 2025 | Developed by SheTells</div>
        <button 
          onClick={navigateToHowItWorks}
          className="rounded-full bg-white p-3 shadow-md hover:shadow-lg"
          aria-label="Need help starting?"
        >
          <HelpCircle className="h-6 w-6 text-playscribe-purple" />
        </button>
      </footer>
    </div>
  );
};

export default StorytellerSession;
