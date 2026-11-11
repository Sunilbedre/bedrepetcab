/* /pet-import-cost-uae: pet import cost calculator (vanilla JS). Rates come from "GPC Dubai Rate Card.xlsx" (AED).
   Pick how the pet travels, the airline (cargo only) and the pets: the fee breakdown and total update live.
   Styled with the .gb-* classes of the booking pages plus .gc-* below. */
(function () {
  var WA = '971501234567';

  /* ---- rate card (AED). Per pet group: import permit and MOCCAE release fee. ---- */
  var PETS = [
    { id: 'dog1', label: '1 dog', permit: 200, release: 500 },
    { id: 'dog2', label: '2 dogs', permit: 400, release: 1000 },
    { id: 'cat1', label: '1 cat', permit: 200, release: 250 },
    { id: 'cat2', label: '2 cats', permit: 400, release: 500 },
    { id: 'mix', label: '1 cat + 1 dog', permit: 400, release: 750 }
  ];
  /* extra lines per option: a number (same for every group) or an object keyed by pet group */
  var OPTIONS = [
    { id: 'private', mode: 'private', name: 'Private jet', sub: 'Private arrivals into DXB or AUH', service: 800, route: 'Private jet to Dubai or Abu Dhabi', extra: [] },
    { id: 'cabin', mode: 'cabin', name: 'In-cabin', sub: 'Pet travels with you, into Abu Dhabi (AUH)', service: 680, route: 'In-cabin to Abu Dhabi (AUH)', extra: [['Bill of entry', { dog1: 260, dog2: 520, cat1: 260, cat2: 520, mix: 520 }]] },
    { id: 'cargo-ek', mode: 'cargo', name: 'Emirates', sub: 'Cargo into Dubai (DXB)', service: 1200, route: 'Emirates cargo to Dubai (DXB)', extra: [['Delivery order', 209], ['Customs', 190]] },
    { id: 'cargo-ot', mode: 'cargo', name: 'Other airlines', sub: 'Cargo into Dubai (DXB)', service: 1200, route: 'Other airlines cargo to Dubai (DXB)', extra: [['Delivery order + Danata', { dog1: 710, dog2: 960, cat1: 710, cat2: 960, mix: 1000 }]] },
    { id: 'cargo-auh', mode: 'cargo', name: 'Any airline', sub: 'Cargo into Abu Dhabi (AUH)', service: 1200, route: 'Cargo to Abu Dhabi (AUH)', extra: [['Delivery order + customs', 763]] }
  ];
  var MODES = [
    { id: 'cargo', ic: '✈️', name: 'Airline cargo', sub: 'Pet flies in the cargo hold, you travel separately' },
    { id: 'cabin', ic: '🧳', name: 'In-cabin', sub: 'Pet flies with you in the cabin' },
    { id: 'private', ic: '🛩️', name: 'Private jet', sub: 'Door-to-door on a private flight' }
  ];

  function opt(id) { return OPTIONS.filter(function (o) { return o.id === id; })[0]; }
  function pet(id) { return PETS.filter(function (p) { return p.id === id; })[0]; }
  function val(v, pid) { return typeof v === 'object' ? v[pid] : v; }
  function calc(oid, pid) {
    var o = opt(oid), p = pet(pid), lines = [['Import permit', p.permit], ['MOCCAE release fee', p.release]];
    o.extra.forEach(function (x) { lines.push([x[0], val(x[1], pid)]); });
    var govt = lines.reduce(function (a, l) { return a + l[1]; }, 0);
    lines.push(['Global Pet Cab service fee', o.service]);
    return { lines: lines, govt: govt, total: govt + o.service };
  }
  function aed(n) { return 'AED ' + n.toLocaleString('en-US'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var S = { mode: 'cargo', cargo: 'cargo-ek', pet: 'dog1' };
  function current() { return S.mode === 'cargo' ? S.cargo : S.mode; }

  function render(root) {
    var oid = current(), o = opt(oid), r = calc(oid, S.pet), p = pet(S.pet);
    var h = '<div class="gb-grid"><div class="gb-card gc-form">';
    h += '<h2 class="gc-h">1. How is your pet travelling?</h2><div class="gb-rides gc-modes">' + MODES.map(function (m) {
      return '<button type="button" class="gb-ride' + (S.mode === m.id ? ' on' : '') + '" data-mode="' + m.id + '"><span class="ic">' + m.ic + '</span><b>' + m.name + '</b><small>' + m.sub + '</small></button>';
    }).join('') + '</div>';
    if (S.mode === 'cargo') {
      h += '<h2 class="gc-h">2. Airline and arrival airport</h2><div class="gb-seg">' + OPTIONS.filter(function (x) { return x.mode === 'cargo'; }).map(function (x) {
        return '<button type="button" class="' + (S.cargo === x.id ? 'on' : '') + '" data-cargo="' + x.id + '">' + x.name + '<br><small>' + x.sub + '</small></button>';
      }).join('') + '</div>';
    } else {
      h += '<p class="gb-note">' + esc(o.sub) + '. Prices below are for this route.</p>';
    }
    h += '<h2 class="gc-h">' + (S.mode === 'cargo' ? '3' : '2') + '. Your pets</h2><div class="gb-seg">' + PETS.map(function (x) {
      return '<button type="button" class="' + (S.pet === x.id ? 'on' : '') + '" data-pet="' + x.id + '">' + x.label + '</button>';
    }).join('') + '</div>';
    h += '<p class="gb-help">Travelling with 3 or more pets? <a href="https://wa.me/' + WA + '?text=' + encodeURIComponent('Hi, I would like a pet import quote for 3 or more pets.') + '" target="_blank" rel="noopener noreferrer">Message us for a custom quote</a>.</p>';
    h += '</div>';

    h += '<aside class="gb-side"><div class="gb-quote"><div class="gb-q-h"><span>Your estimate</span><em>' + esc(p.label) + '</em></div>';
    h += '<div class="gb-q-t">' + aed(r.total) + '</div><div class="gb-q-d">' + esc(o.route) + '</div><ul class="gb-q-l">';
    r.lines.forEach(function (l) { h += '<li><span>' + esc(l[0]) + '</span><b>' + aed(l[1]) + '</b></li>'; });
    h += '</ul><div class="gb-q-v"><span>Government and airport costs</span><b>' + aed(r.govt) + '</b></div>';
    h += '<p class="gb-q-n">Indicative estimate in AED. Final price is confirmed by our team once we know your route, dates and pet details.</p>';
    var msg = 'Hi Global Pet Cab, I would like to bring ' + p.label + ' into the UAE (' + o.route + '). Estimate: ' + aed(r.total) + '. Please confirm and advise next steps.';
    h += '<a class="gb-btn wa gc-cta" href="https://wa.me/' + WA + '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener noreferrer">Confirm on WhatsApp</a></div></aside></div>';

    /* full rate table for the chosen pets */
    h += '<section class="gb-card gc-table"><h2 class="gc-h">Compare every route for ' + esc(p.label) + '</h2><div class="gc-scroll"><table><thead><tr><th>Route</th><th>Permit + release</th><th>Airport and customs</th><th>Service fee</th><th>Total</th></tr></thead><tbody>';
    OPTIONS.forEach(function (x) {
      var c = calc(x.id, S.pet), pr = p.permit + p.release;
      h += '<tr class="' + (x.id === oid ? 'on' : '') + '" data-row="' + x.id + '"><td>' + esc(x.route) + '</td><td>' + aed(pr) + '</td><td>' + aed(c.govt - pr) + '</td><td>' + aed(x.service) + '</td><td><b>' + aed(c.total) + '</b></td></tr>';
    });
    h += '</tbody></table></div><p class="gb-note">Tap a row to see its full breakdown. Private-jet and in-cabin prices are for arrivals into the airports shown; neighbouring-emirate delivery can be quoted on request.</p></section>';
    root.innerHTML = h;
  }

  function onClick(e) {
    var t = e.target instanceof Element ? e.target.closest('[data-mode],[data-cargo],[data-pet],[data-row]') : null;
    if (!t) return;
    if (t.hasAttribute('data-mode')) S.mode = t.getAttribute('data-mode');
    else if (t.hasAttribute('data-cargo')) S.cargo = t.getAttribute('data-cargo');
    else if (t.hasAttribute('data-pet')) S.pet = t.getAttribute('data-pet');
    else if (t.hasAttribute('data-row')) { var o = opt(t.getAttribute('data-row')); S.mode = o.mode; if (o.mode === 'cargo') S.cargo = o.id; }
    render(this);
  }

  function mount() {
    var root = document.getElementById('gpc-cost-root');
    if (!root || root.getAttribute('data-gc')) return;
    root.setAttribute('data-gc', '1');
    root.addEventListener('click', onClick);
    render(root);
  }
  var armed = false;
  function arm() { armed = true; mount(); }
  if (document.readyState === 'complete') setTimeout(arm, 300); else window.addEventListener('load', function () { setTimeout(arm, 500); });
  new MutationObserver(function () { if (!armed) return; var r = document.getElementById('gpc-cost-root'); if (r && !r.getAttribute('data-gc')) mount(); }).observe(document.documentElement, { childList: true, subtree: true });
})();
