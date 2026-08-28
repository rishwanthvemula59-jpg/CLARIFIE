import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, FileImage, FileText, ChevronRight, Calendar, AlertTriangle, ShieldCheck, ShieldAlert, Zap } from 'lucide-react';

export const CaseCard = ({ caseData }) => {
  const verdict = caseData.fused_verdict || 'high';
  const score = caseData.fused_risk_score || 85;

  const getVerdictStyle = (v, s) => {
    if (v === 'high' || s >= 75) {
      return {
        cardBorder: 'glow-border-rose',
        badgeBg: 'bg-rose-500/15 border-rose-500/40 text-rose-400',
        label: 'HIGH RISK',
        icon: ShieldAlert
      };
    }
    if (v === 'medium' || s >= 45) {
      return {
        cardBorder: 'glow-border-amber',
        badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
        label: 'MEDIUM RISK',
        icon: AlertTriangle
      };
    }
    return {
      cardBorder: 'glow-border-emerald',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
      label: 'LOW RISK',
      icon: ShieldCheck
    };
  };

  const style = getVerdictStyle(verdict, score);
  const Icon = style.icon;

  const dateStr = new Date(caseData.created_at || Date.now()).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link
      to={`/cases/${caseData.id}`}
      className={`p-6 rounded-2xl glass-card-luxury ${style.cardBorder} transition-all duration-300 block group shadow-2xl relative overflow-hidden`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Case Info */}
        <div className="space-y-3 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm ${style.badgeBg}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{style.label} ({score}/100)</span>
            </span>

            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-full border border-white/5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateStr}</span>
            </span>

            <span className="text-[10px] font-mono text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              <Zap className="w-3 h-3" />
              <span>Gemini Fusion Verified</span>
            </span>
          </div>

          <p className="text-base font-semibold text-white truncate leading-tight group-hover:text-blue-300 transition-colors">
            {caseData.context_note || caseData.fused_explanation || 'Forensic evidence analysis dossier'}
          </p>

          {/* Evidence Modality Badges */}
          <div className="flex items-center gap-2 pt-1">
            {caseData.audio_transcript && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Mic className="w-3.5 h-3.5" />
                <span>Audio Transcript</span>
              </span>
            )}
            {caseData.image_description && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FileImage className="w-3.5 h-3.5" />
                <span>Screenshot Artifact</span>
              </span>
            )}
            {caseData.document_text && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileText className="w-3.5 h-3.5" />
                <span>Contract PDF</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Chevron Arrow */}
        <div className="shrink-0 flex items-center gap-2 text-slate-400 group-hover:text-white transition-all pt-2 sm:pt-0">
          <span className="text-xs font-mono hidden sm:inline text-slate-500 group-hover:text-blue-400">View Dossier</span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 flex items-center justify-center text-white group-hover:scale-105 transition-all shadow-md">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </Link>
  );
};
