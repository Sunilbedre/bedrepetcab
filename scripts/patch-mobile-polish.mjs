import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * Phone-width polish (CSS only, max-width media queries; desktop is untouched):
 *  - taxi page: the fare card kept a 130px top padding meant for the desktop hero overlap, leaving a blank band
 *  - hero headings are a little smaller so they wrap to fewer lines
 *  - the "|" separators between hero chips are hidden (they stranded on their own line)
 *  - trust bar numbers no longer wrap onto two lines inside the 2 x 2 grid
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const CSS_START = '/*gpc-mobile-polish*/';
const CSS_END = '/*end-gpc-mobile-polish*/';
const CSS = [
  CSS_START,
  '@media (max-width:1023px){html body:has(h1.pet-taxi-hero-h1) #dubai-taxi-calculator{padding-top:0!important}}',
  // service picker (home + /get-a-quote): the photo took ~450px of the first screen and pushed the service cards below the fold
  '@media (max-width:1023px){.gpc-home-picker>div>.grid>div:first-child{min-height:0!important;height:11rem}.gpc-home-picker>div>.grid>div:first-child .absolute.bottom-6{bottom:1rem;left:1rem;right:1rem}.gpc-home-picker>div>.grid>div:first-child .absolute.bottom-6 .text-2xl{font-size:1.05rem;line-height:1.25}}',
  '@media (max-width:639px){',
  // service picker cards: wider text column (smaller padding, smaller icon, no "Selected" pill; the border already shows the choice)
  '.gpc-home-picker>div>.grid>div:nth-child(2){padding:1.1rem!important}',
  '.gpc-home-picker button[role="tab"]{padding:.8rem!important;gap:.7rem!important}',
  '.gpc-home-picker button[role="tab"]>div:first-child{width:2.5rem!important;height:2.5rem!important;font-size:1.3rem!important;border-radius:.8rem!important}',
  '.gpc-home-picker button[role="tab"]>span{display:none}',
  'main h1{font-size:clamp(1.6rem,7.4vw,1.95rem)!important;line-height:1.18!important;letter-spacing:-.01em}',
  'html body:has(h1.pet-taxi-hero-h1) h1.pet-taxi-hero-h1{font-size:clamp(1.6rem,7.4vw,1.95rem)!important;line-height:1.18!important}',
  'html body:has(h1.pet-taxi-hero-h1) h1.pet-taxi-hero-h1~p{font-size:1rem!important;line-height:1.6!important}',
  'main span[class*="text-white/40"]{display:none}',
  'div[class*="text-teal-deep"][class*="font-extrabold"][class*="text-xl"]{font-size:1.05rem!important;gap:.35rem!important;white-space:nowrap;flex-wrap:nowrap}',
  'div[class*="text-teal-deep"][class*="font-extrabold"][class*="text-xl"] svg{width:1.15rem!important;height:1.15rem!important;flex:none}',
  '}',
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
console.log('mobile polish: css');
