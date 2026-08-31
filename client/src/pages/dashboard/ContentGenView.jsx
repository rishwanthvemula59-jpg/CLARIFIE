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
    <div className="space-y-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17]">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-xs font-mono text-[#7C3AED] font-bold">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Surface 5 • AI Catalog Content Generation</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1C1A17] font-heading">
            Raw Photo → Verified Listing Assets
          </h1>
          <p className="text-sm text-[#6B665E] font-medium leading-relaxed">
            Transform raw warehouse and return photos into studio-cleaned images, verified attribute tags, and high-converting SEO copy powered by Claude 3.7.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-[#7C3AED]">Claude 3.7</span>
          <p className="text-[10px] text-[#6B665E] font-mono mt-0.5 uppercase font-bold">SEO Copy Generator</p>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Image & Studio Processing */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17]">
              Raw Product Photo Intake
            </h2>

            <div className="border-2 border-dashed border-[#E2DDD5] hover:border-[#7C3AED] rounded-2xl p-8 text-center bg-[#FAF8F5] transition-all cursor-pointer group">
              <UploadCloud className="w-10 h-10 text-[#7C3AED] mx-auto group-hover:scale-110 transition-transform mb-3" />
              <p className="text-xs font-bold text-[#1C1A17]">Upload Raw Warehouse Photo</p>
              <p className="text-[11px] text-[#6B665E] mt-1 font-medium">Background removal & studio lighting applied</p>
            </div>
          </div>
        </div>

        {/* Right: Generated Copy & Attribute Tags */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17]">
                Generated SEO Copy & Attributes
              </h2>
              <button className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE5DD] border border-[#E2DDD5] text-[#1C1A17] text-xs font-mono font-bold flex items-center space-x-1.5 transition-all">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2">
                <span className="text-[10px] font-mono text-[#7C3AED] uppercase font-bold">Optimized Title</span>
                <p className="text-sm font-bold text-[#1C1A17]">{generatedText.title}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2">
                <span className="text-[10px] font-mono text-[#7C3AED] uppercase font-bold">SEO Description</span>
                <p className="text-xs text-[#6B665E] leading-relaxed font-medium">{generatedText.seoDescription}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2">
                <span className="text-[10px] font-mono text-[#7C3AED] uppercase font-bold">Extracted Verified Attributes</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {generatedText.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-mono font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 rounded-2xl bg-[#1C1A17] hover:bg-[#2c2925] text-white font-extrabold text-xs transition-all shadow-md uppercase tracking-wider">
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
