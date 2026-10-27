import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Real customer photos (public/gallery/pet-1.jpg … pet-11.jpg, resized from the supplied originals):
 *  1. a "Real Journeys" photo section on the home page, above the FAQ, linking to the gallery
 *  2. a new /gallery page (cloned from the why-global-pet-cab bundle, own module ids, registered in the manifests)
 *     with a CSS-only lightbox (:target), so it needs no client JavaScript
 *  3. "Gallery" links in the header (desktop + mobile menu) and the footer
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const changed = [];

const PHOTOS = [
  { n: 1, cap: 'Travel crate with live-animal labels, ready at the airport' },
  { n: 2, cap: 'Reunited with a pug at the airport animal reception' },
  { n: 3, cap: 'A family welcoming their Labrador after the journey' },
  { n: 4, cap: 'A happy beagle settling in at home' },
  { n: 5, cap: 'Crate handover with the pet parent' },
  { n: 6, cap: 'A fluffy white dog and the team at the door' },
  { n: 7, cap: 'An emotional reunion' },
  { n: 8, cap: 'A relaxed pug at home with its owner and our handler' },
  { n: 9, cap: 'A Labrador out for a walk after arrival' },
  { n: 10, cap: 'Two big dogs relaxing after the trip' },
  { n: 11, cap: 'A golden retriever greeted by the whole family' },
];
const HOME_PICKS = [1, 2, 3, 4, 7, 11];
const img = (n, extra = '') => `"/gallery/pet-${n}.jpg"${extra}`;

/* ---------- markup builders (S = jsx runtime variable of the bundle) ---------- */
function homeSection(S) {
  const J = `${S}.jsx`;
  const JS = `(0,${S}.jsxs)`;
  const cards = HOME_PICKS.map((n) => {
    const p = PHOTOS[n - 1];
    return `${JS}("a",{href:"/gallery#gpc-lb-${n}",className:"gpc-gal-card",children:[${J}("img",{src:${img(n)},alt:${JSON.stringify(p.cap)},loading:"lazy",width:640,height:640}),${J}("span",{className:"gpc-gal-cap",children:${JSON.stringify(p.cap)}})]},${n})`;
  }).join(',');
  return `${JS}("section",{className:"gpc-gal-home",id:"real-journeys",children:${JS}("div",{className:"gpc-gal-wrap",children:[${JS}("div",{className:"gpc-gal-head",children:[${J}("span",{className:"gpc-gal-badge",children:"REAL PET JOURNEYS"}),${J}("h2",{className:"gpc-gal-title font-heading",children:"Real Pets. Real Journeys. Real Reunions."}),${J}("p",{className:"gpc-gal-lead",children:"A few moments from the journeys we have coordinated, from airport handovers to the first hello at home."})]}),${J}("div",{className:"gpc-gal-grid gpc-gal-grid-home",children:[${cards}]}),${J}("div",{className:"gpc-gal-more",children:${JS}("a",{href:"/gallery",className:"gpc-gal-btn",children:["View the full gallery",${J}("span",{"aria-hidden":"true",children:" \\u2192"})]})})]})})`;
}

