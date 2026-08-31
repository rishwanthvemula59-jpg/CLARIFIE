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
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ReturnsTriageView } from './ReturnsTriageView';
import { SupportAgentView } from './SupportAgentView';
import { CatalogQAView } from './CatalogQAView';
import { VisualDiscoveryView } from './VisualDiscoveryView';
import { ContentGenView } from './ContentGenView';
import { TrendAnalyticsView } from './TrendAnalyticsView';

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const getDisplayName = (u) => {
    if (!u) return 'Operator';
    if (u.username) return u.username;
    if (u.email) return u.email.split('@')[0];
    return 'Operator';
  };

  const displayName = getDisplayName(user);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1A17] flex flex-col font-['Plus_Jakarta_Sans'] font-sans selection:bg-[#D94A26]/20 selection:text-[#D94A26]">
      
      {/* Single Clean Header Bar */}
      <header className="h-16 bg-white border-b border-[#EAE5DD] px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        
        {/* Left: Brand Logo & Organization Context */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/assets/logo_white.png" 
              alt="CLARIFIE" 
              className="h-7 w-auto object-contain bg-[#1C1A17] p-1.5 rounded-xl shadow-sm" 
            />
            <span className="font-heading font-extrabold text-base tracking-tight text-[#1C1A17] uppercase">
              CLARIFIE
            </span>
          </Link>

          <div className="h-5 w-px bg-[#EAE5DD] hidden sm:block" />

          <div className="flex items-center space-x-2.5 px-3 py-1 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs font-mono">
            <Building2 className="w-3.5 h-3.5 text-[#D94A26]" />
            <span className="font-extrabold text-[#1C1A17]">Apex Retail Group</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
          </div>
        </div>

        {/* Center: System Status */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-[#6B665E]">
          <Zap className="w-3.5 h-3.5 text-[#D94A26]" />
          <span>Product Truth Graph: <span className="text-[#2D6A4F] font-bold">Synchronized</span> (768-d Vector Index)</span>
        </div>

        {/* Right: User Avatar & Sign Out */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
            <div className="w-6 h-6 rounded-full bg-[#1C1A17] text-white flex items-center justify-center font-bold text-xs font-mono">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-[#1C1A17] max-w-[120px] truncate">{displayName}</span>
          </div>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="p-2 rounded-xl text-[#6B665E] hover:text-[#D94A26] hover:bg-[#FFF5F3] transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Surface Navigation Sidebar */}
        <aside className="w-64 bg-white border-r border-[#EAE5DD] p-4 flex flex-col justify-between shrink-0 hidden md:flex shadow-sm">
          <div className="space-y-6">
            
            <div className="px-2 text-[10px] font-mono font-bold tracking-widest text-[#6B665E] uppercase flex items-center justify-between">
              <span>Surfaces</span>
              <span className="text-[#D94A26] font-extrabold">6 Active</span>
            </div>

            {/* Navigation Item List */}
            <nav className="space-y-1">
              {SURFACES.map((s) => {
                const Icon = s.icon;
                const active = location.pathname.startsWith(s.path);
                return (
                  <Link
                    key={s.id}
                    to={s.path}
                    className={`group relative flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                      active
                        ? 'bg-[#1C1A17] text-white shadow-sm'
                        : 'text-[#6B665E] hover:text-[#1C1A17] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      active ? 'bg-[#D94A26] text-white' : 'bg-[#FAF8F5] text-[#6B665E] group-hover:text-[#1C1A17]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold tracking-tight block truncate">
                        {s.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between font-bold">
              <span className="text-[#1C1A17] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D94A26]" /> Truth Graph
              </span>
              <span className="text-[#2D6A4F]">100%</span>
            </div>
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
