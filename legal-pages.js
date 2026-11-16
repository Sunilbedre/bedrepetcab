'use strict';
/*
 * Static legal pages served before Next.js: /privacy-policy and /terms-and-conditions.
 * They carry the registered legal name of the business (required for Meta business verification).
 */
const LEGAL_NAME = 'PAWPORT PETS RELOCATION SERVICES L.L.C';
const TRADE_NAME = 'Global Pet Cab';
const EMAIL = 'info@globalpetcab.ae';
const PHONE = '+971 50 485 6239';
const ADDRESS = 'City Avenue Building, 7th Floor, Office 707, 8th St, Port Saeed, Deira, Dubai, United Arab Emirates';
const SITE = 'https://globalpetcab.ae';
const UPDATED = '16 November 2026';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const PRIVACY = [
  ['Who we are', `${TRADE_NAME} (globalpetcab.ae) is a trade name of <strong>${LEGAL_NAME}</strong>, a company registered in Dubai, United Arab Emirates ("we", "us", "our"). We provide pet taxi, local pet transport and international pet relocation services.`],
  ['Information we collect', 'When you request a quote, book a service, contact us or message us on WhatsApp we collect: your name, phone number, email address, pick-up and drop-off locations, travel dates, and details of your pet (species, breed, age, weight, vaccination and microchip information). We also collect basic technical data such as IP address, browser type and pages visited through cookies and similar technologies.'],
  ['How we use it', 'To prepare quotes, arrange transport and travel documents, communicate with you about your booking, improve our website and services, measure advertising performance, and meet legal obligations.'],
  ['Cookies, analytics and advertising', 'We use Google Tag Manager, Google Analytics, Google Ads and Meta Pixel (Facebook / Instagram) to understand how the site is used and to show relevant ads. These providers may set cookies and receive technical data about your visit. You can block cookies in your browser settings.'],
  ['Sharing', 'We share information only where needed to deliver the service: with airlines, ground handlers, veterinarians, government authorities and customs agents, and with service providers who help us run the website and communications. We do not sell your personal data.'],
  ['Retention and security', 'We keep information only as long as needed for the purposes above or as required by law, and use reasonable technical and organisational measures to protect it.'],
  ['Your rights', `You may ask us to access, correct or delete your personal data, or object to marketing, by emailing <a href="mailto:${EMAIL}">${EMAIL}</a>.`],
  ['Changes', 'We may update this policy from time to time. The date at the top shows the latest version.'],
  ['Contact', `${LEGAL_NAME}, ${ADDRESS}. Phone: <a href="tel:+971504856239">${PHONE}</a>. Email: <a href="mailto:${EMAIL}">${EMAIL}</a>.`],
];

const TERMS = [
  ['About these terms', `These terms apply to your use of globalpetcab.ae and to services provided under the name ${TRADE_NAME} by <strong>${LEGAL_NAME}</strong> ("the Company"), Dubai, United Arab Emirates. By using the website or booking a service you agree to them.`],
  ['Services', 'We provide pet taxi, local pet transport and international pet relocation (including documentation support, airline coordination and delivery). Quotes depend on the details you supply and are valid for the period shown on the quote.'],
  ['Bookings and payment', 'A booking is confirmed when we acknowledge it in writing (email or WhatsApp) and any required deposit or payment is received. Prices are in UAE Dirhams unless stated otherwise and may exclude airline, government, veterinary and customs charges, which are stated separately.'],
  ['Your responsibilities', 'You must give accurate information about your pet and journey, ensure your pet is healthy, vaccinated and microchipped as required by the destination, and provide the documents we request. Import rules change; the final responsibility for meeting entry requirements remains with the pet owner, although we will guide you.'],
  ['Cancellations and changes', 'Please tell us as early as possible if you need to change or cancel. Costs already incurred (airline bookings, permits, veterinary fees) are non-refundable. Specific cancellation terms are given with your quote.'],
  ['Liability', 'We take every care of your pet. We are not liable for delays or outcomes caused by airlines, weather, customs or government authorities, or by incorrect or incomplete information supplied by you. Nothing in these terms limits liability that cannot be limited by law.'],
  ['Governing law', 'These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates, and disputes are subject to the courts of Dubai.'],
  ['Contact', `${LEGAL_NAME}, ${ADDRESS}. Phone: <a href="tel:+971504856239">${PHONE}</a>. Email: <a href="mailto:${EMAIL}">${EMAIL}</a>.`],
];

function page(title, intro, sections, path) {
  const body = sections.map(([h, t]) => `<h2>${esc(h)}</h2><p>${t}</p>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | ${TRADE_NAME} Dubai</title>
<meta name="description" content="${esc(title)} of ${TRADE_NAME}, operated by ${LEGAL_NAME}.">
<link rel="canonical" href="${SITE}${path}">
<style>
:root{--navy:#0b2545;--teal:#0e9f9a;--bg:#f6f8fa;--text:#1d2b3a}
*{box-sizing:border-box}body{margin:0;font:16px/1.7 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text)}
header{background:var(--navy);color:#fff;padding:18px 20px}header a{color:#fff;text-decoration:none;font-weight:700;font-size:1.1rem}
main{max-width:820px;margin:0 auto;padding:32px 20px 60px}h1{color:var(--navy);margin:0 0 4px;font-size:2rem}
.meta{color:#5b6b7b;margin:0 0 24px;font-size:.95rem}h2{color:var(--navy);margin:28px 0 6px;font-size:1.25rem}p{margin:0 0 12px}
a{color:var(--teal)}footer{background:var(--navy);color:rgba(255,255,255,.75);padding:22px 20px;font-size:.9rem;text-align:center}footer a{color:#fff}
</style></head><body>
<header><a href="/">${TRADE_NAME} Dubai</a></header>
<main><h1>${esc(title)}</h1>
<p class="meta">${intro} Last updated: ${UPDATED}</p>${body}</main>
<footer>&copy; ${new Date().getFullYear()} ${TRADE_NAME}, a trade name of ${LEGAL_NAME}. All rights reserved.<br>${ADDRESS} &middot; ${PHONE}<br>
<a href="/privacy-policy">Privacy Policy</a> &middot; <a href="/terms-and-conditions">Terms &amp; Conditions</a> &middot; <a href="/contact">Contact</a></footer>
</body></html>`;
}

const PAGES = {
  '/privacy-policy': () => page('Privacy Policy', `Operated by <strong>${LEGAL_NAME}</strong>.`, PRIVACY, '/privacy-policy'),
  '/terms-and-conditions': () => page('Terms and Conditions', `Operated by <strong>${LEGAL_NAME}</strong>.`, TERMS, '/terms-and-conditions'),
};

function handle(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;
  let p = (req.url || '').split('?')[0];
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  const build = PAGES[p];
  if (!build) return false;
  const html = build();
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': Buffer.byteLength(html),
    'Cache-Control': 'no-store',
  });
  res.end(req.method === 'HEAD' ? undefined : html);
  return true;
}

module.exports = { handle, LEGAL_NAME };
