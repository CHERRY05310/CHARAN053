
import React from 'react';
import { 
  FireIcon, 
  ArrowUpRightIcon,
  BoltIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  CpuChipIcon,
  CircleStackIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts';

const timelineData = [
  { name: '08:00', threats: 12 },
  { name: '10:00', threats: 45 },
  { name: '12:00', threats: 28 },
  { name: '14:00', threats: 62 },
  { name: '16:00', threats: 34 },
  { name: '18:00', threats: 15 },
];

const riskVectorData = [
  { subject: 'PHISH', A: 120, B: 110 },
  { subject: 'VISH', A: 98, B: 130 },
  { subject: 'SMISH', A: 86, B: 130 },
  { subject: 'SOC_ENG', A: 99, B: 100 },
  { subject: 'DEEPFAKE', A: 85, B: 90 },
  { subject: 'CORP', A: 65, B: 85 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-700">
      {/* Dynamic Pulse Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Sentinel Shield', value: 'OPTIMAL', desc: '0 system bypasses', icon: ShieldCheckIcon, color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
          { label: 'Human Resilience', value: '88.4%', desc: 'Elite Defender Avg', icon: BoltIcon, color: 'text-cyan-400', bg: 'bg-cyan-500/5' },
          { label: 'Active Sensors', value: '14,204', desc: 'Nodes connected', icon: GlobeAltIcon, color: 'text-blue-400', bg: 'bg-blue-500/5' },
          { label: 'Risk Counter', value: '3,124', desc: '+12.4% weekly surge', icon: FireIcon, color: 'text-rose-400', bg: 'bg-rose-500/5' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -5 }}
            className="cyber-card p-8 rounded-[2.5rem] group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <ArrowUpRightIcon className="w-5 h-5 text-slate-700 group-hover:text-cyan-400" />
            </div>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</h3>
            <p className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</p>
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Behavioral Radar */}
        <div className="lg:col-span-1 cyber-card p-12 rounded-[3.5rem] flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <CpuChipIcon className="w-48 h-48" />
          </div>
          <div className="w-full text-left mb-10">
            <h2 className="text-xl font-black text-white">Threat Overlap Matrix</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Multi-vector risk correlation</p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskVectorData}>
                <PolarGrid stroke="#1e293b" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 900 }} />
                <Radar name="Internal" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.4} />
                <Radar name="Global" dataKey="B" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.05} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-8 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global_Net</span>
            </div>
          </div>
        </div>

        {/* Real-time Threat Pulse */}
        <div className="lg:col-span-2 cyber-card p-12 rounded-[3.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <CircleStackIcon className="w-64 h-64" />
          </div>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl font-black text-white">Intelligence Pulse</h2>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Neutralized Attack Timeline</p>
            </div>
            <div className="px-5 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-black rounded-xl animate-pulse">LIVE_FEED</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#334155" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 800 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                  itemStyle={{ color: '#22d3ee', fontWeight: 900 }}
                />
                <Area type="monotone" dataKey="threats" stroke="#22d3ee" strokeWidth={5} fillOpacity={1} fill="url(#colorThreat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Audit Log / Command History */}
      <div className="cyber-card p-12 rounded-[4rem]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-4">
            <ClockIcon className="w-8 h-8 text-cyan-500" />
            Neutralization History
          </h2>
          <button className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors">View Deep Logs →</button>
        </div>
        <div className="space-y-6">
          {[
            { tag: 'PHISH', msg: 'Sequential redirect chain blocked on regional subnet', time: '2m ago', score: 98, status: 'BLOCKED' },
            { tag: 'PSYCH', msg: 'High-pressure linguistic pattern flagged in CEO impersonation', time: '14m ago', score: 82, status: 'ISOLATED' },
            { tag: 'FORENSIC', msg: 'Deepfake artifact detection triggered on live virtual call', time: '1h ago', score: 94, status: 'ALERTED' },
            { tag: 'RECON', msg: 'Port scan correlation matching known smishing campaigns', time: '3h ago', score: 45, status: 'MONITOR' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-8 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-all cursor-pointer group">
              <div className="w-20 flex-shrink-0">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border ${
                  item.score > 90 ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                }`}>
                  {item.tag}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{item.msg}</p>
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{item.time}</p>
              </div>
              <div className="text-right flex items-center gap-10">
                <div>
                  <p className="text-2xl font-black text-white">{item.score}%</p>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Conf.</p>
                </div>
                <div className="w-32">
                  <span className={`text-[10px] font-black px-5 py-2 rounded-2xl border flex items-center justify-center ${
                    item.status === 'BLOCKED' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                    item.status === 'ALERTED' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' :
                    'text-amber-500 border-amber-500/20 bg-amber-500/5'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
