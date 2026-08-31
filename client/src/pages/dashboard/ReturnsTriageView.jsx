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
    <div className="space-y-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17]">
      
      {/* Surface Banner — Burrito Madre Warm Terracotta Light Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D94A26]/10 border border-[#D94A26]/30 text-xs font-mono text-[#D94A26] font-bold">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Surface 1 • Warehouse & Ops Ground Truth</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1C1A17] font-heading">
            Returns & Damage Triage
          </h1>
          <p className="text-sm text-[#6B665E] font-medium leading-relaxed">
            Photo-verify customer returns, assess damage severity, detect fraudulent serial swaps, and route items automatically to restock, refurb, or denial queues.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center min-w-[110px]">
            <span className="text-2xl font-mono font-extrabold text-[#2D6A4F]">94.2%</span>
            <p className="text-[10px] text-[#6B665E] font-mono mt-0.5 uppercase font-bold">Auto-Approve Rate</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center min-w-[110px]">
            <span className="text-2xl font-mono font-extrabold text-[#D94A26]">$18,450</span>
            <p className="text-[10px] text-[#6B665E] font-mono mt-0.5 uppercase font-bold">Fraud Prevented</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Dropzone & Live Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Photo Upload & Verification Zone */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17] flex items-center justify-between">
              <span>Photo Verification Dropzone</span>
              <span className="text-[#2D6A4F] text-xs font-normal font-mono">Real-Time OCR & Damage VLM</span>
            </h2>

            <div className="border-2 border-dashed border-[#E2DDD5] hover:border-[#D94A26] rounded-2xl p-8 text-center bg-[#FAF8F5] transition-all cursor-pointer group">
              <UploadCloud className="w-10 h-10 text-[#D94A26] mx-auto group-hover:scale-110 transition-transform mb-3" />
              <p className="text-xs font-bold text-[#1C1A17]">
                Drag & Drop Return Item Photo
              </p>
              <p className="text-[11px] text-[#6B665E] mt-1">
                Supports JPG, PNG, WEBP • Max 25MB
              </p>
              <button className="mt-4 px-4 py-2 rounded-xl bg-[#D94A26] hover:bg-[#c03d1c] text-white text-xs font-bold transition-all shadow-md">
                Select Photo File
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-[#1C1A17]">
                <span>Product Truth Graph Lineage</span>
                <span className="text-[#D94A26]">Linked to SKU Catalog</span>
              </div>
              <p className="text-[11px] text-[#6B665E] leading-normal font-medium">
                Every uploaded return photo is embedded via pgvector and reconciled against the master product catalog image to detect color variations and fake swaps.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Triage Queue & Assessment Stream */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#6B665E] uppercase font-bold">Filter Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-3 py-1.5 text-xs font-mono text-[#1C1A17] focus:outline-none focus:border-[#D94A26]"
              >
                <option value="all">All Triage Statuses</option>
                <option value="auto_approved">Auto Approved</option>
                <option value="flagged">Flagged (Fraud Risk)</option>
                <option value="human_reviewed">Human Reviewed</option>
              </select>
            </div>

            <span className="text-xs font-mono text-[#6B665E]">
              Showing <b className="text-[#1C1A17]">{filteredReturns.length}</b> return inspections
            </span>
          </div>

          {/* Inspection Cards List */}
          <div className="space-y-4">
            {filteredReturns.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedReturn(item)}
                className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer hover:shadow-md space-y-4 ${
                  item.fraudScore >= 0.5 ? 'border-[#D94A26] bg-[#FFF5F3]' : 'border-[#EAE5DD]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.photoUrl}
                      alt={item.productTitle}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E2DDD5]"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-[#D94A26] font-bold">{item.id}</span>
                        <span className="text-[#E2DDD5]">•</span>
                        <span className="text-xs font-mono text-[#6B665E]">{item.orderId}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-[#1C1A17] mt-0.5">{item.productTitle}</h3>
                      <p className="text-xs text-[#6B665E] mt-0.5 font-medium">{item.customer}</p>
                    </div>
                  </div>

                  {/* Fraud Score & Status Badge */}
                  <div className="text-right shrink-0">
                    {item.fraudScore >= 0.5 ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D94A26]/10 border border-[#D94A26]/30 text-[#D94A26] text-xs font-mono font-bold">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Fraud Flag ({Math.round(item.fraudScore * 100)}%)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 text-[#2D6A4F] text-xs font-mono font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified ({Math.round((1 - item.fraudScore) * 100)}%)</span>
                      </span>
                    )}
                    <p className="text-[10px] font-mono text-[#6B665E] mt-1">{item.timestamp}</p>
                  </div>
                </div>

                {/* Damage Finding Details */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-[#1C1A17]">
                    <span>Defect Assessment: <span className="text-[#D94A26]">{item.damageAssessment.defectType}</span></span>
                    <span className="text-[#2D6A4F]">Confidence {Math.round(item.damageAssessment.visionConfidence * 100)}%</span>
                  </div>
                  <p className="text-[#6B665E] text-[11px] font-medium leading-relaxed">
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
