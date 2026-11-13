import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /how-it-works photos:
 *   hero "How Global Pet Cab Works"             -> /banners/hiw-hero.webp   team member with the dog and cat at the van, Dubai skyline
 *   "Dubai Pet Taxi Journey Steps" (portrait)    -> /banners/hiw-taxi.webp   pet parent and driver with a beagle at the van
 *   "International Pet Relocation Steps" (css bg) -> /banners/hiw-intl.webp  dog and cat at DXB with the skyline
 * The final "Let's Get Your Pet Moving" banner keeps its current photo. Patches the compiled page, the prerendered html and the rsc,
 * every form the url appears in (plain, html-escaped, json-escaped, url-encoded in the srcset/preload tags). Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const SWAPS = [
  { id: '1587300003388', to: '/banners/hiw-hero.webp' },
  { id: '1444212477490', to: '/banners/hiw-taxi.webp' },
];
const files = ['how-it-works/page.js', 'how-it-works.html', 'how-it-works.rsc'].map((f) => path.join(APP, f));
const changed = [];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  let u = t;
  for (const { id, to } of SWAPS) {
    const raw = new RegExp(`https://images\\.unsplash\\.com/photo-${id}-[0-9a-f]+\\?auto=format(?:&amp;|&|\\\\u0026)fit=crop(?:&amp;|&|\\\\u0026)w=\\d+(?:&amp;|&|\\\\u0026)q=\\d+`, 'g');
    const enc = new RegExp(`https%3A%2F%2Fimages\\.unsplash\\.com%2Fphoto-${id}-[0-9a-f]+%3Fauto%3Dformat%26fit%3Dcrop%26w%3D\\d+%26q%3D\\d+`, 'g');
    u = u.replace(raw, to).replace(enc, encodeURIComponent(to));
  }
  if (u !== t) { fs.writeFileSync(f, u); changed.push(path.relative(APP, f)); }
}
console.log('how-it-works images: ' + (changed.length ? changed.join(', ') : 'already'));

const CSS_START = '/*gpc-hiw-images*/';
const CSS_END = '/*end-gpc-hiw-images*/';
const CSS = [
  CSS_START,
  'img[src*="hiw-hero"]~.bg-navy\\/70{background-color:rgba(5,45,73,.3)!important}',
  'img[src*="hiw-hero"]~.bg-gradient-to-r{opacity:.75}',
  'img[src*="hiw-hero"]{object-position:50% 40%!important}',
  'img[src*="hiw-taxi"]{object-position:50% 45%!important}',
  // "International Pet Relocation Steps" section background
  'html body:not(#gpc-t):not(#gpc-u):has(#dubai-taxi-steps) main section.py-20.bg-navy{background-image:linear-gradient(180deg,rgba(5,45,73,.84) 0%,rgba(5,45,73,.74) 55%,rgba(3,31,51,.92) 100%),url("/_next/image?url=%2Fbanners%2Fhiw-intl.webp&w=1920&q=75")!important;background-position:center 40%!important}',
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
