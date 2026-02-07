
import React from 'react';
import { 
  GlobeAltIcon, 
  UserGroupIcon, 
  MapIcon, 
  ShieldCheckIcon,
  ExclamationCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const attackTrends = [
  { type: 'Phishing', count: 450 },
  { type: 'Smishing', count: 320 },
  { type: 'BEC', count: 180 },
  { type: 'Deepfake', count: 95 },
  { type: 'Scams', count: 240 },
];

const Admin: React.FC = () => {
  return (
    <div className="space-y-8 animate-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">Enterprise Intelligence</h2>
          <p className="text-slate-500">Global threat landscape and organizational risk posture.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700">
          <DocumentArrowDownIcon className="w-5 h-5" />
          Export Intelligence Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Global Map Visualization Placeholder */}
        <div className="lg:col-span-3 bg-slate-900/60 p-8 rounded-[3rem] border border-slate-800 overflow-hidden relative min-h-[500px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <GlobeAltIcon className="w-6 h-6 text-cyan-400" />
              Live Attack Heatmap
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
                <span className="text-xs text-slate-400">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                <span className="text-xs text-slate-400">Active Sensors</span>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <MapIcon className="w-[800px] h-[800px]" />
          </div>

          <div className="relative h-full flex items-center justify-center">
            {/* Pulsing Dots Simulation */}
            {[
              { t: '15%', l: '20%' }, { t: '40%', l: '60%' }, { t: '70%', l: '30%' },
              { t: '25%', l: '75%' }, { t: '80%', l: '85%' }, { t: '10%', l: '90%' }
            ].map((p, i) => (
              <div 
                key={i} 
                className="absolute w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_20px_#f43f5e]" 
                style={{ top: p.t, left: p.l, animation: `pulse 2s infinite ${i * 0.3}s` }}
              ></div>
            ))}
            <div className="text-center space-y-4 max-w-sm">
              <p className="text-lg font-bold text-slate-300">Synchronizing Global Intelligence...</p>
              <div className="h-1 bg-slate-800 w-full rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Attack Stats */}
        <div className="bg-slate-900/60 p-8 rounded-[3rem] border border-slate-800 flex flex-col">
          <h3 className="text-xl font-bold mb-8">Attack Vectors</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackTrends} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={12} width={80} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {attackTrends.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#06b6d4' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-2xl">
              <UserGroupIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-bold">User Risk Profile</h3>
          </div>
          <p className="text-4xl font-black mb-1">84.2%</p>
          <p className="text-sm text-slate-500 font-medium mb-4">Avg. Security Resilience</p>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[84%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>

        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-2xl">
              <ExclamationCircleIcon className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-bold">Unmitigated Risks</h3>
          </div>
          <p className="text-4xl font-black mb-1">12</p>
          <p className="text-sm text-slate-500 font-medium mb-4">High-impact vulnerabilities</p>
          <div className="flex gap-1">
            {[1,1,1,1,0,0,0,0,0,0].map((v, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${v ? 'bg-amber-500' : 'bg-slate-800'}`}></div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-bold">Automated Blocks</h3>
          </div>
          <p className="text-4xl font-black mb-1">2,854</p>
          <p className="text-sm text-slate-500 font-medium mb-4">Threats neutralized (24h)</p>
          <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
            ↑ 14% from yesterday
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
