/* Home page banner slider. The slides, dots and arrows are rendered by the page itself and slide on their own with CSS only.
   This script upgrades them: clickable dots and arrows, swipe, and pause while the pointer is over the banner. */
(function () {
  var DELAY = 6000;

  function init(st) {
    if (st.getAttribute('data-js')) return;
    var slides = [].slice.call(st.querySelectorAll('.gpc-hb-slide'));
    var dots = [].slice.call(st.querySelectorAll('.gpc-hb-dot'));
    if (!slides.length) return;
    // carry on from whichever slide the CSS animation is showing right now
    var cur = 0, best = -1;
    slides.forEach(function (s, k) { var o = parseFloat(getComputedStyle(s).opacity) || 0; if (o > best) { best = o; cur = k; } });
    var timer = 0, paused = false;

    function show(n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); s.setAttribute('aria-hidden', k === cur ? 'false' : 'true'); });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === cur); d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
    }
    function play() { clearInterval(timer); timer = setInterval(function () { if (!paused && !document.hidden) show(cur + 1); }, DELAY); }

    st.setAttribute('data-js', '1');
    show(cur);
    play();

    st.addEventListener('click', function (e) {
      var t = e.target instanceof Element ? e.target : null; if (!t) return;
      var d = t.closest('.gpc-hb-dot'); if (d) { show(+d.getAttribute('data-i') || 0); play(); return; }
      var a = t.closest('.gpc-hb-arrow'); if (a) { show(cur + (a.getAttribute('data-dir') === 'prev' ? -1 : 1)); play(); }
    });
    st.addEventListener('mouseenter', function () { paused = true; });
    st.addEventListener('mouseleave', function () { paused = false; });
    st.addEventListener('focusin', function () { paused = true; });
    st.addEventListener('focusout', function () { paused = false; });
    var x0 = null;
    st.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    st.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { show(cur + (dx < 0 ? 1 : -1)); play(); }
    }, { passive: true });
  }

  function scan() { var st = document.querySelector('[data-gpc-hb]'); if (st) init(st); }
  scan();
  if (document.readyState !== 'complete') window.addEventListener('load', scan);
  // the page may re-render the banner on the client: upgrade the new copy too
  try { new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();
