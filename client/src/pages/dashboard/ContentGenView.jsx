import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Copy,
  Tag,
  RefreshCw,
  FileText
} from 'lucide-react';

export const ContentGenView = () => {
  const [generatedText, setGeneratedText] = useState({
    title: 'Tactical Chronograph Watch v2 — Matte Obsidian Edition',
    seoDescription: 'Engineered for high-intensity operations, the Tactical Chronograph Watch v2 features a high-grade fluororubber strap, matte obsidian casing, and 100m water resistance. Verified by warehouse ground-truth inspection.',
    tags: ['Tactical', 'Chronograph', 'Waterproof', 'Obsidian', 'Fluororubber']
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-black to-black border border-purple-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 font-bold">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Surface 5 • AI Catalog Content Generation</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            Raw Photo → Verified Listing Assets
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Transform raw warehouse and return photos into studio-cleaned images, verified attribute tags, and high-converting SEO copy powered by Claude 3.7.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-purple-400">Claude 3.7</span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">SEO Copy Generator</p>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Image & Studio Processing */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
              Raw Product Photo Intake
            </h2>

            <div className="border-2 border-dashed border-white/20 hover:border-purple-500/50 rounded-2xl p-8 text-center bg-black/40 transition-all cursor-pointer group">
              <UploadCloud className="w-10 h-10 text-purple-400 mx-auto group-hover:scale-110 transition-transform mb-3" />
              <p className="text-xs font-bold text-white">Upload Raw Warehouse Photo</p>
              <p className="text-[11px] text-slate-400 mt-1">Background removal & studio lighting applied</p>
            </div>
          </div>
        </div>

        {/* Right: Generated Copy & Attribute Tags */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
                Generated SEO Copy & Attributes
              </h2>
              <button className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Optimized Title</span>
                <p className="text-sm font-bold text-white">{generatedText.title}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">SEO Description</span>
                <p className="text-xs text-slate-300 leading-relaxed">{generatedText.seoDescription}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Extracted Verified Attributes</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {generatedText.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 text-black font-extrabold text-xs transition-all shadow-xl uppercase tracking-wider">
                Approve & Publish to Store Catalog
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContentGenView;
