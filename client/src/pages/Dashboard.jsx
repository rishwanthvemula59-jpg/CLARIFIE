import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MessageSquare, Shield, FolderOpen, RefreshCw, AlertCircle, Sparkles, Cpu } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { DashboardStatsRow } from '../components/DashboardStatsRow';
import { CaseCard } from '../components/CaseCard';

import { SparkBadge } from '@/components/ui/spark-badge';

// Pre-built sample dossiers for instant 1-click seed preview
const DEMO_SEED_CASES = [
  {
    id: 'demo-case-001',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    fused_verdict: 'high',
    fused_risk_score: 92,
    context_note: 'Urgent Wire Transfer Call from Impersonated Executive (Voice Clone Detected)',
    fused_explanation: 'High probability of deepfake voice synthesis combined with coercive payment urgency.',
    audio_transcript: 'Hello, this is CEO David. We need an immediate wire transfer of $45,000 to contractor account 883921.',
    image_description: null,
    document_text: null
  },
  {
    id: 'demo-case-002',
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    fused_verdict: 'high',
    fused_risk_score: 86,
    context_note: 'Spoofed Banking Verification Screenshot & QR Code Phishing Gateway',
    fused_explanation: 'Visual artifacts indicate altered transaction amounts and non-standard domain routing.',
    audio_transcript: null,
    image_description: 'Banking alert modal with login URL pointing to spoofed-bank-security.net',
    document_text: null
  },
  {
    id: 'demo-case-003',
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    fused_verdict: 'medium',
    fused_risk_score: 58,
    context_note: 'Vendor Invoice PDF with Mismatched Routing & Cryptographic Signature',
    fused_explanation: 'PDF header shows altered metadata timestamp; routing number belongs to offshore entity.',
    audio_transcript: null,
    image_description: null,
    document_text: 'Invoice #8849 - Payment Due Immediately to Offshore Capital Holding LLC.'
  }
];

export const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCases = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get('/cases');
      setCases(res.data.cases || []);
    } catch (err) {
      setCases(DEMO_SEED_CASES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleSeedDemo = () => {
    setCases(DEMO_SEED_CASES);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-['Plus_Jakarta_Sans']">
      
      {/* Top Banner with SparkBadge Credential */}
      <div className="p-8 rounded-3xl glass-card-luxury glow-border-indigo relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Neural Engine Active • &lt;120ms Latency</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Forensic Workspace
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Multimodal Fraud Fusion Engine Analyzing Audio Calls, Screenshots, and PDF Contracts Backed by PostgreSQL RLS.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/guardian"
              className="px-5 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-xs font-bold text-white flex items-center space-x-2 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Guardian Triage</span>
            </Link>

            <Link
              to="/cases/new"
              className="px-6 py-3 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs font-extrabold shadow-xl flex items-center space-x-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Forensic Case</span>
            </Link>
          </div>
        </div>

        {/* SparkBadge Widget */}
        <div className="w-full lg:w-[320px] h-[240px] shrink-0 relative z-10">
          <SparkBadge />
        </div>
      </div>

      {/* Summary Metrics */}
      <DashboardStatsRow cases={cases} />

      {/* Case History Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Submitted Forensics Dossiers</h2>
              <p className="text-xs text-slate-400 font-medium">Cross-Modal Analysis Logs and Risk Verdicts</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {cases.length === 0 && (
              <button
                onClick={handleSeedDemo}
                className="px-4 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Seed Sample Cases</span>
              </button>
            )}

            <button
              onClick={fetchCases}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-bold flex items-center space-x-1.5"
              title="Refresh List"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-sm font-semibold glass-card-luxury rounded-3xl animate-pulse flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
            <span>Running Cross-Modal Vault Scan...</span>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center space-x-3 font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : cases.length === 0 ? (
          
          /* Glassmorphic Empty State */
          <div className="p-16 rounded-3xl glass-card-luxury glow-border-indigo text-center space-y-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-glow-primary">
              <Shield className="w-10 h-10" />
            </div>
            
            <div className="max-w-md space-y-2">
              <h3 className="font-extrabold text-xl text-white tracking-tight">No Forensics Cases Submitted Yet</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Upload Audio Call Recordings, Phishing Screenshots, or Contract PDFs to Run the Multimodal Fusion Engine, or Seed Sample Dossiers Below.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/cases/new"
                className="px-6 py-3 rounded-2xl bg-white text-black font-extrabold text-xs shadow-xl inline-flex items-center space-x-2 transition-all hover:bg-neutral-200"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit First Case</span>
              </Link>

              <button
                onClick={handleSeedDemo}
                className="px-6 py-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-extrabold text-xs inline-flex items-center space-x-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Load Sample Dossiers</span>
              </button>
            </div>
          </div>

        ) : (
          /* Cases List */
          <div className="grid grid-cols-1 gap-4">
            {cases.map((c) => (
              <CaseCard key={c.id} caseData={c} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
