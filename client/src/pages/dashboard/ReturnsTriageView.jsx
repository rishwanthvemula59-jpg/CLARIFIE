import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  UploadCloud,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Layers,
  ArrowUpRight,
  X,
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';

export const ReturnsTriageView = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const [returnsList, setReturnsList] = useState([
    {
      id: 'RET-98421',
      orderId: 'ORD-98421',
      customer: 'Sarah Jenkins (CUST-8831)',
      sku: 'SKU-APX-4420',
      productTitle: 'UltraLight Trail Running Shoe',
      photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      catalogPhotoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
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
      catalogPhotoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
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
      catalogPhotoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
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
  ]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpdateStatus = (returnId, nextStatus, nextDisposition) => {
    setReturnsList(prev => prev.map(item => {
      if (item.id === returnId) {
        return { ...item, status: nextStatus, disposition: nextDisposition };
      }
      return item;
    }));

    if (selectedReturn && selectedReturn.id === returnId) {
      setSelectedReturn(prev => ({ ...prev, status: nextStatus, disposition: nextDisposition }));
    }

    const actionText = nextStatus === 'auto_approved' ? 'Approved & Refund Issued' : nextStatus === 'flagged' ? 'Flagged & Refund Denied' : 'Routed for Repair';
    showToast(`Case ${returnId} successfully updated: ${actionText}`);
  };

  const handleSimulatedUpload = () => {
    setIsProcessingUpload(true);
    setUploadProgress(10);
    setUploadStep('Extracting color spectrum vectors...');

    const steps = [
      { progress: 35, step: 'OCR scanning watch serial numbers...' },
      { progress: 70, step: 'Comparing pgvector features against SKU database...' },
      { progress: 95, step: 'Evaluating damage severity index via Gemini VLM...' },
      { progress: 100, step: 'Complete' }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const next = steps[currentStepIdx];
        setUploadProgress(next.progress);
        setUploadStep(next.step);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessingUpload(false);
          const newReturn = {
            id: `RET-${Math.floor(10000 + Math.random() * 90000)}`,
            orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
            customer: 'Test Merchant (CUST-0092)',
            sku: 'SKU-APX-8901',
            productTitle: 'Tactical Chronograph Watch v2',
            photoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
            catalogPhotoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
            reason: 'Bezel rotation stiff / scratch markup',
            damageAssessment: {
              defectType: 'Cosmetic Bezel Scratch',
              severity: 'Minor',
              visionConfidence: 0.94,
              details: 'Minor light refraction variance detected at 2 o\'clock bezel alignment. Structural components verified.'
            },
            fraudScore: 0.12,
            disposition: 'restock',
            status: 'auto_approved',
            timestamp: 'Just now'
          };
          setReturnsList(prev => [newReturn, ...prev]);
          showToast(`New return item analyzed & verified successfully: ${newReturn.id}`);
        }, 800);
      }
    }, 1200);
  };

  const getStatusBadge = (status, score) => {
    if (status === 'flagged' || score >= 0.5) {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFF5F3] border border-[#D94A26]/30 text-[#D94A26] text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Flagged Fraud ({Math.round(score * 100)}%)</span>
        </span>
      );
    }
    if (status === 'auto_approved') {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#2D6A4F]/30 text-[#2D6A4F] text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Auto Approved</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
        <Info className="w-3.5 h-3.5" />
        <span>Human Review</span>
      </span>
    );
  };

  const filteredReturns = returnsList.filter(r => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17] relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 bg-[#1C1A17] text-white rounded-2xl shadow-2xl flex items-center space-x-3 border border-white/10 animate-slide-up font-sans font-bold text-xs">
          <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Streamlined Header with Premium Typography */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EAE5DD]">
        <div className="space-y-1">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1A17] font-heading leading-tight">
            Returns & Damage Triage
          </h1>
          <p className="text-sm text-[#6B665E] font-medium leading-relaxed">
            Reconcile client returns, evaluate damage severity indexes, and detect fraudulent item swaps using visual forensics.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 font-mono">
          <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#EAE5DD] text-center shadow-sm hover:shadow transition-shadow">
            <span className="text-xl font-extrabold text-[#2D6A4F]">94.2%</span>
            <span className="text-[11px] text-[#6B665E] ml-2.5 font-bold uppercase tracking-wider">Auto-Approve</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#EAE5DD] text-center shadow-sm hover:shadow transition-shadow">
            <span className="text-xl font-extrabold text-[#D94A26]">$18,450</span>
            <span className="text-[11px] text-[#6B665E] ml-2.5 font-bold uppercase tracking-wider">Intercepted</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Dropzone & Live Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Intake Dropzone */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6B665E]">
              Intake Photo Verification
            </h2>

            {isProcessingUpload ? (
              <div className="border border-[#E2DDD5] rounded-2xl p-8 text-center bg-[#FAF8F5] space-y-4">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <RefreshCw className="w-10 h-10 text-[#D94A26] animate-spin" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-[#1C1A17]">{uploadStep}</p>
                  <p className="text-[10px] text-[#6B665E] font-mono font-bold">Analysis Progress: {uploadProgress}%</p>
                </div>
                <div className="w-full bg-[#EAE5DD] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#D94A26] h-full transition-all duration-300 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div 
                onClick={handleSimulatedUpload}
                className="border-2 border-dashed border-[#E2DDD5] hover:border-[#D94A26] rounded-2xl p-10 text-center bg-[#FAF8F5] transition-all cursor-pointer group hover:scale-[1.01] duration-200"
              >
                <UploadCloud className="w-12 h-12 text-[#D94A26] mx-auto group-hover:scale-110 transition-transform duration-200 mb-3" />
                <p className="text-xs font-extrabold text-[#1C1A17]">Drop Return Photo Here</p>
                <p className="text-[10px] text-[#6B665E] mt-1 font-medium">Drag-and-drop file to auto-trigger VLM</p>
                <button className="mt-4 px-4 py-2 rounded-xl bg-[#1C1A17] hover:bg-[#2c2925] text-white text-xs font-bold transition-all shadow-md">
                  Select Return File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Triage Queue */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls with count bubbles */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#6B665E] uppercase font-bold">Filters:</span>
              <div className="flex items-center space-x-1.5 text-xs font-mono">
                {[
                  { id: 'all', label: 'All Cases', count: returnsList.length },
                  { id: 'auto_approved', label: 'Approved', count: returnsList.filter(r => r.status === 'auto_approved').length },
                  { id: 'flagged', label: 'Flagged', count: returnsList.filter(r => r.status === 'flagged').length },
                  { id: 'human_reviewed', label: 'Review Needed', count: returnsList.filter(r => r.status === 'human_reviewed').length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterStatus(tab.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1.5 ${
                      filterStatus === tab.id
                        ? 'bg-[#1C1A17] text-white shadow-sm'
                        : 'text-[#6B665E] hover:text-[#1C1A17] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      filterStatus === tab.id ? 'bg-white/20 text-white' : 'bg-[#EAE5DD] text-[#1C1A17]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Queue */}
          <div className="space-y-4">
            {filteredReturns.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedReturn(item)}
                className={`p-5 rounded-2xl bg-white border hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer space-y-4 ${
                  selectedReturn?.id === item.id ? 'ring-2 ring-[#D94A26] border-[#D94A26]/40' : 'border-[#EAE5DD]'
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
                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className="text-[#D94A26] font-bold">{item.id}</span>
                        <span className="text-[#6B665E]">• SKU: {item.sku}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-[#1C1A17] mt-0.5 leading-tight">{item.productTitle}</h3>
                      <p className="text-xs text-[#6B665E] font-medium">{item.customer}</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3">
                    {getStatusBadge(item.status, item.fraudScore)}
                    <ChevronRight className="w-4 h-4 text-[#6B665E]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-xs space-y-1.5">
                  <div className="flex justify-between font-mono font-bold">
                    <span className="text-[#1C1A17]">Defect Indicator: <span className="text-[#D94A26]">{item.damageAssessment.defectType}</span></span>
                    <span className="text-[#2D6A4F]">VLM Confidence: {Math.round(item.damageAssessment.visionConfidence * 100)}%</span>
                  </div>
                  <p className="text-[#6B665E] font-medium leading-relaxed">{item.damageAssessment.details}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Verification Detail Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="relative bg-white border border-[#EAE5DD] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-zoom-in">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#EAE5DD] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D94A26] uppercase">Return Forensic Review</span>
                <h3 className="text-lg font-extrabold text-[#1C1A17]">{selectedReturn.id} — {selectedReturn.productTitle}</h3>
              </div>
              <button 
                onClick={() => setSelectedReturn(null)}
                className="p-2 rounded-xl text-[#6B665E] hover:text-[#1C1A17] hover:bg-[#EAE5DD] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
              
              {/* Side-by-Side Photo Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Return Photo */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-bold block">1. Customer Returned Item</span>
                  <div className="relative rounded-2xl overflow-hidden border border-[#EAE5DD] bg-[#FAF8F5] aspect-video">
                    <img 
                      src={selectedReturn.photoUrl} 
                      alt="Returned Item" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono rounded-lg">
                      Warehouse Intake Photo
                    </div>
                  </div>
                </div>

                {/* Catalog Reference */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-bold block">2. Catalog Reference Spec</span>
                  <div className="relative rounded-2xl overflow-hidden border border-[#EAE5DD] bg-[#FAF8F5] aspect-video">
                    <img 
                      src={selectedReturn.catalogPhotoUrl} 
                      alt="Catalog Reference" 
                      className="w-full h-full object-cover filter saturate-125"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#D94A26] text-white text-[10px] font-mono rounded-lg font-bold">
                      Canonical Listing Photo
                    </div>
                  </div>
                </div>

              </div>

              {/* Assessment Breakdown */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                
                <div className="space-y-1">
                  <span className="text-[#6B665E] font-mono font-bold uppercase tracking-wider block">Defect Tag</span>
                  <span className="text-sm font-extrabold text-[#D94A26]">{selectedReturn.damageAssessment.defectType}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#6B665E] font-mono font-bold uppercase tracking-wider block">Severity Score</span>
                  <span className={`text-sm font-extrabold uppercase ${
                    selectedReturn.damageAssessment.severity === 'Critical' ? 'text-[#D94A26]' : 'text-amber-600'
                  }`}>
                    {selectedReturn.damageAssessment.severity}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#6B665E] font-mono font-bold uppercase tracking-wider block">Fraud Score</span>
                  <span className={`text-sm font-extrabold ${
                    selectedReturn.fraudScore >= 0.5 ? 'text-[#D94A26]' : 'text-[#2D6A4F]'
                  }`}>
                    {Math.round(selectedReturn.fraudScore * 100)}% Risk Index
                  </span>
                </div>

              </div>

              {/* Forensic Details */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B665E] font-bold block">VLM Forensic Verification Notes</span>
                <p className="text-sm text-[#1C1A17] bg-[#FAF8F5] border border-[#EAE5DD] p-4 rounded-2xl leading-relaxed font-medium">
                  {selectedReturn.damageAssessment.details}
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#EAE5DD] flex items-center justify-between flex-wrap gap-4">
              
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#6B665E]">
                <span>Status:</span>
                <span className="uppercase text-[#1C1A17]">{selectedReturn.status.replace('_', ' ')}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleUpdateStatus(selectedReturn.id, 'flagged', 'deny')}
                  className="px-4 py-2.5 rounded-xl border border-[#D94A26]/40 hover:bg-[#FFF5F3] text-[#D94A26] text-xs font-extrabold transition-all"
                >
                  Deny Refund & Flag Fraud
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReturn.id, 'human_reviewed', 'refurb')}
                  className="px-4 py-2.5 rounded-xl border border-[#E2DDD5] bg-white hover:bg-[#FAF8F5] text-[#1C1A17] text-xs font-extrabold transition-all"
                >
                  Route to Refurbish
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReturn.id, 'auto_approved', 'restock')}
                  className="px-5 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-extrabold transition-all shadow-md"
                >
                  Approve Return & Refund
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ReturnsTriageView;
