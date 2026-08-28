import React from 'react';
import { GuardianChatWindow } from '../components/GuardianChatWindow';
import { MessageSquare } from 'lucide-react';
import { SparkBadge } from '@/components/ui/spark-badge';

export const Guardian = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 font-['Plus_Jakarta_Sans']">
      
      {/* Header Banner with SparkBadge */}
      <div className="p-8 rounded-3xl glass-card-luxury glow-border-emerald relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Real-Time Guardian Scam Triage</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Guardian Mode Triage</h1>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Describe any situation in plain language to receive an instant fraud risk read and advice — powered by Gemini's real-time threat inference engine.
          </p>
        </div>

        {/* SparkBadge Credential Widget */}
        <div className="w-full md:w-[280px] h-[200px] shrink-0 relative z-10">
          <SparkBadge />
        </div>
      </div>

      <GuardianChatWindow />

    </div>
  );
};