function galleryModule(P) {
  const S = 's';
  const J = `${S}.jsx`;
  const JS = `(0,${S}.jsxs)`;
  const tiles = PHOTOS.map((p) => `${JS}("a",{href:"#gpc-lb-${p.n}",className:"gpc-gal-card",children:[${J}("img",{src:${img(p.n)},alt:${JSON.stringify(p.cap)},loading:${p.n <= 4 ? '"eager"' : '"lazy"'},width:800,height:800}),${J}("span",{className:"gpc-gal-cap",children:${JSON.stringify(p.cap)}})]},${p.n})`).join(',');
  const boxes = PHOTOS.map((p) => `${JS}("div",{id:"gpc-lb-${p.n}",className:"gpc-lb",children:[${J}("a",{href:"#gpc-gal",className:"gpc-lb-bg","aria-label":"Close"}),${JS}("figure",{className:"gpc-lb-fig",children:[${J}("img",{src:${img(p.n)},alt:${JSON.stringify(p.cap)}}),${J}("figcaption",{children:${JSON.stringify(p.cap)}})]}),${J}("a",{href:"#gpc-gal",className:"gpc-lb-x","aria-label":"Close",children:"\\u00d7"}),${PHOTOS[p.n - 2] ? `${J}("a",{href:"#gpc-lb-${p.n - 1}",className:"gpc-lb-nav gpc-lb-prev","aria-label":"Previous photo",children:"\\u2039"})` : 'null'},${PHOTOS[p.n] ? `${J}("a",{href:"#gpc-lb-${p.n + 1}",className:"gpc-lb-nav gpc-lb-next","aria-label":"Next photo",children:"\\u203a"})` : 'null'}]},${p.n})`).join(',');
  const btn = (href, cls, label, ext = '') => `${J}("a",{href:${JSON.stringify(href)},${ext}className:"${cls}",children:${JSON.stringify(label)}})`;
  return `${P}:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p,metadata:()=>h});var s=a(9510);let h={title:"Pet Relocation Gallery — Real Journeys | Global Pet Cab Dubai",description:"Real photos from the pet journeys Global Pet Cab has coordinated: airport handovers, happy reunions and pets settling in at home."};function p(){return ${JS}("div",{className:"font-body gpc-gallery-page",children:[${JS}("section",{className:"gpc-galp-hero",children:${JS}("div",{className:"gpc-gal-wrap",children:[${J}("span",{className:"gpc-gal-badge gpc-gal-badge-dark",children:"GALLERY"}),${J}("h1",{className:"gpc-galp-title font-heading",children:"Real Pets. Real Journeys. Real Reunions."}),${J}("p",{className:"gpc-galp-lead",children:"Photos from the journeys our team has coordinated, from airport handovers and crate preparation to the first hello at home. Tap any photo to see it larger."})]})}),${JS}("section",{className:"gpc-galp-body",id:"gpc-gal",children:${JS}("div",{className:"gpc-gal-wrap",children:${J}("div",{className:"gpc-gal-grid",children:[${tiles}]})})}),${boxes},${JS}("section",{className:"gpc-galp-cta",children:${JS}("div",{className:"gpc-gal-wrap",children:[${J}("h2",{className:"gpc-gal-title font-heading",children:"Your Pet's Journey Could Be Next"}),${J}("p",{className:"gpc-gal-lead",children:"Tell us where your pet is going and we will plan the journey with you, step by step."}),${JS}("div",{className:"gpc-gal-actions",children:[${btn('/get-a-quote', 'gpc-gal-btn', 'Get a Free Quote')},${btn('https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai', 'gpc-gal-btn gpc-gal-btn-wa', 'WhatsApp Us', 'target:"_blank",rel:"noopener noreferrer",')}]})]})})]})}}`;
}

/* ---------- 1. home page ---------- */
const HOME = path.join(APP, 'page.js');
{
  let s = fs.readFileSync(HOME, 'utf8');
  if (!s.includes('gpc-gal-home')) {
    const from = 's.jsx(w.Z,{}),s.jsx(k.Z,{})';
    if (!s.includes(from)) throw new Error('patch-gallery: home sections not found');
    s = s.replace(from, () => `s.jsx(w.Z,{}),${homeSection('s')},s.jsx(k.Z,{})`);
    fs.writeFileSync(HOME, s);
    changed.push('home section');
  }
}

