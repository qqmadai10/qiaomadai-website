
import React from 'react';

export const PixelCloud = ({ className = "" }: { className?: string }) => (
  <svg width="64" height="32" viewBox="0 0 64 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFFFFF" d="M8 24h48v8H8z" /> {/* Bottom */}
    <path fill="#FFFFFF" d="M4 16h8v8H4z" />  {/* Left bottom */}
    <path fill="#FFFFFF" d="M52 16h8v8h-8z" /> {/* Right bottom */}
    <path fill="#FFFFFF" d="M12 8h12v8H12z" /> {/* Left Top */}
    <path fill="#FFFFFF" d="M24 0h24v16H24z" /> {/* Top */}
    <path fill="#FFFFFF" d="M48 8h8v8h-8z" />  {/* Right Mid */}
    <path fill="rgba(0,0,0,0.1)" d="M8 28h48v4H8z" /> {/* Shadow */}
  </svg>
);

export const QuestionBlock = ({ className = "" }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 16 16" className={`${className} drop-shadow-md`} xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="#000000" />
    <rect x="1" y="1" width="14" height="14" fill="#F89300" /> {/* Orange border */}
    <rect x="2" y="2" width="12" height="12" fill="#FFD700" /> {/* Gold face */}
    {/* Question Mark */}
    <path fill="#000000" fillOpacity="0.1" d="M12 2H4v2h2v2h2v2H6v2h2v4h4V8h-2V6h2V2z" /> {/* Shadow */}
    <path fill="#A85300" d="M5 3h6v2h-2v2H7v2h2v2H7v-2h2V5H5V3zm2 7h2v2H7v-2z" /> {/* Mark */}
    {/* Bolts */}
    <rect x="2" y="2" width="1" height="1" fill="#000000" opacity="0.5" />
    <rect x="13" y="2" width="1" height="1" fill="#000000" opacity="0.5" />
    <rect x="2" y="13" width="1" height="1" fill="#000000" opacity="0.5" />
    <rect x="13" y="13" width="1" height="1" fill="#000000" opacity="0.5" />
  </svg>
);

export const BrickBlock = ({ className = "" }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 16 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="#B22222" />
    <path fill="#000000" fillOpacity="0.2" d="M0 0h16v1H0zm0 8h16v1H0zM7 0h1v8H7zm8 8h1v8h-1z" />
    <rect x="1" y="1" width="6" height="6" fill="#CD5C5C" />
    <rect x="9" y="1" width="6" height="6" fill="#CD5C5C" />
    <rect x="1" y="9" width="14" height="6" fill="#CD5C5C" />
  </svg>
);

export const PixelAdventurer = ({ className = "" }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 12 12" className={className} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    {/* Hat */}
    <path fill="#FF0000" d="M3 0h6v1H3zM2 1h9v1H2z" />
    {/* Face */}
    <path fill="#FFCC99" d="M2 2h7v1H2zM2 3h8v1H2zM2 4h9v1H2z" />
    {/* Eyes */}
    <rect x="8" y="3" width="1" height="1" fill="black" />
    <rect x="6" y="3" width="1" height="1" fill="black" /> {/* Mustache */}
    <path fill="black" d="M5 4h3v1H5z" />
    {/* Shirt */}
    <path fill="#0000FF" d="M3 5h6v1H3zM2 6h8v2H2z" />
    {/* Overalls buttons */}
    <rect x="3" y="6" width="1" height="1" fill="yellow" />
    <rect x="8" y="6" width="1" height="1" fill="yellow" />
    {/* Pants/Legs */}
    <path fill="#0000FF" d="M3 8h2v2H3zM7 8h2v2H7z" />
    {/* Shoes */}
    <path fill="#5c3c1e" d="M2 10h3v1H2zM7 10h3v1H7z" />
  </svg>
);

export const PixelMadai = ({ className = "" }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 12 12" className={className} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    {/* Hair (Long, Dark) */}
    <path fill="#2D1B0E" d="M3 0h6v1H3zM2 1h8v1H2zM1 2h1v5H1zM10 2h1v5h-1z" />
    
    {/* Red Bow */}
    <path fill="#FF0000" d="M4 0h1v1H4zM7 0h1v1H7z" />
    
    {/* Face */}
    <path fill="#FFE4C4" d="M2 2h8v3H2zM3 5h6v1H3z" />
    
    {/* Eyes */}
    <rect x="3" y="3" width="1" height="1" fill="black" />
    <rect x="8" y="3" width="1" height="1" fill="black" />
    
    {/* Pink Dress */}
    <path fill="#FF69B4" d="M3 6h6v3H3z" />
    <path fill="#FF1493" d="M2 9h8v1H2z" /> {/* Skirt ruffle */}
    
    {/* Arms */}
    <path fill="#FFE4C4" d="M2 6h1v2H2zM9 6h1v2H9z" />
    
    {/* Legs */}
    <path fill="#FFE4C4" d="M4 10h1v2H4zM7 10h1v2H7z" />
    
    {/* Shoes */}
    <path fill="#FF0000" d="M3 11h2v1H3zM7 11h2v1H7z" />
  </svg>
);

export const Floor = () => (
  <div className="w-full h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOEU1NjJFIi8+PHJlY3QgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjNDRBNTAwIi8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEwek0zMCAxMGgxMHYxMEgzMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==')] bg-repeat-x border-t-4 border-black"></div>
);
