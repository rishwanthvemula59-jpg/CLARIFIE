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
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-black to-black border border-indigo-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 font-bold">
            <Search className="w-3.5 h-3.5" />
            <span>Surface 4 • Visual Product Discovery Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading">
            pgvector Similarity Search
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Upload any unedited real-world photo or screenshot to instantly search catalog items using 768-dimensional CLIP/SigLIP vector embeddings.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center shrink-0 min-w-[140px]">
          <span className="text-2xl font-mono font-extrabold text-indigo-400">768-d</span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">pgvector Index</p>
        </div>
      </div>

      {/* Main Grid: Query Dropzone & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
              Upload Query Photo
            </h2>
            <div className="border-2 border-dashed border-white/20 hover:border-indigo-500/50 rounded-2xl p-8 text-center bg-black/40 transition-all cursor-pointer group">
              <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto group-hover:scale-110 transition-transform mb-3" />
              <p className="text-xs font-bold text-white">Drop Photo or Screenshot Here</p>
              <p className="text-[11px] text-slate-400 mt-1">Queries against all verified evidence vectors</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
              Vector Similarity Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_MATCHES.map((match) => (
                <div key={match.sku} className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <img src={match.image} alt={match.title} className="w-full h-40 object-cover rounded-xl border border-white/10" />
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-indigo-400 font-bold">{match.sku}</span>
                      <span className="text-emerald-400 font-extrabold">{Math.round(match.similarityScore * 100)}% Match</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{match.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{match.price}</p>
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
