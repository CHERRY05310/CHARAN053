
import React, { useState } from 'react';
import { 
  RocketLaunchIcon, 
  EnvelopeIcon, 
  ComputerDesktopIcon,
  DocumentDuplicateIcon,
  PlayCircleIcon,
  StopCircleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const Simulation: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates'>('campaigns');

  const campaigns = [
    { id: 1, name: 'Q1 Compliance Test', targets: 450, status: 'Completed', success: '92%' },
    { id: 2, name: 'Urgent IT Alert Mock', targets: 120, status: 'Running', success: '15%' },
    { id: 3, name: 'Gift Card Baiting', targets: 300, status: 'Scheduled', success: '-' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black">Phishing Simulation Engine</h2>
          <p className="text-slate-500">Train your team with safe, controlled social engineering attacks.</p>
        </div>
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all shadow-xl ${
            isRunning 
            ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20' 
            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
          }`}
        >
          {isRunning ? (
            <><StopCircleIcon className="w-6 h-6" /> ABORT ALL OPERATIONS</>
          ) : (
            <><PlayCircleIcon className="w-6 h-6" /> LAUNCH NEW CAMPAIGN</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="flex border-b border-slate-800">
              <button 
                onClick={() => setActiveTab('campaigns')}
                className={`flex-1 p-6 font-bold text-sm transition-all ${activeTab === 'campaigns' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:bg-slate-800/50'}`}
              >
                Active Campaigns
              </button>
              <button 
                onClick={() => setActiveTab('templates')}
                className={`flex-1 p-6 font-bold text-sm transition-all ${activeTab === 'templates' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:bg-slate-800/50'}`}
              >
                Template Library
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'campaigns' ? (
                <div className="space-y-4">
                  {campaigns.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${c.status === 'Running' ? 'bg-cyan-500/10 text-cyan-500 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                          <EnvelopeIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold">{c.name}</p>
                          <p className="text-xs text-slate-500">{c.targets} Targets • {c.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{c.success}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Resilience</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'O365 Password Reset', risk: 'High' },
                    { name: 'Unpaid Invoice Attachment', risk: 'Critical' },
                    { name: 'Company HR Policy Update', risk: 'Medium' },
                    { name: 'IT Security Audit', risk: 'High' },
                  ].map((t, i) => (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <DocumentDuplicateIcon className="w-8 h-8 text-slate-700 group-hover:text-cyan-400" />
                        <span className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-800 ${t.risk === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`}>{t.risk}</span>
                      </div>
                      <p className="font-bold text-sm">{t.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 cyber-glow">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ComputerDesktopIcon className="w-6 h-6 text-cyan-400" />
              Live Simulation Stats
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Emails Sent</span>
                <span className="font-mono font-bold">14,204</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Total Clicks</span>
                <span className="font-mono font-bold text-rose-500">1,402</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Credential Leak</span>
                <span className="font-mono font-bold text-rose-600">32</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Reported</span>
                <span className="font-mono font-bold text-emerald-500">8,540</span>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Simulation Accuracy</span>
                  <span className="text-emerald-400">Optimal</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-emerald-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
            <h4 className="font-bold text-cyan-400 mb-2">Pro Tip</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use "Multi-stage Phishing" to simulate sophisticated spear-phishing campaigns where the first contact is just a harmless greeting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
