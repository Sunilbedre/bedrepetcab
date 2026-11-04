/* Home page colour options (for the client to compare). Adds a small switcher to the home page only.
   ?theme=a | b | c | d | e  picks an option (shareable link); no parameter = the current colours. The choice is remembered in this browser. */
(function () {
  var KEY = 'gpcTheme';
  var OPTIONS = [
    ['', 'Current', '#052d49', '#0e7396'],
    ['a', 'A · Fresh teal', '#102a43', '#159a9c'],
    ['b', 'B · Navy & gold', '#0b1f3a', '#b7791f'],
    ['c', 'C · Forest & orange', '#0f3d2e', '#1e8e6a'],
    ['d', 'D · Dark', '#0b1626', '#18a1a3'],
    ['e', 'E · Ivory & gold', '#174c4c', '#c4a66a']
  ];

  function current() {
    var t = '';
    try { t = new URLSearchParams(location.search).get('theme') || ''; } catch (e) {}
    if (!t) { try { t = localStorage.getItem(KEY) || ''; } catch (e) {} }
    return /^(a|b|c|d|e)$/.test(t) ? t : '';
  }
  function apply(t) {
    if (t) document.body.setAttribute('data-gpc-theme', t); else document.body.removeAttribute('data-gpc-theme');
    try { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch (e) {}
    try { var u = new URL(location.href); if (t) u.searchParams.set('theme', t); else u.searchParams.delete('theme'); history.replaceState(null, '', u.toString()); } catch (e) {}
    var bar = document.getElementById('gpc-theme-bar');
    if (bar) [].forEach.call(bar.querySelectorAll('button'), function (b) { b.classList.toggle('on', b.getAttribute('data-t') === t); });
  }

  function mount() {
    var home = document.querySelector('.gpc-hb');
    var bar = document.getElementById('gpc-theme-bar');
    if (!home) { if (bar) bar.remove(); return; }
    if (bar) return;
    bar = document.createElement('div');
    bar.id = 'gpc-theme-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Colour options');
    bar.innerHTML = '<span class="gtb-l">Colour options</span>' + OPTIONS.map(function (o) {
      return '<button type="button" data-t="' + o[0] + '"><i style="background:linear-gradient(135deg,' + o[2] + ' 50%,' + o[3] + ' 50%)"></i>' + o[1] + '</button>';
    }).join('');
    bar.addEventListener('click', function (e) { var b = e.target instanceof Element && e.target.closest('button'); if (b) apply(b.getAttribute('data-t') || ''); });
    document.body.appendChild(bar);
    apply(current());
  }

  var css = document.createElement('style');
  css.textContent = '#gpc-theme-bar{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;flex-wrap:wrap;justify-content:center;gap:.35rem;max-width:calc(100vw - 1rem);padding:.4rem .5rem;border-radius:999px;background:rgba(255,255,255,.96);box-shadow:0 14px 40px -12px rgba(0,0,0,.45);border:1px solid rgba(0,0,0,.08);font:600 .78rem/1 system-ui,sans-serif;color:#1f2937}' +
    '#gpc-theme-bar .gtb-l{padding:0 .5rem;color:#6b7280;font-weight:700}' +
    '#gpc-theme-bar button{display:inline-flex;align-items:center;gap:.4rem;padding:.45rem .75rem;border:1.5px solid transparent;border-radius:999px;background:#f3f4f6;font:inherit;color:inherit;cursor:pointer}' +
    '#gpc-theme-bar button:hover{background:#e5e7eb}#gpc-theme-bar button.on{border-color:#111827;background:#fff}' +
    '#gpc-theme-bar i{width:1rem;height:1rem;border-radius:999px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}' +
    '@media (max-width:767px){#gpc-theme-bar{bottom:5.2rem;border-radius:1rem}#gpc-theme-bar .gtb-l{width:100%;text-align:center;padding:.1rem 0 .3rem}}';
  document.head.appendChild(css);

  mount();
  try { new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();
