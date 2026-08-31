import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  ImageIcon,
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
    <div className="space-y-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17]">
      
      {/* Surface Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D94A26]/10 border border-[#D94A26]/30 text-xs font-mono text-[#D94A26] font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Surface 2 • Multimodal CX Support Agent</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1C1A17] font-heading">
            Multimodal CX Agent & Policy RAG
          </h1>
          <p className="text-sm text-[#6B665E] font-medium leading-relaxed">
            Multimodal intake (Text + Photo + Voice Notes) cross-referenced against store return policies and live Product Truth Graph evidence for automated resolution drafting.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-[#D94A26]">1.2s</span>
          <p className="text-[10px] text-[#6B665E] font-mono mt-0.5 uppercase font-bold">Avg RAG Latency</p>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Ticket & Intake Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-6">
            
            {/* Customer Ticket Context */}
            <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-4">
              <div>
                <span className="text-xs font-mono text-[#D94A26] font-bold">Ticket #TICK-4412</span>
                <h2 className="text-lg font-extrabold text-[#1C1A17]">Sarah Jenkins • UltraLight Trail Running Shoe</h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 text-[#2D6A4F] text-xs font-mono font-bold">
                Auto-Resolution Ready
              </span>
            </div>

            {/* Multimodal Input Selector */}
            <div className="flex items-center space-x-3 p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE5DD] w-fit text-xs font-mono">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === 'chat' ? 'bg-[#D94A26] text-white font-bold' : 'text-[#6B665E] hover:text-[#1C1A17]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Text / Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-all ${
                  activeTab === 'voice' ? 'bg-[#D94A26] text-white font-bold' : 'text-[#6B665E] hover:text-[#1C1A17]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Note (Whisper)</span>
              </button>
            </div>

            {/* Simulated Chat History */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#6B665E] font-mono">
                  <span>Customer (Sarah Jenkins)</span>
                  <span>10:42 AM</span>
                </div>
                <p className="text-[#1C1A17] leading-relaxed font-medium">
                  "Hi, I received my trail shoes today but the blue color is much brighter than shown on your site image. I would like to exchange them for the black pair."
                </p>
              </div>

              {/* Cross-Surface Truth Indicator */}
              <div className="p-4 rounded-2xl bg-[#FFF5F3] border border-[#D94A26]/30 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-[#D94A26] font-mono font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Truth Graph Evidence Cross-Link</span>
                </div>
                <p className="text-[#1C1A17] text-[11px] leading-relaxed font-medium">
                  {MOCK_TICKETS[0].crossSurfaceEvidence}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Policy RAG & AI Resolution Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17] flex items-center justify-between">
              <span>Claude 3.7 Resolution Draft</span>
              <span className="text-[#2D6A4F] text-xs font-mono">Policy RAG Match</span>
            </h2>

            {/* Policy Citation */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-[#D97706] font-mono font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Policy Citation</span>
              </div>
              <p className="text-[#1C1A17] font-medium">
                {MOCK_TICKETS[0].policyCitation}
              </p>
            </div>

            {/* Suggested Resolution Draft */}
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#2D6A4F]/30 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#2D6A4F] font-mono font-bold">
                <span>Suggested Action</span>
                <span>Auto-Approve Eligible</span>
              </div>
              <p className="text-[#1C1A17] font-bold">
                {MOCK_TICKETS[0].suggestedAction}
              </p>
              <button className="w-full py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533e] text-white font-extrabold text-xs transition-all shadow-md">
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
