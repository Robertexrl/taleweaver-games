
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const HowItWorks = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9a6ba6] to-[#E8E9F3] flex flex-col items-center p-4 md:p-6 py-8 md:py-12">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-6 md:mb-8">
          <Logo size={isMobile ? "sm" : "md"} />
        </div>
        
        <div className="bg-playscribe-purple text-white font-bold text-2xl md:text-3xl py-3 md:py-4 px-4 md:px-8 rounded-lg text-center shadow-lg mb-6 md:mb-10">
          How it works
        </div>
        
        <div className="space-y-6 md:space-y-10 mb-8 md:mb-12">
          {/* Step 1 */}
          <Card className="border-2 border-playscribe-teal shadow-lg relative overflow-visible">
            <div className="absolute -top-6 -left-6 bg-playscribe-purple rounded-full h-12 w-12 md:h-14 md:w-14 flex items-center justify-center shadow-md">
              <span className="text-white text-2xl md:text-3xl font-bold">1</span>
            </div>
            <CardContent className="p-6 md:p-8 pt-8 md:pt-10">
              <h3 className="text-xl md:text-2xl font-semibold text-playscribe-purple mb-2 md:mb-3">
                Storytellers record their experiences
              </h3>
              <p className="text-base md:text-lg">
                Grandparents and other storytellers share their life experiences using simple voice recording tools.
              </p>
            </CardContent>
          </Card>
          
          {/* Step 2 */}
          <Card className="border-2 border-playscribe-coral shadow-lg relative overflow-visible">
            <div className="absolute -top-6 -left-6 bg-playscribe-teal rounded-full h-12 w-12 md:h-14 md:w-14 flex items-center justify-center shadow-md">
              <span className="text-white text-2xl md:text-3xl font-bold">2</span>
            </div>
            <CardContent className="p-6 md:p-8 pt-8 md:pt-10">
              <h3 className="text-xl md:text-2xl font-semibold text-playscribe-teal mb-2 md:mb-3">
                PlayScribe transforms stories into interactive games
              </h3>
              <p className="text-base md:text-lg">
                Our platform converts the recorded stories into fun, educational memory games that children can play.
              </p>
            </CardContent>
          </Card>
          
          {/* Step 3 */}
          <Card className="border-2 border-playscribe-purple shadow-lg relative overflow-visible">
            <div className="absolute -top-6 -left-6 bg-playscribe-coral rounded-full h-12 w-12 md:h-14 md:w-14 flex items-center justify-center shadow-md">
              <span className="text-white text-2xl md:text-3xl font-bold">3</span>
            </div>
            <CardContent className="p-6 md:p-8 pt-8 md:pt-10">
              <h3 className="text-xl md:text-2xl font-semibold text-playscribe-coral mb-2 md:mb-3">
                Children connect with older generations
              </h3>
              <p className="text-base md:text-lg">
                Kids play games based on real-life experiences, learning valuable lessons and forming deeper bonds with their family members.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mb-8 md:mb-10">
          <Button 
            onClick={handleGoBack} 
            variant="secondary"
            className="text-black font-bold text-lg md:text-xl px-8 py-4 md:px-10 md:py-6 transform scale-[1.5] md:scale-[2]"
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
