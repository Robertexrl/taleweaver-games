
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic, Home, HelpCircle, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const GrandparentNickname = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

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
      
      // Simulate transcription for demo purposes
      setTimeout(() => {
        setTranscript("Grandma");
      }, 2000);
      
      toast({
        title: "Recording Started",
        description: "Tell us what your grandkids call you."
      });
    } catch (error) {
      toast({
        title: "Permission Denied",
        description: "Please allow microphone access to record your nickname.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    toast({
      title: "Recording Stopped",
      description: "Your nickname has been recorded."
    });
    
    // Generate a random room code and navigate
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let roomCode = '';
    for (let i = 0; i < 6; i++) {
      roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Navigate to storyteller session with the nickname and room code
    setTimeout(() => {
      navigate(`/storyteller/${roomCode}`);
    }, 1500);
  };

  const clearRecording = () => {
    setTranscript('');
    
    toast({
      title: "Recording Cleared",
      description: "You can start over."
    });
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
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          What do the grandkids call you?
        </h1>
        
        <p className="text-xl mb-10">
          (Gran? Pop? Nanna Banana? Let's make it official.)
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md justify-center mb-8">
          <Button
            onClick={toggleRecording}
            className={`py-6 text-xl font-bold ${isRecording ? 
              "bg-red-500 hover:bg-red-600 border-2 border-black" : 
              "bg-red-500 hover:bg-red-600 border-2 border-black"}`}
          >
            <Mic className="mr-2 h-5 w-5" />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          
          <Button
            onClick={clearRecording}
            className="bg-playscribe-teal hover:bg-playscribe-teal/90 py-6 text-xl font-bold border-2 border-black"
            disabled={!transcript}
          >
            <X className="mr-2 h-5 w-5" />
            Clear
          </Button>
        </div>
        
        <div className="w-full max-w-3xl border-4 border-playscribe-teal rounded-xl p-4 min-h-[200px] bg-white">
          <p className="text-gray-500 text-xl mb-2">
            {transcript ? "" : "Your live transcription will be shown here."}
          </p>
          <p className="text-2xl">{transcript}</p>
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

export default GrandparentNickname;
