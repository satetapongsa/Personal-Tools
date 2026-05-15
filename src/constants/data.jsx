import React from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

export const ASSETS = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 65230.45, change: 2.4, color: '#f7931a' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3450.12, change: -1.2, color: '#627eea' },
  { id: 3, name: 'K-SET50 Fund', symbol: 'MF', price: 12.45, change: 0.5, color: '#10b981' },
];

export const SCHEDULE = [
  { id: 1, title: 'Network Security Exam', time: 'Mon, 10:00 AM', type: 'Exam' },
  { id: 2, title: 'Penetration Testing Lab', time: 'Wed, 01:30 PM', type: 'Class' },
  { id: 3, title: 'Cloud Computing Seminar', time: 'Fri, 09:00 AM', type: 'Workshop' },
];

export const STUDY_PROGRESS = [
  { id: 1, subject: 'CCNA - Routing & Switching', progress: 75, icon: <ChevronRight size={18} /> },
  { id: 2, subject: 'CompTIA Security+', progress: 40, icon: <ChevronRight size={18} /> },
  { id: 3, subject: 'Python for Hacking', progress: 90, icon: <Terminal size={18} /> },
];

export const SYSTEM_STATUS = {
  status: 'Secure',
  node: 'Node-04',
  protocol: 'Active',
  vpn: 'Connected'
};
