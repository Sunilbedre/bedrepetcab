import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Fixes from reviewing /why-global-pet-cab:
 *  1. The closing banner photo showed a third-party brand logo: swapped for an unbranded dog photo.
 *  2. The banner had no overlay (opacity classes are missing from the compiled stylesheet).
 *  3. The footer's own call-to-action strip repeated the banner right below it: hidden on this page.
 *  4. The hero trust bar hung half out of the hero and the next section reserved a fixed gap for it: kept inside the hero.
 *  5. The reasons section gets a tinted background and scroll-rise animation on its cards.
 * CSS is scoped to this page (the six-card grid only exists here).
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');

const OLD_PHOTO = 'photo-1601758228041-f3b2795255f1';
const NEW_PHOTO = 'photo-1548199973-03cce0bbc87b';
const changed = [];
const SCRIPT_TAG = '<script defer src="/gpc-why-reveal.js"></script>';
const htmlFile = path.join(APP, 'why-global-pet-cab.html');
if (fs.existsSync(htmlFile)) {
  const h = fs.readFileSync(htmlFile, 'utf8');
  if (!h.includes(SCRIPT_TAG)) { fs.writeFileSync(htmlFile, h.replace('</body>', SCRIPT_TAG + '</body>')); changed.push('script tag'); }
}

for (const f of ['why-global-pet-cab.html', 'why-global-pet-cab.rsc', path.join('why-global-pet-cab', 'page.js')]) {
  const fp = path.join(APP, f);
  if (!fs.existsSync(fp)) continue;
  const s = fs.readFileSync(fp, 'utf8');
  const next = s.split(OLD_PHOTO).join(NEW_PHOTO);
  if (next !== s) { fs.writeFileSync(fp, next); changed.push('photo: ' + f); }
}

const CSS_START = '/*gpc-why-us*/';
const CSS_END = '/*end-gpc-why-us*/';
const B = 'body:has(main article[class*="lg:grid-cols-12"][class*="rounded-[32px]"])';
const CSS = [
  CSS_START,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy)::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(3,31,51,.93) 0%,rgba(5,45,73,.84) 55%,rgba(5,45,73,.72) 100%)}`,
  `${B} main section.relative.overflow-hidden.text-white:not(.bg-navy)>.relative{position:relative;z-index:10}`,
  `${B} footer>div.bg-teal-soft:first-child{display:none}`,
  `${B} main section.relative.overflow-hidden.bg-navy{padding-bottom:3rem}`,
  `${B} main section.relative.overflow-hidden.bg-navy .z-30{transform:none}`,
  `${B} main section.relative.overflow-hidden.bg-navy+section{padding-top:3.5rem}`,
  `${B} main section.pb-20.bg-\\[\\#FBFBFA\\]{background-color:#eef7f9;background-image:radial-gradient(60rem 28rem at 8% 0%,rgba(20,184,166,.14),transparent 70%),radial-gradient(50rem 26rem at 100% 100%,rgba(5,45,73,.08),transparent 70%)}`,
  // criss-cross cards: photo and text slide in from opposite sides (alternating per card) when public/gpc-why-reveal.js marks them in view
  `${B} main article[class*="lg:grid-cols-12"]>div{transition:opacity .8s ease,transform .9s cubic-bezier(.16,1,.3,1)}`,
  `${B} main article[class*="lg:grid-cols-12"]>div:last-child{transition-delay:.12s}`,
  `${B} main article[class*="lg:grid-cols-12"] img{transition:transform 1.4s cubic-bezier(.16,1,.3,1)}`,
  `${B} main article[class*="lg:grid-cols-12"][data-pre]:not([data-in])>div{opacity:0;transform:translateX(-80px)}`,
  `${B} main article[class*="lg:grid-cols-12"][data-pre]:not([data-in])>div:last-child{transform:translateX(80px)}`,
  `${B} main article[class*="lg:grid-cols-12"][data-pre]:not([data-in]):nth-of-type(even)>div{transform:translateX(80px)}`,
  `${B} main article[class*="lg:grid-cols-12"][data-pre]:not([data-in]):nth-of-type(even)>div:last-child{transform:translateX(-80px)}`,
  `${B} main article[class*="lg:grid-cols-12"][data-pre]:not([data-in]) img{transform:scale(1.18)}`,
  CSS_END,
].join('\n');

const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const a = t.indexOf(CSS_START);
  if (a !== -1) t = t.slice(0, a) + t.slice(t.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, t.trimEnd() + '\n' + CSS + '\n');
}
changed.push('css');
console.log('why-us fixes:\n  ' + changed.join('\n  '));
