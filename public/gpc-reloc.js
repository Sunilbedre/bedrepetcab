/* /book-pet-relocation-from-dubai and /book-pet-relocation-to-dubai: two-screen relocation enquiry (vanilla JS, no build step).
   Screen 1 = route and pet, screen 2 = health questions and contact details. The request is saved through POST /api/international/enquiry.
   Styled with the .gb-* classes of the pet taxi booking page. The page re-renders on the client, so the form mounts whenever #gpc-reloc-root appears. */
(function () {
  var WA_NUMBER = '971501234567'; // placeholder: replace with the real WhatsApp number
  var STEPS = ['Route & pet', 'Health & contact'];
  var YNS = [['Yes', 'Yes'], ['No', 'No'], ['Not Sure', 'Not sure']];

  var S = null, DIR = 'from_dubai';

  function fresh() {
    var out = DIR === 'from_dubai';
    return { step: 0, err: '', sending: false, done: null,
      oCountry: out ? 'United Arab Emirates' : '', oCity: out ? 'Dubai' : '', dCountry: out ? '' : 'United Arab Emirates', dCity: out ? '' : 'Dubai',
      date: '', petType: 'Dog', petName: '', breed: '', weight: '', micro: 'Yes', vacc: 'Yes', rabies: 'Yes', crate: 'Not Sure',
      name: '', phone: '', wa: '', email: '', notes: '' };
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }

  function field(id, label, html, hint) { return '<div class="gb-f"><label for="' + id + '">' + label + '</label>' + html + (hint ? '<small>' + hint + '</small>' : '') + '</div>'; }
  function input(id, val, ph, extra) { return '<input id="' + id + '" data-k="' + id + '" value="' + esc(val) + '" placeholder="' + esc(ph || '') + '" ' + (extra || '') + '>'; }
  function select(id, val, opts) { return '<select id="' + id + '" data-k="' + id + '">' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  function place(id, val, ph, scope) { return '<div class="gb-pl"><input id="' + id + '" data-k="' + id + '" data-place="' + scope + '" autocomplete="off" value="' + esc(val) + '" placeholder="' + esc(ph) + '"><ul class="gb-sug" hidden></ul></div>'; }
  function fixed(label, value) { return '<div class="gb-f"><label>' + label + '</label><div class="gb-fixed">' + esc(value) + '</div></div>'; }

  function stepper() {
    return '<ol class="gb-steps gb-steps2">' + STEPS.map(function (n, i) { return '<li data-step="' + i + '" tabindex="0" role="button" class="' + (i === S.step ? 'on' : i < S.step ? 'done' : '') + '"><span>' + (i < S.step ? '✓' : i + 1) + '</span><em>' + n + '</em></li>'; }).join('') + '</ol>';
  }

  function stepRoute() {
    var out = DIR === 'from_dubai';
    var h = '<h2>' + (out ? 'Where is your pet going?' : 'Where is your pet coming from?') + '</h2><p class="gb-sub">' + (out ? 'Tell us the destination and your pet. We check the import rules of that country for you.' : 'Tell us the starting point and your pet. We take care of the UAE import permit and arrival.') + '</p>';
    if (out) h += fixed('From', 'Dubai, United Arab Emirates') + '<div class="gb-two">' + field('dCountry', 'Destination country <i>*</i>', place('dCountry', S.dCountry, 'Start typing a country', 'country')) + field('dCity', 'Destination city <i>*</i>', place('dCity', S.dCity, 'Start typing a city', 'city')) + '</div>';
    else h += '<div class="gb-two">' + field('oCountry', 'Country your pet is in <i>*</i>', place('oCountry', S.oCountry, 'Start typing a country', 'country')) + field('oCity', 'City <i>*</i>', place('oCity', S.oCity, 'Start typing a city', 'city')) + '</div>' + fixed('To', 'Dubai, United Arab Emirates');
    h += field('date', 'Tentative travel date', input('date', S.date, '', 'type="date" min="' + today() + '"'), 'A rough date is fine. You can change it later.') +
      '<div class="gb-two">' + field('petType', 'Pet type', select('petType', S.petType, [['Dog', 'Dog'], ['Cat', 'Cat'], ['Bird', 'Bird'], ['Other', 'Other']])) + field('petName', 'Pet name', input('petName', S.petName, 'e.g. Bruno')) + '</div>' +
      '<div class="gb-two">' + field('breed', 'Breed', input('breed', S.breed, 'e.g. Frenchie')) + field('weight', 'Weight (kg)', input('weight', S.weight, 'e.g. 12 kg')) + '</div>';
    return h;
  }
  function stepYou() {
    var out = DIR === 'from_dubai';
    var h = '<h2>Health and contact</h2><p class="gb-sub">A few quick answers help us prepare the right paperwork.</p><div class="gb-two">' + field('micro', 'Microchipped?', select('micro', S.micro, YNS)) + field('vacc', 'Vaccinations up to date?', select('vacc', S.vacc, YNS)) + '</div>';
    if (out) h += '<div class="gb-two">' + field('rabies', 'Rabies &amp; titer test (RNATT)?', select('rabies', S.rabies, YNS)) + field('crate', 'IATA crate', select('crate', S.crate, [['Yes', 'Yes, I have a crate'], ['No', 'No, please supply one'], ['Not Sure', 'Not sure']])) + '</div>';
    h += '<div class="gb-two">' + field('name', 'Full name <i>*</i>', input('name', S.name, 'Your name', 'autocomplete="name"')) + field('email', 'Email <i>*</i>', input('email', S.email, 'you@example.com', 'type="email" autocomplete="email"')) + '</div>' +
      '<div class="gb-two">' + field('phone', 'Phone number <i>*</i>', input('phone', S.phone, '+971 50 000 0000', 'type="tel" inputmode="tel" autocomplete="tel"')) + field('wa', 'WhatsApp number', input('wa', S.wa, 'Same as phone if left empty', 'type="tel" inputmode="tel"')) + '</div>' +
      field('notes', 'Remark', '<textarea id="notes" data-k="notes" rows="3" placeholder="Anything we should know: flight preferences, airline, vet history...">' + esc(S.notes) + '</textarea>');
    return h;
  }
  function stepDone() {
    var d = S.done, route = S.oCity + ', ' + S.oCountry + ' to ' + S.dCity + ', ' + S.dCountry;
    var msg = 'Hello Global Pet Cab Dubai, I just sent a pet relocation enquiry.\nReference: ' + d.ref + '\nRoute: ' + route + '\nPet: ' + (S.petName || S.petType) + ' (' + S.petType + ')\nName: ' + S.name;
    return '<div class="gb-done"><div class="tick">✓</div><h2>Enquiry received</h2><p>Your reference is <b>' + esc(d.ref) + '</b>. Our relocation team will review the rules for <b>' + esc(route) + '</b> and send your customised proposal.</p>' +
      '<a class="gb-btn wa" target="_blank" rel="noopener noreferrer" href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg) + '">Continue on WhatsApp</a><a class="gb-btn ghost" href="tel:+971501234567">Call the relocation team</a></div>';
  }
  function side() {
    return '<div class="gb-quote"><div class="gb-q-h"><span>What happens next</span></div><ul class="gb-next"><li><b>1</b><span>We review the import and export rules for your route.</span></li><li><b>2</b><span>You get a customised proposal with every step and cost.</span></li><li><b>3</b><span>We handle permits, crate, flight and delivery door to door.</span></li></ul><p class="gb-q-m">Replies usually arrive within one working day.</p></div>';
  }

  function render() {
    var root = document.getElementById('gpc-reloc-root'); if (!root) return;
    if (S.done) { root.innerHTML = '<div class="gb-card">' + stepDone() + '</div>'; return; }
    var last = S.step === 1;
    root.innerHTML = '<div class="gb-grid"><div class="gb-card">' + stepper() + '<div class="gb-body">' + (last ? stepYou() : stepRoute()) + '</div>' + (S.err ? '<p class="gb-err" role="alert">' + esc(S.err) + '</p>' : '') +
      '<div class="gb-nav">' + (S.step ? '<button type="button" class="gb-btn ghost" data-act="back">← Back</button>' : '<span></span>') +
      '<button type="button" class="gb-btn" data-act="next"' + (S.sending ? ' disabled' : '') + '>' + (last ? (S.sending ? 'Sending…' : 'Get my relocation quote') : 'Continue →') + '</button></div></div>' +
      '<aside class="gb-side">' + side() + '</aside></div>';
  }

  function validate() {
    if (S.step === 0) {
      var out = DIR === 'from_dubai';
      if (out ? (!S.dCountry.trim() || !S.dCity.trim()) : (!S.oCountry.trim() || !S.oCity.trim())) return 'Please add the ' + (out ? 'destination' : 'starting') + ' country and city.';
      return '';
    }
    if (S.name.trim().length < 2) return 'Please enter your name.';
    if (S.phone.replace(/\D/g, '').length < 8) return 'Please enter a valid phone number.';
    if (!/^\S+@\S+\.\S+$/.test(S.email.trim())) return 'Please enter a valid email address.';
    return '';
  }
  function go(n) { S.step = n; S.err = ''; render(); var r = document.getElementById('gpc-reloc-root'); if (r && r.scrollIntoView) r.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
  function submit() {
    S.sending = true; S.err = ''; render();
    var out = DIR === 'from_dubai';
    fetch('/api/international/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      direction: DIR, originCountry: S.oCountry, originCity: S.oCity, destCountry: S.dCountry, destCity: S.dCity, travelDate: S.date,
      petType: S.petType, petName: S.petName, breed: S.breed, age: '', gender: '', weightKg: S.weight, dimensions: '',
      crateStatus: out ? S.crate : 'Not Sure', microchipStatus: S.micro, vaccinationStatus: S.vacc, rabiesStatus: out ? S.rabies : 'Not Sure',
      servicesJson: '[]', customerName: S.name, phone: S.phone, whatsapp: S.wa.trim() || S.phone, email: S.email, notes: S.notes }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { S.sending = false; if (j && j.success) { S.done = { ref: j.referenceId }; render(); window.scrollTo(0, 0); } else { S.err = (j && j.message) || 'Something went wrong. Please try again or message us on WhatsApp.'; render(); } })
      .catch(function () { S.sending = false; S.err = 'We could not send your request. Please check your connection and try again.'; render(); });
  }

  /* ---- country / city suggestions (cities follow the country typed next to them) ---- */
  var sugTimer = 0;
  function suggest(inp) {
    var ul = inp.parentElement.querySelector('.gb-sug'), q = inp.value.trim(), scope = inp.getAttribute('data-place');
    clearTimeout(sugTimer);
    if (q.length < 2) { ul.hidden = true; return; }
    var country = scope === 'city' ? (inp.id === 'dCity' ? S.dCountry : S.oCountry) : '';
    sugTimer = setTimeout(function () {
      fetch('/api/places/search?scope=' + scope + '&q=' + encodeURIComponent(q) + (country && country.trim() ? '&country=' + encodeURIComponent(country.trim()) : '')).then(function (r) { return r.json(); }).then(function (j) {
        var s = (j && j.suggestions) || []; if (!s.length || document.activeElement !== inp) { ul.hidden = true; return; }
        ul.innerHTML = s.slice(0, 6).map(function (x) { return '<li role="option" data-v="' + esc(x.label) + '"><b>' + esc(x.label) + '</b>' + (x.subtitle ? '<small>' + esc(x.subtitle) + '</small>' : '') + '</li>'; }).join(''); ul.hidden = false;
      }).catch(function () { ul.hidden = true; });
    }, 220);
  }

  /* ---- events ---- */
  function onClick(e) {
    var t = e.target; if (!(t instanceof Element)) return;
    var li = t.closest('.gb-sug li');
    if (li) { var inp = li.closest('.gb-pl').querySelector('input'); inp.value = li.getAttribute('data-v'); S[inp.getAttribute('data-k')] = inp.value; li.parentElement.hidden = true; return; }
    var stp = t.closest('[data-step]'); if (stp) { var n = +stp.getAttribute('data-step'); if (n === S.step) return; if (n < S.step) { go(n); return; } var m2 = validate(); if (m2) { S.err = m2; render(); return; } go(n); return; }
    var act = t.closest('[data-act]'); if (!act) return; var a = act.getAttribute('data-act');
    if (a === 'back') go(0);
    else if (a === 'next') { var m = validate(); if (m) { S.err = m; render(); return; } if (S.step === 1) submit(); else go(1); }
  }
  function onInput(e) {
    var t = e.target; var k = t.getAttribute && t.getAttribute('data-k'); if (!k) return;
    S[k] = t.value;
    if (t.getAttribute('data-place')) suggest(t);
    if (S.err) { S.err = ''; var er = document.querySelector('.gb-err'); if (er) er.remove(); }
  }
  function onBlur(e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('data-place')) setTimeout(function () { var ul = t.parentElement && t.parentElement.querySelector('.gb-sug'); if (ul) ul.hidden = true; }, 200); }

  function mount() {
    var root = document.getElementById('gpc-reloc-root');
    if (!root || root.getAttribute('data-gb')) return;
    DIR = root.getAttribute('data-dir') === 'to_dubai' ? 'to_dubai' : 'from_dubai';
    root.setAttribute('data-gb', '1'); S = fresh();
    root.addEventListener('click', onClick); root.addEventListener('input', onInput); root.addEventListener('change', onInput); root.addEventListener('focusout', onBlur);
    render();
  }
  var armed = false;
  function arm() { armed = true; mount(); }
  if (document.readyState === 'complete') setTimeout(arm, 400); else window.addEventListener('load', function () { setTimeout(arm, 600); });
  new MutationObserver(function () { if (!armed) return; var r = document.getElementById('gpc-reloc-root'); if (r && !r.getAttribute('data-gb')) mount(); }).observe(document.documentElement, { childList: true, subtree: true });
})();
