import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SecurifyHero() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-['Plus_Jakarta_Sans'] text-white antialiased">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      {/* Fully Transparent Header - Logo on Left, Log In & Sign Up on Right */}
      <header className="absolute z-20 px-6 md:px-12 pt-8 top-0 left-0 right-0 bg-transparent border-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3.5 hover:opacity-90 transition-opacity">
            <img 
              src="/assets/logo_white.png" 
              alt="CLARIFIE" 
              className="h-9 w-auto object-contain flex-shrink-0 drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]" 
            />
            <span className="text-white text-2xl font-extrabold tracking-wider uppercase font-heading drop-shadow-md">
              CLARIFIE
            </span>
          </Link>

          {/* Right: Log In & Sign Up */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-white text-black text-xs sm:text-sm font-extrabold rounded-full px-6 py-2.5 hover:bg-neutral-200 transition-all inline-block shadow-lg uppercase tracking-wider"
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={logout}
                  className="text-white/80 text-xs sm:text-sm font-bold uppercase hover:text-rose-400 transition-colors px-3 py-2 tracking-wider"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white text-xs sm:text-sm font-bold tracking-wide hover:text-neutral-300 transition-colors px-4 py-2"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black text-xs sm:text-sm font-extrabold rounded-full px-6 py-2.5 hover:bg-neutral-200 transition-all inline-block shadow-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-6 md:p-12 pt-28 pointer-events-none">
        
        {/* Hero Huge Display Headline */}
        <div className="my-auto space-y-5 max-w-5xl pointer-events-auto">
          {/* Autonomous Fraud Fusion Active Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-mono text-blue-300 font-bold backdrop-blur-xl shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="uppercase tracking-widest text-[11px]">AUTONOMOUS FRAUD FUSION ACTIVE</span>
          </div>

          <h1 className="hero-title text-6xl sm:text-8xl lg:text-[9.5rem] font-black tracking-tighter leading-[0.88] select-none uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            <span className="text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.25)]">EXPOSE</span> <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-slate-100 via-blue-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              SCAM VECTORS
            </span>
          </h1>

          <div className="glass-panel-luxury p-5 rounded-3xl max-w-lg border border-white/10 shadow-2xl backdrop-blur-2xl">
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Multimodal Intelligence Fusing Telephonic Audio, Screenshot Artifacts, and Contracts to Stop Fraud in Real Time.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
