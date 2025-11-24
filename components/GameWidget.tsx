
import React, { useState, useEffect, useRef } from 'react';

// --- Retro Assets ---
const PMShip = () => (
  <svg width="40" height="30" viewBox="0 0 24 18" fill="none" className="drop-shadow-md">
    <rect x="4" y="6" width="16" height="6" fill="#3B82F6" />
    <rect x="8" y="2" width="8" height="4" fill="#93C5FD" />
    <rect x="0" y="4" width="4" height="10" fill="#1D4ED8" />
    <rect x="20" y="4" width="4" height="10" fill="#1D4ED8" />
    <rect x="10" y="12" width="4" height="4" fill="#FCD34D" />
  </svg>
);

const EnemyBug = ({ type }: { type: string }) => (
  <div className="flex flex-col items-center animate-bounce">
    <div className={`w-8 h-6 ${type === 'BUG' ? 'bg-green-600' : 'bg-purple-600'} border-2 border-black flex items-center justify-center relative shadow-sm`}>
      <div className="w-1 h-1 bg-white absolute top-1 left-1"></div>
      <div className="w-1 h-1 bg-white absolute top-1 right-1"></div>
      <div className="w-4 h-1 bg-black absolute bottom-1"></div>
    </div>
    <span className="text-[8px] font-bold bg-black text-white px-1 mt-0.5 font-pixel">{type}</span>
  </div>
);

const GameWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gameStatus, setGameStatus] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER' | 'VICTORY'>('IDLE');
  const [score, setScore] = useState(0);
  
  const [playerY, setPlayerY] = useState(50);
  const [bullets, setBullets] = useState<{id: number, x: number, y: number}[]>([]);
  const [enemies, setEnemies] = useState<{id: number, x: number, y: number, type: string}[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const WIN_SCORE = 5000;

  const ENEMY_TYPES = ['BUG', '404', 'HALLUCINATION', 'DRIFT', 'LATENCY'];

  // --- Main Game Loop ---
  useEffect(() => {
    if (gameStatus !== 'PLAYING') return;

    const interval = setInterval(() => {
      // 1. Check Win Condition
      if (score >= WIN_SCORE) {
        setGameStatus('VICTORY');
        return;
      }

      // 2. Move Bullets
      setBullets(prev => prev.map(b => ({ ...b, x: b.x + 2 })).filter(b => b.x < 105));

      // 3. Move Enemies (Speed increases with score)
      const speed = 0.6 + (score / 10000);
      setEnemies(prev => prev.map(e => ({ ...e, x: e.x - speed })).filter(e => e.x > -15));

      // 4. Spawn Enemies
      // Spawn rate increases with score
      const spawnChance = 0.03 + (score / 50000);
      if (Math.random() < spawnChance) {
        const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
        setEnemies(prev => [...prev, {
          id: Date.now() + Math.random(),
          x: 105,
          y: Math.random() * 80 + 10,
          type
        }]);
      }

      // 5. Check Collision (Player vs Enemy)
      setEnemies(currentEnemies => {
        for (const enemy of currentEnemies) {
          if (enemy.x < 18 && enemy.x > 2 && Math.abs(enemy.y - playerY) < 12) {
             setGameStatus('GAMEOVER');
          }
        }
        return currentEnemies;
      });

    }, 30);

    return () => clearInterval(interval);
  }, [gameStatus, playerY, score]); 

  // --- Bullet Hit Detection ---
  useEffect(() => {
    if (gameStatus !== 'PLAYING') return;

    let hit = false;
    const bulletsToRemove = new Set<number>();
    const enemiesToRemove = new Set<number>();

    bullets.forEach(b => {
      enemies.forEach(e => {
        if (Math.abs(b.x - e.x) < 5 && Math.abs(b.y - e.y) < 10) {
          bulletsToRemove.add(b.id);
          enemiesToRemove.add(e.id);
          hit = true;
        }
      });
    });

    if (hit) {
      setScore(s => s + (bulletsToRemove.size * 100));
      setBullets(prev => prev.filter(b => !bulletsToRemove.has(b.id)));
      setEnemies(prev => prev.filter(e => !enemiesToRemove.has(e.id)));
    }
  }, [bullets, enemies, gameStatus]);


  // --- Controls ---
  const startGame = () => {
    setScore(0);
    setBullets([]);
    setEnemies([]);
    setGameStatus('PLAYING');
  };

  const shoot = (e: React.MouseEvent) => {
    if (gameStatus !== 'PLAYING') return;
    e.stopPropagation();
    setBullets(prev => [...prev, { 
      id: Date.now() + Math.random(), 
      x: 15, 
      y: playerY 
    }]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameStatus !== 'PLAYING' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percent = (y / rect.height) * 100;
    setPlayerY(Math.min(Math.max(percent, 5), 95));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-mono select-none">
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-4 border-r-4 border-black shadow-xl flex flex-col items-center justify-center hover:scale-105 active:scale-95 group"
        >
          <span className="text-2xl group-hover:animate-bounce">🕹️</span>
          <span className="text-[9px] font-bold mt-1 bg-blue-700 text-white px-1">PLAY</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] outline outline-1 outline-black flex flex-col">
          <div className="bg-[#000080] px-2 py-1 flex justify-between items-center cursor-default">
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-red-500 border border-white rounded-full"></div>
               <span className="text-white font-bold text-xs font-pixel tracking-wider">AI_PM_Adventure.exe</span>
            </div>
            <button 
              onClick={() => { setIsOpen(false); setGameStatus('IDLE'); }} 
              className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black flex items-center justify-center font-bold text-xs active:border-inset"
            >
              X
            </button>
          </div>

          <div className="p-1">
            <div 
              ref={containerRef}
              className="relative h-64 bg-black overflow-hidden border-2 border-gray-500 cursor-crosshair"
              onClick={shoot}
              onMouseMove={handleMouseMove}
              style={{
                backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .1) 25%, rgba(0, 255, 0, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .1) 75%, rgba(0, 255, 0, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .1) 25%, rgba(0, 255, 0, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .1) 75%, rgba(0, 255, 0, .1) 76%, transparent 77%, transparent)`,
                backgroundSize: '30px 30px'
              }}
            >
              <div className="absolute top-2 left-2 text-green-400 font-bold text-xs z-10 font-pixel bg-black/50 px-1 border border-green-800">
                VALUE: ${score} / ${WIN_SCORE}
              </div>

              {gameStatus === 'IDLE' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                  <h1 className="text-2xl text-y2k-yellow font-bold mb-4 font-pixel text-center">AI PRODUCT<br/>MANAGER</h1>
                  <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="bg-[#008080] text-white px-6 py-2 font-bold border-2 border-white hover:bg-[#00a0a0] shadow-retro">START SPRINT</button>
                  <p className="text-gray-400 text-[10px] mt-3">GOAL: ${WIN_SCORE} VALUE</p>
                </div>
              )}

              {gameStatus === 'GAMEOVER' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 z-20">
                  <h1 className="text-2xl text-white font-bold mb-2 font-pixel">LAUNCH FAILED</h1>
                  <p className="text-yellow-300 mb-4 font-mono">VALUE CREATED: ${score}</p>
                  <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="bg-[#c0c0c0] text-black px-6 py-2 font-bold border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-inset">RETRY</button>
                </div>
              )}

              {/* Victory Screen */}
              {gameStatus === 'VICTORY' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/90 z-20">
                  <h1 className="text-3xl text-y2k-lime font-bold mb-2 font-pixel animate-bounce">SUCCESS!</h1>
                  <p className="text-white mb-1 font-mono">PRODUCT LAUNCHED 🚀</p>
                  <p className="text-yellow-300 mb-4 text-xs">KPI ACHIEVED: 100%</p>
                  <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="bg-y2k-pink text-white px-6 py-2 font-bold border-2 border-white hover:bg-pink-600">PLAY AGAIN</button>
                  {/* Fireworks effect */}
                  <div className="absolute top-10 left-10 text-4xl animate-ping">✨</div>
                  <div className="absolute bottom-10 right-10 text-4xl animate-ping delay-100">🎉</div>
                </div>
              )}

              {gameStatus === 'PLAYING' && (
                <>
                  <div className="absolute left-2 transition-all duration-75 ease-linear pointer-events-none" style={{ top: `${playerY}%`, transform: 'translateY(-50%)' }}>
                    <PMShip />
                  </div>
                  {bullets.map(b => (
                    <div key={b.id} className="absolute flex items-center pointer-events-none" style={{ left: `${b.x}%`, top: `${b.y}%`, transform: 'translateY(-50%)' }}>
                      <div className="w-4 h-3 bg-yellow-300 border border-black flex items-center justify-center"><span className="text-[6px] font-bold">PRD</span></div>
                    </div>
                  ))}
                  {enemies.map(e => (
                    <div key={e.id} className="absolute transition-all duration-75 linear pointer-events-none" style={{ left: `${e.x}%`, top: `${e.y}%`, transform: 'translateY(-50%)' }}>
                      <EnemyBug type={e.type} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="bg-[#c0c0c0] px-2 py-1 text-[10px] text-gray-600 flex justify-between border-t border-white font-bold">
            <span>STATUS: {gameStatus}</span>
            <span>TARGET: ${WIN_SCORE}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameWidget;
