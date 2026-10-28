import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Two form-only pages, like /book-pet-taxi:
 *   /book-pet-relocation-from-dubai   (direction from_dubai)
 *   /book-pet-relocation-to-dubai     (direction to_dubai)
 * Each is a hero + the two-screen relocation enquiry built by public/gpc-reloc.js, saved through the existing
 * /api/international/enquiry route. The service picker on the home page and on /get-a-quote links to these (and to /book-pet-taxi).
 * Pages are cloned from the compiled /why-global-pet-cab bundle with new module ids, as patch-book-pet-taxi.mjs does.
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const BASE = path.join(APP, 'why-global-pet-cab', 'page.js');
const changed = [];

const PAGES = [
  { slug: 'book-pet-relocation-from-dubai', dir: 'from_dubai', ids: { chunk: 960607, entry: 961167, page: 966189 },
    title: 'Pet Relocation from Dubai — Request a Quote | Global Pet Cab Dubai',
    description: 'Moving your pet out of Dubai or the UAE? Tell us the destination and your pet in two quick steps and get a customised relocation proposal.',
    badge: 'RELOCATION FROM DUBAI', h1: 'Pet Relocation from Dubai', lead: 'Export permits, crate, flight and delivery handled for you. Two quick steps and our team sends a customised proposal.' },
  { slug: 'book-pet-relocation-to-dubai', dir: 'to_dubai', ids: { chunk: 970607, entry: 971167, page: 976189 },
    title: 'Pet Relocation into Dubai — Request a Quote | Global Pet Cab Dubai',
    description: 'Bringing your pet to Dubai or the UAE? Tell us where your pet is and share a few details in two quick steps for a customised import proposal.',
    badge: 'RELOCATION INTO DUBAI', h1: 'Pet Relocation into Dubai', lead: 'Import permit, health checks, flight and arrival in Dubai handled for you. Two quick steps and our team sends a customised proposal.' },
];

const pageModule = (P, pg) => `${P}:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p,metadata:()=>h});var s=a(9510);let h={title:${JSON.stringify(pg.title)},description:${JSON.stringify(pg.description)}};function p(){return (0,s.jsxs)("div",{className:"font-body gpc-book-page gpc-reloc-page",children:[(0,s.jsxs)("section",{className:"gb-hero",children:[(0,s.jsxs)("div",{className:"gb-hero-in",children:[s.jsx("span",{className:"gb-badge",children:${JSON.stringify(pg.badge)}}),s.jsx("h1",{className:"font-heading",children:${JSON.stringify(pg.h1)}}),s.jsx("p",{children:${JSON.stringify(pg.lead)}})]})]}),(0,s.jsxs)("section",{className:"gb-wrap",children:[s.jsx("div",{id:"gpc-reloc-root","data-dir":${JSON.stringify(pg.dir)},className:"gb-root","aria-live":"polite"}),s.jsx("noscript",{children:"Please enable JavaScript to use the form, or message us on WhatsApp."})]}),s.jsx("script",{src:"/gpc-reloc.js?v=1",defer:!0})]})}}`;

const must = (str, from, to) => { if (!str.includes(from)) throw new Error('patch-book-relocation: not found: ' + from.slice(0, 60)); return str.split(from).join(to); };

