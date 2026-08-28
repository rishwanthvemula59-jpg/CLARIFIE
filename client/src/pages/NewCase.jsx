import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Cpu, XCircle } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { EvidenceUploadZone } from '../components/EvidenceUploadZone';

export const NewCase = () => {
  const [files, setFiles] = useState({
    audio: null,
    image: null,
    document: null
  });
  const [contextNote, setContextNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFileSelect = (type, file) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
    if (error) setError(null);
  };

  const handleFileRemove = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!files.audio && !files.image && !files.document) {
      setError('Invalid input: Please attach at least ONE valid evidence file (Audio call, Screenshot, or PDF document).');
      return;
    }

    if (contextNote && contextNote.trim().length > 0) {
      const trimmed = contextNote.trim();
      const vowels = trimmed.match(/[aeiouyAEIOUY]/g);
      if (/^(.)\1+$/.test(trimmed) || (!vowels && trimmed.length > 5 && !trimmed.includes(' '))) {
        setError('Invalid input in incident note: Unrecognizable text pattern or keyboard mash detected. Please describe the incident in clear words.');
        return;
      }
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (files.audio) formData.append('audio', files.audio);
      if (files.image) formData.append('image', files.image);
      if (files.document) formData.append('document', files.document);
      if (contextNote) formData.append('contextNote', contextNote);

      const res = await axiosClient.post('/cases', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const caseId = res.data.case?.id;
      if (caseId) {
        navigate(`/cases/${caseId}`);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid input or submission failed. Please verify files and details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 font-['Plus_Jakarta_Sans']">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Multi-Evidence Forensic Submission</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">Submit Suspected Scam Incident</h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Upload up to 3 modalities for unified AI fusion. Clarifie cross-correlates audio, vision, and legal text artifacts.
          </p>
        </div>
      </div>

      {/* Error Alert Pill */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-3">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-white ml-4">✕</button>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Evidence Upload Zone - passes files + handlers correctly */}
        <EvidenceUploadZone
          files={files}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
        />

        {/* Optional Context Note */}
        <div className="space-y-3 p-6 rounded-3xl border border-white/10 bg-zinc-950">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Operator Incident Notes (Optional)</span>
          </label>
          <textarea
            value={contextNote}
            onChange={(e) => {
              setContextNote(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Add context e.g. 'Caller posed as Amazon security stating my credit card was charged $1,200...' "
            rows={3}
            className="w-full bg-black border border-white/15 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-white text-black font-extrabold text-xs hover:bg-neutral-200 transition-all flex items-center space-x-2 shadow-2xl disabled:opacity-50 uppercase tracking-wider"
          >
            {loading ? (
              <span>Running Multimodal Fusion Engine...</span>
            ) : (
              <>
                <span>Run Forensics Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