/* ---------- 2. /gallery route ---------- */
const BASE = path.join(APP, 'why-global-pet-cab', 'page.js');
const DIR = path.join(APP, 'gallery');
const IDS = { chunk: 930607, entry: 931167, page: 936189 };
if (!fs.existsSync(path.join(DIR, 'page.js')) || !fs.readFileSync(path.join(DIR, 'page.js'), 'utf8').includes('gpc-gallery-page')) {
  let s = fs.readFileSync(BASE, 'utf8');
  const must = (str, from, to) => {
    if (!str.includes(from)) throw new Error('patch-gallery: not found: ' + String(from).slice(0, 60));
    return str.split(from).join(to);
  };
  s = must(s, 'e.id=607,e.ids=[607]', `e.id=${IDS.chunk},e.ids=[${IDS.chunk}]`);
  s = s.replace(/\b1167\b/g, String(IDS.entry)).replace(/\b6189\b/g, String(IDS.page));
  s = must(s, '"/why-global-pet-cab/page"', '"/gallery/page"');
  s = must(s, 'pathname:"/why-global-pet-cab"', 'pathname:"/gallery"');
  s = must(s, '["why-global-pet-cab",{children:["__PAGE__"', '["gallery",{children:["__PAGE__"');
  s = s.split('why-global-pet-cab\\\\page.tsx').join('gallery\\\\page.tsx');
  const a = s.indexOf(`${IDS.page}:(e,t,a)=>{"use strict";a.r(t)`);
  const b = s.indexOf(';var t=require("../../webpack-runtime.js")');
  if (a === -1 || b === -1) throw new Error('patch-gallery: page module boundaries not found');
  s = s.slice(0, a) + galleryModule(IDS.page) + '}' + s.slice(b);
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, 'page.js'), s);

  const mf = fs.readFileSync(path.join(APP, 'why-global-pet-cab', 'page_client-reference-manifest.js'), 'utf8');
  fs.writeFileSync(
    path.join(DIR, 'page_client-reference-manifest.js'),
    mf.split('"/why-global-pet-cab/page"').join('"/gallery/page"').split('why-global-pet-cab\\\\page"').join('gallery\\\\page"'),
  );
  changed.push('gallery route');
}
const updateJson = (file, fn) => {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = JSON.stringify(j);
  fn(j);
  if (JSON.stringify(j) !== before) { fs.writeFileSync(file, JSON.stringify(j, null, 2)); changed.push('manifest: ' + path.basename(file)); }
};
updateJson(path.join(ROOT, 'server', 'app-paths-manifest.json'), (j) => { j['/gallery/page'] = 'app/gallery/page.js'; });
updateJson(path.join(ROOT, 'app-path-routes-manifest.json'), (j) => { j['/gallery/page'] = '/gallery'; });
updateJson(path.join(ROOT, 'app-build-manifest.json'), (j) => { j.pages['/gallery/page'] = j.pages['/why-global-pet-cab/page']; });
updateJson(path.join(ROOT, 'routes-manifest.json'), (j) => {
  if (j.staticRoutes.some((r) => r.page === '/gallery')) return;
  j.staticRoutes.push({ page: '/gallery', regex: '^/gallery(?:/)?$', routeKeys: {}, namedRegex: '^/gallery(?:/)?$' });
});

