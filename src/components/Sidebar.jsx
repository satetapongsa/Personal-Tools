import React, { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BookOpen, 
  Terminal, 
  Clock, 
  Lock
} from 'lucide-react';

/**
 * Navigation Item Component
 */
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full
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

/**
 * Sidebar Component
 */
export default function Sidebar({ activeTab, setActiveTab, currentTime }) {
  return (
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

      <div className="mt-auto space-y-4">
        <div className="glass-card p-4 bg-emerald-500/5 border-emerald-500/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">System Secure</span>
          </div>
          <div className="text-[11px] text-dim leading-relaxed">
            All protocols active. VPN connected to Node-04.
          </div>
        </div>

        <div className="glass-card p-4 bg-white/5">
          <div className="text-xs text-dim mb-1">Current System Time</div>
          <div className="text-lg font-mono font-bold tracking-wider">
            {currentTime.toLocaleTimeString([], { hour12: false })}
          </div>
        </div>
      </div>
    </aside>
  );
}
