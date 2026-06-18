// ===== NextGen FinTech — GSAP ScrollTrigger effects =====
// Owns scroll reveals, hero + image parallax, and stat counters.
// Degrades safely: if GSAP is missing or reduced-motion is set, content stays visible.
(function () {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);
  if (window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

  /* ---------- 0 · Scroll progress bar ---------- */
  var bar = document.querySelector('.scroll-progress');
  if (bar) {
    gsap.to(bar, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });
  }

  /* ---------- 0b · Smooth in-page scrolling ---------- */
  if (window.ScrollToPlugin) {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        gsap.to(window, { duration: 0.8, ease: 'power2.inOut', scrollTo: { y: target, offsetY: 72 } });
      });
    });
  }

  /* The hero monogram is locked to the viewport via CSS (position: fixed);
     no parallax on it or the headline — content scrolls up past the fixed logo. */

  /* ---------- 2 · Card image parallax ---------- */
  gsap.utils.toArray('.svc-thumb img, .why-thumb img').forEach(function (img) {
    gsap.fromTo(img,
      { yPercent: -5 },
      {
        yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  });

  /* Section reveals are handled by script.js (IntersectionObserver + CSS). */

  /* Hero stats are shown as their real values (5+, 8, 100%) — no count-up.
     The scroll-triggered counter proved unreliable (competing tweens left the
     numbers stuck mid-count), and the numbers must always read correctly. */

  /* Recalculate positions once fonts/images have settled. */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
