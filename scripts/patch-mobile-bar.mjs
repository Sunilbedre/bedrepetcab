import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Phone bottom bar (the fixed bar under every page, hidden from 1024px): was  Pet Taxi Ride | WhatsApp Us | Int'l Quote.
 * Now four buttons, the same services as the home page cards, each opening its own form page:
 *   From Dubai -> /book-pet-relocation-from-dubai   Into Dubai -> /book-pet-relocation-to-dubai   Pet Taxi -> /book-pet-taxi   WhatsApp
 * The bar is built in three places that must stay identical (or the page fails to hydrate): the server chunk (322.js), the browser layout chunk,
 * and the prerendered html of the static pages. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const WA = 'https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%2C%20I%20would%20like%20to%20enquire';
const BASE = 'flex flex-col items-center justify-center py-2 px-1 rounded-xl font-bold text-[11px] transition-all active:scale-95';
const C_NAVY = `${BASE} bg-brand-dark hover:bg-slate-800 text-white`;
const C_TAXI = `${BASE} bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200`;
const C_WA = `${BASE} bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm`;
const ICON = 'w-4 h-4 text-brand-400 mb-0.5';
const GRID = 'grid gap-2 max-w-md mx-auto gpc-mb-grid';
const OLD_GRID = 'grid grid-cols-3 gap-2 max-w-md mx-auto';
const ARROW_OUT = ['M7 17 17 7', 'M7 7h10v10']; // arrow up-right: leaving Dubai
const ARROW_IN = ['M17 7 7 17', 'M17 17H7V7'];  // arrow down-left: coming into Dubai

/* ---- jsx (server chunk and browser chunk differ in local names only) ---- */
function jsx({ J, JS, Link, Car, Msg }) {
  const q = JSON.stringify;
  const svg = (paths) => `${JS}("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:${q(ICON)},children:[${paths.map((d) => `${J}("path",{d:${q(d)}})`).join(',')}]})`;
  const link = (href, cls, icon, label) => `${JS}(${Link},{href:${q(href)},className:${q(cls)},children:[${icon},${J}("span",{children:${q(label)}})]})`;
  return [
    link('/book-pet-relocation-from-dubai', C_NAVY, svg(ARROW_OUT), 'From Dubai'),
    link('/book-pet-relocation-to-dubai', C_NAVY, svg(ARROW_IN), 'Into Dubai'),
    link('/book-pet-taxi', C_TAXI, `${J}(${Car},{className:"w-4 h-4 text-brand-500 mb-0.5"})`, 'Pet Taxi'),
    `${JS}("a",{href:${q(WA)},target:"_blank",rel:"noopener noreferrer",className:${q(C_WA)},children:[${J}(${Msg},{className:"w-4 h-4 mb-0.5"}),${J}("span",{children:"WhatsApp"})]})`,
  ].join(',');
}

function patchJs(file, names) {
  const t = fs.readFileSync(file, 'utf8');
  if (t.includes('gpc-mb-grid')) return false;
  const start = t.indexOf(`"${OLD_GRID}",children:[`);
  const end = t.indexOf(']})})}function', start);
  if (start === -1 || end === -1) throw new Error('patch-mobile-bar: bar not found in ' + path.basename(file));
  fs.writeFileSync(file, t.slice(0, start) + `"${GRID}",children:[` + jsx(names) + t.slice(end));
  return true;
}

/* ---- html (what react renders for the same tree) ---- */
const svgHtml = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ICON}">${paths.map((d) => `<path d="${d}"></path>`).join('')}</svg>`;
const aHtml = (href, cls, icon, label) => `<a class="${cls}" href="${href}">${icon}<span>${label}</span></a>`;
const CAR_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car w-4 h-4 text-brand-500 mb-0.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>';
const MSG_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-4 h-4 mb-0.5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>';
const HTML = `<div class="${GRID}">` + [
  aHtml('/book-pet-relocation-from-dubai', C_NAVY, svgHtml(ARROW_OUT), 'From Dubai'),
  aHtml('/book-pet-relocation-to-dubai', C_NAVY, svgHtml(ARROW_IN), 'Into Dubai'),
  aHtml('/book-pet-taxi', C_TAXI, CAR_SVG, 'Pet Taxi'),
  `<a href="${WA}" target="_blank" rel="noopener noreferrer" class="${C_WA}">${MSG_SVG}<span>WhatsApp</span></a>`,
].join('') + '</div>';
const HTML_RE = new RegExp(`<div class="${OLD_GRID}">.*?Int&#x27;l Quote</span></a></div>`, 's');

const changed = [];
if (patchJs(path.join(ROOT, 'server', 'chunks', '322.js'), { J: 's.jsx', JS: '(0,s.jsxs)', Link: 'r.default', Car: 'x.Z', Msg: 'n.Z' })) changed.push('server chunk 322.js');
const lay = fs.readdirSync(path.join(ROOT, 'static', 'chunks', 'app')).filter((n) => /^layout-.*\.js$/.test(n));
for (const n of lay) if (patchJs(path.join(ROOT, 'static', 'chunks', 'app', n), { J: '(0,a.jsx)', JS: '(0,a.jsxs)', Link: 'n()', Car: 'u.Z', Msg: 'o.Z' })) changed.push('browser ' + n);
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'cache' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
for (const f of walk(path.join(ROOT, 'server')).filter((x) => x.endsWith('.html'))) {
  const t = fs.readFileSync(f, 'utf8');
  if (!HTML_RE.test(t)) continue;
  fs.writeFileSync(f, t.replace(HTML_RE, () => HTML));
  changed.push(path.relative(path.join(ROOT, 'server'), f));
}

const CSS_START = '/*gpc-mobile-bar*/';
const CSS_END = '/*end-gpc-mobile-bar*/';
const CSS = [CSS_START, '.gpc-mb-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:.4rem}.gpc-mb-grid>a{white-space:nowrap;min-width:0}', CSS_END].join('\n');
const cssDir = path.join(ROOT, 'static', 'css');
for (const f of fs.readdirSync(cssDir).filter((x) => x.endsWith('.css'))) {
  const fp = path.join(cssDir, f);
  let c = fs.readFileSync(fp, 'utf8');
  const a = c.indexOf(CSS_START);
  if (a !== -1) c = c.slice(0, a) + c.slice(c.indexOf(CSS_END) + CSS_END.length);
  fs.writeFileSync(fp, c.trimEnd() + '\n' + CSS + '\n');
}
console.log('mobile bar: ' + (changed.length ? changed.join(', ') : 'already') + ' + css');
