import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Dubai pet taxi page: the hero card shows the three ride types (Within Dubai / Airport Transfer / City to City)
 * and each one opens the booking page (/book-pet-taxi?ride=...). The fare calculator in the card is hidden.
 * public/gpc-taxi-rides.js builds the block; the CSS below is scoped to the taxi page only.
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const CSS_START = '/*gpc-taxi-rides*/';
const CSS_END = '/*end-gpc-taxi-rides*/';
const T = 'body:has(h1.pet-taxi-hero-h1)';
const CSS = [
  CSS_START,
  `${T} #dubai-taxi-calculator>:not(#gpc-taxi-rides){display:none!important}`,
  `${T} #gpc-taxi-rides{padding:1.5rem 1.5rem 1.25rem;font-family:inherit}`,
  `${T} .gtr-k{margin:0 0 .25rem;font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#0e7396}`,
  `${T} .gtr-h{margin:0;font-size:1.6rem;line-height:1.2;font-weight:800;color:#052d49}`,
  `${T} .gtr-p{margin:.4rem 0 1rem;font-size:.95rem;line-height:1.55;color:#475569}`,
  `${T} .gtr-list{display:grid;gap:.65rem}`,
  `${T} .gtr-ride{display:flex;align-items:center;gap:.9rem;padding:.9rem 1rem;border-radius:1.1rem;border:2px solid rgba(14,115,150,.2);background:#fff;text-decoration:none;transition:border-color .2s,transform .2s,box-shadow .2s,background .2s}`,
  `${T} .gtr-ride:hover{border-color:#0e7396;background:#eaf7fb;transform:translateY(-2px);box-shadow:0 14px 28px -20px rgba(5,45,73,.5)}`,
  `${T} .gtr-ic{flex:none;font-size:1.7rem;line-height:1}`,
  `${T} .gtr-t{flex:1;min-width:0;display:flex;flex-direction:column;gap:.15rem}`,
  `${T} .gtr-t b{color:#052d49;font-size:1.05rem}`,
  `${T} .gtr-t small{color:#475569;font-size:.85rem;line-height:1.4}`,
  `${T} .gtr-go{flex:none;font-size:1.2rem;font-weight:800;color:#0e7396;transition:transform .2s}`,
  `${T} .gtr-ride:hover .gtr-go{transform:translateX(3px)}`,
  `${T} .gtr-all{display:block;margin-top:.9rem;text-align:center;font-size:.9rem;font-weight:700;color:#c2410c;text-decoration:none}`,
  `${T} .gtr-all:hover{text-decoration:underline}`,
  // placeholder while the script builds the block (otherwise the card is an empty line for a moment)
  `${T} #dubai-taxi-calculator:not(:has(#gpc-taxi-rides)){min-height:398px;position:relative;background:#fff}`,
  `${T} #dubai-taxi-calculator:not(:has(#gpc-taxi-rides))::before{content:"Choose your ride";display:block;padding:2.6rem 1.5rem 0;font-size:1.6rem;font-weight:800;color:#052d49}`,
  `${T} #dubai-taxi-calculator:not(:has(#gpc-taxi-rides))::after{content:"";position:absolute;left:1.5rem;right:1.5rem;top:7.2rem;height:4.9rem;border-radius:1.1rem;background:#eef6f9;box-shadow:0 5.6rem 0 #eef6f9,0 11.2rem 0 #eef6f9}`,
  // desktop: the card is vertically centred in the 700px hero, level with the heading text
  `@media (min-width:1024px){body:has(h1.pet-taxi-hero-h1) div.font-body:has(#dubai-taxi-calculator) section:has(>#dubai-taxi-calculator){top:350px!important;transform:translateY(-50%)}}`,
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

const html = path.join(ROOT, 'server', 'app', 'dubai-pet-taxi.html');
let h = fs.readFileSync(html, 'utf8');
const TAG = '<script defer src="/gpc-taxi-rides.js?v=2"></script>';
if (!h.includes(TAG)) {
  h = h.replace(/<script defer src="\/gpc-taxi-rides\.js[^"]*"><\/script>/, '');
  h = h.replace('</head>', TAG + '</head>');
  fs.writeFileSync(html, h);
}
console.log('taxi rides: css + script tag');
