
import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon, 
  DocumentTextIcon, 
  LinkIcon, 
  ChatBubbleLeftRightIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  SparklesIcon,
  BeakerIcon,
  CpuChipIcon,
  FingerPrintIcon,
  IdentificationIcon,
  BugAntIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { analyzeThreat, searchThreatIntelligence } from '../geminiService';
import { ThreatAnalysis } from '../types';

const Analyzer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'url' | 'email' | 'sms' | 'intelligence'>('url');
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ThreatAnalysis | null>(null);
  const [intelResult, setIntelResult] = useState<{ text: string, sources: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setIntelResult(null);
    setError(null);
    
    try {
      if (activeTab === 'intelligence') {
        const intel = await searchThreatIntelligence(input);
        setIntelResult(intel);
      } else {
        const analysis = await analyzeThreat(activeTab, input);
        setResult(analysis);
      }
    } catch (err: any) {
      setError(err.message || "Intelligence Link Failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tabs = [
    { id: 'url', name: 'Domain Recon', icon: LinkIcon, desc: 'Redirect & cloaking detection' },
    { id: 'email', name: 'Linguistic Audit', icon: DocumentTextIcon, desc: 'Behavioral manipulation scan' },
    { id: 'sms', name: 'Mobile Guard', icon: ChatBubbleLeftRightIcon, desc: 'Smishing pattern recognition' },
    { id: 'intelligence', name: 'Grounding Intel', icon: GlobeAltIcon, desc: 'Real-time global search' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-12 space-y-16">
      <header className="text-center max-w-2xl mx-auto space-y-6">
        <div className="inline-flex p-3 bg-cyan-500/10 rounded-3xl mb-4">
          <BeakerIcon className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter">Deep Intelligence Lab</h2>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          Neutralizing advanced social engineering with multi-stage behavioral analysis and cross-channel threat correlation.
        </p>
      </header>

      {/* Main Console */}
      <div className="cyber-card p-12 rounded-[3.5rem] space-y-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
          <CpuChipIcon className="w-64 h-64 text-cyan-500" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setResult(null);
                setIntelResult(null);
                setInput('');
              }}
              className={`p-6 rounded-[2rem] border transition-all text-left flex flex-col gap-3 ${
                activeTab === tab.id 
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.2)]' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <tab.icon className={`w-8 h-8 ${activeTab === tab.id ? 'text-slate-950' : 'text-slate-400'}`} />
              <div>
                <p className="font-black text-sm uppercase tracking-tighter">{tab.name}</p>
                <p className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-slate-800' : 'text-slate-600'}`}>{tab.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Input raw ${activeTab} content for behavioral analysis...`}
              className="w-full h-80 bg-slate-950/80 border border-slate-800 rounded-[2.5rem] p-10 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-sm leading-relaxed"
            />
            <div className="absolute bottom-8 right-8 flex gap-4">
              <span className="text-[10px] font-mono text-slate-600 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800">UTF8_SAFE</span>
              <span className="text-[10px] font-mono text-slate-600 px-4 py-1.5 bg-slate-900 rounded-full border border-slate-800">ANALYSIS_READY</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !input.trim()}
              className="group relative flex items-center gap-6 px-20 py-8 bg-cyan-500 text-slate-950 font-black rounded-[2.5rem] transition-all hover:bg-cyan-400 hover:scale-105 shadow-[0_20px_50px_rgba(6,182,212,0.3)] disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <ArrowPathIcon className="w-8 h-8 animate-spin" />
                  CORRELATING SIGNALS...
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-8 h-8 transition-transform group-hover:rotate-12" />
                  EXECUTE INTELLIGENCE AUDIT
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Result Panels */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-12 duration-700">
          {/* Risk Gauge Panel */}
          <div className="cyber-card p-12 rounded-[3.5rem] flex flex-col items-center text-center">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-12">Composite Risk Engine</h3>
            
            <div className="relative w-64 h-64 mb-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="128" cy="128" r="115" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-slate-900" />
                <motion.circle
                  initial={{ strokeDashoffset: 722 }}
                  animate={{ strokeDashoffset: 722 - (722 * result.riskScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="128" cy="128" r="115" stroke="currentColor" strokeWidth="20" fill="transparent"
                  strokeDasharray={722}
                  className={`transition-all ${
                    result.riskScore > 80 ? 'text-rose-500' : result.riskScore > 40 ? 'text-amber-500' : 'text-emerald-500'
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-7xl font-black text-white"
                >
                  {result.riskScore}
                </motion.span>
                <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">PERCENT_RISK</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
                <p className="text-2xl font-black text-white">{result.confidenceLevel}%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">AI_Confidence</p>
              </div>
              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
                <p className="text-2xl font-black text-white">{result.behavioralRiskIndex}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Psych_Index</p>
              </div>
            </div>
          </div>

          {/* Detailed Intelligence Breakdown */}
          <div className="lg:col-span-2 space-y-10">
            <div className="cyber-card p-12 rounded-[3.5rem]">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-xs font-black text-cyan-500 uppercase tracking-widest mb-2">Classification Result</h3>
                  <h4 className="text-3xl font-black text-white">{result.category}</h4>
                </div>
                <div className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                  result.threatLevel === 'Critical' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                }`}>
                  {result.threatLevel} STATUS
                </div>
              </div>
              
              <p className="text-slate-400 text-lg leading-relaxed font-medium mb-12">{result.explanation}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                    <IdentificationIcon className="w-5 h-5 text-rose-500" /> Linguistic Patterns
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.linguisticManipulation?.map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 text-rose-400 text-[10px] font-black rounded-xl uppercase tracking-widest">{item}</span>
                    ))}
                    {result.linguisticManipulation.length === 0 && <span className="text-xs text-slate-600 font-bold">NONE_DETECTED</span>}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                    <FingerPrintIcon className="w-5 h-5 text-cyan-400" /> Psychological Triggers
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.psychologicalTriggers?.map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 text-cyan-400 text-[10px] font-black rounded-xl uppercase tracking-widest">{item}</span>
                    ))}
                    {result.psychologicalTriggers.length === 0 && <span className="text-xs text-slate-600 font-bold">NONE_DETECTED</span>}
                  </div>
                </div>

                {/* Technical Indicators Section (Upgraded for Homograph/Typosquatting visibility) */}
                <div className="md:col-span-2 space-y-6 pt-4 border-t border-slate-800/50">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                    <BugAntIcon className="w-5 h-5 text-amber-500" /> Technical Anomalies & Recon
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.indicators?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group hover:border-amber-500/30 transition-all">
                        <div className={`w-2 h-2 rounded-full ${item.toLowerCase().includes('homograph') || item.toLowerCase().includes('typo') ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-amber-500'}`}></div>
                        <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                    {(!result.indicators || result.indicators.length === 0) && <span className="text-xs text-slate-600 font-bold">CLEAN_FORENSICS</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-[3rem] flex items-start gap-8 group">
              <div className="p-4 bg-emerald-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                <CheckCircleIcon className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-emerald-400 mb-2">Defensive Protocol Recommended</h3>
                <p className="text-emerald-50/70 font-medium leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Grounding Results */}
      {intelResult && (
        <div className="cyber-card p-16 rounded-[4rem] relative overflow-hidden animate-in zoom-in-95 duration-1000">
          <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
            <GlobeAltIcon className="w-96 h-96" />
          </div>
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-black text-white flex items-center gap-5">
              <GlobeAltIcon className="w-10 h-10 text-cyan-500" />
              Web Intelligence Sync
            </h3>
            <span className="px-5 py-2 bg-cyan-500 text-slate-950 text-xs font-black rounded-xl shadow-lg">DATA_VERIFIED</span>
          </div>
          <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed font-medium text-lg">
            <p className="whitespace-pre-wrap">{intelResult.text}</p>
          </div>
          {intelResult.sources.length > 0 && (
            <div className="mt-16 pt-16 border-t border-slate-800/50">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Grounding Verification Map</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {intelResult.sources.map((chunk: any, i: number) => {
                   const url = chunk.web?.uri || chunk.maps?.uri;
                   const title = chunk.web?.title || chunk.maps?.title || "Verification Link";
                   if (!url) return null;
                   return (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-cyan-500 transition-all group">
                      <div className="p-2 bg-slate-950 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                        <GlobeAltIcon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 truncate">{title}</span>
                    </a>
                   );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Analyzer;
