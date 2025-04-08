
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-purple-700 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>
        
        <div className="bg-playscribe-teal text-white font-bold text-3xl py-4 px-8 rounded-lg text-center shadow-lg mb-10">
          How it works
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-10 relative">
          <div className="absolute -top-8 -right-8">
            <div className="bg-playscribe-coral rounded-full h-16 w-16 flex items-center justify-center transform rotate-45">
              <div className="h-8 w-1 bg-white"></div>
              <div className="h-1 w-8 bg-white absolute"></div>
            </div>
          </div>
          
          <div className="space-y-12 relative">
            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold text-blue-400 leading-none">1</div>
              <div>
                <p className="text-2xl font-semibold">
                  Storytellers record their experiences using simple voice tools.
                </p>
                <div className="w-24 h-24 mt-3 bg-contain bg-no-repeat bg-center" 
                     style={{backgroundImage: "url('/lovable-uploads/d1fe4217-af03-4e80-89bd-b9b7883e4602.png')"}}></div>
              </div>
            </div>
            
            {/* Connection Line */}
            <div className="absolute left-[1.15rem] top-[4rem] h-[9rem] w-1 bg-gray-300"></div>
            
            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold text-yellow-500 leading-none">2</div>
              <div>
                <p className="text-2xl font-semibold">
                  PlayScribe transforms stories into interactive games.
                </p>
                <div className="w-24 h-24 mt-3 bg-contain bg-no-repeat bg-center"
                     style={{backgroundImage: "url('/lovable-uploads/510c15e3-c9f9-43af-a512-64e1f414d420.png')"}}></div>
              </div>
            </div>
            
            {/* Connection Line */}
            <div className="absolute left-[1.15rem] top-[15rem] h-[9rem] w-1 bg-gray-300"></div>
            
            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold text-red-500 leading-none">3</div>
              <div>
                <p className="text-2xl font-semibold">
                  Children play games and connect with older generations' experiences.
                </p>
                <div className="w-24 h-24 mt-3 bg-contain bg-no-repeat bg-center"
                     style={{backgroundImage: "url('/lovable-uploads/0dbd1ae4-64a9-465b-b13e-d7c71db740be.png')"}}></div>
              </div>
            </div>
            
            {/* Connection between 1 and 3 - representing the new bond */}
            <div className="absolute left-12 top-[4rem] w-[1px] h-[20rem] bg-playscribe-purple border-l-2 border-dashed border-playscribe-purple"></div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleGoBack} 
            className="bg-playscribe-coral hover:bg-playscribe-coral/90 text-black font-bold text-xl px-10 py-6"
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
