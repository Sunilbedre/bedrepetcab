/* Dubai pet taxi page: the hero card offers the three ride types; each one opens the booking page (/book-pet-taxi).
   The old fare calculator inside the card is hidden by CSS; this block is added next to it, outside React's markup. */
(function () {
  var RIDES = [
    ['dubai', '🚕', 'Within Dubai', 'Vet, grooming, hotel and everyday city rides'],
    ['airport', '✈️', 'Airport Transfer', 'DXB, DWC, AUH, SHJ, RKT and FJR'],
    ['city', '🛣️', 'City to City', 'Sharjah, Abu Dhabi, Al Ain and Hatta']
  ];

  function html() {
    return '<p class="gtr-k">Book a pet taxi</p><h2 class="gtr-h">Choose your ride</h2>' +
      '<p class="gtr-p">Tell us what kind of trip your pet needs. You will see the price before you send anything.</p>' +
      '<div class="gtr-list">' + RIDES.map(function (r) {
        return '<a class="gtr-ride" href="/book-pet-taxi?ride=' + r[0] + '"><span class="gtr-ic">' + r[1] + '</span><span class="gtr-t"><b>' + r[2] + '</b><small>' + r[3] + '</small></span><span class="gtr-go" aria-hidden="true">→</span></a>';
      }).join('') + '</div>' +
      '<a class="gtr-all" href="/book-pet-taxi">Open the booking page →</a>';
  }

  function mount() {
    var card = document.getElementById('dubai-taxi-calculator');
    if (!card || card.querySelector('#gpc-taxi-rides')) return;
    var box = document.createElement('div');
    box.id = 'gpc-taxi-rides';
    box.innerHTML = html();
    card.appendChild(box);
  }

  function start() {
    mount();
    try { new MutationObserver(mount).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  }

  start();
})();
