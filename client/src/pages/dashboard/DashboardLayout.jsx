import React from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  MessageSquare,
  Sparkles,
  Search,
  Wand2,
  BarChart3,
  Building2,
  Zap,
  Layers,
  Activity,
  CheckCircle2
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
      desc: 'Photo verification & disposition routing'
    },
    {
      id: 'support',
      path: '/dashboard/support',
      label: 'Multimodal Support Agent',
      badge: 'CX/Support',
      icon: MessageSquare,
      desc: 'Policy-aware resolution drafting'
    },
    {
      id: 'catalog-qa',
      path: '/dashboard/catalog-qa',
      label: 'Catalog QA / Listing Audit',
      badge: 'Merch/Ops',
      icon: Sparkles,
      desc: 'Visual conflict & attribute audit'
    },
    {
      id: 'discovery',
      path: '/dashboard/discovery',
      label: 'Visual Product Discovery',
      badge: 'Shopper/Storefront',
      icon: Search,
      desc: 'Vector similarity search engine'
    },
    {
      id: 'content-gen',
      path: '/dashboard/content-gen',
      label: 'AI Content Generation',
      badge: 'Merchandiser',
      icon: Wand2,
      desc: 'Studio cleanup & SEO copy tags'
    },
    {
      id: 'analytics',
      path: '/dashboard/analytics',
      label: 'Trend & Visual Analytics',
      badge: 'Marketing/Exec',
      icon: BarChart3,
      desc: 'Cross-surface defect & fraud trends'
    }
  ];

  // Default redirect from /dashboard to /dashboard/returns
  React.useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/returns', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] flex flex-col font-['Plus_Jakarta_Sans'] font-sans selection:bg-[#D94A26]/20 selection:text-[#D94A26]">
      
      {/* Top Header Bar — Burrito Madre Pristine Cream Light Header */}
      <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-[#EAE5DD] px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        
        {/* Left: Organization Context */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-[#F5F2EC] border border-[#E2DDD5] text-xs font-mono">
            <Building2 className="w-4 h-4 text-[#D94A26]" />
            <span className="font-extrabold text-[#1C1A17]">Apex Retail Group</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
            <span className="text-[10px] text-[#2D6A4F] uppercase tracking-wider font-bold">Enterprise Tier</span>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-[#6B665E] border-l border-[#EAE5DD] pl-4">
            <Zap className="w-3.5 h-3.5 text-[#D94A26]" />
            <span>Product Truth Graph: <span className="text-[#2D6A4F] font-bold">Synchronized</span> (768-d Vector Index)</span>
          </div>
        </div>

        {/* Right: Quick Action Indicators */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F5F2EC] border border-[#E2DDD5] text-[11px] font-mono text-[#1C1A17]">
            <Activity className="w-3.5 h-3.5 text-[#D94A26] animate-pulse" />
            <span className="font-semibold">Claude 3.7 Sonnet + Gemini Vision</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Surface Navigation Sidebar — Burrito Madre Soft Light Sidebar */}
        <aside className="w-72 bg-white border-r border-[#EAE5DD] p-4 flex flex-col justify-between shrink-0 hidden md:flex shadow-sm">
          <div className="space-y-6">
            
            {/* Navigation Header */}
            <div>
              <div className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-[#6B665E] uppercase flex items-center justify-between">
                <span>Product Truth Surfaces</span>
                <span className="text-[#D94A26] font-extrabold">6 Active</span>
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
                        ? 'bg-[#1C1A17] text-white shadow-md'
                        : 'text-[#6B665E] hover:text-[#1C1A17] hover:bg-[#F5F2EC] border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                      active ? 'bg-[#D94A26] text-white' : 'bg-[#F5F2EC] text-[#6B665E] group-hover:text-[#1C1A17]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold tracking-tight truncate leading-tight">
                          {s.label}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 font-medium ${active ? 'text-slate-300' : 'text-[#6B665E]'}`}>
                        {s.desc}
                      </p>
                      <span className={`inline-block mt-1.5 text-[9px] font-mono px-2 py-0.5 rounded-md uppercase font-semibold ${
                        active ? 'bg-white/15 text-white' : 'bg-[#EAE5DD] text-[#1C1A17]'
                      }`}>
                        {s.badge}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer — Truth Graph Lineage Status */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold">
              <span className="text-[#1C1A17] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D94A26]" /> Truth Graph Lineage
              </span>
              <span className="text-[#2D6A4F]">100%</span>
            </div>
            <p className="text-[10px] text-[#6B665E] leading-tight">
              Cross-surface evidence reconciled across catalog, returns, and support intakes.
            </p>
          </div>
        </aside>

        {/* Surface Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#FAF8F5]">
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
