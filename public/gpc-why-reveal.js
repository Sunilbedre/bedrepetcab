/* /why-global-pet-cab: criss-cross reveal. A card only starts offset once this script has tagged it (data-pre), so without JS the cards stay visible.
   The page re-renders on the client, which replaces the card elements, so new ones are picked up as they appear. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var SEL = 'main article[class*="lg:grid-cols-12"]';
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.setAttribute('data-in', '1'); io.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  function scan() {
    document.querySelectorAll(SEL).forEach(function (c) {
      if (c.hasAttribute('data-pre') || c.hasAttribute('data-in')) return;
      var r = c.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) { c.setAttribute('data-in', '1'); return; }
      c.setAttribute('data-pre', '1');
      io.observe(c);
    });
  }
  var t;
  new MutationObserver(function () { clearTimeout(t); t = setTimeout(scan, 60); }).observe(document.body, { childList: true, subtree: true });
  scan();
})();
