import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* Adds "Pet Import Cost Calculator" (/pet-import-cost-uae) to the footer's relocation column, after "Relocation Overview".
   Patches the footer chunk plus every prerendered html page. Idempotent. Run before patch-home-themes.mjs (order does not matter for css). */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next', 'server');
const LABEL = 'Pet Import Cost Calculator';
let n = 0;

const CHUNK_FROM = 'children:"Relocation Overview"})}),';
const CHUNK_TO = CHUNK_FROM + 's.jsx("li",{children:s.jsx(r.default,{href:"/pet-import-cost-uae",className:"hover:text-white transition-colors leading-snug",children:"' + LABEL + '"})}),';
const HTML_RE = /(<li><a class="([^"]*)" href="\/international-pet-relocation">Relocation Overview<\/a><\/li>)/;

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk(ROOT)) {
  if (!/\.(js|html)$/.test(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  if (!t.includes('Relocation Overview') || t.includes(LABEL)) continue;
  let u = t;
  if (f.endsWith('.html')) u = t.replace(HTML_RE, (m, all, cls) => all + `<li><a class="${cls}" href="/pet-import-cost-uae">${LABEL}</a></li>`);
  else if (t.includes(CHUNK_FROM)) u = t.replace(CHUNK_FROM, CHUNK_TO);
  if (u !== t) { fs.writeFileSync(f, u); n++; }
}
console.log('footer import-cost link: patched ' + n + ' files');
