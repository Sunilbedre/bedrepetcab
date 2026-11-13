import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /destinations/dubai-to-uk photos (other destinations keep theirs; each has its own block in destinations/[slug]/page.js):
 *   hero (h1 "Pet Relocation from Dubai to the UK, Made Simple")     -> /banners/uk-hero.webp     dog + cat, Dubai skyline -> London
 *   "We Know the Hard Part Isn't Just the Flight"     -> /banners/uk-support.webp  pet parent, dog, cat, passport and travel checklist
 * Overlays on both are lightened so the photos show. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const file = path.join(ROOT, 'server', 'app', 'destinations', '[slug]', 'page.js');
let t = fs.readFileSync(file, 'utf8');
const before = t;
const HERO = '/banners/uk-hero.webp', SUP = '/banners/uk-support.webp';
const ALT_HERO = 'A golden retriever and a cat with the Dubai skyline on one side and London on the other';
const ALT_SUP = 'A pet parent with her dog and cat, holding a passport next to an international pet travel checklist';

const supRe = /a\.jsx\("img",\{src:"[^"]*",alt:"(?:Pet Care Support|A pet parent with her dog and cat[^"]*)"/;
const sm = supRe.exec(t);
if (!sm) throw new Error('patch-uk-images: support banner not found');
const heroRe = /a\.jsx\("img",\{src:"[^"]*",alt:"[^"]*",className:"w-full h-full object-cover object-center"\}\),\s*a\.jsx\("div",\{className:"absolute inset-0 bg-navy\/75"\}\)/g;
let hm, hero = null;
while ((hm = heroRe.exec(t)) && hm.index < sm.index) hero = hm;
if (!hero) throw new Error('patch-uk-images: hero not found');
const swap = (str, m, src, alt) => str.slice(0, m.index) + m[0].replace(/^(a\.jsx\("img",\{src:)"[^"]*"(,alt:)"[^"]*"/, `$1${JSON.stringify(src)}$2${JSON.stringify(alt)}`) + str.slice(m.index + m[0].length);
for (const [m, src, alt] of [[sm, SUP, ALT_SUP], [hero, HERO, ALT_HERO]].sort((a, b) => b[0].index - a[0].index)) t = swap(t, m, src, alt);
if (t !== before) { fs.writeFileSync(file, t); console.log('uk images: replaced'); } else console.log('uk images: already');

const CSS_START = '/*gpc-uk-images*/';
const CSS_END = '/*end-gpc-uk-images*/';
const CSS = [
  CSS_START,
  'img[src*="uk-hero"]~.bg-navy\\/75{background-color:rgba(5,45,73,.3)!important}',
  'img[src*="uk-hero"]~.bg-gradient-to-r{opacity:.7}',
  'img[src*="uk-hero"]{object-position:50% 40%!important}',
  'img[src*="uk-support"]~.bg-navy{opacity:.3!important}',
  'img[src*="uk-support"]~div:not(.bg-navy){opacity:.45}',
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
