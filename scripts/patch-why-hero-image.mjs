import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /why-global-pet-cab hero banner ("Why Global Pet Cab"): stock dog photo -> /banners/why-hero.webp (pet parent hugging her dog and cat, Dubai skyline, Global Pet Cab van).
 * Only the w=2000 hero use of the photo is replaced (the first card of the section below keeps its own w=900 image). Patches the compiled page,
 * the prerendered html (img, srcset and the preload link) and the rsc. The overlay is lightened so the photo shows. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const NEW = '/banners/why-hero.webp';
const raw = /https:\/\/images\.unsplash\.com\/photo-1548199973-03cce0bbc87b\?auto=format(?:&amp;|&|\\u0026)fit=crop(?:&amp;|&|\\u0026)w=2000(?:&amp;|&|\\u0026)q=\d+/g;
const enc = /https%3A%2F%2Fimages\.unsplash\.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D\d+/g;
const done = [];
for (const f of ['why-global-pet-cab/page.js', 'why-global-pet-cab.html', 'why-global-pet-cab.rsc']) {
  const fp = path.join(APP, f);
  if (!fs.existsSync(fp)) continue;
  const t = fs.readFileSync(fp, 'utf8');
  const u = t.replace(raw, NEW).replace(enc, encodeURIComponent(NEW));
  if (u !== t) { fs.writeFileSync(fp, u); done.push(f); }
}
console.log('why hero image: ' + (done.length ? done.join(', ') : 'already'));

const CSS_START = '/*gpc-why-hero*/';
const CSS_END = '/*end-gpc-why-hero*/';
const CSS = [
  CSS_START,
  'img[src*="why-hero"]~.bg-navy\\/70{background-color:rgba(5,45,73,.58)!important}',
  'img[src*="why-hero"]~.bg-gradient-to-r{opacity:1}',
  'img[src*="why-hero"]{object-position:50% 40%!important}',
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
