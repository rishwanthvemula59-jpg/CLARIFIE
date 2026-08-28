import React, { useState, useLayoutEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const SignalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const cardInRef = useRef(null);
  const heroRef = useRef(null);
  const paneRef = useRef(null);
  const photoRef = useRef(null);

  useLayoutEffect(() => {
    const REF_W = 1464;
    const PANE_W = 628;
    const CARD_W = 613;
    const CARD_H = 922;
    const CONTENT_H = 697;
    const IMG_W = 1177;
    const IMG_H = 1336;
    const IMG_REF_SCALE = 836 / 1177;
    const PANE_RATIO = PANE_W / REF_W;
    const HERO_W = 681;
    const RAMP_HI = 1280;
    const RAMP_LO = 1000;
    const PHOTO_MIN = 0.42;

    const clearInline = () => {
      if (photoRef.current) photoRef.current.style.cssText = '';
      if (paneRef.current) paneRef.current.style.cssText = '';
      if (cardRef.current) cardRef.current.style.cssText = '';
      if (cardInRef.current) cardInRef.current.style.cssText = '';
      if (heroRef.current) heroRef.current.style.cssText = '';
    };

    const photoRatio = (vw) => {
      if (vw >= RAMP_HI) return 1 - PANE_RATIO;
      if (vw >= RAMP_LO) return PHOTO_MIN + ((vw - RAMP_LO) / (RAMP_HI - RAMP_LO)) * ((1 - PANE_RATIO) - PHOTO_MIN);
      return PHOTO_MIN;
    };

    const layout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      clearInline();

      if (vw >= 700) {
        const pr = photoRatio(vw);
        const pw = Math.round(vw * pr);
        const paneW = vw - pw;

        if (photoRef.current) photoRef.current.style.width = pw + 'px';
        if (paneRef.current) {
          paneRef.current.style.left = pw + 'px';
          paneRef.current.style.width = paneW + 'px';
        }

        const cs = Math.min(paneW / PANE_W, vh / CONTENT_H);
        const gapL = Math.round(1 * cs);
        const mT = Math.round(14 * cs);
        const mB = Math.round(13 * cs);
        var mR = Math.round(14 * cs);
        var cw = Math.max(CARD_W * cs, paneW - gapL - mR);
        var ch = vh - mT - mB;

        if (cardRef.current) {
          cardRef.current.style.left = gapL + 'px';
          cardRef.current.style.top = mT + 'px';
          cardRef.current.style.width = cw + 'px';
          cardRef.current.style.height = ch + 'px';
          cardRef.current.style.borderRadius = Math.round(26 * cs) + 'px';
        }

        if (cardInRef.current) {
          cardInRef.current.style.transform = 'translate(' + Math.round((cw - CARD_W * cs) / 2) + 'px,0) scale(' + cs + ')';
        }

        var imgScale = Math.max(pw / IMG_W, vh / IMG_H);
        var s = Math.min(imgScale / IMG_REF_SCALE, (pw * 0.92) / HERO_W);
        if (heroRef.current) {
          heroRef.current.style.transform = 'scale(' + s + ')';
          heroRef.current.style.transformOrigin = 'left bottom';
          heroRef.current.style.bottom = '0';
        }
      }
    };

    window.addEventListener('resize', layout, { passive: true });
    window.addEventListener('orientationchange', layout);
    layout();

    return () => {
      window.removeEventListener('resize', layout);
      window.removeEventListener('orientationchange', layout);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#fefefe] text-black antialiased font-sans select-none">
      <div className="stage relative w-full h-full overflow-hidden">
        
        {/* Left Falcon Video Panel */}
        <section ref={photoRef} className="photo absolute left-0 top-0 h-full w-[57.1038%] overflow-hidden">
          <video
            className="photo-img photo-img--tall absolute inset-0 w-full h-full object-cover object-[100%_50%] block"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4"
              type="video/mp4"
            />
          </video>
          
          <video
            className="photo-img photo-img--wide hidden absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_052122_e77a27e6-17f1-4794-889b-3ceaa0e9e8cb.mp4"
              type="video/mp4"
            />
          </video>

          <div className="hero absolute left-0 bottom-0 w-[836px] h-[949px] origin-left-bottom pointer-events-none" ref={heroRef}>
            {/* Badge */}
            <div className="badge absolute left-[34px] top-[684px] inline-flex items-center gap-[10px] h-[37px] px-[16px] pl-[15px] rounded-full bg-[#2f2a27] backdrop-blur-[7px] shadow-lg text-white text-[13.6px] font-bold tracking-wider uppercase whitespace-nowrap pointer-events-auto">
              <img src="/assets/logo_white.png" alt="Clarifie Logo" className="h-5 w-auto object-contain shrink-0" />
              <span>BUILT FOR FAST-MOVING TEAMS</span>
            </div>

            {/* Headlines */}
            <div className="hl-wrap absolute inset-0 pointer-events-none">
              <span className="hl absolute left-[33px] top-[750.02px] text-[69.14px] tracking-[-1.936px] font-extrabold text-black leading-none uppercase whitespace-nowrap">
                FIND SIGNAL TO ACTION
              </span>
              <span className="hl absolute left-[32px] top-[831.01px] text-[68.95px] tracking-[-1.931px] font-extrabold text-black leading-none uppercase whitespace-nowrap">
                INSTANTLY
              </span>
            </div>
          </div>
        </section>

        {/* Right Glass Pane */}
        <section ref={paneRef} className="pane absolute left-[57.1038%] right-0 top-0 bottom-0">
          <div ref={cardRef} className="card absolute left-[1px] top-[14px] w-[613px] h-[922px] rounded-[26px] overflow-hidden bg-white/90 backdrop-blur-[28px] border border-black/[0.036] shadow-2xl">
            <form onSubmit={handleSubmit} ref={cardInRef} className="card-in absolute inset-0 w-[613px] h-[922px] origin-left-top">
              
              {/* Heading */}
              <h1 className="col absolute left-[62px] top-[235px] w-[488px] text-center font-extrabold text-[40px] tracking-[-2px] text-[#2c3343] leading-none uppercase">
                WELCOME BACK!
              </h1>
              <p className="col absolute left-[62px] top-[290px] w-[488px] text-center text-[18px] tracking-[-0.2px] text-[#797979] uppercase font-semibold">
                <b className="font-extrabold text-black">LOG IN</b> TO CONTINUE MONITORING YOUR SIGNALS
              </p>

              {/* Error Banner */}
              {error && (
                <div className="absolute left-[62px] top-[326px] w-[489px] p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs text-center font-mono font-bold uppercase">
                  {error}
                </div>
              )}

              {/* Input: Email */}
              <div className="field absolute left-[62px] top-[365px] w-[489px] h-[61px] rounded-[12px] bg-[#fafafa] border-[1.5px] border-[#acacae] flex items-center">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  placeholder="Eg. johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full border-none bg-transparent px-[19px] text-[15.68px] tracking-[-0.188px] text-black outline-none placeholder-[#606060]"
                />
              </div>

              {/* Input: Password */}
              <div className="field absolute left-[62px] top-[440px] w-[489px] h-[59px] rounded-[12px] bg-[#f9f9f9] border-none flex items-center">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  aria-label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full border-none bg-transparent px-[19px] text-[17.29px] tracking-[-0.698px] text-black outline-none placeholder-[#606060]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="absolute left-[62px] top-[525px] w-[489px] h-[65.5px] rounded-full border-none cursor-pointer bg-gradient-to-b from-[#283139] to-[#293340] text-white flex items-center justify-center gap-[10px] pl-[-12px] pr-[4px] shadow-lg text-[16px] font-extrabold uppercase tracking-wider hover:brightness-110 active:translate-y-[1px] transition-all disabled:opacity-50"
              >
                <span>{loading ? 'AUTHENTICATING...' : 'LOG IN'}</span>
                <svg width="13.2" height="13.2" viewBox="0 0 22 22">
                  <path d="M3 11h15.4M11 3.3l7.7 7.7-7.7 7.7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Footer */}
              <p className="absolute left-[62px] top-[615px] w-[489px] text-center text-[15px] tracking-tight text-[#0a0a0a] font-semibold uppercase">
                DON'T HAVE AN ACCOUNT?{' '}
                <Link to="/register" className="font-extrabold text-black underline underline-offset-4 decoration-2">
                  START FREE
                </Link>
              </p>

            </form>
          </div>
        </section>

      </div>
    </div>
  );
};
