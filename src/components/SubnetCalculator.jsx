import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

/**
 * Result Row Component for Tools
 */
function ResultRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
      <span className="text-sm text-dim">{label}</span>
      <span className="text-sm font-mono font-bold text-blue-400">{value}</span>
    </div>
  );
}

/**
 * SubnetCalculator Component
 */
export default function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState('24');
  const [results, setResults] = useState({
    network: '192.168.1.0',
    mask: '255.255.255.0',
    broadcast: '192.168.1.255',
    range: '192.168.1.1 - 192.168.1.254',
    hosts: '254'
  });

  useEffect(() => {
    try {
      calculateSubnet(ip, cidr);
    } catch (e) {}
  }, [ip, cidr]);

  const calculateSubnet = (ipAddr, prefix) => {
    const p = parseInt(prefix);
    if (isNaN(p) || p < 0 || p > 32) return;

    const ipParts = ipAddr.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some(x => isNaN(x) || x < 0 || x > 255)) return;

    const maskBinary = ('1'.repeat(p) + '0'.repeat(32 - p));
    const maskParts = [];
    for (let i = 0; i < 4; i++) {
      maskParts.push(parseInt(maskBinary.substr(i * 8, 8), 2));
    }
    const maskStr = maskParts.join('.');

    const netParts = ipParts.map((part, i) => part & maskParts[i]);
    const netStr = netParts.join('.');

    const wildParts = maskParts.map(part => 255 - part);
    const bcParts = netParts.map((part, i) => part | wildParts[i]);
    const bcStr = bcParts.join('.');

    const firstHost = [...netParts];
    if (p < 31) firstHost[3] += 1;
    const lastHost = [...bcParts];
    if (p < 31) lastHost[3] -= 1;

    const totalHosts = p >= 31 ? 0 : Math.pow(2, 32 - p) - 2;

    setResults({
      network: netStr,
      mask: maskStr,
      broadcast: bcStr,
      range: p >= 31 ? 'N/A' : `${firstHost.join('.')} - ${lastHost.join('.')}`,
      hosts: totalHosts.toLocaleString()
    });
  };
  
  return (
    <div className="glass-card p-8 max-w-2xl animate-fade-in">
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
            placeholder="e.g. 192.168.1.1"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-dim uppercase mb-2">CIDR Prefix</label>
          <input 
            type="number" 
            value={cidr} 
            min="0"
            max="32"
            onChange={(e) => setCidr(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
          />
        </div>
      </div>

      <div className="space-y-4">
        <ResultRow label="Network Address" value={results.network} />
        <ResultRow label="Subnet Mask" value={results.mask} />
        <ResultRow label="Broadcast Address" value={results.broadcast} />
        <ResultRow label="Host Range" value={results.range} />
        <ResultRow label="Total Assignable Hosts" value={results.hosts} />
      </div>
    </div>
  );
}
