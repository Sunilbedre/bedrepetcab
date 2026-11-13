import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Hydration fix. Each prerendered page carries its page data twice: the visible html and an embedded copy (self.__next_f.push) that the browser rebuilds the page from.
 * Earlier copy edits updated the visible html and the .rsc file but not the embedded copy, so the browser found two different versions and re-rendered the whole page
 * (React errors #418/#423). This brings the embedded copy in line with the visible text. Idempotent.
 * (In the embedded copy "&" is written &.)
 */
const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'server', 'app');
const A = '\\u0026';
const PAIRS = {
  'about.html': [[`Dubai taxi rides ${A} global flights`, `Live animal regulations ${A} crates`]],
  'why-global-pet-cab.html': [[`Dubai taxi rides ${A} global flights`, `Live animal regulations ${A} crates`]],
  'reviews.html': [
    [`Real Stories ${A} Reviews`, 'Real pet relocation stories'],
    [`Trusted by Dubai Pet Parents ${A} Families`, 'Trusted by Pet Parents in Dubai and Around the World'],
  ],
  'dubai-pet-taxi.html': [
    [`Stress-free rides to clinics ${A} emergency vet centers across Dubai.`, "Comfortable rides to veterinary clinics and pet health appointments across Dubai. If you cannot be there yourself, ask our team about assistance with your pet's journey."],
    [`Direct transfers to Dubai International ${A} Al Maktoum Airport departures.`, 'Convenient transportation from your home or chosen pickup location to the airport when your pet is travelling.'],
    [`Comfortable transfer to and from pet boarding ${A} daycare resorts.`, 'Reliable transportation to and from pet hotels, boarding facilities and daycare centres.'],
    [`Pet Events ${A} Parks`, `Pet Parks ${A} Other Destinations`],
    ['children\\":\\"Marina\\"', 'children\\":\\"Dubai Marina\\"'],
  ],
};
const done = [];
for (const [file, pairs] of Object.entries(PAIRS)) {
  const fp = path.join(APP, file);
  if (!fs.existsSync(fp)) continue;
  let t = fs.readFileSync(fp, 'utf8');
  let n = 0;
  for (const [from, to] of pairs) if (t.includes(from)) { t = t.split(from).join(to); n++; }
  if (n) { fs.writeFileSync(fp, t); done.push(`${file} (${n})`); }
}
/* ---- visible html that lagged behind the code ---- */
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'cache' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
const FOOT_REVIEWS = '<li><a class="hover:text-white transition-colors leading-snug" href="/reviews">Verified Customer Reviews</a></li>';
const FOOT_GALLERY = '<li><a class="hover:text-white transition-colors leading-snug" href="/gallery">Gallery</a></li>';
for (const f of walk(path.join(APP, '..')).filter((x) => x.endsWith('.html'))) {
  let t = fs.readFileSync(f, 'utf8');
  let n = 0;
  // footer, Company column: the code has a Gallery link after the reviews link
  if (t.includes(FOOT_REVIEWS) && !t.includes('href="/gallery">Gallery</a></li>')) { t = t.replace(FOOT_REVIEWS, FOOT_REVIEWS + FOOT_GALLERY); n++; }
  // /resources: the page code wraps the content in space-y-16 py-8 (patch-resources-layout.mjs already styles that wrapper); the html used a plain wrapper
  const R_OLD = '<main class="flex-grow"><div class="font-body">\n    <section class="relative overflow-hidden bg-navy';
  if (t.includes(R_OLD)) { t = t.replace(R_OLD, '<main class="flex-grow"><div class="space-y-16 py-8 font-body">\n    <section class="relative overflow-hidden bg-navy'); n++; }
  // fare calculator card (contact, dubai-pet-taxi): the calculator code no longer renders this description line, the old html still had it
  const CALC_P = '<p class="text-sm text-slate-500 mt-1">Enter your pickup and drop-off locations in Dubai to get an estimated fare based on your journey.</p>';
  if (t.includes(CALC_P)) { t = t.split(CALC_P).join(''); n++; }
  // /dubai-pet-taxi hero pills: the page code puts an icon in the first two pills, the old html had plain text
  const PILL = '<span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">';
  const SVG = (name, inner) => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-' + name + ' w-4 h-4 text-teal-bright">' + inner + '</svg>';
  const SHIELD = SVG('shield-check', '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>');
  const PIN = SVG('map-pin', '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle>');
  if (t.includes(PILL + 'Climate-Controlled Fleet</span>')) { t = t.replace(PILL + 'Climate-Controlled Fleet</span>', PILL + SHIELD + 'Climate-Controlled Fleet</span>'); n++; }
  if (t.includes(PILL + 'Doorstep Pickup</span>')) { t = t.replace(PILL + 'Doorstep Pickup</span>', PILL + PIN + 'Doorstep Pickup</span>'); n++; }
  // /dubai-pet-taxi "How it works": the page code has no subtitle line and no help box (visitors already end up without them once the browser rebuilds the page)
  const HIW_SUB = '<p class="text-base text-white/70 font-body leading-relaxed mt-2">From booking to drop-off, we keep the process straightforward so you know what to expect at every step.</p>';
  const HIW_HELP = '<div class="mt-8 text-sm text-white/80 font-body p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"><span>Need help during the booking process? Contact the Global Pet Cab team on WhatsApp.</span><a href="https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai" target="_blank" rel="noopener noreferrer" class="text-teal-light font-bold hover:underline shrink-0">WhatsApp Us \u2192</a></div>';
  if (t.includes(HIW_SUB)) { t = t.split(HIW_SUB).join(''); n++; }
  if (t.includes(HIW_HELP)) { t = t.split(HIW_HELP).join(''); n++; }
  // hero button was switched to sentence case in the code
  if (t.includes('>Calculate My Fare \u2192</a>')) { t = t.split('>Calculate My Fare \u2192</a>').join('>Calculate my fare</a>'); n++; }
  if (t.includes('>Calculate My Fare<')) { t = t.split('>Calculate My Fare<').join('>Calculate my fare<'); n++; }
  // /dubai-pet-taxi pricing section: the page code is just the three price boxes (the old html also had a heading block and an internal draft note)
  const PR_HEAD = '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"><div class="max-w-2xl space-y-2"><p class="text-xs font-extrabold uppercase tracking-widest text-teal-deep">Simple, transparent pricing</p><h2 class="text-3xl sm:text-4xl font-black font-heading text-navy">Know Your Fare Before You Ride</h2><p class="text-base text-slate-600 font-body leading-relaxed pt-1">Your Dubai pet taxi fare is calculated based on the journey distance and selected ride details, so you can see the estimated cost before booking.</p></div><div class="pricing-pale-fix';
  const PR_NOTE = '<p class="text-xs text-slate-500 font-body italic mt-4">Pricing, VAT and surcharge details should be confirmed by the Global Pet Cab team before final publication.</p>';
  if (t.includes(PR_HEAD)) { t = t.replace(PR_HEAD, '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="pricing-pale-fix'); n++; }
  if (t.includes(PR_NOTE)) { t = t.split(PR_NOTE).join(''); n++; }
  // /about final banner heading
  const OLD_H = 'Wherever you&#x27;re moving, your pet gets there safely.';
  if (t.includes(OLD_H)) { t = t.split(OLD_H).join('Moving Your Pet? Let Global Pet Cab Handle the Journey.'); n++; }
  if (n) { fs.writeFileSync(f, t); done.push(path.relative(path.join(APP, '..'), f) + ' (' + n + ')'); }
}
/* ---- stray whitespace in hand-built html ----
 * Pages whose markup was written by a patch script have line breaks and indentation between elements. React's own output never has those, so it finds
 * unexpected whitespace nodes and rebuilds the page. Remove only whitespace that contains a line break (single spaces between inline elements are kept),
 * and leave <script>/<style>/<pre>/<textarea> alone. Idempotent (a second pass finds nothing). */
const KEEP = /(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<pre\b[\s\S]*?<\/pre>|<textarea\b[\s\S]*?<\/textarea>)/;
function tidy(seg) {
  return seg
    .replace(/>[ \t]*\r?\n\s*</g, '><')                      // whitespace-only run between two tags
    .replace(/>[ \t]*\r?\n\s*(?=[^<\s])/g, '>')              // line break + indent before text
    .replace(/([^>\s])[ \t]*\r?\n\s*</g, '$1<')              // text, line break, then a tag
    .replace(/([^>\s])[ \t]*\r?\n\s*(?=[^<\s])/g, '$1 ');   // line break inside text -> one space
}
for (const f of walk(path.join(APP, '..')).filter((x) => x.endsWith('.html'))) {
  const t = fs.readFileSync(f, 'utf8');
  const u = t.split(KEEP).map((seg, i) => (i % 2 ? seg : tidy(seg))).join('');
  if (u !== t) { fs.writeFileSync(f, u); done.push(path.relative(path.join(APP, '..'), f) + ' (whitespace)'); }
}
console.log('flight sync: ' + (done.length ? done.join(', ') : 'already'));
