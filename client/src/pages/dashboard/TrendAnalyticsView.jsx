import React from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertOctagon,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const TrendAnalyticsView = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-black to-black border border-rose-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300 font-bold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Surface 6 • Trend & Visual Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            Cross-Surface Truth Telemetry
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Executive intelligence aggregating defect rates by SKU, fraud vector trends, and evidence reconciliation metrics across all 6 surfaces.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-rose-400">99.4%</span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">Catalog Ground Truth</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Total Returns Processed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-white">1,482</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">+12.4%</span>
          </div>
          <p className="text-[11px] text-slate-400">94.2% auto-dispositioned via VLM</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Fraud $ Intercepted</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-rose-400">$48,290</span>
            <span className="text-xs font-mono text-rose-400 font-bold flex items-center">Serial Swaps</span>
          </div>
          <p className="text-[11px] text-slate-400">OCR serial matching active</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Catalog Mismatches Fixed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-amber-400">38 SKUs</span>
            <span className="text-xs font-mono text-amber-400 font-bold flex items-center">Pre-Publish</span>
          </div>
          <p className="text-[11px] text-slate-400">Saved estimated $84k return costs</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Truth Graph Embeddings</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-cyan-400">42,890</span>
            <span className="text-xs font-mono text-cyan-400 font-bold flex items-center">768-d Vector</span>
          </div>
          <p className="text-[11px] text-slate-400">Indexed in pgvector</p>
        </div>

      </div>

      {/* Visual Analytics Telemetry Panel */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span>Cross-Surface Signals Telemetry</span>
          <span className="text-rose-400 text-xs font-normal">Real-Time Aggregate Feed</span>
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-rose-400 font-bold">SKU-APX-4420 (Trail Running Shoe)</span>
              <p className="text-xs text-white font-bold mt-0.5">High Return Defect Rate: Color Shade Mismatch</p>
              <p className="text-[11px] text-slate-400 mt-1">Cross-surface: 14 Return Photos + 1 CX Chat Ticket + 1 Catalog QA Flag reconciled.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
              Action Required
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TrendAnalyticsView;
