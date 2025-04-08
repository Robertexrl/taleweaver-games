
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col items-center p-6 py-12">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>
        
        <div className="bg-playscribe-purple text-white font-bold text-3xl py-4 px-8 rounded-lg text-center shadow-lg mb-10">
          How it works
        </div>
        
        <div className="space-y-10 mb-12">
          {/* Step 1 */}
          <Card className="border-2 border-playscribe-teal shadow-lg relative overflow-visible">
            <div className="absolute -top-6 -left-6 bg-playscribe-purple rounded-full h-14 w-14 flex items-center justify-center shadow-md">
              <span className="text-white text-3xl font-bold">1</span>
            </div>
            <CardContent className="p-8 pt-10">
              <h3 className="text-2xl font-semibold text-playscribe-purple mb-3">
                Storytellers record their experiences
              </h3>
              <p className="text-lg mb-4">
                Grandparents and other storytellers share their life experiences using simple voice recording tools.
              </p>
              <div className="w-24 h-24 mt-3 bg-contain bg-no-repeat bg-center rounded-lg shadow-md" 
                  style={{backgroundImage: "url('/lovable-uploads/d1fe4217-af03-4e80-89bd-9b7883e4602.png')"}}></div>
            </CardContent>
          </Card>
          
          {/* Step 2 */}
          <Card className="border-2 border-playscribe-coral shadow-lg relative overflow-visible">
            <div className="absolute -top-6 -left-6 bg-playscribe-teal rounded-full h-14 w-14 flex items-center justify-center shadow-md">
              <span className="text-white text-3xl font-bold">2</span>
            </div>
            <CardContent className="p-8 pt-10">
              <h3 className="text-2xl font-semibold text-playscribe-teal mb-3">
                PlayScribe transforms stories into interactive games
              </h3>
              <p className="text-lg mb-4">
                Our platform converts the recorded stories into fun, educational memory games that children can play.
              </p>
              <div className="w-24 h-24 mt-3 bg-contain bg-no-repeat bg-center rounded-lg shadow-md"
                  style={{backgroundImage: "url('/lovable-uploads/510c15e3-c9f9-43af-a512-64e1f414d420.png')"}}></div>
            </CardContent>
          </Card>
          
          {/* Step 3 */}
          <Card className="border-2 border-playscribe-purple shadow-lg relative overflow-visible">
            <div className="absolute -top-6 -left-6 bg-playscribe-coral rounded-full h-14 w-14 flex items-center justify-center shadow-md">
              <span className="text-white text-3xl font-bold">3</span>
            </div>
            <CardContent className="p-8 pt-10">
              <h3 className="text-2xl font-semibold text-playscribe-coral mb-3">
                Children connect with older generations
              </h3>
              <p className="text-lg mb-4">
                Kids play games based on real-life experiences, learning valuable lessons and forming deeper bonds with their family members.
              </p>
              <div className="w-24 h-24 mt-3 bg-contain bg-no-repeat bg-center rounded-lg shadow-md"
                  style={{backgroundImage: "url('/lovable-uploads/0dbd1ae4-64a9-465b-b13e-d7c71db740be.png')"}}></div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleGoBack} 
            variant="secondary"
            className="text-black font-bold text-xl px-10 py-6 transform scale-[3] my-20"
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
