import React, { useState } from 'react';
import {
  RotateCcw,
  UploadCloud,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const ReturnsTriageView = () => {
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const MOCK_RETURNS = [
    {
      id: 'RET-98421',
      orderId: 'ORD-98421',
      customer: 'Sarah Jenkins (CUST-8831)',
      sku: 'SKU-APX-4420',
      productTitle: 'UltraLight Trail Running Shoe',
      photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      reason: 'Color Mismatch — looks lighter than online photo',
      damageAssessment: {
        defectType: 'Color Shade Variance',
        severity: 'Minor',
        visionConfidence: 0.96,
        details: 'Visual spectrum comparison against canonical catalog image confirms 18% higher luminous saturation in return photo.'
      },
      fraudScore: 0.08,
      disposition: 'restock',
      status: 'auto_approved',
      timestamp: '12 mins ago'
    },
    {
      id: 'RET-98490',
      orderId: 'ORD-98490',
      customer: 'Alex Vance (CUST-1042)',
      sku: 'SKU-APX-8901',
      productTitle: 'Tactical Chronograph Watch v2',
      photoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      reason: 'Defective bezel mechanism',
      damageAssessment: {
        defectType: 'Serial Number Swap Suspected',
        severity: 'Critical',
        visionConfidence: 0.91,
        details: 'OCR extraction of watch casing engraving mismatch: Return photo shows serial #SN-77401 whereas order ORD-98490 registered #SN-89012.'
      },
      fraudScore: 0.89,
      disposition: 'deny',
      status: 'flagged',
      timestamp: '34 mins ago'
    },
    {
      id: 'RET-98504',
      orderId: 'ORD-98504',
      customer: 'Elena Rostova (CUST-4419)',
      sku: 'SKU-APX-1192',
      productTitle: 'Noise-Cancelling Wireless Headphones',
      photoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      reason: 'Damaged packaging / audio cutouts',
      damageAssessment: {
        defectType: 'Physical Shell Dent',
        severity: 'Moderate',
        visionConfidence: 0.84,
        details: 'Right ear cup hinge exhibits stress fracture consistent with impact drop. Recommended refurbish routing.'
      },
      fraudScore: 0.22,
      disposition: 'refurb',
      status: 'human_reviewed',
      timestamp: '1 hour ago'
    }
  ];

  const filteredReturns = MOCK_RETURNS.filter(r => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Surface Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black to-black border border-emerald-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Surface 1 • Warehouse & Ops Ground Truth</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            Returns & Damage Triage
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Photo-verify customer returns, assess damage severity, detect fraudulent serial swaps, and route items automatically to restock, refurb, or denial queues.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center min-w-[110px]">
            <span className="text-2xl font-mono font-extrabold text-emerald-400">94.2%</span>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">Auto-Approve Rate</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center min-w-[110px]">
            <span className="text-2xl font-mono font-extrabold text-rose-400">$18,450</span>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">Fraud Prevented</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Dropzone & Live Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Photo Upload & Verification Zone */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Photo Verification Dropzone</span>
              <span className="text-emerald-400 text-xs font-normal">Real-Time OCR & Damage VLM</span>
            </h2>

            <div className="border-2 border-dashed border-white/20 hover:border-emerald-500/50 rounded-2xl p-8 text-center bg-black/40 transition-all cursor-pointer group">
              <UploadCloud className="w-10 h-10 text-emerald-400 mx-auto group-hover:scale-110 transition-transform mb-3" />
              <p className="text-xs font-bold text-white">
                Drag & Drop Return Item Photo
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports JPG, PNG, WEBP • Max 25MB
              </p>
              <button className="mt-4 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all">
                Select Photo File
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-slate-300">
                <span>Product Truth Graph Lineage</span>
                <span className="text-cyan-400">Linked to SKU Catalog</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Every uploaded return photo is embedded via pgvector and reconciled against the master product catalog image to detect color variations and fake swaps.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Triage Queue & Assessment Stream */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Filter Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/60 border border-white/15 rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Triage Statuses</option>
                <option value="auto_approved">Auto Approved</option>
                <option value="flagged">Flagged (Fraud Risk)</option>
                <option value="human_reviewed">Human Reviewed</option>
              </select>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Showing <b className="text-white">{filteredReturns.length}</b> return inspections
            </span>
          </div>

          {/* Inspection Cards List */}
          <div className="space-y-4">
            {filteredReturns.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedReturn(item)}
                className={`p-5 rounded-2xl bg-white/[0.03] border transition-all cursor-pointer hover:border-white/30 space-y-4 ${
                  item.fraudScore >= 0.5 ? 'border-rose-500/40 bg-rose-950/10' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.photoUrl}
                      alt={item.productTitle}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{item.id}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-xs font-mono text-slate-400">{item.orderId}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white mt-0.5">{item.productTitle}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.customer}</p>
                    </div>
                  </div>

                  {/* Fraud Score & Status Badge */}
                  <div className="text-right shrink-0">
                    {item.fraudScore >= 0.5 ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Fraud Flag ({Math.round(item.fraudScore * 100)}%)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified ({Math.round((1 - item.fraudScore) * 100)}%)</span>
                      </span>
                    )}
                    <p className="text-[10px] font-mono text-slate-400 mt-1">{item.timestamp}</p>
                  </div>
                </div>

                {/* Damage Finding Details */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-slate-300">
                    <span>Defect Assessment: <span className="text-white">{item.damageAssessment.defectType}</span></span>
                    <span className="text-emerald-400">Confidence {Math.round(item.damageAssessment.visionConfidence * 100)}%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    {item.damageAssessment.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReturnsTriageView;
