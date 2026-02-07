
import React, { useState, useRef } from 'react';
import { 
  VideoCameraIcon, 
  ArrowPathIcon, 
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  ExclamationCircleIcon,
  CheckBadgeIcon,
  FingerPrintIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  SpeakerWaveIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { analyzeVideoForThreats } from '../geminiService';

interface ParsedReport {
  verdict: string;
  confidence: string;
  visual: string;
  psych: string;
  flags: string;
}

const VideoLab: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ParsedReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseReport = (raw: string): ParsedReport => {
    const extract = (tag: string) => {
      const match = raw.match(new RegExp(`\\[${tag}\\]:?\\s*(.*?)(?=\\s*\\[|$)`, 's'));
      return match ? match[1].trim() : 'Data Unavailable';
    };

    return {
      verdict: extract('VERDICT'),
      confidence: extract('CONFIDENCE'),
      visual: extract('VISUAL_INTEGRITY'),
      psych: extract('PSYCHOLOGICAL_ANALYSIS'),
      flags: extract('TECHNICAL_FLAGS')
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
      setReport(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const rawText = await analyzeVideoForThreats(base64Data, file.type);
        setReport(parseReport(rawText || ''));
        setIsAnalyzing(false);
      };
      
      reader.onerror = () => {
        setError("Source data corrupted.");
        setIsAnalyzing(false);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Intelligence scan failure. File constraints detected.");
      setIsAnalyzing(false);
    }
  };

  const getVerdictStyles = (verdict: string) => {
    const v = verdict.toUpperCase();
    if (v.includes('CRITICAL')) return { color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: ExclamationTriangleIcon, label: 'COMPROMISED' };
    if (v.includes('SUSPICIOUS')) return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: ExclamationCircleIcon, label: 'FLAGGED' };
    return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckBadgeIcon, label: 'VERIFIED' };
  };

  return (
    <div className="max-w-7xl mx-auto p-12 space-y-16 animate-in fade-in duration-1000">
      <header className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-[2rem]">
          <VideoCameraIcon className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter">Forensic Video Suite</h2>
        <p className="text-slate-500 text-lg font-medium leading-relaxed">
          Sub-frame artifact analysis and biometric speech auditing to identify AI-generated impersonation and deepfake synthesis.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Source Input */}
        <div className="cyber-card p-12 rounded-[4rem] flex flex-col items-center justify-center min-h-[550px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50 pointer-events-none"></div>
          
          {videoUrl ? (
            <div className="w-full space-y-10 relative z-10">
              <div className="relative group">
                <video src={videoUrl} controls className="w-full rounded-[2.5rem] border border-slate-800 bg-black shadow-2xl transition-all group-hover:border-cyan-500/30" />
                <div className="absolute top-4 left-4 p-2 bg-slate-950/80 backdrop-blur-md rounded-lg text-[8px] font-mono text-cyan-400 border border-cyan-500/20">RAW_SIGNAL_SYNC</div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  NEW SOURCE
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl shadow-[0_15px_30px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isAnalyzing ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <MagnifyingGlassIcon className="w-6 h-6" />}
                  {isAnalyzing ? 'RUNNING FORENSICS...' : 'EXECUTE FORENSIC AUDIT'}
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-96 border-2 border-dashed border-slate-800 rounded-[3.5rem] flex flex-col items-center justify-center gap-8 hover:border-cyan-500/40 hover:bg-cyan-500/5 cursor-pointer transition-all group"
            >
              <div className="p-8 bg-slate-900 rounded-[2.5rem] group-hover:scale-110 transition-transform shadow-inner">
                <CloudArrowUpIcon className="w-20 h-20 text-slate-700 group-hover:text-cyan-400" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-white font-black text-xl">Ingest Video Stream</p>
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">MP4 / MOV / WEBM • SECURE_SYNC</p>
              </div>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
        </div>

        {/* Forensic Intelligence */}
        <div className="cyber-card p-12 rounded-[4rem] flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-black text-white flex items-center gap-4">
              <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
              Forensic Report
            </h3>
            {report && (
              <span className="text-[10px] font-mono text-slate-600">AUDIT_REF: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar pr-2">
            {report ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                {/* Visual Status Verdict */}
                <div className={`p-10 rounded-[2.5rem] border ${getVerdictStyles(report.verdict).bg} ${getVerdictStyles(report.verdict).border} relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                    {React.createElement(getVerdictStyles(report.verdict).icon, { className: "w-32 h-32" })}
                  </div>
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Final Security Verdict</p>
                      <h4 className={`text-5xl font-black ${getVerdictStyles(report.verdict).color} tracking-tighter`}>{getVerdictStyles(report.verdict).label}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white">{report.confidence}</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Confidence Index</p>
                    </div>
                  </div>
                  <div className="mt-8 h-2 bg-slate-950 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: report.confidence }}
                      className={`h-full ${getVerdictStyles(report.verdict).color.replace('text-', 'bg-')}`}
                    />
                  </div>
                </div>

                {/* Analysis Modules */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 group hover:border-cyan-500/20 transition-all">
                    <h5 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-3">
                      <EyeIcon className="w-5 h-5" /> Sub-Frame Artifact Audit
                    </h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{report.visual}</p>
                  </div>

                  <div className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 group hover:border-emerald-500/20 transition-all">
                    <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-3">
                      <SpeakerWaveIcon className="w-5 h-5" /> Behavioral Speech Profile
                    </h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{report.psych}</p>
                  </div>

                  <div className="p-8 bg-slate-900/40 rounded-3xl border border-slate-800 group hover:border-rose-500/20 transition-all">
                    <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                      <CpuChipIcon className="w-5 h-5" /> Technical Flag Correlation
                    </h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{report.flags}</p>
                  </div>
                </div>
              </motion.div>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full gap-10">
                <div className="relative">
                  <ArrowPathIcon className="w-24 h-24 text-cyan-500/10 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FingerPrintIcon className="w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-xl font-black text-white tracking-widest uppercase">Deep Audit Processing</p>
                  <p className="text-xs text-slate-500 font-bold animate-pulse uppercase tracking-widest">Analyzing facial frequency artifacts & linguistic anomalies...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-8 opacity-40">
                <div className="p-8 bg-slate-900 rounded-full border border-slate-800">
                  <CpuChipIcon className="w-20 h-20 text-slate-700" />
                </div>
                <p className="text-sm font-bold max-w-[240px] leading-relaxed uppercase tracking-widest">Ingest a source file to initiate high-fidelity forensic analysis.</p>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-10 p-6 bg-rose-500/5 border border-rose-500/20 rounded-[1.5rem] text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-4">
              <ExclamationTriangleIcon className="w-6 h-6" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoLab;
