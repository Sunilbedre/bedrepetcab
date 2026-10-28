/* /book-pet-taxi: five-step booking wizard (vanilla JS, no build step).
   Price comes from POST /api/taxi/quote; the booking request is saved through POST /api/taxi/enquiry and confirmed on WhatsApp.
   The page re-renders on the client, so the wizard mounts whenever #gpc-book-root appears. */
(function () {
  var WA_NUMBER = '971501234567'; // placeholder: replace with the real WhatsApp number
  var STEPS = ['Ride', 'Details', 'You', 'Pet', 'Confirm'];
  var AIRPORTS = [['DXB', 'Dubai International (DXB)'], ['DWC', 'Al Maktoum (DWC)'], ['AUH', 'Abu Dhabi (AUH)'], ['SHJ', 'Sharjah (SHJ)'], ['RKT', 'Ras Al Khaimah (RKT)'], ['FJR', 'Fujairah (FJR)']];
  var CITY_ROUTES = [['sharjah', 'Dubai ↔ Sharjah / Ajman'], ['abudhabi', 'Dubai ↔ Abu Dhabi / Al Ain'], ['hatta', 'Dubai ↔ Hatta']];
  var RIDES = [
    { id: 'dubai', title: 'Within Dubai', desc: 'Vet, grooming, hotel and everyday city rides', icon: '🚕' },
    { id: 'airport', title: 'Airport Transfer', desc: 'DXB, DWC, AUH, SHJ, RKT and FJR', icon: '✈️' },
    { id: 'city', title: 'City to City', desc: 'Sharjah, Abu Dhabi, Al Ain and Hatta', icon: '🛣️' }
  ];

  var S = null; // state
  function fresh() {
    return { step: 0, ride: '', trip: 'one_way', airport: 'DXB', dir: 'to', route: 'sharjah', cityDir: 'out', pickup: '', pickupNo: '', drop: '', dropNo: '', addr: '', addrNo: '',
      date: '', time: '', waitBlocks: 0, name: '', phone: '', email: '', petName: '', species: 'Dog', breed: '', size: 'Medium', pets: 1,
      crate: 'No crate', luggage: 0, pax: 1, mode: '', vacc: '', notes: '', terms: false, quote: null, quoting: false, quoteErr: '', err: '', done: null, sending: false };
  }
  var qTimer = 0, qSeq = 0;

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function aed(n) { return 'AED ' + Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: Number(n) % 1 ? 2 : 0 }); }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function slots() { var a = []; for (var h = 0; h < 24; h++) for (var m = 0; m < 60; m += 30) { var v = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); var hh = h % 12 || 12; a.push([v, hh + ':' + String(m).padStart(2, '0') + ' ' + (h < 12 ? 'AM' : 'PM')]); } return a; }
  function airportName(c) { var x = AIRPORTS.filter(function (a) { return a[0] === c; })[0]; return x ? x[1] : c; }
  function routeName(c) { var x = CITY_ROUTES.filter(function (a) { return a[0] === c; })[0]; return x ? x[1] : c; }

  /* ---- addresses used for the quote and the booking ---- */
  function addrFrom() {
    if (S.ride === 'dubai') return S.pickup;
    if (S.ride === 'airport') return S.dir === 'to' ? S.addr : airportName(S.airport);
    return S.cityDir === 'out' ? S.pickup : S.pickup;
  }
  function pickupText() {
    if (S.ride === 'dubai') return join(S.pickupNo, S.pickup);
    if (S.ride === 'airport') return S.dir === 'to' ? join(S.addrNo, S.addr) : airportName(S.airport);
    return join(S.pickupNo, S.pickup);
  }
  function dropText() {
    if (S.ride === 'dubai') return join(S.dropNo, S.drop);
    if (S.ride === 'airport') return S.dir === 'to' ? airportName(S.airport) : join(S.addrNo, S.addr);
    return join(S.dropNo, S.drop);
  }
  function join(no, a) { return (no ? no + ', ' : '') + a; }
  function detailsReady() {
    if (!S.ride || !S.date || !S.time) return false;
    if (S.ride === 'dubai') return S.pickup.trim().length > 2 && S.drop.trim().length > 2;
    if (S.ride === 'airport') return S.addr.trim().length > 2;
    return S.pickup.trim().length > 2 && S.drop.trim().length > 2;
  }

  /* ---- quote ---- */
  function quoteBody() {
    return { rideType: S.ride, tripType: S.trip, airport: S.airport, direction: S.dir, route: S.route, cityDir: S.cityDir,
      pickupLocation: S.ride === 'airport' ? (S.dir === 'to' ? S.addr : airportName(S.airport)) : S.pickup,
      dropLocation: S.ride === 'airport' ? (S.dir === 'to' ? airportName(S.airport) : S.addr) : S.drop,
      pickupTime: S.time, travelDate: S.date, numPets: S.pets, vaccinated: S.vacc === 'yes' ? true : S.vacc === 'no' ? false : null, waitBlocks: S.trip === 'return' ? S.waitBlocks : 0 };
  }
  function askQuote() {
    clearTimeout(qTimer);
    if (!detailsReady()) { S.quote = null; S.quoteErr = ''; S.quoting = false; paintQuote(); return; }
    S.quoting = true; paintQuote();
    qTimer = setTimeout(function () {
      var my = ++qSeq;
      fetch('/api/taxi/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(quoteBody()) })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (my !== qSeq) return; S.quoting = false; if (j && j.success) { S.quote = j.quote; S.quoteErr = ''; } else { S.quote = null; S.quoteErr = (j && j.message) || 'We could not price this route yet.'; } paintQuote(); })
        .catch(function () { if (my !== qSeq) return; S.quoting = false; S.quote = null; S.quoteErr = 'Could not reach the pricing service. Please try again.'; paintQuote(); });
    }, 550);
  }

  /* ---- ui pieces ---- */
  function stepper() {
    return '<ol class="gb-steps">' + STEPS.map(function (n, i) { return '<li data-step="' + i + '" tabindex="0" role="button" class="' + (i === S.step ? 'on' : i < S.step ? 'done' : '') + '"><span>' + (i < S.step ? '✓' : i + 1) + '</span><em>' + n + '</em></li>'; }).join('') + '</ol>';
  }
  function field(id, label, html, hint) { return '<div class="gb-f"><label for="' + id + '">' + label + '</label>' + html + (hint ? '<small>' + hint + '</small>' : '') + '</div>'; }
  function input(id, val, ph, extra) { return '<input id="' + id + '" data-k="' + id + '" value="' + esc(val) + '" placeholder="' + esc(ph || '') + '" ' + (extra || '') + '>'; }
  function select(id, val, opts) { return '<select id="' + id + '" data-k="' + id + '">' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  function seg(k, val, opts) { return '<div class="gb-seg" role="radiogroup">' + opts.map(function (o) { return '<button type="button" role="radio" aria-checked="' + (val === o[0]) + '" class="' + (val === o[0] ? 'on' : '') + '" data-seg="' + k + '" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div>'; }
  function place(id, val, ph) { return '<div class="gb-pl"><input id="' + id + '" data-k="' + id + '" data-place="1" autocomplete="off" value="' + esc(val) + '" placeholder="' + esc(ph) + '"><ul class="gb-sug" hidden></ul></div>'; }

  function stepRide() {
    return '<h2>Choose your ride</h2><p class="gb-sub">Tell us what kind of trip your pet needs. You will see the price before you send anything.</p><div class="gb-rides">' +
      RIDES.map(function (r) { return '<button type="button" class="gb-ride' + (S.ride === r.id ? ' on' : '') + '" data-ride="' + r.id + '"><span class="ic">' + r.icon + '</span><b>' + r.title + '</b><small>' + r.desc + '</small></button>'; }).join('') + '</div>' +
      '<p class="gb-help">Not sure which to pick? <a href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hello Global Pet Cab, I need help choosing a ride type.') + '" target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a></p>';
  }
  function stepDetails() {
    var h = '<h2>Ride details</h2>';
    if (S.ride === 'dubai' || S.ride === 'city') {
      if (S.ride === 'city') h += field('route', 'Which cities?', select('route', S.route, CITY_ROUTES)) + field('cityDir', 'Direction', seg('cityDir', S.cityDir, [['out', 'From Dubai'], ['in', 'To Dubai']]));
      h += '<div class="gb-two">' + field('pickup', 'Pickup location', place('pickup', S.pickup, S.ride === 'city' && S.cityDir === 'in' ? 'Address in the other city' : 'Start typing an address or area')) + field('pickupNo', 'Building / villa / apt no.', input('pickupNo', S.pickupNo, 'e.g. Villa 12')) + '</div>' +
        '<div class="gb-two">' + field('drop', 'Drop-off location', place('drop', S.drop, S.ride === 'city' && S.cityDir === 'out' ? 'Address in the other city' : 'Start typing an address or area')) + field('dropNo', 'Building / villa / apt no.', input('dropNo', S.dropNo, 'e.g. Tower B, 1204')) + '</div>';
    } else {
      h += field('airport', 'Airport', select('airport', S.airport, AIRPORTS)) + field('dir', 'Direction', seg('dir', S.dir, [['to', 'To the airport'], ['from', 'From the airport']])) +
        '<div class="gb-two">' + field('addr', 'Your address', place('addr', S.addr, 'Start typing an address or area')) + field('addrNo', 'Building / villa / apt no.', input('addrNo', S.addrNo, 'e.g. Apartment 803')) + '</div>';
    }
    h += field('trip', 'Trip type', seg('trip', S.trip, [['one_way', 'One way'], ['return', 'Return']]), S.trip === 'return' ? 'A return trip includes 30 minutes of waiting at the destination.' : '');
    if (S.trip === 'return') h += field('waitBlocks', 'Extra waiting time', select('waitBlocks', S.waitBlocks, [[0, 'None (30 minutes included)'], [1, '+30 minutes'], [2, '+1 hour'], [3, '+1.5 hours'], [4, '+2 hours']]));
    h += '<div class="gb-two">' + field('date', 'Pickup date', input('date', S.date, '', 'type="date" min="' + todayStr() + '"')) +
      field('time', 'Pickup time', S.date ? select('time', S.time, [['', 'Select a time']].concat(slots())) : '<select disabled><option>Pick a date first</option></select>', 'Rides between 10 PM and 6 AM include an after-hours charge.') + '</div>' +
      '<p class="gb-note">Free changes or cancellation until 1 hour before pickup (2 hours for City to City).</p>';
    return h;
  }
  function stepYou() {
    return '<h2>Your details</h2><p class="gb-sub">We confirm your booking on WhatsApp.</p>' + field('name', 'Full name <i>*</i>', input('name', S.name, 'Your name', 'autocomplete="name"')) +
      '<div class="gb-two">' + field('phone', 'WhatsApp / mobile <i>*</i>', input('phone', S.phone, '+971 50 000 0000', 'type="tel" inputmode="tel" autocomplete="tel"')) + field('email', 'Email (optional)', input('email', S.email, 'you@example.com', 'type="email" autocomplete="email"')) + '</div>';
  }
  function stepPet() {
    var h = '<h2>Your pet and the trip</h2><div class="gb-two">' + field('petName', 'Pet name <i>*</i>', input('petName', S.petName, 'e.g. Milo')) +
      field('species', 'Species', select('species', S.species, [['Dog', 'Dog'], ['Cat', 'Cat'], ['Bird', 'Bird'], ['Rabbit', 'Rabbit'], ['Other', 'Other']])) + '</div>' +
      '<div class="gb-two">' + field('breed', 'Breed (optional)', input('breed', S.breed, 'e.g. Golden Retriever')) + field('pets', 'Number of pets', select('pets', S.pets, [[1, '1 pet'], [2, '2 pets'], [3, '3 pets'], [4, '4 pets']])) + '</div>' +
      field('size', 'Size', seg('size', S.size, [['Small', 'Small<br><small>under 10 kg</small>'], ['Medium', 'Medium<br><small>10–25 kg</small>'], ['Large', 'Large<br><small>25 kg +</small>']]));
    if (S.ride === 'airport') h += '<div class="gb-two">' + field('crate', 'Crate size', select('crate', S.crate, [['No crate', 'No crate'], ['S (under 45 cm)', 'S (under 45 cm)'], ['M (45–76 cm)', 'M (45–76 cm)'], ['L (76–100 cm)', 'L (76–100 cm)'], ['XL (100 cm +)', 'XL (100 cm +)']])) + field('luggage', 'Luggage pieces', select('luggage', S.luggage, [[0, 'None'], [1, '1'], [2, '2'], [3, '3'], [4, '4 +']])) + '</div>' + field('pax', 'Passengers travelling', select('pax', S.pax, [[1, '1'], [2, '2'], [3, '3'], [4, '4']]));
    h += field('mode', 'Will you travel with your pet? <i>*</i>', seg('mode', S.mode, [['Accompanied', 'Yes, I travel with my pet'], ['Unaccompanied', 'No, pet travels alone']])) +
      field('vacc', 'Is your pet vaccinated? <i>*</i>', seg('vacc', S.vacc, [['yes', 'Yes'], ['no', 'No / not sure']]), 'Please bring the vaccination book. An unvaccinated pet adds a sanitization fee.') +
      field('notes', 'Anything we should know? (optional)', '<textarea id="notes" data-k="notes" rows="3" placeholder="Anxious, needs a ramp, special instructions...">' + esc(S.notes) + '</textarea>');
    return h;
  }
  function when() { var d = S.date ? new Date(S.date + 'T00:00:00') : null; var t = slots().filter(function (s) { return s[0] === S.time; })[0]; return (d ? d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '') + (t ? ' · ' + t[1] : ''); }
  function stepConfirm() {
    var rows = [['Ride', (RIDES.filter(function (r) { return r.id === S.ride; })[0] || {}).title + (S.ride === 'city' ? ' · ' + routeName(S.route) : '') + ' · ' + (S.trip === 'return' ? 'Return' : 'One way')], ['Pickup', pickupText()], ['Drop-off', dropText()], ['When', when()], ['Pet', S.petName + ' (' + S.species + (S.breed ? ', ' + S.breed : '') + ', ' + S.size + ')' + (S.pets > 1 ? ' + ' + (S.pets - 1) + ' more' : '')], ['Travel', S.mode + ' · ' + (S.vacc === 'yes' ? 'vaccinated' : 'not vaccinated / not sure')], ['Contact', S.name + ' · ' + S.phone]];
    if (S.ride === 'airport') rows.push(['Airport details', S.crate + ' · ' + S.luggage + ' luggage · ' + S.pax + ' passenger(s)']);
    return '<h2>Review and confirm</h2><dl class="gb-sum">' + rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl>' +
      '<label class="gb-terms"><input type="checkbox" id="terms" data-k="terms"' + (S.terms ? ' checked' : '') + '> I confirm the details are correct and agree to the booking terms. The team will confirm availability on WhatsApp and send a payment link.</label>';
  }
  function stepDone() {
    var d = S.done, msg = 'Hello Global Pet Cab Dubai, I just sent a pet taxi booking request.\nReference: ' + d.ref + '\nPickup: ' + pickupText() + '\nDrop-off: ' + dropText() + '\nWhen: ' + when() + '\nPet: ' + S.petName + ' (' + S.species + ')' + (S.quote ? '\nEstimated price: ' + aed(S.quote.total) : '') + '\nName: ' + S.name;
    return '<div class="gb-done"><div class="tick">✓</div><h2>Booking request sent</h2><p>Your reference is <b>' + esc(d.ref) + '</b>. Our team will check driver availability and confirm with you on WhatsApp, with a secure payment link.</p>' +
      '<a class="gb-btn wa" target="_blank" rel="noopener noreferrer" href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg) + '">Confirm on WhatsApp</a><button type="button" class="gb-btn ghost" data-act="again">Book another ride</button></div>';
  }

  /* ---- quote panel ---- */
  function quoteHtml() {
    var q = S.quote;
    var h = '<div class="gb-q-h"><span>Your quote</span>' + (q ? '<em>VAT included</em>' : '') + '</div>';
    if (S.quoting) return h + '<p class="gb-q-m">Calculating your price…</p>';
    if (S.quoteErr) return h + '<p class="gb-q-m err">' + esc(S.quoteErr) + '</p>';
    if (!q) return h + '<p class="gb-q-m">Add your route, date and time to see the price.</p><ul class="gb-q-pol"><li>Free changes until 1 hour before pickup</li><li>Return trips include 30 minutes of waiting</li></ul>';
    h += '<div class="gb-q-t">' + aed(q.total) + '</div><div class="gb-q-d">' + (q.distanceKm ? q.distanceKm + ' km' : '') + (q.distanceNote ? ' · ' + esc(q.distanceNote) : '') + '</div><ul class="gb-q-l">' +
      q.lines.map(function (l) { return '<li><span>' + esc(l.label) + '</span><b class="' + (l.amount < 0 ? 'neg' : '') + '">' + (l.amount < 0 ? '− ' : '') + aed(Math.abs(l.amount)) + '</b></li>'; }).join('') + '</ul>' +
      '<div class="gb-q-v"><span>Includes VAT (' + q.vatPercent + '%)</span><b>' + aed(q.vat) + '</b></div><p class="gb-q-n">Final price is confirmed by our team. Waiting beyond the included time and any change in route can adjust it.</p>';
    return h;
  }
  function paintQuote() { var el = document.getElementById('gb-quote'); if (el) el.innerHTML = quoteHtml(); var m = document.getElementById('gb-mtotal'); if (m) m.textContent = S.quote ? aed(S.quote.total) : (S.quoting ? 'Calculating…' : 'See price'); }

  /* ---- render ---- */
  function render() {
    var root = document.getElementById('gpc-book-root'); if (!root) return;
    if (S.done) { root.innerHTML = '<div class="gb-card">' + stepDone() + '</div>'; return; }
    var body = [stepRide, stepDetails, stepYou, stepPet, stepConfirm][S.step]();
    var last = S.step === 4;
    root.innerHTML = '<div class="gb-grid"><div class="gb-card">' + stepper() + '<div class="gb-body">' + body + '</div>' + (S.err ? '<p class="gb-err" role="alert">' + esc(S.err) + '</p>' : '') +
      '<div class="gb-nav">' + (S.step ? '<button type="button" class="gb-btn ghost" data-act="back">← Back</button>' : '<span></span>') +
      (S.step === 0 ? '' : '<button type="button" class="gb-btn" data-act="next"' + (S.sending ? ' disabled' : '') + '>' + (last ? (S.sending ? 'Sending…' : 'Send booking request') : S.step === 3 ? 'Review booking →' : 'Continue →') + '</button>') + '</div></div>' +
      '<aside class="gb-side"><div class="gb-quote" id="gb-quote">' + quoteHtml() + '</div></aside></div>' +
      (S.step > 0 ? '<div class="gb-mbar"><span>Total</span><b id="gb-mtotal">' + (S.quote ? aed(S.quote.total) : 'See price') + '</b></div>' : '');
  }

  /* ---- validation / navigation ---- */
  function validate() {
    if (S.step === 0) return S.ride ? '' : 'Choose a ride type to continue.';
    if (S.step === 1) {
      if (!detailsReady()) return 'Please fill in your pickup, drop-off, date and time.';
      if (S.ride !== 'airport' && S.pickup.trim() === S.drop.trim()) return 'Pickup and drop-off look the same.';
      if (S.date < todayStr()) return 'Please choose a date from today onwards.';
      return '';
    }
    if (S.step === 2) { if (S.name.trim().length < 2) return 'Please enter your name.'; if (S.phone.replace(/\D/g, '').length < 8) return 'Please enter a valid WhatsApp / mobile number.'; if (S.email && !/^\S+@\S+\.\S+$/.test(S.email)) return 'That email address does not look right.'; return ''; }
    if (S.step === 3) { if (!S.petName.trim()) return "Please enter your pet's name."; if (!S.mode) return 'Tell us if you will travel with your pet.'; if (!S.vacc) return 'Tell us if your pet is vaccinated.'; return ''; }
    if (!S.terms) return 'Please tick the box to confirm.';
    if (!S.quote) return 'We still need a price for this route. Go back and check the addresses.';
    return '';
  }
  function go(n) { S.step = n; S.err = ''; render(); var r = document.getElementById('gpc-book-root'); if (r && r.scrollIntoView) r.scrollIntoView({ block: 'start', behavior: 'smooth' }); if (n >= 1) askQuote(); }
  function submit() {
    S.sending = true; S.err = ''; render();
    var q = S.quote;
    var notes = ['Ride: ' + S.ride + (S.ride === 'airport' ? ' (' + S.airport + ', ' + (S.dir === 'to' ? 'to' : 'from') + ' airport)' : '') + (S.ride === 'city' ? ' (' + routeName(S.route) + ')' : ''), 'Travel: ' + S.mode, 'Vaccinated: ' + (S.vacc === 'yes' ? 'Yes' : 'No / not sure'), 'Size: ' + S.size, S.ride === 'airport' ? 'Crate: ' + S.crate + ', luggage: ' + S.luggage + ', passengers: ' + S.pax : '', S.trip === 'return' ? 'Extra waiting blocks: ' + S.waitBlocks : '', S.notes ? 'Notes: ' + S.notes : ''].filter(Boolean).join(' | ');
    fetch('/api/taxi/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      pickupLocation: pickupText(), dropLocation: dropText(), tripType: S.trip === 'return' ? 'round_trip' : 'one_way', petType: S.species, numPets: S.pets, travelDate: S.date, pickupTime: S.time,
      estimatedFare: q.total, breakdownJson: JSON.stringify(q), distanceKm: q.distanceKm || 0, customerName: S.name, phone: S.phone, whatsapp: S.phone, email: S.email, petName: S.petName, breed: S.breed,
      crateAvailable: S.ride === 'airport' ? S.crate : 'No', notes: notes }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { S.sending = false; if (j && j.success) { S.done = { ref: j.referenceId }; render(); window.scrollTo(0, 0); } else { S.err = (j && j.message) || 'Something went wrong. Please try again or message us on WhatsApp.'; render(); } })
      .catch(function () { S.sending = false; S.err = 'We could not send your request. Please check your connection and try again.'; render(); });
  }

  /* ---- address suggestions ---- */
  var sugTimer = 0;
  function suggest(inp) {
    var ul = inp.parentElement.querySelector('.gb-sug'); var q = inp.value.trim();
    clearTimeout(sugTimer);
    if (q.length < 2) { ul.hidden = true; return; }
    sugTimer = setTimeout(function () {
      fetch('/api/places/search?scope=dubai&q=' + encodeURIComponent(q)).then(function (r) { return r.json(); }).then(function (j) {
        var s = (j && j.suggestions) || []; if (!s.length || document.activeElement !== inp) { ul.hidden = true; return; }
        ul.innerHTML = s.slice(0, 6).map(function (x) { return '<li role="option" data-v="' + esc(x.label + (x.subtitle ? ', ' + x.subtitle : '')) + '"><b>' + esc(x.label) + '</b>' + (x.subtitle ? '<small>' + esc(x.subtitle) + '</small>' : '') + '</li>'; }).join(''); ul.hidden = false;
      }).catch(function () { ul.hidden = true; });
    }, 220);
  }

  /* ---- events ---- */
  function onClick(e) {
    var t = e.target; if (!(t instanceof Element)) return;
    var li = t.closest('.gb-sug li');
    if (li) { var inp = li.closest('.gb-pl').querySelector('input'); inp.value = li.getAttribute('data-v'); S[inp.getAttribute('data-k')] = inp.value; li.parentElement.hidden = true; askQuote(); return; }
    var ride = t.closest('[data-ride]'); if (ride) { S.ride = ride.getAttribute('data-ride'); S.err = ''; S.quote = null; go(1); return; }
    var sg = t.closest('[data-seg]'); if (sg) { S[sg.getAttribute('data-seg')] = sg.getAttribute('data-v'); S.err = ''; var sc = window.scrollY; render(); window.scrollTo(0, sc); askQuote(); return; }
    var stp = t.closest('[data-step]'); if (stp) { var n = +stp.getAttribute('data-step'); if (n === S.step) return; if (n < S.step) { go(n); return; } if (!S.ride) return; while (S.step < n) { var m2 = validate(); if (m2) { S.err = m2; render(); return; } S.step++; } go(n); return; }
    var act = t.closest('[data-act]'); if (!act) return; var a = act.getAttribute('data-act');
    if (a === 'back') go(Math.max(0, S.step - 1));
    else if (a === 'again') { S = fresh(); render(); window.scrollTo(0, 0); }
    else if (a === 'next') { var m = validate(); if (m) { S.err = m; render(); return; } if (S.step === 4) submit(); else go(S.step + 1); }
  }
  function onInput(e) {
    var t = e.target; var k = t.getAttribute && t.getAttribute('data-k'); if (!k) return;
    if (t.type === 'checkbox') S[k] = t.checked; else S[k] = t.value;
    if (t.getAttribute('data-place')) suggest(t);
    if (S.err) { S.err = ''; var er = document.querySelector('.gb-err'); if (er) er.remove(); }
  }
  function onChange(e) {
    var t = e.target; var k = t.getAttribute && t.getAttribute('data-k'); if (!k) return;
    if (['pets', 'luggage', 'pax', 'waitBlocks'].indexOf(k) >= 0) S[k] = parseInt(t.value, 10) || 0;
    if (k === 'date') { var sc = window.scrollY; S.time = ''; render(); window.scrollTo(0, sc); }
    if (['route', 'airport', 'date', 'time', 'pets', 'waitBlocks', 'pickup', 'drop', 'addr', 'terms'].indexOf(k) >= 0 || k === 'time') askQuote();
  }
  function onBlur(e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('data-place')) setTimeout(function () { var ul = t.parentElement && t.parentElement.querySelector('.gb-sug'); if (ul) ul.hidden = true; }, 200); if (t && t.getAttribute && /^(pickup|drop|addr)$/.test(t.getAttribute('data-k'))) askQuote(); }

  function mount() {
    var root = document.getElementById('gpc-book-root');
    if (!root || root.getAttribute('data-gb')) return;
    root.setAttribute('data-gb', '1'); S = fresh();
    var q = new URLSearchParams(location.search); var r = q.get('ride'); if (r && RIDES.some(function (x) { return x.id === r; })) { S.ride = r; S.step = 1; }
    root.addEventListener('click', onClick); root.addEventListener('input', onInput); root.addEventListener('change', onChange); root.addEventListener('focusout', onBlur);
    render();
  }
  // mount after hydration so React does not see (and discard) our markup; later renders (soft navigation, re-hydration) are picked up by the observer
  var armed = false;
  function arm() { armed = true; mount(); }
  if (document.readyState === 'complete') setTimeout(arm, 400); else window.addEventListener('load', function () { setTimeout(arm, 600); });
  new MutationObserver(function () { if (!armed) return; var r = document.getElementById('gpc-book-root'); if (r && !r.getAttribute('data-gb')) mount(); }).observe(document.documentElement, { childList: true, subtree: true });
})();
