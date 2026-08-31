import React, { useState } from 'react';
import {
  Search,
  UploadCloud,
  Layers,
  Sparkles,
  ArrowRight,
  Zap,
  Tag
} from 'lucide-react';

export const VisualDiscoveryView = () => {
  const MOCK_MATCHES = [
    {
      sku: 'SKU-APX-8901',
      title: 'Tactical Chronograph Watch v2',
      similarityScore: 0.98,
      price: '$349.00',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      matchReason: '98% vector embedding match across fluororubber strap & matte bezel geometry.'
    },
    {
      sku: 'SKU-APX-4420',
      title: 'UltraLight Trail Running Shoe',
      similarityScore: 0.89,
      price: '$189.00',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      matchReason: '89% visual similarity match against return photo database.'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] text-[#1C1A17]">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono text-[#2563EB] font-bold">
            <Search className="w-3.5 h-3.5" />
            <span>Surface 4 • Visual Product Discovery Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1C1A17] font-heading">
            pgvector Similarity Search
          </h1>
          <p className="text-sm text-[#6B665E] font-medium leading-relaxed">
            Upload any unedited real-world photo or screenshot to instantly search catalog items using 768-dimensional CLIP/SigLIP vector embeddings.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-[#2563EB]">768-d</span>
          <p className="text-[10px] text-[#6B665E] font-mono mt-0.5 uppercase font-bold">pgvector Index</p>
        </div>
      </div>

      {/* Main Grid: Query Dropzone & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17]">
              Upload Query Photo
            </h2>
            <div className="border-2 border-dashed border-[#E2DDD5] hover:border-[#2563EB] rounded-2xl p-8 text-center bg-[#FAF8F5] transition-all cursor-pointer group">
              <UploadCloud className="w-10 h-10 text-[#2563EB] mx-auto group-hover:scale-110 transition-transform mb-3" />
              <p className="text-xs font-bold text-[#1C1A17]">Drop Photo or Screenshot Here</p>
              <p className="text-[11px] text-[#6B665E] mt-1 font-medium">Queries against all verified evidence vectors</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-sm space-y-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1C1A17]">
              Vector Similarity Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_MATCHES.map((match) => (
                <div key={match.sku} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3">
                  <img src={match.image} alt={match.title} className="w-full h-40 object-cover rounded-xl border border-[#E2DDD5]" />
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#2563EB] font-bold">{match.sku}</span>
                      <span className="text-[#2D6A4F] font-extrabold">{Math.round(match.similarityScore * 100)}% Match</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1C1A17] mt-1">{match.title}</h3>
                    <p className="text-xs text-[#6B665E] mt-1 font-mono">{match.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VisualDiscoveryView;
