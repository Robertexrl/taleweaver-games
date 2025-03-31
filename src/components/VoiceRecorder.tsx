
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Save, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface VoiceRecorderProps {
  onTranscriptUpdate: (transcript: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscriptUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();
  
  // Handle recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
          setAudioChunks([...chunks]);
        }
      };
      
      recorder.start(1000);
      setIsRecording(true);
      
      // Simulate transcription updates in real-time (for MVP)
      const demoTranscripts = [
        "When I was a child...",
        "When I was a child, we used to play outside all day long.",
        "When I was a child, we used to play outside all day long. We didn't have phones or computers.",
        "When I was a child, we used to play outside all day long. We didn't have phones or computers. We would build forts in the woods."
      ];
      
      let index = 0;
      const transcriptInterval = setInterval(() => {
        if (index < demoTranscripts.length) {
          setTranscript(demoTranscripts[index]);
          onTranscriptUpdate(demoTranscripts[index]);
          index++;
        } else {
          clearInterval(transcriptInterval);
        }
      }, 5000);
      
      recorder.onstop = () => {
        clearInterval(transcriptInterval);
      };
      
      toast({
        title: "Recording Started",
        description: "Share your story. Your voice is being recorded."
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Permission Denied",
        description: "Please allow microphone access to record your story.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Recording Stopped",
        description: "Your story has been recorded successfully."
      });
    }
  };

  const clearRecording = () => {
    setTranscript('');
    setAudioChunks([]);
    onTranscriptUpdate('');
    
    toast({
      title: "Recording Cleared",
      description: "Your story has been cleared. You can start over."
    });
  };

  const saveRecording = () => {
    if (audioChunks.length === 0) {
      toast({
        title: "No Recording",
        description: "There is no recording to save.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, we would upload the audio to a server
    // For the MVP, we'll just create a download link
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taleweaver-story.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Story Saved",
      description: "Your story recording has been saved."
    });
  };

  return (
    <Card className="p-6 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Voice Recorder</h3>
          {isRecording && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="bg-taleweaver-purple hover:bg-taleweaver-darkPurple text-white"
              size="lg"
            >
              <Mic className="mr-2 h-5 w-5" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
              size="lg"
            >
              <MicOff className="mr-2 h-5 w-5" />
              Stop Recording
            </Button>
          )}
          
          <Button
            onClick={clearRecording}
            variant="outline"
            size="lg"
            disabled={isRecording || !transcript}
          >
            <Trash className="mr-2 h-5 w-5" />
            Clear
          </Button>
          
          <Button
            onClick={saveRecording}
            variant="secondary"
            size="lg"
            disabled={isRecording || audioChunks.length === 0}
          >
            <Save className="mr-2 h-5 w-5" />
            Save Audio
          </Button>
        </div>
        
        {transcript && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Transcript</h4>
            <div className="bg-gray-50 p-4 rounded-md text-sm max-h-40 overflow-y-auto">
              {transcript}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VoiceRecorder;
