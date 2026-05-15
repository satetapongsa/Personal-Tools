import React, { useState } from 'react';
import { Lock, RefreshCw, Copy, Check } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-8 max-w-xl animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Lock className="text-amber-400" /> Secure Password Generator
      </h3>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 relative group">
        <div className="text-xl font-mono font-bold break-all text-white pr-10 min-h-[1.75rem]">
          {password || 'Click Generate...'}
        </div>
        {password && (
          <button 
            onClick={copyToClipboard}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dim hover:text-white transition-colors"
          >
            {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-bold text-dim uppercase">Password Length: {length}</label>
          </div>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <button 
          onClick={generatePassword}
          className="w-full py-4 bg-amber-500/20 border border-amber-500/30 rounded-xl font-bold text-amber-400 hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} /> GENERATE SECURE PASSWORD
        </button>
      </div>
    </div>
  );
}
