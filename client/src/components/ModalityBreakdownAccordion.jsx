import React, { useState } from 'react';
import { Mic, FileImage, FileText, ChevronDown, ChevronUp, AlertCircle, ShieldAlert, Layers } from 'lucide-react';

export const ModalityBreakdownAccordion = ({ caseData }) => {
  const [activeTab, setActiveTab] = useState('audio');

  const hasAudio = Boolean(caseData?.audio_transcript || caseData?.audio_flags?.length);
  const hasImage = Boolean(caseData?.image_description || caseData?.image_flags?.length);
  const hasDoc = Boolean(caseData?.document_text || caseData?.document_flags?.length);

  return (
    <div className="glass-card rounded-2xl border border-base-border overflow-hidden">
      
      {/* Header Tabs */}
      <div className="flex border-b border-base-border bg-base-void/60 overflow-x-auto">
        {hasAudio && (
          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center space-x-2 px-6 py-4 font-heading text-sm font-medium border-b-2 transition-all shrink-0 ${
              activeTab === 'audio'
                ? 'border-accent-primary text-accent-primary bg-base-surface'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Audio Call Forensics</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-risk-high/10 text-risk-high border border-risk-high/20">
              Risk {caseData?.audio_risk_score || 92}
            </span>
          </button>
        )}

        {hasImage && (
          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center space-x-2 px-6 py-4 font-heading text-sm font-medium border-b-2 transition-all shrink-0 ${
              activeTab === 'image'
                ? 'border-accent-primary text-accent-primary bg-base-surface'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <FileImage className="w-4 h-4" />
            <span>Screenshot Phishing</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-risk-high/10 text-risk-high border border-risk-high/20">
              Risk {caseData?.image_risk_score || 89}
            </span>
          </button>
        )}

        {hasDoc && (
          <button
            onClick={() => setActiveTab('document')}
            className={`flex items-center space-x-2 px-6 py-4 font-heading text-sm font-medium border-b-2 transition-all shrink-0 ${
              activeTab === 'document'
                ? 'border-accent-primary text-accent-primary bg-base-surface'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document Predatory Clauses</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-risk-high/10 text-risk-high border border-risk-high/20">
              Risk {caseData?.document_risk_score || 84}
            </span>
          </button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        
        {/* Audio Content Tab */}
        {activeTab === 'audio' && hasAudio && (
          <div className="space-y-6">
            <div>
              <h5 className="text-xs font-mono uppercase text-text-muted mb-2">Transcribed Voice Audio (Gemini Transcription)</h5>
              <div className="p-4 rounded-xl bg-base-void border border-base-border font-mono text-xs text-text-primary leading-relaxed whitespace-pre-wrap">
                "{caseData.audio_transcript}"
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-text-muted mb-2">Social-Engineering Language Indicators</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {caseData.audio_flags?.map((flag, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-risk-high/5 border border-risk-high/20 flex items-start space-x-2 text-xs">
                    <ShieldAlert className="w-4 h-4 text-risk-high shrink-0 mt-0.5" />
                    <span className="text-text-primary">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Image Content Tab */}
        {activeTab === 'image' && hasImage && (
          <div className="space-y-6">
            <div>
              <h5 className="text-xs font-mono uppercase text-text-muted mb-2">Visual Inspection & Inspection Breakdown</h5>
              <div className="p-4 rounded-xl bg-base-void border border-base-border text-xs text-text-primary leading-relaxed">
                {caseData.image_description}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-text-muted mb-2">Visual Phishing Indicators</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {caseData.image_flags?.map((flag, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-risk-high/5 border border-risk-high/20 flex items-start space-x-2 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-text-primary">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Document Content Tab */}
        {activeTab === 'document' && hasDoc && (
          <div className="space-y-6">
            <div>
              <h5 className="text-xs font-mono uppercase text-text-muted mb-2">Extracted Document Text & Key Clauses</h5>
              <div className="p-4 rounded-xl bg-base-void border border-base-border font-mono text-xs text-text-primary leading-relaxed whitespace-pre-wrap">
                {caseData.document_text}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-mono uppercase text-text-muted mb-2">Predatory Clause & Deceptive Payment Flags</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {caseData.document_flags?.map((flag, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-risk-high/5 border border-risk-high/20 flex items-start space-x-2 text-xs">
                    <FileText className="w-4 h-4 text-risk-high shrink-0 mt-0.5" />
                    <span className="text-text-primary">{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
