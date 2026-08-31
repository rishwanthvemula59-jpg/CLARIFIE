import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Search,
  Filter,
  Image as ImageIcon,
  Layers
} from 'lucide-react';

export const CatalogQAView = () => {
  const [filterType, setFilterType] = useState('all');

  const MOCK_FLAGS = [
    {
      id: 'QA-8841',
      sku: 'SKU-APX-4420',
      title: 'UltraLight Trail Running Shoe',
      type: 'mismatch',
      source: 'Returns & Damage Triage (14 Evidence Photos)',
      finding: 'Color shade variance detected between studio catalog photo and 14 warehouse return photos.',
      confidence: 0.94,
      status: 'open',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    },
    {
      id: 'QA-8849',
      sku: 'SKU-APX-1192',
      title: 'Noise-Cancelling Wireless Headphones',
      type: 'missing_attr',
      source: 'Catalog Audit Scanner',
      finding: 'Missing verified Bluetooth Codec specification attribute in public listing.',
      confidence: 0.99,
      status: 'open',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-black to-black border border-amber-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surface 3 • Catalog QA & Listing Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            Catalog QA & Conflict Resolution
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Automatically reconcile catalog listings against ground-truth evidence gathered from returns and CX intakes. Flag visual mismatches before they cause returns.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-amber-400">14 Flags</span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">Pending Reconciliation</p>
        </div>
      </div>

      {/* Main Flags Table Container */}
      <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
            Active Catalog Mismatch Flags
          </h2>
          <span className="text-xs font-mono text-cyan-400">
            Truth Graph Conflict Engine Active
          </span>
        </div>

        <div className="space-y-4">
          {MOCK_FLAGS.map((flag) => (
            <div key={flag.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-amber-500/40 transition-all">
              <div className="flex items-center space-x-4">
                <img src={flag.image} alt={flag.title} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="text-amber-400 font-bold">{flag.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{flag.sku}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-0.5">{flag.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{flag.finding}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all">
                  Reconcile Listing
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CatalogQAView;
