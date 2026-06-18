// ===== NextGen FinTech — interactions =====
(function () {
  'use strict';

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
