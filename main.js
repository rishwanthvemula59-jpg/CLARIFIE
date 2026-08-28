/* ==========================================================================
   Intelligence Designed To Evolve — Forensic Single-Viewport Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Stat Counter Animation (easeOutCubic, IntersectionObserver)
  // =========================================================================
  const stats = [
    { id: 'stat-0', target: 120, decimals: 0, prefix: '', suffix: 'ms' },
    { id: 'stat-1', target: 99.99, decimals: 2, prefix: '', suffix: '%' },
    { id: 'stat-2', target: 24, decimals: 0, prefix: '', suffix: '/7' },
    { id: 'stat-3', target: 2.4, decimals: 1, prefix: '', suffix: 'M' }
  ];

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateStat(stat, index) {
    const el = document.getElementById(stat.id);
    if (!el) return;

    const duration = 1500 + index * 80;
    const delay = 480 + index * 90;

    setTimeout(() => {
      let startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const currentValue = (stat.target * easedProgress).toFixed(stat.decimals);
        el.textContent = `${stat.prefix}${currentValue}${stat.suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${stat.prefix}${stat.target.toFixed(stat.decimals)}${stat.suffix}`;
        }
      }

      requestAnimationFrame(step);
    }, delay);
  }

  const statsContainer = document.querySelector('.stats-grid');
  if (statsContainer) {
    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            stats.forEach((stat, i) => animateStat(stat, i));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(statsContainer);
  }

  // =========================================================================
  // 2. Video Scrub Completion Redirect to Login Page
  // =========================================================================
  const bgVideo = document.querySelector('.bg-video');
  let hasRedirected = false;

  function redirectToLogin() {
    if (hasRedirected) return;
    hasRedirected = true;
    window.location.href = '/client/index.html#/login';
  }

  if (bgVideo) {
    bgVideo.addEventListener('ended', redirectToLogin);
  }

  // Handle wheel / touch scrub completion
  let scrubProgress = 0;
  const maxScrub = 1800;

  window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      scrubProgress += e.deltaY;
      if (scrubProgress >= maxScrub) {
        redirectToLogin();
      }
    }
  }, { passive: true });

  // =========================================================================
  // 3. Mobile Menu & Drawer Controller
  // =========================================================================
  const burger = document.querySelector('.mobile-burger');
  const overlay = document.querySelector('.mobile-overlay');
  const sheet = document.querySelector('.mobile-sheet');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sign-in');

  function openMenu() {
    document.body.classList.add('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (overlay) {
      overlay.removeAttribute('hidden');
      overlay.classList.add('active');
    }
    if (sheet) {
      sheet.removeAttribute('hidden');
      sheet.classList.add('active');
    }
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.setAttribute('hidden', 'true'), 280);
    }
    if (sheet) {
      sheet.classList.remove('active');
      setTimeout(() => sheet.setAttribute('hidden', 'true'), 380);
    }
  }

  if (burger) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = document.body.classList.contains('menu-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

});
