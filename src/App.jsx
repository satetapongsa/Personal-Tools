import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Terminal, 
  Clock, 
  ChevronRight,
  Plus,
  Cpu,
  Search,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Sidebar from './components/Sidebar';
import SubnetCalculator from './components/SubnetCalculator';

// Mock Data
const ASSETS = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 65230.45, change: 2.4, color: '#f7931a' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3450.12, change: -1.2, color: '#627eea' },
  { id: 3, name: 'K-SET50 Fund', symbol: 'MF', price: 12.45, change: 0.5, color: '#10b981' },
];

const SCHEDULE = [
  { id: 1, title: 'Network Security Exam', time: 'Mon, 10:00 AM', type: 'Exam' },
  { id: 2, title: 'Penetration Testing Lab', time: 'Wed, 01:30 PM', type: 'Class' },
  { id: 3, title: 'Cloud Computing Seminar', time: 'Fri, 09:00 AM', type: 'Workshop' },
];

const STUDY_PROGRESS = [
  { id: 1, subject: 'CCNA - Routing & Switching', progress: 75, icon: <ChevronRight size={18} /> },
  { id: 2, subject: 'CompTIA Security+', progress: 40, icon: <ChevronRight size={18} /> },
  { id: 3, subject: 'Python for Hacking', progress: 90, icon: <Terminal size={18} /> },
];

/**
 * Main Application Component
 */
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full h-screen p-6 gap-6">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentTime={currentTime} />

      <main className="flex-1 overflow-y-auto pr-2 custom-scroll">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold mb-1">Welcome back, Admin</h2>
            <p className="text-dim">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-dim hover:text-white transition-colors relative">
              <Bell size={18} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#030712]" />
            </button>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dim group-focus-within:text-violet-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-violet-500/50 w-64 transition-all"
              />
            </div>
            <button className="glass-card px-4 py-2 flex items-center gap-2 hover:bg-white/10 text-sm font-medium">
              <Plus size={16} /> New Entry
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-12 gap-6"
            >
              <div className="col-span-8 glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="text-violet-400" size={20} /> Market Overview
                  </h3>
                  <button className="text-xs text-violet-400 font-medium">View All</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {ASSETS.map(asset => (
                    <div key={asset.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={48} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: asset.color }}>
                          {asset.symbol[0]}
                        </div>
                        <span className="text-sm font-bold">{asset.name}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1 tracking-tight">${asset.price.toLocaleString()}</div>
                      <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${asset.change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-4 glass-card p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Clock className="text-fuchsia-400" size={20} /> Upcoming
                </h3>
                <div className="flex flex-col gap-4">
                  {SCHEDULE.map(item => (
                    <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-dim group-hover:text-fuchsia-400 transition-colors">
                        <ChevronRight size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{item.title}</div>
                        <div className="text-xs text-dim">{item.time} • {item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 glass-card p-6">
                <h3 className="text-lg font-semibold mb-8 flex items-center gap-2">
                  <Cpu className="text-emerald-400" size={20} /> Learning Roadmap
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {STUDY_PROGRESS.map(item => (
                    <div key={item.id} className="flex flex-col items-center p-4 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                      <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle 
                            className="text-white/10 stroke-current" 
                            strokeWidth="8" 
                            cx="50" cy="50" r="40" fill="transparent"
                          ></circle>
                          <motion.circle 
                            className="text-emerald-500 stroke-current" 
                            strokeWidth="8" 
                            strokeLinecap="round" 
                            cx="50" cy="50" r="40" fill="transparent"
                            strokeDasharray="251.2"
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 251.2 - (251.2 * item.progress) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          ></motion.circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                          {item.progress}%
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-center mb-1">{item.subject}</div>
                      <div className="text-[10px] uppercase tracking-widest text-dim font-bold">In Progress</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tools' && (
            <motion.div 
              key="tools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SubnetCalculator />
            </motion.div>
          )}
          
          {(activeTab !== 'dashboard' && activeTab !== 'tools') && (
            <div className="flex flex-col items-center justify-center h-64 glass-card">
              <Terminal size={48} className="text-dim mb-4 animate-pulse" />
              <p className="text-dim">Module under development...</p>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
