import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, MessageSquare, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide global navbar on landing page when unauthenticated AND on dashboard routes (DashboardLayout renders its own unified header)
  if ((!isAuthenticated && location.pathname === '/') || location.pathname.startsWith('/dashboard')) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  // Format username nicely for clean executive display
  const getDisplayUsername = (u) => {
    if (!u) return 'Operator';
    if (u.username) return u.username;
    if (u.email) {
      const handle = u.email.split('@')[0];
      const cleanName = handle.replace(/[0-9_.]/g, '');
      if (cleanName.length >= 3) {
        return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      }
      return handle;
    }
    return 'Operator';
  };

  const displayName = getDisplayUsername(user);

  return (
    <header className="sticky top-0 z-50 w-full transition-all font-['Plus_Jakarta_Sans'] bg-black/90 backdrop-blur-2xl border-b border-white/10 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group shrink-0">
          <img 
            src="/assets/logo_white.png" 
            alt="CLARIFIE" 
            className="h-8 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="font-heading font-extrabold text-lg tracking-tight text-white uppercase">CLARIFIE</span>
        </Link>

        {/* Center: Navigation Control */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center p-1 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/dashboard')
                  ? 'bg-white/10 text-white border border-white/20 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/cases/new"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/cases/new')
                  ? 'bg-white/10 text-white border border-white/20 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Case</span>
            </Link>

            <Link
              to="/guardian"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/guardian')
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Guardian Triage</span>
            </Link>

            <Link
              to="/patterns"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/patterns')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-md'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Scam Patterns</span>
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center p-1 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
            <Link
              to="/guardian"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/guardian')
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Guardian Triage</span>
            </Link>

            <Link
              to="/patterns"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/patterns')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-md'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Scam Patterns</span>
            </Link>
          </nav>
        )}

        {/* Right: User Actions */}
        <div className="flex items-center space-x-3 shrink-0">
          {isAuthenticated ? (
            /* Only user identity pill — no extra buttons cluttering the right */
            <div className="hidden sm:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-mono cursor-pointer group"
              onClick={() => { logout(); navigate('/'); }}
              title="Click to sign out"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 font-extrabold text-[11px]">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white max-w-[140px] truncate leading-tight tracking-tight text-sm group-hover:text-rose-300 transition-colors">
                  {displayName}
                </span>
                <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Operator
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-white text-xs sm:text-sm font-bold tracking-wide hover:text-neutral-300 transition-colors px-3 py-2"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-white text-black text-xs sm:text-sm font-extrabold rounded-full px-5 py-2 hover:bg-neutral-200 transition-all shadow-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