for (const pg of PAGES) {
  const DIR = path.join(APP, pg.slug);
  const cur = path.join(DIR, 'page.js');
  if (fs.existsSync(cur) && fs.readFileSync(cur, 'utf8').includes('gpc-reloc-page')) continue;
  const { ids } = pg;
  let s = fs.readFileSync(BASE, 'utf8');
  s = must(s, 'e.id=607,e.ids=[607]', `e.id=${ids.chunk},e.ids=[${ids.chunk}]`);
  s = s.replace(/\b1167\b/g, String(ids.entry)).replace(/\b6189\b/g, String(ids.page));
  s = must(s, '"/why-global-pet-cab/page"', `"/${pg.slug}/page"`);
  s = must(s, 'pathname:"/why-global-pet-cab"', `pathname:"/${pg.slug}"`);
  s = must(s, '["why-global-pet-cab",{children:["__PAGE__"', `["${pg.slug}",{children:["__PAGE__"`);
  s = s.split('why-global-pet-cab\\\\page.tsx').join(`${pg.slug}\\\\page.tsx`);
  const a = s.indexOf(`${ids.page}:(e,t,a)=>{"use strict";a.r(t)`);
  const b = s.indexOf(';var t=require("../../webpack-runtime.js")');
  if (a === -1 || b === -1) throw new Error('patch-book-relocation: page module boundaries not found');
  s = s.slice(0, a) + pageModule(ids.page, pg) + '}' + s.slice(b);
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(cur, s);
  const mf = fs.readFileSync(path.join(APP, 'why-global-pet-cab', 'page_client-reference-manifest.js'), 'utf8');
  fs.writeFileSync(path.join(DIR, 'page_client-reference-manifest.js'), mf.split('"/why-global-pet-cab/page"').join(`"/${pg.slug}/page"`).split('why-global-pet-cab\\\\page"').join(`${pg.slug}\\\\page"`));
  changed.push('page ' + pg.slug);
}

/* manifests */
const updateJson = (file, fn) => {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = JSON.stringify(j);
  fn(j);
  if (JSON.stringify(j) !== before) { fs.writeFileSync(file, JSON.stringify(j, null, 2)); changed.push('manifest: ' + path.basename(file)); }
};
updateJson(path.join(ROOT, 'server', 'app-paths-manifest.json'), (j) => { for (const p of PAGES) j[`/${p.slug}/page`] = `app/${p.slug}/page.js`; });
updateJson(path.join(ROOT, 'app-path-routes-manifest.json'), (j) => { for (const p of PAGES) j[`/${p.slug}/page`] = `/${p.slug}`; });
updateJson(path.join(ROOT, 'app-build-manifest.json'), (j) => { for (const p of PAGES) j.pages[`/${p.slug}/page`] = j.pages['/why-global-pet-cab/page']; });
updateJson(path.join(ROOT, 'routes-manifest.json'), (j) => {
  for (const p of PAGES) {
    const route = '/' + p.slug;
    if (j.staticRoutes.some((r) => r.page === route)) continue;
    const esc = route.replace(/-/g, '\\-');
    j.staticRoutes.push({ page: route, regex: `^${esc}(?:/)?$`, routeKeys: {}, namedRegex: `^${esc}(?:/)?$` });
  }
});

/* css: the extra bits the relocation form needs on top of the pet taxi booking styles */
const CSS_START = '/*gpc-reloc*/';
const CSS_END = '/*end-gpc-reloc*/';
const R = '.gpc-reloc-page';
const CSS = [
  CSS_START,
  `${R} .gb-steps2 li{max-width:14rem}`,
  `${R} .gb-fixed{padding:.85rem 1rem;border-radius:.9rem;background:#eaf7fb;border:2px solid rgba(14,115,150,.2);color:#052d49;font-weight:700}`,
  `${R} .gb-next{list-style:none;margin:.2rem 0 .6rem;padding:0;display:grid;gap:.8rem}`,
  `${R} .gb-next li{display:flex;gap:.7rem;align-items:flex-start;color:rgba(255,255,255,.92);font-size:.95rem;line-height:1.45}`,
  `${R} .gb-next b{flex:none;width:1.6rem;height:1.6rem;border-radius:999px;background:rgba(255,255,255,.16);display:grid;place-items:center;font-size:.8rem}`,
  // on phones the info card goes below the form (the taxi page puts its price card on top)
  `@media (max-width:959px){${R} .gb-side{order:2}}`,
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
console.log('book relocation:\n  ' + changed.join('\n  '));
