import React, { useState } from 'react';
import {
  RotateCcw,
  UploadCloud,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ReturnsTriageView = () => {
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
    <div className="space-y-6 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17]">
      
      {/* Streamlined Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EAE5DD]">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1C1A17] font-heading">
            Returns & Damage Triage
          </h1>
          <p className="text-xs text-[#6B665E] font-medium mt-0.5">
            Photo-verify customer returns, assess damage severity, and detect fraud automatically.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#EAE5DD] text-center shadow-sm">
            <span className="text-base font-mono font-extrabold text-[#2D6A4F]">94.2%</span>
            <span className="text-[10px] text-[#6B665E] font-mono ml-2 font-bold">Auto-Approve</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#EAE5DD] text-center shadow-sm">
            <span className="text-base font-mono font-extrabold text-[#D94A26]">$18,450</span>
            <span className="text-[10px] text-[#6B665E] font-mono ml-2 font-bold">Fraud Prevented</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Dropzone & Live Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Photo Upload */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1C1A17] flex items-center justify-between">
              <span>Photo Verification Dropzone</span>
              <span className="text-[#2D6A4F] text-[11px] font-normal">Real-Time OCR & VLM</span>
            </h2>

            <div className="border-2 border-dashed border-[#E2DDD5] hover:border-[#D94A26] rounded-xl p-6 text-center bg-[#FAF8F5] transition-all cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-[#D94A26] mx-auto group-hover:scale-110 transition-transform mb-2" />
              <p className="text-xs font-bold text-[#1C1A17]">Drop Return Photo Here</p>
              <p className="text-[10px] text-[#6B665E] mt-0.5">JPG, PNG, WEBP up to 25MB</p>
              <button className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#D94A26] hover:bg-[#c03d1c] text-white text-xs font-bold transition-all shadow-sm">
                Select Photo
              </button>
            </div>
          </div>
        </div>

        {/* Right: Triage Queue */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Controls */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EAE5DD] shadow-sm text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[#6B665E] font-bold">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E2DDD5] rounded-lg px-2.5 py-1 text-xs font-mono text-[#1C1A17] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="auto_approved">Auto Approved</option>
                <option value="flagged">Flagged Fraud</option>
                <option value="human_reviewed">Human Reviewed</option>
              </select>
            </div>

            <span className="font-mono text-[#6B665E]">
              <b className="text-[#1C1A17]">{filteredReturns.length}</b> Returns
            </span>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filteredReturns.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl bg-white border transition-all space-y-3 ${
                  item.fraudScore >= 0.5 ? 'border-[#D94A26] bg-[#FFF5F3]' : 'border-[#EAE5DD]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.photoUrl}
                      alt={item.productTitle}
                      className="w-14 h-14 rounded-lg object-cover border border-[#E2DDD5]"
                    />
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className="text-[#D94A26] font-bold">{item.id}</span>
                        <span className="text-[#6B665E]">• {item.orderId}</span>
                      </div>
                      <h3 className="text-xs font-extrabold text-[#1C1A17] mt-0.5">{item.productTitle}</h3>
                      <p className="text-[11px] text-[#6B665E]">{item.customer}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {item.fraudScore >= 0.5 ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#D94A26]/10 text-[#D94A26] text-[11px] font-mono font-bold">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Fraud ({Math.round(item.fraudScore * 100)}%)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-[11px] font-mono font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE5DD] text-xs space-y-1">
                  <div className="flex justify-between font-mono font-bold">
                    <span>Defect: <span className="text-[#D94A26]">{item.damageAssessment.defectType}</span></span>
                    <span className="text-[#2D6A4F]">Confidence {Math.round(item.damageAssessment.visionConfidence * 100)}%</span>
                  </div>
                  <p className="text-[#6B665E] text-[11px]">{item.damageAssessment.details}</p>
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
