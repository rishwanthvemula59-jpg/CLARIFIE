import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mic, FileText, ArrowRight, Zap, Eye, CheckCircle2, Activity, Scan, Lock } from 'lucide-react';
import SecurifyHero from '@/components/ui/SecurifyHero';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black font-['Plus_Jakarta_Sans']">
      
      {/* 1. Securify Hero */}
      <SecurifyHero />

      {/* 2. Multimodal Fusion Engine Pillars */}
      <section className="relative z-10 py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-cyan-300 font-bold backdrop-blur-xl shadow-xl">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="uppercase tracking-widest text-[11px]">MULTIMODAL FUSION ENGINE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase font-heading">
            Unified Threat Forensics Across 3 Modalities
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            Clarifie Integrates Google Gemini AI Inference with PostgreSQL RLS to Instantly Isolate Fraudulent Behavior Before Financial Loss Occurs.
          </p>
        </div>

        {/* 3 Ultra-Realistic Forensic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Telephonic Speech Analysis */}
          <div className="group relative rounded-3xl p-8 glass-card-luxury transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/60 via-black to-black hover:border-cyan-500/40">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
            
            <div>
              {/* Card Header & Live Telemetry Pill */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/10">
                  <Mic className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>48kHz AUDIO STREAM</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight font-heading">
                Telephonic Speech Analysis
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                Analyzes live phone call audio & transcripts for voice cloning, coercive stress patterns, and social engineering cues.
              </p>

              {/* Realistic Audio Waveform Visualizer Preview Box */}
              <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 font-mono text-[11px]">
                <div className="flex items-center justify-between text-cyan-300 font-bold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>AUDIO SPECTROGRAM</span>
                  </span>
                  <span className="text-emerald-400 text-[10px]">VERIFIED CLEAN</span>
                </div>
                {/* Simulated Audio Bars */}
                <div className="flex items-end gap-1 h-10 py-1 px-2 bg-black/60 rounded-xl border border-white/5">
                  {[40, 75, 30, 90, 60, 100, 45, 80, 55, 35, 85, 50, 95, 40, 70, 60, 85, 30, 65, 90].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-cyan-600 to-sky-300 rounded-t-sm transition-all duration-300" 
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-semibold">
                  <span>CLONE RATIO: &lt;0.02%</span>
                  <span>STRESS: NORMAL</span>
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-xs font-bold text-slate-300 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Deepfake Voice Detection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Urgency Sentiment Score</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Screenshot Artifact Inspection */}
          <div className="group relative rounded-3xl p-8 glass-card-luxury transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/60 via-black to-black hover:border-indigo-500/40">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
            
            <div>
              {/* Card Header & Live Telemetry Pill */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/10">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span>4K VISION OCR</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight font-heading">
                Screenshot Artifact Inspection
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                Inspects banking screenshots, QR codes, SMS messages, and fake payment gateway popups using vision OCR.
              </p>

              {/* Realistic Vision OCR Bounding Box Preview Box */}
              <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 font-mono text-[11px]">
                <div className="flex items-center justify-between text-indigo-300 font-bold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Scan className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                    <span>VISION BOUNDING BOX</span>
                  </span>
                  <span className="text-emerald-400 text-[10px]">ACCURACY 99.4%</span>
                </div>
                {/* Simulated Bounding Scanner Frame */}
                <div className="relative h-10 py-2 px-3 bg-black/60 rounded-xl border border-dashed border-indigo-400/40 flex items-center justify-between overflow-hidden">
                  <span className="text-[10px] text-slate-200 font-bold tracking-wider">[OCR: BANKING_PAYMENT_GATEWAY]</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold border border-indigo-400/30">PASSED</span>
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-semibold">
                  <span>RES: 3840x2160</span>
                  <span>SPOOF UI: NONE</span>
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-xs font-bold text-slate-300 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>OCR Text Extraction</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Fake UI Element Verification</span>
              </li>
            </ul>
          </div>

          {/* Card 3: PDF Contracts & Documents */}
          <div className="group relative rounded-3xl p-8 glass-card-luxury transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/60 via-black to-black hover:border-emerald-500/40">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
            
            <div>
              {/* Card Header & Live Telemetry Pill */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/10">
                  <FileText className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SHA-256 IMMUTABLE</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight font-heading">
                Contract & Document Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                Scans PDF legal agreements, wire instructions, and invoices for spoofed headers and signature tampering.
              </p>

              {/* Realistic Cryptographic Hash Verification Preview Box */}
              <div className="mb-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 font-mono text-[11px]">
                <div className="flex items-center justify-between text-emerald-300 font-bold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>HASH INTEGRITY TRACE</span>
                  </span>
                  <span className="text-emerald-400 text-[10px]">VERIFIED HASH</span>
                </div>
                {/* Simulated Cryptographic Hash String */}
                <div className="h-10 py-2 px-3 bg-black/60 rounded-xl border border-white/10 flex items-center justify-between overflow-hidden">
                  <span className="text-[10px] text-emerald-200/90 font-mono truncate">0x7f83b1657ff1...99a0e1</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30 shrink-0">VALID</span>
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-semibold">
                  <span>HEADER: SPOOF FREE</span>
                  <span>SIGNATURE: AUTHENTIC</span>
                </div>
              </div>
            </div>

            <ul className="space-y-3 text-xs font-bold text-slate-300 pt-4 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PDF Header Spoofing Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cryptographic Hash Trace</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Guardian Mode Interactive Banner */}
      <section className="relative z-10 py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 md:p-14 glass-card-luxury flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl border border-white/15 bg-gradient-to-r from-zinc-900/90 via-black to-zinc-950/90">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>REAL-TIME GUARDIAN TRIAGE</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
              Instant Scam Vector Assessment in &lt;120ms
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
              Launch Guardian Mode to query our live multimodal engine or submit your evidence directly to our forensics dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/guardian"
                className="px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-2xl uppercase tracking-wider"
              >
                <span>Launch Guardian Mode</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="px-8 py-4 rounded-2xl bg-zinc-900/90 border border-white/15 text-white font-bold text-xs hover:bg-zinc-800 transition-all text-center uppercase tracking-wider"
              >
                {isAuthenticated ? "Go to Dashboard" : "Sign In to Workspace"}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
