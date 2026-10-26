/* Dubai pet taxi hero card: step 1 = trip details, step 2 = fare + booking details.
   CSS does the layout via data-step. The calculator hides its Calculate button once a fare exists,
   so "Edit trip details" saves the entries, reloads the card and restores them. */
(function () {
  var KEY = 'gpcTaxiTrip';

  function setValue(el, v) {
    var proto = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  }

  function fields(card) {
    var form = card.querySelector('.p-6 > form');
    if (!form) return null;
    return {
      toggles: form.querySelectorAll('.grid-cols-2 > button'),
      texts: form.querySelectorAll('input[type=text]'),
      selects: form.querySelectorAll('select'),
      date: form.querySelector('input[type=date]'),
    };
  }

  function save(card) {
    var f = fields(card);
    if (!f) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({
        round: /bg-white/.test(f.toggles[1].className),
        texts: [].map.call(f.texts, function (e) { return e.value; }),
        selects: [].map.call(f.selects, function (e) { return e.value; }),
        date: f.date && f.date.value,
      }));
    } catch (e) {}
  }

  function restore(card) {
    var raw;
    try { raw = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {}
    var f = raw && fields(card);
    if (!f) return;
    var d = JSON.parse(raw);
    if (d.round) f.toggles[1].click();
    d.texts.forEach(function (v, i) { if (f.texts[i]) setValue(f.texts[i], v); });
    d.selects.forEach(function (v, i) { if (f.selects[i]) setValue(f.selects[i], v); });
    if (f.date && d.date) setValue(f.date, d.date);
    // restoring fires the address autocomplete; close it again once the suggestions have arrived
    setTimeout(function () {
      [].forEach.call(f.texts, function (e) { e.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
    }, 600);
  }

  function init() {
    var card = document.getElementById('dubai-taxi-calculator');
    if (!card || card.__gpcSteps) return;
    card.__gpcSteps = true;

    var back = document.createElement('button');
    back.type = 'button';
    back.textContent = '\u2190 Edit trip details';
    back.className = 'gpc-step-back';
    back.hidden = true;
    card.insertBefore(back, card.firstChild);

    function sync() {
      var step = card.querySelector('.bg-navy') ? 2 : 1;
      if (card.getAttribute('data-step') !== String(step)) card.setAttribute('data-step', String(step));
      back.hidden = step !== 2;
    }

    back.addEventListener('click', function () {
      save(card);
      location.reload();
    });
    new MutationObserver(sync).observe(card, { childList: true, subtree: true });
    sync();
    restore(card);
  }

  // wait for React to finish hydrating, otherwise it discards our changes to the card
  function start() {
    var tries = 0;
    (function wait() {
      var card = document.getElementById('dubai-taxi-calculator');
      var hydrated = card && Object.keys(card).some(function (k) { return k.indexOf('__reactFiber') === 0 || k.indexOf('__reactProps') === 0; });
      if (hydrated || tries++ > 40) init();
      else setTimeout(wait, 250);
    })();
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
