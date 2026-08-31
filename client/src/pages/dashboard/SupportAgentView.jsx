import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  Image as ImageIcon,
  Send,
  FileText,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';

export const SupportAgentView = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [inputText, setInputText] = useState('');

  const MOCK_TICKETS = [
    {
      id: 'TICK-4412',
      customer: 'Sarah Jenkins',
      product: 'UltraLight Trail Running Shoe (SKU-APX-4420)',
      channel: 'chat',
      summary: 'Customer inquiring about color variation between catalog photo and received item.',
      policyCitation: 'Section 4.1 Return Policy — Color Shade Discrepancy Coverage',
      suggestedAction: 'Issue prepaid return label with instant exchange option',
      crossSurfaceEvidence: 'Linked to Return #RET-98421: 14 other customers reported same cobalt shade variance.',
      status: 'open'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Surface Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-black to-black border border-cyan-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Surface 2 • Multimodal CX Support Agent</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            Multimodal CX Agent & Policy RAG
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Multimodal intake (Text + Photo + Voice Notes) cross-referenced against store return policies and live Product Truth Graph evidence for automated resolution drafting.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-cyan-400">1.2s</span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">Avg RAG Latency</p>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Ticket & Intake Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            
            {/* Customer Ticket Context */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">Ticket #TICK-4412</span>
                <h2 className="text-lg font-extrabold text-white">Sarah Jenkins • UltraLight Trail Running Shoe</h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                Auto-Resolution Ready
              </span>
            </div>

            {/* Multimodal Input Selector */}
            <div className="flex items-center space-x-3 p-1 bg-black/60 rounded-xl border border-white/10 w-fit text-xs font-mono">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === 'chat' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Text / Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === 'voice' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Note (Whisper)</span>
              </button>
            </div>

            {/* Simulated Chat History */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-mono">
                  <span>Customer (Sarah Jenkins)</span>
                  <span>10:42 AM</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">
                  "Hi, I received my trail shoes today but the blue color is much brighter than shown on your site image. I would like to exchange them for the black pair."
                </p>
              </div>

              {/* Cross-Surface Truth Indicator */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Truth Graph Evidence Cross-Link</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {MOCK_TICKETS[0].crossSurfaceEvidence}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Policy RAG & AI Resolution Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Claude 3.7 Resolution Draft</span>
              <span className="text-cyan-400 text-xs font-normal">Policy RAG Match</span>
            </h2>

            {/* Policy Citation */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Policy Citation</span>
              </div>
              <p className="text-slate-300 font-medium">
                {MOCK_TICKETS[0].policyCitation}
              </p>
            </div>

            {/* Suggested Resolution Draft */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-mono font-bold">
                <span>Suggested Action</span>
                <span>Auto-Approve Eligible</span>
              </div>
              <p className="text-slate-200 font-bold">
                {MOCK_TICKETS[0].suggestedAction}
              </p>
              <button className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg">
                Approve & Send Customer Resolution
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupportAgentView;
