import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /dubai-pet-taxi photos:
 *   hero                  -> /banners/taxi-hero.webp   (the "PET TAXI" van)
 *   "How it works" steps  -> /banners/taxi-steps.webp  (dog being loaded into the van; css background)
 *   final banner          -> /banners/taxi-cta.webp    (driver and pet parent greeting the dog)
 * The hero and the final banner used the same stock dog photo; both are replaced in the compiled page, the prerendered html and the rsc.
 * The same stock photo stays on other pages. Overlays are lightened so the photos show. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const NEW = ['/banners/taxi-hero.webp', '/banners/taxi-cta.webp']; // 1st and 2nd use of the stock photo on the page
const KEY = 'photo-1587300003388-59208cc962cb';
const files = ['dubai-pet-taxi/page.js', 'dubai-pet-taxi.html', 'dubai-pet-taxi.rsc'].map((f) => path.join(APP, f));
const changed = [];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  if (!t.includes(KEY)) continue;
  let u = t, n = 0;
  const next = () => NEW[Math.min(n++, NEW.length - 1)];
  if (f.endsWith('.js')) {
    u = u.replace(/https:\/\/images\.unsplash\.com\/photo-1587300003388-59208cc962cb\?auto=format&fit=crop&w=2000&q=80/g, () => next());
  } else {
    if (f.endsWith('.html')) {
      // the hero's <link rel="preload" as="image"> in the head
      u = u.replace(/<link [^>]*1587300003388[^>]*>/g, (tag) => tag.split('https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80').join(encodeURIComponent(NEW[0])));
      u = u.replace(/<img [^>]*1587300003388[^>]*>/g, (tag) => {
        const to = next();
        return tag.split('https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587300003388-59208cc962cb%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80').join(encodeURIComponent(to));
      });
      n = 0; // the flight data below repeats the same two images in the same order
    }
    u = u.replace(/https:\/\/images\.unsplash\.com\/photo-1587300003388-59208cc962cb\?auto=format(?:\\u0026|&)fit=crop(?:\\u0026|&)w=2000(?:\\u0026|&)q=80/g, () => next());
  }
  if (u !== t) { fs.writeFileSync(f, u); changed.push(path.relative(APP, f)); }
}

const CSS_START = '/*gpc-taxi-images*/';
const CSS_END = '/*end-gpc-taxi-images*/';
const CSS = [
  CSS_START,
  'img[src*="taxi-hero"]~.bg-navy\\/72{background-color:rgba(5,45,73,.38)!important}',
  'img[src*="taxi-cta"]~.bg-navy\\/78{background-color:rgba(5,45,73,.7)!important}',
  'img[src*="taxi-cta"]~.bg-gradient-to-t{opacity:1}',
  'img[src*="taxi-hero"]{object-position:60% 50%!important}',
  'html body:not(#gpc-t):not(#gpc-u):has(h1.pet-taxi-hero-h1) main section:has(.how-it-works-single-line){background-image:linear-gradient(180deg,rgba(5,45,73,.84) 0%,rgba(5,45,73,.74) 55%,rgba(3,31,51,.92) 100%),url("/_next/image?url=%2Fbanners%2Ftaxi-steps.webp&w=1920&q=75")!important;background-position:center 35%!important}',
  CSS_END,
].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((x) => x.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
}
console.log('taxi images: ' + (changed.length ? changed.join(', ') : 'already') + ' + css');
