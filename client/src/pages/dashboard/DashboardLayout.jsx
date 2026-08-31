import React, { useState } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  MessageSquare,
  Sparkles,
  Search,
  Wand2,
  BarChart3,
  Building2,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { ReturnsTriageView } from './ReturnsTriageView';
import { SupportAgentView } from './SupportAgentView';
import { CatalogQAView } from './CatalogQAView';
import { VisualDiscoveryView } from './VisualDiscoveryView';
import { ContentGenView } from './ContentGenView';
import { TrendAnalyticsView } from './TrendAnalyticsView';

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const SURFACES = [
    {
      id: 'returns',
      path: '/dashboard/returns',
      label: 'Returns & Damage Triage',
      badge: 'Warehouse/Ops',
      icon: RotateCcw,
      accent: 'emerald',
      desc: 'Photo verification & disposition routing'
    },
    {
      id: 'support',
      path: '/dashboard/support',
      label: 'Multimodal Support Agent',
      badge: 'CX/Support',
      icon: MessageSquare,
      accent: 'cyan',
      desc: 'Policy-aware resolution drafting'
    },
    {
      id: 'catalog-qa',
      path: '/dashboard/catalog-qa',
      label: 'Catalog QA / Listing Audit',
      badge: 'Merch/Ops',
      icon: Sparkles,
      accent: 'amber',
      desc: 'Visual conflict & attribute audit'
    },
    {
      id: 'discovery',
      path: '/dashboard/discovery',
      label: 'Visual Product Discovery',
      badge: 'Shopper/Storefront',
      icon: Search,
      accent: 'indigo',
      desc: 'Vector similarity search engine'
    },
    {
      id: 'content-gen',
      path: '/dashboard/content-gen',
      label: 'AI Content Generation',
      badge: 'Merchandiser',
      icon: Wand2,
      accent: 'purple',
      desc: 'Studio cleanup & SEO copy tags'
    },
    {
      id: 'analytics',
      path: '/dashboard/analytics',
      label: 'Trend & Visual Analytics',
      badge: 'Marketing/Exec',
      icon: BarChart3,
      accent: 'rose',
      desc: 'Cross-surface defect & fraud trends'
    }
  ];

  // Default redirect from /dashboard to /dashboard/returns
  React.useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/returns', { replace: true });
    }
  }, [location.pathname, navigate]);

  const activeSurface = SURFACES.find(s => location.pathname.startsWith(s.path)) || SURFACES[0];

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-['Plus_Jakarta_Sans'] font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header Bar */}
      <header className="h-16 bg-black/80 backdrop-blur-2xl border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Organization Context */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-extrabold text-white">Apex Retail Group</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">Enterprise Tier</span>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-slate-400 border-l border-white/10 pl-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Product Truth Graph: <span className="text-emerald-400 font-bold">Synchronized</span> (768-d Vector Index)</span>
          </div>
        </div>

        {/* Right: Quick Action Indicators */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Claude 3.7 Sonnet + Gemini Vision Active</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Surface Navigation Sidebar */}
        <aside className="w-72 bg-black/60 backdrop-blur-2xl border-r border-white/10 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-6">
            
            {/* Navigation Header */}
            <div>
              <div className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center justify-between">
                <span>Product Truth Surfaces</span>
                <span className="text-cyan-400 font-extrabold">6 Active</span>
              </div>
            </div>

            {/* Navigation Item List */}
            <nav className="space-y-1.5">
              {SURFACES.map((s) => {
                const Icon = s.icon;
                const active = location.pathname.startsWith(s.path);
                return (
                  <Link
                    key={s.id}
                    to={s.path}
                    className={`group relative flex items-start space-x-3 p-3 rounded-2xl transition-all duration-200 ${
                      active
                        ? 'bg-white/[0.08] text-white border border-white/20 shadow-xl'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                      active ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-slate-400 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold tracking-tight truncate leading-tight">
                          {s.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">
                        {s.desc}
                      </p>
                      <span className="inline-block mt-1.5 text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 uppercase font-semibold">
                        {s.badge}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer — Truth Graph Lineage Status */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Truth Graph Lineage
              </span>
              <span className="text-emerald-400">100%</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-tight">
              Cross-surface evidence reconciled across catalog, returns, and support intakes.
            </p>
          </div>
        </aside>

        {/* Surface Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gradient-to-b from-black/40 to-black">
          <Routes>
            <Route path="returns" element={<ReturnsTriageView />} />
            <Route path="support" element={<SupportAgentView />} />
            <Route path="catalog-qa" element={<CatalogQAView />} />
            <Route path="discovery" element={<VisualDiscoveryView />} />
            <Route path="content-gen" element={<ContentGenView />} />
            <Route path="analytics" element={<TrendAnalyticsView />} />
          </Routes>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
