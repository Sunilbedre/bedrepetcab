import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * "Moving Your Pet? Let Global Pet Cab Handle the Journey." banner: background photo -> /banners/cta-dog.webp (Shih Tzu at the airport).
 * Only that banner (the section with img "object-cover object-center" + the 78% navy overlay) is changed; the same stock photo is still used by
 * other sections (why-us hero, how-it-works / international hero css) on purpose. Patches the compiled pages (js), the prerendered html and rsc.
 * Also restyles the international pages' "Planning a move?" banner (css background, public/banners/cta-airport.webp).
 * Also keeps the dog in view on phones (photo is cropped from the right) and lightens the dark overlay so the photo shows. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const NEW = '/banners/cta-dog.webp';
const KEY = 'photo-1548199973-03cce0bbc87b';
let n = 0;

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'cache' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
for (const f of walk(path.join(ROOT, 'server'))) {
  if (!/\.(js|html|rsc)$/.test(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  if (!t.includes(KEY)) continue;
  let u = t;
  if (f.endsWith('.js')) {
    u = u.replace(/src:"https:\/\/images\.unsplash\.com\/photo-1548199973-03cce0bbc87b\?auto=format&fit=crop&w=2000&q=80",alt:"",fill:!0,className:"object-cover object-center"/g,
      `src:"${NEW}",alt:"",fill:!0,className:"object-cover object-center"`);
  } else {
    if (f.endsWith('.html')) {
      u = u.replace(/<img alt="" [^>]*class="object-cover object-center"[^>]*>/g, (tag) => (tag.includes(KEY)
        ? tag.split('https%3A%2F%2Fimages.unsplash.com%2Fphoto-1548199973-03cce0bbc87b%3Fauto%3Dformat%26fit%3Dcrop%26w%3D2000%26q%3D80').join(encodeURIComponent(NEW)) : tag));
    }
    // flight data (raw .rsc: plain quotes; inside the html: escaped quotes)
    u = u.replace(/(\\?)"src(\\?)":(\\?)"https:\/\/images\.unsplash\.com\/photo-1548199973-03cce0bbc87b\?auto=format(?:\\u0026|&)fit=crop(?:\\u0026|&)w=2000(?:\\u0026|&)q=80(\\?)",(\\?)"alt(\\?)":(\\?)"(\\?)"(,(\\?)"fill(\\?)":true,(\\?)"className(\\?)":(\\?)"object-cover object-center)/g,
      (m, ...g) => m.replace(/https:\/\/images\.unsplash\.com\/photo-1548199973-03cce0bbc87b\?auto=format(?:\\u0026|&)fit=crop(?:\\u0026|&)w=2000(?:\\u0026|&)q=80/, NEW));
  }
  if (u !== t) { fs.writeFileSync(f, u); n++; }
}

const CSS_START = '/*gpc-cta-image*/';
const CSS_END = '/*end-gpc-cta-image*/';
const IMG = 'img[src*="cta-dog"]';
const CSS = [
  CSS_START,
  `${IMG}{object-position:80% 50%!important}`,
  `@media (min-width:768px){${IMG}{object-position:center 40%!important}}`,
  `${IMG}~.bg-navy\\/78{background-color:rgba(5,45,73,.5)!important}`,
  `${IMG}~.bg-gradient-to-t{opacity:.75}`,
  // "Planning a move? Your Pet's Next Journey Starts With a Conversation" (international pages): airport photo, lighter navy overlay
  'html body:not(#gpc-t):not(#gpc-u) .gpc-intl-page>section.text-center.text-white{background-image:linear-gradient(90deg,rgba(3,31,51,.86) 0%,rgba(5,45,73,.74) 55%,rgba(5,45,73,.62) 100%),url("/_next/image?url=%2Fbanners%2Fcta-airport.webp&w=1920&q=75")!important;background-position:center 40%!important}',
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
console.log('cta image: patched ' + n + ' files + css');
