import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Header menu: adds "Import cost" (/pet-import-cost-uae) after "Why Us", in the desktop menu and in the phone drawer.
 * The header is built in the server chunk (322.js) and the browser layout chunk, and the desktop menu is also prerendered into the html of the static pages,
 * so all three are patched. The prerendered desktop menu also lacked the existing "Gallery" link that the code has (a hydration mismatch): it is added too.
 * Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const HREF = '/pet-import-cost-uae';
const LABEL = 'Import cost';
const done = [];

/* ---- jsx (server chunk and browser layout chunk) ---- */
function patchJs(file) {
  const t = fs.readFileSync(file, 'utf8');
  if (t.includes(`children:"${LABEL}"}`)) return false;
  const re = /((?:s\.jsx|\(0,a\.jsx\))\((?:r\.default|n\(\)),\{href:"\/why-global-pet-cab",(?:onClick:\(\)=>t\(!1\),)?className:"[^"]*",children:"Why Us"\}\)),/g;
  let n = 0;
  const u = t.replace(re, (m, el) => { n++; return `${m}${el.replace('"/why-global-pet-cab"', JSON.stringify(HREF)).replace('children:"Why Us"', `children:"${LABEL}"`)},`; });
  if (n !== 2) throw new Error(`patch-header-import-cost: expected 2 menu entries (desktop + phone) in ${path.basename(file)}, found ${n}`);
  fs.writeFileSync(file, u);
  return true;
}
if (patchJs(path.join(ROOT, 'server', 'chunks', '322.js'))) done.push('server chunk 322.js');
for (const n of fs.readdirSync(path.join(ROOT, 'static', 'chunks', 'app')).filter((x) => /^layout-.*\.js$/.test(x))) {
  if (patchJs(path.join(ROOT, 'static', 'chunks', 'app', n))) done.push('browser ' + n);
}

/* ---- prerendered html: desktop menu ---- */
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'cache' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
const WHY = /(<a class="(px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all)" href="\/why-global-pet-cab">Why Us<\/a>)/;
const GUIDES = /(<a class="(px-3 py-2 hover:text-teal-deep hover:bg-teal-soft rounded-lg transition-all)" href="\/resources">Guides<\/a>)(<\/nav>)/;
for (const f of walk(path.join(ROOT, 'server')).filter((x) => x.endsWith('.html'))) {
  const t = fs.readFileSync(f, 'utf8');
  if (!WHY.test(t) || t.includes(`href="${HREF}">${LABEL}</a>`)) continue;
  let u = t.replace(WHY, (m, a, cls) => `${a}<a class="${cls}" href="${HREF}">${LABEL}</a>`);
  if (!u.includes('href="/gallery">Gallery</a></nav>')) u = u.replace(GUIDES, (m, a, cls, nav) => `${a}<a class="${cls}" href="/gallery">Gallery</a>${nav}`);
  fs.writeFileSync(f, u);
  done.push(path.relative(path.join(ROOT, 'server'), f));
}
/* ---- css: keep the desktop menu on one line with the extra item ---- */
const CSS_START = '/*gpc-header-fit*/';
const CSS_END = '/*end-gpc-header-fit*/';
const CSS = [
  CSS_START,
  '@media (min-width:1024px){header nav>*,header nav>*>button,header .hidden.lg\\:flex>*{white-space:nowrap}}',
  '@media (min-width:1024px) and (max-width:1279px){header nav>a,header nav>div>button{padding-left:.5rem;padding-right:.5rem;font-size:.85rem}header .hidden.lg\\:flex>a[href^="https://wa.me"]{display:none}}',
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
console.log('header import cost: ' + (done.length ? done.join(', ') : 'already'));
