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
    <div className="space-y-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17]">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/30 text-xs font-mono text-[#E11D48] font-bold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Surface 6 • Trend & Visual Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1C1A17] font-heading">
            Cross-Surface Truth Telemetry
          </h1>
          <p className="text-sm text-[#6B665E] font-medium leading-relaxed">
            Executive intelligence aggregating defect rates by SKU, fraud vector trends, and evidence reconciliation metrics across all 6 surfaces.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-[#E11D48]">99.4%</span>
          <p className="text-[10px] text-[#6B665E] font-mono mt-0.5 uppercase font-bold">Catalog Ground Truth</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm space-y-2">
          <span className="text-[11px] font-mono text-[#6B665E] uppercase font-bold">Total Returns Processed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-[#1C1A17]">1,482</span>
            <span className="text-xs font-mono text-[#2D6A4F] font-bold flex items-center">+12.4%</span>
          </div>
          <p className="text-[11px] text-[#6B665E]">94.2% auto-dispositioned via VLM</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm space-y-2">
          <span className="text-[11px] font-mono text-[#6B665E] uppercase font-bold">Fraud $ Intercepted</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-[#D94A26]">$48,290</span>
            <span className="text-xs font-mono text-[#D94A26] font-bold flex items-center">Serial Swaps</span>
          </div>
          <p className="text-[11px] text-[#6B665E]">OCR serial matching active</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm space-y-2">
          <span className="text-[11px] font-mono text-[#6B665E] uppercase font-bold">Catalog Mismatches Fixed</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-[#D97706]">38 SKUs</span>
            <span className="text-xs font-mono text-[#D97706] font-bold flex items-center">Pre-Publish</span>
          </div>
          <p className="text-[11px] text-[#6B665E]">Saved estimated $84k return costs</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm space-y-2">
          <span className="text-[11px] font-mono text-[#6B665E] uppercase font-bold">Truth Graph Embeddings</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-extrabold text-[#2563EB]">42,890</span>
            <span className="text-xs font-mono text-[#2563EB] font-bold flex items-center">768-d Vector</span>
          </div>
          <p className="text-[11px] text-[#6B665E]">Indexed in pgvector</p>
        </div>

      </div>

      {/* Visual Analytics Telemetry Panel */}
      <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-6">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17] flex items-center justify-between">
          <span>Cross-Surface Signals Telemetry</span>
          <span className="text-[#D94A26] text-xs font-mono font-bold">Real-Time Aggregate Feed</span>
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFF5F3] border border-[#D94A26]/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#D94A26] font-bold">SKU-APX-4420 (Trail Running Shoe)</span>
              <p className="text-xs text-[#1C1A17] font-bold mt-0.5">High Return Defect Rate: Color Shade Mismatch</p>
              <p className="text-[11px] text-[#6B665E] mt-1 font-medium">Cross-surface: 14 Return Photos + 1 CX Chat Ticket + 1 Catalog QA Flag reconciled.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#D94A26]/10 border border-[#D94A26]/30 text-[#D94A26] text-xs font-mono font-bold">
              Action Required
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TrendAnalyticsView;
