
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  MagnifyingGlassIcon, 
  BellIcon,
  CpuChipIcon,
  VideoCameraIcon,
  MoonIcon,
  SunIcon,
  CommandLineIcon,
  SparklesIcon,
  SwatchIcon,
  MagnifyingGlassCircleIcon,
  ArrowRightIcon,
  ShieldExclamationIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import Awareness from './pages/Awareness';
import VideoLab from './pages/VideoLab';
import ChatBot from './components/ChatBot';

type Page = 'home' | 'dashboard' | 'analyzer' | 'awareness' | 'videolab';
type Theme = 'cyber-dark' | 'glass-frost' | 'terminal' | 'pro-light';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>('cyber-dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const navigation = [
    { id: 'dashboard', name: 'Command Center', icon: CpuChipIcon, tag: 'ANALYTICS' },
    { id: 'analyzer', name: 'Intelligence Lab', icon: MagnifyingGlassIcon, tag: 'THREAT_INTEL' },
    { id: 'videolab', name: 'Forensic Suite', icon: VideoCameraIcon, tag: 'VIDEO_AUDIT' },
    { id: 'awareness', name: 'Security Academy', icon: AcademicCapIcon, tag: 'EDU_RESILIENCE' },
  ];

  const themes = [
    { id: 'cyber-dark', icon: MoonIcon, name: 'Cyber Dark' },
    { id: 'glass-frost', icon: SparklesIcon, name: 'Glass Frost' },
    { id: 'terminal', icon: CommandLineIcon, name: 'Terminal' },
    { id: 'pro-light', icon: SunIcon, name: 'Executive Light' },
  ];

  const HomePage = () => (
    <div className="max-w-7xl mx-auto py-20 px-8 space-y-32">
      {/* Premium Hero Section */}
      <section className="text-center relative py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[160px] rounded-full -z-10"
        />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 bg-slate-900/50 border border-slate-800 rounded-full text-cyan-400 text-[10px] font-black tracking-[0.4em] uppercase mb-10 backdrop-blur-xl"
        >
          <FingerPrintIcon className="w-4 h-4" />
          Neural Threat Detection Active
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10 text-white"
        >
          See the <span className="text-cyan-400">Invisible.</span><br />
          Defend the <span className="relative">
            Digital.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-cyan-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-12"
        >
          SafeClick is an enterprise-grade cybersecurity intelligence platform utilizing behavioral AI to neutralize advanced social engineering and multi-vector phishing.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button 
            onClick={() => setActivePage('analyzer')}
            className="group px-12 py-6 bg-cyan-500 text-slate-950 font-black rounded-3xl hover:bg-cyan-400 transition-all shadow-[0_20px_40px_rgba(6,182,212,0.2)] flex items-center justify-center gap-3 hover:scale-105"
          >
            INITIATE INTEL SCAN
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setActivePage('awareness')}
            className="px-12 py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-slate-800 transition-all border border-slate-800"
          >
            ACADEMY ACCESS
          </button>
        </motion.div>
      </section>

      {/* Real-time Intel Strip */}
      <section className="bg-slate-900/30 border-y border-slate-800/50 py-10 overflow-hidden backdrop-blur-md">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap px-10">
          {[
            { label: 'BEHAVIORAL_ANOMALY', val: 'DETECTED_PHISH_CHAIN_012', color: 'rose' },
            { label: 'DOMAIN_RECON', val: 'HOMOGRAPH_MAPPING_COMPLETE', color: 'cyan' },
            { label: 'LINGUISTIC_AUDIT', val: 'PSYCH_PRESSURE_FLAGGED', color: 'amber' },
            { label: 'VIDEO_FORENSIC', val: 'DEEPFAKE_PROBABILITY_98%', color: 'rose' },
            { label: 'GLOBAL_SYNC', val: 'ZERO_DAY_PATT_UPDATING', color: 'emerald' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-8 border-r border-slate-800/50 last:border-0">
              <span className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`}></span>
              <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">{item.label}</span>
              <span className="text-xs font-mono font-bold text-white tracking-tighter">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { 
            title: 'Cross-Channel Intel', 
            desc: 'Correlation engine that maps attack vectors across SMS, Email, and Meeting streams simultaneously.',
            icon: CpuChipIcon,
            metric: '8.4B EVENTS/DAY'
          },
          { 
            title: 'Psych-Trigger Analysis', 
            desc: 'Detects 42 unique psychological exploitation patterns including urgency, authority, and scarcity.',
            icon: ShieldExclamationIcon,
            metric: '99.9% PRECISION'
          },
          { 
            title: 'Forensic Video Suite', 
            desc: 'AI-driven meeting integrity verification using sub-frame artifact detection and voice biometrics.',
            icon: VideoCameraIcon,
            metric: 'MIL-SPEC AUDIT'
          }
        ].map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="cyber-card p-10 rounded-[3rem] group"
          >
            <div className="p-4 bg-cyan-500/5 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform">
              <f.icon className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">{f.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">{f.desc}</p>
            <div className="pt-6 border-t border-slate-800/50 flex justify-between items-center">
              <span className="text-[10px] font-black text-cyan-500/50 tracking-widest uppercase">{f.metric}</span>
              <ArrowRightIcon className="w-5 h-5 text-slate-700 group-hover:text-cyan-400 transition-colors" />
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Immersive Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="bg-slate-950/80 backdrop-blur-3xl border-r border-slate-800/40 flex flex-col z-[60] shadow-2xl relative"
      >
        <div className="p-8 flex items-center gap-4 cursor-pointer group" onClick={() => setActivePage('home')}>
          <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
            <ShieldCheckIcon className="w-8 h-8 text-slate-950" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-2xl font-black tracking-tighter text-white"
            >
              SAFE<span className="text-cyan-400">CLICK</span>
            </motion.span>
          )}
        </div>

        <nav className="flex-1 mt-12 px-6 space-y-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as Page)}
              className={`w-full flex items-center gap-5 p-5 rounded-[1.5rem] transition-all relative group ${
                activePage === item.id 
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-xl border border-cyan-500/10' 
                  : 'text-slate-500 hover:bg-slate-800/40 hover:text-white'
              }`}
            >
              <item.icon className={`w-7 h-7 flex-shrink-0 transition-transform group-hover:scale-110`} />
              {isSidebarOpen && (
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="font-black text-sm whitespace-nowrap">{item.name}</span>
                  <span className="text-[8px] font-black tracking-widest text-slate-600 group-hover:text-cyan-500 transition-colors">{item.tag}</span>
                </div>
              )}
              {activePage === item.id && (
                <motion.div layoutId="nav-pill" className="absolute left-0 w-1.5 h-8 bg-cyan-500 rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Global Settings & Theme */}
        <div className="p-6 border-t border-slate-800/40">
          <div className={`grid ${isSidebarOpen ? 'grid-cols-4' : 'grid-cols-1'} gap-2 mb-6`}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as Theme)}
                className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                  theme === t.id ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-600 hover:text-white'
                }`}
                title={t.name}
              >
                <t.icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          <div className={`flex items-center gap-4 p-4 rounded-[1.5rem] bg-slate-900/50 border border-slate-800 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-black border-2 border-cyan-500/20 shadow-inner">
              AZ
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black truncate text-white uppercase tracking-tighter">Agent Zero</p>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Master Defender</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-24 border-b border-slate-800/20 bg-slate-950/40 backdrop-blur-2xl flex items-center justify-between px-12 z-50">
          <div className="flex items-center gap-6">
            <button 
              className="p-3 text-slate-500 hover:text-white bg-slate-900 rounded-2xl border border-slate-800 transition-all hover:scale-105"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <SwatchIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">SafeClick Protocol</p>
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <span className="text-cyan-500">Core</span> / 
                <span className="text-slate-300">{activePage.toUpperCase()}</span>
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden xl:flex gap-6 items-center px-8 py-3 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Signal Integrity</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% SECURE</span>
              </div>
              <div className="w-px h-8 bg-slate-800"></div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Latency</span>
                <span className="text-xs font-mono text-cyan-500 font-bold">14ms</span>
              </div>
            </div>
            <button className="relative p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all group">
              <BellIcon className="w-6 h-6 group-hover:rotate-12" />
              <span className="absolute top-4 right-4 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-fixed">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activePage === 'home' && <HomePage />}
              {activePage === 'dashboard' && <Dashboard />}
              {activePage === 'analyzer' && <Analyzer />}
              {activePage === 'awareness' && <Awareness />}
              {activePage === 'videolab' && <VideoLab />}
            </motion.div>
          </AnimatePresence>
        </div>

        <ChatBot />
      </main>
    </div>
  );
};

export default App;
