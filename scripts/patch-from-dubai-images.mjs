import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /international-pet-relocation/from-dubai photos (the main relocation page and /to-dubai keep theirs):
 *   hero (h1 "International Pet Relocation, Wherever Your Pet Is Going") -> /banners/fd-hero.webp  dog + cat, pet passport, DXB sunset
 *   "Need Help Before Your Pet Flies?"                                   -> /banners/fd-help.webp  border collie with the pre-flight checklist
 *   "One Journey. Many Details. One Team to Coordinate Them." (css bg)   -> /banners/fd-team.webp  van, skyline, world map, passport and crate
 * The team section gets its own class (gpc-fd-team) so the shared css background rule of the other relocation pages is not touched.
 * Overlays are lightened so the photos show. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const file = path.join(ROOT, 'server', 'app', 'international-pet-relocation', 'from-dubai', 'page.js');
let t = fs.readFileSync(file, 'utf8');
const before = t;

const swapImg = (key, to, alt) => {
  const re = new RegExp(`(i\\.jsx\\("img",\\{src:)"https://images\\.unsplash\\.com/photo-${key}-[0-9a-f]+\\?auto=format&fit=crop&w=2000&q=80",alt:""`);
  if (re.test(t)) t = t.replace(re, `$1${JSON.stringify(to)},alt:${JSON.stringify(alt)}`);
};
swapImg('1544568100', '/banners/fd-hero.webp', 'A golden retriever and a cat next to a pet passport at the airport, with the Dubai skyline at sunset');
swapImg('1587300003388', '/banners/fd-help.webp', 'A happy border collie next to a pre-flight pet checklist, passport and travel crate at the airport');

const marker = 'HOW WE HELP MANAGE THE JOURNEY';
const mi = t.indexOf(marker);
if (mi === -1) throw new Error('patch-from-dubai-images: team section not found');
const sec = 'i.jsx("section",{className:"py-20 sm:py-24 bg-navy text-white"';
const si = t.indexOf(sec, mi);
if (si !== -1 && si - mi < 200) t = t.slice(0, si) + 'i.jsx("section",{className:"py-20 sm:py-24 bg-navy text-white gpc-fd-team"' + t.slice(si + sec.length);
else if (!t.includes('bg-navy text-white gpc-fd-team"')) throw new Error('patch-from-dubai-images: team section class not found');

if (t !== before) { fs.writeFileSync(file, t); console.log('from-dubai images: replaced'); } else console.log('from-dubai images: already');

const CSS_START = '/*gpc-fd-images*/';
const CSS_END = '/*end-gpc-fd-images*/';
const CSS = [
  CSS_START,
  'img[src*="fd-hero"]~.bg-navy\\/75{background-color:rgba(5,45,73,.3)!important}',
  'img[src*="fd-hero"]~.bg-gradient-to-r{opacity:.7}',
  'img[src*="fd-hero"]{object-position:60% 50%!important}',
  'img[src*="fd-help"]~.bg-navy\\/80{background-color:rgba(5,45,73,.45)!important}',
  'img[src*="fd-help"]~.bg-gradient-to-r{opacity:.75}',
  'img[src*="fd-help"]{object-position:50% 40%!important}',
  'html body:not(#gpc-t):not(#gpc-u) .gpc-intl-page>section.gpc-fd-team{background-image:linear-gradient(180deg,rgba(5,45,73,.84) 0%,rgba(5,45,73,.74) 55%,rgba(3,31,51,.92) 100%),url("/_next/image?url=%2Fbanners%2Ffd-team.webp&w=1920&q=75")!important;background-size:cover!important;background-position:center 40%!important}',
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
