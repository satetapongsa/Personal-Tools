import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck, 
  Terminal, 
  Clock, 
  ChevronRight,
  Plus,
  Cpu,
  Globe,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { id: 1, subject: 'CCNA - Routing & Switching', progress: 75, icon: <Globe size={18} /> },
  { id: 2, subject: 'CompTIA Security+', progress: 40, icon: <ShieldCheck size={18} /> },
  { id: 3, subject: 'Python for Hacking', progress: 90, icon: <Terminal size={18} /> },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full h-screen p-6 gap-6">
      {/* Sidebar */}
      <aside className="w-72 glass-card flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">PT Dash<span className="text-violet-500">.</span></h1>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<TrendingUp size={20} />} 
            label="Assets & Crypto" 
            active={activeTab === 'assets'} 
            onClick={() => setActiveTab('assets')} 
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Study Tracker" 
            active={activeTab === 'study'} 
            onClick={() => setActiveTab('study')} 
          />
          <NavItem 
            icon={<Terminal size={20} />} 
            label="Net Tools" 
            active={activeTab === 'tools'} 
            onClick={() => setActiveTab('tools')} 
          />
        </nav>

        <div className="mt-auto glass-card p-4 bg-white/5">
          <div className="text-xs text-dim mb-1">Current System Time</div>
          <div className="text-lg font-mono font-bold tracking-wider">
            {currentTime.toLocaleTimeString([], { hour12: false })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pr-2 custom-scroll">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold mb-1">Welcome back, Admin</h2>
            <p className="text-dim">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex gap-3">
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
              {/* Asset Summary */}
              <div className="col-span-8 glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="text-violet-400" size={20} /> Market Overview
                  </h3>
                  <button className="text-xs text-violet-400 font-medium">View All</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {ASSETS.map(asset => (
                    <div key={asset.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }}></div>
                        <span className="text-xs font-bold text-dim">{asset.symbol}</span>
                      </div>
                      <div className="text-xl font-bold mb-1">${asset.price.toLocaleString()}</div>
                      <div className={`text-xs font-medium ${asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
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

              {/* Study Progress */}
              <div className="col-span-12 glass-card p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Cpu className="text-emerald-400" size={20} /> Learning Roadmap
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {STUDY_PROGRESS.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {item.icon} {item.subject}
                        </div>
                        <span className="text-xs font-bold text-emerald-400">{item.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        />
                      </div>
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
          
          {activeTab !== 'dashboard' && activeTab !== 'tools' && (
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

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${active 
          ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
          : 'text-dim hover:bg-white/5 hover:text-white'}
      `}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 bg-violet-500 rounded-full" />}
    </button>
  );
}

function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState('24');
  
  return (
    <div className="glass-card p-8 max-w-2xl">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Globe className="text-blue-400" /> IPv4 Subnet Calculator
      </h3>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold text-dim uppercase mb-2">IP Address</label>
          <input 
            type="text" 
            value={ip} 
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-dim uppercase mb-2">CIDR Prefix</label>
          <input 
            type="number" 
            value={cidr} 
            onChange={(e) => setCidr(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        <ResultRow label="Network Address" value={`${ip.split('.').slice(0,3).join('.')}.0`} />
        <ResultRow label="Subnet Mask" value="255.255.255.0" />
        <ResultRow label="Broadcast Address" value={`${ip.split('.').slice(0,3).join('.')}.255`} />
        <ResultRow label="Host Range" value={`${ip.split('.').slice(0,3).join('.')}.1 - .254`} />
        <ResultRow label="Total Hosts" value="254" />
      </div>
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
      <span className="text-sm text-dim">{label}</span>
      <span className="text-sm font-mono font-bold text-blue-400">{value}</span>
    </div>
  );
}

export default App;
