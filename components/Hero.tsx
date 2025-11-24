import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { PixelCloud, QuestionBlock, BrickBlock, Floor, PixelMadai } from './PixelArt';

interface HeroProps {
  profile: Profile;
}

const PixelCoin = ({ className = "" }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 12 12" className={`${className} animate-bounce`} xmlns="http://www.w3.org/2000/svg">
    <path fill="#000" d="M4 1h4v1h1v1h1v6H9v1H8v1H4V9H3V8H2V3h1V2h1V1z"/>
    <path fill="#FFD700" d="M4 2h4v1h1v6H8v1H4V9H3V3h1V2z"/>
    <path fill="#FFF" d="M4 3h1v2H4V3zM5 2h1v1H5V2z"/>
  </svg>
);

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Progress bar animation: Run from 0 to 100
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1; // Speed of running
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 bg-[#5c94fc]">
      
      {/* Dynamic Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[-100px] animate-[cloud-move_25s_linear_infinite] opacity-90"><PixelCloud /></div>
        <div className="absolute top-32 left-[-200px] animate-[cloud-move_35s_linear_infinite] opacity-60 scale-75"><PixelCloud /></div>
        <div className="absolute top-5 right-[-150px] animate-[cloud-move_40s_linear_infinite_reverse] opacity-70 scale-50"><PixelCloud /></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Windows 95 Container */}
        <div className="bg-[#c0c0c0] p-1 shadow-retro border-2 border-white outline outline-1 outline-black">
          {/* Title Bar */}
          <div className="bg-[#000080] p-1 flex justify-between items-center mb-1 cursor-default">
            <span className="text-white font-bold text-sm pl-2 font-pixel tracking-wider">Madai_World_1-1.exe</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black flex items-center justify-center text-[10px]">_</div>
              <div className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black flex items-center justify-center text-[10px]">X</div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-500 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            
            {/* Floating Mario Blocks */}
            <div className="absolute top-6 right-8 flex gap-1 animate-bounce-pixel">
              <BrickBlock />
              <QuestionBlock />
              <BrickBlock />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left z-10">
              <div className="inline-block bg-black text-y2k-lime px-2 py-1 text-xs mb-4 font-pixel animate-pulse">
                {isLoaded ? "SYSTEM READY" : "LOADING..."}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-black mb-4 tracking-tighter flex flex-wrap items-center justify-center md:justify-start gap-3">
                {profile.name}
                <PixelCoin className="w-10 h-10 mb-4" />
              </h1>
              
              {/* Running Pixel Madai Progress Bar */}
              <div className="w-full max-w-md mb-8 relative">
                <div className="flex justify-between text-xs font-bold mb-1 font-mono">
                  <span>LOADING_ASSETS...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-8 w-full bg-gray-200 border-2 border-black relative overflow-visible">
                   {/* Green Fill */}
                   <div 
                     className="h-full bg-[#00AA00] transition-all duration-75 ease-linear" 
                     style={{width: `${progress}%`}}
                   ></div>
                   
                   {/* Running Pixel Madai Character */}
                   <div 
                     className="absolute top-[-24px] transition-all duration-75 ease-linear"
                     style={{ left: `calc(${progress}% - 24px)` }}
                   >
                     <div className={progress < 100 ? "animate-bounce" : ""}>
                        <PixelMadai className="w-12 h-12 drop-shadow-md" />
                     </div>
                   </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 font-mono">
                {profile.title}
              </h2>

              <p className="text-lg md:text-xl text-gray-700 mb-8 font-bold bg-cyan-50 inline-block p-3 border-2 border-black shadow-[4px_4px_0_0_#000]">
                "{profile.bio}"
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link to="/projects" className="px-6 py-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-black font-bold hover:bg-white active:border-t-black active:border-l-black active:border-b-white active:border-r-white transition-none shadow-xl">
                  📂 PROJECTS
                </Link>
                <Link to="/chat" className="px-6 py-3 bg-black text-y2k-lime border-2 border-y2k-lime font-bold hover:bg-y2k-lime hover:text-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                  💬 CHAT NPC
                </Link>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="flex-1">
              <div className="relative w-64 h-64 bg-y2k-pink p-1 border-4 border-black shadow-[8px_8px_0_0_#000] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="absolute -top-3 -left-3 bg-yellow-400 border-2 border-black px-2 py-1 font-bold text-xs z-20 shadow-sm">PLAYER 1</div>
                <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover border-2 border-white grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Ground Floor */}
      <div className="absolute bottom-0 w-full z-0">
        <Floor />
      </div>
    </div>
  );
};

export default Hero;