import React, { useRef } from 'react';
import { Mic, FileImage, FileText, Upload, X, Check, AlertCircle } from 'lucide-react';

export const EvidenceUploadZone = ({ files, onFileSelect, onFileRemove }) => {
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);

  const handleFile = (type, file) => {
    if (!file) return;
    onFileSelect(type, file);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const hasAnyFile = files.audio || files.image || files.document;

  const cardBase = "glass-stat-card rounded-2xl p-5 border-dashed border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between h-56 overflow-hidden relative group";

  return (
    <div className="space-y-4">
      {/* Upload Zone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Audio Upload Card */}
        <div
          onClick={() => !files.audio && audioInputRef.current?.click()}
          className={`${cardBase} ${files.audio ? 'border-blue-500/60 bg-blue-500/5' : 'border-white/10 hover:border-blue-400/40 hover:bg-blue-500/5'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 to-transparent pointer-events-none" />
          <input
            type="file"
            ref={audioInputRef}
            accept="audio/mp3,audio/wav,audio/m4a,audio/aac"
            className="hidden"
            onChange={(e) => handleFile('audio', e.target.files[0])}
          />

          <div className="flex items-start justify-between relative z-10">
            <div className={`p-3 rounded-xl backdrop-blur-sm ${files.audio ? 'bg-blue-500/25 border border-blue-400/40 text-blue-300' : 'bg-white/5 border border-white/10 text-blue-400'}`}>
              <Mic className="w-6 h-6" />
            </div>
            {files.audio ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onFileRemove('audio'); }}
                className="p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-red-400 hover:bg-red-500/15 transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">MAX 25MB</span>
            )}
          </div>

          <div className="relative z-10">
            <h4 className="font-heading font-bold text-white text-sm">Audio Evidence</h4>
            <p className="text-xs text-slate-400 mt-1 leading-tight">Phone calls, voicemails (MP3, WAV, M4A)</p>
          </div>

          <div className="relative z-10">
            {files.audio ? (
              <div className="p-2.5 rounded-xl bg-black/40 border border-blue-400/30 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate text-xs font-mono">
                  <p className="truncate font-bold text-white">{files.audio.name}</p>
                  <p className="text-[10px] text-slate-400">{formatSize(files.audio.size)}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-mono text-blue-400">
                <Upload className="w-3.5 h-3.5" />
                <span>Click or Drop Audio</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Image Upload Card */}
        <div
          onClick={() => !files.image && imageInputRef.current?.click()}
          className={`${cardBase} ${files.image ? 'border-indigo-500/60 bg-indigo-500/5' : 'border-white/10 hover:border-indigo-400/40 hover:bg-indigo-500/5'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/6 to-transparent pointer-events-none" />
          <input
            type="file"
            ref={imageInputRef}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={(e) => handleFile('image', e.target.files[0])}
          />

          <div className="flex items-start justify-between relative z-10">
            <div className={`p-3 rounded-xl backdrop-blur-sm ${files.image ? 'bg-indigo-500/25 border border-indigo-400/40 text-indigo-300' : 'bg-white/5 border border-white/10 text-indigo-400'}`}>
              <FileImage className="w-6 h-6" />
            </div>
            {files.image ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onFileRemove('image'); }}
                className="p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-red-400 hover:bg-red-500/15 transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">MAX 10MB</span>
            )}
          </div>

          <div className="relative z-10">
            <h4 className="font-heading font-bold text-white text-sm">Image / Screenshot</h4>
            <p className="text-xs text-slate-400 mt-1 leading-tight">SMS, phishing pages, QR codes (PNG, JPG)</p>
          </div>

          <div className="relative z-10">
            {files.image ? (
              <div className="p-2.5 rounded-xl bg-black/40 border border-indigo-400/30 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate text-xs font-mono">
                  <p className="truncate font-bold text-white">{files.image.name}</p>
                  <p className="text-[10px] text-slate-400">{formatSize(files.image.size)}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400">
                <Upload className="w-3.5 h-3.5" />
                <span>Click or Drop Screenshot</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Document Upload Card */}
        <div
          onClick={() => !files.document && docInputRef.current?.click()}
          className={`${cardBase} ${files.document ? 'border-emerald-500/60 bg-emerald-500/5' : 'border-white/10 hover:border-emerald-400/40 hover:bg-emerald-500/5'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/6 to-transparent pointer-events-none" />
          <input
            type="file"
            ref={docInputRef}
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFile('document', e.target.files[0])}
          />

          <div className="flex items-start justify-between relative z-10">
            <div className={`p-3 rounded-xl backdrop-blur-sm ${files.document ? 'bg-emerald-500/25 border border-emerald-400/40 text-emerald-300' : 'bg-white/5 border border-white/10 text-emerald-400'}`}>
              <FileText className="w-6 h-6" />
            </div>
            {files.document ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onFileRemove('document'); }}
                className="p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-red-400 hover:bg-red-500/15 transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">MAX 15MB</span>
            )}
          </div>

          <div className="relative z-10">
            <h4 className="font-heading font-bold text-white text-sm">Document PDF</h4>
            <p className="text-xs text-slate-400 mt-1 leading-tight">Contracts, invoices, legal notices (PDF)</p>
          </div>

          <div className="relative z-10">
            {files.document ? (
              <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-400/30 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate text-xs font-mono">
                  <p className="truncate font-bold text-white">{files.document.name}</p>
                  <p className="text-[10px] text-slate-400">{formatSize(files.document.size)}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                <Upload className="w-3.5 h-3.5" />
                <span>Click or Drop PDF Document</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Upload Requirement Alert Banner */}
      <div className={`p-3 rounded-xl flex items-center space-x-2 text-xs font-mono border backdrop-blur-sm ${
        hasAnyFile
          ? 'bg-emerald-500/8 border-emerald-500/25 text-emerald-400'
          : 'bg-amber-500/8 border-amber-500/25 text-amber-400'
      }`}>
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>
          {hasAnyFile
            ? 'At least one evidence modality is ready. Upload additional modalities for deeper cross-channel correlation.'
            : 'At least ONE evidence modality (Audio, Screenshot, or PDF) is required to run the Fusion Engine.'}
        </span>
      </div>
    </div>
  );
};
