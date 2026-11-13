import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * /international-pet-relocation/to-dubai photos (the main relocation page and /to-dubai keep theirs):
 *   hero (h1 "International Pet Relocation, Wherever Your Pet Is Going") -> /banners/td-hero.webp  golden retriever at the plane window above Dubai
 *   "Need Help Before Your Pet Flies?"                                   -> /banners/td-help.webp  border collie with the pre-flight checklist
 *   "One Journey. Many Details. One Team to Coordinate Them." (css bg)   -> /banners/td-team.webp  van, skyline, world map, passport and crate
 * The team section gets its own class (gpc-td-team) so the shared css background rule of the other relocation pages is not touched.
 * Overlays are lightened so the photos show. Idempotent.
 */
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const file = path.join(ROOT, 'server', 'app', 'international-pet-relocation', 'to-dubai', 'page.js');
let t = fs.readFileSync(file, 'utf8');
const before = t;

const swapImg = (key, to, alt) => {
  const re = new RegExp(`(i\\.jsx\\("img",\\{src:)"https://images\\.unsplash\\.com/photo-${key}-[0-9a-f]+\\?auto=format&fit=crop&w=2000&q=80",alt:""`);
  if (re.test(t)) t = t.replace(re, `$1${JSON.stringify(to)},alt:${JSON.stringify(alt)}`);
};
swapImg('1544568100', '/banners/td-hero.webp', 'A golden retriever looking out of the plane window at the Palm Jumeirah and the Dubai skyline as it arrives');
swapImg('1587300003388', '/banners/td-help.webp', 'A happy border collie next to a pre-flight pet checklist, passport and travel crate at the airport');

const marker = 'HOW WE HELP MANAGE THE JOURNEY';
const mi = t.indexOf(marker);
if (mi === -1) throw new Error('patch-to-dubai-images: team section not found');
const sec = 'i.jsx("section",{className:"py-20 sm:py-24 bg-navy text-white"';
const si = t.indexOf(sec, mi);
if (si !== -1 && si - mi < 200) t = t.slice(0, si) + 'i.jsx("section",{className:"py-20 sm:py-24 bg-navy text-white gpc-td-team"' + t.slice(si + sec.length);
else if (!t.includes('bg-navy text-white gpc-td-team"')) throw new Error('patch-to-dubai-images: team section class not found');

if (t !== before) { fs.writeFileSync(file, t); console.log('to-dubai images: replaced'); } else console.log('to-dubai images: already');

const CSS_START = '/*gpc-td-images*/';
const CSS_END = '/*end-gpc-td-images*/';
const CSS = [
  CSS_START,
  'img[src*="td-hero"]~.bg-navy\\/75{background-color:rgba(5,45,73,.3)!important}',
  'img[src*="td-hero"]~.bg-gradient-to-r{opacity:.7}',
  'img[src*="td-hero"]{object-position:60% 50%!important}',
  'img[src*="td-help"]~.bg-navy\\/80{background-color:rgba(5,45,73,.45)!important}',
  'img[src*="td-help"]~.bg-gradient-to-r{opacity:.75}',
  'img[src*="td-help"]{object-position:50% 40%!important}',
  'html body:not(#gpc-t):not(#gpc-u) .gpc-intl-page>section.gpc-td-team{background-image:linear-gradient(180deg,rgba(5,45,73,.84) 0%,rgba(5,45,73,.74) 55%,rgba(3,31,51,.92) 100%),url("/_next/image?url=%2Fbanners%2Ftd-team.webp&w=1920&q=75")!important;background-size:cover!important;background-position:center 40%!important}',
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
