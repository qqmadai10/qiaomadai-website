import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Hobbies from './pages/Hobbies';
import Chat from './pages/Chat';
import GameWidget from './components/GameWidget';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans text-lg bg-sky-50">
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/hobbies" element={<Hobbies />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        
        <GameWidget />

        <footer className="bg-slate-900 text-gray-300 py-8 text-center text-xs border-t-4 border-white relative z-20 font-mono">
          <div className="max-w-6xl mx-auto px-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-green-400">
              <div className="flex items-center gap-2 bg-black px-3 py-2 border border-green-500 shadow-[0_0_5px_rgba(0,255,0,0.5)]">
                <span className="text-lg">📱</span>
                <span>公众号：产品大王的背锅日常</span>
              </div>
              <div className="flex items-center gap-2 bg-black px-3 py-2 border border-cyan-500 shadow-[0_0_5px_rgba(0,255,255,0.5)] text-cyan-400">
                <span className="text-lg">📧</span>
                <a href="mailto:lanyingqiao@link.cuhk.edu.cn" className="hover:underline hover:text-white">lanyingqiao@link.cuhk.edu.cn</a>
              </div>
            </div>
            <div className="opacity-60 pt-4 border-t border-slate-700 mt-6">
              <p>© 2025 MADAI'S ADVENTURE LOG.</p>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;