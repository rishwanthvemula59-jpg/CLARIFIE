export const SPARK_BADGE_MARKUP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: transparent; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; color: #fff; }
    #canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.5; }
    .badge-card {
      position: relative; z-index: 10;
      width: clamp(260px, 85%, 380px);
      padding: 24px;
      border-radius: 24px;
      background: rgba(18, 18, 24, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 255, 255, 0.05);
      display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px;
      animation: float 4s ease-in-out infinite;
    }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    .logo-ring {
      width: 64px; height: 64px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(18,18,24,0.85) 100%);
      border: 1px solid rgba(255,255,255,0.25);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }
    .logo-ring img { width: 36px; height: 36px; object-fit: contain; }
    .title { font-size: 18px; font-weight: 800; letter-spacing: -0.02em; text-transform: uppercase; color: #fff; }
    .subtitle { font-size: 11px; font-family: monospace; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
    .status-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 12px; border-radius: 999px;
      background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399; font-size: 10px; font-family: monospace; font-weight: 700; text-transform: uppercase;
    }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <div class="badge-card">
    <div class="logo-ring">
      <img src="/assets/logo_white.png" alt="CLARIFIE">
    </div>
    <div>
      <div class="title">CLARIFIE FUSION v1.0</div>
      <div class="subtitle">VERIFIED FORENSIC ENGINE</div>
    </div>
    <div class="status-pill">
      <span class="dot"></span>
      <span>PROTECTED MULTIMODAL VAULT</span>
    </div>
  </div>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      sy: Math.random() * 2 + 1,
      o: Math.random() * 0.5 + 0.2
    }));
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.sy;
        if (p.y > height) { p.y = 0; p.x = Math.random() * width; }
      });
      requestAnimationFrame(draw);
    }
    draw();
    window.onresize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
  </script>
</body>
</html>`;
