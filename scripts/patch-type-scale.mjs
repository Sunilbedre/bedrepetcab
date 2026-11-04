import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
 * One type scale for the whole site (CSS only, appended to the compiled stylesheet):
 *   - section headings (the big h2s: "Choose your ...", "Pet-First Care ...", "Trusted by ...", "Real Pets ..." and the same on every page)
 *     all share one smaller size; page-top h1s and card titles are left alone
 *   - the small ALL-CAPS labels above headings and on tags share one size and letter spacing
 * Idempotent.
 */

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.next');
const CSS_START = '/*gpc-type-scale*/';
const CSS_END = '/*end-gpc-type-scale*/';

const BIG = ['text-3xl', 'text-4xl', 'text-5xl', 'text-[25px]', 'text-[27px]', 'text-[33px]', 'text-[36px]', 'text-[42px]'];
const H2 = [
  `html body:not(#gpc-t):not(#gpc-u) main h2[class*="font-black"]:is(${BIG.map((c) => `[class*="${c}"]`).join(',')})`,
  'html body:not(#gpc-t):not(#gpc-u) main h2.gpc-pc-h2',
  'html body:not(#gpc-t):not(#gpc-u) main h2.gpc-gal-title',
].join(',');

const CAPS = [
  'html body:not(#gpc-t):not(#gpc-u) main :is([class*="uppercase"])[class*="tracking-"]:not(button):not(a)',
  'html body:not(#gpc-t):not(#gpc-u) main .gpc-gal-badge',
  'html body:not(#gpc-t):not(#gpc-u) main .gpc-hb-kicker',
  'html body:not(#gpc-t):not(#gpc-u) main .gpc-pc-tag',
  'html body:not(#gpc-t):not(#gpc-u) main .gb-badge',
  'html body:not(#gpc-t):not(#gpc-u) main .gtr-k',
].join(',');

const CSS = [
  CSS_START,
  `${H2}{font-size:1.5rem!important;line-height:1.22!important;letter-spacing:-.015em!important;font-weight:800!important}`,
  `@media (min-width:640px){${H2}{font-size:1.75rem!important}}`,
  `${CAPS}{font-size:.8125rem!important;line-height:1.4!important;letter-spacing:.02em!important;font-weight:700!important}`,
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
console.log('type scale: css');
