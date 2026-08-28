import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, FileText, ArrowLeft, RefreshCw, AlertCircle, Share2, Sparkles } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { FusionConvergenceAnimation } from '../components/FusionConvergenceAnimation';
import { RiskScoreGauge } from '../components/RiskScoreGauge';
import { CrossModalFindingsList } from '../components/CrossModalFindingsList';
import { ModalityBreakdownAccordion } from '../components/ModalityBreakdownAccordion';

export const CaseResult = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [error, setError] = useState(null);

  const fetchCaseDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get(`/cases/${id}`);
      setCaseData(res.data.case);
    } catch (err) {
      setError('Failed to retrieve case forensics dossier');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 font-mono text-text-muted">
        <Sparkles className="w-8 h-8 text-accent-primary animate-spin mx-auto" />
        <p>Retrieving forensic analysis dossier...</p>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" />
          <span>{error || 'Case not found'}</span>
        </div>
        <Link to="/dashboard" className="inline-flex items-center space-x-2 text-accent-primary text-sm font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const evidenceTypes = [];
  if (caseData.audio_transcript || caseData.audio_flags) evidenceTypes.push('audio');
  if (caseData.image_description || caseData.image_flags) evidenceTypes.push('image');
  if (caseData.document_text || caseData.document_flags) evidenceTypes.push('document');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-border pb-6">
        <div>
          <Link to="/dashboard" className="inline-flex items-center space-x-1 text-xs font-mono text-text-muted hover:text-text-primary mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case History</span>
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-heading font-bold text-text-primary">Case Forensics Dossier</h1>
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-base-surfaceRaised border border-base-border text-text-muted">
              {caseData.id}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/cases/${id}/report`}
            className="px-5 py-2.5 rounded-xl bg-accent-primary hover:bg-blue-600 text-white font-heading font-bold text-sm shadow-glow-primary flex items-center space-x-2 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Official Incident Report</span>
          </Link>
        </div>
      </div>

      {/* Signature Interaction: Fusion Convergence Animation */}
      <FusionConvergenceAnimation
        caseData={caseData}
        evidenceTypes={evidenceTypes.length > 0 ? evidenceTypes : ['audio', 'image', 'document']}
        onComplete={() => setAnimationFinished(true)}
      />

      {/* Fused Results Forensics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Score Gauge */}
        <div className="lg:col-span-1">
          <RiskScoreGauge
            score={caseData.fused_risk_score || 94}
            verdict={caseData.fused_verdict || 'high'}
          />
        </div>

        {/* Right Fused Plain-Language Explanation */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-base-border flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-primary uppercase mb-2">
              <Shield className="w-4 h-4" />
              <span>Fused Cross-Modal Forensics Reasoning</span>
            </div>
            <h3 className="font-heading font-bold text-2xl text-text-primary mb-3">
              Incident Attack Pattern Summary
            </h3>
            <p className="text-sm text-text-primary leading-relaxed">
              {caseData.fused_explanation}
            </p>
          </div>

          {caseData.context_note && (
            <div className="p-3.5 rounded-xl bg-base-void border border-base-border text-xs text-text-secondary font-mono">
              <span className="text-text-muted font-bold block mb-1">USER SUBMITTED CONTEXT:</span>
              "{caseData.context_note}"
            </div>
          )}
        </div>

      </div>

      {/* Cross-Modal Connected Findings List */}
      <CrossModalFindingsList findings={caseData.cross_modal_findings || []} />

      {/* Per-Modality Breakdown Accordion */}
      <ModalityBreakdownAccordion caseData={caseData} />

    </div>
  );
};
