import React from 'react';
import { Shield, ShieldAlert, AlertTriangle, ShieldCheck, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const DashboardStatsRow = ({ cases = [] }) => {
  const total = cases.length;
  const highRisk = cases.filter(c => c.fused_verdict === 'high' || c.fused_risk_score >= 75).length;
  const mediumRisk = cases.filter(c => c.fused_verdict === 'medium' || (c.fused_risk_score >= 45 && c.fused_risk_score < 75)).length;
  const lowRisk = cases.filter(c => c.fused_verdict === 'low' || c.fused_risk_score < 45).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-['Plus_Jakarta_Sans']">
      
      {/* 1. Total Dossiers */}
      <div className="glass-stat-card rounded-3xl p-6 flex items-center justify-between relative overflow-hidden group border-t-[3px] border-t-blue-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-extrabold text-slate-300 tracking-tight uppercase">Total Dossiers</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-extrabold font-mono text-white tracking-tight">{total}</p>
            <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-500/15 border border-blue-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-semibold leading-none">Multimodal Scans Active</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 shadow-lg shadow-blue-500/10 backdrop-blur-sm">
          <Shield className="w-7 h-7" />
        </div>
      </div>

      {/* 2. High Fraud Risk */}
      <div className="glass-stat-card rounded-3xl p-6 flex items-center justify-between relative overflow-hidden group border-t-[3px] border-t-rose-500">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-extrabold text-rose-300 tracking-tight uppercase">High Fraud Risk</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-extrabold font-mono text-rose-400 tracking-tight">{highRisk}</p>
            <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-500/15 border border-rose-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>URGENT</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-semibold leading-none">Immediate Threat Dossiers</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300 shadow-lg shadow-rose-500/10 backdrop-blur-sm">
          <ShieldAlert className="w-7 h-7" />
        </div>
      </div>

      {/* 3. Medium / Suspicious */}
      <div className="glass-stat-card rounded-3xl p-6 flex items-center justify-between relative overflow-hidden group border-t-[3px] border-t-amber-500">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-extrabold text-amber-300 tracking-tight uppercase">Medium / Suspicious</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-extrabold font-mono text-amber-400 tracking-tight">{mediumRisk}</p>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
              REVIEW
            </span>
          </div>
          <p className="text-xs text-slate-400 font-semibold leading-none">Flagged for Verification</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300 shadow-lg shadow-amber-500/10 backdrop-blur-sm">
          <AlertTriangle className="w-7 h-7" />
        </div>
      </div>

      {/* 4. Low Risk Verdicts */}
      <div className="glass-stat-card rounded-3xl p-6 flex items-center justify-between relative overflow-hidden group border-t-[3px] border-t-emerald-500">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-extrabold text-emerald-300 tracking-tight uppercase">Low Risk Verdicts</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">{lowRisk}</p>
            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>CLEAN</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-semibold leading-none">Clean Forensics Audits</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
          <ShieldCheck className="w-7 h-7" />
        </div>
      </div>

    </div>
  );
};
