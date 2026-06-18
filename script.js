// ===== NextGen FinTech — interactions =====
(function () {
  'use strict';

  // ===== Reactive hero background: animated particle network =====
  (function heroNetwork() {
    var canvas = document.querySelector('.hero-canvas');
    if (!canvas || !canvas.getContext) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // keep the static image for reduced-motion users

    var hero = canvas.closest('.hero');
    var img = hero && hero.querySelector('.hero-bg-img');
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], mouse = { x: null, y: null }, raf = null, visible = true;
    var LINK = 132, MOUSE_LINK = 190;

    function build() {
      var r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(28, Math.min(96, Math.round(W * H / 15000)));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        a = pts[i]; a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.5;
            ctx.strokeStyle = '#7cc4ff';
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (mouse.x !== null) {
          dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < MOUSE_LINK) {
            ctx.globalAlpha = (1 - d / MOUSE_LINK) * 0.75;
            ctx.strokeStyle = '#a5f3fc';
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            // gentle attraction toward the cursor
            a.vx += dx > 0 ? -0.002 : 0.002; a.vy += dy > 0 ? -0.002 : 0.002;
          }
        }
        // clamp velocity
        if (a.vx > 0.6) a.vx = 0.6; if (a.vx < -0.6) a.vx = -0.6;
        if (a.vy > 0.6) a.vy = 0.6; if (a.vy < -0.6) a.vy = -0.6;
      }
      ctx.globalAlpha = 1; ctx.fillStyle = '#cfeaff';
      for (i = 0; i < pts.length; i++) {
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf && visible) { raf = requestAnimationFrame(frame); } }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    // Pointer interaction
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', function () { mouse.x = mouse.y = null; });

    // Pause when the hero scrolls out of view (saves battery/CPU)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting; if (visible) start(); else stop();
      }, { threshold: 0 }).observe(hero);
    }

    // Debounced resize
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(build, 200); });

    if (img) { img.style.display = 'none'; } // hand off from static image to the live canvas
    build();
    start();
  })();

  // Card images: swap to a branded local fallback if the photo fails to load
  // (handled here, not via inline onerror, to stay within the strict CSP).
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function handle() {
      img.removeEventListener('error', handle);
      img.src = img.getAttribute('data-fallback');
      img.classList.add('is-fallback');
    });
    // If it already errored before this script ran, trigger the swap now.
    if (img.complete && img.naturalWidth === 0) {
      img.src = img.getAttribute('data-fallback');
      img.classList.add('is-fallback');
    }
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.card, .why-item, .about-text, .about-media, .section-head, .contact-form, .contact-info');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Current year in footer
  var yr = document.getElementById('year');
  if (yr) { yr.textContent = new Date().getFullYear(); }
})();
