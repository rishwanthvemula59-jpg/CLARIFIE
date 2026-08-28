import React, { useState } from 'react';
import { Send, Bot, User, ShieldAlert, ShieldCheck, AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import axiosClient from '../api/axiosClient';

export const GuardianChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm Guardian Mode, Clarifie's real-time scam triage assistant. Describe any suspicious phone call, text, email, or offer you just encountered — no file upload required. I will provide an immediate fraud risk read and advice.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(null);

  // Helper to validate input locally before calling API
  const checkLocalInvalidInput = (text) => {
    if (!text || text.trim().length < 3) return "Input is too short. Please describe a full scenario (e.g. 'A caller claimed my bank account was blocked').";
    const trimmed = text.trim();
    if (/^(.)\1+$/.test(trimmed)) return "Invalid input: Repeated single character pattern detected. Please enter a valid sentence.";
    const vowels = trimmed.match(/[aeiouyAEIOUY]/g);
    if (!vowels && trimmed.length > 5 && !trimmed.includes(' ')) return "Invalid input: Unrecognizable word pattern or keyboard mash detected. Please enter clear incident details.";
    if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/.test(trimmed)) return "Invalid input: Pure numbers or symbols detected. Please describe the situation in words.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError(null);
    if (!input.trim() || loading) return;

    const userText = input.trim();

    // Check for local invalid input
    const localErr = checkLocalInvalidInput(userText);
    if (localErr) {
      setInputError(localErr);
      const userMsg = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const aiErrMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        riskLevel: 'invalid',
        redFlags: ['Invalid or unrecognizable input format'],
        advice: localErr,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, userMsg, aiErrMsg]);
      setInput('');
      return;
    }

    setInput('');

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axiosClient.post('/guardian/check', { description: userText });
      const { riskLevel, redFlags, advice, message } = res.data;

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        riskLevel: riskLevel || 'medium',
        redFlags: redFlags || [],
        advice: advice || message || 'Please describe a valid scenario.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errData = error.response?.data;
      const aiMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        riskLevel: 'invalid',
        redFlags: errData?.redFlags || ['Unclear or nonsensical text input'],
        advice: errData?.message || errData?.advice || 'Invalid input detected. Please describe a valid incident (e.g. "Received a text claiming my account was locked with a link").',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level) => {
    if (level === 'invalid') {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold">
          <XCircle className="w-3.5 h-3.5" />
          <span>INVALID INPUT DETECTED</span>
        </span>
      );
    }
    if (level === 'high') {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HIGH FRAUD RISK</span>
        </span>
      );
    }
    if (level === 'medium') {
      return (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>SUSPICIOUS / MEDIUM RISK</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>LOW RISK</span>
      </span>
    );
  };

  return (
    <div className="glass-card rounded-3xl border border-white/10 flex flex-col h-[640px] overflow-hidden shadow-2xl bg-black">
      
      {/* Chat Window Header */}
      <div className="p-4 border-b border-white/10 bg-zinc-950/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-heading font-bold text-sm text-white">Guardian Mode Triage</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-400">Real-time scam assessment & input validation engine</p>
          </div>
        </div>
        <button
          onClick={() => {
            setMessages([messages[0]]);
            setInputError(null);
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-xs flex items-center space-x-1.5 border border-white/10"
          title="Clear chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/80">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : msg.riskLevel === 'invalid'
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                  : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : msg.riskLevel === 'invalid' ? <XCircle className="w-4 h-4 text-rose-400" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-xl rounded-2xl p-4 text-sm ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                : msg.riskLevel === 'invalid'
                ? 'bg-rose-950/30 border border-rose-500/30 text-rose-200 rounded-tl-none space-y-3'
                : 'bg-zinc-900/90 border border-white/10 text-slate-200 rounded-tl-none space-y-3'
            }`}>
              
              {/* If plain text */}
              {msg.text && <p className="leading-relaxed">{msg.text}</p>}

              {/* If AI Triage / Invalid Result */}
              {msg.riskLevel && (
                <>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-xs font-mono text-slate-400 font-bold">TRIAGE ASSESSMENT</span>
                    {getRiskBadge(msg.riskLevel)}
                  </div>

                  {msg.redFlags && msg.redFlags.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        {msg.riskLevel === 'invalid' ? 'VALIDATION ERROR:' : 'OBSERVED THREAT INDICATORS:'}
                      </p>
                      <ul className="space-y-1">
                        {msg.redFlags.map((flag, idx) => (
                          <li key={idx} className="text-xs flex items-start space-x-2">
                            <span className={msg.riskLevel === 'invalid' ? 'text-rose-400' : 'text-amber-400'}>•</span>
                            <span className="leading-tight">{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.advice && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed font-medium ${
                      msg.riskLevel === 'invalid'
                        ? 'bg-rose-900/30 border-rose-500/40 text-rose-200'
                        : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                    }`}>
                      <p className="font-bold uppercase tracking-wider text-[10px] mb-1 font-mono">RECOMMENDED ACTION:</p>
                      <p>{msg.advice}</p>
                    </div>
                  )}
                </>
              )}

              <p className="text-[10px] font-mono text-slate-500 text-right">{msg.timestamp}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-slate-400 text-xs font-mono">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-spin">
              <Bot className="w-4 h-4" />
            </div>
            <span className="animate-pulse">Guardian AI evaluating situation & inspecting input parameters...</span>
          </div>
        )}
      </div>

      {/* Input Error Toast Bar */}
      {inputError && (
        <div className="px-4 py-2 bg-rose-950/80 border-t border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{inputError}</span>
          </div>
          <button onClick={() => setInputError(null)} className="text-rose-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-zinc-950/90 flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (inputError) setInputError(null);
          }}
          placeholder="Describe your call, text, or offer (e.g. 'A caller requested OTP for bank transfer')..."
          className="flex-1 bg-black border border-white/15 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
        >
          <span>Check</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
