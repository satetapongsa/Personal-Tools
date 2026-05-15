import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const LOGS = [
  { id: 1, type: 'success', msg: 'Firewall rules updated', time: '2 mins ago' },
  { id: 2, type: 'warning', msg: 'Failed login attempt from 192.168.1.45', time: '15 mins ago' },
  { id: 3, type: 'success', msg: 'VPN tunnel established', time: '1 hour ago' },
  { id: 4, type: 'alert', msg: 'Port scan detected on eth0', time: '3 hours ago' },
];

export default function SecurityLogs() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Shield className="text-blue-400" size={20} /> Security Activity Logs
      </h3>
      <div className="space-y-4">
        {LOGS.map(log => (
          <div key={log.id} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className={`mt-1 p-1.5 rounded-lg ${
              log.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
              log.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 
              'bg-rose-500/20 text-rose-400'
            }`}>
              {log.type === 'success' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{log.msg}</div>
              <div className="text-[10px] text-dim">{log.time}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 rounded-xl border border-white/10 text-xs font-bold text-dim hover:text-white hover:bg-white/5 transition-all">
        VIEW ALL LOGS
      </button>
    </div>
  );
}
