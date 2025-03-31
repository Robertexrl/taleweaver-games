
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import RoomCodeInput from '@/components/RoomCodeInput';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { userType } = useParams<{ userType: 'storyteller' | 'player' }>();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-taleweaver-lightPurple/50 to-white">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Link to="/">
          <Logo size="md" className="mb-8" />
        </Link>
        
        <div className="card-container max-w-md w-full">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              {userType === 'storyteller' ? 'Storyteller Login' : 'Game Player Login'}
            </h1>
            
            <p className="text-center mb-8">
              {userType === 'storyteller'
                ? 'Share your stories and create games for the younger generation.'
                : 'Play games based on real-life stories from older generations.'}
            </p>
            
            <RoomCodeInput userType={userType || 'player'} />
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500 mb-4">
                Want to {userType === 'storyteller' ? 'play games' : 'tell stories'} instead?
              </p>
              <Link to={userType === 'storyteller' ? '/login/player' : '/login/storyteller'}>
                <Button variant="outline" className="w-full">
                  Switch to {userType === 'storyteller' ? 'Game Player' : 'Storyteller'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-3">
            {userType === 'storyteller' ? 'Tips for Storytellers' : 'Tips for Game Players'}
          </h2>
          <ul className="text-sm list-disc text-left pl-6 space-y-2">
            {userType === 'storyteller' ? (
              <>
                <li>Find a quiet place to record your story</li>
                <li>Speak clearly and at a comfortable pace</li>
                <li>Include specific details to make your story come alive</li>
                <li>Don't worry about making mistakes - just keep going!</li>
              </>
            ) : (
              <>
                <li>Ask an adult for help if you need it</li>
                <li>Each game is based on a real-life story</li>
                <li>Try different games to learn different stories</li>
                <li>Share what you learned with friends and family</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
