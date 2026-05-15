import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

const NEWS = [
  { id: 1, title: 'Bitcoin surges past $65k as institutional interest grows', source: 'CoinDesk', time: '10m ago' },
  { id: 2, title: 'Ethereum network upgrade scheduled for next month', source: 'The Block', time: '45m ago' },
  { id: 3, title: 'New regulation proposal for stablecoins in EU', source: 'Reuters', time: '2h ago' },
];

export default function CryptoNews() {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Newspaper className="text-pink-400" size={20} /> Market Intelligence
      </h3>
      <div className="space-y-4">
        {NEWS.map(item => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">{item.source}</span>
              <span className="text-[10px] text-dim">{item.time}</span>
            </div>
            <div className="text-sm font-medium group-hover:text-pink-400 transition-colors flex items-center gap-2">
              {item.title}
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
