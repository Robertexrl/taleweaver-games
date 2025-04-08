
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StorytellerSession from "./pages/StorytellerSession";
import GamePlay from "./pages/GamePlay";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import GrandparentNickname from "./pages/GrandparentNickname";
import GameCodeShare from "./pages/GameCodeShare";
import MemoryGame from "./pages/MemoryGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:userType" element={<Login />} />
          <Route path="/storyteller/:roomCode" element={<StorytellerSession />} />
          <Route path="/play/:roomCode" element={<GamePlay />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/grandparent-nickname" element={<GrandparentNickname />} />
          <Route path="/game-code/:roomCode" element={<GameCodeShare />} />
          <Route path="/memory-game/:roomCode" element={<MemoryGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
