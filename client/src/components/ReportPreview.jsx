import React from 'react';
import { Printer, Shield, FileCheck, AlertTriangle, CheckCircle, Download } from 'lucide-react';

export const ReportPreview = ({ reportData, caseData }) => {
  if (!reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h3 className="font-heading font-bold text-xl text-text-primary">Evidence Forensic Report</h3>
          <p className="text-xs text-text-muted">Exportable forensic summary formatted for bank fraud divisions or law enforcement.</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-accent-primary hover:bg-blue-600 text-white font-medium text-sm shadow-glow-primary transition-all duration-200"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Printable Paper Document Container */}
      <div className="p-8 rounded-2xl bg-base-surface border border-base-border text-text-primary print:bg-white print:text-black print:p-0 print:border-none print:shadow-none space-y-6">
        
        {/* Document Official Header */}
        <div className="border-b border-base-border print:border-gray-300 pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-white print:bg-black">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-text-primary print:text-black">CLARIFIE FORENSICS</span>
            </div>
            <p className="text-xs font-mono text-text-muted print:text-gray-600 mt-1">Multi-Channel Digital & Telephonic Fraud Evidence Dossier</p>
          </div>

          <div className="text-right font-mono text-xs text-text-muted print:text-gray-600">
            <p className="font-bold text-text-primary print:text-black">CASE ID: {caseData?.id || 'REF-2026-FUSED'}</p>
            <p>Generated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            <p className="text-risk-high font-bold print:text-red-600 uppercase mt-0.5">
              VERDICT: {caseData?.fused_verdict || 'HIGH FRAUD RISK'} ({caseData?.fused_risk_score || 94}/100)
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-primary print:text-blue-800 flex items-center space-x-1.5">
            <FileCheck className="w-4 h-4" />
            <span>1. Forensic Executive Summary</span>
          </h4>
          <div className="p-4 rounded-xl bg-base-void print:bg-gray-100 border border-base-border print:border-gray-300 text-sm leading-relaxed font-sans">
            {reportData.summary}
          </div>
        </div>

        {/* Evidence Streams Reviewed */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-primary print:text-blue-800 flex items-center space-x-1.5">
            <Shield className="w-4 h-4" />
            <span>2. Evidence Channels Evaluated</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {reportData.evidenceReviewed?.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-base-void print:bg-gray-50 border border-base-border print:border-gray-300 text-xs font-mono flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 print:text-green-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Consolidated Forensic Red Flags */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-risk-high print:text-red-700 flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>3. Cross-Channel & Modality Red Flags</span>
          </h4>
          <div className="space-y-2">
            {reportData.redFlags?.map((flag, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-risk-high/10 print:bg-red-50 border border-risk-high/30 print:border-red-200 text-xs font-sans text-text-primary print:text-black flex items-start space-x-2">
                <span className="font-mono font-bold text-risk-high print:text-red-600 shrink-0">#{idx + 1}</span>
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-green-700 flex items-center space-x-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>4. Recommended Victim Remediation Checklist</span>
          </h4>
          <div className="p-4 rounded-xl bg-base-void print:bg-gray-50 border border-base-border print:border-gray-300 space-y-2">
            {reportData.recommendedActions?.map((action, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs font-sans">
                <input type="checkbox" readOnly checked className="mt-0.5 rounded border-gray-600 text-accent-primary" />
                <span className="text-text-primary print:text-black">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Footer Stamp */}
        <div className="border-t border-base-border print:border-gray-300 pt-4 flex items-center justify-between text-[11px] font-mono text-text-muted print:text-gray-500">
          <p>CONFIDENTIAL FORENSIC DOSSIER — GENERATED BY CLARIFIÉ FRAUD ENGINE</p>
          <p>STRICTLY FOR INVESTIGATION PURPOSES</p>
        </div>

      </div>

    </div>
  );
};
