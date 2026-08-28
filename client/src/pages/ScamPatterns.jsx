import React, { useState, useEffect } from 'react';
import { Database, AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { SparkBadge } from '@/components/ui/spark-badge';

export const ScamPatterns = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatterns = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/patterns');
      setPatterns(res.data.patterns || []);
    } catch (err) {
      console.warn('Failed to load patterns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatterns();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 font-['Plus_Jakarta_Sans']">
      
      {/* Header Banner with SparkBadge */}
      <div className="p-8 rounded-3xl glass-card-luxury glow-border-amber relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
            <Database className="w-3.5 h-3.5" />
            <span>Cross-User Threat Signature Database</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Scam Pattern Library</h1>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Anonymized fraud signature clusters recognized across independent user dossiers in real time.
          </p>

          <div className="pt-2">
            <button
              onClick={fetchPatterns}
              className="px-5 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-all text-xs font-bold flex items-center space-x-2 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Database</span>
            </button>
          </div>
        </div>

        {/* SparkBadge Widget */}
        <div className="w-full lg:w-[280px] h-[200px] shrink-0 relative z-10">
          <SparkBadge />
        </div>
      </div>

      {/* Pattern Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 font-semibold text-sm glass-card-luxury rounded-3xl animate-pulse">
          Querying Cross-User Threat Database Signatures...
        </div>
      ) : patterns.length === 0 ? (
        <div className="p-16 rounded-3xl glass-card-luxury text-center text-slate-400 text-sm font-medium border border-white/10">
          No threat signatures cataloged yet. Submit forensic dossiers to generate cross-user fraud clusters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patterns.map((pat) => (
            <div key={pat.id} className="p-7 rounded-3xl glass-card-luxury glow-border-amber space-y-4 hover:scale-[1.01] transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-extrabold flex items-center gap-1.5 shadow-sm">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{pat.occurrence_count} Matches Reported</span>
                </span>
                <span className="text-xs font-mono text-slate-400 font-medium">
                  Last Seen: {new Date(pat.last_seen || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <p className="text-base font-semibold text-white leading-relaxed font-sans">
                "{pat.signature_text}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-semibold">Signature Hash: #{pat.id.slice(0, 8)}</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Shield className="w-3.5 h-3.5" /> Anonymized & Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
