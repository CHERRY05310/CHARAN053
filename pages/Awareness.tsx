
import React, { useState } from 'react';
import { 
  PlayIcon, 
  LockClosedIcon, 
  SparklesIcon, 
  TrophyIcon,
  CircleStackIcon,
  AcademicCapIcon,
  FireIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  BoltIcon,
  DocumentTextIcon,
  EyeIcon,
  LightBulbIcon
} from '@heroicons/react/24/solid';

const attackLibrary = [
  {
    category: 'Phishing Attacks',
    items: [
      { id: 'p1', title: 'Spear Phishing', difficulty: 'Advanced', xp: 450, desc: 'Highly targeted attacks involving deep research into the victim\'s personal profile.' },
      { id: 'p2', title: 'Whaling', difficulty: 'Critical', xp: 1200, desc: 'Social engineering aimed at high-level executives (C-Suite) to steal trade secrets.' },
      { id: 'p3', title: 'Clone Phishing', difficulty: 'Sophisticated', xp: 600, desc: 'Replicating a legitimate, previously delivered email with malicious link replacements.' },
    ]
  },
  {
    category: 'Messaging Risks',
    items: [
      { id: 'm1', title: 'Smishing', difficulty: 'Basic', xp: 200, desc: 'Fraudulent SMS messages containing high-pressure links or phone numbers.' },
      { id: 'm2', title: 'Vishing', difficulty: 'Advanced', xp: 800, desc: 'Voice phishing using AI-voice cloning or social manipulation over phone calls.' },
      { id: 'm3', title: 'QR Phishing', difficulty: 'Sophisticated', xp: 550, desc: 'Malicious QR codes placed in physical public locations to bypass visual security scanners.' },
    ]
  },
  {
    category: 'Corporate Attacks',
    items: [
      { id: 'c1', title: 'BEC (CEO Fraud)', difficulty: 'Critical', xp: 1500, desc: 'Impersonating the CEO to authorize urgent fraudulent wire transfers.' },
      { id: 'c2', title: 'Invoice Fraud', difficulty: 'Advanced', xp: 900, desc: 'Compromising vendor accounts to redirect legitimate payment streams.' },
    ]
  }
];

const Awareness: React.FC = () => {
  const [selectedAttack, setSelectedAttack] = useState<any>(null);

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-16">
      <header className="flex flex-col md:flex-row items-center justify-between gap-12 cyber-card p-12 rounded-[3.5rem] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full"></div>
        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            Elite Training Path
          </div>
          <h2 className="text-5xl font-black text-white tracking-tight leading-none">Security Academy</h2>
          <p className="text-slate-400 text-lg font-medium max-w-xl">
            Neutralizing social engineering by transforming human psychology into a hardened security firewall.
          </p>
          <div className="flex gap-10 pt-4">
            <div><p className="text-3xl font-black text-white">35</p><p className="text-[10px] font-bold text-slate-500 uppercase">Academy Rank</p></div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div><p className="text-3xl font-black text-cyan-400">12,450</p><p className="text-[10px] font-bold text-slate-500 uppercase">Total XP</p></div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div><p className="text-3xl font-black text-emerald-400">8</p><p className="text-[10px] font-bold text-slate-500 uppercase">Certifications</p></div>
          </div>
        </div>
        <div className="w-56 h-56 rounded-full border-8 border-slate-800 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-8 border-cyan-500 border-t-transparent animate-spin-slow"></div>
          <TrophyIcon className="w-24 h-24 text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
        </div>
      </header>

      {/* Attack Library Section */}
      <section className="space-y-12">
        {attackLibrary.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
              {cat.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.items.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedAttack(item)}
                  className="cyber-card p-8 rounded-[2.5rem] group hover:border-cyan-500/40 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-slate-900 rounded-2xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                      <AcademicCapIcon className="w-6 h-6" />
                    </div>
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-md border ${
                      item.difficulty === 'Critical' ? 'text-rose-500 border-rose-500/20' : 'text-cyan-400 border-cyan-500/20'
                    }`}>
                      {item.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-xl font-black mb-2 text-white">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <BoltIcon className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-black text-slate-300">+{item.xp} XP</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
                        <DocumentTextIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors">
                        <PlayIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Certification Section */}
      <section className="cyber-card p-12 rounded-[3.5rem] bg-gradient-to-br from-slate-900/60 to-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-white">Next Certification</h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Complete the "Deepfake Reconnaissance" module to earn your Analyst Tier II badge and unlock advanced video analysis tools.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black uppercase text-slate-600 tracking-widest">
                <span>Course Completion</span>
                <span>85%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"></div>
              </div>
            </div>
            <button className="px-10 py-5 bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-xl hover:bg-cyan-400 transition-all">
              CONTINUE LEARNING
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`aspect-square rounded-3xl border-2 flex items-center justify-center ${i < 5 ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-500' : 'border-slate-800 bg-slate-900/40 text-slate-700 opacity-30'}`}>
                <CheckBadgeIcon className="w-10 h-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modal (Mocked) */}
      {selectedAttack && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-slate-950/80">
          <div className="cyber-card w-full max-w-4xl p-12 rounded-[4rem] relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedAttack(null)} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors">
              <BoltIcon className="w-8 h-8 rotate-45" />
            </button>
            <div className="space-y-10">
              <div className="space-y-2">
                <h3 className="text-5xl font-black text-white tracking-tighter">{selectedAttack.title} Intelligence</h3>
                <p className="text-cyan-400 font-black tracking-widest text-xs uppercase">Security Audit Log // {selectedAttack.id.toUpperCase()}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-lg font-black text-white flex items-center gap-3">
                    <EyeIcon className="w-6 h-6 text-rose-500" /> Detection Signs
                  </h4>
                  <ul className="space-y-3">
                    {['Inconsistent communication history', 'High-pressure scarcity triggers', 'Domain homograph deviations'].map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2"></span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-lg font-black text-white flex items-center gap-3">
                    <LightBulbIcon className="w-6 h-6 text-emerald-500" /> Prevention Protocol
                  </h4>
                  <ul className="space-y-3">
                    {['Verify through independent channels', 'Never click embedded tokens', 'Report to SafeClick Global Index'].map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-slate-900/60 rounded-[2rem] border border-slate-800">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Real-World Correlation</h4>
                <p className="text-sm text-slate-400 italic font-medium leading-relaxed">
                  "In 2024, a major financial institution lost $25M when an employee authorized a transfer after a whaling attack impersonating the Regional VP during a coordinated holiday period."
                </p>
              </div>

              <button className="w-full py-6 bg-cyan-500 text-slate-950 font-black rounded-3xl shadow-2xl hover:bg-cyan-400 transition-all">
                START INTERACTIVE SIMULATION (+{selectedAttack.xp} XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awareness;
