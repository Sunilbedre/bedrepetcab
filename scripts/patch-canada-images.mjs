import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /destinations/dubai-to-canada photos (the other destinations keep theirs; each destination has its own block in destinations/[slug]/page.js):
 *   hero (h1 "Moving Your Pet Between Dubai & Canada?")        -> /banners/canada-hero.webp   dog + cat, Dubai skyline -> Canada skyline
 *   "More Than Just Getting From Dubai to Canada"               -> /banners/canada-route.webp  dog + cat on the flight
 *   "Need Help Getting Your Pet Ready?"                         -> /banners/canada-ready.webp  checklist, passport, crate
 * Overlays on these three are lightened so the photos show. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const file = path.join(ROOT, 'server', 'app', 'destinations', '[slug]', 'page.js');
let t = fs.readFileSync(file, 'utf8');
const before = t;

const HERO = '/banners/canada-hero.webp', ROUTE = '/banners/canada-route.webp', READY = '/banners/canada-ready.webp';
const ALT_HERO = 'A golden retriever and a cat with the Dubai skyline on one side and Canada on the other';
const ALT_ROUTE = 'A golden retriever and a cat travelling together, looking out of the plane window at the wing and the sunset';
const ALT_READY = 'A pet travel checklist, passport and crate ready for the journey to Canada';

// route banner (alt "Canada Pet Relocation Route"): keeps Canada's block anchored
const routeRe = /(a\.jsx\("img",\{src:)"[^"]*"(,alt:)"(?:Canada Pet Relocation Route|[^"]*plane window[^"]*)"/;
const readyRe = /(a\.jsx\("img",\{src:)"[^"]*"(,alt:)"(?:Local Pet Care Support|A pet travel checklist[^"]*)"/;
const rm = routeRe.exec(t);
if (!rm) throw new Error('patch-canada-images: route banner not found');
// hero: the last hero image (alt:"") before the route banner belongs to the Canada block
const heroCtx = 'alt:"",className:"w-full h-full object-cover object-center"}),\n        a.jsx("div",{className:"absolute inset-0 bg-navy/75"})';
const heroRe = /(a\.jsx\("img",\{src:)"[^"]*"(,alt:)"[^"]*"(,className:"w-full h-full object-cover object-center"\}\),\s*a\.jsx\("div",\{className:"absolute inset-0 bg-navy\/75"\}\))/g;
let hm, last = null;
while ((hm = heroRe.exec(t)) && hm.index < rm.index) last = hm;
if (!last) throw new Error('patch-canada-images: hero not found');
const apply = (str, m, src, alt) => str.slice(0, m.index) + m[0].replace(/^(a\.jsx\("img",\{src:)"[^"]*"(,alt:)"[^"]*"/, `$1${JSON.stringify(src)}$2${JSON.stringify(alt)}`) + str.slice(m.index + m[0].length);
// apply from the end backwards so earlier offsets stay valid
const cm = readyRe.exec(t);
if (!cm) throw new Error('patch-canada-images: ready banner not found');
const jobs = [[cm, READY, ALT_READY], [rm, ROUTE, ALT_ROUTE], [last, HERO, ALT_HERO]].sort((a, b) => b[0].index - a[0].index);
for (const [m, src, alt] of jobs) t = apply(t, m, src, alt);
if (t !== before) { fs.writeFileSync(file, t); console.log('canada images: replaced'); } else console.log('canada images: already');

const CSS_START = '/*gpc-canada-images*/';
const CSS_END = '/*end-gpc-canada-images*/';
const CSS = [
  CSS_START,
  'img[src*="canada-hero"]~.bg-navy\\/75{background-color:rgba(5,45,73,.3)!important}',
  'img[src*="canada-hero"]{object-position:50% 40%!important}',
  'img[src*="canada-hero"]~.bg-gradient-to-r{opacity:.7}',
  'img[src*="canada-route"]~.bg-navy,img[src*="canada-ready"]~.bg-navy{opacity:.3!important}',
  'img[src*="canada-route"]~div:not(.bg-navy),img[src*="canada-ready"]~div:not(.bg-navy){opacity:.45}',
  CSS_END,
].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((x) => x.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let c = fs.readFileSync(fp, 'utf8');
  const a = c.indexOf(CSS_START);
  if (a !== -1) c = c.slice(0, a) + c.slice(c.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, c.trimEnd() + '\n' + CSS + '\n');
}