/* ---------- 3. header + footer links ---------- */
function navPatch(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('href:"/gallery"')) return false;
  let n = 0;
  // desktop nav: after "Guides"
  s = s.replace(/((?:\(0,(\w)\.jsx\)|(\w)\.jsx))\((\w+(?:\.default|\(\))),\{href:"\/resources",className:"(px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all)",children:"Guides"\}\)/, (m, call, _a, _b, link, cls) => { n++; return `${m},${call}(${link},{href:"/gallery",className:"${cls}",children:"Gallery"})`; });
  // mobile menu: after "Guides"
  s = s.replace(/((?:\(0,(\w)\.jsx\)|(\w)\.jsx))\((\w+(?:\.default|\(\))),\{href:"\/resources",onClick:\(\)=>(\w)\(!1\),className:"(block px-3 py-2\.5 rounded-xl hover:bg-teal-soft)",children:"Guides"\}\)/, (m, call, _a, _b, link, setter, cls) => { n++; return `${m},${call}(${link},{href:"/gallery",onClick:()=>${setter}(!1),className:"${cls}",children:"Gallery"})`; });
  // footer: after "Verified Customer Reviews"
  s = s.replace(/((?:\(0,(\w)\.jsx\)|(\w)\.jsx))\("li",\{children:((?:\(0,\w\.jsx\)|\w\.jsx))\((\w+(?:\.default|\(\))),\{href:"\/reviews",className:"([^"]*)",children:"Verified Customer Reviews"\}\)\}\)/, (m, call, _a, _b, inner, link, cls) => { n++; return `${m},${call}("li",{children:${inner}(${link},{href:"/gallery",className:"${cls}",children:"Gallery"})})`; });
  if (n !== 3) throw new Error('patch-gallery: expected 3 link spots in ' + file + ', patched ' + n);
  fs.writeFileSync(file, s);
  return true;
}
const navFiles = [path.join(ROOT, 'server', 'chunks', '322.js'), ...fs.readdirSync(path.join(ROOT, 'static', 'chunks', 'app')).filter((n) => /^layout-.*\.js$/.test(n)).map((n) => path.join(ROOT, 'static', 'chunks', 'app', n))];
for (const f of navFiles) if (navPatch(f)) changed.push('nav: ' + path.relative(ROOT, f));

/* ---------- 4. css ---------- */
const CSS_START = '/*gpc-gallery*/';
const CSS_END = '/*end-gpc-gallery*/';
const CSS = [
  CSS_START,
  '.gpc-gal-wrap{max-width:80rem;margin:0 auto;padding:0 1rem}',
  '@media (min-width:640px){.gpc-gal-wrap{padding:0 1.5rem}}',
  '.gpc-gal-badge{display:inline-block;font-size:.75rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#0e7396;background:#e7f6fb;border:1px solid rgba(14,115,150,.25);padding:.5rem 1rem;border-radius:999px}',
  '.gpc-gal-badge-dark{color:#8fe1f5;background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2)}',
  '.gpc-gal-head{text-align:center;max-width:46rem;margin:0 auto 2.5rem;display:flex;flex-direction:column;gap:1rem;align-items:center}',
  '.gpc-gal-title{font-size:clamp(1.9rem,4vw,2.6rem);line-height:1.15;font-weight:900;color:#052d49;letter-spacing:-.01em;text-wrap:balance;margin:0}',
  '.gpc-gal-lead{font-size:1.0625rem;line-height:1.65;color:#475569;margin:0;text-wrap:pretty}',
  '.gpc-gal-home{padding:5rem 0;background:linear-gradient(180deg,#fff 0%,#eef7f9 100%);border-top:1px solid rgba(14,115,150,.12)}',
  '.gpc-gal-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.9rem}',
  '@media (min-width:768px){.gpc-gal-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:1.1rem}}',
  '@media (min-width:1100px){.gpc-gal-grid:not(.gpc-gal-grid-home){grid-template-columns:repeat(4,minmax(0,1fr))}}',
  '.gpc-gal-card{position:relative;display:block;aspect-ratio:1/1;overflow:hidden;border-radius:1.4rem;background:#dbe9ef;box-shadow:0 1px 2px rgba(5,45,73,.06),0 18px 36px -24px rgba(5,45,73,.45);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}',
  '.gpc-gal-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.16,1,.3,1)}',
  '.gpc-gal-card:hover{transform:translateY(-4px);box-shadow:0 2px 4px rgba(5,45,73,.08),0 26px 44px -22px rgba(5,45,73,.55)}',
  '.gpc-gal-card:hover img{transform:scale(1.06)}',
  '.gpc-gal-cap{position:absolute;left:0;right:0;bottom:0;padding:2.2rem 1rem .9rem;color:#fff;font-size:.85rem;font-weight:700;line-height:1.3;background:linear-gradient(to top,rgba(3,31,51,.82),rgba(3,31,51,0));opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease}',
  '.gpc-gal-card:hover .gpc-gal-cap,.gpc-gal-card:focus-visible .gpc-gal-cap{opacity:1;transform:none}',
  '@media (hover:none){.gpc-gal-cap{opacity:1;transform:none;font-size:.78rem}}',
  '.gpc-gal-more{text-align:center;margin-top:2.25rem}',
  '.gpc-gal-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:1rem 2rem;border-radius:999px;background:#c2410c;color:#fff;font-weight:800;font-size:1rem;box-shadow:0 14px 28px -14px rgba(194,65,12,.7);transition:background .2s,transform .2s;text-decoration:none}',
  '.gpc-gal-btn:hover{background:#9a3412;transform:translateY(-2px)}',
  '.gpc-gal-btn-wa{background:#10b981;box-shadow:0 14px 28px -14px rgba(16,185,129,.7)}.gpc-gal-btn-wa:hover{background:#059669}',
  '.gpc-gal-actions{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-top:1.75rem}',
  '.gpc-galp-hero{background:linear-gradient(90deg,rgba(3,31,51,.93),rgba(5,45,73,.82) 55%,rgba(5,45,73,.7)),url("/gallery/pet-10.jpg") center 40%/cover no-repeat,#052d49;color:#fff;padding:3.5rem 0 3.25rem;text-align:center}',
  '.gpc-galp-hero .gpc-gal-wrap{display:flex;flex-direction:column;align-items:center;gap:1rem}',
  '.gpc-galp-title{font-size:clamp(1.85rem,3.6vw,2.7rem);line-height:1.15;font-weight:900;letter-spacing:-.015em;max-width:60rem;text-wrap:balance;margin:0}',
  '.gpc-galp-lead{max-width:46rem;font-size:1.0625rem;line-height:1.65;color:rgba(255,255,255,.85);margin:0;text-wrap:pretty}',
  '.gpc-galp-body{padding:4rem 0 5rem;background:#fbfbfa;scroll-margin-top:5rem}',
  '.gpc-galp-cta{padding:4.5rem 0;background:linear-gradient(90deg,rgba(3,31,51,.92),rgba(5,45,73,.8) 55%,rgba(5,45,73,.66)),url("/gallery/pet-3.jpg") center 35%/cover no-repeat,#052d49;text-align:center;color:#fff}',
  '.gpc-galp-cta .gpc-gal-title{color:#fff}.gpc-galp-cta .gpc-gal-lead{color:rgba(255,255,255,.9)}',
  '.gpc-galp-cta .gpc-gal-wrap{display:flex;flex-direction:column;align-items:center;gap:.9rem}',
  '.gpc-lb{display:none;position:fixed;inset:0;z-index:200;align-items:center;justify-content:center;padding:1rem}',
  '.gpc-lb:target{display:flex}',
  '.gpc-lb-bg{position:absolute;inset:0;background:rgba(3,19,31,.92)}',
  '.gpc-lb-fig{position:relative;margin:0;max-width:min(92vw,56rem);max-height:92vh;display:flex;flex-direction:column;gap:.75rem;align-items:center}',
  '.gpc-lb-fig img{max-width:100%;max-height:80vh;width:auto;height:auto;border-radius:1rem;box-shadow:0 30px 80px -20px rgba(0,0,0,.7)}',
  '.gpc-lb-fig figcaption{color:#e2eef4;font-weight:600;text-align:center;font-size:.95rem}',
  '.gpc-lb-x{position:absolute;top:1rem;right:1.25rem;width:2.75rem;height:2.75rem;border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font-size:1.9rem;line-height:2.6rem;text-align:center;text-decoration:none}',
  '.gpc-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:3rem;height:3rem;border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font-size:2rem;line-height:2.8rem;text-align:center;text-decoration:none}',
  '.gpc-lb-prev{left:.75rem}.gpc-lb-next{right:.75rem}',
  '.gpc-lb-x:hover,.gpc-lb-nav:hover{background:rgba(255,255,255,.28)}',
  '@media (prefers-reduced-motion:no-preference){.gpc-lb:target .gpc-lb-fig{animation:gpcLbIn .35s cubic-bezier(.16,1,.3,1)}@keyframes gpcLbIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}}',
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

console.log('gallery:\n  ' + changed.join('\n  '));
