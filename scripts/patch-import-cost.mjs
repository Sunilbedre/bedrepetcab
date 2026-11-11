import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * New /pet-import-cost-uae page: pet import cost calculator built from "GPC Dubai Rate Card.xlsx"
 * (private jet, in-cabin AUH, cargo DXB Emirates / other airlines, cargo AUH; 1-2 dogs, 1-2 cats, 1 cat + 1 dog).
 * The rates live in public/gpc-import-cost.js. Page cloned from the compiled /why-global-pet-cab bundle, as patch-book-relocation.mjs does.
 * Idempotent. Run before patch-home-themes.mjs (it recolours this page's css).
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const APP = path.join(ROOT, 'server', 'app');
const BASE = path.join(APP, 'why-global-pet-cab', 'page.js');
const changed = [];

const SLUG = 'pet-import-cost-uae';
const ids = { chunk: 980607, entry: 981167, page: 986189 };
const pg = {
  title: 'UAE Pet Import Cost Calculator — Dubai & Abu Dhabi Rates | Global Pet Cab',
  description: 'Instant estimate to bring your dog or cat into the UAE: cargo, in-cabin or private jet into Dubai and Abu Dhabi. Permit, release, customs and service fee in AED.',
  badge: 'PET IMPORT COST',
  h1: 'UAE Pet Import Cost Calculator',
  lead: 'Choose how your pet travels and see the full cost into Dubai or Abu Dhabi: import permit, MOCCAE release, customs and our service fee.',
};
const INC = ['Import permit and MOCCAE release handled for you', 'Customs clearance and airline paperwork', 'Communication with you, your vet and the export agent', 'Pick-up at the airport and delivery in the same emirate'];
const li = INC.map((t) => `s.jsx("li",{children:${JSON.stringify(t)}})`).join(',');
const pageModule = `${ids.page}:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>p,metadata:()=>h});var s=a(9510);let h={title:${JSON.stringify(pg.title)},description:${JSON.stringify(pg.description)}};function p(){return (0,s.jsxs)("div",{className:"font-body gpc-book-page gpc-cost-page",children:[(0,s.jsxs)("section",{className:"gb-hero",children:[(0,s.jsxs)("div",{className:"gb-hero-in",children:[s.jsx("span",{className:"gb-badge",children:${JSON.stringify(pg.badge)}}),s.jsx("h1",{className:"font-heading",children:${JSON.stringify(pg.h1)}}),s.jsx("p",{children:${JSON.stringify(pg.lead)}})]})]}),(0,s.jsxs)("section",{className:"gb-wrap",children:[s.jsx("div",{id:"gpc-cost-root",className:"gb-root","aria-live":"polite"}),s.jsx("noscript",{children:"Please enable JavaScript to use the calculator, or message us on WhatsApp."}),(0,s.jsxs)("div",{className:"gb-card gc-inc",children:[s.jsx("h2",{className:"gc-h",children:"What our service fee covers"}),s.jsx("ul",{children:[${li}]})]})]}),s.jsx("script",{src:"/gpc-import-cost.js?v=1",defer:!0})]})}}`;

const must = (str, from, to) => { if (!str.includes(from)) throw new Error('patch-import-cost: not found: ' + from.slice(0, 60)); return str.split(from).join(to); };

const DIR = path.join(APP, SLUG);
const cur = path.join(DIR, 'page.js');
if (!(fs.existsSync(cur) && fs.readFileSync(cur, 'utf8').includes('gpc-cost-page'))) {
  let s = fs.readFileSync(BASE, 'utf8');
  s = must(s, 'e.id=607,e.ids=[607]', `e.id=${ids.chunk},e.ids=[${ids.chunk}]`);
  s = s.replace(/\b1167\b/g, String(ids.entry)).replace(/\b6189\b/g, String(ids.page));
  s = must(s, '"/why-global-pet-cab/page"', `"/${SLUG}/page"`);
  s = must(s, 'pathname:"/why-global-pet-cab"', `pathname:"/${SLUG}"`);
  s = must(s, '["why-global-pet-cab",{children:["__PAGE__"', `["${SLUG}",{children:["__PAGE__"`);
  s = s.split('why-global-pet-cab\\\\page.tsx').join(`${SLUG}\\\\page.tsx`);
  const a = s.indexOf(`${ids.page}:(e,t,a)=>{"use strict";a.r(t)`);
  const b = s.indexOf(';var t=require("../../webpack-runtime.js")');
  if (a === -1 || b === -1) throw new Error('patch-import-cost: page module boundaries not found');
  s = s.slice(0, a) + pageModule + '}' + s.slice(b);
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(cur, s);
  const mf = fs.readFileSync(path.join(APP, 'why-global-pet-cab', 'page_client-reference-manifest.js'), 'utf8');
  fs.writeFileSync(path.join(DIR, 'page_client-reference-manifest.js'), mf.split('"/why-global-pet-cab/page"').join(`"/${SLUG}/page"`).split('why-global-pet-cab\\\\page"').join(`${SLUG}\\\\page"`));
  changed.push('page ' + SLUG);
}

const updateJson = (file, fn) => {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = JSON.stringify(j);
  fn(j);
  if (JSON.stringify(j) !== before) { fs.writeFileSync(file, JSON.stringify(j, null, 2)); changed.push('manifest: ' + path.basename(file)); }
};
updateJson(path.join(ROOT, 'server', 'app-paths-manifest.json'), (j) => { j[`/${SLUG}/page`] = `app/${SLUG}/page.js`; });
updateJson(path.join(ROOT, 'app-path-routes-manifest.json'), (j) => { j[`/${SLUG}/page`] = `/${SLUG}`; });
updateJson(path.join(ROOT, 'app-build-manifest.json'), (j) => { j.pages[`/${SLUG}/page`] = j.pages['/why-global-pet-cab/page']; });
updateJson(path.join(ROOT, 'routes-manifest.json'), (j) => {
  const route = '/' + SLUG;
  if (j.staticRoutes.some((r) => r.page === route)) return;
  const esc = route.replace(/-/g, '\\-');
  j.staticRoutes.push({ page: route, regex: `^${esc}(?:/)?$`, routeKeys: {}, namedRegex: `^${esc}(?:/)?$` });
});

const CSS_START = '/*gpc-cost*/';
const CSS_END = '/*end-gpc-cost*/';
const R = '.gpc-cost-page';
const CSS = [
  CSS_START,
  `${R} .gc-h{font-size:1.15rem;font-weight:900;color:#052d49;margin:1.4rem 0 .7rem;font-family:inherit}${R} .gc-form .gc-h:first-child{margin-top:0}`,
  `${R} .gc-modes{margin-top:0}`,
  `${R} .gb-seg button{text-align:center}`,
  `${R} .gc-cta{width:100%;margin-top:1rem}`,
  `${R} .gc-table,${R} .gc-inc{margin-top:1.25rem}`,
  `${R} .gc-scroll{overflow-x:auto;margin:0 -.25rem}`,
  `${R} table{width:100%;border-collapse:collapse;min-width:36rem;font-size:.92rem}`,
  `${R} th{text-align:left;color:#64748b;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;padding:.6rem .7rem;border-bottom:2px solid #e2e8f0}`,
  `${R} td{padding:.75rem .7rem;border-bottom:1px solid #e2e8f0;color:#0f172a}`,
  `${R} tbody tr{cursor:pointer}${R} tbody tr:hover{background:#f1f7fa}${R} tbody tr.on{background:#eaf7fb;box-shadow:inset 3px 0 0 #0e7396}`,
  `${R} .gc-inc ul{margin:0;padding:0;list-style:none;display:grid;gap:.6rem}@media (min-width:640px){${R} .gc-inc ul{grid-template-columns:1fr 1fr}}`,
  `${R} .gc-inc li{position:relative;padding-left:1.6rem;color:#334155;line-height:1.5}${R} .gc-inc li:before{content:"✓";position:absolute;left:0;color:#0e7396;font-weight:900}`,
  // phones: the comparison table keeps only Route and Total (no sideways scrolling)
  `@media (max-width:639px){${R} table{min-width:0}${R} th:nth-child(n+2):not(:last-child),${R} td:nth-child(n+2):not(:last-child){display:none}${R} td,${R} th{padding:.7rem .45rem}}`,
  // the sticky estimate card stays first on phones so the total is always visible
  `@media (max-width:959px){${R} .gb-side .gb-q-l,${R} .gb-side .gb-q-n{display:block}${R} .gb-side{order:2}}`,
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
console.log('import cost page:\n  ' + changed.join('\n  '));
