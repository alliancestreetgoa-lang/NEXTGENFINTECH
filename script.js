// ===== NextGen FinTech — interactions =====
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header: add shadow state once the page is scrolled
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Active nav: mark the link matching the current page
  (function activeNav() {
    var here = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '/') || '/';
    var file = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var target = a.getAttribute('href') || '';
      if (target.charAt(0) === '#' || /^https?:|^mailto:|^tel:/.test(target)) return;
      var targetFile = target.split('#')[0].split('/').pop() || 'index.html';
      if (targetFile === file && file !== 'index.html') {
        a.setAttribute('aria-current', 'page');
      }
    });
  })();

  // Mobile nav drawer
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
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveals (robust, CSS-class based). Parallax / counters / progress
  // bar / smooth-scroll are layered on top by gsap-init.js, which touches only
  // child images, hero-stats, and the progress bar — never these elements — so
  // the two systems never fight over opacity/transform.
  var revealEls = document.querySelectorAll(
    '.svc-item, .svc-row, .why-item, .step, .value, .about-text, .about-media,' +
    ' .section-head, .contact-form, .contact-info, .cta-inner'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      var batch = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      batch.forEach(function (entry, i) {
        var el = entry.target;
        var delay = Math.min(i, 5) * 55;
        if (delay) {
          el.style.transitionDelay = delay + 'ms';
          setTimeout(function () { el.style.transitionDelay = ''; }, delay + 900);
        }
        el.classList.add('in');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Current year in footer
  var yr = document.getElementById('year');
  if (yr) { yr.textContent = new Date().getFullYear(); }
})();
