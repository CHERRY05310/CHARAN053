
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleBottomCenterTextIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CommandLineIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { startSecurityChat } from '../geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'ai';
  text: string;
  isStreaming?: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'SafeClick SOC Analyst Online. Systems synchronized. Upload telemetry or describe suspicious activity for immediate forensic audit.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = startSecurityChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customMsg?: string) => {
    const userMsg = customMsg || input;
    if (!userMsg.trim() || !chatRef.current || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Placeholder for AI streaming
    setMessages(prev => [...prev, { role: 'ai', text: '', isStreaming: true }]);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text;
        if (textChunk) {
          fullText += textChunk;
          setMessages(prev => {
            const newMsgs = [...prev];
            const lastIdx = newMsgs.length - 1;
            if (newMsgs[lastIdx].role === 'ai') {
              newMsgs[lastIdx] = { role: 'ai', text: fullText, isStreaming: true };
            }
            return newMsgs;
          });
        }
      }
      
      // Final update to remove streaming flag
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastIdx = newMsgs.length - 1;
        newMsgs[lastIdx] = { role: 'ai', text: fullText, isStreaming: false };
        return newMsgs;
      });

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev.slice(0, -1), { role: 'ai', text: 'CRITICAL_ERROR: AI core uplink severed. Check network protocols.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickAction = ({ icon: Icon, label, action }: { icon: any, label: string, action: string }) => (
    <button 
      onClick={() => handleSend(action)}
      className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-cyan-500/10 border border-slate-700 hover:border-cyan-500/30 rounded-lg text-[10px] font-black text-slate-400 hover:text-cyan-400 transition-all uppercase tracking-widest"
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );

  const formatMessage = (text: string) => {
    // Simple parser for the structured blocks defined in geminiService
    const sections = text.split('###').filter(s => s.trim());
    if (sections.length < 2) return <p className="whitespace-pre-wrap leading-relaxed">{text}</p>;

    return (
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const lines = section.trim().split('\n');
          const title = lines[0].replace(/\[|\]/g, '').trim();
          const content = lines.slice(1).join('\n').trim();

          return (
            <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 overflow-hidden">
              <h4 className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <CommandLineIcon className="w-3 h-3" /> {title}
              </h4>
              <div className="text-[11px] text-slate-300 whitespace-pre-wrap font-medium leading-relaxed">
                {content}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[400px] h-[600px] bg-slate-950/90 backdrop-blur-3xl border border-slate-800/50 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden mb-4 cyber-glow"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                  <CpuChipIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tighter">SafeClick Oracle</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Analyst Tier III Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-4 rounded-3xl text-sm ${
                    m.role === 'user' 
                    ? 'bg-cyan-500 text-slate-950 font-bold rounded-br-none shadow-lg' 
                    : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-bl-none shadow-inner'
                  }`}>
                    {m.role === 'ai' ? formatMessage(m.text) : m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1].text === '' && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl rounded-bl-none flex items-center gap-3">
                    {/* Fixed: Added ArrowPathIcon to the imports from @heroicons/react/24/solid */}
                    <ArrowPathIcon className="w-4 h-4 text-cyan-500 animate-spin" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Analyzing Telemetry...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 bg-slate-900/30 border-t border-slate-800 flex flex-wrap gap-2">
              <QuickAction icon={MagnifyingGlassIcon} label="Scan Link" action="Scan this URL for social engineering patterns: [PASTE_URL]" />
              <QuickAction icon={ShieldCheckIcon} label="Header Audit" action="Audit these email headers for spoofing: [PASTE_HEADERS]" />
              <QuickAction icon={ExclamationTriangleIcon} label="Check SMS" action="Analyze this text message for vishing indicators: [PASTE_SMS]" />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/80">
              <div className="flex gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 focus-within:border-cyan-500/50 transition-all shadow-inner">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Paste URL, Headers, or suspicious text..."
                  className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-slate-600 font-medium"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-cyan-500 text-slate-950 p-2 rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-30 shadow-lg"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_30px_rgba(6,182,212,0.3)] transition-all group relative overflow-hidden ${
          isOpen ? 'bg-slate-900 text-white' : 'bg-cyan-500 text-slate-950'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <XMarkIcon className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.button>
    </div>
  );
};

export default ChatBot;
